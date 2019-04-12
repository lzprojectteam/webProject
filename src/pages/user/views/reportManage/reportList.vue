<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-button plain type='text'
                     icon="el-icon-d-arrow-left"
                     @click="onBackClick()">{{ $t('base.buttonBack') }}
          </el-button>
        </el-form>
      </div>
      <div class='toolButton'
           style="min-width: 60px">
       <el-button-group>
          <el-button plain type='primary'
                     @click='selectInterface'>导入接口</el-button>
          <el-button plain type='primary'
                     @click='selectModel'>导入模板</el-button>
          <el-button plain type='primary'
                     @click='onSaveButtonClick'>保存</el-button>
        </el-button-group>
      </div>
    </div>
    <main class='contentPanel'>
      <div class="demo-block">
        <el-tabs v-model="activeName"
                 style="padding: 24px;">
          <el-tab-pane label="查询语句"
                       name="1">
            <el-input v-model="formItem.query"
                      type="textarea"
                      :rows="15"
                      @blur="formatSql()" />
            <el-checkbox style=" float: left;"
                         v-model="autoFormat">自动格式化</el-checkbox>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="demo-block">
        <el-tabs v-model="activeName"
                 style="padding: 24px;">
          <el-tab-pane label="参数明细"
                       name="1">
            <el-tooltip class="item"
                        effect="dark"
                        :content="$t('base.buttonAdd')"
                        placement="bottom">
              <!-- <el-button plain icon="el-icon-plus"
                           @click="onDynamicAddClick()"
                           type="text"
                           size="small"
                           :disabled="formItem.id===undefined">{{$t('base.buttonAdd')}}</el-button> -->
            </el-tooltip>
            <el-table highlight-current-row
                      border
                      @current-change="handleCurrentChange"
                      :data="formItem.parameterList"
                      style="width: 100%"
                      :row-class-name="tableRowClassName"
                      stripe>
              <el-table-column type="index">
              </el-table-column>
              <el-table-column prop="name"
                               label="参数名"
                               width="180">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.name"
                            style="width: 100%"
                            v-bind:placeholder="$t('base.pleaseInput')"
                            :disabled="scope.row.required"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="templateName"
                               label="模板参数"
                               width="180">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.templateName"
                             style="width: 100%"
                             clearable>
                    <el-option v-for="(val,key) in formData.templateParamList"
                               :value="key"
                               :label="val"
                               :key="val"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="display"
                               label="显示名"
                               width="180">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.display"
                            style="width: 100%"
                            v-bind:placeholder="$t('base.pleaseInput')"></el-input>
                </template>

              </el-table-column>
              <el-table-column prop="isFinal"
                               label="是否常量"
                               width="120">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.isFinal"
                             style="width: 100%"
                             @change="isFinalChange(scope.row)">
                    <el-option v-for="data in formData.isFinalList"
                               :value="data.value"
                               :label="data.label"
                               :key="data.id"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="type"
                               label="组件"
                               width="180">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.type"
                             style="width: 100%"
                             v-if="!scope.row.isFinal">
                    <el-option v-for="(val,key) in formData.componentList"
                               :value="key"
                               :label="val"
                               :key="val"></el-option>
                  </el-select>
                  <el-select v-model="scope.row.type"
                             style="width: 100%"
                             v-else>
                    <el-option v-for="(val,key) in formData.finalTypeList"
                               :value="key"
                               :label="val"
                               :key="val"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="origin"
                               label="数据来源"
                               width="180">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.source"
                             style="width: 100%">
                    <el-option v-for="(val,key) in formData.originList"
                               :value="key"
                               :label="val"
                               :key="val"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="position"
                               label="排序"
                               width="100">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.position"
                            style="width: 100%"
                            v-bind:placeholder="$t('base.pleaseInput')"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="data"
                               label="来源值配置"
                               show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-input type="text"
                            v-model="scope.row.data"
                            @focus="handleFocus(scope.row)"
                            clearable
                            v-bind:placeholder="$t('base.pleaseInput')" />
                </template>
              </el-table-column>
              <el-table-column fixed="right"
                               :label="$t('base.titleOperation')"
                               width="100">
                <template slot-scope="scope">
                  <el-button plain type="text"
                             size="small"
                             @click="deleteParams(scope.row)"
                             v-if="!scope.row.required">删除</el-button>
                  <el-button plain v-if="scope.row.type==='select' || scope.row.type ==='cascader'"
                             type="text"
                             size="small"
                             @click="addPropsClick(scope.row)">映射</el-button>
                </template>
                <template slot="header">
                  <el-tooltip class="item"
                              effect="dark"
                              :content="$t('base.buttonAdd')"
                              placement="bottom">
                    <el-button plain icon="el-icon-plus"
                               @click="onParamListClick()"
                               type="text"
                               size="small">{{$t('base.buttonAdd')}}</el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </main>
    <template>
      <el-dialog title="数据"
                 :visible.sync="childForm.inputForm"
                 top="10px"
                 :before-close="handleClose">
        <input-form :item.sync=formData.viewSelect
                    :visible.sync="childForm.inputForm"
                    form="inputForm"
                    :type="isUrl" />
      </el-dialog>
      <el-dialog title="选择模板"
                 :visible.sync="childForm.modelForm"
                 top="10px"
                 :before-close="handleClose">
        <el-upload ref="upload"
                   :on-success="uploadSuccess"
                   class="upload-demo"
                   :action="uploadUrl"
                   :headers="header"
                   accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                   multiple
                   :before-upload="beforeUpload"
                   :on-exceed="handleExceed"
                   :auto-upload="false"
                   :limit="1"
                   :on-remove="handleRemove"
                   :before-remove="beforeRemove"
                   :on-change="handleChange"
                   :file-list="fileList">
          <el-button plain slot="trigger"
                     size="small"
                     type="primary"
                     :disabled="canChoose">选取文件</el-button>
          <el-button plain style="margin-left: 10px;"
                     size="small"
                     type="success"
                     @click="submitUpload">上传到服务器</el-button>
          <div slot="tip"
               class="el-upload__tip">请选择一个模板文件</div>
        </el-upload>
      </el-dialog>
      <el-dialog title="映射配置"
                 :visible.sync="childForm.propForm"
                 top="10px"
                 :before-close="handleClose">
        <input-form :item.sync=formData.viewSelect
                    :visible.sync="childForm.propForm"
                    form="propForm" />
      </el-dialog>
      <el-dialog title="选择接口"
                 :visible.sync="childForm.interfaceForm"
                 top="10px"
                 :before-close="closeInterFace">
        <el-form>
          <el-row>
            <el-col :span="10">
              <el-form-item label="接口分类">
                <el-select v-model="searchData.catagory"
                           clearable
                           placeholder="请选择分类"
                           @change="handleCatagoryChange">
                  <el-option v-for="item in formData.catagoryList"
                             :value="item.id"
                             :label="item.name"
                             :key="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="接口配置">
                <el-select clearable
                           v-model='searchData.number'
                           filterable
                           remote
                           reserve-keyword
                           @change="getParamerter"
                           placeholder="请输入关键字进行查询"
                           :remote-method="remoteMethod"
                           :loading="loading">
                  <el-option v-for="item in formData.scriptList"
                             :value="item.id"
                             :label="item.name"
                             :key="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item>
                <el-button plain size="small"
                           type="primary"
                           @click="interFaceSure">确认导入</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
    </template>
  </div>
