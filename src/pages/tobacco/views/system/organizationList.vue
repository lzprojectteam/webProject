<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-form-item :label="$t('tobacco.common.annual')">
            <el-date-picker v-model="searchData.annual"
                            type="year"
                            value-format="yyyy"
                            :placeholder="$t('base.pleaseSelect')"></el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('tobacco.common.organization')">
            <organization-form :root="userOrgId"
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
        <el-button type='primary'
                   plain
                   @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }} </el-button>

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

        <el-table-column prop="name"
                         :label="this.$t('xbasic.organization.name')"
                         width="300"
                         show-overflow-tooltip />
        <el-table-column prop="level.name"
                         :label="this.$t('xbasic.organization.level')" />

        <el-table-column :label="this.$t('xbasic.organization.status')">
          <template slot-scope="scope">
            {{formatOrgStatus(scope.row)}}
          </template>
        </el-table-column>
        <el-table-column prop="position"
                         :label="this.$t('xbasic.organization.position')" />

        <el-table-column fixed="right"
                         :label="$t('base.titleOperation')"
                         width="100">
          <template slot-scope="scope">
            <el-button type="text"
                       size="small"
                       @click="onStopClick(scope.row)">
              {{$t('base.buttonStop')}}
            </el-button>
            <el-button type="text"
                       size="small"
                       @click="editButtonClick(scope.row)">
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
      <el-dialog :title="$t('base.buttonEdit')"
                 :visible.sync="childForm.viewForm"
                 :before-close="handleClose">
        <el-form label-position="right">
          <el-form-item :label="$t('tobacco.common.annual')">
            <el-input v-model="annual"
                      readonly />
          </el-form-item>
          <el-form-item :label="$t('xbasic.organization.code')"
                        min-width="100px">
            <el-input v-model="formData.viewSelect.code"
                      readonly />
          </el-form-item>
          <el-form-item :label="$t('xbasic.organization.name')"
                        min-width="100px">
            <el-input v-model="formData.viewSelect.name"
                      readonly />
          </el-form-item>
          <el-form-item :label="$t('xbasic.organization.rename')"
                        min-width="100px">
            <el-input v-model="formData.rename"
                      clearable />
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       style="float: right;margin-top: 20px;"
                       @click="onUpdateButtonClick(formData.viewSelect)">{{ $t('base.buttonUpdate') }} </el-button>
          </el-form-item>

        </el-form>
      </el-dialog>
    </template>
  </div>
</template>
<script>
import organizationApi from "@/api/xbasic/apiOrganization";
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

      searchData: { orgId: "", annual: 0 },
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
        rowSelection: [],
        viewSelect: {},
        rename: "",
        disabledList: []
      }
    };
  },
  created() {
    this.searchData.orgId = this.userOrgId;
    this.searchData.annual = this.$store.state.system.annual + "";
  },
  computed: {
    userOrgId() {
      if (this.$store.state.user.organization === undefined) {
        this.searchData.orgId = undefined;
        return undefined;
      } else {
        this.searchData.orgId = this.$store.state.user.organization.organizationId;
        return this.$store.state.user.organization.organizationId;
      }
    },
    annual() {
      return this.$store.state.system.annual;
    }
  },
  components: {
    OrganizationForm
  },
  methods: {
    onStopClick(item) {
      this.$confirm(
        this.$t("xbasic.organization.messageConfirmStopped").format({
          annaul: this.annual,
          organizationName: item.name
        }),
        this.$t("base.titleTip"),
        {
          confirmButtonText: this.$t("base.buttonOk"),
          cancelButtonText: this.$t("base.buttonCancel"),
          type: "warning"
        }
      )
        .then(() => {
          Promise.all([organizationApi.startOrStop(item.id, this.annual, 0)])
            .then(([response]) => {
              //重新查询一次
              this.onSearchButtonClick();

              this.$notify({
                title: this.$t("base.titleTip"),
                message: this.$t("message.actionOk")
              });
            })
            .catch(error => {
              console.log(error);
              this.$notify.error({
                title: this.$t("base.error"),
                message: this.$t("message.updateFailed")
              });
            });
        })
        .catch(() => {
          this.$notify({
            type: "info",
            message: this.$t("message.cancel")
          });
        });
    },
    onUpdateButtonClick(item) {
      if (this.formData.rename === "") {
        this.$notify({
          title: this.$t("base.warn"),
          message: this.$t("xbasic.organization.messageRenameNotEmpty"),
          type: "warning"
        });
        return;
      }
      if (this.formData.rename === item.name) {
        this.$notify({
          title: this.$t("base.warn"),
          message: this.$t("xbasic.organization.messageNameEqule"),
          type: "warning"
        });
        return;
      }
      Promise.all([
        organizationApi.updateName(item.id, this.annual, this.formData.rename)
      ])
        .then(([response]) => {
          this.childForm.viewForm = false;
          this.formData.rename = "";
          //重新查询一次
          this.onSearchButtonClick();

          this.$notify({
            title: this.$t("base.titleTip"),
            message: this.$t("message.updateOk")
          });
        })
        .catch(error => {
          console.log(error);
          this.$notify.error({
            title: this.$t("base.error"),
            message: this.$t("message.updateFailed")
          });
        });
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
    async onSearchButtonClick() {
      let response = await organizationApi.getAll({
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
      });
      this.formData.organizationList = response.content;
      this.formData.pagination.total = parseFloat(response.totalElements);
      // let orgIds = [];
      // for (let item of response.content) {
      //   orgIds.push(item.id);
      // }
      // if (orgIds.length > 0) {
      //   Promise.all([organizationApi.getDisabledList(this.annual, orgIds)])
      //     .then(([res]) => {
      //       this.formData.disabledList = res;
      //     })
      //     .catch(error => {});
      // }
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
    formatOrgStatus(row) {
      if (this.formData.disabledList.length === 0) {
        return "启用";
      } else {
        let index = this.formData.disabledList.findIndex(item => {
          return item === row.id;
        });
        if (index !== -1) {
          return "停用";
        }
        return "启用";
      }
    }
  }
};
</script>
