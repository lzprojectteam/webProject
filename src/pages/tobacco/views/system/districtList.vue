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
                            value-format="yyyy"></el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('xbasic.district.districtId')">
            <organization-form :root="userDistrictId"
                               @onchange="organizationOnchange"
                               model="district"
                               :annual="searchData.annual"
                               style="width:100%" />
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
                :data="formData.districtList"
                style="width: 100%"
                :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="districtId"
                         :label="this.$t('xbasic.district.districtId')" />
        <el-table-column prop="lead"
                         :label="this.$t('xbasic.district.lead')" />
        <el-table-column prop="name"
                         :label="this.$t('xbasic.district.name')" />
        <el-table-column prop="sname"
                         :label="this.$t('xbasic.district.sname')" />
        <el-table-column prop="iname"
                         :label="this.$t('xbasic.district.iname')" />
        <el-table-column prop="names"
                         width=400
                         :label="this.$t('xbasic.district.names')"
                         show-overflow-tooltip />

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
                       @click="editButtonClick(scope.row)">{{$t('base.buttonEdit')}}</el-button>
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
                 :visible.sync="childForm.editForm"
                 :before-close="handleClose">
        <el-form label-position="right">
          <el-form-item :label="$t('tobacco.common.annual')">
            <el-input v-model="annual"
                      readonly />
          </el-form-item>
          <el-form-item :label="$t('xbasic.district.districtId')"
                        min-width="100px">
            <el-input v-model="formData.viewSelect.districtId"
                      readonly />
          </el-form-item>
          <el-form-item :label="$t('xbasic.district.name')"
                        min-width="100px">
            <el-input v-model="formData.viewSelect.name"
                      readonly />
          </el-form-item>
          <el-form-item :label="$t('xbasic.district.rename')"
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
const OrganizationForm = () => import("@/components/Organization");
import districtApi from "@/api/xbasic/apiDistrict";
export default {
  data() {
    return {
      childForm: {
        addForm: false,
        editForm: false,
        viewForm: false,
        isEdit: false
      },
      searchData: {
        districtId: "",
        annual: ""
      },
      formData: {
        districtList: [],
        pagination: {
          //用于分页的变量
          currentPage: 1,
          pageSize: 10,
          total: 0,
          keyword: "",
          pageSizeOpts: [10, 15, 20, 25, 30]
        },
        rowSelection: [],
        viewSelect: {}
      }
    };
  },
  created() {
    this.searchData.districtId = this.userDistrictId;
    this.searchData.annual = this.$store.state.system.annual + "";
  },
  components: {
    OrganizationForm
  },
  computed: {
    userDistrictId() {
      if (this.$store.state.user.detail.districtId === undefined) {
        return "0";
      } else {
        return this.$store.state.user.detail.districtId;
      }
    },
    annual() {
      return this.$store.state.system.annual;
    }
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
          Promise.all([districtApi.startOrStop(item.id, this.annual, 0)])
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
        districtApi.updateName(item.id, this.annual, this.formData.rename)
      ])
        .then(([response]) => {
          this.childForm.editForm = false;
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
    organizationOnchange(label, value, labels, values) {
      let codes = value.split("_");
      this.searchData.districtId = codes[codes.length - 1];
    },
    editButtonClick(selectRow) {
      this.formData.viewSelect = selectRow;
      this.childForm.editForm = true;
    },

    handleCurrentChange(val) {
      this.formData.selectRow = val;
    },
    async onSearchButtonClick() {
      let response = await districtApi.getAll({
        size: this.formData.pagination.pageSize,
        page: this.formData.pagination.currentPage - 1,
        sort: "id,asc",
        contains: "name,code,shortName:{keyword}:true".format({
          keyword: this.formData.pagination.keyword
        }),
        search: "annual:eq:{annual};code:rlike:{key}".format({
          key: this.searchData.districtId,
          annual: this.searchData.annual
        })
      });
      this.formData.districtList = response.content;
      this.formData.pagination.total = parseFloat(response.totalElements);
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
