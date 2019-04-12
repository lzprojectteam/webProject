<style scoped>
@import "~@/styles/css/main-list.css";
@import "../../styles/css/report.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline
                 ref="searchForm"
                 v-bind:class="{ hidden: hiddenOther }">
          <el-form-item v-for="item in formData.componentData"
                        :label="item.display"
                        :key="item.name"
                        v-show="!item.isFinal">
            <el-select v-if="item.type==='select'"
                       v-model="searchData[item.name]"
                       @change="selectChange($event,item)"
                       clearable>
              <el-option v-for="o in item.data"
                         :key="o.value"
                         :label="o.label"
                         :value="o.value">
              </el-option>
            </el-select>
            <organization-form v-else-if="item.type==='organization'"
                               :root="userOrgId"
                               @onchange="organizationOnchange" />
            <el-date-picker v-else-if="item.type==='annual'"
                            value-format="yyyy"
                            v-model="searchData[item.name]"
                            type="year"
                            :placeholder="$t('base.pleaseSelect')"
                            @change="dateChange($event,item)">
            </el-date-picker>
            <el-date-picker v-else-if="item.type==='date'"
                            v-model="searchData[item.name]"
                            type="date"
                            value-format="yyyy-MM-dd"
                            :placeholder="$t('base.pleaseSelect')"
                            @change="dateChange($event,item)">
            </el-date-picker>
            <type-variety-grade-select v-else-if="item.type==='tobaccoType'"
                                       :varietyName.sync=" searchData.varietyName"
                                       :varietyId.sync="searchData.varietyId"
                                       :typeId.sync="searchData.typeId"
                                       :typeName.sync="searchData.typeName"
                                       :gradeId.sync="searchData.gradeId"
                                       :gradeName.sync="searchData.gradeName"
                                       :gradeCode.sync="searchData.gradeCode"
                                       style="width:100%;" />
            <el-input v-bind:placeholder="$t('base.ipKeywords')"
                      v-model="searchData[item.name]"
                      v-else-if="item.type==='text'"
                      @change="inputChange(item)" />
            <span v-else>未知控件</span>
          </el-form-item>
        </el-form>
      </div>
      <div class='toolButton'
           style="min-width: 250px">
       <el-button-group>
          <el-button plain type='primary'
                     @click='onExpandClick'
                     v-show="showFilter">{{ $t('base.buttonFilter') }}</el-button>
          <el-button plain type='primary'
                     @click='downloadXlsFile'
                     v-show="isExport">导出</el-button>
          <el-button plain type='primary'
                     @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }}</el-button>
        </el-button-group>
      </div>
    </div>
    <main class='contentPanel'
          id="excelDefaults">
      <div v-html="tableData"
           class="table1"
           style="overflow:auto;height:100%"></div>
      <div class="outerBox">
        <table class="t1 dataTable"
               align="center">
          <tbody></tbody>
        </table>
      </div>
    </main>
  </div>
</template>
<script>
const OrganizationForm = () => import("@/components/Organization");
const typeVarietyGradeSelect = () =>
  import("@/components/Tobacco/typeVarietyGradeSelect");
const path = require("path");

import statisticApi from "../../api/online/apiStatistic";
import statisticParamApi from "../../api/online/apiStatisticParam";

