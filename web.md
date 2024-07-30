# href

`protocol`: 协议, 规定数据传输的规则, 包括 http, https 协议等  

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

# IP

每台电脑都有一个独一无二的地址, 可在命令行输入 ipconfig 来显示, 用 `http://127.0.0.1` 或 `http://localhost` 表示本机  

域名: ip 地址的代称, 为了方便记忆  

端口号: 每个主机上都有不同的服务, 用端口号来区别  

# url 统一资源定位器

相对路径: 同目录用 ./ 来表示, 子目录用 / 来表示, 父目录用 ../ 来表示  

绝对路径: 即完整的写出文件路径  

根相对路径: 以 / 开头来表示  

# HTTP 协议

HTTP 报文分为请求报文, 响应报文, 再次细分可分为请求行, 请求头, 请求体, 响应报文类似  

请求行: 包括 HTTP 请求方法, 请求资源路径, HTTP 版本等等, 请求方法主要有: GET, POST, PUT, DELETE 等  

	GET 与 POST 请求方法
	GET 请求方法参数在地址栏, POST 在请求体
	GET 请求数据较小, 一般文件上传用 POST
	GET 请求的内容可以缓存, 而 POST 不能

请求头: 包括对客户端和请求本身的描述信息  

	content-type: 告诉 Web 服务器请求数据的类型和字符集
	cookie: 允许服务器在客户端存储少量数据

请求体: 包括发送给服务器的查询信息, 只有 POST 请求才有  

响应行: 里主要是状态码和解释信息等  

	状态码与对应信息:
	1xx: 提示信息, 2xx: 成功, 3xx: 重定向, 4xx: 客户端错误, 5xx: 服务端错误
	200 OK: 成功
	201 Created 已创建
	302 Found: 重定向, 新的 url 在 response 中的 location 中返回, 浏览器重新发送请求
	304 Not Modified: 文档已被缓存, 应从缓存中调用
	400 Bad Request: 客户端请求错误
	401 Unauthorized 无权限
	404 Not Found: 请求资源不存在
	500 Internal Server Error: 服务器错误

响应头主要是对服务器和响应信息的描述  

响应体是返回个服务器的内容  

# Web 前端存储 Cookie

主要用来辨别用户身份, cookie 会自动带在路径上, 发送到服务器, 不能跨域和跨浏览器, 由键值对 key=value 组成, 之间用分号与空格隔开  

属性

	expires：有效期
	domain, path：限制能被哪些URL访问
	secure：限制 https 传输
	httponly：限制 JS 操作

操作

```js
// 设置键值对: 直接赋值给 documnet.cookie
documnet.cookie = 'name = xxx'
document.cookie = 'age = 18; expires = xxx'
// 获取 cookie 值, 直接打印即可
console.log(documnet.cookie)
// cookie会自动带在路径上，后端获取
console.log(req.cookies)
// 需要中间件
// npm i cookie-parser
app.use(cookieParser())
```

# Web 前端存储 Session Stroage

不会随着客户端自动向服务器发送请求, 临时会话, 关闭浏览器将不存在且不同页面不能共享, 是 H5 新特性, 本质是挂在 window 上的一个对象  

api

```js
sessionStorage.setItem(key, value) // 设置
sessionStorage.getItem(key, value) // 读取
sessionStorage.removeItem(key) // 删除单个
sessionStorage.clear() // 删除所有
sessionStorage.key(index) // 根据索引查找
```

# Web 前端存储 Local Stroage

不会随着客户端自动向服务器发送请求, 永久存在，除非手动删除, 同一域下可以访问, 是 H5 新特性, 本质是挂在 window 上的一个对象  

api 同上  

# HTTPS协议

即 HTTP 内容向下传输时加了一层TLS/SSL加密  

HTTPS 利用非对称加密传输一个随机数，作为后面对称加密的钥匙  

HTTPS 协议默认端口号 443  

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

# Web安全

- 主要有：信息泄露，XSS，CSRF，SQL注入，不完善身份注入，不完善的访问控制等
- 信息泄露：数据传输过程中需经过很多节点，如果明文传输可能会在这些节点泄露
- 解决：HTTPS协议，加密
- 加密算法：分为单向散列函数，非对称加密，对称加密

# Base6

- 用与传输 8bit 字节代码的编码方式之一
- node 上的 Base64

```js
// 安装 npm i js-base64
const Base64 = require('js-base64').Base64
// 编码
Base64.encode(str)
// 解码
Base64.decode(str)
```
- 在前端中也可以通过标签引入，还可以定义相关函数

# 同源策略

- 限制了 DOM 操作，限制了cookie 操作，限制了发送请求
- 同源策略并非绝对，一般跨域的写操作允许，而读操作不允许
- 带有src属性的标签也可以跨域加载

```js
// 使用CORS实现跨域访问
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
// 核心思想：网页通过添加一个<script>元素，向服务器请求 JSON 数据，服务器收到请求后，将数据放在一个指定名字的回调函数的参数位置传回来。
```

# 图片格式

`BMP`: 无损, 点阵图, 既支持索引色也支持直接色, 体积大

`GIF`: 无损, 点阵图, 索引色, 支持动画和透明, 体积小

`JPEG`: 有损, 点阵图, 直接色, 非常适合存储照片, 体积较大

`PNG-8`: 无损, 点阵图, 索引色, 支持透明度, 体积小

`PNG-24`: 无损, 点阵图, 直接色, 压缩后体积较小

`SVG`: 无损, 矢量图, 放大不会失真, 非常适合绘制 logo, icon

`WebP`: 支持有损和无损, 点阵图, 直接色, 体积小, 减少数据传输量, 适合 web 上使用

# React 中 BrowserRouter 与 HashRouter 的区别

底层原理：BrowserRouter 使用的是 H5 的 history API，不兼容 IE9 以下版本；HashRouter 使用的是 url 的哈希值

url 表现形式：一个有 `#` 号一个没有

页面刷新对 state 传值的影响：BrowserRouter 没有任何影响，因为 state 保存在 history 对象中；HashRouter 刷新后会导致参数的丢失