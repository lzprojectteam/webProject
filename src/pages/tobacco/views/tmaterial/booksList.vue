<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-form-item :label="$t('tobacco.common.organization')">
            <organization-form :root="userOrgId"
                               style="width:100%"
                               :code.sync="searchData.organizationId" />
          </el-form-item>
          <el-form-item :label="$t('tobacco.tmaterial.books.status')">

            <el-select clearable
                       v-model="searchData.status"
                       filterable
                       :placeholder="$t('base.pleaseSelect')"
                       style="width: 100%">
              <el-option v-for="item in statusList"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
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
           style="min-width: 210px">
        <el-button-group>
          <el-button type='primary'
                     @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }} </el-button>
          <el-button type='primary'
                     @click='childForm.addForm=true'>{{ $t('base.buttonAdd') }} </el-button>
          <el-button type='primary'
                     @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }} </el-button>
        </el-button-group>
      </div>
    </div>
    <main class='contentPanel'>
      <el-table highlight-current-row
                border
                @current-change="handleCurrentChange"
                :data="formData.booksList"
                style="width: 100%"
                :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="code"
                         :label="this.$t('tobacco.tmaterial.books.code')" />
        <el-table-column prop="name"
                         :label="this.$t('tobacco.tmaterial.books.name')" />
        <el-table-column prop="annual"
                         :label="this.$t('tobacco.tmaterial.books.annual')" />
        <el-table-column prop="month"
                         :label="this.$t('tobacco.tmaterial.books.month')" />
        <el-table-column prop="startAnnual"
                         :label="this.$t('tobacco.tmaterial.books.startAnnual')" />
        <el-table-column prop="startMonth"
                         :label="this.$t('tobacco.tmaterial.books.startMonth')" />
        <el-table-column prop="createDate"
                         :label="this.$t('tobacco.tmaterial.books.createDate')" />
        <el-table-column prop="status"
                         :label="this.$t('tobacco.tmaterial.books.status')">
          <template slot-scope="scope">
            {{scope.row.status|capitalizeState}}
          </template>
        </el-table-column>
        <el-table-column prop="author"
                         :label="this.$t('tobacco.tmaterial.books.author')" />
        <el-table-column prop="leader"
                         :label="this.$t('tobacco.tmaterial.books.leader')" />
        <el-table-column prop="telphone"
                         :label="this.$t('tobacco.tmaterial.books.telphone')" />
        <el-table-column fixed="right"
                         :label="$t('base.titleOperation')"
                         width="100">
          <template slot-scope="scope">

            <el-button type="text"
                       size="small"
                       @click="editButtonClick(scope.row,true)">{{$t('base.buttonEdit')}}</el-button>
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
                 :before-close="handleClose">
        <add-form />
      </el-dialog>
      <el-dialog :title="$t('base.buttonEdit')"
                 :visible.sync="childForm.editForm"
                 top="10px"
                 :before-close="handleClose">
        <edit-form :item.sync=formData.viewSelect
                   :isEdit=childForm.isEdit
                   :visible.sync="childForm.editForm" />
      </el-dialog>
      <el-dialog :title="$t('base.buttonView')"
                 :visible.sync="childForm.viewForm"
                 top="10px"
                 :before-close="handleClose">
        <edit-form :item=formData.viewSelect
                   :isEdit=childForm.isEdit
                   :visible.sync="childForm.viewForm" />
      </el-dialog>
    </template>
  </div>
</template>
<script>
const AddForm = () => import("./booksAdd.vue");
const EditForm = () => import("./booksEdit.vue");
import booksApi from "../../api/tmaterial/apiBooks";
const status = [
  { value: 0, label: "编辑" },
  { value: 5, label: "启用" },
  { value: 7, label: "冻结" },
  { value: 9, label: "停用" }
];
export default {
  data() {
    return {
      statusList: status,
      childForm: {
        addForm: false,
        editForm: false,
        viewForm: false,
        isEdit: false
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
            text: this.$t("base.threeMonth"),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      searchData: {
        organizationId: "",
        status: 5
      },
      formData: {
        booksList: [],
        pagination: {
          //用于分页的变量
          currentPage: 1,
          pageSize: 10,
          total: 0,
          keyword: "",
          pageSizeOpts: [10, 15, 20, 25, 30]
        },
        rowSelection: []
      }
    };
  },
  created() {},
  computed: {
    userOrgId() {
      if (this.$store.state.user.organization === undefined) {
        this.searchData.organizationId = undefined;
        return undefined;
      } else {
        this.searchData.organizationId = this.$store.state.user.organization.organizationId;
        return this.$store.state.user.organization.organizationId;
      }
    }
  },
  components: {
    OrganizationForm: () => import("@/components/Organization"),
    "add-form": AddForm,
    "edit-form": EditForm
  },
  methods: {
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

      Promise.all([booksApi.softDelete(this.formData.selectRow.id)])
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
    handleCurrentChange(val) {
      this.formData.selectRow = val;
    },
    onSearchButtonClick() {
      //设置组织单位
      let search = "organization.organizationId:eq:{orgid}".format({
        orgid: this.searchData.organizationId
      });
      if (
        this.searchData.status !== undefined &&
        this.searchData.status !== null &&
        this.searchData.status !== ""
      ) {
        search += ";status:eq:" + this.searchData.status;
      }
      Promise.all([
        booksApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          contains: "name,code,telphone,leader,author:{keyword}:true".format({
            keyword: this.formData.pagination.keyword
          }),
          search: search
        })
      ])
        .then(([response]) => {
          this.formData.booksList = response.content;
          this.formData.pagination.total = parseFloat(response.totalElements);
          this.$notify({
            title: this.$t("base.hint"),
            message: this.$t("base.loadingDone"),
            duration: 1000,
            position: "bottom-right"
          });
        })
        .catch(error => {});
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
    }
  },
  filters: {
    capitalizeState: function(value) {
      let item = status.find(it => {
        return it.value === value;
      });
      return item ? item.label : "";
    }
  }
};
</script>