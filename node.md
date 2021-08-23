# 浏览器内核

* 含义：指浏览器的渲染引擎(Rendering engine)
* 常见的内核：
* `Gecko`
* `Trident`: IE
* `Webkit`: Safari
* `Blink`: Chrome,Edge,Opera，是 Webkit 的再开发
* 工作过程：见图片 [内核工作过程](./img/内核工作过程.png)

# JS 引擎

* 含义：将 JS 代码编译成机器语言，以便 CPU 来执行
* 常见的 JS 引擎：SpiderMonkey, Chakra, JavaScriptCore, V8
* JS 引擎工作原理：以 V8 为例，V8 是用 c++ 开发的
* 见图片 [V8引擎](./img/V8引擎1.png)
* 见图片 [V8引擎](./img/V8引擎2.png)
* 见图片 [V8引擎](./img/V8引擎3.png)

# 内核与 JS 引擎的关系

* 以 Webkit 为例，它包含了 WebCore 与 JavaScriptCore
* WebCore 用来解析 HTML，并布局与渲染页面
* JavaScriptCore 用来解析并执行 JS 代码
* 综上所述，及内核中是包含 JS 引擎的

# 其他前置知识

* 异步 IO
* IO 指计算机中的 Input/Output
* 同步，异步，线程（只可意会，不可言传）
* 文件系统
* 内存与磁盘的概念
* 文件系统是对磁盘的抽象

# Node 的简介

* 简介：基于 Chrome V8 引擎的 JavaScript 运行时环境
* Node 与浏览器架构的差异：见图片 [Chrome与Node架构差异](./img/Chrome与Node架构的差异.png)
* Node 的详细架构：见图片 [Node架构](./img/Node架构.png)
* 我们编写的代码会通过 V8 引擎编译，再通过 Node 的 Bindings，将任务放到 Libuv 的事件循环里

# Node 的引用场景

* 用 Node 作为 Web 服务器的开发
* 用 Node 管理前端开发的库
* npm, yarn 前端开发的工具
* 用 Electron 开发桌面应用程序

# Node 的版本管理工具

* Node 及一般通用的查看版本的命令

```
node --version
```
* 常见的有 nvm, n, 但他们都不用于 Window

# 用 Node 来执行代码

* 进入目标文件的路径
* 执行 node 文件名 即可编译代码

```
node ./test.js
```

# Node 中的 REPL 环境

* REPL 指简单的交互式环境(Read-Eval-Print Loop)
* 浏览器就在 console 里
* 在 Node 中，控制台输入 node 即可进入该环境

# Node 中的全局对象

* Node 中全局对象是 global，而浏览器中是 window
* `global.process` 进程

```js
console.log(process)
console.log(process.arch) // 操作系统的位数
console.log(process.argv) // 执行文件时传入的参数
```

* `global.console` 打印，同 window

```js
console.log("你好")
console.trace() // 打印栈信息
```

* `setTimeout(callback, ms)`,`setInterval()`
* `clearTimeout()`,`clearInterval()`

```js
setTimeout(() => {
  console.log("一秒后执行");
}, 1000)
console.log("我先出来"); // 异步
```

```js
let timer = setTimeout(() => {
  console.log("出不来了");
}, 1000)
console.log("出的来");
clearTimeout(timer)
```

# __filename 和 __dirname

* 每个文件都会创建两个变量，存储着文件名和文件目录

```js
console.log(__filename);
console.log(__dirname);
```

# Buffer 对象

* Node 中为了传输文件流而定义了 Buffer 类
* 属性：`length`
* Buffer 的创建

```js
let buffer1 = Buffer.from([1,2,3,4,5]) // 通过数组来常见 Buffer 对象
let buffer2 = Buffer.from('sadanya', 'utf-8') // 通过字符串创建，可选参数编码方式，默认 utf-8
let buffer3 = Buffer.alloc(10) // 创建长度为 10 的空 buffer
console.log(buffer1,buffer2,buffer3);
```
* 静态方法(static method)

* Buffer.isEncoding() 是否支持参数编码
* Buffer.isBuffer() 是否是 Buffer 类
* Buffer.byteLength() 参数转化成 Buffer 类型后的长度
* Buffer.concat() 连接两个 Buffer

```js
let buffer1 = Buffer.from("abc")
let buffer2 = Buffer.from("def")
console.log(Buffer.isEncoding("gbk"));
console.log(Buffer.isBuffer("我是个字符串"));
console.log(Buffer.byteLength(buffer1));
console.log(Buffer.concat([buffer1,buffer2])); // list 用一个数组来表示
```

* 实例方法(instance method)

