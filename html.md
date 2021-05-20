#  Web服务器访问流程

* 解析我们输入的 URL
* 发送 HTTP 请求
* 返回结果
* 接收结果并显示
* [Web服务器访问流程](./img/Web服务器访问流程.png)

# URL统一资源定位器

* 协议：规定一个传输的规则，包括 http，https 或其他，
* IP 地址：每台电脑都有一个独一无二的地址
```
1.命令行输入 ipconfig 来显示
2.http://127.0.0.1 表示本机
3.http://localhost 同上
```
* 域名：IP 地址的代称，方便记忆
* 端口号：每个主机上都有不同的服务，用端口号来区别
```
详细内容
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                              href                                              │
├──────────┬──┬─────────────────────┬────────────────────────┬───────────────────────────┬───────┤
│ protocol │  │        auth         │          host          │           path            │ hash  │
│          │  │                     ├─────────────────┬──────┼──────────┬────────────────┤       │
│          │  │                     │    hostname     │ port │ pathname │     search     │       │
│          │  │                     │                 │      │          ├─┬──────────────┤       │
│          │  │                     │                 │      │          │ │    query     │       │
"  https:   //    user   :   pass   @ sub.example.com : 8080   /p/a/t/h  ?  query=string   #hash "
│          │  │          │          │    hostname     │ port │          │                │       │
│          │  │          │          ├─────────────────┴──────┤          │                │       │
│ protocol │  │ username │ password │          host          │          │                │       │
├──────────┴──┼──────────┴──────────┼────────────────────────┤          │                │       │
│   origin    │                     │         origin         │ pathname │     search     │ hash  │
├─────────────┴─────────────────────┴────────────────────────┴──────────┴────────────────┴───────┤
│                                              href                                              │
└────────────────────────────────────────────────────────────────────────────────────────────────┘
```

# 相对路径与绝对路径

* 绝对路径：即完整的写出文件路径
* 相对路径：同目录用 ./ 来表示，子目录用 / 来表示，父目录用 ../ 来表示
* 跟相对路径：以 / 开头来表示

# HTTP 报文, HTTP 协议

* 分为请求报文，响应报文，再次细分可分为请求行，请求头，请求体，响应类似
* 请求行包括 HTTP 请求的方法，请求资源路径，HTTP 版本等等

```
请求方法主要有：GET，POST，PUT，DELETE 等

1.GET 请求方法在地址栏，POST 在请求体
2.GET 请求数据较小，一般文件上传用 POST
3.GET 请求的内容可以缓存，而 POST 不能
```

* 请求头包括对客户端和请求本身的描述信息

```
例：content-type: 告诉 Web 服务器请求数据的类型和字符集
```

* 详细内容见图片 [常见请求头](./img/常见请求头.png)
* 请求体包括发送给服务器的查询信息，只有 POST 请求才有
* 响应行里主要是状态码和解释信息等

```
例：200 OK
```

* 常见的状态码：见图片 [常见的状态码](./img/常见状态码.png)
* 响应头主要是对服务器和响应信息的描述
* 响应体是返回个服务器的内容

# Hyper Text Markup Language

* 标记语言，使用尖括号 <> 表示一个标记
* 标记分为封闭类标记与非封闭类标记

```html
<div></div> <!-- 封闭类 -->
<img /> <!-- 非封闭类 -->
```

* 属性必须在开始标记中, 且与标记名称之间用空格隔开
* 属性值与属性之间用 = 连接, 属性值用引号引起来，多属性间用空格隔开

```html
<div width="100px" height="100px"></div>
```

# 注释

`<!-- -->`

# id、title、class、style

* id: 定义元素在页面上独一无二的名称
* title: 鼠标悬停时在元素上显示的文字
* class: 类，css 中用类选择器时使用
* style: 内联样式，css 中的属性

```html
<div id="h" title="hello world" class="" style="color: red">hello world</div>
```

# 常见标签

* `<html></html>`: 根标签，表示页面的开始与结束
* `<head></head>`: 头标签，设置文档的属性，引入外部的资源
* `<body></body>`: 体标签，页面的主体内容

## head 里的标签

* `<title></title>`: 标题
* `<style></style>`: 内部样式
* `<link></link>`: 引入外部样式
* `<script></script>`: 引入 js 文件或写 js 代码
* `<meta />`: 提供有关页面的元信息(meta-information)

