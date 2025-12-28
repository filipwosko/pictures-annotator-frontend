const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8081, // frontend zawsze na 8081
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // backend
        changeOrigin: true,
        secure: false
      }
    }
  }
})
