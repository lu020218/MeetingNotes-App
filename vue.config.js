const { defineConfig } = require('@vue/cli-service')
const path = require("path")

function resolve(dir) {
	return path.join(__dirname, dir)
}

module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: false,
  configureWebpack: {
    entry: './src/renderer/main.js',
    resolve: {
      extensions: ['.js', '.vue']
    },
    externals: {
      'electron': 'require("electron")'
    },
  },
  pluginOptions: {
    electronBuilder: {
      mainProcessFile: './src/main/main.js',
      nodeIntegration: true,
      externals: ['electron-edge-js'],
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