```js
let buffer = Buffer.alloc(10)
buffer.write("sadanya") // 写入数据
console.log(buffer)
console.log(buffer.toString()); // 转换成字符串
console.log(buffer.toJSON()); // 转换成 JSON 对象
```

# Node 模块化

* 文件即模块，文件在创建时有一个 module 对象，里面有一个属性，默认为空

```js
console.log(module);
```

* Node 中的模块化规范是 common.js 规范
* 导出值就是 exports 对象的值
* 接收值就是 require 文件名

`moudle.exports = exports = {}`

* 已经加载了的模块会被缓存，以提高性能
* 后缀 .js,.json,.node 可以省略，加载顺序 js->json->node
* 模块分为内置模块，第三方模块，自定义模块
* 模块加载顺序：内置 -> 第三方 -> 自定义

```js
const fs = require('fs') // 引入内置模块
const mysql = require('mysql') // 引入第三方模块
const test = require('./test') // 引入自定义模块
```

# path 模块

* 不同的操作系统的文件系统不同，path 模块就是来解决这些问题的
* 属性：sep, 路径分隔符（win：\ , unix: / )
* 属性：delimiter, 环境变量分隔符（win: ; , unix: : )

```js
const path = require('path')
console.log(path.sep);
console.log(path.delimiter);
```

* 常见方法：
* parse(path): 将路径字符串转换成 js 对象
* format(pathObj): 将路径对象转换成路径字符串

```js
const path = require('path')
let pathObj = {
  root: 'E:\\',
  dir: 'E:\\WEB\\Web Learning\\Note Taking',
  base: 'test.js'
}
console.log(path.parse(__filename));
console.log(path.format(pathObj);
```

* path.join([...paths])：连接路径

```js
const path = require('path')
let newPath = path.join(__dirname, 'img', 'V8引擎1') // 用 \ 连接字符串
console.log(newPath);
```

# fs 模块

* 提供一组标准的文件操作 API，都有同步和异步方式
* 异步中回调函数第一个参数是错误信息 error
* 第二个一般是数据 data

* fs.stat(path[,options], callback): 返回文件的信息
* fs.readFile(path[,options], callback): 读文件，文本文件一般传一个编码，例 utf-8
* fs.writeFile(path, data[,options], callback): 写入文件，会覆盖原内容
* fs.appendFile(path,data[,options],callback): 写入文件，不会覆盖

```js
const fs = require('fs')
const path = require('path')
fs.stat(path.join(__dirname, 'test.html'), (err, stat) => {
  console.log(stat)
})
fs.readFile('./HTML.md', 'utf-8', (err, data) => {
  console.log(data); // 加了 utf-8 会转成字符串，没加就是 buffer
})
// writeFile,appendFile 不好测试
```

* 文件流模式, 当读大文件时使用
* fs.createReadStream(path[,option])
* fs.createWriteStream(path[,option])

```js
const fs = require('fs')
// 搭建读的管道
const stream = fs.createReadStream('./HTML.md')
let data = ''
// 当文件还有数据向程序流，则执行回调函数，并将流过的数据存放在 chunk 中
stream.on('data', (chunk) => {
  data += chunk
})
// 当文件数据流完了之后，执行回调函数
stream.on('end', (chunk) => {
  console.log(data);
})
```
```js
const fs = require('fs')
const stream = fs.createWriteStream('./test.js')
// 类似 http 的 response
stream.write("hello")
stream.end('world')
// 以下事件可以不写
stream.on('finish', (err) => {
  if(err) {
    console.log(err);
  } else {
    console.log('写入成功');
  }
})
```

* 文件的拷贝
* readStream.pipe(writeStream) 连通两个管道
* copyFile(path1,path2,callback) 方法

```js
const fs = require('fs')
const readStream = fs.createReadStream('./test.html')
const writeStream = fs.createWriteStream('./test.js')
readStream.pipe(writeStream)
```

* 目录操作
* fs.mkdir() 创建目录
* fs.readdir() 读目录
* fs.rmdir() 删除目录

# URL 模块

* URL 构造函数：WHATWG URL 标准无需引入 url 模块，直接用构造函数创建实例

```js
const url = new URL("https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash")
console.log(url)
```

* 新的 WHATWG URL 标准：

