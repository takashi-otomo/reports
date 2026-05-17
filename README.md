# reports

編集会議レポートを GitHub Pages で公開するためのサイトです。

🔗 **公開 URL:** https://reports.motowo.jp/ （カスタムドメイン）

> GitHub Pages の設定: リポジトリの **Settings → Pages** で **Source: Deploy from a branch**、**Branch: `main` / `/ (root)`**、**Custom domain: `reports.motowo.jp`**（`CNAME` ファイルで設定済み）。カスタムドメインのためサイトのルートは `/`（`_config.yml` の `baseurl` は空）。各レポートは静的な HTML/CSS/JS で構成されています。

## 📚 レポート一覧

| レポート | 種別 | トピック | 取得日 |
|---|---|---|---|
| 🧭 [Anthropic の 5 パターンで Claude Code エージェント設計を分類する](editorial-reports/anthropic-multi-agent-coordination-patterns-guide/) | tech | claudecode, ai, multiagent, anthropic, automation | 2026-05-01 |

## 🗂 ディレクトリ構成

```
index.html            # サイトのトップ（レポート一覧。https://reports.motowo.jp/）
editorial-reports/
└── <slug>/
    ├── index.html   # 公開ページ（GitHub Pages で表示される）
    ├── styles.css
    ├── script.js
    └── report.md    # 元原稿（Markdown）
```

各レポートは `editorial-reports/<slug>/` 配下に格納します。レポートを追加したら **(1) 上記の一覧テーブル** と **(2) ルート `index.html` の `<ul class="reports">` 内のカード** の 2 箇所に追記してください。リンクは末尾スラッシュ付きの相対パスにすると、GitHub Pages 上で `index.html` が自動的に表示されます。

## 📊 アクセス解析タグ（全ページ共通）

Google Tag Manager（`GTM-MPX9LPX8`）と GA4 gtag.js（`G-8SS2P3RE61`）を共通コンポーネント化しています。測定 ID は各共有 JS の 1 箇所のみで管理します。

- `assets/gtm.js` … GTM の `<head>` 用タグ（共有 JS）。
- `assets/ga.js` … GA4 gtag.js（共有 JS）。本体を非同期ロード＋初期化。`dataLayer` は GTM と共有。
- `_includes/gtm-noscript.html` … GTM の `<body>` 用 `<noscript>`（Jekyll include）。
- `_config.yml` … カスタムドメインのため `baseurl` は空（`relative_url` のパス解決に使用）。

### 新規ページに組み込む手順

各レポートの `index.html` に以下の 3 点を追加します（`{% include %}` を動かすには **front matter が必須**）。

1. ファイル先頭に空の front matter:
   ```
   ---
   ---
   ```
2. `<head>` 内のできるだけ上に共有 JS の読み込み:
   ```html
   <!-- Google Tag Manager -->
   <script src="{{ '/assets/gtm.js' | relative_url }}"></script>
   <!-- End Google Tag Manager -->
   <!-- Google tag (gtag.js) -->
   <script src="{{ '/assets/ga.js' | relative_url }}"></script>
   <!-- End Google tag (gtag.js) -->
   ```
3. `<body>` 開始直後に noscript include:
   ```liquid
   {% include gtm-noscript.html %}
   ```

> ⚠️ front matter が無い HTML は Jekyll が Liquid を処理せず素通しするため、`{% include %}` が文字列のまま表示されます。新規ページには必ず front matter を付けてください。ローカル確認は `bundle exec jekyll serve` で行えます。
