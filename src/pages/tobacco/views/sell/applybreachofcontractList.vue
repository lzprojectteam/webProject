<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
            <organization-form :root="userOrgId"
                               @onchange="organizationOnchange" />
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
                     @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }}</el-button>
          <el-button type='primary'
                     @click='childForm.addForm=true'>{{ $t('base.buttonAdd') }}</el-button>
          <el-button type='primary'
                     @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }}</el-button>
        </el-button-group>
      </div>
    </div>
    <main class='contentPanel'>
      <el-table highlight-current-row
                border
                @current-change="handleCurrentChange"
                :data="formData.applybreachofcontractList"
                style="width: 100%"
                :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="organization.organizationName"
                         :label="this.$t('org.organizationName')"
                         width="100"
                         show-overflow-tooltip />
        <el-table-column prop="applyPerson"
                         :label="this.$t('tobacco.tsell.applybreachofcontract.applyPerson')"
                         width="100"
                         show-overflow-tooltip />
        <el-table-column prop="applyDate"
                         :label="this.$t('tobacco.tsell.applybreachofcontract.applyDate')"
                         width="100"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            {{dateFormat(scope.row.applyDate,'yyyy-mm-dd')}}
          </template>

        </el-table-column>
        <el-table-column prop="contractNumber"
                         :label="this.$t('tobacco.tsell.applybreachofcontract.contractNumber')"
                         width="100"
                         show-overflow-tooltip />
        <!--  <el-table-column prop="contractyNo" :label="this.$t('tobacco.tsell.applybreachofcontract.contractyNo')"
                           width="100"
                           show-overflow-tooltip/>-->
        <el-table-column prop="farmerName"
                         :label="this.$t('tobacco.tsell.applybreachofcontract.farmerName')"
                         width="100"
                         show-overflow-tooltip />
        <el-table-column prop="recoveryDate"
                         :label="this.$t('tobacco.tsell.applybreachofcontract.recoveryDate')"
                         width="100"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            {{dateFormat(scope.row.recoveryDate,'yyyy-mm-dd')}}
          </template>
        </el-table-column>
        <el-table-column prop="applyExplain"
                         :label="this.$t('tobacco.tsell.applybreachofcontract.applyExplain')"
                         width="100"
                         show-overflow-tooltip />
        <el-table-column prop="examinePerson"
                         :label="this.$t('tobacco.tsell.applybreachofcontract.examinePerson')"
                         width="100"
                         show-overflow-tooltip />
        <el-table-column prop="examineDate"
                         :label="this.$t('tobacco.tsell.applybreachofcontract.examineDate')"
                         width="100"
                         show-overflow-tooltip />
        <el-table-column prop="examineSuggestion"
                         :label="this.$t('tobacco.tsell.applybreachofcontract.examineSuggestion')"
                         width="100"
                         show-overflow-tooltip />
        <el-table-column prop="control.name"
                         :label="this.$t('tobacco.tsell.applybreachofcontract.control')"
                         width="100"
                         show-overflow-tooltip />
        <el-table-column prop="desc"
                         :label="this.$t('tobacco.tsell.applybreachofcontract.desc')"
                         show-overflow-tooltip />
        <el-table-column fixed="right"
                         :label="$t('base.titleOperation')"
                         width="150">
          <template slot-scope="scope">
            <el-button @click="editButtonClick(scope.row,false)"
                       type="text"
                       size="small">{{$t('base.buttonView')}}
            </el-button>
            <el-button type="text"
                       size="small"
                       @click="editButtonClick(scope.row,true)"
                       :disabled="scope.row.control.id !== 'SG_A01'">{{$t('base.buttonEdit')}}
            </el-button>
            <el-button type="text"
                       size="small"
                       @click="applyButtonClick(scope.row,true)"
                       :disabled="scope.row.control.id !== 'SG_A01'">申请
            </el-button>
            <!--  <el-button type="text" size="small" @click="reviewButtonClick(scope.row,true)"
                         :disabled="checkDisable(scope.row)">审核
              </el-button>-->
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
                   :visible.sync="childForm.editForm"
                   @refresh="onSearchButtonClick" />
      </el-dialog>
      <el-dialog :title="$t('base.buttonView')"
                 :visible.sync="childForm.viewForm"
                 top="10px"
                 :before-close="handleClose">
        <edit-form :item=formData.viewSelect
                   :isEdit=childForm.isEdit
                   :visible.sync="childForm.viewForm" />
      </el-dialog>
      <el-dialog title="审核"
                 :visible.sync="childForm.reviewForm"
                 top="10px"
                 :before-close="handleClose">
        <review-form :item=formData.viewSelect
                     :visible.sync="childForm.reviewForm" />
      </el-dialog>
    </template>
  </div>
</template>
<script>
const AddForm = () => import("./applybreachofcontractAdd.vue");
const EditForm = () => import("./applybreachofcontractEdit.vue");
const OrganizationForm = () => import("@/components/Organization");

import applybreachofcontractApi from "../../api/tsell/api_applybreachofcontract";

export default {
  data() {
    return {
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
      searchData: {
        organizationId: this.$store.state.user.organization.organizationId
      },
      formData: {
        applybreachofcontractList: [],
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
  created() {
    console.log(this.$store.state);
    this.onSearchButtonClick();
  },
  components: {
    "add-form": AddForm,
    "edit-form": EditForm,
    OrganizationForm
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
  methods: {
    checkDisable(row) {
      if (row.control.id === "SG_A02") {
        return false;
      } else {
        return true;
      }
    },
    organizationOnchange(label, value, values) {
      this.searchData.organizationId = value;
      this.searchData.organizationCode = value;
      this.searchData.organizationName = label;
      this.searchData.organizationOrder = "0";
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
    //提交申请事件
    applyButtonClick(row) {
      let temp = {};
      temp = JSON.parse(JSON.stringify(row));
      temp.control = "SG_A02";
      temp.organizationId = temp.organization.organizationId;
      temp.organizationCode = temp.organization.organizationId;
      temp.organizationName = temp.organization.organizationName;
      temp.organizationOrder = temp.organization.organizationOrder;
      Promise.all([
        applybreachofcontractApi.updateApplybreachofcontract(temp.id, temp)
      ])
        .then(([response]) => {
          this.$message({
            message: "申请提交成功",
            type: "success"
          });
          this.onSearchButtonClick();
        })
        .catch(error => {
          console.log(error);
        });
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
      if (this.formData.selectRow.control.id !== "SG_A01") {
        this.$message({
          message: this.$t("message.cantDelete"),
          type: "error"
        });
        return;
      }
      Promise.all([
        applybreachofcontractApi.deleteApplybreachofcontract(
          this.formData.selectRow.id
        )
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
        applybreachofcontractApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          contains: "applyPerson,applyDate,farmerName,applyExplain,examinePerson,examineSuggestion,desc:{keyword}:true".format(
            { keyword: this.formData.pagination.keyword }
          ),
          search: "organization.organizationId:rlike:{orgid};".format({
            orgid: this.searchData.organizationId
          })
        })
      ])
        .then(([response]) => {
          this.formData.applybreachofcontractList = response.content;
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
  }
};
</script>
