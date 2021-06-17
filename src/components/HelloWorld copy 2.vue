<template>
  <div class="fontBox">
    <div class="controlBox">
      <el-input
        type="text"
        placeholder="请输入要预览的文字信息"
        suffix-icon="el-icon-search"
        v-model.lazy="searchText"
        @change="submitSearch"
      ></el-input>
      <i
        :class="['el-icon-menu', 'iconfont', !showType ? 'showFlag' : '']"
        @click="changeShowType"
      ></i>
      <i
        :class="['el-icon-s-data', 'iconfont', showType ? 'showFlag' : '']"
        @click="changeShowType"
      ></i>
    </div>

    <el-row :gutter="30" :key="forceUpdate" v-if="RefreshModel">
      <el-col
        :xs="Response.xs"
        :sm="Response.sm"
        :md="Response.md"
        :lg="Response.lg"
        :xl="Response.xl"
        v-for="(item, index) in FontList"
        :key="item.id"
      >
        <div class="grid-content" v-if="showType">
          <span
            :class="[
              'freeVip',
              item.IsFree ? 'freeBg' : item.IsMemberFont ? 'vipBg' : '',
            ]"
            >{{
              item.IsFree ? "免费使用" : item.IsMemberFont ? "会员免费" : ""
            }}</span
          >
          <img :src="item.PreviewFileUrl" alt="" class="fontImg" srcset="" />
          <div class="fontInfo" :style="{ fontFamily: 'font-name-' + item.id }">
            {{ item.ProductSetName }}
          </div>
          <div class="infoBox">
            <i class="el-icon-view">{{ item.ApplyHot }}</i>
            <i class="el-icon-star-off">{{ item.GroupHot }}</i>
          </div>
        </div>
        <div class="list-content" v-else>
          <div class="fontTitle">
            <div>
              {{ item.ProductSetName }}
              <span
                :class="[
                  item.IsFree ? 'tag-free' : item.IsMemberFont ? 'tag-vip' : '',
                ]"
                >{{
                  item.IsFree ? "免费商用" : item.IsMemberFont ? "会员免费" : ""
                }}</span
              >
            </div>
            <div class="infoBox">
              <i class="el-icon-view"> {{ item.ApplyHot }}</i>
              <i class="el-icon-star-off"> {{ item.GroupHot }}</i>
            </div>
          </div>
          <div class="textInfo" :id="'test' + fontSeachType[index]">
            {{ fontTextList[index] }}
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
let WebFont = require("webfontloader");
export default {
  name: "HelloWorld",
  data() {
    return {
      FontList: [],
      fontTextList: [],
      fontSeachType: [],
      showInput: false,
      RefreshModel: true,
      forceUpdate: 0,
      searchText: "",
      showType: false,
      Response: {
        xs: 24,
        sm: 24,
        md: 24,
        lg: 24,
        xl: 24,
      },
    };
  },
  mounted() {
    const data = {
      pageNum: 0,
      pageSize: 15,
      OrderTag: 0,
      SearchKey: "",
    };

    this.$axios({
      method: "post",
      url: "/api/FontDistributionManagement/api/FontSearch/GetFontSearchItem",
      headers: {
        "Content-Type": "application/json",
      },
      data,
    })
      .then((res) => {
        this.FontList = res.data.FontList;
        res.data.FontList.forEach((item) => {
          this.createFontStyle(item.id);
        });
      })
      .catch((err) => {
        console.log(err);
      });

    this.$axios({
      method: "post",
      url:
        "/api/fonttagmanagement/fonttagmanagerhandler.ashx?opera=GetFontTagList",
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    createFontStyle: function(id) {
      const url = `https://resource.hellofont.cn/fonts/name/${id}`;
      let style = document.createElement("style");
      style.innerText = `@font-face{font-family: "font-name-${id}";src: url("${url}.ttf") format("TrueType"), url("${url}.woff") format("woff");font-display: swap;}`;
      document.getElementsByTagName("head")[0].appendChild(style);
    },
    changeShowType() {
      this.showType = !this.showType;
      if (this.showType) {
        this.Response = {
          xs: 24,
          sm: 12,
          md: 6,
          lg: 4,
          xl: 4,
        };
      } else {
        this.Response = {
          xs: 24,
          sm: 24,
          md: 24,
          lg: 24,
          xl: 24,
        };

        this.FontList.forEach((item) => {
          const url = `https://resource.hellofont.cn/fonts/poem/${item.id}`;
          let style = document.createElement("style");
          style.innerText = `@font-face{font-family: "font-poem-${item.id}";src: url("${url}.ttf") format("TrueType"), url("${url}.woff") format("woff");font-display: swap;}`;
          document.getElementsByTagName("head")[0].appendChild(style);
        });

        this.getFontTextList();
      }
    },
    submitSearch() {
      this.showInput = true;
      let list = [];
      this.FontList.forEach((item) => {
        list.push({ ProductId: item.id, Chas: this.searchText });
      });
      const json = {
        UserGuid: "698F3099-E62F-4C3B-B30A-04FB735069FE",
        List: [...list],
      };
      let formData = new FormData();
      formData.append("opera", "GetWebFontList");
      formData.append("json", JSON.stringify(json));
      this.$axios({
        method: "post",
        url:
          "/webfontmanagement/cloudfontserver/webfontmanagement/webfontmanagerhandler.ashx",
        data: formData,
      }).then((res) => {
        let self = this;
        const time = new Date();
        const year = time.getFullYear();
        const moun =
          time.getMonth() + 1 > 9
            ? time.getMonth() + 1
            : "0" + (time.getMonth() + 1);
        let urls = [];
        res.data.List.forEach((item) => {
          this.fontTextList.push(this.searchText);
          this.fontSeachType.push(item.FontFamily);
          const url = `https://hellowebfonts.oss-cn-beijing.aliyuncs.com/698F3099-E62F-4C3B-B30A-04FB735069FE/${year}${moun}/css/${item.FontFamily}.css`;
          const url2 = `https://hellowebfonts.oss-cn-beijing.aliyuncs.com/698F3099-E62F-4C3B-B30A-04FB735069FE/${year}${moun}/${item.FontFamily}`;
          urls.push(url);

          // let style = document.createElement("style");
          // style.innerText = `@font-face{font-family: "${item.FontFamily}";src: url("${url2}.ttf") format("TrueType"), url("${url2}.woff") format("woff"), url("${url2}.eot") format("embedded-opentype");font-display: swap;}`;
          // document.getElementsByTagName("head")[0].appendChild(style);

          let prefont = new FontFace(`${item.FontFamily}`, `url(${url2}.ttf)`);
          // let fontFaceSet = document.fonts;

          // var prefont = new FontFace(`${item.FontFamily}`, `url(${url2}.ttf)`);
          prefont.load().then(function(loaded_face) {
            document.fonts.add(loaded_face);
            let dom = document.getElementById("test" + item.FontFamily);
            console.log(dom.style);
            dom.style.fontFamily = item.FontFamily;
            console.log(dom)
          });

          // document.fonts
          //   .load("14px '" + item.FontFamily + "'", self.searchText)
          //   .then(() => {
          //     let dom = document.getElementById("test" + item.FontFamily);
          //     dom.style.fontFamily = item.FontFamily;
          //     console.log(dom);
          //   });
        });

        // WebFont.load({
        //   custom: {
        //     families: this.fontSeachType,
        //     urls,
        //   },
        // });

        // document.fonts.ready.then(function() {
        //   console.log("加载完成了");

        //   self.RefreshModel = false;
        //   self.$nextTick(() => {
        //     self.RefreshModel = true;
        //   });
        // });
      });
    },
    async searchFontList(url, id) {
      WebFont = {
        custom: {
          families: [id],
          urls: [url],
        },
      };
      let style = document.createElement("style");
      style.innerText = `@font-face{font-family: "${id}";src: url("${url}.ttf") format("TrueType"), url("${id}.woff") format("woff"), url("${id}.eot") format("embedded-opentype");font-display: swap;}`;
      document.getElementsByTagName("head")[0].appendChild(style);
    },
    getFontTextList() {
      let formData = new FormData();

      this.FontList.forEach((item) => {
        formData.append("fonts[]", item.id);
      });
      this.$axios({
        method: "post",
        url: "/hellofont/api/font/poem/list",
        data: formData,
      }).then((res) => {
        this.fontTextList = res.data;
      });
    },
    setName(datas) {
      datas.forEach((element) => {
        if (element.type === "layer" && element.text) {
          this.fontArr = [...this.fontArr, ...element.text.font.names];
        } else if (element.type === "group") {
          this.setName(element.children);
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.fontBox {
  width: 90vw;
  padding: 20px;
  margin: 0 auto;
  box-sizing: border-box;
}
.controlBox {
  width: 100%;
  display: flex;
  align-items: center;
  .iconfont {
    font-size: 30px;
    cursor: pointer;
    padding: 0 20px;
  }
  .el-icon-s-data {
    transform: rotate(90deg);
  }
  .showFlag {
    opacity: 0.5;
  }
}
.grid-content {
  width: 100%;
  position: relative;
  .freeVip {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 12px;
    color: #fff;
    padding: 4px 6px 2px;
  }
  .freeBg {
    background-color: #6ad18d;
  }
  .vipBg {
    background-color: #eabc76;
  }
  .fontImg {
    width: 100%;
  }
  .fontInfo {
    width: 100%;
    height: 60px;
    line-height: 60px;
    font-size: 36px;
    overflow: hidden;
    word-break: break-all;
    cursor: pointer;
    padding: 0 10px;
    background: #fff;
  }
  .infoBox {
    width: 100%;
    height: 40px;
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #9b9b9b;
    font-size: 12px;
  }
}
.list-content {
  width: 100%;
  height: 160px;
  background-color: #fff;
  padding: 24px 40px 0 32px;
  .fontTitle {
    color: #aaa;
    font-size: 12px;
    display: flex;
    justify-content: space-between;

    .tag-free {
      padding-left: 10px;
      color: #6ad18d;
      font-weight: 600;
    }
    .tag-vip {
      padding-left: 10px;
      color: #eabc76;
      font-weight: 600;
    }
    .infoBox {
      width: 120px;
      display: inherit;
      justify-content: space-around;
      align-items: center;
    }
  }
  .textInfo {
    width: 90%;
    height: 70%;
    font-size: 64px;
    cursor: pointer;
    margin-top: 10px;
    border: 1px solid red;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
<style lang="scss">
.el-col {
  width: 100%;
  border-radius: 4px;
  overflow-x: hidden;
  padding: 0 30px;
  box-sizing: border-box;
  margin-bottom: 20px;
  cursor: pointer;
  &:hover {
    box-shadow: 10px 10px 5px #888888;
  }
}
</style>
