<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel '
       style="height:100%">
    <el-row>
      <el-col :span="11">
        <div style="text-align: center;">
          <el-row :gutter="20">
            <el-col :span="11"
                    v-for="item  in numberList"
                    :key="item.title">
              <number :title="item.title"
                      :data="item.data"
                      :describe="item.describe" />
            </el-col>
          </el-row>
        </div>

      </el-col>
      <el-col :span="11">
        <v-chart :options="seedOption"
                 style="padding:5px" />
      </el-col>
      <el-col :span="11">
        <v-chart :options="loadYZ()"
                 style="padding:5px" />
      </el-col>
      <el-col :span="11">
        <v-chart :options="plantPointOption"
                 style="padding:5px" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import API from "@/api/base/apiUser.js";
import { setSystemId, getSystemId } from "@/utils/cookieUtils";
import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";

export default {
  name: "dashboard-editor",
  components: {
    number: () => import("../../../components/numberCount.vue")
  },
  data() {
    return {
      plantPointOption: this.loadPlantPoint(),
      seedOption: this.loadYanZhong(),
      numberList: this.loadNumberList()
    };
  },
  created() {},
  computed: {
    ...mapGetters(["name", "avatar", "roles"])
  },
  methods: {
    loadPlantPoint() {
      return {
        title: {
          text: "育苗点分布情况",
          subtext: "虚构数据",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          // orient: 'vertical',
          // top: 'middle',
          bottom: 10,
          left: "center",
          data: [
            "会理",
            "会东",
            "宁南",
            "普格",
            "德昌",
            "西昌",
            "盐源",
            "冕宁",
            "越西",
            "喜德"
          ]
        },
        series: [
          {
            type: "pie",
            radius: "65%",
            center: ["50%", "50%"],
            selectedMode: "single",
            data: [
              {
                value: 1548,
                name: "会理"
              },
              { value: 535, name: "会东" },
              { value: 510, name: "宁南" },
              { value: 634, name: "普格" },
              { value: 735, name: "德昌" },
              { value: 735, name: "西昌" },
              { value: 735, name: "盐源" },
              { value: 735, name: "冕宁" },
              { value: 735, name: "越西" },
              { value: 735, name: "喜德" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
    },
    loadYanZhong() {
      return {
        title: {
          text: "烟种发放进度",
          subtext: "数据来自测试"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: ["发放数量", "应发数量"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: "category",
          data: ["会东", "会理", "宁南", "普格", "盐源", "西昌"]
        },
        series: [
          {
            name: "已发数量",
            type: "bar",
            data: [18203, 23489, 29034, 104970, 131744, 630230]
          },
          {
            name: "应发数量",
            type: "bar",
            data: [19325, 23438, 31000, 121594, 134141, 681807]
          }
        ]
      };
    },
    loadYZ() {
      return {
        title: {
          text: "烟种发放情况",
          subtext: "虚构数据",
          left: "center"
        },
        xAxis: {
          type: "category",
          data: ["会东", "会理", "宁南", "普格", "盐源", "西昌", "越西"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar"
          }
        ]
      };
    },
    loadNumberList() {
      return [
        { title: "种植摸底完成率", data: "100.00%", describe: "来自2.0系统" },
        { title: "烟种发放数量", data: "100万盘", describe: "来自移动终端" },
        { title: "育苗烟点数量", data: "5000个", describe: "截止2019年2月" },
        { title: "苗发放数量", data: "1000盘", describe: "截止2019年2月21日" }
      ];
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.emptyGif {
  display: block;
  width: 45%;
  margin: 0 auto;
}

.dashboard-editor-container {
  background-color: #e3e3e3;
  min-height: 100vh;
  padding: 50px 60px 0px;
  .pan-info-roles {
    font-size: 12px;
    font-weight: 700;
    color: #333;
    display: block;
  }
  .info-container {
    position: relative;
    margin-left: 190px;
    height: 150px;
    line-height: 200px;
    .display_name {
      font-size: 48px;
      line-height: 48px;
      color: #212121;
      position: absolute;
      top: 25px;
    }
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
    margin: 0 auto;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }
}
</style>
