# senjin 実装計画書

## プロジェクトスケジュール

**開始日**: 2025年11月13日
**リリース予定日**: 2025年12月31日
**開発期間**: 約7週間（49日間）

---

## マイルストーン

### Week 1 (11/13 - 11/19): プロジェクトセットアップ

**目標**: 開発環境を構築し、基本的なプロジェクト構成を完成させる

- [ ] **Day 1-2: プロジェクト初期化**
  - [ ] Next.js 14プロジェクト作成
  - [ ] TypeScript + TailwindCSS設定
  - [ ] ESLint + Prettier設定
  - [ ] Gitリポジトリ作成
  - [ ] ディレクトリ構成の確立

- [ ] **Day 3-4: Supabaseセットアップ**
  - [ ] Supabaseプロジェクト作成
  - [ ] データベーステーブル作成（migration）
  - [ ] RLSポリシー設定
  - [ ] トリガー設定
  - [ ] 初期データ投入（カテゴリー）

- [ ] **Day 5-6: 基本コンポーネント作成**
  - [ ] Layoutコンポーネント
  - [ ] Headerコンポーネント
  - [ ] Footerコンポーネント
  - [ ] Buttonコンポーネント
  - [ ] Cardコンポーネント

- [ ] **Day 7: デザインシステム構築**
  - [ ] カラーパレット設定（Tailwind config）
  - [ ] フォント設定（M PLUS Rounded 1c）
  - [ ] shadcn/ui導入
  - [ ] Framer Motion導入

**成果物**:
- 動作するNext.jsアプリケーション
- Supabaseデータベース（空のテーブル）
- 基本的なデザインシステム

---

### Week 2 (11/20 - 11/26): ユーザー向け基本機能実装

**目標**: トップページ、一覧、詳細画面を実装

- [ ] **Day 8-9: トップページ**
  - [ ] カテゴリー選択UI
  - [ ] アニメーション実装
  - [ ] レスポンシブ対応

- [ ] **Day 10-11: 先人の声一覧ページ**
  - [ ] API実装（`GET /api/stories`）
  - [ ] 一覧表示UI
  - [ ] 無限スクロール or ページネーション
  - [ ] Loading状態

- [ ] **Day 12-14: 先人の声詳細ページ（最重要）**
  - [ ] API実装（`GET /api/stories/[id]`）
  - [ ] ページめくりUI実装
  - [ ] スワイプ操作実装
  - [ ] エモーショナルなアニメーション
  - [ ] 閲覧数カウント機能

**成果物**:
- 閲覧機能が完全に動作するアプリ
- エモーショナルなUI/UX

---

### Week 3 (11/27 - 12/3): 認証・ユーザー機能実装

**目標**: ログイン、勇気ブック、コメント機能を実装

- [ ] **Day 15-16: 認証機能**
  - [ ] Supabase Auth設定
  - [ ] サインアップUI
  - [ ] ログインUI
  - [ ] パスワードリセット
  - [ ] ユーザートリガー設定

- [ ] **Day 17-18: 勇気ブック機能**
  - [ ] 保存API実装（`POST /api/courage-books`）
  - [ ] 削除API実装（`DELETE /api/courage-books/[id]`）
  - [ ] 一覧取得API
  - [ ] 勇気ブックページUI
  - [ ] スワイプ削除UI

- [ ] **Day 19-21: コメント機能**
  - [ ] コメント投稿API（`POST /api/comments`）
  - [ ] コメント一覧表示
  - [ ] コメント投稿モーダルUI
  - [ ] コメント削除機能

**成果物**:
- ユーザー登録・ログインが可能
- 勇気ブックへの保存・削除が可能
- コメント投稿が可能

---

### Week 4 (12/4 - 12/10): 管理画面実装

**目標**: 管理画面で先人の声を登録・管理できるようにする

- [ ] **Day 22-23: 管理画面基盤**
  - [ ] 管理者認証の実装
  - [ ] 管理画面レイアウト
  - [ ] ダッシュボードUI

- [ ] **Day 24-25: 先人の声管理**
  - [ ] 一覧表示（`GET /api/admin/stories`）
  - [ ] 新規作成UI
  - [ ] 作成API（`POST /api/admin/stories`）
  - [ ] 編集UI
  - [ ] 編集API（`PATCH /api/admin/stories/[id]`）
  - [ ] 削除API（`DELETE /api/admin/stories/[id]`）

- [ ] **Day 26-27: コメント管理**
  - [ ] コメント一覧取得
  - [ ] 承認/非承認機能
  - [ ] 削除機能

- [ ] **Day 28: カテゴリー管理**
  - [ ] カテゴリー編集UI
  - [ ] 編集API

