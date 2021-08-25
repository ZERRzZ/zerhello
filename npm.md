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

**仓库**

查看: `npm config get registry` 查看当前的仓库(登记处)  
修改: `npm config set registry <url>` 修改  
常见: 常见的仓库有官方 `http://registry.npmjs.org`, 淘宝以及私有等  

## 使用包

**本地与全局**

本地安装: 是 `npm install` 的默认行为, 用于自己的模块依赖于某个包, 并通过 Node.js 的 require 加载  
全局安装: 用于将包作为一个命令行工具  

**安装**

命令: `npm install [-g] <pkg>[@version] [-D]`  
-g: 代表全局安装与本地安装  
@version: 不带版本号表示安装最新版本, 带版本号安装指定版本  
-D: 代表生产环境与开发环境  
--save-dev: 旧命令中 --save 表示安装包到生产环境中, --save-dev 表示开发环境  

**卸载**

卸载: `npm uninstall <pkg> [-g]`  

**更新**

更新: `npm update [-g] [<pkg>][@version]`  
检查: `npm outdated` 检查包是否过时  

**查看**

命令: `npm list [-g] [<pkg>]`  
查看包: `npm view <pkg>`  

## package.json

**创建**

CLI 创建: 使用命令 `npm init [-y]` 创建, `-y` 表示使用默认值  
~~可以配置 .npm-init.js 来自定义生成配置文档~~  

**属性**

`name`: 必备, 全部小写, 一个字且没有空格, 允许使用破折号和下划线, 包的名称  
`version`: 必备, 以形式 x.x.x, 遵循 semver 规范, 包的版本  
`main`: 重要, 入口文件, 默认为 index.js  

**依赖**

`dependencies`: 您的应用程序在生产中需要这些包  
`devDependencies`: 这些包只用于开发和测试  

## 创建包

**Node.js 模块**

介绍: Node.js 模块是一种可以发布到 npm 的包  
核心: 创建 package.json 文件是第一步, 可使用 `npm init` 创建  
入口: 还需一个入口文件, 名称与 main 中一致  
说明: 最好还需要一个 readme.md 文档, 用来吐槽  

**发布**

发布: 可使用 `npm publish` 发布包, 可能需要注册 npm 账号 `npm adduser` 或登录 `npm login`  
发布 scoped 包: `npm init --scope=<username>`, 即改变 name 字段值, 只是会给包增加了作用域, 防命名冲突  

**语义化版本**

描述: 共三位, 以 . 隔开, 从左至右依次代表主版本(major), 次要版本(minor), 补丁版本(patch)  
规范: 新品发布, 以 1.0.0 开始, major/minor/patch 发布变更相应版本, 并将之后的数字置零  
命令: 变更版本号 `npm version <major|minor|patch>`, 即改变 version 字段值  

**废弃与删除**

废弃: `npm deprecate <pkg>[@<version>] <message>` 可只废弃指定版本, 安装废弃包时会弹出警告并显示 message  
删除: 不鼓励删除, `删除的版本24小时后方可重发, 只有发布72小时之内的包可以删除` `npm unpublish <pkg> --force`  

**本地测试**

开发的包: `npm link` 在包的根目录中运行, 会根据 package.json 上的配置, 被链接到全局, 路径为 `{prefix}/lib/node_modules/<package>`  
测试包的项目: `npm link <pkg>` 将包链接到项目的 node_modules 里  