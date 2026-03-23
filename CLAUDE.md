# ハイキタイ（歯イキタイ）

## プロジェクト概要
「サウナイキタイ」をオマージュした、Instagram投稿を軸にした歯科医院検索ポータルサイト。
患者が近くの歯医者を**ビジュアル（写真・雰囲気）ファースト**で探せるWebアプリ。

## 技術スタック
- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS v4** + shadcn/ui
- **Supabase** (PostgreSQL + Auth + Storage) ※Phase2以降で接続
- **Google Maps JavaScript API** (地図検索)
- **Vercel** デプロイ

## 現在のフェーズ: MVP プロトタイプ
ダミーデータ（JSON）を使ってフロントエンドUIを完成させる。Supabase連携は後のフェーズ。

## MVP スコープ（実装する画面）
1. **ホーム画面** (`/`)
2. **検索結果画面** (`/search`)
3. **医院詳細画面** (`/clinics/[slug]`)
4. **地図検索画面** (`/map`)

---

## デザインシステム

### 美的方向性
- **トーン**: クリーン＋温かみ。「清潔感のある歯科」×「親しみやすいコミュニティ」
- **差別化ポイント**: Instagram風の写真グリッドが各医院カードに統合されている。サウナイキタイの「サ活」的な写真体験を歯科に持ち込む
- **参考**: https://sauna-ikitai.com/ のカードUI、マップUI、詳細ページ構成

### カラーパレット（Tailwind カスタム）
```css
/* globals.css に定義 */
:root {
  --color-primary: #0D9488;       /* teal-600: メインアクション・ヘッダー */
  --color-primary-light: #5EEAD4; /* teal-300: ホバー・アクセント */
  --color-primary-dark: #0F766E;  /* teal-700: 強調テキスト */
  --color-accent: #F59E0B;        /* amber-500: キニナル！ボタン・評価星 */
  --color-accent-light: #FDE68A;  /* amber-200: キニナルホバー */
  --color-bg: #FFFFFF;            /* ベース背景 */
  --color-bg-subtle: #F0FDFA;     /* teal-50: カード背景・セクション背景 */
  --color-text: #1E293B;          /* slate-800: 本文 */
  --color-text-muted: #64748B;    /* slate-500: サブテキスト */
  --color-border: #E2E8F0;        /* slate-200 */
  --color-open: #22C55E;          /* green-500: 営業中バッジ */
  --color-closed: #EF4444;        /* red-500: 休診バッジ */
}
```

### タイポグラフィ
- **見出しフォント**: "Zen Maru Gothic"（丸みのある日本語フォント。歯科の清潔感＋親しみ）
- **本文フォント**: "Noto Sans JP"
- **英数字**: "Plus Jakarta Sans"（モダンで温かみのあるサンセリフ）
- Google Fonts からインポート

### コンポーネント一覧

#### ClinicCard（医院カード）
サウナイキタイの施設カードに相当。最重要コンポーネント。
```
┌─────────────────────────┐
│  [Instagram写真グリッド]  │  ← 3枚のサムネイル（1大+2小、またはInstagram風3列）
│   メイン写真  │ 小1 │    │
│              │ 小2 │    │
├─────────────────────────┤
│  🦷 ○○歯科クリニック     │  ← 医院名
│  📍 奈良市学園前 ・一般/矯正│  ← エリア + 診療科目タグ
│  ⭐ 4.2 (15件) 🕐 営業中   │  ← 評価 + 営業ステータス
│  [キニナル！ 💛 128]       │  ← お気に入りボタン + カウント
└─────────────────────────┘
```

#### InstagramGallery（Instagram投稿ギャラリー）
医院詳細ページ内で使用。MVP段階ではダミー画像のプレースホルダー。
- 3列グリッド（Instagram風）
- クリックでライトボックス表示
- 「Instagramで見る」外部リンクボタン
- 連携前は「Instagram投稿がここに表示されます」のプレースホルダーUI

#### SearchBar（検索バー）
- エリア選択（都道府県 → 市区町村ドロップダウン）
- フリーテキスト検索
- ホーム画面ではヒーロー内に大きく配置

