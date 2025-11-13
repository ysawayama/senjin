# senjin データベース設計書

## ER図

```
categories (1) ----< (N) senjin_stories
                            |
                            | (N)
                            v
users (1) ----< (N) courage_books
  |
  | (1)
  v
  (N) comments >---- (1) senjin_stories
```

## テーブル定義

### 1. categories（悩みカテゴリー）

先人の声を分類するカテゴリー。4種類固定。

| カラム名 | 型 | NULL | デフォルト | 説明 |
|---------|-----|------|-----------|------|
| id | uuid | NO | gen_random_uuid() | カテゴリーID（主キー） |
| name | varchar(100) | NO | - | カテゴリー名 |
| slug | varchar(50) | NO | - | URLスラッグ（進路/転職/就活/困難） |
| emoji | varchar(10) | YES | - | カテゴリーを表す絵文字 |
| description | text | YES | - | カテゴリーの説明 |
| display_order | integer | NO | 0 | 表示順序 |
| created_at | timestamp | NO | now() | 作成日時 |
| updated_at | timestamp | NO | now() | 更新日時 |

**インデックス:**
- PRIMARY KEY (id)
- UNIQUE (slug)

**初期データ:**
```sql
INSERT INTO categories (name, slug, emoji, description, display_order) VALUES
('進路に悩む', 'career-path', '🎓', '進路選択で悩んでいる人へ', 1),
('転職・退職に悩む', 'job-change', '💼', '転職や退職を考えている人へ', 2),
('就活に悩む', 'job-hunting', '👔', '就職活動で悩んでいる人へ', 3),
('もう詰んだ…', 'desperate', '🌧️', '困難な状況に直面している人へ', 4);
```

---

### 2. senjin_stories（先人の声）

先人の体験談とアドバイスを格納するメインテーブル。

| カラム名 | 型 | NULL | デフォルト | 説明 |
|---------|-----|------|-----------|------|
| id | uuid | NO | gen_random_uuid() | ストーリーID（主キー） |
| category_id | uuid | NO | - | カテゴリーID（外部キー） |
| catchphrase | varchar(200) | NO | - | キャッチコピー（一覧表示用） |
| senjin_name | varchar(100) | NO | - | 先人の名前（匿名可） |
| senjin_age_at_time | integer | YES | - | 当時の年齢 |
| senjin_current_role | varchar(200) | YES | - | 現在の立場・役職 |
| story_context | text | NO | - | 状況の説明（GPTsの「状況の確認」） |
| story_emotion | text | NO | - | 感情の掘り下げ（GPTsの「感情の掘り下げ」） |
| story_decision | text | NO | - | 決断と意味（GPTsの「決断と意味」） |
| final_message | text | NO | - | ひとこと（最も重要なメッセージ） |
| view_count | integer | NO | 0 | 閲覧数 |
| archive_count | integer | NO | 0 | 勇気ブック保存数 |
| comment_count | integer | NO | 0 | コメント数 |
| is_published | boolean | NO | false | 公開状態 |
| published_at | timestamp | YES | - | 公開日時 |
| created_at | timestamp | NO | now() | 作成日時 |
| updated_at | timestamp | NO | now() | 更新日時 |

**インデックス:**
- PRIMARY KEY (id)
- INDEX (category_id)
- INDEX (is_published, published_at DESC) -- 公開記事の新着順取得用
- INDEX (archive_count DESC) -- 人気順取得用

**外部キー:**
- FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT

---

### 3. users（ユーザー）

登録ユーザー情報。Supabase Authと連携。

| カラム名 | 型 | NULL | デフォルト | 説明 |
|---------|-----|------|-----------|------|
| id | uuid | NO | - | ユーザーID（Supabase Auth UIDと同一） |
| email | varchar(255) | YES | - | メールアドレス |
| nickname | varchar(50) | YES | - | ニックネーム |
| avatar_url | text | YES | - | アバター画像URL |
| created_at | timestamp | NO | now() | 登録日時 |
| updated_at | timestamp | NO | now() | 更新日時 |

**インデックス:**
- PRIMARY KEY (id)

**備考:**
- Supabase Authの`auth.users`テーブルと連携
- サインアップ時に自動作成されるトリガーを設定

