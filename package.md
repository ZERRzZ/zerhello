# 模板技术

- 将显示与数据分离
- 实质就是拼接字符串，模板引擎利用正则表达式识别模板标识，然后再替换成数据

# EJS 模板引擎

- <%= %> 输出数据到模板（输出是转义 HTML 标签）
- <%- %> 输出非转义的数据到模板
- <% %> '脚本' 标签，用于流程控制，无输出。
- ejs.render(str, data[, options])
- ejs.renderFile(fliename, data[, options], (err, str) => {})

```html
<!-- 需创建以 ejs 后缀的文件 -->
<ul>
  <% book.forEach((value) => { %>
  <li><%= value %></li>
  <% }) %>
</ul>
```

```js
const express = require('express')
const ejs = require('ejs')
const app = express()
app.get('/:n', (req, res) => {
  // arr 是传入 renderFile 的数据名
  // 真正的数据存在 { } 里
  // {} 里的参数名与模板里写的参数名需一致
  let arr = { book: [1, 2, 3, 4] }
  ejs.renderFile('./test.ejs', arr, (err, str) => {
    if (err) console.log(err)
    res.send(str)
  })
})
app.listen(8888, () => console.log('succeed'))
```

- `<%- include('xxx.html'} -%>`: 引入其他页面的代码

- 在 express 中使用 ejs
- 用 express.set(key, value): 设置模板文件的位置和使用的模板引擎名字
- `express.set("view engine", "ejs")`：渲染后缀名为 ejs 的模板
- express 中 ejs 默认文件夹是项目根目录下 views 文件夹，可以设置
- `express.set("views", __dirname)`：将默认文件夹设置成当前文件夹
- `express.engine('html', require('ejs').renderFile)`

```js
// 以下三个设置是可以直接渲染后缀为 html 的模板
express.set('view engine', 'html')
express.set('views', __dirname)
express.engine('html', require('ejs').renderFile)
```

```js
const express = require('express')
const ejs = require('ejs')
const app = express()
// 将默认文件夹设置成当前文件夹
app.set('views', __dirname)
// 设置模板引擎为 ejs
app.set('view engine', 'ejs')
app.get('/view', (req, res) => {
  // 传参时，文件名可以不写后缀
  // 数据的放在 {} 里
  res.render('test', { book: [2, 3, 4, 5] })
})
app.listen(8888, () => console.log('successful'))
```

# express Web 开发框架

- 一个基本的 express 框架写法

```js
// 引入 express 框架
const express = require("express")
// 创建 app 服务（http 服务）,创建一个 web 应用 +
const app = express()
// 发送 GET 请求
app.get('/', (req, res) => {
  // req, res 是经封装后的请求和响应
  res.send("hello express")
})
// 绑定端口
app.listen(8888, () => console.log("sucessful");)
```

- 路由，相关方法：app.get(root, call(req,res)) 用 GET 请求
- app.get/post/put/delete: 增删改查
- app.all(): 可调用所有方法
- app.route(root).get/post/put/dalete: 稍微优化(链式调用)
- app.get("\*") 表示请求所有路径

```js
const express = require("express")
const app = express()
// 链式调用，懒癌晚期
app.route("/abc")
  .get((req, res) => {
    res.send("get 方法")
  })
  .post((req, res) => {
    res.send("post 方法")
  })
  .put((req, res) => {
    res.send("put 方法")
  })
  .delete((req, res) => {
    res.send("delete 方法")
  })
  app.listen(8888, () => console.log("succeed");)
```

- 路由模块化：将路由模块单独放在一个文件，方便管理
- 路由模块创建实例并导出：express.Router() ---> module.exports
- 主模块引入并使用：require() ---> app.use()
- 当 app.use("/", xxx) 传了路径时，路由哪里路径就可以用 "/" 即可

