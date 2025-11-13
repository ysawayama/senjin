# senjin - 先輩から後輩へ、生のアドバイスを贈るサービス

> 人生の先輩/先人（何かをやった人）から、まだやっていない人、今悩んでいる人へ生のアドバイスを贈る

---

## 📖 プロジェクト概要

**senjin（センジン）** は、人生の経験者が後輩たちに向けて、自分の体験とアドバイスを贈るサービスです。

### ターゲットユーザー
- 学生や若者（スマートフォン利用を想定）
- 進路、転職、就活、困難などで悩んでいる人

### コアバリュー
- **エモーショナル**: 心に染み渡る、温かいページめくり体験
- **リアル**: GPTsで引き出された、先人の生の声
- **アクション**: 勇気ブックに保存、ポジティブなコメントで繋がる

---

## 🚀 開発スケジュール

**開始日**: 2025年11月13日
**リリース予定**: 2025年12月31日
**開発期間**: 7週間（49日間）

### マイルストーン

- **Week 1**: プロジェクトセットアップ
- **Week 2**: ユーザー向け基本機能実装
- **Week 3**: 認証・ユーザー機能実装
- **Week 4**: 管理画面実装
- **Week 5**: テストデータ投入・UI改善
- **Week 6**: テスト・バグフィックス
- **Week 7**: デプロイ・リリース

詳細: [implementation-plan.md](./docs/implementation-plan.md)

---

## 🛠️ 技術スタック

### コア技術
- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **Animation**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **State**: Zustand
- **Validation**: Zod
- **Deployment**: Vercel

### 選定理由
1ヶ月での高速開発に最適な、モダンかつ実績のあるスタック。エモーショナルなUI/UX実現も可能。

---

## 📁 ドキュメント

プロジェクトの全設計ドキュメントは `docs/` ディレクトリに格納されています。

| ドキュメント | 内容 |
|------------|------|
| [database-design.md](./docs/database-design.md) | データベーステーブル定義、ER図、RLSポリシー |
| [screen-design.md](./docs/screen-design.md) | 画面設計、ユーザーフロー、デザイン仕様 |
| [functional-requirements.md](./docs/functional-requirements.md) | 機能要件、API仕様、テスト要件 |
| [implementation-plan.md](./docs/implementation-plan.md) | 実装計画、スケジュール、タスク分解 |

---

## 🎨 デザインコンセプト

### テーマ
**「心に染み渡る、温かいページめくり体験」**

### 特徴的なUI/UX
1. **ページめくり形式**: スクロールではなく、スワイプでページをめくる没入体験
2. **1画面1メッセージ**: 長いテキストを複数ページに分割し、じっくり読ませる
3. **エモーショナルなアニメーション**: Framer Motionによる滑らかな画面遷移
4. **温かみのあるフォント**: M PLUS Rounded 1c / Noto Sans JP

### カラーパレット
- メイン: 落ち着いたグレー (#4A5568)
- アクセント: 温かみのあるオレンジ (#F6AD55)
- ベース: 温かみのあるオフホワイト (#FFFBF0)

---

## 📊 データベース設計

### 主要テーブル

```
categories (悩みカテゴリー)
    ↓
senjin_stories (先人の声)
    ↓
courage_books (勇気ブック) + comments (コメント)
    ↓
users (ユーザー)
```

### 特徴
- **Supabase RLS**: 行レベルセキュリティで安全なデータアクセス
- **自動カウンター**: トリガーで閲覧数・アーカイブ数・コメント数を自動更新
- **全文検索対応**: 日本語検索にも対応（将来実装）

---

## 🎯 主要機能

### ユーザー向け機能（MVP）

1. **トップページ**: 4つの悩みカテゴリーから選択
2. **先人の声一覧**: カテゴリー別にキャッチコピーを表示
3. **先人の声詳細**: ページめくり形式で体験談を読む
4. **勇気ブック**: お気に入りの声を保存
5. **コメント機能**: ポジティブな意見を投稿
6. **認証**: メールアドレス + パスワードでログイン

### 管理者向け機能（MVP）

1. **ダッシュボード**: 統計情報表示
2. **先人の声管理**: 作成・編集・削除
3. **コメント管理**: 承認・削除

### 将来実装予定

- GPTsとの自動連携
- 検索機能
- SNSシェア
- 有料プラン
- 通知機能

---

## 🚦 次のステップ

### さわちゃんへ

設計が完成しました！次は実装に移ります。以下の順序で進めることをおすすめします：

1. **プロジェクト初期化**
   ```bash
   npx create-next-app@latest senjin --typescript --tailwind --app --src-dir
   cd senjin
   pnpm install framer-motion zustand zod @supabase/supabase-js @supabase/ssr
   ```

2. **Supabaseセットアップ**
   - Supabaseプロジェクト作成
   - データベースマイグレーション実行
   - 環境変数設定

3. **Week 1のタスク開始**
   - [implementation-plan.md](./docs/implementation-plan.md) を参照

### 準備するもの

- [ ] Supabaseアカウント
- [ ] Vercelアカウント
- [ ] Node.js 20以上
- [ ] pnpm
- [ ] VSCode（推奨）

---

## 📝 開発ガイドライン

### ZEAMI Framework準拠

このプロジェクトは [ZEAMI Framework](./ZEAMI.md) の原則に従います。

- ✅ Best Practices First
- ✅ Root Cause Resolution
- ✅ Maintain Simplicity
- ✅ Type Safety
- ✅ Proactive Execution

### コミット規約

```
feat: 新機能
fix: バグ修正
docs: ドキュメント更新
style: コードスタイル修正
refactor: リファクタリング
test: テスト追加・修正
```

---

## 🤝 サポート

質問や相談があれば、いつでもZEAMi（私）に聞いてください！

---

## 📄 ライセンス

このプロジェクトはプライベートプロジェクトです。

---

**Let's build something amazing together!** 🚀

*Generated with ❤️ by ZEAMi - 2025/11/13*
