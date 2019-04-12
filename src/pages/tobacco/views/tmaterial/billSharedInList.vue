<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>

          <el-form-item :label="$t('tobacco.tmaterial.bill.arriveOrganizationName')">
            <organization-form :root="userOrgId"
                               ref='arriveOrganization'
                               style="width:300px !important;"
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
              <el-form-item label="单据号"
                            prop="barcode">
                {{props.row.barcode}}
              </el-form-item>
              <el-form-item :label="$t('tobacco.tmaterial.bill.author')"
                            prop="author">
                {{props.row.author}}
              </el-form-item>
              <el-form-item :label="$t('tobacco.tmaterial.bill.deliveryInfo')"
                            prop="deliveryInfo">
                {{props.row.deliveryInfo}}
              </el-form-item>
              <el-form-item :label="$t('tobacco.tmaterial.bill.arriveInfo')"
                            prop="arriveInfo">
                {{props.row.arriveInfo}}
              </el-form-item>
              <el-form-item label="发货单号"
                            prop="refBillBarcode">
                {{props.row.refBillBarcode}}
              </el-form-item>
              <el-form-item :label="$t('tobacco.tmaterial.bill.refBillInfo')"
                            prop="refBillInfo">
                {{props.row.refBillInfo}}
              </el-form-item>
              <el-form-item :label="$t('tobacco.tmaterial.bill.print')"
                            prop="print">
                {{props.row.print}}
              </el-form-item>
              <el-form-item :label="$t('tobacco.tmaterial.bill.itemCount')"
                            prop="itemCount">
                {{props.row.itemCount}}
              </el-form-item>
              <el-form-item :label="$t('tobacco.tmaterial.bill.itemMoneys')"
                            prop="itemMoneys">
                {{props.row.itemMoney}}
              </el-form-item>
              <el-form-item :label="$t('tobacco.tmaterial.bill.desc')"
                            prop="desc">
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
        <el-table-column prop="annual"
                         width="60"
                         :label="this.$t('tobacco.tmaterial.bill.year')" />
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
        <el-table-column prop="arriveOrganizationName"
                         :label="this.$t('tobacco.tmaterial.bill.arriveOrganizationName')"
                         show-overflow-tooltip />
        <el-table-column :label="this.$t('tobacco.tmaterial.bill.arriveWarehouse')"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.warehouse?scope.row.warehouse.name:''}}
          </template>
        </el-table-column>

        <el-table-column prop="deliver"
                         :label="this.$t('tobacco.tmaterial.bill.deliver')"
                         show-overflow-tooltip />
        <el-table-column prop="accountPeriod"
                         width="100"
                         :label="this.$t('tobacco.tmaterial.bill.accountPeriod')" />
        <el-table-column prop="control"
                         width="100"
                         :label="this.$t('tobacco.tmaterial.bill.control')">
          <template slot-scope="scope">
            {{scope.row.control|capitalizeState}}
          </template>
        </el-table-column>
        <el-table-column fixed="right"
                         :label="$t('base.titleOperation')"
                         width="160">

          <template slot-scope="scope">
            <el-button @click="onConfirmShow(scope.row)"
                       type="text"
                       :disabled="scope.row.control!==0||!button.audit"
                       size="small">确认到货</el-button>
            <el-button @click="button.audit=false;onAuditClick(scope.row.id)"
                       type="text"
                       :disabled="scope.row.control !== 1||!button.audit"
                       size="small">{{$t('tobacco.tmaterial.bill.buttonAudit')}}</el-button>
          </template>
        </el-table-column>
      </el-table>

    </main>
    <template>
      <el-dialog :title="this.formData.title"
                 v-el-drag-dialog
                 :visible.sync="confirmVisible"
                 top="20px"
                 :before-close="handleClose">

        <el-form :model="formData.billIn"
                 :rules="ruleValidate"
                 ref="formValidate"
                 style="minHeight:400px">
          <el-form-item label="到货仓库"
                        prop="warehouse"
                        label-width="80px">
            <el-select v-model="formData.billIn.warehouse"
                       @change="selectChange"
                       style="width:100%">
              <el-option v-for="warehouse in  formData.warehouseList"
                         :key="warehouse.id"
                         :label="warehouse.name"
                         :value="warehouse.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-table border
                    :data="formData.billItemOutInList">

            <el-table-column prop="materialCode"
                             :label="this.$t('tobacco.tmaterial.billItem.materialCode')"
                             show-overflow-tooltip />

            <el-table-column prop="materialName"
                             width="200px"
                             :label="this.$t('tobacco.tmaterial.billItem.materialName')"
                             show-overflow-tooltip />

            <el-table-column prop="measureName"
                             width="80"
                             :label="this.$t('tobacco.tmaterial.billItem.measureName')"
                             show-overflow-tooltip />
            <el-table-column prop="mfg"
                             width="100"
                             :label="this.$t('tobacco.tmaterial.billItem.mfg')">
              <template slot-scope="scope">
                <span v-if=" scope.row.mfg">
                  {{ scope.row.mfg|parseDate('yyyy-mm-dd') }}
                </span>
                <span v-else>
                  无
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="exp"
                             width="100"
                             :label="this.$t('tobacco.tmaterial.billItem.exp')">
              <template slot-scope="scope">
                <span v-if=" scope.row.exp">
                  {{ scope.row.exp|parseDate('yyyy-mm-dd') }}
                </span>
                <span v-else>
                  长期有效
                </span>

              </template>
            </el-table-column>

            <el-table-column prop="amount"
                             width="80"
                             label="发货数量" />

            <el-table-column prop="amountIn"
                             width="120"
                             label="到货数量">
              <template slot-scope="scope">
                <el-input-number controls-position="right"
                                 size="mini"
                                 style="width:100px"
                                 v-model="scope.row.amountIn">
                </el-input-number>

              </template>
            </el-table-column>

            <el-table-column prop="desc"
                             width="150"
                             label="备注说明">
              <template slot-scope="scope">
                <el-input v-model="scope.row.desc"
                          autosize
                          type="textarea">
                </el-input>
              </template>
            </el-table-column>

          </el-table>

        </el-form>

        <div slot="footer"
             class="dialog-footer">
          <el-button @click="confirmVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="onSubmitClick('formValidate')">确 定</el-button>
        </div>

      </el-dialog>
    </template>
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
          <el-table-column prop="amount"
                           :label="this.$t('tobacco.tmaterial.billItem.amount')" />

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
const AddForm = () => import("./billSharedInAdd.vue");
const EditForm = () => import("./billInEdit.vue");
import animate from "animate.css";
import elDragDialog from "@/directive/el-dragDialog"; // base on element-ui
import billApi from "../../api/tmaterial/apiBillIn";
import billItemApi from "../../api/tmaterial/apiBillItem";
import warehouseApi from "../../api/tmaterial/apiWarehouse";
import moment from "moment";
import { convertToObject } from "typescript";
import UUID from "es6-uuid";
const status = [
  { value: 0, label: "未确认到货" },
  { value: 1, label: "确认未记账" },
  { value: 5, label: "记账" },
  { value: 7, label: "作废" }
];
export default {
  directives: { elDragDialog },
  filters: {
    capitalizeState: function (value) {
      let item = status.find(it => {
        return it.value === value;
      });
      return item ? item.label : "";
    }
  },
  data () {
    return {
      statusList: status,
      confirmVisible: false,
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
      searchData: this.created,
      ruleValidate: {
        warehouse: [
          { required: true, message: "到货仓库不能为空!", trigger: "blur" }
        ]
      },
      formData: this.createFormData(),
      button: {
        audit: true
      }
    };
  },
  created () {
    this.resetData();
  },
  components: {
    OrganizationForm: () => import("@/components/Organization"),
    "add-form": AddForm,
    "edit-form": EditForm,
    billItemAdd: () => import("./billItemAdd.vue")
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
  },
  watch: {
    $route (to, from) {
      if (
        to.meta.file !== undefined &&
        to.meta.file.indexOf("billSharedInList") !== -1
      ) {
        // console.log(to.meta.file);
        this.resetData();
      }
    }
  },
  methods: {
    onSubmitClick (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.formData.billItemList = [];
          for (let i = 0; i < this.formData.billItemOutInList.length; i++) {
            let item = this.formData.billItemOutInList[i];
            item.id = UUID(32, 36);
            item.billId = this.formData.billIn.id;
            let amount = item.amountIn;
            item.amount = amount;
            item.amountUnit = amount;
            item.exp =
              item.exp == null
                ? item.exp
                : moment(item.exp).format("YYYY-MM-DD");
            item.mfg =
              item.mfg == null
                ? item.mfg
                : moment(item.mfg).format("YYYY-MM-DD");
            delete item.amountIn;

            this.formData.billItemList.push(item);
          }
          Object.assign(
            this.formData.billIn,
            this.formData.billIn.organization
          );

          this.formData.billIn.author = this.$store.state.user.userName;
          this.formData.billIn.arriveInfo = this.$store.state.user.userName;
          this.formData.billIn.date = moment().format("YYYY-MM-DD");
          this.formData.billIn.title = "调剂入库";
          this.formData.billIn.control = 1; //已确认未记账

          console.log(this.formData.billIn);
          console.log(this.formData.billItemList);

          Promise.all([
            billApi.saveAll(this.formData.billIn, this.formData.billItemList)
          ])
            .then(([response]) => {
              this.$message({
                message: "保存成功!",
                type: "info"
              });

              this.confirmVisible = false;
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
    selectChange (value) {
      var warehouse = this.formData.warehouseList.find(item => {
        return item.id === value;
      });
      this.formData.billIn.accountPeriod = warehouse.currentYearMonth;
      this.formData.billIn.warehouse = warehouse.id;
    },
    onConfirmShow (row) {
      this.formData.billIn = row;
      this.confirmVisible = true;
      Promise.all([
        billItemApi.getAll({
          size: 500,
          page: 0,
          sort: "serial,desc",
          search: "billId:eq:" + row.refBillId
        }),
        warehouseApi.getAll({
          size: 100,
          page: 0,
          sort: "organization.organizationId,asc",
          search: "organization.organizationId:eq:" + row.arriveOrganizationId
        })
      ])
        .then(([response, warehouseResponse]) => {
          this.formData.warehouseList = warehouseResponse.content;
          let outList = response.content;
          this.formData.billItemOutInList = [];
          for (let i = 0; i < outList.length; i++) {
            let itemIn = outList[i];
            let amountIn = itemIn.amount;
            itemIn.amountIn = amountIn; //添加属性amountIn
            this.formData.billItemOutInList.push(itemIn);
          }
        })
        .catch(error => { });
    },
    onAuditClick (billId) {
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
          Promise.all([billApi.audit(billId)])
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
    onDeleteBillItemClick (row) {
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
            .catch(error => { });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$t("message.cancel")
          });
        });
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

      Promise.all([billApi.softDelete(this.formData.selectRow.id)])
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
          .catch(error => { });
      } else {
        this.childForm.detailForm = false;
      }
    },
    onSearchButtonClick () {
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
          ";arriveOrganizationId:like:" + this.searchData.arriveOrganizationId;
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
      this.childForm.editForm = false;
      this.onSearchButtonClick();
      done();
    },
    onResetButtonClick () {
      //重置数据
    },
    resetData () {
      this.formData = this.createFormData();
      this.searchData = this.createSerachData();
      if (this.$refs.arriveOrganization !== undefined)
        this.$refs.arriveOrganization.clear();
      this.formData.operation = this.$route.query.operation;
      this.formData.title = this.$route.query.title;
      this.formData.balance = this.$route.query.balance;
    },
    createFormData () {
      return {
        operation: "",
        title: "",
        balance: "",
        billIn: {},
        warehouseList: [],
        billList: [],
        billItemList: [],
        billItemOutList: [],
        billItemOutInList: [],
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
    createSerachData () {
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

nav::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  filter: blur(10px) contrast(0.8);
  z-index: -1;
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
