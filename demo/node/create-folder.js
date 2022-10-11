// 此例是为了在桌面创建一个文件夹，里面包含一些文件和文件夹

// 要创建的根文件夹名字
let rootFloder = 'myproject'

// 根文件夹所在的位置
let rootDir = "C:/Users/29300/Desktop"

// 根文件夹里的文件与文件夹
let initData = [
  {
    name: "img",
    type: "folder"
  },
  {
    name: "js",
    type: "folder",
  },
  {
    name: "css",
    type: "folder"
  },
  {
    name: "index.html",
    type: "file"
  }
]

// html 文件里的数据
let fileData = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>hello world</title>
</head>
<body>
  <h1>Hell World</h1>
</body>
</html>
`

// 引入模块
const fs = require('fs')
const path = require('path')

// 在桌面创建一个文件夹
// path.join 将路径从左到右拼接起来
fs.mkdir(path.join(rootDir, rootFloder), (err) => {
  if (err) console.log(err)
})

// 在文件夹里创建其他内容
initData.forEach((value) => {
  // 当文件类型是 folder 时创建文件夹
  if (value.type === 'folder') {
    fs.mkdir(path.join(rootDir, rootFloder, value.name), (err) => {
      if (err) console.log(err)
    })
  } else {
    // writeFile 方法当没有该文件时，会自己创建文件
    fs.writeFile(path.join(rootDir, rootFloder, value.name), fileData, (err) => {
      if (err) console.log(err)
    })
  }
})
// 在文件里写入数据
// 在上一步中已经解决