```js
// app.js 中
const express = require('express')
const router = require('./test2')
const app = express()
// 调用 use 方法才能使用
app.use(router)
// 监听
app.listen(8888, () => console.log('succeed'))

// router.js 中
const express = require('express')
// 实例化 Router 对象
// Router 是 express 中封装好的路由模块
const router = express.Router()
// 使用 router 即可，使用方法同一般路由
router.get('/', (req, res) => res.send('GET & /'))
router.route('/abc').get((req, res) => res.send('GET & /abc'))
// 导出 router
module.exports = router
```

- 静态资源：app.use('', express.static(root))
- express.static 中的 root 应该是静态资源的根目录
- app.use 中第一个参数是虚拟路径，让客户端请求虚拟路径来访问静态资源

```js
const express = require('express')
const app = express()
// express.static 指把 test 文件夹下的静态资源暴露出去
// app.use("/static") 指访问虚拟路径 /static/xxx.xxx 就可以访问静态资源
app.use('/static', express.static(__dirname))
app.listen(8888, () => console.log('success'))
```

- 中间件: 就是一个函数，为了不写冗余代码 (middleware)
- 定义：func(req, res, next)，next 是一个函数，传递中间件栈对某个请求的处理流
- 优化：在 express 中，只需调用 app.use(func)，即可解决冗余

```js
// 自定义一个中间件
function showTime(req, res, next) {
  // res.send(new Date()) // send 方法只能用一次
  console.log(Date.now())
  next() // 注意 next 必写
}
// 应用
const express = require('express')
const app = express()
app.use(showTime)
app.get('/', (req, res) => res.send('GET & /'))
app.get('/abc', (req, res) => res.send('GET & /abc'))
app.listen(8888, () => console.log('succeed'))
```

- 常见的中间件：
- express.urlencoded(): 请求数据是表单数据时对请求体参数的封装
- express.json(): 请求数据是 json 时对请求参数的封装

- express 响应：[响应的常见方法](./img/express响应.png)
- `res.send()`, 发送数据，自动设置消息头
- `res.json()`, 自动把 JS 对象转成 json 格式的数据，并设置响应头
- `res.download(fliename)`, 下载文件， 实质时设置消息头 content-disposition: attachment;filename="xxx"

```js
const express = require('express')
const app = express()
app.get('/download', (res, req) => {
  res.send({ name: 'sadanya', age: 18 })
  res.json({ name: 'sadanya', age: 18 }) // 可被 send 替代
  res.download('./test.jpg') // 不可替代
})
app.listen(8888, () => console.log('111111111'))
```

- express 请求：[请求的常见方法](./img/express请求.png)
- `req.query`：获取 get 请求参数
- `req.ip`: 获取请求 ip
- `req.body`: 获取请求体参数，需配合中间件使用
- `req.params`: 获取路径上的参数

```js
const express = require("express")
const app = express()
// 当用表单上传时
app.use(express.urlencoded())
// 当用 json 格式字符串上传时
app.use(express.json())\
// get 请求参数在路径上
app.get("/get", (req, res) => {
  console.log(req.query.id) // 指明要获取的对象
  console.log(req.ip);
  res.end("GET")
})
// post 请求参数在请求体里
app.post("/post", (req, res) => {
  console.log(req.body);
  res.end("POST")
})
app.listen(8888, () => console.log("successful"))
```

- Restful 格式规范：方便前后端分离，例：
- GET /users 获取用户列表 // get 方法，且路径中名词加 s
- GET /users/1 获取 id 为 1 的用户
- PUT /users/1 更新 id 为 1 的用户
- POST /users/2 插入 id 为 2 的用户
- DELETE /users/1 删除 id 为 1 的用户
- 登录：GET /tokens // 用单词 tokens 来表示
- express 对 restful 的支持
- `app.get("/users/:id", () => {}` 支持访问路径上所有 id 不同的情况
- `req.params` 用 req 的 params 属性来获取访问的 id 值

```js
const express = require('express')
const app = express()
app.get('/:n', (req, res) => {
  // 获取路径上的参数
  // 只针对 /xxx, 遇到 /xxx/xx 时无效
  console.log(req.params)
  res.send(`hello ${req.params.n}`)
})
app.listen(8888, () => console.log('succeed'))
```

