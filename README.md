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
editorial-reports/
└── <slug>/
    ├── index.html   # 公開ページ（GitHub Pages で表示される）
    ├── styles.css
    ├── script.js
    └── report.md    # 元原稿（Markdown）
```

各レポートは `editorial-reports/<slug>/` 配下に格納し、上記の一覧テーブルに 1 行追記してください。リンクは末尾スラッシュ付きの相対パスにすると、GitHub Pages 上で `index.html` が自動的に表示されます。

## 📊 Google Tag Manager（全ページ共通）

コンテナ ID `GTM-MPX9LPX8` を共通コンポーネント化しています。

- `assets/gtm.js` … `<head>` 用タグ（共有 JS）。ID 変更時はこのファイルの 1 箇所のみ修正。
- `_includes/gtm-noscript.html` … `<body>` 用 `<noscript>`（Jekyll include）。
- `_config.yml` … `baseurl: /reports` を設定（`relative_url` のパス解決に使用）。

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
   ```
3. `<body>` 開始直後に noscript include:
   ```liquid
   {% include gtm-noscript.html %}
   ```

> ⚠️ front matter が無い HTML は Jekyll が Liquid を処理せず素通しするため、`{% include %}` が文字列のまま表示されます。新規ページには必ず front matter を付けてください。ローカル確認は `bundle exec jekyll serve` で行えます。