#### FilterPanel（こだわり検索）
- 診療科目チップ（トグル選択）: 一般歯科 / 矯正歯科 / 審美歯科 / 小児歯科 / 口腔外科 / インプラント
- 特徴チップ: キッズスペース / 個室あり / 駐車場 / バリアフリー / 土日診療 / 夜間診療 / 女性医師
- モバイルではボトムシート or ドロワーで展開

#### KininarouButton（キニナル！ボタン）
サウナイキタイの「イキタイ！」ボタンに相当。
- 未押下: アウトライン + amber カウント表示
- 押下済み: amber塗りつぶし + アニメーション（heartbeat風）
- MVP段階ではローカルstateでトグル（DB保存なし）

#### ClinicMap（地図コンポーネント）
- Google Maps JavaScript API使用
- 医院ピン表示（カスタムマーカー：🦷アイコン）
- ピンクリックでミニカードポップアップ
- 現在地ボタン
- `/map` ではフルスクリーン、`/search` ではハーフ表示

#### BottomNav（モバイル下部ナビ）
- 4タブ: ホーム / さがす / マップ / マイページ
- アクティブ状態: teal-600 のアイコン+テキスト
- デスクトップでは非表示（ヘッダーナビに切替）

#### Header（ヘッダー）
- ロゴ（🦷 ハイキタイ）
- デスクトップ: ナビリンク（ホーム / さがす / マップ / ログイン）
- モバイル: ロゴ + ハンバーガーメニュー

---

## ページ設計

### 1. ホーム画面 (`/`)
```
[Header]
[ヒーローセクション]
  - キャッチコピー: 「写真で選ぶ、わたしの歯医者さん」
  - サブコピー: 「Instagramの投稿から、医院の雰囲気がわかる歯科医院検索」
  - 検索バー（エリア + フリーワード）
  - 背景: teal系のグラデーション or 抽象的な歯のイラスト

[人気の歯医者さん]
  - ClinicCard の横スクロール or 2列グリッド
  - 「キニナル数」順にソート
  - 「もっと見る」→ /search へ

[エリアから探す]
  - 都道府県ボタンリスト（関西圏を上部に配置）
  - クリック → /search?prefecture=奈良県

[診療科目から探す]
  - アイコン付きカード: 一般歯科 / 矯正 / 審美 / 小児 / インプラント
  - クリック → /search?specialty=矯正歯科

[Footer]
[BottomNav] ※モバイルのみ
```

### 2. 検索結果画面 (`/search`)
```
[Header]
[検索バー（コンパクト版）]
[フィルターバー]
  - 診療科目チップ（横スクロール）
  - 「こだわり条件」ボタン → FilterPanel展開

[表示切替: リスト | マップ]

[リスト表示時]
  - ClinicCard のリスト（モバイル: 1列 / デスクトップ: 2列グリッド）
  - ソート: キニナル順 / クチコミ順 / 近い順
  - 無限スクロール or ページネーション

[マップ表示時]
  - 上半分: 地図（ClinicMap）
  - 下半分: カード横スクロール（地図のピンと連動）

[BottomNav]
```

### 3. 医院詳細画面 (`/clinics/[slug]`)
```
[Header]
[ヒーロー写真]（Instagram投稿の1枚目 or メイン画像）

[基本情報カード]
  - 医院名（大きく）
  - ⭐ 評価 + クチコミ件数
  - [キニナル！ボタン]
  - 住所 / 電話 / Webサイトリンク

[Instagram投稿ギャラリー] ★差別化ポイント
  - 3列グリッド（6〜9枚表示）
  - 「もっと見る」で展開
  - 連携前プレースホルダー表示

[診療科目 & 特徴]
  - タグチップ一覧

[診療時間]
  - 曜日別テーブル
  - 現在の営業ステータスバッジ（営業中/休診）

[アクセス]
  - Google Maps 埋め込み（静的 or iframe）
  - 住所テキスト + 「Google Mapsで開く」ボタン

[クチコミ]（MVP段階ではダミー2〜3件）
  - ReviewCard: ユーザー名 / 評価 / 日付 / テキスト

[近くの医院]
  - 関連ClinicCard 3件

[BottomNav]
```

