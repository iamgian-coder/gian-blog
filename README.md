# Gian 的个人博客，[线上地址 http://39.97.182.198](http://39.97.182.198)

![nuxtjs](https://img.shields.io/badge/nuxt-2.14.7-brightgreen) ![markdown-it](https://img.shields.io/badge/%40nuxtjs%2Faxios-5.12.2-brightgreen) ![markdown-it](https://img.shields.io/badge/%40nuxtjs%2Fmarkdownit-1.2.10-brightgreen) ![markdown-it](https://img.shields.io/badge/%40nuxtjs%2Fproxy-2.0.1-brightgreen) ![highlight.js](https://img.shields.io/badge/highlight.js-10.3.2-brightgreen) ![vue-infinite-loading](https://img.shields.io/badge/vue--infinite--loading-10.3.2-brightgreen) ![vue-infinite-loading](https://img.shields.io/badge/node--sass-4.14.1-brightgreen)

欢迎 😁star，fork，watch⭐~

- [Gian 的个人博客，线上地址 http://39.97.182.198](#gian-的个人博客线上地址-http3997182198)
  - [相关项目](#相关项目)
  - [关于本博客](#关于本博客)
  - [首页/列表页效果图(多图预警!!!😁)](#首页列表页效果图多图预警)
  - [归档页效果图](#归档页效果图)
  - [标签页效果图](#标签页效果图)
  - [查询页效果图](#查询页效果图)
  - [详情页效果图](#详情页效果图)
  - [技术栈](#技术栈)
  - [开发步骤](#开发步骤)
  - [生产模式下运行](#生产模式下运行)
  - [pm2 部署](#pm2-部署)


## 相关项目

1. [gian-blog-admin 管理端站点](https://www.github.com/iamgian-coder/gian-blog-admin)
2. [gian-blog-api 服务 API](https://www.github.com/iamgian-coder/gian-blog-api)

## 关于本博客

个人用来记录学习，工作


## 首页/列表页效果图(多图预警!!!😁)

响应式

![gif效果图](screens/responsive.gif 'gif效果图')

宽度<=419px

![lte419效果图](screens/lte419.png 'lte419效果图')

---

420px=<宽度<=749px

![420to749效果图](screens/420to749.png '420to749效果图')

---

750px=<宽度<=899px

![750to899效果图](screens/750to899.png '750to899效果图')

---

宽度>=900px

![gte900效果图](screens/gte900.png 'gte900效果图')

---

## 归档页效果图

![归档页效果图](screens/archive.png '归档页效果图')

---

## 标签页效果图

![标签页效果图](screens/tag.png '标签页效果图')

---

## 查询页效果图

![查询页效果图](screens/search.png '查询页效果图')

---

## 详情页效果图

![详情页效果图](screens/details.gif '详情页效果图')

---

## 技术栈

- nuxtjs(ssr)
- @nuxtjs/axios
- @nuxtjs/markdownit
- @nuxtjs/proxy
- highlight.js
- vue-infinite-loading
- node-sass

## 开发步骤

1. 安装本项目依赖的[API](https://www.github.com/iamgian-coder/gian-blog-api)
2. 打开命令行终端并进入项目根目录
3. 创建.env 文件 `cp .env.demo .env`
4. 更新.env 文件中的环境变量：

   NUXT_ENV_API_HOST=运行 API 的主机 IP

   NUXT_ENV_API_PORT=API 运行端口

   CLIENT_ID=API 端配置的客户端编号

   CLIENT_SECRET=API 端配置的客户端密钥

5. 安装项目依赖,终端里运行 `npm i` or `yarn`
6. 开始吧 😁,终端里运行 `npm run dev` or `yarn run dev`

## 生产模式下运行

`npm run build && npm run start` or `yarn run build && yarn run start`

## pm2 部署

```bash
bash start.sh
```

再次欢迎 😁star，fork，watch⭐~