**成果物**:
- 管理画面から先人の声を登録・編集・削除できる
- コメント管理ができる

---

### Week 5 (12/11 - 12/17): テストデータ投入・UI改善

**目標**: テストデータを投入し、UI/UXを洗練させる

- [ ] **Day 29-30: テストデータ作成**
  - [ ] 各カテゴリー10件ずつ先人の声を作成
  - [ ] GPTsで生成したリアルなストーリー
  - [ ] 画像の準備（先人のアバター画像）

- [ ] **Day 31-32: UI/UXブラッシュアップ**
  - [ ] アニメーションの調整
  - [ ] フォント・余白の最適化
  - [ ] カラーの微調整
  - [ ] レスポンシブの最終調整

- [ ] **Day 33-34: パフォーマンス最適化**
  - [ ] 画像最適化（next/image）
  - [ ] コード分割
  - [ ] Lighthouse監査
  - [ ] Core Web Vitals改善

- [ ] **Day 35: アクセシビリティ対応**
  - [ ] ARIA属性追加
  - [ ] キーボード操作対応
  - [ ] コントラスト比チェック

**成果物**:
- 40件以上のリアルな先人の声
- 洗練されたUI/UX
- 高速なパフォーマンス

---

### Week 6 (12/18 - 12/24): テスト・バグフィックス

**目標**: 徹底的にテストし、バグを潰す

- [ ] **Day 36-37: 単体テスト**
  - [ ] API関数のテスト作成
  - [ ] バリデーションのテスト
  - [ ] コンポーネントのテスト

- [ ] **Day 38-39: E2Eテスト**
  - [ ] Playwright導入
  - [ ] 主要フローのテスト作成
  - [ ] テスト実行・修正

- [ ] **Day 40-41: 実機テスト**
  - [ ] iPhone実機テスト
  - [ ] Android実機テスト
  - [ ] タブレット実機テスト
  - [ ] ブラウザ互換性テスト

- [ ] **Day 42: バグフィックス**
  - [ ] 発見されたバグの修正
  - [ ] エッジケースの対応

**成果物**:
- テストカバレッジ70%以上
- バグがほぼない状態

---

### Week 7 (12/25 - 12/31): デプロイ・最終調整・リリース

**目標**: 本番環境にデプロイし、リリースする

- [ ] **Day 43-44: デプロイ準備**
  - [ ] Vercelプロジェクト作成
  - [ ] 環境変数設定
  - [ ] カスタムドメイン設定
  - [ ] OGP設定

- [ ] **Day 45: 本番デプロイ**
  - [ ] Vercelにデプロイ
  - [ ] 本番環境での動作確認
  - [ ] Supabase本番環境移行

- [ ] **Day 46: 最終チェック**
  - [ ] 全機能の動作確認
  - [ ] パフォーマンス最終確認
  - [ ] セキュリティチェック

- [ ] **Day 47-48: ドキュメント作成**
  - [ ] README作成
  - [ ] 運用マニュアル作成
  - [ ] 管理画面マニュアル作成

- [ ] **Day 49 (12/31): リリース**
  - [ ] 最終確認
  - [ ] リリースアナウンス
  - [ ] 🎉 祝・リリース！

**成果物**:
- 本番環境で動作するsenjinサービス
- ドキュメント一式

---

## タスクブレイクダウン

### プロジェクト初期化（Day 1）

```bash
# Next.js 14プロジェクト作成
npx create-next-app@latest senjin --typescript --tailwind --app --src-dir

# 依存関係インストール
cd senjin
pnpm install framer-motion zustand zod @supabase/supabase-js @supabase/ssr
pnpm install -D @types/node prettier eslint-config-prettier

# shadcn/ui初期化
npx shadcn@latest init

# Gitリポジトリ初期化
git init
git add .
git commit -m "Initial commit"
```

### ディレクトリ構成

