<template>
  <div class="hello" id="ImageContainer">
    <p style="font-family: 'font84'">点字朗润体</p>
  </div>
</template>

<script>
import PSD from "psd.js";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      fontArr: [],
    };
  },
  mounted() {
    // const self = this;
    // PSD.fromURL("static/123.psd").then(function(psd) {
    //   const psdFontArr = psd.tree().export().children;
    //   self.setName(psdFontArr);
    //   self.fontArr = [...new Set(self.fontArr)];
    //   console.log(self.fontArr);
    //   // document.getElementById("ImageContainer").appendChild(psd.image.toPng());
    // });
    const data = {
      pageNum: 0,
      pageSize: 15,
      OrderTag: 0,
      SearchKey: "",
    };

    this.$axios({
      method: "post",
      url: "/FontDistributionManagement/api/FontSearch/GetFontSearchItem",
      headers: {
        "Content-Type": "application/json",
      },
      data,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    this.$axios({
      method: "post",
      url: "/fonttagmanagement/fonttagmanagerhandler.ashx?opera=GetFontTagList",
    })
      .then((res) => {
        console.log(res.data);
        this.loadFonts()
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    async loadFonts() {
      console.log('https://resource.hellofont.cn/fonts/name/8679.ttf');
      const font = new FontFace(
        "font84",
        "url('https://resource.hellofont.cn/fonts/name/8679.ttf')"
      );
      await font.load();
      document.fonts.add(font);
      document.body.classList.add("fonts-loaded");
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
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
  font-family: 'font84';
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
