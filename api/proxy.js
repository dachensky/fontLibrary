const {createProxyMiddleware} = require('http-proxy-middleware')
const express = require('express')

const app = express();

//设置跨域访问
app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");

    if (req.method.toLowerCase() == "options") res.send(200);
    //让options尝试请求快速结束
    else next();
});


module.exports = function (app){
    app.use(
        "/api",
        createProxyMiddleware({
            target: "https://back3.hellofont.cn",
            changeOrigin: true,
            pathRewrite: {
                "^/api": "", // rewrite path
            },
        })
    );
    app.use(
        "/hellofont",
        createProxyMiddleware({
            target: "https://www.hellofont.cn/",
            changeOrigin: true,
            pathRewrite: {
                "^/hellofont": "", // rewrite path
            },
        })
    );
    app.use(
        "/webfontmanagement",
        createProxyMiddleware({
            target: "https://www.hellowebfont.com/",
            changeOrigin: true,
            pathRewrite: {
                "^/webfontmanagement": "", // rewrite path
            },
        })
    );
}
