// 此例是用 node.js 来创建服务器, 并返回服务器上的静态资源

const http = require("http")
const fs = require("fs")
const path = require("path")

// 创建服务器
const server = http.createServer((req, res) => {
  // fileType 预设置文件的 mime 值
  let fileType = {
    ".html": "text/html",
    ".jpg": "image/jpeg",
    ".js": "application/javascript"
  }

  // 根据请求路径读取文件, 路径自己写
  fs.readFile(path.join(__dirname, req.url), (err, data) => {
    if (err) {
      // 失败时返回中文文本，需要设置消息头 utf-8
      res.writeHead(404, { "content-type": "text/plain;charset=utf-8" })
      res.end("你访问的资源不存在！！！")
    } else {
      // 返回文件内容，设置文件类型
      // extName 访问路径中文件后缀名
      let extName = path.parse(req.url).ext
      // mimeType 通过事先设置好的对象，找到相应后缀名的 mime 值
      let mimeType = fileType[extName]
      //  当返回的数据有文本信息时，设置编码格式，防止乱码
      if (mimeType.includes("text")) {
        mimeType += ";charset=utf-8"
      }
      // 设置消息头
      res.writeHead(200, { "content-type": mimeType })
      res.end(data)
    }
  })
})

server.listen(8888, () => console.log("成功，请访问：http://localhost:8888"))



// // 下面是 express 方法
// const express = require("express")
// const app = express()

// app.use(express.static(__dirname))

// app.listen(8888)