```
下面一行中：origin,protocol,username,password,host,hostname,port,pathname,search,hash 都是 url 的属性含义
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

* searchParams 伪对象：其中有 get,set,append,delete 方法，表示增删改查

```js
let myUrl = new URL("https://www.baidu.com/abc?name='xx'&age=18")
console.log(myUrl.searchParams.get("name")) // get 方法传入名字即可得到值
myUrl.searchParams.delete("name") // delete 方法
myUrl.searchParams.append("query","xyz") // append 与 set 方法类似
myUrl.searchParams.set("a","b")
console.log(myUrl);
```

# querystring 模块

* 对 url 中的查询字符串进行处理
* 方法一：querystring.parse(查询字符串), 将查询字符串转换成对象
* 方法二：querystring.stringify(对象)，将对象转换称字符串

```js
const querystring = require("querystring")
let str = "name='sadanya'&age=20&power='super man'"
let obj = querystring.parse(str)
console.log(obj)
let str2 = querystring.stringify(obj)
console.log(str2)
```

## http 模块

* 一个基本的服务器结构

```js
const http = require("http")
// 创建服务器，若有请求过来，就会执行回调函数
// req 即 request: 表示请求对象
// res 即 response：表示响应对象
let server = http.createServer((req, res) => {
  // 响应数据
  res.end("hello world")
})
// 启动应用，监听端口
// 启动成功后，执行回调函数
server.listen(8888, () => console.log("成功"))
```

* http.Server 事件：基于事件的 http 服务器，所有请求都被封装在独立的事件中
* 常用事件：request, 当客户端发送请求时触发事件
* 常用事件：close, 当服务器关闭时触发事件，并非强制关闭

```js
const http = require("http")
// 创建一个 server 实例
let server = new http.Server()
// 为 server 绑定事件 request,当请求过来是触发
server.on("request", (req, res) => {
  res.end("hello world")
})
// 监听端口
server.listen(8888, () => console.log("成功"))
// 绑定关闭事件
server.on("close", () => console.log("关闭"))
// server.close() // 关闭服务器，测试 close 事件
```

* 响应：http.ServerResponse, 返回个客户端信息，是 request 事件的第二个参数
* 重要方法：
* res.writeHead(statusCode[,headers]), 发送状态码和响应头
* res.write(data[,encoding]), 发送响应内容
* res.end(data[,encoding]), 发送响应内容并结束响应

```js
const http = require("http")
let server = http.createServer((req, res) => {
  // writeHead 的参数有些特殊，headers 是一个对象
  // content-type 设置数据的类型
  // charset=utf-8 为了不让中文乱码，需要设置，注意格式
  res.writeHead(200, {"content-type": "text/plain;charset=utf-8"})
  // end 必须要写一个，表示数据发送完成，不然客户端会一直等待
  // 这里省略了 write 因为只发送一句话
  res.end("你好，世界")
})
server.listen(8888, () => console.log("成功"))
```

* 请求：http.ServerRequest, 请求的信息，是 request 事件的第一个参数
* 常见属性：method, url, headers, 表示请求方法，请求地址，请求头
* 常见方法：
* data: 当请求数据到来时触发事件，把数据存在参数 chunk 中
* end: 当请求体数据完成时触发事件
* close: 当用户结束请求时触发事件
* 应用场景：http 请求分为请求头和请求体，请求头中内容较小，可直接读取。而请求体中内容较大，需要用到这些方法

```js
const http = require("http")
const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    // 在 url 中可获得全部消息
  } else if (req.method === "POST") {
    // 通过 req 的方法来接收数据
    let data = ""
    req.on("data", (chunk) => {
      data += chunk
    })
    req.on("end", () => {
      console.log(data)
    })
  }
})
server.listen(8888, () => console.log("成功"))
```

# 包-package

* 包就是一个目录，包含一个 JSON 格式的包说明文件 package.json
* common.js 中的包规范：

```
1.package.json 必须在包的顶层目录下
2.二进制文件在 bin 目录下
3.JS 代码在 lib 目录下
4.文档在 doc 目录下
5.单元测试在 test 目录下
... ...
```

* 调用包时，会检查 package.json 中 main 字段, 将作为包的入口文件
* [package.json文件信息](./img/package文件信息.png)

```
npm init -y
// 此命令可以得到一个 package.json 文件
// 即初始化一个包
```

# JSON

- 服务器与客户端传输的数据格式：xml, html, json
- json数据轻量且易于JS对象进行转换，本质是有格式的字符串
- 格式：基本格式类似对象，属性用双引号，多个对象用[]括起来
- 方法：JSON.parse()将JSON字符串转成JS对象，JSON.stringify()将JS对象转成JSON字符串
```js
let json1 = '{"name": "sadanya", "age": 18}'
let json2 = '[{"name": "sadanya", "age": 18}, {"name": "no.2", "age": 18}]'
let json3 = '{"name": "sadanya", "age": 18, "class": {"1": 1, "2": 2}}'
let obj1 = JSON.parse(json1)
let obj2 = JSON.parse(json2)
let obj3 = JSON.parse(json3)
console.log(obj1)
console.log(obj2)
console.log(obj3)
```