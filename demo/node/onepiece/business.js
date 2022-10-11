const fs = require('fs');
const queryString = require('querystring')
const linkdb = require('./linkdb')

// index 页面的数据处理
function indexHtml(response) { // 回调函数永远的神！！！
  fs.readFile('./index.html', (error, data) => {
    if (error) throw error;

    let dataString = data.toString()
    let str = ''

    // 调用 linkdb 中暴露的方法
    linkdb.indexData((results) => {
      for (let i in results) {
        str +=
          `<tr>
            <td>${results[i].id}</td>
            <td>${results[i].name}</td>
            <td>${results[i].power}</td>
            <td>${results[i].team}</td>
            <td>
              <a href='/personal/?id=${parseInt(i) + 1}'>查看</a>
              <a href='/changed/?id=${parseInt(i) + 1}'>修改</a>
              <a href='/delete/?id=${parseInt(i) + 1}'>删除</a>
            </td>
          </tr>`
      }
      let newStr = dataString.replace('<tbody></tbody>', `<tbody>${str}</tbody>`)
      response.end(newStr) // 在业务中直接导出，需要传参数
    })
  })
}

//其他静态资源处理
function otherHtml(url, response) {
  fs.readFile('.' + url, (error, data) => {
    // if (error) throw error;
    response.end(data)
  })
}

// personal 页面处理
function personalHtml(url, response) {
  fs.readFile('./personal/personal.html', (error, data) => {
    if (error) throw error

    let dataString = data.toString()
    let str = ''

    linkdb.personalData(url.searchParams.get('id'), (results) => {
      str += `
        <h1>${results.name}</h1>
        <p>${results.power}</p>
        <p>${results.team}</p>`

      let newStr = dataString.replace('<body></body>', `<body>${str}</body>`)

      response.end(newStr)
    })
  })
}

// changed 页面处理 get
function changedHtmlGet(url, response) {
  fs.readFile('./changed/changed.html', (error, data) => {
    if (error) throw error

    let str = ''

    linkdb.personalData(url.searchParams.get('id'), (results) => {
      str += `
        <form action="/changed/?id=${results.id}" method="POST">
          <h3>基本信息</h3>
          <div id='main'></div>
          <p><span>id: </span><span>${results.id}</span></p>
          <p><span>姓名: </span><input name="name" type="text" value="${results.name}" autocomplete="off"></p>
          <p><span>能力: </span><input name="power" type="text" value="${results.power}" autocomplete="off"></p>
          <p><span>团体: </span><input name="team" type="text" value="${results.team}" autocomplete="off"></p>
          <p><input type="submit" value="提交"></p>
        </form>`

      let newStr = data.toString().replace("<body></body>", `<body>${str}</body>`)
      response.end(newStr)
    })
  })
}

// changed 页面处理 post
function changedHtmlPost(url, request, response) {
  let dataStr = ''
  request.on('data', (data) => {
    dataStr += data
  })
  request.on('end', () => {
    let dataObj = queryString.parse(dataStr)

    linkdb.changedData(url.searchParams.get('id'), dataObj, (results) => {
      if (results.changedRows >= 0) {
        response.setHeader("content-type", "text/html;charset=utf-8")
        response.end(`
          <script>
            alert('修改成功');
            window.location.href='/'
          </script>`)
      }
    })
  })
}

// add 页面处理 get
function addHtmlGet(response) {
  fs.readFile("./add/add.html", (error, data) => {
    if (error) throw error;

    response.setHeader('content-type', 'text/html;charset=utf-8')
    response.end(data)
  })
}

// add 页面处理 post
function addHtmlPost(request, response) {
  let datas = ''
  request.on('data', (data) => {
    datas += data
  })
  request.on('end', () => {
    datas = queryString.parse(datas)
    linkdb.addData(datas, (results) => {
      if (results.affectedRows >= 1) {
        response.setHeader("content-type", "text/html;charset=utf-8")
        response.end(`
          <script>
            alert('添加成功')
            location.href = '/'
          </script>`)
      }
    })
  })
}

// delete 操作处理
function deleteHtml(url, response) {
  linkdb.deleteData(url.searchParams.get('id'), (results) => {
    if (results.affectedRows >= 1) {
      // response.setHeader("content-type", "text/html;charset=utf-8")
      response.end(`<script>location.href='/'</script>`)
    }
  })
}

module.exports = {
  indexHtml,
  otherHtml,
  personalHtml,
  changedHtmlGet,
  changedHtmlPost,
  addHtmlGet,
  addHtmlPost,
  deleteHtml
}