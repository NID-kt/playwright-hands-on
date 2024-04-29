# Playwright Hands-on

## はじめに

Playwright Hands-on は、Playwright でインストールから VRT（Visual Regression Testing）までを体験するためのハンズオン資料です。

## セットアップ

### 1. Node.js のインストール

Playwright を利用するためには、Node.js が必要です。以下のリンクから Node.js をインストールしてください。

- [Node.js](https://nodejs.org/)

### 2. リポジトリーのクローン

このリポジトリーは、VRT 対象のサンプルコードがすでに含まれています。以下のコマンドでリポジトリーをクローンしてください。
今回のハンズオンでは、このリポジトリーに Playwright をインストールしていきます。

```bash
git clone git@github.com:NID-roid/playwright-hands-on.git
```

### 3. パッケージのインストール

クローンしたリポジトリーに移動して、以下のコマンドでパッケージをインストールしてください。

```bash
cd playwright-hands-on
pnpm install
```

なお、このハンズオンでは、パッケージの管理に `pnpm` を利用しています。`pnpm` がインストールされていない場合は、以下のコマンドでインストールしてください。

```bash
npm install -g pnpm
```

それでははじめていきましょう！

## Playwright のインストール

Playwright をインストールするには、以下のコマンドを実行してください。
途中でいくつかの質問が表示されますが、すべてエンターキーを押してデフォルトの設定で進めてください。

```bash
pnpm create playwright
```

このコマンドは依存関係の追加や設定ファイル（`playwright.config.ts`）の作成を行います。
また Playwright が自動操作するためのブラウザー（Chromium、Firefox、WebKit）もインストールされます。
普段お使いのブラウザーとは別にインストールする必要があります。

### VS Code の拡張機能のインストール

Playwright を利用する際に、VS Code の拡張機能をインストールすると大変便利です。
VS Code をお使いの場合は、ぜひ以下の拡張機能をインストールしてください。

- [Playwright Test for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)

## テストの実行

Playwright でテストを実行するには、以下のコマンドを実行してください。

```bash
pnpm test
```

これで、Playwright でのテスト実行ができるようになりました。

## VRT（Visual Regression Testing）

Playwright には、スクリーンショットを取得して、それを比較する機能があります。これを利用して、VRT（Visual Regression Testing）を行うことができます。

VRT を実行するには、以下のコマンドを実行してください。

```bash
pnpm test:vrt
```

これで、VRT のテスト実行ができるようになりました。

## おわりに

Playwright Hands-on は以上です。Playwright を使って、インストールから VRT までを体験しました。
Playwright は、ブラウザーの自動操作やテストを行うための強力なツールです。
ぜひ、Playwright を活用して、開発効率を向上させてください。

## 参考

- [Playwright](https://playwright.dev/)
  - [Installation](https://playwright.dev/docs/intro)
  - [Visual comparisons](https://playwright.dev/docs/test-snapshots)
