<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-form-item :label="$t('tobacco.tmaterial.bill.deliveryOrganizationName')">

            <organization-form :root="userOrgId"
                               ref="deliveryOrganization"
                               style="width:100%"
                               :code.sync="searchData.deliveryOrganizationId" />
          </el-form-item>

          <el-form-item :label="$t('tobacco.tmaterial.bill.arriveOrganizationName')">
            <organization-form :root="userOrgId"
                               ref="arriveOrganization"
                               style="width:100%"
                               :code.sync="searchData.arriveOrganizationId" />
          </el-form-item>

        </el-form>
      </div>
      <div class='toolButton'
           style="min-width: 280px">
        <el-popover placement="bottom-start"
                    type='primary'
                    width="600"
                    trigger="click">
          <el-form :model="searchData"
                   class="cas-group cas-flex-2">
            <el-form-item :label="$t('tobacco.tmaterial.bill.date')"
                          style="width:100%">
              <el-date-picker v-model="searchData.date"
                              type="daterange"
                              align="right"
                              unlink-panels
                              range-separator="至"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期"
                              value-format='yyyy-MM-dd'
                              :picker-options="dateoptions">
              </el-date-picker>

            </el-form-item>
            <el-form-item :label="$t('tobacco.tmaterial.bill.serial')">
              <el-input v-bind:placeholder="$t('base.pleaseInput')"
                        v-model="searchData.serial"
                        @keyup.enter.native="onSearchButtonClick" />
            </el-form-item>
            <el-form-item :label="$t('tobacco.tmaterial.bill.sendBillSerial')">
              <el-input v-bind:placeholder="$t('base.pleaseInput')"
                        v-model="searchData.refBillBarcode"
                        @keyup.enter.native="onSearchButtonClick" />
            </el-form-item>

            <el-form-item :label="$t('tobacco.tmaterial.bill.control')">
              <el-select v-model="searchData.control"
                         clearable
                         :placeholder="$t('base.pleaseSelect')"
                         style="width: 100%">
                <el-option v-for="item in statusList"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>

            </el-form-item>

            <el-form-item :label="$t('base.keywords')"
                          style="width:100%">
              <el-input v-bind:placeholder="$t('base.ipKeywords')"
                        style="width:100%"
                        v-model="formData.pagination.keyword"
                        @keyup.enter.native="onSearchButtonClick" />
            </el-form-item>
            <el-form-item style="width:100%">
              <div style="float:right;margin-top: 10px;">
                <el-button @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }}</el-button>
                <el-button @click='onResetButtonClick'>{{ $t('base.buttonReset') }}</el-button>
              </div>
            </el-form-item>
          </el-form>
          <el-button plain
                     type='primary'
                     slot="reference">{{ $t('base.buttonFilter') }}</el-button>
        </el-popover>
        <el-button type='primary'
                   style="margin-left:3px"
                   plain
                   @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }} </el-button>
        <el-button type='primary'
                   style="margin-left:3px"
                   plain
                   @click='childForm.addForm=true'>{{ $t('base.buttonAdd') }} </el-button>
        <el-button type='danger'
                   style="margin-left:3px"
                   plain
                   v-if="formData.selectRow?formData.selectRow.control===0:false"
                   @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }} </el-button>
      </div>
    </div>
    <main class='contentPanel'>
      <el-table highlight-current-row
                border
                @current-change="handleCurrentChange"
                :data="formData.billList"
                style="width: 100%"
                :row-class-name="tableRowClassName">
        <el-table-column type="expand"
                         fixed="left">
          <template slot-scope="props">
            <el-form class="cas-group cas-flex-3">
              <el-form-item :label="$t('tobacco.tmaterial.bill.barcode')"
                            prop="deliver">
                {{props.row.barcode}}
              </el-form-item>
              <el-form-item :label="$t('tobacco.tmaterial.bill.author')"
                            prop="deliver">
                {{props.row.author}}
              </el-form-item>
              <el-form-item :label="$t('tobacco.tmaterial.bill.deliveryInfo')"
                            prop="deliver">
                {{props.row.deliveryInfo}}
              </el-form-item>
              <el-form-item :label="$t('tobacco.tmaterial.bill.arriveInfo')"
                            prop="deliver">
                {{props.row.arriveInfo}}
              </el-form-item>
              <el-form-item :label="$t('tobacco.tmaterial.bill.refBillBarcode')"
                            prop="deliver">
                {{props.row.refBillBarcode}}
              </el-form-item>
              <el-form-item :label="$t('tobacco.tmaterial.bill.refBillInfo')"
                            prop="deliver">
                {{props.row.refBillInfo}}
              </el-form-item>
              <el-form-item :label="$t('tobacco.tmaterial.bill.print')"
                            prop="deliver">
                {{props.row.print}}
              </el-form-item>
              <el-form-item :label="$t('tobacco.tmaterial.bill.itemCount')"
                            prop="deliver">
                {{props.row.itemCount}}
              </el-form-item>
              <el-form-item :label="$t('tobacco.tmaterial.bill.itemMoneys')"
                            prop="deliver">
                {{props.row.itemMoney}}
              </el-form-item>
              <el-form-item :label="$t('tobacco.tmaterial.bill.desc')"
                            prop="deliver">
                {{props.row.desc}}
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="serial"
                         width="200"
                         fixed="left"
                         show-overflow-tooltip
                         :label="this.$t('tobacco.tmaterial.bill.serial')" />
        <el-table-column prop="refBillSerial"
                         width="200"
                         fixed="left"
                         show-overflow-tooltip
                         :label="this.$t('tobacco.tmaterial.bill.receiveSerial')" />

        <el-table-column prop="date"
                         width="100"
                         :label="this.$t('tobacco.tmaterial.bill.date')">
          <template slot-scope="scope">
            {{scope.row.date|parseDate('yyyy-mm-dd')}}
          </template>
        </el-table-column>
        <el-table-column prop="deliveryOrganizationName"
                         :label="this.$t('tobacco.tmaterial.bill.deliveryOrganizationName')"
                         show-overflow-tooltip />
        <el-table-column :label="this.$t('tobacco.tmaterial.bill.deliveryWarehouse')"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.warehouse?scope.row.warehouse.name:''}}
          </template>
        </el-table-column>
        <el-table-column prop="arriveOrganizationName"
                         :label="this.$t('tobacco.tmaterial.bill.arriveOrganizationName')"
                         show-overflow-tooltip />

        <el-table-column prop="deliver"
                         :label="this.$t('tobacco.tmaterial.bill.deliver')"
                         show-overflow-tooltip />
        <el-table-column prop="accountPeriod"
                         width="100"
                         :label="this.$t('tobacco.tmaterial.bill.accountPeriod')" />
        <el-table-column prop="control"
                         width="60"
                         :label="this.$t('tobacco.tmaterial.bill.control')">
          <template slot-scope="scope">
            {{scope.row.control|capitalizeState}}
          </template>
        </el-table-column>
        <el-table-column fixed="right"
                         :label="$t('base.titleOperation')"
                         width="100">

          <template slot-scope="scope">
            <el-button @click="button.audit=false;onAuditClick(scope.row.id)"
                       type="text"
                       :disabled="scope.row.control>=5||!button.audit"
                       size="small">{{$t('tobacco.tmaterial.bill.buttonAudit')}}</el-button>
            <el-button type="text"
                       size="small"
                       :disabled="scope.row.control!==0"
                       @click="editButtonClick(scope.row,true)">{{$t('base.buttonEdit')}}</el-button>
          </template>
        </el-table-column>
      </el-table>

    </main>
    <transition name="fade"
                v-if="childForm.detailForm"
                enter-active-class="animated fadeInUp"
                leave-active-class="animated fadeOut"
                :duration="200">
      <div class="floatDetail">
        <nav>
          <a @click="childForm.detailForm=false">
            <el-tooltip class="item"
                        effect="dark"
                        content="点击隐藏"
                        placement="top-start">
              <span>物资明细</span>
            </el-tooltip>
          </a>
        </nav>
        <el-table border
                  :data="formData.billItemList"
                  class="subTable">

          <el-table-column prop="serial"
                           :label="this.$t('tobacco.tmaterial.billItem.serial')"
                           show-overflow-tooltip />

          <el-table-column prop="materialCode"
                           :label="this.$t('tobacco.tmaterial.billItem.materialCode')"
                           show-overflow-tooltip />
          <el-table-column prop="materialName"
                           :label="this.$t('tobacco.tmaterial.billItem.materialName')"
                           show-overflow-tooltip />

          <el-table-column prop="measureName"
                           :label="this.$t('tobacco.tmaterial.billItem.measureName')"
                           show-overflow-tooltip />
          <el-table-column prop="mfg"
                           :label="this.$t('tobacco.tmaterial.billItem.mfg')">
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
                           :label="this.$t('tobacco.tmaterial.billItem.exp')">
            <template slot-scope="scope">
              <span v-if=" scope.row.exp">
                {{ scope.row.exp|parseDate('yyyy-mm-dd') }}
              </span>
              <span v-else>
                不限
              </span>

            </template>
          </el-table-column>
          <el-table-column prop="price"
                           :label="this.$t('tobacco.tmaterial.billItem.price')" />

          <el-table-column prop="amount"
                           :label="this.$t('tobacco.tmaterial.billItem.amount')" />

          <el-table-column prop="money"
                           :label="this.$t('tobacco.tmaterial.billItem.money')" />

          <el-table-column fixed="right"
                           width="100">
            <template slot="header"
                      slot-scope="scope">
              <el-button size="small"
                         v-if="formData.selectRow?formData.selectRow.control<5:false"
                         @click="childForm.billItemForm=true">{{$t('tobacco.tmaterial.bill.buttonInsertDetail')}}
              </el-button>
            </template>
            <template slot-scope="scope">

              <el-button type="text"
                         size="small"
                         :disabled="formData.selectRow?formData.selectRow.control===5:true"
                         @click="onDeleteBillItemClick(scope.row)">{{$t('base.buttonDelete')}}</el-button>
            </template>
          </el-table-column>
        </el-table>

      </div>
    </transition>
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
                 v-el-drag-dialog
                 :visible.sync="childForm.addForm"
                 top="10px"
                 :before-close="handleClose">
        <add-form :operation='formData.operation' />
      </el-dialog>
      <el-dialog :title="$t('base.buttonEdit')"
                 v-el-drag-dialog
                 :visible.sync="childForm.editForm"
                 top="10px"
                 :before-close="handleClose">
        <edit-form :item.sync=formData.selectRow
                   :isEdit=childForm.isEdit
                   :operation='formData.operation'
                   :visible.sync="childForm.editForm" />
      </el-dialog>
      <el-dialog :title="$t('base.buttonView')"
                 v-el-drag-dialog
                 :visible.sync="childForm.viewForm"
                 top="10px"
                 :before-close="handleClose">
        <edit-form :item=formData.selectRow
                   :isEdit=childForm.isEdit
                   :visible.sync="childForm.viewForm" />
      </el-dialog>
      <el-dialog :title="$t('tobacco.tmaterial.bill.buttonInsertDetail')"
                 v-el-drag-dialog
                 :visible.sync="childForm.billItemForm"
                 top="10px"
                 :before-close="handleClose">
        <bill-item-add :master=formData.selectRow
                       :visible.sync="childForm.billItemForm" />
      </el-dialog>
    </template>
  </div>
