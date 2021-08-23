## npm 是什么

组成: npm 由三个独立的部分组成, 网站, 注册表, 命令行工具  
网站: 是开发者查找包(package), 设置参数以及管理 npm 使用体验的主要途径  
注册表: 是一个巨大的数据库, 保存了每个包(package)的信息  
命令行工具: CLI 通过命令行或终端运行, 开发者通过 CLI 与 npm 打交道  

## 安装与更新

依赖: npm 是用 Node.js 编写的, 所以你需要安装 Node.js 才能使用 npm  
安装: 可以通过 Node.js 网站安装 npm, 或者安装 Node Version Manager 或 NVM  
测试版本: `npm -v`  
安装最新版本: `npm install npm@latest -g`  
安装将来版本: `npm install npm@next -g`  

## 权限问题 

~~待定~~

## 使用 package.json

**创建**

CLI 创建: 使用命令 `npm init [-y]` 创建, `-y` 表示使用默认值  
~~可以配置 .npm-init.js 来自定义生成配置文档~~  

**属性**

`name`: 必备, 全部小写, 一个字且没有空格, 允许使用破折号和下划线  
`version`: 必备, 以形式 x.x.x, 遵循 semver 规范  

**依赖**

`dependencies`: 您的应用程序在生产中需要这些包  
`devDependencies`: 这些包只用于开发和测试  

## 安装包

**本地与全局**

本地安装: 是 `npm install` 的默认行为, 用于自己的模块依赖于某个包, 并通过 Node.js 的 require 加载  
全局安装: 用于将包作为一个命令行工具  

**命令**

命令: `npm install [-g] <pkg>[@version] [-D]`  
-g: 代表全局安装与本地安装  
@version: 不带版本号表示安装最新版本, 带版本号安装指定版本  
-D: 代表生产环境与开发环境  
--save-dev: 旧命令中 --save 表示安装包到生产环境中, --save-dev 表示开发环境  

## 更新包

更新: `npm update [-g] [<pkg>][@version]`  
检查: `npm outdated` 检查包是否过时  





* [常见的命令](./img/包相关命令.png)

# npm 被墙了的三种方法

```
下载安装 cnpm： npm install cnpm
指定源：npm install xxx --registry https://registry.npm.taobao.org
全局切换源：npm config set registry https://registry.npm.taobao.org
npm config set registry https://registry.npmjs.org
```