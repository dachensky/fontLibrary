// 该服务为 vercel serve跨域处理
const {
    createProxyMiddleware
} = require('http-proxy-middleware')

module.exports = (req, res) => {
    if (req.url.startsWith('/api')) {
        // 创建代理对象并转发请求
        createProxyMiddleware({
            target:'https://back3.hellofont.cn',
            changeOrigin: true,
            pathRewrite: {
                // 通过路径重写，去除请求路径中的 `/backend`
                // 例如 /backend/user/login 将被转发到 http://backend-api.com/user/login
                '^/api': '/'
            },
            headers: {
                referer: "https://www.hellofont.cn/",
                origin: "https://www.hellofont.cn/",
            },
        })(req, res)
    }

    if (req.url.startsWith('/hellofont')){
        createProxyMiddleware({
            target:'https://www.hellofont.cn/',
            changeOrigin: true,
            pathRewrite: {
                // 通过路径重写，去除请求路径中的 `/backend`
                // 例如 /backend/user/login 将被转发到 http://backend-api.com/user/login
                '^/hellofont': '/'
            },
            headers: {
                referer: "https://www.hellofont.cn",
                origin: "https://www.hellofont.cn/font-list",
            },
        })(req, res)
    }

    if (req.url.startsWith('/webfontmanagement')){
        createProxyMiddleware({
            target:'https://www.hellowebfont.com/',
            changeOrigin: true,
            pathRewrite: {
                // 通过路径重写，去除请求路径中的 `/backend`
                // 例如 /backend/user/login 将被转发到 http://backend-api.com/user/login
                '^/webfontmanagement': '/'
            },
            headers: {
                referer: "https://www.hellofont.cn",
                origin: "https://www.hellofont.cn/",
            },
        })(req, res)
    }

}
