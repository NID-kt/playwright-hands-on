# Playwright Hands-on

## はじめに

Playwright Hands-on は、Playwright でインストールから VRT（Visual Regression Testing）までを体験するためのハンズオン資料です。

## Playwright とは

Playwright は、Microsoft が開発したブラウザー自動操作ライブラリです。Playwright を利用することで、ブラウザーの自動操作やテストを行うことができます。

Playwright は、以下の特徴を持っています。

- Chromium、Firefox、WebKit に対応
- ブラウザーの自動操作
- E2E テストの自動化
- VRT（Visual Regression Testing）

Playwright は、Node.js で利用することができます。また、ブラウザーの自動操作やテストを行うための API を提供しています。

## VRT（Visual Regression Testing）とは

VRT（Visual Regression Testing）は、画面の見た目を比較して、変更がないかどうかを検証するテスト手法です。

VRT は、以下のようなケースで利用されます。

- デザインの変更を検知する
- レイアウトの変更を検知する
- 画像の変更を検知する

Playwright には、VRT を行うための機能が組み込まれています。スクリーンショットを取得して、それを比較することで、VRT を行うことができます。

## ハンズオンの内容

このハンズオンでは、Playwright を使って、ブラウザーの自動操作やテストを行う方法を学びます。

具体的には、以下の内容を学びます。

- Playwright のインストール
- E2E テストの実行
- VRT（Visual Regression Testing）

それでは、はじめていきましょう！

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
このリポジトリーには、テスト対象のサンプルコードが含まれています。
また、`tests` ディレクトリーには単体テストのコードがすでに含まれています。

```bash
cd playwright-hands-on
pnpm install
```

なお、このハンズオンでは、パッケージの管理に `pnpm` を利用しています。
`corepack` が有効になっていない場合は以下のコマンドで有効化してください。（Windows をお使いの方は管理者権限で実行してください。）
`corepack` によって、自動で最適な `pnpm` のバージョンが実行されます。

```bash
corepack enable
```

もし、`corepack` を有効化する前に、すでに `pnpm` がインストールされているのであれば、先に削除しましょう。

```bash
npm uninstall -g pnpm
```

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

## Playwright の初期設定

`pnpm create playwright` コマンドで作成された `playwright.config.ts` には、Playwright の設定が記述されています。
作成された `playwright.config.ts` に以下の設定を追加してください。
値は異なりますが、いずれの設定もすでに `playwright.config.ts` にコメントアウトされた状態で記述されています。

### `baseURL` の設定

`baseURL` には、テスト対象の Web サイトの URL を指定します。この値を指定することで、テストコード内で URL を指定する際に、`baseURL` を基準にして相対パスで指定することができます。

```ts
export default defineConfig({
  use: {
    baseURL: 'http://localhost:3000',
  },
});
```

今回はローカルでサーバーを立ち上げるため、`http://localhost:3000` を指定しています。

### `webServer` の設定

`webServer` には、テスト対象の Web サイトを提供するサーバーの設定を指定します。この値を指定することで、Playwright がテスト対象の Web サイトにアクセスする際に、`webServer` の設定を利用してアクセスすることができます。

```ts
export default defineConfig({
  webServer: {
    command: 'pnpm build && pnpm start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

- `command`: テストを実行する前に、サーバーを起動するためのコマンドを指定します。このコマンドを実行することで、サーバーが起動します。今回は `pnpm build && pnpm start` を指定しています。

- `url`: サーバーの URL を指定します。この URL から何らかの HTTP レスポンスを得られてからテストを実行します。今回は、`http://localhost:3000` を指定しています。

- `reuseExistingServer`: テストを実行する前に、サーバーを起動するかどうかを指定します。この値を `true` にすることで、テストを実行する前にサーバーが起動している場合は、再利用してテストを実行することができます。今回は、`!process.env.CI` を指定しています。

## テスト用のコマンドの追加

`package.json` に、テストを実行するためのコマンドを追加してください。

```json
{
  "scripts": {
    "test:e2e": "playwright test"
  }
}
```

### テストコードの作成

E2E テストを実行するためのテストコードを作成します。

`e2e` ディレクトリーに、`home.spec.ts` というファイルを作成して、以下のコードを記述してください。
このテストコードは、フォームの入力と送信を行い、戻るボタンが表示されることを確認し、戻るボタンをクリックするとフォームが再表示されることを確認するテストです。

```ts
import { test, expect } from '@playwright/test';

test.describe('Form submission', () => {
  test('should submit form and display submission message', async ({ page }) => {
    // テスト対象のページにアクセス
    await page.goto('/');

    // フォームが表示されることを確認
    await expect(page.getByText('名前')).toBeVisible();
    await expect(page.getByText('送信')).toBeVisible();

    // 名前入力フィールドに値を入力
    await page.getByLabel('名前').fill('テストユーザー');

    // フォームを送信
    await page.getByText('送信').click();

    // 戻るボタンが表示されることを確認
    const backButton = page.getByRole('button', { name: '戻る' });
    await backButton.isVisible();

    // 戻るボタンをクリック
    await backButton.click();

    // 再びフォームが表示されることを確認
    await expect(page.getByText('名前')).toBeVisible();
    await expect(page.getByText('送信')).toBeVisible();
  });
});
```

## テストの実行

以下のコマンドで、E2E テストを実行してください。

```bash
pnpm test:e2e
```

テストが実行され、ブラウザーが自動操作されます。テストが成功すると、以下のようなメッセージが表示されます。
テスト実行前に、プロダクションビルドとサーバーの起動が行われるので、時間がかかります。

```bash
Running 3 tests using 3 workers
  3 passed (35.3s)

To open last HTML report run:

  pnpm exec playwright show-report
```

テストが成功した場合は、`3 passed` と表示されます。

## VRT の追加

VRT を行うためのテストコードを追加します。

`e2e` ディレクトリーに、`home-screenshot.spec.ts` というファイルを作成して、以下のコードを記述してください。
このテストコードは、ホームページのスクリーンショットを取得して、以前のスクリーンショットと比較します。

```ts
import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('should match screenshot', async ({ page }) => {
    // テスト対象のページにアクセス
    await page.goto('/');

    // スクリーンショットを取得
    await expect(page).toHaveScreenshot();
  });
});
```

## VRT の実行

先ほどと同じコマンドで、VRT を実行してください。

```bash
pnpm test:e2e
```
初回のテスト実行時は、以前のスクリーンショットを記録した画像が存在しないため、テストに失敗します。このとき、基準となるスクリーンショットの画像が作成されます。
その後のテスト実行時は、以前のスクリーンショットを記録した画像が存在するため、この画像と比較してテストを実行します。変更がある場合は、テストに失敗し、変更がない場合は、テストに成功します。

## 基準となるスクリーンショットの更新

スクリーンショットの比較に失敗した場合は、基準となるスクリーンショットを更新する必要があります。
更新する前に変更が意図したものか確認してください。

以下のコマンドで、基準となるスクリーンショットを更新できます。

```bash
pnpm test:e2e --update-snapshots
```

## おわりに

Playwright Hands-on は以上です。Playwright を使って、インストールから VRT までを体験しました。
Playwright は、ブラウザーの自動操作やテストを行うための強力なツールです。
ぜひ、Playwright を活用して、開発効率を向上させてください。

## 参考

- [Playwright](https://playwright.dev/)
  - [Installation](https://playwright.dev/docs/intro)
  - [Visual comparisons](https://playwright.dev/docs/test-snapshots)
