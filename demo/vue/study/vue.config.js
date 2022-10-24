const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 开启代理服务器
  // devServer: {
  //   proxy: 'http://127.0.0.1:8000'
  // }
  // 开启代理服务器(二)
  // devServer: {
  //   proxy: {
  //     '/api': { // 请求前缀, 当前缀有 '/api' 时, 就启用代理
  //       target: 'http://localhost:8000',
  //       pathRewrite: { '^/api': '' }, // 路径重写, 用来清掉请求前缀
  //       ws: true, // 用于支持 websocket
  //       changeOrigin: false // 开启
  //     }
  //   }
  // }
})