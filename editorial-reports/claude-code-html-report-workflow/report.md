# 編集会議レポート: Claude Code で HTML レポートワークフローを構築する—非デザイナー向け実装ガイド

- editorial-meeting #180 · 2026-05-18 JST · scraps/html_report_workflow/

## A. サマリー / 承認

| 項目 | 内容 |
|---|---|
| タイトル | Claude Code で HTML レポートワークフローを構築する—非デザイナー向け実装ガイド |
| 絵文字 / type | 🎨 / tech |
| topics | claudecode, html, ai, llm |
| slug | `claude-code-html-report-workflow` |
| 形態 | 単発（前作 `ai-agent-html-output-design` の実装・実証編） |
| 編集長判定 | ⚠️ 条件付き承認（`conditional`） · editor-in-chief · 2026-05-18 |

**企画概要**: 非デザイナーのエンジニアが Claude Code を使い、長大で消費しにくい Markdown レポートを「一目で意思決定できる」HTML レポート生成ワークフローへ拡張・運用した実装記。前作 cornerstone `ai-agent-html-output-design`（設計思想・理論編）で予告した「Zenn 編集ワークフローへの統合案」を回収・実証する。

## B. ターゲット読者

- **経験レベル**: Claude Code でマルチエージェントワークフロー（`/editorial` 等）を運用中。前作 `ai-agent-html-output-design` を読んで HTML 出力に興味を持った
- **前提知識**: Claude スキル/コマンド定義の編集 / Markdown レポートワークフローの基本 / HTML・CSS は「存在は知るが書けない」非デザイナー
- **⚠️ 抱えている課題**: 200 行の Markdown レポートでは承認ステータス・ボリューム感が埋もれる消費効率の悪さ。デザインスキルがなくリッチ HTML を作れず、ワークフローへの組み込み手順も不明

## C. 構成案

推定総文字数 約 9,000 字 / 6 セクション / 図表多め / コード例あり

| # | H2 | 概要 | ボリューム | コード/図 |
|---|---|---|---|---|
| 01 | なぜ Markdown レポートでは限界なのか | 「狭いキャンバス」問題・Consumability 欠如・Thariq / Karpathy 一次資料 | ~1,400字 | 図 |
| 02 | 非デザイナーは Claude に何を頼んだのか | 10 ブロック構成（A〜J）と推奨視覚効果の構成表・要件提示の仕方 | ~1,800字 | 図(表) |
| 03 | 確定事項と検討経緯を「色温度」で分ける | 核心のデザイン原則。確定=濃色・実線／検討経緯=淡色・破線を CSS トークン化 | ~1,500字 | コード/図 |
| 04 | /editorial ワークフローへどう統合したか | 3 アウトプット（Issue/MD/HTML）・分析ブリーフ・単一ファイル完結 | ~1,700字 | コード/図 |
| 05 | 非デザイナーが今日から始める 5 ステップ | 企画→テンプレ作成→組込→分析ブリーフ注入→適用と継続改善・実例 HTML リンク | ~1,800字 | コード/図 |
| 06 | まとめ：Markdown と HTML の耐久性層別化 | 原本=MD／意思決定支援=HTML の使い分け。「長文 HTML パラドックス」への自己言及を含む | ~800字 | — |

> **書き出し方針（体験談オープン + Answer-first TL;DR）**: 「200 行の Markdown レポートを前に、承認されたのかすら一目でわからない——非デザイナーの自分が抱えた最初の壁」という体験談から入り、冒頭に Answer-first の TL;DR ブロックと前作 `ai-agent-html-output-design` への内部リンクを必ず配置する。

## D. SEO 戦略

- **主要キーワード（重要度順）**: Claude Code(高) / HTML レポート(高) / 非デザイナー(中) / 編集ワークフロー(中) / レポートテンプレート(低) / /editorial(低)
- **想定検索クエリ**:
  - Claude Code HTML レポート 生成（方法）
  - AI レポート Markdown HTML 移行（比較）
  - 非デザイナー HTML AI 自動生成（方法）
  - /editorial カスタマイズ ワークフロー（方法）
  - AI レポート 消費効率 ダッシュボード（情報収集）
