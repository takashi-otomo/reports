# reports

編集会議レポートを GitHub Pages で公開するためのサイトです。

🔗 **公開 URL:** https://takashi-otomo.github.io/reports/

> GitHub Pages の有効化: リポジトリの **Settings → Pages** で **Source: Deploy from a branch**、**Branch: `main` / `/ (root)`** を選択してください。各レポートは静的な HTML/CSS/JS で構成されています。

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
