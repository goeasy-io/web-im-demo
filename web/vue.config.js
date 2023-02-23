const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',
  //只有Https才能使用录音
  devServer : {
    https : true,
    port : 9004
  }
})
