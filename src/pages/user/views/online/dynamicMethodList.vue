<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-button plain
                   v-if="false"
                   type='text'
                   icon="el-icon-d-arrow-left"
                   @click="onBackClick">{{ $t('base.buttonBack') }}</el-button>
        <el-form inline>
          <el-form-item :label="$t('dynamicMethod.catalog')">
            <el-select v-model="searchData.dynamicSqlId"
                       :placeholder="$t('base.pleaseSelect')"
                       filterable
                       @change="onSqlCatChange">
              <el-option v-for="item in formData.dynamicSqlList"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.title }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('dynamicMethod.operation')">
            <el-select v-model="searchData.operation"
                       :placeholder="$t('base.pleaseSelect')"
                       filterable>
              <el-option value="-"
                         :label="$t('base.all')" />
              <el-option v-for="(item ) in operationArray"
                         :value="item.value"
                         :key="item.value"
                         :label="item.label" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('dynamicMethod.status')">
            <el-select v-model="searchData.status"
                       :placeholder="$t('base.pleaseSelect')"
                       filterable>
              <el-option value="-"
                         :label="$t('base.all')" />
              <el-option v-for="(item ) in statusList"
                         :value="item.value"
                         :key="item.value"
                         :label="item.label" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('base.keywords')">
            <el-input v-bind:placeholder="$t('base.ipKeywords')"
                      v-model="formData.pagination.keyword"
                      @keyup.enter.native="onSearchButtonClick" />
          </el-form-item>
        </el-form>
      </div>
      <div class='toolButton'
           style="min-width: 280px">
        <el-button-group>
          <el-button plain
                     type='primary'
                     @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }}</el-button>
          <el-button plain
                     type='primary'
                     @click="childForm.addForm=true">{{ $t('base.buttonAdd') }}</el-button>
          <el-button plain
                     type='primary'
                     @click="onSubmitClick('formValidate')">{{ $t('base.buttonUpdate') }}</el-button>
          <el-button plain
                     type='primary'
                     :disabled="this.formData.selectRow === undefined">{{ $t('dynamicMethod.buttonTester') }}</el-button>
          <el-button plain
                     type='danger'
                     @click='deleteButtonConfirm'
                     :disabled="this.formData.selectRow === undefined">{{ $t('base.buttonDelete') }}</el-button>
        </el-button-group>

      </div>
    </div>
    <main class='contentPanel'>

      <el-table highlight-current-row
                border
                :data="formData.dynamicMethodList"
                style="width: 100%">
        <el-table-column prop="method"
                         :label="$t('dynamicMethod.method')">

        </el-table-column>
        <el-table-column prop="method"
                         :label="$t('dynamicMethod.urlSuffix')">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===9"
                    type="danger"> {{item.catalog }}/{{scope.row.method }}/{{scope.row.versions }}</el-tag>
            <el-tag v-else-if="scope.row.status===5"
                    type="success"> {{item.catalog }}/{{scope.row.method }}/{{scope.row.versions }}</el-tag>
            <el-tag v-else> {{item.catalog }}/{{scope.row.method }}/{{scope.row.versions }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="title"
                         :label="$t('dynamicMethod.title')" />
        <el-table-column prop="privilege"
                         :label="$t('dynamicMethod.privilege')" />
        <el-table-column prop="versions"
                         :label="$t('dynamicMethod.version')" />
        <el-table-column prop="operation"
                         :label="$t('dynamicMethod.operation')"
                         width="60">
          <template slot-scope="scope">
            {{selectOperation(scope.row.operation)}}
          </template>
        </el-table-column>
        <el-table-column prop="status"
                         :label="$t('dynamicMethod.status')"
                         width="60">
          <template slot-scope="scope">
            {{selecStatus(scope.row.status)}}
          </template>
        </el-table-column>
        <el-table-column fixed="right"
                         :label="$t('base.titleOperation')"
                         width="160">
          <template slot-scope="scope">

            <el-button plain
                       type="text"
                       @click="pushButtonClick(scope.row)">
              {{scope.row.status!==5?$t('dynamicMethod.buttonPush'):$t('dynamicMethod.buttonStop')}}
            </el-button>
            <el-button plain
                       type="text"
                       @click="editButtonClick(scope.row,true)">
              {{$t('base.buttonEdit')}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </main>

    <div class='footerPanel'>
      <el-pagination :page-size='formData.pagination.pageSize'
                     :total='formData.pagination.total'
                     :current-page='formData.pagination.currentPage'
                     @current-change='onPageChange'
                     :page-sizes='formData.pagination.pageSizeOpts'
                     @size-change='onPageSizeChange'
                     layout="total, sizes, prev, pager, next, jumper"
                     placement='top'></el-pagination>
    </div>
    <template>
      <el-dialog :title="$t('base.buttonAdd')"
                 :visible.sync="childForm.addForm"
                 top="10px"
                 append-to-body
                 :before-close="handleClose"
                 width="1000px"
                 style="padding:10px">
        <add-form :visible.sync="childForm.addForm" />
      </el-dialog>
      <el-dialog :title="$t('base.buttonEdit')"
                 :visible.sync="childForm.editForm"
                 top="10px"
                 append-to-body
                 :before-close="handleClose"
                 width="1000px">
        <add-form :item=formData.viewSelect
                  :visible.sync="childForm.editForm" />
      </el-dialog>

    </template>
  </div>
</template>
<script>
import DynamicAddForm from "./dynamicParamAdd";
import DynamicEditForm from "./dynamicParamEdit";
import dynamicMethodApi from "../../api/online/apiDynamicMethod";

import dynamicSqlApi from "../../api/online/apiDynamicSql";
export default {
  // props: ['selectId', 'visible', 'item'],
  data() {
    return {
      item: {},
      activeIndex: -1,
      isShrink: false,
      activeNames: ["1", "2", "3"],
      statusList: [
        { value: "0", label: "编辑" },
        { value: "5", label: "发布" },
        { value: "9", label: "停用" }
      ],
      formItem: this.resetFormItem(),
      operationArray: [
        { value: "select", label: "查询" },
        { value: "insert", label: "插入" },
        { value: "update", label: "更新" },
        { value: "delete", label: "删除" }
      ],
      childForm: {
        addForm: false,
        editForm: false,
        viewForm: false,
        isEdit: false,
        dynamicAddForm: false,
        dynamicEditForm: false
      },
      searchData: {
        dynamicSqlId: "",
        method: "",
        privilege: "",
        parameterType: "",
        resultMap: "",
        operation: "-",
        status: "-"
      },
      formData: {
        dynamicSqlList: [],
        dynamicMethodList: [],
        dynamicParamList: [],
        selectMethodId: "",
        pagination: {
          //用于分页的变量
          currentPage: 1,
          pageSize: 10,
          total: 0,
          keyword: "",
          pageSizeOpts: [10, 15, 20, 25, 30]
        },
        rowSelection: [],
        selectParamItem: ""
      },
      ruleValidate: {
        method: [{ required: true, message: "方法名不能为空", trigger: "blur" }]
      }
    };
  },
  watch: {
    selectId(data) {
      this.formData.dynamicMethodList = []; //重置
      this.formData.viewSelect = null;
    }
  },
  created() {
    this.loadDynamicList();
  },
  components: {
    DynamicEditForm,
    "dynamic-add-form": DynamicAddForm,
    "dynamic-edit-form": DynamicEditForm,
    addForm: () => import("./dynamicMethodAdd")
  },
  methods: {
    onBackClick() {
      this.$emit("update:visible", false);
    },
    onDynamicEditClick(row) {
      this.formData.selectParamItem = row;
      this.formData.selectMethodId = this.formData.selectRow.id;
      this.childForm.dynamicEditForm = true;
    },
    editButtonClick(selectRow, isEdit) {
      this.formData.viewSelect = selectRow;
      if (isEdit) {
        this.childForm.editForm = true;
      } else {
        this.childForm.viewForm = true;
      }
      this.childForm.isEdit = isEdit;
    },
    deleteButtonClick() {
      Promise.all([
        dynamicMethodApi.deleteDynamicMethod(this.formData.selectRow.id)
      ])
        .then(([response]) => {
          this.$message({
            type: "info",
            message: this.$t("message.deleteOk")
          });
          this.formData.selectRow = null;
          this.onSearchButtonClick();
        })
        .catch(error => {});
    },
    deleteButtonConfirm() {
      if (
        this.formData.selectRow === null ||
        this.formData.selectRow === undefined
      ) {
        this.$message({
          message: this.$t("message.unSelectAny"),
          type: "info"
        });
        return;
      }
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
          this.deleteButtonClick();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$t("message.cancel")
          });
        });
    },

    onSearchButtonClick() {
      this.formItem = this.resetFormItem();
      this.formData.dynamicParamList = [];
      this.formData.selectMethodId = "";
      let serachCondition = "dynamicSqlId:EQ:{dynamicSqlId}".format({
        dynamicSqlId: this.searchData.dynamicSqlId
      });
      if (this.searchData.operation !== "-") {
        serachCondition += ";operation:eq:" + this.searchData.operation;
      }
      if (this.searchData.status !== "-") {
        serachCondition += ";status:eq:" + this.searchData.status;
      }
      Promise.all([
        dynamicMethodApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          contains: "method,title:{keyword}:true".format({
            keyword: this.formData.pagination.keyword
          }),
          sort: "method,asc",
          search: serachCondition
        })
      ])
        .then(([response]) => {
          this.formData.dynamicMethodList = response.content;
          this.formData.pagination.total = parseFloat(response.totalElements);
        })
        .catch(error => {});
    },
    resetFormItem() {
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
    onPageChange(index) {
      this.formData.pagination.currentPage = index;
      this.onSearchButtonClick();
    },
    onPageSizeChange(size) {
      this.formData.pagination.pageSize = size;
      this.onSearchButtonClick();
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

    onButtonAddClick(name) {
      this.formItem.id = "";
      this.activeIndex = 0;
      // this.onSubmitClick(name);
    },
    loadDynamicList() {
      Promise.all([
        dynamicSqlApi.getAll({
          size: 500,
          page: 0
        })
      ])
        .then(([response]) => {
          this.formData.dynamicSqlList = response.content;
          if (this.formData.dynamicSqlList.length > 0) {
            this.item = this.formData.dynamicSqlList[0];
            this.searchData.dynamicSqlId = this.item.id;
          }
        })
        .catch(error => {});
    },
    selectOperation(oid) {
      var item = this.operationArray.find(item => {
        return item.value === oid;
      });
      return item === undefined ? this.$t("base.titleOther") : item.label;
    },
    selecStatus(sid) {
      var item = this.statusList.find(item => {
        return item.value === sid + "";
      });
      return item === undefined ? this.$t("base.titleOther") : item.label;
    },
    pushButtonClick(row) {
      if (row.status !== 5) {
        row.status = 5;
      } else {
        row.status = 9;
      }
      Promise.all([dynamicMethodApi.updateDynamicMethod(row.id, row)])
        .then(([response]) => {
          this.$message({
            message: "操作成功，请切换到接口分类进行刷新",
            type: "info"
          });
        })
        .catch(error => {});
    },
    onSqlCatChange(value) {
      this.formData.dynamicMethodList = [];
      this.item = this.formData.dynamicSqlList.find(item => {
        return item.id === value;
      });
      this.onSearchButtonClick();
    }
  }
};
</script>
<style scoped >
.el-dialog__body {
  padding: 10px;
}
</style>
