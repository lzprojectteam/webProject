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
                               style="width:250px !important"
                               :code.sync="searchData.organizationId"
                               @onchange="onSelectChanged" />
          </el-form-item>

          <el-form-item label="所属仓库">
            <el-select v-model="searchData.warehouseId"
                       style="width:250px !important">
              <el-option v-for="warehouse in  formData.warehouseList"
                         :key="warehouse.id"
                         :label="warehouse.name"
                         :value="warehouse.id">
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
        <el-button type='primary'
                   plain
                   @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }} </el-button>

      </div>
    </div>
    <main class='contentPanel'>
      <el-table highlight-current-row
                border
                @current-change="handleCurrentChange"
                :data="formData.stockList"
                style="width: 100%"
                :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="organization"
                         show-overflow-tooltip
                         :label="this.$t('tobacco.common.organization')">
          <template slot-scope="scope">
            {{scope.row.organization?scope.row.organization.organizationName:''}}
          </template>
        </el-table-column>
        <el-table-column prop="warehouse"
                         show-overflow-tooltip
                         :label="this.$t('tobacco.tmaterial.stock.warehouse')">
          <template slot-scope="scope">
            {{scope.row.warehouse?scope.row.warehouse.name:''}}
          </template>
        </el-table-column>
        <el-table-column prop="material.name"
                         show-overflow-tooltip
                         :label="this.$t('tobacco.tmaterial.stock.material')">
          <template slot-scope="scope">
            {{scope.row.material?scope.row.material.name:''}}
          </template>
        </el-table-column>
        <el-table-column prop="mfg"
                         :label="this.$t('tobacco.tmaterial.stock.mfg')">
          <template slot-scope="scope">
            <span v-if=" scope.row.mfg">
              {{ scope.row.mfg|parseDate('yyyy-mm-dd') }}
            </span>
            <span v-else>
              未设置
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="exp"
                         :label="this.$t('tobacco.tmaterial.stock.exp')">
          <template slot-scope="scope">
            <span v-if=" scope.row.exp">
              {{ scope.row.exp|parseDate('yyyy-mm-dd') }}
            </span>
            <span v-else>
              不限
            </span>

          </template>
        </el-table-column>
        <el-table-column prop="initialAmount"
                         :label="this.$t('tobacco.tmaterial.stock.initialAmount')" />

        <el-table-column prop="currentAmount"
                         :label="this.$t('tobacco.tmaterial.stock.currentAmount')" />

        <el-table-column prop="control"
                         v-if="false"
                         :label="this.$t('tobacco.tmaterial.stock.control')" />
        <el-table-column prop="desc"
                         :label="this.$t('tobacco.tmaterial.stock.desc')" />

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
      <el-dialog :title="$t('base.buttonAdd')"
                 :visible.sync="childForm.initForm"
                 top="10px"
                 :before-close="handleClose">
        <init-form />
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
const AddForm = () => import("./stockAdd.vue");
const InitForm = () => import("./stockInit.vue");
const EditForm = () => import("./stockEdit.vue");
import stockApi from "../../api/tmaterial/apiStock";
import warehouseApi from "../../api/tmaterial/apiWarehouse";
export default {
  data () {
    return {
      childForm: {
        addForm: false,
        initForm: false,
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

            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: this.$t("base.threeMonth"),
            onClick (picker) {
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
        warehouseId: "",
        yearMonth: "",
        initialAmount: 0,
        initialAmountUnit: 0,
        currentAmount: 0,
        currentAmountUnit: 0,
        control: 0,
        desc: ""
      },
      formData: {
        stockList: [],
        warehouseList: [],
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

  created () { },
  components: {
    "add-form": AddForm,
    "edit-form": EditForm,
    "init-form": InitForm,
    OrganizationForm: () => import("@/components/Organization")
  },
  methods: {
    onSelectChanged (label, value) {
      this.formData.warehouseList = [];
      let search = "organization.organizationId:eq:{orgid};control:eq:5".format(
        {
          orgid: value
        }
      );
      Promise.all([
        warehouseApi.getAll({
          size: 500,
          page: 0,
          sort: "code,asc",
          search: search
        })
      ])
        .then(([response]) => {
          this.formData.warehouseList = [];
          this.formData.warehouseList = response.content;
          if (response.content.length > 0) {
            this.searchData.warehouseId = this.formData.warehouseList[0].id;
          }
        })
        .catch(error => { });
    },
    editButtonClick (selectRow, isEdit) {
      this.formData.viewSelect = selectRow;
      if (isEdit) {
        this.childForm.editForm = true;
      } else {
        this.childForm.viewForm = true;
      }
      this.childForm.isEdit = isEdit;
    },
    deleteButtonClick () {
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

      Promise.all([stockApi.softDelete(this.formData.selectRow.id)])
        .then(([response]) => {
          this.$message({
            type: "info",
            message: this.$t("message.deleteOk")
          });
          this.formData.selectRow = null;
          this.onSearchButtonClick();
        })
        .catch(error => { });
    },
    deleteButtonConfirm () {
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
    handleCurrentChange (val) {
      this.formData.selectRow = val;
    },
    onSearchButtonClick () {
      Promise.all([
        stockApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          contains: "initialAmount,initialAmountUnit,currentAmount,control,desc,:{keyword}:true".format(
            { keyword: this.formData.pagination.keyword }
          ),
          search:
            "organization.organizationId:like:" + this.searchData.organizationId + ";warehouse.id:eq:" + this.searchData.warehouseId
        })
      ])
        .then(([response]) => {
          this.formData.stockList = response.content;
          this.formData.pagination.total = parseFloat(response.totalElements);
          this.$notify({
            title: this.$t("base.hint"),
            message: this.$t("base.loadingDone"),
            duration: 1000,
            position: "bottom-right"
          });
        })
        .catch(error => { });
    },

    onPageChange (index) {
      if (this.formData.pagination.currentPage !== index) {
        this.formData.pagination.currentPage = index;
        this.onSearchButtonClick();
      }
    },
    onPageSizeChange (size) {
      if (this.formData.pagination.pageSize !== size) {
        this.formData.pagination.pageSize = size;
        this.onSearchButtonClick();
      }
    },
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "warning-row";
      } else {
        return "success-row";
      }
    },
    handleClose (done) {
      this.childForm.addForm = false;
      this.childForm.initForm = false;
      this.childForm.editForm = false;
      this.onSearchButtonClick();
      done();
    }
  },
  computed: {
    userOrgId () {
      if (this.$store.state.user.organization === undefined) {
        this.searchData.organizationId = undefined;
        return undefined;
      } else {
        this.searchData.organizationId = this.$store.state.user.organization.organizationId;
        return this.$store.state.user.organization.organizationId;
      }
    }
  }
};
</script>