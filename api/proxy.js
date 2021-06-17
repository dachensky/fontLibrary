const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = (req, res) => {
    // 创建代理对象并转发请求
    createProxyMiddleware({
        target:'http://back3.hellofont.cn',
        changeOrigin: true,
        pathRewrite: {
            '^/api/': ''
        }
    })(req, res);
    createProxyMiddleware({
        target:'https://www.hellofont.cn/',
        changeOrigin: true,
        pathRewrite: {
            '^/hellofont/': ''
        }
    })(req, res);
    createProxyMiddleware({
        target:'https://www.hellowebfont.com/',
        changeOrigin: true,
        pathRewrite: {
            '^/webfontmanagement/': ''
        }
    })(req, res);
}