---

### 4. courage_books（勇気ブック）

ユーザーが保存した先人の声のアーカイブ。

| カラム名 | 型 | NULL | デフォルト | 説明 |
|---------|-----|------|-----------|------|
| id | uuid | NO | gen_random_uuid() | アーカイブID（主キー） |
| user_id | uuid | NO | - | ユーザーID（外部キー） |
| story_id | uuid | NO | - | ストーリーID（外部キー） |
| memo | text | YES | - | 個人的なメモ |
| created_at | timestamp | NO | now() | 保存日時 |

**インデックス:**
- PRIMARY KEY (id)
- UNIQUE (user_id, story_id) -- 同じストーリーを重複保存できないように
- INDEX (user_id, created_at DESC) -- ユーザーの勇気ブック一覧取得用

**外部キー:**
- FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
- FOREIGN KEY (story_id) REFERENCES senjin_stories(id) ON DELETE CASCADE

---

### 5. comments（コメント）

ポジティブな意見・感想を投稿するコメント機能。

| カラム名 | 型 | NULL | デフォルト | 説明 |
|---------|-----|------|-----------|------|
| id | uuid | NO | gen_random_uuid() | コメントID（主キー） |
| story_id | uuid | NO | - | ストーリーID（外部キー） |
| user_id | uuid | NO | - | ユーザーID（外部キー） |
| content | text | NO | - | コメント内容 |
| is_approved | boolean | NO | true | 承認状態（将来的な荒らし対策用） |
| created_at | timestamp | NO | now() | 投稿日時 |
| updated_at | timestamp | NO | now() | 更新日時 |

**インデックス:**
- PRIMARY KEY (id)
- INDEX (story_id, created_at DESC) -- ストーリーのコメント一覧取得用
- INDEX (user_id, created_at DESC) -- ユーザーの投稿コメント一覧取得用

**外部キー:**
- FOREIGN KEY (story_id) REFERENCES senjin_stories(id) ON DELETE CASCADE
- FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE

---

## Row Level Security (RLS) ポリシー

Supabaseの強力なセキュリティ機能を活用。

### categories
```sql
-- 誰でも閲覧可能
CREATE POLICY "Anyone can read categories" ON categories
  FOR SELECT USING (true);

-- 管理者のみ編集可能（将来実装）
-- CREATE POLICY "Only admins can modify categories" ON categories
--   FOR ALL USING (is_admin());
```

### senjin_stories
```sql
-- 公開されている記事は誰でも閲覧可能
CREATE POLICY "Anyone can read published stories" ON senjin_stories
  FOR SELECT USING (is_published = true);

-- 管理者のみ編集可能（将来実装）
-- CREATE POLICY "Only admins can modify stories" ON senjin_stories
--   FOR ALL USING (is_admin());
```

### users
```sql
-- 自分の情報は閲覧・編集可能
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);
```

### courage_books
```sql
-- 自分の勇気ブックのみ閲覧・編集可能
CREATE POLICY "Users can read own courage books" ON courage_books
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own courage books" ON courage_books
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own courage books" ON courage_books
  FOR DELETE USING (auth.uid() = user_id);
```

### comments
```sql
-- コメントは誰でも閲覧可能（承認済みのみ）
CREATE POLICY "Anyone can read approved comments" ON comments
  FOR SELECT USING (is_approved = true);

-- ログインユーザーはコメント投稿可能
CREATE POLICY "Authenticated users can insert comments" ON comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 自分のコメントのみ編集・削除可能
CREATE POLICY "Users can update own comments" ON comments
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments" ON comments
  FOR DELETE USING (auth.uid() = user_id);
```

---

## トリガー

### 1. ユーザー自動作成トリガー

Supabase Authでサインアップ時にusersテーブルにレコードを自動作成。

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

### 2. カウンター更新トリガー

閲覧数、アーカイブ数、コメント数を自動更新。

