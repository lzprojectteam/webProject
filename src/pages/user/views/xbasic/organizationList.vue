<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-form-item :label="$t('base.annual')">
            <el-date-picker v-model="searchData.annual"
                            type="year"
                            value-format="yyyy"
                            placeholder="选择年"></el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('org.organizationName')">
            <organization-form root="0"
                               :code.sync="searchData.orgId"
                               :annual="searchData.annual" />
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
          <el-button plain type='primary'
                     @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }} </el-button>
          <el-button plain type='primary'
                     @click='childForm.addForm=true'>{{ $t('base.buttonAdd') }} </el-button>
          <el-button plain type='primary'
                     @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }} </el-button>
        </el-button-group>

      </div>
    </div>
    <main class='contentPanel'>
      <el-table highlight-current-row
                border
                @current-change="handleCurrentChange"
                :data="formData.organizationList"
                style="width: 100%"
                :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="code"
                         :label="this.$t('xbasic.organization.code')"
                         min-width="100px" />
        <el-table-column prop="lead"
                         :label="this.$t('xbasic.organization.lead')"
                         min-width="100px" />
        <el-table-column prop="leaf"
                         :label="this.$t('xbasic.organization.leaf')" />
        <el-table-column prop="name"
                         :label="this.$t('xbasic.organization.name')"
                         width="200"
                         show-overflow-tooltip />
        <el-table-column prop="level.name"
                         :label="this.$t('xbasic.organization.level')" />
        <el-table-column prop="alpha"
                         :label="this.$t('xbasic.organization.alpha')" />
        <el-table-column prop="ldap"
                         :label="this.$t('xbasic.organization.ldap')" />
        <el-table-column prop="visible"
                         :label="this.$t('xbasic.organization.visible')" />
        <el-table-column prop="position"
                         :label="this.$t('xbasic.organization.position')" />
        <el-table-column prop="picture"
                         :label="this.$t('xbasic.organization.picture')"
                         width="120" />
        <el-table-column prop="desc"
                         :label="this.$t('xbasic.organization.desc')" />

        <el-table-column fixed="right"
                         :label="$t('base.titleOperation')"
                         width="100">
          <template slot-scope="scope">
            <el-button plain @click="editButtonClick(scope.row,false)"
                       type="text"
                       size="small">
              {{$t('base.buttonView')}}
            </el-button>
            <el-button plain type="text"
                       size="small"
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
import AddForm from "./organizationAdd.vue";
import EditForm from "./organizationEdit.vue";
import organizationApi from "../../api/xbasic/apiOrganization";
const OrganizationForm = () => import("@/components/Organization");
export default {
  data() {
    return {
      childForm: {
        addForm: false,
        editForm: false,
        viewForm: false,
        isEdit: false
      },

      searchData: { orgId: "", annual: new Date().getFullYear().toString() },
      formData: {
        organizationList: [],
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
  components: {
    "add-form": AddForm,
    "edit-form": EditForm,
    OrganizationForm
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

      Promise.all([
        organizationApi.deleteOrganization(this.formData.selectRow.id)
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
      Promise.all([
        organizationApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          sort: "id,asc",
          contains: "name,code,shortName:{keyword}:true".format({
            keyword: this.formData.pagination.keyword
          }),
          search: "annual:eq:{annual};code:rlike:{key}".format({
            key: this.searchData.orgId,
            annual: this.searchData.annual
          })
        })
      ])
        .then(([response]) => {
          this.formData.organizationList = response.content;
          this.formData.pagination.total = parseFloat(response.totalElements);
        })
        .catch(error => {});
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
    }
  }
};
</script>
