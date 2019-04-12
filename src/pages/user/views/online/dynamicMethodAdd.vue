<template>
  <div>
    <el-form :model="formItem"
             :rules="ruleValidate"
             ref="basicForm"
             style="margin-top: 10px;"
             label-width="80px"
             v-if="activeIndex===0">
      <el-form-item :label="$t('dynamicMethod.catalog')"
                    prop="dynamicSqlId">
        <el-select v-model="formItem.dynamicSqlId"
                   :placeholder="$t('base.pleaseSelect')"
                   filterable
                   style="width:100%">
          <el-option v-for="item in dynamicSqlList"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id">
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.title }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('dynamicMethod.method')"
                    prop="method"
                    style="margin-top: 16px">
        <el-input v-bind:placeholder="$t('base.pleaseInput')"
                  v-model="formItem.method" />
      </el-form-item>
      <el-form-item :label="$t('dynamicMethod.title')"
                    style="margin-top: 16px">
        <el-input v-bind:placeholder="$t('base.pleaseInput')"
                  v-model="formItem.title" />
      </el-form-item>
      <el-form-item :label="$t('dynamicMethod.privilege')"
                    style="margin-top: 16px">
        <el-input v-bind:placeholder="$t('base.pleaseInput')"
                  v-model="formItem.privilege" />
      </el-form-item>
      <el-form-item :label="$t('dynamicMethod.version')"
                    style="margin-top: 16px">
        <el-input v-bind:placeholder="$t('base.pleaseInput')"
                  v-model="formItem.versions" />
      </el-form-item>
      <el-form-item :label="$t('dynamicMethod.operation')"
                    style="margin-top: 16px">
        <el-select v-model="formItem.operation"
                   style="width:100%">
          <el-option v-for="(item ) in operationArray"
                     :value="item.value"
                     :key="item.value"
                     :label="item.label" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('dynamicMethod.status')"
                    style="margin-top: 16px">
        <el-select v-model="formItem.status"
                   style="width:100%">
          <el-option v-for="(item ) in statusList"
                     :value="item.value"
                     :key="item.value"
                     :label="item.label" />
        </el-select>
      </el-form-item>
      <el-form-item style="margin-top: 16px;text-align: right;">
        <el-button plain @click="nextStep('basicForm',1)">{{$t('base.buttonNextStep')}}</el-button>
      </el-form-item>
    </el-form>

    <el-form :model="formItem"
             :rules="ruleValidate"
             ref="queryForm"
             style="margin-top: 10px"
             v-if="activeIndex===1">
      <el-form-item :label="$t('dynamicMethod.query')"
                    prop="query">
        <el-input type="textarea"
                  :rows="22"
                  :placeholder="$t('base.pleaseInput')"
                  v-model="formItem.query"
                  style="width:98%"
                  @blur="formatSql()" />
      </el-form-item>
      <el-form-item style="margin-top: 16px;text-align: right;">
        <el-checkbox style=" float: left;"
                     v-model="autoFormat">自动格式化</el-checkbox>
        <el-button plain @click="activeIndex--">{{$t('base.buttonPreStep')}}</el-button>
        <el-button plain @click="nextStep('queryForm',2)">{{$t('base.buttonNextStep')}}</el-button>
      </el-form-item>
    </el-form>
    <el-form :model="formItem"
             :rules="ruleValidate"
             ref="paramForm"
             style="margin-top: 10px"
             v-if="activeIndex===2">
      <el-form-item label="查询参数">
        <el-table highlight-current-row
                  border
                  :data="dynamicParamList"
                  style="width: 100%;minHeight:400px;minWidth:600px"
                  @current-change="onRowSelectChanged">
          <el-table-column type="index">
          </el-table-column>
          <el-table-column prop="name"
                           :label="this.$t('dynamicParam.name')">
            <template slot-scope="scope">
              <el-select v-if="scope.row._edit"
                         v-model="scope.row.name"
                         clearable
                         filterable
                         allow-create>
                <el-option v-for="item in  paramList"
                           :key="item"
                           :label="item"
                           :value="item" />
              </el-select>
              <span v-else>{{scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="title"
                           :label="this.$t('dynamicParam.title')">
            <template slot-scope="scope">
              <el-input v-if="scope.row._edit"
                        v-model="scope.row.title"
                        clearable></el-input>
              <span v-else>{{scope.row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="type"
                           :label="this.$t('dynamicParam.type')">
            <template slot-scope="scope">
              <el-select v-if="scope.row._edit"
                         v-model="scope.row.type">
                <el-option v-for="item in  dataTypeList"
                           :key="item"
                           :label="item"
                           :value="item" />
              </el-select>
              <span v-else>{{scope.row.type }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="testValue"
                           :label="this.$t('dynamicParam.testValue')">
            <template slot-scope="scope">
              <el-input v-if="scope.row._edit"
                        v-model="scope.row.testValue"
                        clearable></el-input>
              <span v-else>{{scope.row.testValue }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="defaultValue"
                           :label="this.$t('dynamicParam.defaultValue')">
            <template slot-scope="scope">
              <el-input v-if="scope.row._edit"
                        v-model="scope.row.defaultValue"
                        clearable></el-input>
              <span v-else>{{scope.row.defaultValue }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="format"
                           :label="this.$t('dynamicParam.format')"
                           min-width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row._edit"
                        v-model="scope.row.format"
                        clearable></el-input>
              <span v-else>{{scope.row.format }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="constant"
                           :label="this.$t('dynamicParam.constant')"
                           width="60">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.constant"
                           :disabled="!scope.row._edit" />
            </template>
          </el-table-column>

          <el-table-column fixed="right"
                           :label="$t('base.titleOperation')"
                           width="100">
            <template slot-scope="scope">
              <el-tooltip v-if="scope.row._edit"
                          class="item"
                          effect="dark"
                          :content="$t('base.buttonEdit')"
                          placement="bottom">
                <el-button plain icon="el-icon-check"
                           @click="onDynamicEditClick(scope.row)"
                           type="text"
                           size="small" />
              </el-tooltip>
              <el-tooltip class="item"
                          effect="dark"
                          :content="$t('base.buttonDelete')"
                          placement="bottom">
                <el-button plain icon="el-icon-minus"
                           @click="onParamDelete(scope.row)"
                           type="text"
                           size="small" />
              </el-tooltip>
            </template>
            <template slot="header"
                      slot-scope="slot">
              <el-tooltip class="item"
                          effect="dark"
                          :content="$t('base.buttonAdd')"
                          placement="bottom">
                <el-button plain icon="el-icon-plus"
                           @click="onDynamicAddClick()"
                           type="text"
                           size="small"
                           :disabled="formItem.id===undefined">{{$t('base.buttonAdd')}}</el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <el-form-item style="margin-top: 16px;text-align: right;">
          <el-button plain @click="activeIndex--">{{$t('base.buttonPreStep')}}</el-button>
          <el-button plain @click="onFinish">{{$t('base.buttonSubmit')}}</el-button>
        </el-form-item>
      </el-form-item>
    </el-form>
  </div>

</template>
<script>
import dynamicMethodApi from "../../api/online/apiDynamicMethod";
import { codemirror } from "vue-codemirror";
import sqlFormatter from "sql-formatter";
// require styles
import "codemirror/lib/codemirror.css";
import dynamicSqlApi from "../../api/online/apiDynamicSql";
import dynamicParamApi from "../../api/online/apiDynamicParam";
export default {
  props: ["item", "visible"],
  data() {
    return {
      paramItem: {},
      activeIndex: 0,
      autoFormat: true,
      formItem: this.initFormItem(),
      statusList: [
        { value: "0", label: "编辑" },
        { value: "5", label: "发布" },
        { value: "9", label: "停用" }
      ],
      operationArray: [
        { value: "select", label: "查询" },
        { value: "insert", label: "插入" },
        { value: "update", label: "更新" },
        { value: "delete", label: "删除" }
      ],
      dynamicSqlList: [],
      dynamicParamList: [],
      paramList: [],
      ruleValidate: {
        dynamicSqlId: [
          { required: true, message: "必须选择分类", trigger: "blur" }
        ],
        method: [
          { required: true, message: "方法名不能为空", trigger: "blur" }
        ],
        query: [
          { required: true, message: "脚本语句不能为空", trigger: "blur" }
        ]
      },
      dataTypeList: [
        "String",
        "Integer",
        "Double",
        "Date",
        "DateTime",
        "Boolean"
      ],
      collectionTypeList: [
        { key: "0", lable: "默认" },
        { key: "1", lable: "集合" }
      ]
    };
  },
  components: {
    codemirror
  },
  created() {
    this.load();
    this.loadDynamicList();
  },
  methods: {
    initFormItem() {
      return {
        dynamicSqlId: "",
        method: "",
        privilege: "",
        parameterType: "",
        resultMap: "",
        versions: 0,
        resultType: "",
        flushCache: true,
        timeout: 0,
        fetchSize: 0,
        statementType: "",
        resultSetType: "",
        databaseId: "",
        resultOrdered: true,
        resultSets: "",
        query: "",
        status: "0",
        template: "",
        operation: "select"
      };
    },
    load() {
      if (this.item !== undefined) {
        this.formItem = JSON.parse(JSON.stringify(this.item));
        this.loadParamList(this.formItem.id);
      }
    },
    loadDynamicList() {
      Promise.all([
        dynamicSqlApi.getAll({
          size: 500,
          page: 0
        })
      ])
        .then(([response]) => {
          this.dynamicSqlList = response.content;
        })
        .catch(error => {});
    },
    formReset(name) {
      this.$refs[name].resetFields();
    },
    formatSql() {
      if (this.autoFormat)
        this.formItem.query = sqlFormatter.format(this.formItem.query);
    },
    nextStep(name, step) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.activeIndex++;
          switch (step) {
            case 1:
              break;
            case 2:
              this.onSubmitClick(name);
              break;
          }
        } else {
          this.$message({
            message: this.$t("message.formValidate"),
            type: "error"
          });
        }
      });
      //this.$refs[name].clearValidate();
    },
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          Promise.all([dynamicMethodApi.saveOrUpdate(this.formItem)])
            .then(([response]) => {
              this.formItem = response;
              this.genDefaultParamList();
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.$message({
            message: this.$t("message.formValidate"),
            type: "warn"
          });
        }
      });
    },
    genDefaultParamList() {
      let patt = /\${[^\}]+\}/g;
      let param = this.formItem.query.match(patt);
      this.paramList = [];
      console.log("常量参数名", param);
      if (param !== null) {
        param.forEach(element => {
          let item = element.substring(2, element.length - 2);
          item = item.split(",")[0].trim();
          if (this.paramList.indexOf(item) === -1) {
            this.paramList.push(item);
          }
        });
      }
      patt = /\#{[^\}]+\}/g;
      param = this.formItem.query.match(patt);
      console.log("变量参数名", param);
      if (param !== null) {
        param.forEach(element => {
          let item = element.substring(2, element.length - 1);
          item = item.split(",")[0].trim();
          if (this.paramList.indexOf(item) === -1) {
            this.paramList.push(item);
          }
        });
      }
      let set = new Set(this.getParamListNames());
      this.paramList = [
        ...new Set([...this.paramList].filter(x => !set.has(x)))
      ];
      this.paramList.sort();
    },
    onDynamicAddClick() {
      let item = {
        methodId: "",
        name: "",
        title: "",
        type: "String",
        testValue: "",
        defaultValue: "",
        format: "",
        constant: false,
        description: "",
        collectinType: "0",
        _edit: true
      };
      this.dynamicParamList.push(item);
    },
    //删除参数明细
    onParamDelete(row) {
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
          Promise.all([dynamicParamApi.deleteDynamicParam(row.id)])
            .then(([response]) => {
              this.$message({
                type: "info",
                message: this.$t("message.deleteOk")
              });
              this.loadParamList(this.formItem.id);
            })
            .catch(error => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$t("message.cancel")
          });
        });
    },
    dynamicHandleClose(done) {
      this.childForm.dynamicAddForm = false;
      this.childForm.dynamicEditForm = false;
      //查询参数，返回列表
      Promise.all([
        dynamicParamApi.getAll({
          size: 500, //暂时简化操作，一般来说，目前还达不到500个的数据返回
          page: 0,
          search: "methodId:EQ:{methodId}".format({
            methodId: this.formData.selectMethodId
          })
        })
      ])
        .then(([paramResponse]) => {
          this.formData.dynamicParamList = paramResponse.content;
          this.formData.dynamicParamList.push(
            this.createParamEntity(this.formData.selectMethodId)
          );
        })
        .catch(error => {});
      done();
    },
    //根据方法名，获取参数列表
    loadParamList(methodId) {
      //查询参数，返回列表
      Promise.all([
        dynamicParamApi.getAll({
          size: 500, //暂时简化操作，一般来说，目前还达不到500个的数据返回
          page: 0,
          sort: "name,asc",
          search: "methodId:EQ:{methodId}".format({
            methodId: methodId
          })
        })
      ])
        .then(([paramResponse]) => {
          this.dynamicParamList = paramResponse.content;
          let set = new Set(this.getParamListNames());
          this.paramList = [
            ...new Set([...this.paramList].filter(x => !set.has(x)))
          ];
          // this.formData.dynamicParamList.push(this.createParamEntity(methodId));
        })
        .catch(error => {});
    },
    onRowSelectChanged(row) {
      if (row === null || row === undefined) {
        return;
      }
      let selectIndex = this.dynamicParamList.findIndex(function(
        item,
        index,
        arr
      ) {
        return item._edit === true;
      }); // 2

      if (selectIndex > -1) {
        let preEdit = this.dynamicParamList[selectIndex];
        preEdit._edit = false;
        this.dynamicParamList.splice(selectIndex, 1);
        this.dynamicParamList.splice(selectIndex, 0, preEdit);
      }
      selectIndex = this.dynamicParamList.findIndex(function(item, index, arr) {
        return item.id === row.id;
      }); // 2
      console.log("===>" + selectIndex);
      if (selectIndex > -1) {
        this.paramItem = this.dynamicParamList[selectIndex];
        this.paramItem._edit = true;
        this.dynamicParamList.splice(selectIndex, 1);
        this.dynamicParamList.splice(selectIndex, 0, this.paramItem);
      }
    },
    onDynamicEditClick() {
      this.paramItem.methodId = this.formItem.id;
      Promise.all([dynamicParamApi.saveOrUpdate(this.paramItem)])
        .then(([response]) => {
          this.paramItem = response;
          let selectIndex = this.dynamicParamList.findIndex(function(
            item,
            index,
            arr
          ) {
            return item.name === response.name;
          }); // 2
          if (selectIndex > -1) {
            this.paramItem._edit = false;
            this.dynamicParamList.splice(selectIndex, 1);
            this.dynamicParamList.splice(selectIndex, 0, this.paramItem);
          }
          let set = new Set(this.getParamListNames());
          this.paramList = [
            ...new Set([...this.paramList].filter(x => !set.has(x)))
          ];
        })
        .catch(error => {
          console.log(error);
        });
    },
    onFinish() {
      var item = this.dynamicParamList.find(function(x) {
        return x.methodId === null || x.methodId === undefined;
      });
      if (item !== undefined && item !== null) {
        this.$message({
          type: "info",
          message: "请先保存所有参数列表"
        });
        return;
      }

      this.paramItem = {};
      this.activeIndex = 0;
      this.formItem = this.initFormItem();
      this.$emit("update:visible", false);
    },
    getParamListNames() {
      let names = [];
      this.dynamicParamList.forEach(item => {
        names.push(item.name);
      });
      return names;
    }
  },
  watch: {
    item(curVal, oldVal) {
      this.activeIndex = 0;
      this.formItem = JSON.parse(JSON.stringify(curVal));
      this.loadParamList(this.formItem.id);
    }
  }
};
</script>
