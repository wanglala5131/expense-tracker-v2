## 家庭記事本
使用node.js、express和express-handlebars、body-parser、method-override、mongoDB與mongoose所做的網站


## 環境建置與需求
* node.js v10.15.0 -執行環境
* express v4.17.1 -框架
* express-handlebars v4.0.4 -模板引擎
* body-parser v1.19.0 -中介軟體
* method-override v3.0.0 -中介軟體
* mongoDB - 4.2.6 -資料庫管理系統
* mongoose v 5.9.14 - 物件映射工具


## 安裝與使用
#### 下載專案
    git clone https://github.com/wanglala5131/expense-tracker-v2.git
#### 安裝package
    npm install
#### 新增支出紀錄的種子資料
    npm run seed 
#### 新增類別的種子資料
    npm run seed2 
#### 使用nodemon啟動伺服器
    npm run dev
#### 或正常啟動
    npm start


## 網站功能
* 可以觀看所有支出紀錄
* 可編新增、編輯、移除支出紀錄
* 根據支出紀錄的類型，可分類支出紀錄
* 可根據顯示的紀錄，自動算出總花費
* 可新增、編輯、移除類別