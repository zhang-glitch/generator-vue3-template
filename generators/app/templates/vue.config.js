const { defineConfig } = require('@vue/cli-service')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  transpileDependencies: true,
  // vue-router的根路径和这个匹配 ,即使显示设置了BASE_URL值，他也会获取到这里的publicPath作为根路径
  publicPath: process.env.VUE_APP_BASE_API,

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('@components', resolve('./src/components'))
      .set('@utils', resolve('./src/utils'))
      .set('@http', resolve('./src/http'))
      .set('@views', resolve('./src/views'))
  }
})
