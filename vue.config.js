const target = "http://back3.hellofont.cn";
module.exports = {
  devServer: {
    // https: true,
    proxy: {
      "^/api": {
        target, //API服务器的地址
        ws: true, //代理websockets
        changeOrigin: true, // 虚拟的站点需要更管origin
        pathRewrite: {
          //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
          "/api": "",
        },
        headers: {
          referer: "https://www.hellofont.cn/",
          origin: "https://www.hellofont.cn/",
        },
      },
      "^/hellofont": {
        target: "https://www.hellofont.cn/",
        ws: true, //代理websockets
        changeOrigin: true, // 虚拟的站点需要更管origin
        pathRewrite: {
          //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
          "/hellofont": "",
        },
        headers: {
          referer: "https://www.hellofont.cn",
          origin: "https://www.hellofont.cn/font-list",
        },
      },
      "^/webfontmanagement":{
        target: "https://www.hellowebfont.com/",
        ws: true, //代理websockets
        changeOrigin: true, // 虚拟的站点需要更管origin
        pathRewrite: {
          //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
          "/webfontmanagement": "",
        },
        headers: {
          referer: "https://www.hellofont.cn",
          origin: "https://www.hellofont.cn/",
        },
      }
    },
  },
};
