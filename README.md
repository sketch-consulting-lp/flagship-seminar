# 共催セミナーLP（2026年12月9日）

GitHub Pagesで公開する、画像5枚＋申込フォームの1ページLPです。

## 使い方（簡単）

1. ZIPを展開し、**中身**（`index.html`、`style.css`、`script.js`、`config.js`、`assets/` など）をGitHubの**新規リポジトリのルート**にアップロードする。
2. [Formspree](https://formspree.io/) で新しいフォームを作成する。フォームのURLが `https://formspree.io/f/abcdefgh` なら、`config.js` の `formspreeId: ""` を `formspreeId: "abcdefgh"` に変更する。**正しいIDを入れるまでフォームは送信されません。**
3. リポジトリの **Settings → Pages → Build and deployment → Deploy from a branch → main / (root) → Save** でGitHub Pagesを公開する。
4. 表示URL（通常は `https://ユーザー名.github.io/リポジトリ名/`）で、画像・固定CTA・申込フォームの表示を確認する。
5. **自分の情報で実際にフォーム送信し、Formspreeの受信一覧を確認する。** テスト申込データはその後適切に削除する。

## 画面の動作

- `section01` → `section05` の順に完成画像をそのまま表示。画像の内容は変更していません。
- 画面下の黄色い「無料セミナーに参加する」は、申込フォームへスクロール。
- 申込フォーム付近では固定CTAを隠し、入力を妨げない。
- 送信が成功したときだけ完了メッセージを表示。
- 必須：会社名、担当者名、電話番号、メールアドレス、個人情報取り扱いへの同意。任意：会社HP。
- 個人情報保護方針は両社の公式ページへのリンク。

## 画像ファイル

- `assets/section01.png`（948 × 1659）
- `assets/section02.png`（948 × 1659）
- `assets/section03.png`（948 × 1659）
- `assets/section04.png`（985 × 1596）
- `assets/section05.png`（948 × 1659）

## 公開前に確認すること

- [ ] Formspree IDが設定され、受信テストに成功する
- [ ] Formspreeの通知メール・受信先の設定を確認する
- [ ] フォームの利用目的と、両社の個人情報取扱いについて社内承認を取る
- [ ] 申込後のZoom URLのご案内方法を決める（現在のLPは案内時期を断定していません）
- [ ] 記載の実績数値、PR動画に関する案内、登壇者情報について公開前の最終確認を行う
- [ ] 375px、390px、430px幅、PCで見た目を確認する
- [ ] Meta広告のCV計測を使う場合、同意管理と計測実装を確認する

## 補足

- 既存のハローワークセミナーLPとは別リポジトリとして公開することを推奨します。
- 現在、GA4とMetaピクセルは**未設定**です。`script.js` 内の `trackEvent` はイベント名だけの拡張ポイントで、現段階では何も送信しません。
- 本番コードにはFormspreeの**公開フォームID**のみを置き、API秘密鍵や管理権限のあるトークンを配置しないでください。
- HTML等はGitHub Pagesでそのまま動作し、ビルドやnpm installは不要です。