### 4. 地図検索画面 (`/map`)
```
[Header（コンパクト）]
[検索バー（フローティング、マップ上部に重ねる）]
[フルスクリーン ClinicMap]
  - 全ダミー医院のピンを表示
  - ピンタップ → 下部にClinicCardミニ版がスライドアップ
  - 現在地ボタン（右下フローティング）
[BottomNav]
```

---

## データ構造
ダミーデータは `src/data/clinics.json` に配置。型定義は `src/types/clinic.ts`。

### Clinic 型
```typescript
interface Clinic {
  id: string;
  slug: string;
  name: string;
  nameKana: string;
  description: string;
  postalCode: string;
  prefecture: string;
  city: string;
  address: string;
  building?: string;
  latitude: number;
  longitude: number;
  phone: string;
  websiteUrl?: string;
  googleMapsUrl?: string;
  instagramAccount?: string;
  instagramConnected: boolean;
  instagramPosts: InstagramPost[];
  heroImageUrl: string;
  thumbnailUrl: string;
  specialties: string[];
  features: string[];
  openingHours: Record<string, { open: string; close: string } | null>;
  closedDays: string[];
  kininarouCount: number;
  reviewCount: number;
  reviewAverage: number;
  reviews: Review[];
}

interface InstagramPost {
  id: string;
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  mediaUrl: string;
  caption?: string;
  permalink: string;
  timestamp: string;
}

interface Review {
  id: string;
  userName: string;
  rating: number;
  title: string;
  body: string;
  treatmentType: string;
  visitDate: string;
  createdAt: string;
}
```

---

## フォルダ構成
```
ha-ikitai/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                  # ホーム
│   │   ├── search/page.tsx           # 検索結果
│   │   ├── clinics/[slug]/page.tsx   # 医院詳細
│   │   ├── map/page.tsx              # 地図検索
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                       # shadcn/ui
│   │   ├── layout/
│   │   │   ├── header.tsx
│   │   │   ├── bottom-nav.tsx
│   │   │   └── footer.tsx
│   │   ├── clinic/
│   │   │   ├── clinic-card.tsx
│   │   │   ├── clinic-hours.tsx
│   │   │   └── kininarou-button.tsx
│   │   ├── search/
│   │   │   ├── search-bar.tsx
│   │   │   └── filter-panel.tsx
│   │   ├── instagram/
│   │   │   └── instagram-gallery.tsx
│   │   ├── map/
│   │   │   └── clinic-map.tsx
│   │   └── review/
│   │       └── review-card.tsx
│   ├── data/
│   │   └── clinics.json              # ダミーデータ
│   ├── types/
│   │   └── clinic.ts
│   ├── lib/
│   │   └── utils.ts                  # cn() ヘルパー等
│   └── hooks/
│       └── use-geolocation.ts        # 現在地取得フック
├── public/
│   └── images/
│       └── placeholder-clinic.jpg    # プレースホルダー画像
├── CLAUDE.md                         # このファイル
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## コーディング規約
- コンポーネントは関数コンポーネント + TypeScript
- `"use client"` は必要なコンポーネントにのみ付与（状態・ブラウザAPIを使うもの）
- import は絶対パス `@/` を使用
- UI文言は全て日本語
- コメントは日本語推奨
- Tailwindクラスは `cn()` ユーティリティで結合
- 画像は Next.js `<Image>` コンポーネント使用
- アイコンは `lucide-react` を使用

## 重要な注意
- MVP段階ではSupabase接続なし。全データは `clinics.json` から読み込む
- Google Maps APIキーは `.env.local` の `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` に設定（未設定の場合は静的マップ画像 or プレースホルダー表示にフォールバック）
- Instagram連携は Phase2。MVP段階では各医院に `instagramPosts` 配列があり、`mediaUrl` にプレースホルダー画像URLを入れておく
- モバイルファースト設計。全画面でモバイル表示を最優先
