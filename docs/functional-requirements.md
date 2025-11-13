# senjin 機能要件定義書

## 機能一覧

### フェーズ1: MVP（最小限の機能、12月末まで）

#### ユーザー向け機能

1. **トップページ・カテゴリー選択**
   - [ ] 4つのカテゴリーカード表示
   - [ ] カテゴリー選択時のアニメーション
   - [ ] ログインボタン表示

2. **先人の声一覧**
   - [ ] カテゴリー別の先人の声を一覧表示
   - [ ] キャッチコピー、先人の名前、年齢を表示
   - [ ] コメント数・アーカイブ数を表示
   - [ ] 無限スクロール or ページネーション

3. **先人の声詳細（最重要）**
   - [ ] ページめくり形式でストーリーを表示
   - [ ] スワイプで次のページへ遷移
   - [ ] 以下の構成で表示：
     - 導入（先人の基本情報）
     - 状況の確認
     - 感情の掘り下げ
     - 決断と意味
     - ひとこと
     - アクション画面
   - [ ] エモーショナルなアニメーション
   - [ ] 閲覧数カウント

4. **勇気ブック（アーカイブ機能）**
   - [ ] 先人の声を保存
   - [ ] 保存済み一覧表示
   - [ ] スワイプで削除
   - [ ] 保存時にログイン必須チェック

5. **コメント機能**
   - [ ] 先人の声へのコメント投稿
   - [ ] コメント一覧表示
   - [ ] ログイン必須チェック
   - [ ] 文字数制限（200文字）

6. **認証機能**
   - [ ] メールアドレス + パスワードでサインアップ
   - [ ] ログイン
   - [ ] ログアウト
   - [ ] パスワードリセット
   - [ ] （オプション）SNSログイン（Google, Twitter）

7. **マイページ**
   - [ ] ニックネーム編集
   - [ ] メールアドレス表示
   - [ ] 勇気ブックへのリンク
   - [ ] 投稿したコメント一覧

#### 管理者向け機能

8. **管理ダッシュボード**
   - [ ] 統計情報表示
     - 総記事数
     - 登録ユーザー数
     - 総閲覧数
     - コメント数
   - [ ] 人気記事Top 5
   - [ ] 最近の登録記事

9. **先人の声管理**
   - [ ] 一覧表示（公開/下書き）
   - [ ] 新規作成
   - [ ] 編集
   - [ ] 削除
   - [ ] 公開/非公開切り替え
   - [ ] プレビュー機能

10. **コメント管理**
    - [ ] コメント一覧
    - [ ] 承認/非承認
    - [ ] 削除

11. **カテゴリー管理**
    - [ ] カテゴリー一覧
    - [ ] 編集（名前、説明、絵文字）

---

### フェーズ2: 機能拡張（将来実装）

12. **検索機能**
    - [ ] キーワード検索（全文検索）
    - [ ] カテゴリー絞り込み
    - [ ] 人気順・新着順ソート

13. **GPTsとの自動連携**
    - [ ] GPTsからの自動投稿API
    - [ ] Webhook連携

14. **通知機能**
    - [ ] 新着記事の通知
    - [ ] コメントへの返信通知
    - [ ] メール通知

15. **有料プラン機能**
    - [ ] プレミアム会員
    - [ ] 限定コンテンツ
    - [ ] Stripe決済連携

16. **SNSシェア機能**
    - [ ] Twitter/Xシェア
    - [ ] LINEシェア
    - [ ] OGP対応

17. **いいね機能**
    - [ ] 先人の声にいいね
    - [ ] いいね数表示
    - [ ] 自分がいいねした記事一覧

---

## 各機能の詳細仕様

### 1. 先人の声一覧

**エンドポイント**: `GET /api/stories?category={slug}&page={number}`

**クエリパラメータ**:
- `category`: カテゴリーのslug（進路/転職/就活/困難）
- `page`: ページ番号（デフォルト: 1）
- `limit`: 1ページあたりの件数（デフォルト: 10）
- `sort`: ソート順（`newest`, `popular`, `most_archived`）

**レスポンス**:
```json
{
  "stories": [
    {
      "id": "uuid",
      "catchphrase": "美大に行くか、就職するか...",
      "senjin_name": "デザイナー・田中さん",
      "senjin_age_at_time": 18,
      "comment_count": 12,
      "archive_count": 45,
      "created_at": "2025-11-01T12:00:00Z"
    }
  ],
  "pagination": {
    "total": 128,
    "page": 1,
    "limit": 10,
    "total_pages": 13
  }
}
```

