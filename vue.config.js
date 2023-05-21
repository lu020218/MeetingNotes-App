const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: false,
  configureWebpack: {
    externals: {
      'electron': 'require("electron")'
    },
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        "appId": "com.luhaishan.meetingnotes",
          "copyright":"Lu Haishan",
          "productName":"会议笔记",
          "win": {
            "target": [
              "portable"
            ]
          }
      }
    }
  }
})
