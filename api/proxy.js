const {createProxyMiddleware} = require('http-proxy-middleware')



module.exports = function (app){
    app.use(createProxyMiddleware('/api', {target: "https://back3.hellofont.cn"}));
    app.use(createProxyMiddleware('/hellofont', {target: "https://www.hellofont.cn/"}));
    app.use(createProxyMiddleware('/webfontmanagement', {target: "https://www.hellowebfont.com/"}));
}