```
senjin/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── (main)/
│   │   │   ├── page.tsx                 # トップページ
│   │   │   ├── categories/
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx         # 一覧ページ
│   │   │   ├── stories/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx         # 詳細ページ
│   │   │   ├── courage-book/
│   │   │   │   └── page.tsx             # 勇気ブック
│   │   │   └── my/
│   │   │       └── page.tsx             # マイページ
│   │   ├── admin/
│   │   │   ├── page.tsx                 # ダッシュボード
│   │   │   ├── stories/
│   │   │   │   ├── page.tsx             # 一覧
│   │   │   │   ├── new/page.tsx         # 新規作成
│   │   │   │   └── [id]/edit/page.tsx   # 編集
│   │   │   └── comments/
│   │   │       └── page.tsx             # コメント管理
│   │   ├── api/
│   │   │   ├── stories/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/route.ts
│   │   │   ├── courage-books/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/route.ts
│   │   │   ├── comments/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/route.ts
│   │   │   └── admin/
│   │   │       └── stories/
│   │   │           ├── route.ts
│   │   │           └── [id]/route.ts
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                          # shadcn/uiコンポーネント
│   │   ├── common/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Loading.tsx
│   │   ├── category/
│   │   │   └── CategoryCard.tsx
│   │   ├── story/
│   │   │   ├── StoryCard.tsx
│   │   │   ├── StoryPage.tsx
│   │   │   └── StorySwiper.tsx
│   │   ├── comment/
│   │   │   ├── CommentList.tsx
│   │   │   ├── CommentItem.tsx
│   │   │   └── CommentModal.tsx
│   │   └── admin/
│   │       ├── StoryForm.tsx
│   │       └── Dashboard.tsx
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   ├── server.ts
│   │   │   └── middleware.ts
│   │   ├── stores/
│   │   │   └── user.ts                  # Zustand store
│   │   ├── validations/
│   │   │   ├── story.ts                 # Zodスキーマ
│   │   │   └── comment.ts
│   │   └── utils/
│   │       └── animations.ts            # Framer Motion設定
│   └── types/
│       ├── database.types.ts            # Supabase生成
│       └── index.ts
├── public/
│   ├── fonts/
│   └── images/
├── supabase/
│   └── migrations/
│       ├── 20251113000000_create_categories.sql
│       ├── 20251113000001_create_senjin_stories.sql
│       ├── 20251113000002_create_users.sql
│       ├── 20251113000003_create_courage_books.sql
│       ├── 20251113000004_create_comments.sql
│       └── 20251113000005_create_policies.sql
├── docs/
│   ├── database-design.md
│   ├── screen-design.md
│   ├── functional-requirements.md
│   └── implementation-plan.md
├── .env.local
├── .env.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 開発プラクティス

### コミット規約

```
feat: 新機能
fix: バグ修正
docs: ドキュメント更新
style: コードスタイル修正
refactor: リファクタリング
test: テスト追加・修正
chore: ビルドプロセスや補助ツールの変更
```

### ブランチ戦略

```
main        - 本番環境
develop     - 開発環境
feature/*   - 機能開発
bugfix/*    - バグ修正
```

### コードレビュー

- [ ] プルリクエストは必ず作成
- [ ] 自分でセルフレビュー
- [ ] TypeScriptエラーゼロ
- [ ] ESLint警告ゼロ

---

## リスク管理

### 主要リスクと対策

| リスク | 影響度 | 対策 |
|--------|--------|------|
| スケジュール遅延 | 高 | 週次で進捗確認、優先度の低い機能は後回し |
| Supabaseの学習コスト | 中 | Week 1で徹底的に学習、公式ドキュメント参照 |
| UI/UXの完成度 | 中 | Week 5でバッファを確保、デザイナー協力依頼も検討 |
| バグの多発 | 中 | Week 6でテスト期間を確保 |
| 本番デプロイの失敗 | 高 | Day 45の前にステージング環境でテスト |

### タイムバッファ

- Week 5の後半（Day 33-35）: バッファ期間
- Week 7の前半（Day 46-48）: 最終調整期間

---

## 開発環境

### 必要なツール

- [ ] Node.js 20以上
- [ ] pnpm
- [ ] Git
- [ ] VSCode（推奨）
- [ ] Supabaseアカウント
- [ ] Vercelアカウント

### VSCode拡張機能（推奨）

- [ ] ESLint
- [ ] Prettier
- [ ] Tailwind CSS IntelliSense
- [ ] ES7+ React/Redux/React-Native snippets
- [ ] GitLens

---

## 完了条件

### MVP完成の定義

- [x] 全ての機能が実装されている
- [x] バグがほぼない状態
- [x] パフォーマンスが十分（LCP < 2.5s）
- [x] モバイルで快適に動作する
- [x] 本番環境にデプロイされている
- [x] 40件以上の先人の声が登録されている
- [x] ドキュメントが整備されている

---

## 次のステップ（リリース後）

### フェーズ2（2026年1月以降）

- [ ] GPTsとの自動連携
- [ ] 検索機能
- [ ] いいね機能
- [ ] SNSシェア機能
- [ ] 通知機能
- [ ] 有料プラン（Stripe連携）
- [ ] アナリティクス（GA4連携）
- [ ] A/Bテスト

### 運用

- [ ] 定期的な先人の声の追加
- [ ] ユーザーフィードバックの収集
- [ ] パフォーマンス監視
- [ ] セキュリティアップデート

---

**このプランでさわちゃんと一緒に、素晴らしいsenjinサービスを作り上げましょう！** 🚀

*実装計画は、進捗に応じて柔軟に調整します。*
