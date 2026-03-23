import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-ha-bg-dark text-white/60 pb-20 md:pb-0">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-8 justify-between">
          <div>
            <Link href="/" className="font-black text-lg text-white block mb-2 tracking-tight">
              ハイキタイ
            </Link>
            <p className="text-sm leading-relaxed max-w-xs text-white/40">
              写真で選ぶ、わたしの歯医者さん。
              Instagramの投稿から医院の雰囲気がわかる歯科医院検索。
            </p>
          </div>

          <div className="flex gap-12 text-sm">
            <div className="flex flex-col gap-2">
              <p className="font-medium text-white/80 mb-1">さがす</p>
              <Link href="/search" className="text-white/40 hover:text-white transition-colors">医院を検索</Link>
              <Link href="/map" className="text-white/40 hover:text-white transition-colors">マップから探す</Link>
              <Link href="/search?specialty=矯正歯科" className="text-white/40 hover:text-white transition-colors">矯正歯科</Link>
              <Link href="/search?specialty=小児歯科" className="text-white/40 hover:text-white transition-colors">小児歯科</Link>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium text-white/80 mb-1">サービス</p>
              <Link href="#" className="text-white/40 hover:text-white transition-colors">医院掲載について</Link>
              <Link href="#" className="text-white/40 hover:text-white transition-colors">プライバシーポリシー</Link>
              <Link href="#" className="text-white/40 hover:text-white transition-colors">利用規約</Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-white/30">
          &copy; 2026 ハイキタイ
        </div>
      </div>
    </footer>
  );
}