- **slug**: `claude-code-html-report-workflow`
- **slug 選定理由**: 当初案 `ai-agent-html-report-workflow` は前作 `ai-agent-html-output-design` と語幹が酷似し自己カニバリ（検索共食い）リスクと編集長が指摘。主要 KW（claude-code / html / report / workflow）を網羅しつつ前作と差別化でき、実装・運用編であることが URL から伝わる本案を採用
- **GEO チェックリスト**:
  - ✅ Answer-first（冒頭 120 字に課題→解決→得られるもの）
  - ✅ 疑問形 H2（「なぜ〜」「何を〜」「どう〜」）3 箇所
  - ✅ TL;DR ブロック + 前作への内部リンク
  - ⬜ 「長文 HTML パラドックス」への自己言及（執筆時必須・draft 申し送り）

## E. 訴求ポイント

- **独自価値**: 人気 cornerstone（理論編、90 日 336PV）の唯一の実装編。再利用可能な 10 ブロックテンプレート構成表と「色温度分離」という独自デザイン原則
- **読者メリット**: 非デザイナーでも 5 ステップで再現可能。公開中の実例 HTML（reports.motowo.jp）で成果物を即確認できる
- **読後にできること（Before → After）**: 自分の Markdown ワークフローを HTML 化し、確定事項と検討経緯を一目で把握できるダッシュボードを構築できる。Before: 200 行 MD で承認が埋もれる → After: 信号機チップで一目把握

## F. ライブラリアン調査

| 区分 | 記事 | 関係 |
|---|---|---|
| 直接の前作 | `ai-agent-html-output-design` | 設計思想・理論編（cornerstone）。本記事はその実装・実証編 |
| 強い関連 | `anthropic-multi-agent-coordination-patterns-guide` | 本ワークフローで生成した実例レポートの対象。サイト 1 位 2,558PV |
| 強い関連 | `claude-code-editorial-team-1week` | `/editorial` の母体（12 エージェント編集チーム） |
| 間接的な関連 | `claude-code-editorial-team-ecosystem-1/-2` | 出力フォーマット層別化の補完 |
| 間接的な関連 | `claude-code-drawio-mcp-screenshot-workflow` | SVG 図解の対比手法 |

**既存記事との差別化**

| 観点 | 前作 ai-agent-html-output-design | 本記事 |
|---|---|---|
| 扱う層 | なぜ HTML が効くか（理論・パラダイムシフト） | 非デザイナーが実際にどう作ったか（実装・運用） |
| 中核コンテンツ | 6 軸比較マトリクス・4 ユースケース | 10 ブロックテンプレート構成表・色温度分離原則 |
| **差別化ポイント** | 統合は「案」にとどまる | **5 ステップ再現手順 + 公開中の実例 HTML で実証** |
| 読後の到達点 | HTML 出力の意義を説明できる | 自分のワークフローを HTML 化できる |

> **回収ポイント**: 前作 `ai-agent-html-output-design`（概要）「Zenn 編集ワークフローへの統合案、…耐久性層別化フレームまでを一気通貫で扱う」——前作で提示された統合は "案" の段階。本記事がそれを実装・実証として回収する。

## G. GA データ分析

出典: `analytics/editorial-20260517-235035.md`（Gemini CLI 経由 GA4 連携 / 過去 90 日）

**KPI**

| 指標 | 値 | 備考 |
|---|---|---|
| 最人気カテゴリ PV | 3,909 | AI Agent / LLM Orchestration · 断トツ 1 位 |
| 実例リンク先 PV | 2,558 | anthropic-…-guide · サイト 1 位 |
| 前作 cornerstone PV | 336 | ai-agent-html-output-design |

**カテゴリ別 PV**: AI Agent / LLM Orchestration 3,909 / Local AI・Multimodal 487 / Flutter 336 / Testing 209 / Cloud 145

**人気記事 Top 10（PV）**

1. anthropic-multi-agent-coordination-patterns-guide — 2,558（強い関連・実例リンク先）
2. claude-code-gemini-cli-orchestration-guide — 456
3. gemma4-multimodal-video-analyzer — 368
4. **ai-agent-html-output-design — 336（直接の前作）**
5. codex-claude-code-copilot-2026 — 326
6. firebase-app-distribution-flutter-setup — 180
7. maestro-flutter-japanese-input-bridge — 157
8. claude-code-grok-gemini-multi-ai-orchestration — 128
9. local-ai-code-review-operations — 120
10. claude-gemini-collaborative-dev — 116

**流入キーワード（90 日 / セッション抜粋）**: Claude Grok Gemini Orchestration 66 / Gemini Gal Persona 62 / Flutter Hive 59 / Vitest vs Bun 52 / Multi-agent collaborative dev 50 / Moonbit 39 / Supabase 32 / Ollama num_ctx 28

