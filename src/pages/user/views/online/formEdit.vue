<template>
  <div class='mainPanel'
       v-loading="loading"
       element-loading-text="拼命加载中">
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-button plain type='text'
                   icon="el-icon-d-arrow-left"
                   @click="onBackClick()">{{ $t('base.buttonBack') }}</el-button>
      </div>
      <div class='toolButton'
           style="min-width: 300px">
       <el-button-group>
          <el-button plain type='primary'
                     @click="creatProperty">{{ $t('onlineForm.buttonInsertField') }}</el-button>
          <el-button plain type='primary'
                     @click="creatForeignKey">{{ $t('onlineForm.buttonInsertForeigh') }}</el-button>
          <el-button plain type="primary"
                     @click="onSubmitClick('formValidate')">{{ $t('base.buttonSubmit') }}
          </el-button>
        </el-button-group>

      </div>
    </div>
    <main class='contentPanel'>
      <el-form :model="formItem"
               label-width="90px"
               ref="formValidate"
               :rules="ruleValidate"
               class="demo-block"
               style="padding:5px 10px 10px 0px">
        <el-row :gutter="5">
          <el-col :span="6">
            <el-form-item :label="$t('menu.belongSystem')"
                          prop="systemId">
              <el-select v-model='formItem.systemId'
                         style="width: 100%"
                         @change='onSystemChanged'>
                <el-option value='-'
                           key='-'>{{ $t('base.all') }}</el-option>
                <el-option v-for="item in  formData.systemList"
                           :key="item.id"
                           :label="item.name"
                           :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="包名"
                          prop="packageName">
              <el-input v-model="formItem.packageName"
                        :placeholder="$t('base.pleaseInput')" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="模式">
              <el-input v-model="formItem.schema"
                        :placeholder="$t('base.pleaseInput')" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="表名"
                          prop="tableName">
              <el-input :placeholder="$t('base.pleaseInput')"
                        v-model="formItem.tableName" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="16">

          <el-col :span="6">
            <el-form-item label="实体名"
                          prop="entityName">
              <el-input :placeholder="$t('base.pleaseInput')"
                        v-model="formItem.entityName" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="继承类">
              <el-select v-model="formItem.extend"
                         style="width: 100%">
                <el-option v-for="item in formData.extendList"
                           :value="item"
                           :key="item">{{ item }}</el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="主键类型">
              <el-select v-model="formItem.primaryKeyType"
                         style="width: 100%">
                <el-option v-for="item in formData.dataTypeList"
                           :value="item"
                           :key="item">{{ item }}
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="表说明">
          <el-input :placeholder="$t('base.pleaseInput')"
                    v-model="formItem.title" />
        </el-form-item>
      </el-form>
      <div class="demo-block">
        <el-tabs v-model="activeName"
                 style="padding: 24px;">
          <el-tab-pane label="扩展属性"
                       name="1">
            <el-form :model="formItem"
                     label-width="90px">
              <el-row :gutter="16">
                <el-col :span="8">
                  <el-form-item label="主键策略">
                    <el-select v-model="formItem.generator">
                      <el-option v-for="item in formData.generatorList"
                                 :value="item"
                                 :key="item">{{ item }}
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="表单分类">
                    <el-select v-model="formItem.formType">
                      <el-option v-for="item in formData.formTypeList"
                                 :value="item.value"
                                 :key="item.value">
                        {{ item.label }}
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="表类型">
                    <el-cascader :options="formData.tableTypeList"
                                 v-model="formItem.tableTypeSelect"></el-cascader>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  <el-form-item label="显示复选框">
                    <el-checkbox v-model="formItem.enableCheckBox">

                    </el-checkbox>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="是否分页">
                    <el-checkbox v-model="formItem.enablePagination">

                    </el-checkbox>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="树形结构">
                    <el-checkbox v-model="formItem.isTree">

                    </el-checkbox>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="父级列名"
                                v-show="formItem.isTree">
                    <el-input v-model="formItem.parentId" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="父级展开名"
                                v-show="formItem.isTree">
                    <el-input v-model="formItem.parentExpandName" />
                  </el-form-item>
                </el-col>

              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="字段属性"
                       name="2">
            <transition name='fade'
                        mode='out-in'>
              <el-table row-key="index"
                        ref="filedRef"
                        border
                        highlight-current-row
                        :data="formItem.propertyList"
                        style="width: 100%;margin-top: 10px"
                        align="center"
                        @current-change="onRowSelectChanged">
                <el-table-column type="index"
                                 width="50">
                </el-table-column>
                <el-table-column prop="columnName"
                                 :label="$t('onlineForm.columnName')">
                  <template slot-scope="scope">
                    <el-input v-if="scope.row._edit"
                              v-model="scope.row.columnName"
                              clearable
                              @blur="validateColumnName"></el-input>
                    <span v-else>{{scope.row.columnName}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="filed"
                                 :label="$t('onlineForm.filed')">
                  <template slot-scope="scope">
                    <el-input v-if="scope.row._edit"
                              v-model="scope.row.filed"
                              clearable
                              @blur="validateField"></el-input>
                    <span v-else>{{scope.row.filed}}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('onlineForm.displayName')">
                  <template slot-scope="scope">
                    <el-input v-if="scope.row._edit"
                              v-model="scope.row.displayName"
                              clearable></el-input>
                    <span v-else>{{scope.row.displayName}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="length"
                                 :label="$t('onlineForm.length')"
                                 width="100">
                  <template slot-scope="scope">
                    <el-input v-if="scope.row._edit"
                              v-model="scope.row.length"></el-input>
                    <span v-else>{{scope.row.length}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="precision"
                                 :label="this.$t('onlineForm.precision')"
                                 width="80">
                  <template slot-scope="scope">
                    <el-input v-if="scope.row._edit"
                              v-model="scope.row.precision"></el-input>
                    <span v-else>{{scope.row.precision}}</span>
                  </template>
                </el-table-column>

                <el-table-column prop="filedType"
                                 :label="this.$t('onlineForm.filedType')">
                  <template slot-scope="scope">

                    <el-select v-if="scope.row._edit"
                               v-model="scope.row.filedType"
                               filterable
                               allow-create
                               default-first-option>
                      <el-option v-for="item in  formData.typeData"
                                 :key="item"
                                 :label="item"
                                 :value="item">
                      </el-option>
                    </el-select>
                    <span v-else>{{scope.row.filedType}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="isPrimary"
                                 :label="this.$t('onlineForm.isPrimary')"
                                 width="60">
                  <template slot-scope="scope">
                    <el-checkbox :disabled="!scope.row._edit"
                                 v-model="scope.row.isPrimary"></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column prop="notNull"
                                 :label="this.$t('onlineForm.notNull')"
                                 width="60">
                  <template slot-scope="scope">
                    <el-checkbox :disabled="!scope.row._edit"
                                 v-model="scope.row.notNull"></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column prop="columnUnique"
                                 :label="this.$t('onlineForm.columnUnique')"
                                 width="60">
                  <template slot-scope="scope">
                    <el-checkbox :disabled="!scope.row._edit"
                                 v-model="scope.row.columnUnique"></el-checkbox>
                  </template>
                </el-table-column>

                <el-table-column fixed="right"
                                 :label="$t('base.titleOperation')"
                                 width="60"
                                 header-align='center'>
                  <template slot-scope="scope">
                    <el-tooltip class="item"
                                effect="dark"
                                :content="$t('base.buttonDelete')"
                                placement="right">
                      <el-button plain type="danger"
                                 size="small"
                                 @click="removeProperty(scope.row)"
                                 icon="el-icon-delete" />

                    </el-tooltip>
                  </template>
                </el-table-column>

              </el-table>
            </transition>
          </el-tab-pane>
          <el-tab-pane label="表单属性"
                       name="3">
            <transition name='fade'
                        mode='out-in'>
              <el-table row-key="index"
                        border
                        highlight-current-row
                        :data="formItem.propertyList"
                        style="width: 100%;margin-top: 10px"
                        align="center"
                        @current-change="onRowSelectChanged">
                <el-table-column type="index"
                                 width="50">
                </el-table-column>
                <el-table-column :label="$t('onlineForm.displayName')"
                                 prop="displayName">
                  <template slot-scope="scope">
                    <el-input v-if="scope.row._edit"
                              v-model="scope.row.displayName"
                              disabled
                              clearable></el-input>
                    <span v-else>{{scope.row.displayName }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('onlineForm.controlType')"
                                 width="120">
                  <template slot-scope="scope">
                    <el-select v-if="scope.row._edit"
                               v-model="scope.row.controlType"
                               filterable
                               allow-create
                               default-first-option>
                      <el-option v-for="item in  formData.controlTypeList"
                                 :key="item"
                                 :label="item"
                                 :value="item" />
                    </el-select>
                    <span v-else>{{scope.row.controlType }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('onlineForm.defaultValue')">
                  <template slot-scope="scope">
                    <el-input v-if="scope.row._edit"
                              v-model="scope.row.defaultValue"
                              style="width: 140px" />
                    <span v-else>{{scope.row.defaultValue }}</span>
                  </template>

                </el-table-column>
                <el-table-column prop="filedComment"
                                 :label="$t('onlineForm.filedComment')">
                  <template slot-scope="scope">
                    <el-input v-if="scope.row._edit"
                              v-model="scope.row.filedComment"
                              style="width: 140px" />
                    <span v-else>{{scope.row.filedComment }}</span>
                  </template>

                </el-table-column>
                <el-table-column :label="$t('onlineForm.controlLength')"
                                 prop="controlLength">
                  <template slot-scope="scope">
                    <el-input v-if="scope.row._edit"
                              v-model="scope.row.controlLength"></el-input>
                    <span v-else>{{scope.row.controlLength }}</span>
                  </template>

                </el-table-column>

                <el-table-column prop="listVisible"
                                 :label="$t('onlineForm.listVisible')"
                                 width="70">
                  <template slot-scope="scope">
                    <el-checkbox :disabled="!scope.row._edit"
                                 v-model="scope.row.listVisible"></el-checkbox>

                  </template>

                </el-table-column>
                <el-table-column prop="formVisible"
                                 :label="this.$t('onlineForm.formVisible')"
                                 width="70">
                  <template slot-scope="scope">
                    <el-checkbox :disabled="!scope.row._edit"
                                 v-model="scope.row.formVisible"></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column prop="canSearch"
                                 :label="this.$t('onlineForm.canSearch')"
                                 width="70">
                  <template slot-scope="scope">
                    <el-checkbox :disabled="!scope.row._edit"
                                 v-model="scope.row.canSearch"></el-checkbox>
                  </template>
                </el-table-column>

                <el-table-column prop="searchType"
                                 :label="this.$t('onlineForm.searchType')">
                  <template slot-scope="scope">
                    <el-select v-if="scope.row._edit"
                               v-model="scope.row.searchType">
                      <el-option v-for="item in  formData.searchTypeList"
                                 :key="item"
                                 :label="item"
                                 :value="item" />
                    </el-select>
                    <span v-else>{{scope.row.searchType }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </transition>
          </el-tab-pane>
          <el-tab-pane label="外键属性"
                       name="4">
            <transition name='fade'
                        mode='out-in'>
              <foreignKeyPanel :foreignKeyList.sync="formItem.foreignKeyList" />
            </transition>
          </el-tab-pane>
          <el-tab-pane label="索引属性"
                       name="5">索引属性</el-tab-pane>
          <el-tab-pane label="检验字典"
                       name="6">检验字典</el-tab-pane>
        </el-tabs>
      </div>

    </main>
  </div>
</template>
<script>
import propertyPanel from "./propertyPanel.vue";
import formPanel from "./formPanel.vue";
import pagePanel from "./pagePanel.vue";
import foreignKeyPanel from "./foreignKeyPanel.vue";
import indexPanel from "./indexPanel.vue";
import systemApi from "../../api/apiSystem";
import formApi from "../../api/online/apiForm";
import dateFormat from "dateformat";
import Sortable from "sortablejs";
export default {
  props: ["tableId", "visible"],
  components: {
    propertyPanel,
    pagePanel,
    foreignKeyPanel,
    indexPanel,
    formPanel
  },
  data() {
    return {
      loading: true,
      activeName: "2",
      formItem: {},
      formData: {
        systemList: [],
        extendList: ["IdEntity", "BaseEntity", "Serializable"],
        generatorList: ["AUTO", "IDENTITY", "SEQUENCE", "TABLE"], //表生成器
        formTypeList: [{ value: "0", label: "普通表单" }],
        tableTypeList: [
          { value: "0", label: "单表" },
          { value: "1", label: "主表" },
          {
            value: "2",
            label: "从表",
            children: [
              { value: "20", label: "一对一" },
              { value: "21", label: "一对多" }
            ]
          }
        ],
        webStyleList: [{ value: "iview", label: "iview" }],
        propertyList: [],
        dataTypeList: [
          "String",
          "Boolean",
          "Integer",
          "Byte",
          "Short",
          "Long",
          "Float",
          "Double"
        ],
        tableTypeSelect: ["0"],
        typeData: [
          "String",
          "Boolean",
          "Integer",
          "Byte",
          "Short",
          "Long",
          "Float",
          "Double",
          "Date",
          "DateTime",
          "Decimal"
        ],
        controlTypeList: [
          "Input",
          "Checkbox",
          "Select",
          "Switch",
          "DatePicker"
        ],
        searchTypeList: [
          "EQ",
          "NEQ",
          "LIKE",
          "GT",
          "GTE",
          "LT",
          "LTE",
          "IN",
          "BETWEEN",
          "ISNULL"
        ]
      },
      ruleValidate: {
        packageName: [{ required: true, message: "必须输入", trigger: "blur" }],
        tableName: [{ required: true, message: "必须输入", trigger: "blur" }],
        entityName: [{ required: true, message: "必须输入", trigger: "blur" }]
      }
    };
  },

  created() {
    this.load();
  },
  mounted() {
    var el = this.$refs["filedRef"].$children[
      this.$refs["filedRef"].$children.length - 1
    ].$el.children[1];
    let vm = this;
    Sortable.create(el, {
      onStart: vm.startFunc,
      onEnd: vm.endFunc,
      onChoose: vm.chooseFunc
    });
  },
  methods: {
    load() {
      if (
        this.tableId === null ||
        this.tableId === undefined ||
        this.tableId === ""
      ) {
        return;
      }
      Promise.all([systemApi.getAll(), formApi.getTableByTableId(this.tableId)])
        .then(([systems, tableEntity]) => {
          this.formData.systemList = systems.content;
          let list = [];
          let index = 0;
          for (let it of tableEntity.propertyList) {
            let temp = JSON.parse(JSON.stringify(it));
            temp.index = index++;
            list.push(temp);
          }
          tableEntity.propertyList = list;
          this.formItem = tableEntity;
          this.loading = false;
        })
        .catch(error => {});
    },
    onSubmitClick(name) {
      var index = 1;
      for (var item of this.formItem.propertyList) {
        item.sortby = index++;
      }
      if (
        this.formData.tableTypeSelect !== undefined &&
        this.formData.tableTypeSelect.length > 0
      ) {
        this.formItem.tableType = this.formData.tableTypeSelect[
          this.formData.tableTypeSelect.length - 1
        ];
      }
      this.$refs[name].validate(valid => {
        // 进行前端检验
        if (valid) {
          Promise.all([formApi.updateTable(this.formItem.id, this.formItem)])
            .then(([response]) => {
              this.$message({
                message: this.$t("message.saveAndContinue"),
                type: "info"
              });
              this.$emit("update:visible", false);
            })
            .catch(error => {});
        } else {
          this.$message({
            message: this.$t("message.formValidate"),
            type: "warn"
          });
        }
      });
    },
    onBackClick() {
      this.$emit("update:visible", false);
    },
    onSystemChanged(data) {
      for (var item of this.formData.systemList) {
        if (item.id === data) {
          if (
            this.formItem.packageName === undefined ||
            this.formItem.packageName === ""
          ) {
            if (item.packageName === undefined || item.packageName === "") {
              this.formItem.packageName = "com.casit";
            } else {
              this.formItem.packageName = item.packageName;
            }
          }

          break;
        }
      }
    },
    creatProperty() {
      let prop = {
        sortby: this.formItem.propertyList.length + 1, //排序
        columnName: "", // 数据库字段名
        filed: "", //实体字段
        filedComment: "", //字段备注
        length: 32, //数据库长度
        precision: 2, //小数精度
        defaultValue: "", //默认值
        filedType: "String", //数据类型
        isPrimary: false, //是否为主键
        notNull: true, //是否为空
        columnUnique: false, //是否惟一
        displayName: "", //表格显示名
        formVisible: true, //表单是否可见
        listVisible: true, //列表可见
        controlType: "Input", //控件类型
        controlLength: 120, //控件长度
        canSearch: false, //是否可以查询
        searchType: "EQ", //查询类型
        index:
          dateFormat(new Date(), "yyyymmddHHMMss") +
          Math.ceil(Math.random() * 100), //序号
        _edit: true //用于属性编辑状态
      };
      this.formItem.propertyList.push(prop);
      this.activeName = "2";
    },
    creatForeignKey() {
      var property = {
        foreignName: "", //外键中文名称
        foreignKey: "", //外键列名,
        foreignColumnName: "", //外键列名
        foreignClass: "", //外键类名
        foreignType: "ManyToOne", //外键类型
        fetchType: "FetchType.EAGER", //连接方法
        _edit: true,
        index:
          dateFormat(new Date(), "yyyymmddHHMMss") +
          Math.ceil(Math.random() * 100) //序号
      };
      this.formItem.foreignKeyList.push(property);
      this.activeName = "4";
    },
    //验证表单
    validateField(event) {
      if (event.target.value === undefined || event.target.value === "") {
        this.$notify({
          title: "提示",
          message: "字段不能为空",
          duration: 3000,
          type: "warning"
        });
      }
    },
    validateColumnName(event) {
      if (event.target.value === undefined || event.target.value === "") {
        this.$notify({
          title: "提示",
          message: "列名不能为空",
          duration: 3000,
          type: "warning"
        });
      }
    },
    startFunc(from) {},
    endFunc(e) {
      const targetRow = this.formItem.propertyList.splice(e.oldIndex, 1)[0];
      this.formItem.propertyList.splice(e.newIndex, 0, targetRow);
    },
    chooseFunc(from) {},
    removeProperty(row) {
      let selectIndex = this.formItem.propertyList.findIndex(function(
        item,
        index,
        arr
      ) {
        return item.index === row.index;
      }); // 2

      if (selectIndex > -1) {
        this.formItem.propertyList.splice(selectIndex, 1);
      }
    },
    removeForeignKey(row) {
      let selectIndex = this.this.formItem.propertyList.findIndex(function(
        item,
        index,
        arr
      ) {
        return item.index === row.index;
      }); // 2

      if (selectIndex > -1) {
        this.this.formItem.propertyList.splice(selectIndex, 1);
      }
    },
    onRowSelectChanged(row) {
      if (row === null || row === undefined) {
        return;
      }
      let selectIndex = this.formItem.propertyList.findIndex(function(
        item,
        index,
        arr
      ) {
        return item._edit === true;
      }); // 2

      if (selectIndex > -1) {
        let preEdit = this.formItem.propertyList[selectIndex];
        preEdit._edit = false;
        this.formItem.propertyList.splice(selectIndex, 1);
        this.formItem.propertyList.splice(selectIndex, 0, preEdit);
      }
      selectIndex = this.formItem.propertyList.findIndex(function(
        item,
        index,
        arr
      ) {
        return item.index === row.index;
      }); // 2
      console.log("===>" + selectIndex);
      if (selectIndex > -1) {
        let preEdit = this.formItem.propertyList[selectIndex];
        preEdit._edit = true;
        this.formItem.propertyList.splice(selectIndex, 1);
        this.formItem.propertyList.splice(selectIndex, 0, preEdit);
      }
    }
  },
  watch: {
    tableId(curVal, oldVal) {
      this.load();
    }
  }
};
</script>
<style scoped>
@import "~@/styles/css/main-list.css";
.demo-block {
  border: 1px solid #ebebeb;
  border-radius: 3px;
  transition: 0.2s;
  margin: 5px;
}
</style>