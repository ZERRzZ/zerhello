const business = require('./business')

function route(server) {
  server.on('request', (request, response) => {
    // let url = request.url
    // 新版的 URL 模块使用方法
    let url = new URL(request.url, "http://127.0.0.1:8000")
    let method = request.method

    // console.log(url.searchParams.get('id'))

    if (method == 'GET') {
      switch (url.pathname) {
        case '/':
          business.indexHtml(response)
          break
        case '/personal/':
          business.personalHtml(url, response)
          break
        case '/changed/':
          business.changedHtmlGet(url, response)
          break
        case '/add/':
          business.addHtmlGet(response)
          break
        case '/delete/':
          business.deleteHtml(url, response)
          break
        default:
          business.otherHtml(url.pathname, response)
      }
    } else if (method == 'POST') {
      switch (url.pathname) {
        case '/changed/':
          business.changedHtmlPost(url, request, response)
          break
        case '/add/':
          business.addHtmlPost(request, response)
          break
        default:
          console.log("no this service")
      }
    } else {
      response.end(`暂时不支持${method}方法`)
    }
  })
}

// exports.route = route
module.exports = route // 直接导出函数