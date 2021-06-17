// 该服务为 vercel serve跨域处理
const {
    createProxyMiddleware
} = require('http-proxy-middleware')

module.exports = (req, res) => {
    if (req.url.startsWith('/api')) {
        // 创建代理对象并转发请求
        createProxyMiddleware({
            target:'https://back3.hellofont.cn',
            ws: true,
            changeOrigin: true,
            pathRewrite: {
                '^/api': '/'
            },
            headers: {
                referer: "https://www.hellofont.cn/",
                origin: "https://www.hellofont.cn/",
            },
        })(req, res)
    }else if (req.url.startsWith('/hellofont')){
        createProxyMiddleware({
            target:'https://www.hellofont.cn/',
            ws: true,
            changeOrigin: true,
            pathRewrite: {
                '^/hellofont': '/'
            },
            headers: {
                referer: "https://www.hellofont.cn",
                origin: "https://www.hellofont.cn/font-list",
            },
        })(req, res)
    }else if(req.url.startsWith('/webfontmanagement')){
        createProxyMiddleware({
            target:'https://www.hellowebfont.com/',
            ws: true, //代理websockets
            changeOrigin: true,
            pathRewrite: {
                '^/webfontmanagement': '/'
            },
            headers: {
                referer: "https://www.hellofont.cn",
                origin: "https://www.hellofont.cn/",
            },
        })(req, res)
    }

}
