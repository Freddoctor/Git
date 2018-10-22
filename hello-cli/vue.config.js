module.exports = {
  devServer: {
    port:8888,
    proxy: {
      '/api': {
        target: 'http://192.168.30.175',
        ws: true,
        changeOrigin: true
      },
      '/foo': {
        target: 'http://127.0.0.1'
      }
    }
  }
}
