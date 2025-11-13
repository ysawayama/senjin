export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">ページが見つかりません</h2>
      <p className="mt-4 text-muted-foreground">
        お探しのページは存在しないか、移動した可能性があります。
      </p>
      <a
        href="/"
        className="mt-8 rounded-lg bg-primary px-6 py-3 text-primary-foreground hover:opacity-90"
      >
        トップページに戻る
      </a>
    </div>
  );
}
