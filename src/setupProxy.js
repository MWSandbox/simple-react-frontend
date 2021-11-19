const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  if (process.env.NODE_ENV == "development") {
    const API_BASE_PATH=process.env.REACT_APP_API_URL;
    app.use(
      API_BASE_PATH,
      createProxyMiddleware({
        target: 'http://localhost:8080',
        changeOrigin: true,
      })
    );
  }
};