</template>
<script>
const InputForm = () => import("./reportInputData.vue");
import { getToken } from "@/utils/cookieUtils";
import dynamicSqlApi from "../../api/online/apiDynamicSql";
import dynamicMethodApi from "../../api/online/apiDynamicMethod";
import dynamicParamApi from "../../api/online/apiDynamicParam";
import sqlFormatter from "sql-formatter";
import statisticApi from "../../api/online/apiStatistic";
export default {
  props: ["item"],
  data() {
    return {
      uploadUrl: this.getRootPath(),
      header: {
        Authorization: getToken()
      },
      fileList: [],
      isUrl: false,
      canChoose: false,
      autoFormat: true,
      loading: false,
      expand: false,
      expandIcon: "el-icon-arrow-left",
      activeName: "1",
      childForm: {
        inputForm: false,
        modelForm: false,
        interfaceForm: false,
        propForm: false
      },
      dateoptions: {
        shortcuts: [
          {
            text: this.$t("base.today"),

            onClick: picker => {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: this.$t("base.yesterday"),

            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: this.$t("base.oneWeek"),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      formItem: {
        query: "",
        methodId: "",
        parameterList: [], //配置参数
        templatePath: ""
      },
      tempData: {
        //临时存放导入接口数据
        query: "",
        methodId: "",
        parameterList: [] //配置参数
      },
      propData: {},
      searchData: {
        catagory: "", //存放脚本分类id
        number: "", //存放脚本id
        model: ""
      },
      formData: {
        templateParamList: {},
        scriptList: [], //存放下拉需要的数据
        scriptDataList: [], //存放当前选项所有数据
        catagoryList: [],
        dynamicParamList: [], //参数列表
        pagination: {
          //用于分页的变量
          currentPage: 1,
          pageSize: 10,
          total: 0,
          keyword: "",
          pageSizeOpts: [10, 15, 20, 25, 30]
        },
        componentList: {
          //组件列表
          organization: "组织单位",
          annual: "年度",
          date: "日期",
          select: "下拉框",
          tobaccoType: "烟叶类型-品种-等级",
          cascader: "级联选择器",
          text: "文本框"
        },
        originList: {
          //数据来源
          input: "手动输入",
          url: "接口"
        },
        isFinalList: [
          { id: 1, label: "是", value: true },
          { id: 2, label: "否", value: false }
        ],
        finalTypeList: {
          now: "当天",
          text: "文本"
        }
      }
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
    //获取脚本分类
    Promise.all([
      dynamicSqlApi.getAll({
        size: 500
      })
    ])
      .then(([response]) => {
        this.formData.catagoryList = response.content;
      })
      .catch(error => {});
    if (this.item.templatePath !== "" && this.item.templatePath != null) {
      this.fileList.push({ name: this.item.templatePath, url: "" });
      this.canChoose = true;
    }
    if (this.item.interfaceId !== "" && this.item.interfaceId !== null) {
      Promise.all([
        dynamicMethodApi.getAll({
          size: 10,
          sort: "method,asc",
          search: "id:EQ:{id}".format({
            id: this.item.interfaceId
          })
        })
      ])
        .then(([response]) => {
          let arr = [];
          response.content.forEach(function(item) {
            arr.push({ name: item.title, id: item.id });
          });
          this.loading = false;
          this.formData.scriptList = arr;
          this.formData.scriptDataList = response.content; //存放所有数据
          this.formItem.query = response.content[0].query;
          this.formItem.methodId = response.content[0].methodId;
          this.searchData.catagory = response.content[0].dynamicSqlId;
          this.searchData.number = response.content[0].title;
          this.formItem.templateParams = JSON.parse(this.item.templateParams);
          this.formItem.parameterList = this.item.parameterList;
          this.formItem.templatePath = this.item.templatePath;
          this.formItem.methodId = this.item.interfaceId;

          this.formData.templateParamList = JSON.parse(
            this.item.templateParams
          );
          this.tempData.parameterList = this.item.parameterList;
          this.tempData.methodId = this.item.interfaceId;
          this.tempData.query = response.content[0].query;
        })
        .catch(error => {});
    }
  },
  components: {
    "input-form": InputForm
  },
  methods: {
    deleteParams(data) {
      this.$confirm(
        this.$t("message.deleteConfirm"),
        this.$t("base.titleTip"),
        {
          confirmButtonText: this.$t("base.buttonOk"),
          cancelButtonText: this.$t("base.buttonCancel"),
          type: "warning"
        }
      )
        .then(() => {
          this.removeArray(this.formItem.parameterList, data);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$t("message.cancel")
          });
        });
    },
    removeArray(_arr, _obj) {
      let length = _arr.length;
      for (let i = 0; i < length; i++) {
        if (_arr[i] === _obj) {
          if (i === 0) {
            _arr.shift(); //删除并返回数组的第一个元素
            return _arr;
          } else if (i === length - 1) {
            _arr.pop(); //删除并返回数组的最后一个元素
            return _arr;
          } else {
            _arr.splice(i, 1); //删除下标为i的元素
            return _arr;
          }
        }
      }
    },
    isFinalChange(data) {
      data.type = "";
    },
    compareObjecto(obj1, obj2) {
      if (obj1.length !== obj2.length) {
        return false;
      }
      for (var x in obj1) {
        if (obj1[x] !== obj2[x]) {
          return false;
        }
      }
      return true;
    },
    onParamListClick() {
      if (
        this.formItem.parameterList.length ===
        Object.keys(this.formData.templateParamList).length
      ) {
        this.$message({
          message: "当前模板参数已配置完成，无法新增参数",
          type: "error"
        });
        return;
      }
      let obj = {};
      obj.name = "-";
      obj.display = "-";
      obj.type = "";
      obj.source = "input";
      obj.data = "";
      obj.position = this.formItem.parameterList.length + 1;
      obj.required = false;
      obj.isFinal = true;
      this.formItem.parameterList.push(obj);
    },
    getRootPath() {
      let isProduction = process.env.NODE_ENV === "production";
      let rootPath = process.env.VUE_APP_API_URL;
      if (isProduction) {
        rootPath = "";
      }
      return rootPath + "/zuul/user/online/statistic/upload/template";
    },
    uploadSuccess(response, file, fileList) {
      if (response.code !== 0) {
        this.$notify.error({
          title: "错误",
          message: response.message
        });
        return;
      }
      this.formItem.templatePath = response.data.path;
      this.formData.templateParamList = response.data.templateParams;
      for (var x in this.formItem.parameterList) {
        this.formItem.parameterList[x].templateName = "";
      }
      this.$message({
        message: "上传成功",
        type: "success"
      });
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    beforeUpload(file) {
      var fileName = file.name.substring(file.name.lastIndexOf(".") + 1);
      if (fileName !== "xlsx" && fileName !== "xls") {
        this.$message.warning(`只能上传excel文件`);
        return false;
      }
    },
    formatSql() {
      if (this.autoFormat)
        this.formItem.query = sqlFormatter.format(this.formItem.query);
    },
    onBackClick() {
      this.$emit("update:visible", false);
      this.$emit("refresh");
    },
    addPropsClick(data) {
      this.childForm.propForm = true;
      this.formData.viewSelect = data;
    },
    selectModel() {
      this.childForm.modelForm = true;
    },
    selectInterface() {
      this.childForm.interfaceForm = true;
    },
    handleCatagoryChange() {
      //重置需要提交的数据
      this.tempData.query = "";
      this.tempData.methodId = "";
      this.tempData.parameterList = [];
      //搜索部分数据
      this.searchData.number = "";
      this.formData.scriptList = [];
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    //通过选择方法获取脚本参数
    getParamerter() {
      //重置数据
      this.tempData.parameterList = [];
      //注意：清空搜索选项也会触发change事件，最好判断下非空
      if (this.searchData.number !== "" && this.searchData.number !== null) {
        // 反向查询参数
        this.formData.scriptDataList.forEach(item => {
          if (item.id === this.searchData.number) {
            this.tempData.methodId = item.id;
            this.tempData.query = item.query;
          }
          return;
        });
        //获取脚本参数
        Promise.all([
          dynamicParamApi.getAll({
            size: 500, //暂时简化操作，一般来说，目前还达不到500个的数据返回
            page: 0,
            search: "methodId:EQ:{methodId}".format({
              methodId: this.searchData.number
            })
          })
        ])
          .then(([paramResponse]) => {
            //接收返回的参数数据
            this.formData.dynamicParamList = paramResponse.content;
            let arr = [];
            var index = 1;
            this.formData.dynamicParamList.forEach(item => {
              let obj = {};
              obj.name = item.name;
              obj.display = item.title;
              obj.type = "";
              obj.source = "input";
              obj.data = "";
              obj.position = index;
              obj.required = true;
              obj.isFinal = false;
              index = index + 1;
              arr.push(obj);
            });
            this.tempData.parameterList = arr;
          })
          .catch(error => {});
      }
    },
    // 远程搜索脚本
    remoteMethod(query) {
      if (this.searchData.catagory === "") {
        this.$message({
          message: "请先选择分类",
          type: "error"
        });
        return;
      }
      if (query !== "") {
        this.loading = true;
        Promise.all([
          dynamicMethodApi.getAll({
            size: 10,
            sort: "method,asc",
            contains: "title,method,:{keyword}:true".format({ keyword: query }),
            search: "dynamicSqlId:EQ:{dynamicSqlId}".format({
              dynamicSqlId: this.searchData.catagory
            })
          })
        ])
          .then(([response]) => {
            let arr = [];
            response.content.forEach(function(item) {
              arr.push({ name: item.title, id: item.id });
            });
            this.loading = false;
            this.formData.scriptList = arr;
            this.formData.scriptDataList = response.content; //存放所有数据
          })
          .catch(error => {});
      } else {
        this.formData.scriptList = [];
        this.formData.scriptDataList = [];
        this.loading = false;
      }
    },
    handleFocus(row) {
      // 判断数据来源决定是否需要文本弹出框
      if (row.source === "url") {
        this.isUrl = true;
      } else {
        this.isUrl = false;
      }
      this.formData.viewSelect = row;
      this.childForm.inputForm = true;
    },
    onSaveButtonClick() {
      if (this.formItem.catalog === "") {
        this.$message({
          message: "请选择分类",
          type: "error"
        });
        return;
      } else if (this.formItem.parameterList.length === 0) {
        this.$message({
          message: "参数列表为空,请先配置",
          type: "error"
        });
        return;
      } else if (this.formItem.templatePath === "") {
        this.$message({
          message: "请先上传模板",
          type: "error"
        });
        return;
      }
      //判断模板参数列表是否全部选择好了
      let templateNumber = 0;
      //存放已选择，用于比较后提示哪些是未选择的模板参数
      let templateName = [];
      for (var x in this.formData.templateParamList) {
        for (var y in this.formItem.parameterList) {
          if (x === this.formItem.parameterList[y].templateName) {
            templateNumber++;
            templateName.push(x);
            break;
          }
        }
      }
      let noParams = "";
      //比较未配置参数用于提示
      for (var a in this.formData.templateParamList) {
        let flag = false;
        for (var b in templateName) {
          if (templateName[b] === a) {
            flag = true;
          }
        }
        if (!flag) {
          noParams += a + ",";
        }
      }
      if (
        templateNumber !== Object.keys(this.formData.templateParamList).length
      ) {
        this.$message({
          message:
            "请先配置完所有模板参数(未配置:" +
            noParams.substring(0, noParams.length - 1) +
            ")",
          type: "error"
        });
        return;
      }
      this.formItem.templateParams = JSON.stringify(
        this.formData.templateParamList
      );
      this.formItem.interfaceId = this.formItem.methodId;
      this.formItem.id = this.item.id;
      Promise.all([statisticApi.saveParams(this.formItem)])
        .then(([response]) => {
          this.$message({
            message: this.$t("message.saveAndContinue"),
            type: "info"
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    organizationOnchange(label, value, values) {
      this.searchData.organizationid = value;
      this.searchData.organizationcode = value;
      this.searchData.organizationname = label;
      this.searchData.organizationorder = "0";
    },
    handleCurrentChange(val) {
      this.formData.selectRow = val;
    },
    onPageChange(index) {
      if (this.formData.pagination.currentPage !== index) {
        this.formData.pagination.currentPage = index;
      }
    },
    onPageSizeChange(size) {
      if (this.formData.pagination.pageSize !== size) {
        this.formData.pagination.pageSize = size;
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
      this.childForm.inputForm = false;
      this.childForm.modelForm = false;
      this.childForm.interfaceForm = false;
      this.childForm.propForm = false;
      done();
    },
    closeInterFace(done) {
      this.tempData.methodId = "";
      this.tempData.query = "";
      this.tempData.parameterList = [];
      this.searchData.catagory = "";
      this.searchData.number = "";
      this.childForm.interfaceForm = false;
      done();
    },
    interFaceSure() {
      this.formItem.methodId = this.tempData.methodId;
      this.formItem.query = this.tempData.query;
      this.formItem.parameterList = this.tempData.parameterList;
      this.childForm.interfaceForm = false;
    },
    handleRemove(file, fileList) {
      this.canChoose = false;
    },
    handleChange(file, fileList) {
      if (fileList.length > 0) {
        this.canChoose = true;
      }
    },
    beforeRemove(file, fileList) {
      this.$confirm(
        this.$t("删除后重新上传模板将会清空当前配置的模板参数，是否继续"),
        this.$t("base.titleTip"),
        {
          confirmButtonText: this.$t("base.buttonOk"),
          cancelButtonText: this.$t("base.buttonCancel"),
          type: "warning"
        }
      )
        .then(() => {
          this.removeFile(file, fileList);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$t("message.cancel")
          });
        });
      return false;
    },
    removeFile(file, fileList) {
      this.fileList = [];
      this.formItem.templatePath = "";
      let removeList = [];
      for (var x in this.formItem.parameterList) {
        this.formItem.parameterList[x].templateName = "";
        if (!this.formItem.parameterList[x].required) {
          removeList.push(this.formItem.parameterList[x]);
        }
      }
      for (var y in removeList) {
        this.removeArray(this.formItem.parameterList, removeList[y]);
      }
      this.canChoose = false;
      this.formData.templateParamList = [];
    }
  }
};
</script>
<style scoped>
.el-input--mini .el-input__inner {
  width: 130px !important;
}
.demo-block {
  border: 1px solid #ebebeb;
  border-radius: 3px;
  transition: 0.2s;
  margin: 5px;
}
</style>
