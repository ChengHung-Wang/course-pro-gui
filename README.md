<div align="right">
<br/><br/>
<img style="width: 200px; text-align: center" src="https://i.imgur.com/CoR6ugO.png" />
</div>

# course pro Front-end

[UI 設計 (figma)](https://www.figma.com/file/3Uy156OSTesry8QePbLdfG)

[course pro Back-end (Developer only) ](https://github.com/ChengHung-Wang/course-pro-api)

為了確保使用者的隱私與安全、系統未來的發展，course pro 選擇不將後端源碼公開。

## 聲明

本系統現階段與台科校方無關，不過未來可能會與校方接洽合作。

我們會收集您的 NTUST SSO 帳密與 NTUST Email 用做驗證您的身份、訪問個人信息，course pro 有義務保護、不公開您的個人訊息，包括但不限於：您的電話、真實姓名、性別、出生日期、可連結、對應到個人的成績資料。

## 簡介

course pro 是專門開發給台科學子的一個系統，目的是為了讓您在台科有更棒的學習體驗。

#### 課程 (Course APP)

選課不知道怎麼選嗎？有想要的課但卻選不到？<br>
系統可以根據您的科系，你修課的歷史紀錄來自動推薦課程，讓你的課程規劃更加的輕鬆、簡單。

怕選到糞課嗎？<br>
<strong>糞課雷達</strong>
為您偵測課表上歷屆 GPA 過低、評價過低的課程，並且為您挑選出更棒的替代方案。實時守候您的課表，避免踩坑。

手裡有一門課覺得退選可惜？<br>
<strong>課程轉讓</strong> ，讓機會落在對的人手裡。

GPA 好難算？<br>
沒事我們幫你算好了，甚至是各種面向，各種轉換。

#### 課程指南 (Course Guide APP)

#### 雷達 (Radar APP)

#### Course Guide APP

#### Course Guide APP

## 未來功能

### 第二階段：(預計 2023/05 完工)
#### 課程：
- 課程規劃師：自動根據您的系所、雙主修、輔修等等身份，綜合您的成績資料幫您自動分析你需要的課，你還缺的課。

- 期末評量小助手：只填你想填的，剩下的交給我們。
- 課程轉讓：讓機會落在對的人手裡，把課給你想給的人。 
- 糞課雷達: 針對歷屆 GPA 過低的課程，在您的課表、課程搜尋結果增加顯眼的提示，並為您推薦更棒的替代課程。
- 我不想看到的同學: 設定不要跟某位或某些同學一起上課，當偵測到這位或這些同學也選了在您的課表或選課清單中的課時，系統會提醒您。
- 摸魚小幫手：有不想去上的課嚒，跟 course pro 說一聲，讓上課的同學同學你，當然幫助的人，有台科幣可賺。

##### 課程指南：
- 課程評價：
- 授課老師評價：
- 考古題分享: 
- 課程搜尋：

##### 系統：
- 台科幣：用於使用系統某些服務的籌碼，你可以對系統貢獻來獲得台科幣。
- 多語言支持：貢獻你的母語或是你擅長的語言，讓 course pro 更完善，並在其中獲得台科幣。
- 增強 SEO 能力

### 第三階段 (2023/09 或更久)
##### 重點特色：1. 加入人工智慧(機器學習)，2. 手機版支援

- 我的選課偏好：
- 糞課雷達 Pro：<strong>從大家的評價、歷屆 GPA，整合 AI 運算</strong>為您過濾掉糞課。
- Email：
- 封鎖: 

## 安裝與執行
#### 首次安裝
1. 複製專案目錄下的`.env.example`檔案，將其貼在專案資料夾下，並將名稱改為`.env`
2. 更改 API-Endpoint, 如果你不具備 API 開發資格請使用這個[連結](https://api-course.ntust.pro/)

```shell
npm install
npm run serve
```

## Recommended IDE Setup
WebStorm

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run serve
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