- app.use() 方法: 给 path 注册中间函数的
- ([path], function): path 默认为 "/", 会处理所有请求(即：/xxx，/xxx/xxx, /xxx/xxx/xxx)

```js
const express = require('express')
const app = express()
app.use('/', (req, res, next) => {
  res.send('hello again')
  next()
})
app.listen(8888)
```

# AJAX 异步 JS 与 XML 技术

- 可以用 js 代码发送请求，可以局部刷新而不是全部页面
- 步骤：创建 AJAX 对象 -> 设置请求路径，方法 -> 绑定监听状态改变函数 -> 发送请求
- ajax 是为浏览器而写的，首先要确保网页运行在服务器上
- [ajax 请求流程](./img/ajax请求流程.png)

```js
// 创建 ajax 对象
const ajax = new XMLHttpRequest()
// 设置请求方式，请求路径，默认 true 就是异步
// 路径是请求的路径
ajax.open('get', '/index', true)
// 绑定监听状态改变处理函数，在处理函数中可获取响应数据
ajax.onreadystatechange = function () {
  console.log(ajax.readyState)
  console.log(ajax.responseText)
  // 4 与 200 是两个判断访问成功的标志
  if (ajax.readyState == 4 && ajax.status == 200) {
    console.log('访问成功')
  }
}
// 发送请求，如果是 post 请求就会有参数
ajax.send()
```

- ajax 响应处理
- 响应的内容在绑定状态改变的处理函数中用 ajax.responseText 获得
- 相关属性，ajax.xxx

```
readystate: 状态, 0-初始化，1-开始发送请求，2-请求发送成功，3-读取服务器响应，4-响应结束
status: 状态码
responseText: 字符串形成的响应数据
```

- 禁用缓存的处理：在 url 上绑定时间戳或随机数, 或在请求头上设置
  `ajax.setRequestHeader("Cache-control": "no-cache")`
- POST 请求即在 ajax.send()中把参数填入即可
- 中断请求：ajax.abort()一般配合定时器使用，用来处理超时

```js
// 将方法变为 post
ajax.open('post')
// 设置请求头
// 如果上传文件则不需设置请求头
ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
// param 不含？，注意格式
ajax.send(param)
setTimer(() => {
  console.log('响应超时')
}, 5000)
```

- FormData 类：let formdata = new FormData()
- () 内可以传表单, 用 dom 获取对象传进去可获得表单内的键值
- 常见方法: set, get, append, getAll, delete, has, forEach...
- ajax.onload 相当于 ajax.onreadystate == 4

```js
// 用 formdata 发送 post 请求
const formdata = new FormData(表单)
const ajax = new XMLHttpRequest()
ajax.open('post', '/file', true)
ajax.onload = () => {
  if (ajax.status == 200) {
    console.log(ajax.responseText)
  }
}
ajax.send(formdata)
```

```js
// 文件上传
// 前端代码同post请求，不写消息头
// 后端代码
// 引入和使用
const fileupload = require('express-fileupload')
app.use(fileupload())
// 获取数据
req.files.xxx
// 方法
req.files.xxx.mv(path, callback)
```

- 文件上传进度`ajax.upload.onprogress = (e) { }`
- 超时处理 `ajax.timeout` 设定超时时间，`ajax.ontimeout=(e){}` 绑定超时时间

# Axios

- 基于 promise 的 HTTP 库，可以用在浏览器与 node
- 使用：npm i axios, `<script src="https://unpkg.com/axios/dist/axios.min.js">`
- 发送 get 请求：

```js
// url可以直接写在路径 "/abc?name=xxx&age=18"
// 也可以写成对象 '/abc', {params: {naem: xxx, age: 18}}
axios
  .get('/abc' + param)
  .then(response => {
    console.log(response)
  })
  .catch(err => {
    console.log(err)
  })
```

- 发送 post 请求：

```js
axios
  .post('/abc', {
    name: 'xxx',
    age: 19
  })
  .then(response => {
    console.log(response)
  })
  .catch(err => {
    console.log(err)
  })
```

- put 请求与 delete 请求类似