```html
<!-- 用 link 来设置图标 -->
<link rel="shortcut icon" href="./test.jpg" type="...">

<link rel="stylesheet" href="...">
<script src="..."><script>
```

## meta 标签

* name 属性：主要有 author,description,keywords 等值，一般可以自由使用对自己来说有意义的名称
* http-equiv 属性：主要有 content-type 等值，指示服务器在发送文档之前先要传送给浏览器的消息头信息
* content 属性：作为 name 与 http-equiv 的值，与它们搭配使用

```html
<meta name="keywords" content="html,css,javascript">
<meta http-equiv="content-type" content="text/html"> ??
```

## body 里的标签

* `<h1></h1>` ~ `<h6></h6>`: 标题
* `<p></p>`: 段落
* `<div></div>`: 块
* `<span></span>`: 行间文本
* `<br/>`: 换行
* `<hr/>`: 分割线

```html
<h1>标题</h1>
<hr/>
<p>这是一个简单的 html 网页</p>
```


# 特殊文本

* `&nbsp;`: 空格
* `&lt;`: <
* `&gt;`: >
* `&copy;`: © 版权
* `&reg;`: ™ 商标
* 其它见 [特殊字符表](./img/特殊字符表.png)

```html
<p>我&nbsp;们,&lt;p&gt;,&copy;,&reg;</p>
```

# HTML 文档基本结构

```html
<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset="UTF-8">
  <title></title>
</head>
<body></body>
</html>
```

# 图片标签

* 标签: `<img />`
* src 属性: 图片的地址 url
* alt 属性：图片的替换文本，当图片加载不出来时有大用
* width, height: 宽与高，规定宽高可以加速浏览器渲染速度
* 这四个属性必须写全, 缺一不可

```html
<img src="./特殊字符表.png" alt="特殊字符表" width="1360" height="602">
```

# 列表标签

* 有序列表：

```html
<ol>
  <li>111</li>
  <li>222</li>
  <li>333</li>
</ol>
```

* 无序列表：

```html
<ul>
  <li>111</li>
  <li>222</li>
  <li>333</li>target
</ul>
```

# 超链接标签

* 标签: `<a></a>`
* href 属性：要链接的页面 url
* target 属性：指定新网页的打开方式, _self:覆盖当前页面, _blank：在新网页打开
* 锚点: 用 href = "url#锚点名" 来跳转到某页面的某锚点
* 任何标签的 id 就是一个锚点，a 标签的 name 属性也是一个锚点

```html
<!-- 保证页面长度够长 -->
<a href="#id">跳转</a>
<p id="id">id</p>
<a name="name">name</p>
```

* download 属性：在 href 后加一个 download = filename 即可

```html
<a href="./favicon.jpg" download="favicon">下载</a>
```

# 表格标签

* 标签：`<table>`,`<captain>`,`<tr>`,`<th>`,`<td>`,`<thead>`,`<tbody>`,`<tfoot>`
* 分别表示：表格，标题，行，表头，单元格，页眉，主体，页脚

```html
<table>
  <captain>我是标题</captain>
  <tr>
    <th>表头1</th>
    <th>表头2</th>
  </tr>
  <tr>
    <td>单元格1</td>
    <td>单元格2</td>
  </tr>
</table>
```

* td,th 标签的特殊属性: rowspan, colspan 跨行与跨列
* 值为数字，表示要跨几行或几列, 不要搞混了

```html
<table border="1px black solid">
  <captain>我是标题</captain>
  <tr>
    <th>表头1</th>
    <th>表头2</th>
  </tr>
  <tr>
    <td rowspan="2">单元格1</td>
    <td>单元格2</td>
  </tr>
  <tr>
    <td>单元格3</td>
  </tr>
  <tr>
    <td colspan="2">单元格4</td>
  </tr>
</table>
```

# 表单标签

* 标签：`<form></form>`, 用以定义一个表单
* action 属性：指定某个服务器脚本来处理被提交的表单
* method 属性：指定表单被提交时所使用的 http 方法（GET/POST/...)
* enctype 属性: 指定提交的数据类型，默认为 application/x-www-form-urlencode, 表示表单提交
* enctype 属性的值 multipart/form-data，表示文件上传

