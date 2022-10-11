const http = require('http')
const route = require('./route')

const server = http.createServer()

server.listen(8000, () => {
  console.log('请访问 http://127.0.0.1:8000 !')
})

route(server) // 接收到的就是函数