**実装**:
```typescript
// app/api/stories/route.ts
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')

  const supabase = createClient()

  let query = supabase
    .from('senjin_stories')
    .select('id, catchphrase, senjin_name, senjin_age_at_time, comment_count, archive_count, created_at', { count: 'exact' })
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .range((page - 1) * limit, page * limit - 1)

  if (category) {
    // カテゴリーIDを取得してフィルター
    const { data: categoryData } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', category)
      .single()

    if (categoryData) {
      query = query.eq('category_id', categoryData.id)
    }
  }

  const { data, error, count } = await query

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({
    stories: data,
    pagination: {
      total: count,
      page,
      limit,
      total_pages: Math.ceil((count || 0) / limit)
    }
  })
}
```

---

### 2. 先人の声詳細取得

**エンドポイント**: `GET /api/stories/[id]`

**レスポンス**:
```json
{
  "id": "uuid",
  "category": {
    "name": "進路に悩む",
    "slug": "career-path",
    "emoji": "🎓"
  },
  "catchphrase": "美大に行くか、就職するか...",
  "senjin_name": "デザイナー・田中さん",
  "senjin_age_at_time": 18,
  "senjin_current_role": "UXデザイナー（大手IT企業）",
  "story_context": "高3の秋、美大進学を...",
  "story_emotion": "不安と焦り。親との...",
  "story_decision": "先生に相談したことが...",
  "final_message": "悩んでいる時間も、あなたの...",
  "view_count": 456,
  "archive_count": 45,
  "comment_count": 12,
  "comments": [
    {
      "id": "uuid",
      "user": {
        "nickname": "太郎",
        "avatar_url": "..."
      },
      "content": "すごく勇気もらえました！",
      "created_at": "2025-11-10T10:00:00Z"
    }
  ],
  "is_archived": false // ログインユーザーが保存済みかどうか
}
```

**実装**:
```typescript
// app/api/stories/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createClient()

  // 先人の声を取得
  const { data: story, error } = await supabase
    .from('senjin_stories')
    .select(`
      *,
      category:categories(name, slug, emoji),
      comments(
        id,
        content,
        created_at,
        user:users(nickname, avatar_url)
      )
    `)
    .eq('id', params.id)
    .eq('is_published', true)
    .single()

  if (error) {
    return Response.json({ error: error.message }, { status: 404 })
  }

  // 閲覧数をインクリメント
  await supabase.rpc('increment_view_count', { story_id: params.id })

  // ログインユーザーの場合、保存済みかチェック
  const { data: { user } } = await supabase.auth.getUser()
  let isArchived = false

  if (user) {
    const { data: archiveData } = await supabase
      .from('courage_books')
      .select('id')
      .eq('user_id', user.id)
      .eq('story_id', params.id)
      .single()

    isArchived = !!archiveData
  }

  return Response.json({
    ...story,
    is_archived: isArchived
  })
}
```

---

### 3. 勇気ブックへ保存

**エンドポイント**: `POST /api/courage-books`

**リクエストボディ**:
```json
{
  "story_id": "uuid"
}
```

**レスポンス**:
```json
{
  "success": true,
  "message": "勇気ブックに保存しました"
}
```

**実装**:
```typescript
// app/api/courage-books/route.ts
export async function POST(request: Request) {
  const supabase = createClient()

  // 認証チェック
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return Response.json({ error: 'ログインが必要です' }, { status: 401 })
  }

  const body = await request.json()
  const { story_id } = body

  // 保存
  const { error } = await supabase
    .from('courage_books')
    .insert({
      user_id: user.id,
      story_id
    })

  if (error) {
    // 重複エラーの場合
    if (error.code === '23505') {
      return Response.json({ error: 'すでに保存済みです' }, { status: 400 })
    }
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({
    success: true,
    message: '勇気ブックに保存しました'
  })
}
```

---

### 4. コメント投稿

**エンドポイント**: `POST /api/comments`

**リクエストボディ**:
```json
{
  "story_id": "uuid",
  "content": "すごく勇気もらえました！"
}
```

**バリデーション**:
- `content`: 1〜200文字
- ログイン必須

