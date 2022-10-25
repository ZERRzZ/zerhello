const http = require('http')

const server = http.createServer()

server.on('request', (req, res) => {
  console.log(req.method)
  console.log(req.url)
  res.end('successfull!')

})

server.listen(8000, () => {
  console.log('请访问 http://localhost:8000 !')
})