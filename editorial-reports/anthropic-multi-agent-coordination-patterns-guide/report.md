# 編集会議レポート: Anthropic の 5 パターンで Claude Code エージェント設計を分類する

> 生成元: `/editorial` editorial-meeting [#169](https://github.com/takashi-otomo/zenn/issues/169) ／ スクラップ `scraps/multi_agent_coordination_patterns/` ／ 取得 2026-05-01

## A. サマリー / 承認

| 項目 | 内容 |
|---|---|
| **タイトル** | Anthropic の 5 パターンで Claude Code エージェント設計を分類する（30 字） |
| **slug** | `anthropic-multi-agent-coordination-patterns-guide` |
| **絵文字** | 🧭（コンパス＝4 軸選定のナビゲーション） |
| **type** | tech |
| **topics** | claudecode, ai, multiagent, anthropic, automation |
| **形式** | 単発（メタ + 決定木統合） |
| **想定文字数** | 約 13,000〜15,000 字 |
| **編集長判定** | ⚠️ 条件付き承認（`conditional`）→ 全 5 条件を受け入れ修正済み |

**企画概要**: Anthropic 公式ブログ「Multi-agent coordination patterns: Five approaches and when to use them」を素材に、公式の 5 協調パターン（Generator-Verifier / Orchestrator-Subagent / Agent Teams / Message Bus / Shared State）を既存記事 23 本から抽出した中核 7 記事にマッピングし、4 軸（タスク構造・レイテンシ・スケール・観測性）の選定決定木と組み合わせた cornerstone メタ記事。公式分類用語を日本語実装事例へ橋渡しし、既存記事のハブ化と GEO 効果を狙う。

## B. ターゲット読者

| 項目 | 内容 |
|---|---|
| **経験レベル** | Claude Code でマルチエージェント構成（SubAgent または Agent Teams）を 1 つ以上組んだ経験がある中〜上級エンジニア |
| **前提知識** | SubAgent / Agent Teams / オーケストレーションの基礎、Claude Code カスタムコマンドの基本 |
| **⚠️ 抱えている課題** | ① 自分の設計に「公式の語彙」を当てたい ② 5 パターンの違いと「いつ何を使うか」を体系的に理解したい ③ 次の一手（新規パターン導入）を判断する基準がほしい |

## C. 構成案

推定総文字数: **約 13,000〜15,000 字** ／ はじめに + 7 H2 ／ 図表: mermaid 概念図 5 + 決定木 1 + ハイブリッド構成例 1 + マッピング表 1 + 4 軸比較表 1

H2 はすべて疑問形・Answer-first 設計（GEO 対応）。

| # | セクション | 概要 | ボリューム | 図表 |
|---|---|---|---|---|
| 00 | はじめに | Anthropic 5 パターン記事の紹介、トークン消費 3〜10× の現実、本記事のスコープ | ~800 字 | - |
| 01 | なぜ Anthropic の「5 パターン」を学ぶ必要があるのか？ | コスト現実、パターン語彙の効果、設計議論の共通言語 | ~1,500 字 | - |
| 02 | 5 つの協調パターンとは？ | 5 パターンの早見表と概念図 5 枚（mermaid） | ~2,500 字 | ▦ |
| 03 | どのパターンをいつ使うべきか？ | 4 軸決定木、mermaid フローチャート、ユースケース早見表 | ~2,000 字 | ▦ |
| 04 | 既存マルチエージェント実装はどのパターンに該当するか？ | 中核 7 記事を 5 パターンにマッピング、内部リンク | ~2,500 字 | ▦ |
| 05 | 純粋形では足りない場面とは？ | ハイブリッド設計、mermaid 構成例、実装エビデンス | ~1,500 字 | ▦ |
| 06 | アンチパターンと推奨ガード | Verifier 基準・反復上限・担当範囲・単一障害点回避 | ~1,500 字 | - |
| 07 | まとめ | 「設計語彙」の効果、Message Bus 空き地と次回作フック | ~1,000 字 | - |

**書き出し方針**: Anthropic 公式の統計データ（トークン消費 3〜10×、C コンパイラ 16 エージェント / $20,000 / 100,000 行）を提示する Answer-first オープン。

## D. SEO 戦略

**主要キーワード**（重要度順）: Anthropic ／ マルチエージェント協調パターン ／ Multi-agent coordination ／ Generator-Verifier ／ Orchestrator-Subagent ／ Agent Teams ／ Shared State ／ Message Bus

**想定検索クエリ**:

| クエリ | 検索意図 |
|---|---|
| Anthropic マルチエージェント 5 パターン | 情報収集 |
| Multi-agent coordination patterns 日本語 | 情報収集 |
| Agent Teams いつ使う | 方法 |
| マルチエージェント パターン 比較 | 比較・検討 |
| Generator-Verifier 実装 | 方法 |

**slug**: `anthropic-multi-agent-coordination-patterns-guide`
**slug 選定理由**: Anthropic 公式タイトル "Multi-agent coordination patterns" を完全包含し Embedding 検索・GEO 効果を最大化。`-guide` で cornerstone を示唆。候補 B（一般語すぎ）・C（冗長）・D（Anthropic 不在）は不採用。

**GEO 観点**:

- ✅ 疑問形 H2（全 7 H2）
- ✅ Answer-first（各 H2 直下に `:::message` で 40〜60 字結論）
- ✅ 公式分類用語をそのまま見出しに使用（AI 引用マッチ強化）
- ✅ 統計データの引用（トークン 3〜10× / 16 エージェント / $20,000）
- 共起語（オーケストレーション・SubAgent・Agent Team・コードレビュー・トークン・コンテキスト・JIT）は自然分散しスタッフィング回避

## E. 訴求ポイント

- **独自価値**: Anthropic 公式分類用語を日本語実装事例に橋渡しする記事は本リポジトリ・他媒体ともに不在。23→7 記事マッピングの cornerstone で既存記事 SEO 価値を底上げ。4 軸決定木 + mermaid で意思決定ツールを提供。
- **読者メリット**: 自設計に公式語彙を適用でき、選定の判断基準（4 軸）を明示的に持てる。ハイブリッド設計の実例から純粋形に縛られない選択肢を学べ、Message Bus という未踏領域の存在を認識できる。
- **読後にできること**: `Before` 独自表現でマルチエージェント設計を語る → `After` 公式語彙で分類・選定・拡張できる

## F. ライブラリアン調査

**直接の前作**: なし（メタ視点で既存記事を再パッケージする初の試み）

**強い関連（中核 7 記事の候補）**:

- `claude-code-dev-flow-multi-agent-1.md` — Orchestrator-Subagent + Agent Teams の段階進化
- `claude-code-editorial-team-1week.md` — Agent Teams 12 人体制の実例
- `claude-code-editorial-team-ecosystem-1.md` — Orchestrator-Subagent + Shared State / JIT 70% 削減
- `rubber-duck-copilot-cli-cross-model-review.md` — Generator-Verifier クロスモデル（最新公開 2026-05-05）
- `claude-gemini-interplay-insights-1.md` — Generator-Verifier 70 PR / 321 件指摘の実測
- `claude-gemini-interplay-insights-3.md` — Generator-Verifier シフトレフト 4 本柱
- `codex-claude-code-copilot-2026.md` — 複数 Orchestrator-Subagent 並行（間接的）

**差別化**:

| 観点 | 既存のマルチエージェント記事群 | 本記事 |
|---|---|---|
| 語彙 | 独自表現（SubAgent / Agent Teams / マルチ AI 協調） | Anthropic 公式分類用語（5 パターン名） |
| 粒度 | 個別の実装手順・具体コマンド | パターン定義 × 23→7 記事の横断マッピング |
| **差別化ポイント** | 各記事は単一の構成を解説 | **4 軸決定木 + cornerstone マッピング**で意思決定ツール化 |
| 読後の到達点 | その構成を再現できる | 自設計を公式語彙で分類し次の一手を判断できる |

**回収ポイント**: 前作がないため予告回収なし。代わりに本記事 H7（まとめ）で Message Bus パターンを「空き地」として明示し、次回作（Message Bus PoC / 5 パターン連載化）へのフックを張る。

## G. GA データ分析（参考データ）

> 本編集会議では専用 GA レポートファイルは生成されず、Issue 記録の topics 別 PV（過去 90 日 / 2026-05-01 取得）を企画根拠の参考として使用。日次推移・セッション数等は未取得。

| 順位 | topics | PV | 本企画 topics |
|---|---|---|---|
| 1 | claudecode | 1,236 | ★ |
| 2 | multiagent | 1,127 | ★ |
| 3 | ai | 1,096 | ★ |
| 4 | flutter | 1,025 | |
| 5 | github | 869 | |
| 6 | mcp | 525 | |
| 7 | codereview | 464 | |

- 💡 **示唆**: 主要キーワード「Anthropic / マルチエージェント協調パターン」は multiagent（1,127 / 第 2 位）と完全一致。claudecode（1,236 / 第 1 位）と組み合わせた層が本企画のターゲットそのもの。PV 上位はマルチエージェント・ツール使い分け系が中心。
- ✅ **アクション**: 流入実績重視で `agentteams` を外し `automation` を採用（編集長条件 4）／中核 7 記事への内部リンクで cornerstone 回遊導線を確保／公開後の GA 反応を見て次企画（Message Bus 実装 / 連載化）を判断。

## H. 連載判断

**判定: 単発（メタ + 決定木統合）= A 案**

候補 4 案の比較:

| 候補 | 内容 | 判定 |
|---|---|---|
| **A: 単発（メタ + 決定木統合）** | C-5 メタ記事 + C-1 決定木を 1 本に統合 | ✅ **採用** |
| B: 単発（決定木のみ） | C-1 決定木に特化 | ~~却下~~ cornerstone 性が弱い |
| C: 連載 5+1 本 | D 案（Message Bus は新規 PoC 必要） | ~~却下~~ 中期計画向け・即効性低 |
| D: 連載 2 本（メタ + 決定木分離） | メタ記事と決定木を別立て | ~~却下~~ 1 本でも収まる範囲 |

採用根拠: ① 即効性大（素材 04・05 が既に揃いリサーチコスト最小）② GEO 効果大 ③ cornerstone 化（7 記事ハブ）④ 次回作フック（Message Bus 空き地を H7 に残す）。

## I. 意思決定プロセス（9 ステップ・透明性のため却下案も記載）

| Step | 決定事項 | 採用 | 却下（取消線） |
|---|---|---|---|
| 1 位置づけ | 独立した新記事（既存記事を再パッケージ） | 独立した新記事 | ~~既存記事の続編~~（前作なし） |
| 2 連載判断 | A 案 単発（メタ + 決定木統合） | A 案 | ~~B 決定木のみ~~ / ~~C 連載5+1~~ / ~~D 連載2本~~ |
| 3 各回構成 | 単発のため該当なし（H1〜H7 論理展開で設計） | — | — |
| 4 タイトル | 30 字版（編集長条件 3 で短縮） | 「Anthropic の 5 パターンで…分類する」 | ~~当初 40+ 字版~~ |
| 5 slug | Anthropic 公式タイトル完全包含 A 案 | `anthropic-multi-agent-coordination-patterns-guide` | ~~five-patterns-design~~ / ~~portfolio-mapping~~ / ~~patterns-five-2026~~ |
| 6 絵文字/topics | 🧭 / claudecode,ai,multiagent,anthropic,automation | 流入実績重視 | ~~topics に agentteams~~（編集長条件 4） |
| 7 ヒーロー画像 | A: 概念型（地図・コンパス・ノードグラフ） | A 概念型 | ~~B 擬人化型~~ / ~~C ストーリー型~~ |
| 8 最終確認 | 全項目をオーナー承諾 | 確定 | — |
| 9 編集長承認 | ⚠️ 条件付き承認 → 全 5 条件受け入れ修正済み | 条件付き承認 | — |

**検討経緯コメント（Issue comments 1〜4）**:

1. **ペルソナ設定の経緯** — 実装層 vs 概念層を架橋するため中〜上級エンジニアに設定。課題はギャップ分析（05）と GA から導出。初心者には前半 H1〜H3 で価値を届ける二段構え。
2. **構成案の検討過程** — C-1〜C-5・D 連載から A 案採用。編集長 5 条件を全受け入れ（8→7 H2 圧縮等）。H1〜H7 は「必要性→早見→選定→適用→発展→回避→未来」。
3. **SEO 戦略の根拠** — GA topics PV で multiagent / claudecode と合致。slug は候補 4 案から A 案。GEO は疑問形 H2・Answer-first・公式英語名見出し・統計引用。
4. **最終決定事項のサマリ** — 確定内容・図表計画・執筆前タスク（原典一次取得、取得不可時は Engineering Blog 公式ドキュメントへ切替）・次アクション `/draft #169`。

**編集長による企画承認判断（⚠️ 条件付き承認 → 全 5 条件受け入れ修正済み）**:

1. Anthropic 公式ブログ原典の一次ソース確認を執筆前に完了する
2. 「23 記事」と「7 記事」の整合（中核 7 記事を 5 パターンに対応付けと明記）
3. タイトルを 30〜40 字に短縮する（→ 30 字に変更）
4. topics は流入実績重視（`agentteams` を外し `automation` を採用）
5. Message Bus 単独 H2 を圧縮（8 H2 → 7 H2、まとめ内 1 段落へ統合）

## J. 成果物 / 次へ

| 成果物 | リンク |
|---|---|
| 編集会議 Issue | [#169](https://github.com/takashi-otomo/zenn/issues/169) |
| Draft PR | [#170](https://github.com/takashi-otomo/zenn/pull/170)（merged） |
| 記事ファイル | `articles/anthropic-multi-agent-coordination-patterns-guide.md` |
| 公開記事 | https://zenn.dev/motowo/articles/anthropic-multi-agent-coordination-patterns-guide |

**次のステップ（編集会議時点）**: `/draft #169` で執筆を開始。本記事は draft・review を経て公開済み（`published: true`）。