</template>
<script>
const AddForm = () => import("./billSharedOutAdd.vue");
const EditForm = () => import("./billSharedOutEdit.vue");
import animate from "animate.css";
import elDragDialog from "@/directive/el-dragDialog"; // base on element-ui
import billApi from "../../api/tmaterial/apiBillOut";
import billItemApi from "../../api/tmaterial/apiBillItem";
const status = [
  { value: 0, label: "编辑" },
  { value: 5, label: "记账" },
  { value: 7, label: "作废" }
];
export default {
  directives: { elDragDialog },
  filters: {
    capitalizeState: function(value) {
      let item = status.find(it => {
        return it.value === value;
      });
      return item ? item.label : "";
    }
  },
  data() {
    return {
      statusList: status,
      childForm: {
        addForm: false,
        editForm: false,
        viewForm: false,
        isEdit: false,
        detailForm: false,
        billItemForm: false
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
      searchData: this.createSerachData(),
      formData: this.createFormData(),
      button: {
        audit: true
      }
    };
  },
  created() {
    this.resetData();
  },
  components: {
    OrganizationForm: () => import("@/components/Organization"),
    "add-form": AddForm,
    "edit-form": EditForm,
    billItemAdd: () => import("./billSharedOutItemAdd.vue")
  },
  computed: {
    userOrgId() {
      if (this.$store.state.user.organization === undefined) {
        this.searchData.organizationId = undefined;
        this.searchData.deliveryOrganizationId = undefined;
        return undefined;
      } else {
        this.searchData.organizationId = this.$store.state.user.organization.organizationId;
        this.searchData.deliveryOrganizationId = this.$store.state.user.organization.organizationId;
        return this.$store.state.user.organization.organizationId;
      }
    }
  },
  watch: {
    $route(to, from) {
      if (
        to.meta.file !== undefined &&
        to.meta.file.indexOf("billSharedOutList") !== -1
      ) {
        //   console.log(to.meta.file);
        this.resetData();
      }
    }
  },
  methods: {
    onAuditClick(billId) {
      this.$confirm(
        "数据记账后，将计入库存，且不可修改，是否继续？",
        "记账确认",
        {
          confirmButtonText: this.$t("base.buttonOk"),
          cancelButtonText: this.$t("base.buttonCancel"),
          type: "warning"
        }
      )
        .then(() => {
          Promise.all([billApi.auditMove(billId, this.$route.query.refop)])
            .then(([response]) => {
              this.$message({
                type: "info",
                message: "审核成功"
              });
              this.formData.selectRow = null;
              this.onSearchButtonClick();
            })
            .catch(error => {
              console.log(error);
              this.$message({
                type: "info",
                message: error.message
              });
            })
            .finally(() => {
              this.button.audit = true;
            });
        })
        .catch(error => {
          console.log(error);
          this.button.audit = true;
          this.$message({
            type: "info",
            message: this.$t("message.cancel")
          });
        });
    },
    onDeleteBillItemClick(row) {
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
          Promise.all([billItemApi.softDelete(row.id)])
            .then(([response]) => {
              this.$message({
                type: "info",
                message: this.$t("message.deleteOk")
              });
              this.handleCurrentChange(row);
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

      Promise.all([billApi.softDelete(this.formData.selectRow.id)])
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
      if (val !== undefined && val !== null) {
        this.formData.selectRow = val;
        this.childForm.detailForm = true;
        Promise.all([
          billItemApi.getAll({
            size: 500,
            page: 0,
            sort: "serial,desc",
            search: "billId:eq:" + val.id
          })
        ])
          .then(([response]) => {
            this.formData.billItemList = response.content;
          })
          .catch(error => {});
      } else {
        this.childForm.detailForm = false;
      }
    },
    onSearchButtonClick() {
      this.childForm.detailForm = false;
      if (
        this.searchData.organizationId === undefined ||
        this.searchData.organizationId === null ||
        this.searchData.organizationId === ""
      ) {
        this.$notify({
          title: this.$t("base.warn"),
          message: "未获取到组织单位信息",
          duration: 1000,
          type: "warning",
          position: "bottom-right"
        });
        return;
      }
      let search = "organization.organizationId:like:{orgid};operation:eq:{operation}".format(
        {
          orgid: this.searchData.organizationId,
          operation: this.formData.operation
        }
      );
      if (
        this.searchData.deliveryOrganizationId !== undefined &&
        this.searchData.deliveryOrganizationId !== null &&
        this.searchData.deliveryOrganizationId !== ""
      ) {
        search +=
          ";deliveryOrganizationId:like:" +
          this.searchData.deliveryOrganizationId;
      }

      if (
        this.searchData.arriveOrganizationId !== undefined &&
        this.searchData.arriveOrganizationId !== null &&
        this.searchData.arriveOrganizationId !== ""
      ) {
        search +=
          ";arriveOrganizationId:eq:" + this.searchData.arriveOrganizationId;
      }

      if (
        this.searchData.date !== undefined &&
        this.searchData.date.length === 2
      ) {
        search +=
          ";date:BETWEEN:" +
          this.searchData.date[0] +
          "," +
          this.searchData.date[1];
      }
      if (
        this.searchData.serial !== undefined &&
        this.searchData.serial !== null &&
        this.searchData.serial !== ""
      ) {
        search += ";serial:eq:" + this.searchData.serial;
      }
      if (
        this.searchData.refBillBarcode !== undefined &&
        this.searchData.refBillBarcode !== null &&
        this.searchData.refBillBarcode !== ""
      ) {
        search += ";refBillBarcode:eq:" + this.searchData.refBillBarcode;
      }

      if (this.searchData.control !== "-" && this.searchData.control !== "") {
        search += ";control:eq:" + this.searchData.control;
      }

      Promise.all([
        billApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          sort: "serial,desc",
          contains: "serial,barcode,title,author,operation,deliveryOrganizationName,deliveryInfo,arriveOrganizationName,arriveInfo,deliver,refBillSerial,refBillBarcode,refBillInfo,desc,:{keyword}:true".format(
            { keyword: this.formData.pagination.keyword }
          ),
          search: search
        })
      ])
        .then(([response]) => {
          this.formData.billList = response.content;
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
    },
    onResetButtonClick() {
      //重置数据
    },
    resetData() {
      this.formData = this.createFormData();
      this.searchData = this.createSerachData();
      if (this.$refs.deliveryOrganization !== undefined)
        this.$refs.deliveryOrganization.clear();
      if (this.$refs.arriveOrganization !== undefined)
        this.$refs.arriveOrganization.clear();
      this.formData.operation = this.$route.query.operation;
      this.formData.title = this.$route.query.title;
      this.formData.balance = this.$route.query.balance;
    },
    createFormData() {
      return {
        operation: "",
        title: "",
        balance: "",
        billList: [],
        billItemList: [],
        pagination: {
          //用于分页的变量
          currentPage: 1,
          pageSize: 10,
          total: 0,
          keyword: "",
          pageSizeOpts: [10, 15, 20, 25, 30]
        },
        rowSelection: [],
        selectRow: {}
      };
    },
    createSerachData() {
      return {
        organizationId: "",
        serial: "",
        barcode: "",
        author: "",
        date: [],
        operation: "",
        deliveryOrganizationId: "",
        deliveryOrganizationName: "",
        deliveryInfo: "",
        arriveOrganizationId: "",
        arriveOrganizationName: "",
        deliver: "",
        refBillId: "",
        refBillSerial: "",
        refBillBarcode: "",
        control: "",
        desc: ""
      };
    }
  }
};
</script>
<style scoped>
.floatDetail {
  height: 200px;
  position: absolute;
  bottom: 37px;
  left: 210px;
  z-index: 999;
  width: calc(100% - 220px);
}

nav > a {
  position: relative;
  display: inline-block;
  padding: 0.3em 1em 0;
}
nav > a::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  background: #e6e6e6;
  background-image: linear-gradient(
    hsla(0, 0%, 100%, 0.6),
    hsla(0, 0%, 100%, 0)
  );
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-bottom: none;
  border-radius: 0.5em 0.5em 0 0;
  transform: perspective(0.5em) rotateX(5deg);
  transform-origin: left;
}
.subTable {
  width: 100%;
  background: #f7f7f7;
  overflow-y: scroll;
  height: 180px;
  overflow: auto;
}
</style>
