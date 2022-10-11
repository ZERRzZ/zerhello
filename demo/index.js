const express = require('express')

const app = express()

app.use('', express.static(__dirname))

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(80, () => console.log('http://localhost'))