- **💡 示唆**: 最人気カテゴリ「AI Agent / LLM Orchestration」が 3,909PV で断トツ 1 位。本テーマは直球で属し、前作 cornerstone（336PV）の実装編需要の受け皿になる。実例リンク先がサイト 1 位（2,558PV）で強力なクロスリンク資産
- **✅ アクションプラン**: ①冒頭で前作 `ai-agent-html-output-design` を内部リンク ②実例 HTML（reports.motowo.jp）をリンクカードで提示 ③「長文 HTML パラドックス」自己言及を冒頭 TL;DR で先回り解消

## H. 連載判断

**判定: 単発記事**

1 テーマ（HTML レポートワークフロー構築）に集約され、8〜10K 字で完結する。前作 cornerstone の「実装 1 本」として自然。分割すると各回の独立価値が薄まると判断。

- ✅ 1 記事で完結できる（~9,000 字）
- ✅ 1 テーマに集約（統合 1 本）
- ✅ 前作の実装 1 本として自然（cornerstone 続編）
- ⬜ 分割で各回が薄まる → 連載は不採用

## I. 意思決定プロセス

| Step | 採用 | 却下（透明性のため記録） |
|---|---|---|
| 1 位置づけ | 前作 ai-agent-html-output-design の実装・実証編 | ~~独立した実践記事~~ / ~~前作の発展統合~~ |
| 2 連載判断 | 単発記事 | ~~2 回連載~~ / ~~3 回連載~~ |
| 3 各回構成 | 該当なし（単発のため対象外） | — |
| 4 タイトル | Claude Code で HTML レポートワークフローを構築する—非デザイナー向け実装ガイド（KW 前方化） | ~~非デザイナーが Claude Code で…構築した実装ガイド（当初案・KW後半偏り）~~ / ~~AI レポートを HTML 化する実装編—…~~ |
| 5 slug | `claude-code-html-report-workflow`（前作と差別化） | ~~`ai-agent-html-report-workflow`（当初案・自己カニバリ）~~ / ~~`non-designer-ai-html-report-workflow`~~ |
| 6 絵文字/topics | 🎨 / claudecode, html, ai, llm | ~~🪄~~ / ~~🖼️~~ |
| 7 ヒーロー画像 | C ストーリー型 | ~~A 概念型~~ / ~~B 擬人化型~~ |
| 8 最終確認 | 全項目をオーナーが承諾（2026-05-17） | — |
| 9 編集長承認 | ⚠️ 条件付き承認（slug 再設計・KW 前方化を条件 → 受諾・改稿済み） | — |

**検討経緯コメント（Issue #180 comments 1〜4）**

- **#1 ペルソナ検討**: 前作読者の「自分はデザインできないのにどう作るか」という問いに対応し、非デザイナーに絞り課題 3 点を構成 H2 と 1 対 1 対応
- **#2 構成検討**: スクラップ 5 部を H2×6 にマッピング。2 回連載案は分割で薄くなるため単発確定。GEO 疑問形優先、核心を第 3 H2 に独立、第 4 H2 で前作予告を回収
- **#3 SEO 検討**: GA で最人気カテゴリ 3,909PV・実例リンク先 1 位 2,558PV を確認。slug は自己カニバリ指摘で `claude-code-html-report-workflow` に変更、タイトル KW 前方化
- **#4 最終決定**: 編集長条件付き承認 → 受諾。slug 再設計・KW 前方化反映。draft 申し送り（③長文HTMLパラドックス自己言及 ④冒頭120字Answer-first+前作リンク ⑤他者Zenn/Qiita/note引用禁止、実例 reports.motowo.jp は自リソースで可）

**⚠️ 編集長承認（条件付き / `conditional`）** — editor-in-chief · 2026-05-18

1. slug を前作と差別化（`claude-code-html-report-workflow`）・タイトル KW を前方化する — ✓ 反映済み
2. 「長文 HTML パラドックス」への自己言及を冒頭 TL;DR か H6 まとめに必須化 — draft 申し送り
3. 冒頭 120 字を Answer-first + 前作内部リンクで構成・他者 Zenn 引用禁止を Writer に明示 — draft 申し送り

## J. 成果物 / 次へ

- 編集会議 Issue: [#180](https://github.com/takashi-otomo/zenn/issues/180)
- Draft PR: [#181](https://github.com/takashi-otomo/zenn/pull/181)
- 記事ファイル: `articles/claude-code-html-report-workflow.md`
- レポート (Markdown): `editorial-reports/claude-code-html-report-workflow/report.md`
- レポート (HTML): `editorial-reports/claude-code-html-report-workflow/index.html`

**次のステップ**: `/draft #180` で執筆を開始してください。