export default {
  data() {
    return {
      excelTitle: "",
      tableData:
        '<div style="text-align:center;color: #606266;font-size: 100px;border-bottom: 1px solid #ebeef5;height:100%;line-height:7">暂无数据</div>',
      loading: false,
      showFilter: false,
      isExport: false,
      hiddenOther: true,
      expandIcon: "el-icon-arrow-left",
      childForm: {
        addForm: false,
        editForm: false,
        viewForm: false,
        isEdit: false,
        excelForm: false
      },
      url: "", //存放解析后的文件路径
      searchData: {},
      templateData: {},
      formData: {
        componentData: [
          //用于存放当前搜索条件组件数据
        ],
        pagination: {
          //用于分页的变量
          currentPage: 1,
          pageSize: 10,
          total: 0,
          keyword: "",
          pageSizeOpts: [10, 15, 20, 25, 30]
        },
        sellList: []
      },
      sumColumnNames: [
        { column: "weight", unit: "公斤" },
        { column: "money", unit: " 元" }
      ]
    };
  },
  computed: {
    userOrgId() {
      if (this.$store.state.user.organization === undefined) {
        return undefined;
      } else {
        return this.$store.state.user.organization.organizationId;
      }
    }
  },
  created() {
    this.initComponent();
  },
  watch: {
    $route(to, from) {
      console.log(to);
      if (to.meta.file.indexOf("showReportList") !== -1) {
        this.initComponent();
      }
    }
  },
  mounted() {
    let contentPanel = document.getElementsByClassName("contentPanel")[0];
    //内容区域滚动监听
    contentPanel.addEventListener("scroll", this.handleScroll);
  },
  components: {
    OrganizationForm,
    typeVarietyGradeSelect
  },
  methods: {
    dateChange(value, data) {
      console.info(data.templateName);
      this.templateData[data.templateName] = value;
    },
    selectChange(value, data) {
      if (!value) {
        this.templateData[data.templateName] = "";
      } else {
        let item = data.data.find(function(item) {
          return item.value === value;
        });
        this.templateData[data.templateName] = item.label;
      }
    },
    //初始化搜索组件
    initComponent() {
      Promise.all([
        statisticApi.getAll({
          size: 1,
          page: 0,
          search: "serial:EQ:{serial};".format({
            serial: this.$route.query.serial
          })
        })
      ])
        .then(([response]) => {
          if (response.content.length == 0) {
            this.$notify.error({
              title: "错误",
              message: "请联系管理员确认报表配置"
            });
            this.excelTitle = "";
            this.isExport = false;
            this.formData.componentData = [];
            return;
          }
          this.excelTitle = response.content[0].name;
          this.isExport = response.content[0].export;
          var tempData = [];
          for (var k in response.content[0].parameterList) {
            if (response.content[0].parameterList[k].required) {
              tempData.push(response.content[0].parameterList[k]);
            }
          }
          //报表参数列表根据position字段排序
          tempData.sort(function(a, b) {
            return a.position - b.position;
          });
          //获取下拉框组件，来源为url的存放到下列3个变量中，以便发送请求获取数据
          var promiseList = [];
          var indexList = [];
          var responseList = [];
          try {
            for (var x in tempData) {
              if (tempData[x].type === "select") {
                if (tempData[x].source === "url") {
                  var url = tempData[x].data;
                  promiseList.push(
                    statisticParamApi.getParamData(
                      url.format({
                        organizationId:
                          this.$store.state.user.organization === undefined
                            ? "1151"
                            : this.$store.state.user.organization.organizationId
                      }),
                      {}
                    )
                  );
                  indexList.push(x);
                  responseList.push("response" + x);
                } else {
                  var data = JSON.parse(tempData[x].data);
                  var propsData = JSON.parse(tempData[x].props);
                  if (propsData) {
                    var selectList = [];
                    for (var a in data) {
                      var object = data[a];
                      var selectData = {};
                      for (var b in object) {
                        if (b === propsData.key) {
                          selectData.value = object[b];
                        }
                        if (b === propsData.label) {
                          selectData.label = object[b];
                        }
                      }
                      selectList.push(selectData);
                    }
                    tempData[x].data = selectList;
                  } else {
                    tempData[x].data = data;
                  }
                }
              }
            }
          } catch (error) {
            this.$message({
              type: "info",
              message: this.$t("下拉框参数配置错误，请联系管理员")
            });
          }
          Promise.all(promiseList)
            .then(responseList => {
              for (var x in responseList) {
                var responseData = responseList[x].content;
                var props = tempData[indexList[x]].props;
                //判断props是否为空，若空，则直接将返回值赋值给下拉框数组
                //若不为空，则找到对应属性赋值给下拉框数组
                if (props !== "" && props !== null && props !== undefined) {
                  var selectList = [];
                  for (var y in responseData) {
                    var selectData = {};
                    var propsData = JSON.parse(props);
                    for (var z in responseData[y]) {
                      if (z === propsData.key) {
                        selectData.value = responseData[y][z];
                      }
                      if (z === propsData.label) {
                        selectData.label = responseData[y][z];
                      }
                    }
                    selectList.push(selectData);
                  }
                  tempData[indexList[x]].data = selectList;
                } else {
                  tempData[indexList[x]].data = responseData;
                }
              }
            })
            .catch(error => {
              console.log(error);
            });
          this.formData.componentData = tempData;
          this.handleReportChange();
        })
        .catch(error => {});
    },
    handleReportChange() {
      //这里假设已经选择了报表，实际应该是选择报表后触发
      // 初始化searchData
      this.searchData = {};
      /*
                必须使用this.$set('obj','key','value')的方式让searchData里的属性变成动态的
        */
      this.formData.componentData.forEach(item => {
        if (
          this.searchData[item.name] === undefined ||
          this.searchData[item.name] === null
        ) {
          //判断是否是常量，如果是常量，直接将其赋值
          if (item.isFinal) {
            this.$set(this.searchData, item.name, item.data);
            this.$set(this.templateData, item.templateName, item.data);
          } else {
            //对需要初始化值的字段进行处理(这些字段必须约定好)
            if (item.type === "organization") {
              //组织单位
              this.$set(
                this.searchData,
                item.name,
                this.$store.state.user.organization.organizationId
              ); //脚本命名必须是organizationId
              this.$set(
                this.templateData,
                item.templateName,
                this.$store.state.user.organization.organizationName
              ); //脚本命名必须是organizationName
            } else if (item.type === "annual") {
              //年度组件
              this.$set(
                this.searchData,
                item.name,
                new Date().getFullYear().toString()
              );
              this.$set(
                this.templateData,
                item.templateName,
                new Date().getFullYear().toString()
              );
            } else if (item.type === "date") {
              //日期组件
              this.$set(
                this.searchData,
                item.name,
                this.dateFormat(new Date(), "yyyy-mm-dd")
              );
              this.$set(
                this.templateData,
                item.templateName,
                this.dateFormat(new Date(), "yyyy-mm-dd")
              );
            } else if (item.type === "tobaccoType") {
              //烟叶类型组件
              //遇到烟叶类型，自动创建以下字段，所以配置脚本时字段必须约定好，选择组件时，选一次即可
              this.$set(this.searchData, "typeId", "");
              this.$set(this.searchData, "typeName", "");
              this.$set(this.searchData, "varietyId", "");
              this.$set(this.searchData, "varietyName", "");
              this.$set(this.searchData, "gradeId", "");
              this.$set(this.searchData, "gradeCode", "");
              this.$set(this.searchData, "gradeName", "");
            } else {
              //下拉框
              this.$set(this.searchData, item.name, "");
              this.$set(this.templateData, item.templateName, "");
            }
          }
        }
      });
      //根据搜索框高度判断是否需要显示筛选按钮
      this.hiddenOther = true;
      this.showFilter = true;
    },
    downloadXlsFile() {
      var str = this.excelTitle + ".xls";
      var x = new XMLHttpRequest();
      x.open("GET", this.url, true);
      x.responseType = "blob";
      x.onload = function(e) {
        require("downloadjs")(x.response, str);
      };
      x.send();
    },
    //监听滚动，动态设置表头固定
    handleScroll() {
      this.scrollCount++;
      if (this.scrollCount > 5) {
        //获取1表宽度，使2表表头宽度与其保持一致
        let table1_width = document.querySelector(".table1").offsetWidth;
        let outerBox = document.querySelector(".outerBox");
        outerBox.style.width = table1_width + "px";
        //获取1表的表头，需要对行高进行正确配置
        let contentPanel = document.querySelector(".contentPanel");
        let tableHeads = document.querySelectorAll(".table1 .r2"); //获取表头
        if (tableHeads === null) {
          console.log("没有正确配置表头！");
          return;
        }
        //为表2动态添加1表表头数据
        let table2_tbody = document.querySelector(".dataTable tbody");
        let scrollTop = contentPanel.scrollTop; //滚动掉的高度
        let offsetTop = tableHeads[0].offsetTop;
        //第一次触发滚动创建一个新的表格，用于显示表头
        if (this.firstLoad) {
          //在做动态报表时，选择其他报表要将firstLoad设为true
          let colgroup = document.querySelector(".table1 .t1 colgroup"); //获取设置表格宽度的那部分html
          let colgroup_temp = colgroup.cloneNode(true);
          for (var i = 0, len = tableHeads.length; i < len; i++) {
            let temp = tableHeads[i].cloneNode(true);
            table2_tbody.appendChild(temp);
          }
          document.querySelector(".dataTable").appendChild(colgroup_temp);
          this.firstLoad = false;
        }
        //根据卷动高度判断是否显示2表（表头）
        if (offsetTop < scrollTop) {
          //根据搜索栏高度动态设置表头位置
          let top = document.querySelector(".toolPanel").offsetHeight + 20;
          outerBox.style.top = top + 5 + "px";

          outerBox.style.display = "block";
        } else {
          outerBox.style.display = "none";
        }
        this.scrollCount = 0;
      }
    },
    onExpandClick() {
      this.hiddenOther = !this.hiddenOther;
      if (this.hiddenOther) {
        this.expandIcon = "el-icon-arrow-down";
      } else {
        this.expandIcon = "el-icon-arrow-left";
      }
      setTimeout(() => {
        let top = document.querySelector(".toolPanel").offsetHeight + 20;
        let outerBox = document.querySelector(".outerBox");
        outerBox.style.top = top + 5 + "px";
      }, 100);
    },
    getfilePath(filepath) {
      let isProduction = process.env.NODE_ENV === "production"; //如果是生产环境，前缀要发生变化
      if (filepath === undefined || filepath === "" || filepath === null) {
        return "/404";
      }
      let pps = filepath;
      let root = "";
      root = path.join("/upload", pps);
      let rootPath = Env.baseURL;
      if (isProduction) {
        rootPath = "";
      }
      root = "{rootPath}{path}".format({ path: root, rootPath: rootPath });
      return root;
    },
    organizationOnchange(label, value, values) {
      let param = this.formData.componentData.find(function(item) {
        return item.type === "organization";
      });
      this.searchData[param.name] = value;
      this.templateData[param.templateName] = label;
    },
    handleCurrentChange(val) {
      this.formData.selectRow = val;
    },
    onSearchButtonClick() {
      console.log(this.searchData);
      var param = {};
      param.serial = this.$route.query.serial;
      param.params = this.searchData;
      param.templateParams = this.templateData;
      Promise.all([statisticApi.getReport(param)])
        .then(([response]) => {
          if (response.data.length !== 0) {
            this.tableData = response.html;
            this.url = this.getfilePath(response.url);
          } else {
            this.tableData =
              '<div style="text-align:center;color: #606266;font-size: 100px;border-bottom: 1px solid #ebeef5;height:100%;line-height:5">暂无数据</div>';
          }
          this.$notify({
            title: this.$t("base.hint"),
            message: this.$t("base.loadingDone"),
            duration: 1000,
            position: "bottom-right"
          });
        })
        .catch(error => {
          console.log(error);
        });
    },

    onPageChange(index) {
      if (this.formData.pagination.currentPage !== index) {
        this.formData.pagination.currentPage = index;
        this.onSearchButtonClick();
      }
    },
    onPageSizeChange(size) {
      if (this.formData.pagination.pageSize !== size) {
        this.formData.pagination.pageSize = size;
        this.onSearchButtonClick();
      }
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "warning-row";
      } else {
        return "success-row";
      }
    },
    handleClose(done) {
      this.childForm.addForm = false;
      this.childForm.editForm = false;
      this.onSearchButtonClick();
      done();
    },
    inputChange(item) {
      this.templateData[item.templateName] = this.searchData[item.name];
    }
  }
};
</script>
<style scoped>
.el-input--mini .el-input__inner {
  width: 130px !important;
}
.el-button {
  height: 28px !important;
}

.hidden {
  height: 32px !important;
  overflow: hidden;
}
</style>