**レスポンス**:
```json
{
  "success": true,
  "comment": {
    "id": "uuid",
    "content": "すごく勇気もらえました！",
    "created_at": "2025-11-10T12:00:00Z",
    "user": {
      "nickname": "太郎",
      "avatar_url": "..."
    }
  }
}
```

**実装**:
```typescript
// app/api/comments/route.ts
import { z } from 'zod'

const commentSchema = z.object({
  story_id: z.string().uuid(),
  content: z.string().min(1).max(200)
})

export async function POST(request: Request) {
  const supabase = createClient()

  // 認証チェック
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return Response.json({ error: 'ログインが必要です' }, { status: 401 })
  }

  const body = await request.json()

  // バリデーション
  const validation = commentSchema.safeParse(body)
  if (!validation.success) {
    return Response.json({ error: validation.error }, { status: 400 })
  }

  const { story_id, content } = validation.data

  // コメント投稿
  const { data, error } = await supabase
    .from('comments')
    .insert({
      user_id: user.id,
      story_id,
      content
    })
    .select(`
      id,
      content,
      created_at,
      user:users(nickname, avatar_url)
    `)
    .single()

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({
    success: true,
    comment: data
  })
}
```

---

### 5. 管理画面 - 先人の声作成

**エンドポイント**: `POST /api/admin/stories`

**認証**: 管理者のみアクセス可能

**リクエストボディ**:
```json
{
  "category_id": "uuid",
  "catchphrase": "...",
  "senjin_name": "...",
  "senjin_age_at_time": 18,
  "senjin_current_role": "...",
  "story_context": "...",
  "story_emotion": "...",
  "story_decision": "...",
  "final_message": "...",
  "is_published": true
}
```

**実装**:
```typescript
// app/api/admin/stories/route.ts
import { z } from 'zod'

const storySchema = z.object({
  category_id: z.string().uuid(),
  catchphrase: z.string().max(200),
  senjin_name: z.string().max(100),
  senjin_age_at_time: z.number().int().min(0).max(150).optional(),
  senjin_current_role: z.string().max(200).optional(),
  story_context: z.string(),
  story_emotion: z.string(),
  story_decision: z.string(),
  final_message: z.string(),
  is_published: z.boolean().default(false)
})

export async function POST(request: Request) {
  const supabase = createClient()

  // 管理者チェック（TODO: 実装）
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return Response.json({ error: '認証が必要です' }, { status: 401 })
  }

  const body = await request.json()

  // バリデーション
  const validation = storySchema.safeParse(body)
  if (!validation.success) {
    return Response.json({ error: validation.error }, { status: 400 })
  }

  const storyData = validation.data

  // 公開する場合は公開日時を設定
  if (storyData.is_published) {
    storyData.published_at = new Date().toISOString()
  }

  // 登録
  const { data, error } = await supabase
    .from('senjin_stories')
    .insert(storyData)
    .select()
    .single()

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({
    success: true,
    story: data
  })
}
```

---

## 非機能要件

### パフォーマンス
- [ ] ページ読み込み時間: 3秒以内（モバイル4G環境）
- [ ] First Contentful Paint (FCP): 1.8秒以内
- [ ] Largest Contentful Paint (LCP): 2.5秒以内
- [ ] 画像最適化（WebP形式、遅延読み込み）

### セキュリティ
- [ ] HTTPS通信
- [ ] CSRF対策
- [ ] XSS対策（入力値のサニタイズ）
- [ ] SQLインジェクション対策（Supabase RLS）
- [ ] レート制限（API呼び出し制限）

### 可用性
- [ ] 99%以上の稼働率
- [ ] エラー監視（Sentry連携）
- [ ] バックアップ（Supabase自動バックアップ）

### スケーラビリティ
- [ ] 同時接続数: 1000人まで対応
- [ ] データベース: 10万件の記事まで対応
- [ ] CDN利用（Vercel Edge Network）

---

## テスト要件

### 単体テスト
- [ ] API関数のテスト（Vitest）
- [ ] コンポーネントのテスト（Testing Library）
- [ ] バリデーションロジックのテスト

### E2Eテスト
- [ ] ユーザーフローのテスト（Playwright）
  - カテゴリー選択 → 一覧 → 詳細 → 保存
  - ログイン → コメント投稿

### 手動テスト
- [ ] モバイルデバイステスト（実機確認）
- [ ] ブラウザ互換性テスト（Safari, Chrome, Firefox）

---

*この機能要件定義書は、MVP開発を最優先にした設計となっています。*