```html
<!-- 用表单发送文件上传请求 --->
<form action="http://www.baidu.com" method="POST" enctype="multipart/form-data">
  <input type="file" name="file" placeholder="头像">
  <input type="submit" value="submit">
</form>
```

# 表单元素标签





# template 模版标签

- `<template>` 中的内容加载页面时不渲染，但可以通过 JavaScript 进行实例化
- 用 `template.content` 获取标签内的内容
- 具体是利用 `document.importNode(content, boolean)` 方法来实例化, 第一个为标签内容，第二个表示是否获取子节点






# Web前端存储Cookie

- 主要用来辨别用户身份
- 分为内存cookie和硬盘cookie
- cookie会自动带在路径上
- 不能跨域和跨浏览器
- cookie实质上是字符串，由键值对key=value组成，之间用分号与空格隔开
- 常用属性：
```
expires：有效期
domain、path：限制能被哪些URL访问
secure：限制https传输
httponly：限制JS操作
```
- 常用操作：
```js
// 设置键值对：直接赋值给documnet.cookie
documnet.cookie = 'name = xxx'
document.cookie = 'age = 18; expires = xxx'
// 获取cookie值，直接打印即可
console.log(documnet.cookie)
// cookie会自动带在路径上，后端获取
console.log(req.cookies)
// 需要中间件
// npm i cookie-parser
app.use(cookieParser())
// 获取
req.cookies
```

# Web前端存储Session Stroage

- 不会随着客户端自动向服务器发送请求
- 临时会话，关闭浏览器将不存在
- 不同页面不能共享，是 H5 新特性
- 本质是挂在window上的一个对象
- api：
```js
// 设置
sessionStorage.setItem(key, value)
// 读取
sessionStorage.getItem(key, value)
// 删除单个
sessionStorage.removeItem(key)
// 删除所有
sessionStorage.clear()
// 根据索引查找
sessionStorage.key(index)
```

# Web前端存储Local Stroage

- 不会随着客户端自动向服务器发送请求
- 永久存在，除非手动删除
- 同一域下可以访问， 是H5新特性
- 本质是挂在window上的一个对象
- api 同上

# Web安全

- 主要有：信息泄露，XSS，CSRF，SQL注入，不完善身份注入，不完善的访问控制等
- 信息泄露：数据传输过程中需经过很多节点，如果明文传输可能会在这些节点泄露
- 解决：HTTPS协议，加密
- 加密算法：分为单向散列函数，非对称加密，对称加密

# Base64
- 用与传输 8bit 字节代码的编码方式之一
- node上的Base64
```js
// 安装 npm i js-base64
const Base64 = require('js-base64').Base64
// 编码
Base64.encode(str)
// 解码
Base64.decode(str)
```
- 在前端中也可以通过标签引入，还可以定义相关函数

# HTTPS协议
- 即HTTP内容向下传输时加了一层TLS/SSL加密
- HTTPS利用非对称加密传输一个随机数，作为后面对称加密的钥匙
- HTTPS协议默认端口号 443
```js
// 固定代码
const fs = require('fs')
const http = require('http')
const https = require('https')
let privateKey = fs.readFileSync('sslcert/server.key', 'utf-8')
let certificate = fs.readFileSync('sslcert/server.crt', 'utf-8')
let credentials = { key: privateKey, cert: certficate }
const express = require('express')
const app = express()
// your express configuration here
let httpServer = http.createServer(app)
let httpsServer = https.createServer(credentials, app)
httpServer.listen(80)
httpsServer.listen(443)
```

# 同源策略

- 限制了DOM操作，限制了cookie操作，限制了发送请求
- 同源策略并非绝对，一般跨域的写操作允许，而读操作不允许
- 带有src属性的标签也可以跨域加载
```js
// 使用CROS实现跨域访问
// 加一个响应头即可
res.append('Access-Control-Allow-Origin', '*')
```
```js
// 使用JSONP实现跨域访问
// 原理：利用<script>标签可以进行跨域访问来操作
// 后端，用express框架
res.jsonp({name: 'xxx'})
// 传输的数据是：'callback({"name": "xxx"})'
// 默认的JSONP回调函数名称是 callback,想改变名字可以在路径上带参数
// 前端，在 scripit 标签里发送请求，并定义 callback 函数来接收
<script src="https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd= "></script>
```