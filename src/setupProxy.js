const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    // Configure the proxy to forward requests to your backend
    app.use('/api', createProxyMiddleware({
        target: 'http://localhost:8080', // Your backend URL
        changeOrigin: true,
    }));
};