```sql
-- 勇気ブック保存時にカウント増加
CREATE OR REPLACE FUNCTION increment_archive_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE senjin_stories
  SET archive_count = archive_count + 1
  WHERE id = NEW.story_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_courage_book_created
  AFTER INSERT ON courage_books
  FOR EACH ROW
  EXECUTE FUNCTION increment_archive_count();

-- 勇気ブック削除時にカウント減少
CREATE OR REPLACE FUNCTION decrement_archive_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE senjin_stories
  SET archive_count = archive_count - 1
  WHERE id = OLD.story_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_courage_book_deleted
  AFTER DELETE ON courage_books
  FOR EACH ROW
  EXECUTE FUNCTION decrement_archive_count();

-- コメント投稿時にカウント増加
CREATE OR REPLACE FUNCTION increment_comment_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE senjin_stories
  SET comment_count = comment_count + 1
  WHERE id = NEW.story_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_comment_created
  AFTER INSERT ON comments
  FOR EACH ROW
  EXECUTE FUNCTION increment_comment_count();

-- コメント削除時にカウント減少
CREATE OR REPLACE FUNCTION decrement_comment_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE senjin_stories
  SET comment_count = comment_count - 1
  WHERE id = OLD.story_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_comment_deleted
  AFTER DELETE ON comments
  FOR EACH ROW
  EXECUTE FUNCTION decrement_comment_count();
```

### 3. updated_at自動更新トリガー

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 各テーブルに適用
CREATE TRIGGER update_senjin_stories_updated_at BEFORE UPDATE ON senjin_stories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

---

## パフォーマンス最適化

### 1. よく使うクエリのインデックス

```sql
-- カテゴリー別の人気記事取得用
CREATE INDEX idx_stories_popular_by_category ON senjin_stories(category_id, archive_count DESC)
WHERE is_published = true;

-- 新着記事取得用
CREATE INDEX idx_stories_recent ON senjin_stories(published_at DESC)
WHERE is_published = true;
```

### 2. 全文検索（将来実装）

```sql
-- 先人の声を検索できるように（日本語対応）
ALTER TABLE senjin_stories ADD COLUMN search_vector tsvector;

CREATE INDEX idx_stories_search ON senjin_stories USING gin(search_vector);

CREATE OR REPLACE FUNCTION update_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := to_tsvector('japanese',
    coalesce(NEW.catchphrase, '') || ' ' ||
    coalesce(NEW.final_message, '') || ' ' ||
    coalesce(NEW.story_context, '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_stories_search_vector BEFORE INSERT OR UPDATE ON senjin_stories
  FOR EACH ROW EXECUTE FUNCTION update_search_vector();
```

---

## マイグレーション実行順序

1. `categories` テーブル作成 + 初期データ投入
2. `senjin_stories` テーブル作成
3. `users` テーブル作成 + Authトリガー
4. `courage_books` テーブル作成 + カウンタートリガー
5. `comments` テーブル作成 + カウンタートリガー
6. RLSポリシー設定
7. インデックス作成

---

## データ例

### senjin_storiesサンプルデータ

```json
{
  "id": "uuid",
  "category_id": "進路に悩む",
  "catchphrase": "美大に行くか、就職するか。親との対立を乗り越えて見つけた答え",
  "senjin_name": "デザイナー・田中さん",
  "senjin_age_at_time": 18,
  "senjin_current_role": "UXデザイナー（大手IT企業）",
  "story_context": "高3の秋、美大進学を希望していたが、親は安定した企業への就職を望んでいた。周りの友人は次々と進路を決めていく中、一人だけ取り残された気分だった。",
  "story_emotion": "不安と焦り。親との口論も増え、毎晩泣いていた。でも、絵を描いている時だけは心が落ち着いた。",
  "story_decision": "先生に相談したことがきっかけ。「好きなことで生きていける保証はないけど、好きじゃないことで一生を過ごすのは辛いよ」という言葉が背中を押してくれた。",
  "final_message": "悩んでいる時間も、あなたの人生の一部。焦らなくていい。あなたの心が本当に望むものは何か、静かに耳を傾けてみて。",
  "is_published": true
}
```

---

## 管理画面で必要な機能

- [ ] 先人の声の作成・編集・削除
- [ ] カテゴリー管理
- [ ] ユーザー一覧・管理
- [ ] コメントの承認・削除（荒らし対策）
- [ ] 統計情報（閲覧数、人気記事、登録ユーザー数など）

---

*このデータベース設計は、将来的な機能拡張も考慮した設計となっています。*
