import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-ha-bg-subtle border-t border-ha-border mt-16 pb-20 md:pb-0">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-8 justify-between">
          <div>
            <Link href="/" className="flex items-center gap-1.5 font-heading font-bold text-lg text-primary mb-2">
              <span>🦷</span>
              <span>ハイキタイ</span>
            </Link>
            <p className="text-sm text-text-muted leading-relaxed max-w-xs">
              写真で選ぶ、わたしの歯医者さん。<br />
              Instagramの投稿から医院の雰囲気がわかる、新しい歯科医院検索。
            </p>
          </div>

          <div className="flex gap-12 text-sm">
            <div className="flex flex-col gap-2">
              <p className="font-medium text-ha-text mb-1">さがす</p>
              <Link href="/search" className="text-text-muted hover:text-primary transition-colors">医院を検索</Link>
              <Link href="/map" className="text-text-muted hover:text-primary transition-colors">マップから探す</Link>
              <Link href="/search?specialty=矯正歯科" className="text-text-muted hover:text-primary transition-colors">矯正歯科</Link>
              <Link href="/search?specialty=小児歯科" className="text-text-muted hover:text-primary transition-colors">小児歯科</Link>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium text-ha-text mb-1">サービス</p>
              <Link href="#" className="text-text-muted hover:text-primary transition-colors">医院掲載について</Link>
              <Link href="#" className="text-text-muted hover:text-primary transition-colors">プライバシーポリシー</Link>
              <Link href="#" className="text-text-muted hover:text-primary transition-colors">利用規約</Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-ha-border text-center text-xs text-text-muted">
          © 2026 ハイキタイ. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
