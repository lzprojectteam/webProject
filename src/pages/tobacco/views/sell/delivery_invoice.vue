<template>
  <div class="block">
    <p v-if="formData.carouselData.length === 0">暂无烟框信息！</p>
    <div v-else
         class="main"
         v-for="item in formData.count"
         :key="item">
      <span class="demonstration">第{{item}}组烟框图(共{{formData.count}}组)</span>
      <el-carousel :autoplay='true'
                   height="200px"
                   style="text-align: center;">
        <el-carousel-item v-for="item2 in formData.carouselData[item-1]"
                          :key="item2.uid">
          <div class="img-content">
            <div class="left">
              <img :src="getImgPath(item2.weightPicture)"
                   alt="图片走丢了..."
                   @click="showImg(item2.farmerName,item2.arranged,item2.weightPicture)">
            </div>
            <div class="right">
              <p>烟农:{{item2.farmerName}}</p>
              <p>第{{item2.arranged}}框</p>
              <p>定级员:{{formData.djy}}</p>
              <p>等级:{{item2.gradeName}}</p>
              <p>重量:{{item2.weight}}公斤</p>
              <p>时间:{{item2.date.slice(0,10)}}</p>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-dialog :title="formData.title"
               :visible.sync="formData.showImg"
               fullscreen
               append-to-body
               custom-class="tobaccoImg">
      <img :src="getImgPath(formData.imgSrc)"
           alt="图片走丢了..."
           class="showImg"
           @click="hiddeImg">
    </el-dialog>
  </div>
</template>
<script>
const path = require("path");

import userApi from "@/api/base/apiUser";

import invoiceApi from "../../api/tsell/api_invoice";

export default {
  props: ["item"],
  data() {
    return {
      formItem: {},
      formData: {
        carouselData: [],
        size: 5, //设置每组轮播图的数量,
        count: 1, //记录一共多少组轮播图
        showImg: false,
        djy: "未指定",
        imgSrc: "",
        title: ""
      }
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      if (!(this.item === "" || this.item === null)) {
        this.formData.carouselData = [];
        this.formData.count = 1;
        this.formItem = JSON.parse(JSON.stringify(this.item));
        this.getDJY(
          this.formItem.author,
          this.formItem.organization.organizationId
        );
        Promise.all([
          invoiceApi.getAll({
            size: 500,
            sort: "arranged",
            search: "delivery:EQ:{uid}".format({
              uid: this.formItem.uid
            })
          })
        ])
          .then(([response]) => {
            //计算需要几组轮播图
            this.formData.count = Math.ceil(
              response.content.length / this.formData.size
            );
            //构建每组轮播图的数据
            for (let i = 0, len = this.formData.count; i < len; i++) {
              let arr = [];
              if (i === len - 1) {
                arr = response.content.slice(i * this.formData.size);
              } else {
                arr = response.content.slice(
                  i * this.formData.size,
                  (i + 1) * this.formData.size
                );
              }
              this.formData.carouselData.push(arr);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    showImg(name, number, imgSrc) {
      this.formData.showImg = true;
      this.formData.title = name + "(第" + number + "框)";
      this.formData.imgSrc = imgSrc;
    },
    hiddeImg() {
      this.formData.showImg = false;
    },
    //获取图片路径
    getImgPath(src) {
      let isProduction = process.env.NODE_ENV === "production"; //如果是生产环境，前缀要发生变化
      this.formData.photoList = [];
      if (src === undefined || src === "" || src === null) {
        return "http://bpic.588ku.com/element_origin_min_pic/18/06/10/217da78e9f80484b354afea9bb8a6538.jpg";
      }
      let pps = src;
      let root = "";
      root = path.join("/upload", pps);
      let rootPath = process.env.VUE_APP_API_URL;
      if (isProduction) {
        rootPath = "";
      }
      root = "{rootPath}{path}".format({ path: root, rootPath: rootPath });
      return root;
    },
    formReset(name) {
      this.$refs[name].resetFields();
    },
    //获取定级员
    getDJY(query, orgId) {
      if (query !== "") {
        var search = "(loginName:LIKE:{kw}:or;)";
        Promise.all([
          userApi.findAllByOrgId(orgId, {
            size: 10,
            page: 0,
            sort: "name,asc",
            search: search.format({
              kw: query
            })
          })
        ])
          .then(([response]) => {
            if (response.content.length > 0) {
              this.formData.djy = response.content[0].name;
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        return "未指定";
      }
    }
  },
  watch: {
    item(cur, old) {
      this.load();
    }
  }
};
</script>
<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  margin: 0;
}

.demonstration {
  text-align: left;
  font-weight: bold;
}

.main {
  width: 500px;
  display: inline-block;
  margin-bottom: 40px;
}

.block .left {
  float: left;
  width: 325px;
}

.img-content {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.block .left img {
  display: inline-block;
  width: 100%;
  height: 200px;
  line-height: 200px;
  vertical-align: middle;
  cursor: -webkit-zoom-in;
  cursor: zoom-in;
}

.block .right {
  float: left;
  background-color: white;
}

.block .el-carousel {
  border: 1px solid gray;
}

.block .right p {
  padding-left: 15px;
  line-height: 25px;
  font-weight: bold;
  text-align: left !important;
}

.showImg {
  width: 70%;
  cursor: -webkit-zoom-out;
  cursor: zoom-out;
}

.tobaccoImg .el-dialog__header {
  text-align: center;
}

.tobaccoImg .el-dialog__body {
  text-align: center;
}
</style>
