<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <transition name="slide-fade">
    <add-stock v-if="childForm.stockForm"
               :master="formData.selectRow"
               :visible.sync="childForm.stockForm" />
    <div class='mainPanel'
         v-else>
      <div class='toolPanel'>
        <div class='queryCriteria'>
          <el-form inline>
            <el-form-item :label="$t('tobacco.common.organization')">
              <organization-form :root="userOrgId"
                                 style="width:100%"
                                 :code.sync="searchData.organizationId" />
            </el-form-item>

            <el-form-item :label="$t('tobacco.tmaterial.warehouse.control')">

              <el-select clearable
                         v-model="searchData.control"
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
            <el-button plain
                       @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }} </el-button>
            <el-button plain
                       @click='childForm.addForm=true'>{{ $t('base.buttonAdd') }} </el-button>
            <el-button plain
                       @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }} </el-button>
          </el-button-group>
        </div>
      </div>
      <main class='contentPanel'>
        <el-table highlight-current-row
                  border
                  @current-change="handleCurrentChange"
                  :data="formData.warehouseList"
                  style="width: 100%"
                  :row-class-name="tableRowClassName">
          <el-table-column type="index">
          </el-table-column>
          <el-table-column prop="code"
                           :label="this.$t('tobacco.tmaterial.warehouse.code')" />
          <el-table-column prop="serial"
                           :label="this.$t('tobacco.tmaterial.warehouse.serial')" />
          <el-table-column prop="name"
                           :label="this.$t('tobacco.tmaterial.warehouse.name')" />
          <el-table-column prop="keeper"
                           :label="this.$t('tobacco.tmaterial.warehouse.keeper')" />
          <el-table-column prop="tel"
                           :label="this.$t('tobacco.tmaterial.warehouse.tel')" />
          <el-table-column prop="address"
                           :label="this.$t('tobacco.tmaterial.warehouse.address')" />
          <el-table-column prop="control"
                           :label="this.$t('tobacco.tmaterial.warehouse.control')">
            <template slot-scope="scope">
              {{scope.row.control|capitalizeState}}
            </template>
          </el-table-column>
          <el-table-column prop="desc"
                           :label="this.$t('tobacco.tmaterial.warehouse.desc')" />
          <el-table-column fixed="right"
                           :label="$t('base.titleOperation')"
                           width="200">
            <template slot-scope="scope">
              <el-button type="text"
                         :disabled="scope.row.control!==1"
                         @click="initButtonClick(scope.row)"
                         size="small">{{$t('tobacco.tmaterial.warehouse.btnInit')}}</el-button>
              <el-button type="text"
                         :disabled="scope.row.control!==1"
                         @click="onUpdateStatus(scope.row)"
                         size="small">启用</el-button>
              <el-button type="text"
                         @click="checkButtonClick(scope.row)"
                         size="small">盘点</el-button>
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

      <template>
        <el-dialog title="库存盘点"
                   v-el-drag-dialog
                   :visible.sync="childForm.checkVisible"
                   top="20px"
                   :before-close="handleClose">

          <el-form :model="formData.billIn"
                   ref="formValidate"
                   style="minHeight:400px">

            <el-table border
                      :data="formData.stockOutInList">

              <el-table-column prop="material.code"
                               :label="this.$t('tobacco.tmaterial.billItem.materialCode')"
                               show-overflow-tooltip />

              <el-table-column prop="material.name"
                               width="200px"
                               :label="this.$t('tobacco.tmaterial.billItem.materialName')"
                               show-overflow-tooltip />

              <el-table-column prop="mfg"
                               width="100"
                               label="生产日期">
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
                               label="有效日期">
                <template slot-scope="scope">
                  <span v-if=" scope.row.exp">
                    {{ scope.row.exp|parseDate('yyyy-mm-dd') }}
                  </span>
                  <span v-else>
                    长期有效
                  </span>

                </template>
              </el-table-column>

              <el-table-column prop="material.measure.name"
                               width="80"
                               :label="this.$t('tobacco.tmaterial.billItem.measureName')"
                               show-overflow-tooltip />

              <el-table-column prop="currentAmount"
                               width="80"
                               label="库存数量" />

              <el-table-column prop="realAmount"
                               width="140"
                               label="盘点数量">
                <template slot-scope="scope">
                  <el-input-number controls-position="right"
                                   size="mini"
                                   :min="0"
                                   style="width:120px"
                                   v-model="scope.row.realAmount">
                  </el-input-number>
                </template>
              </el-table-column>

              <el-table-column prop="desc"
                               width="140"
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
            <el-button @click="childForm.checkVisible = false">取 消</el-button>
            <el-button type="primary"
                       @click="onCheckSubmitClick()">确 定</el-button>
          </div>

        </el-dialog>
      </template>
    </div>

  </transition>

</template>
<script>
const AddForm = () => import("./warehouseAdd.vue");
const EditForm = () => import("./warehouseEdit.vue");
import billInApi from "../../api/tmaterial/apiBillIn";
import billOutApi from "../../api/tmaterial/apiBillOut";
import warehouseApi from "../../api/tmaterial/apiWarehouse";
import stockApi from "../../api/tmaterial/apiStock";
import { convertToObject } from "typescript";
import elDragDialog from "@/directive/el-dragDialog"; // base on element-ui
import moment from "moment";
import UUID from "es6-uuid";
const status = [
  { value: 1, label: "初始化" },
  { value: 3, label: "盘点状态" },
  { value: 5, label: "启用" },
  { value: 7, label: "冻结" },
  { value: 9, label: "停用" }
];
export default {
  directives: { elDragDialog },
  data() {
    return {
      billIn: {},
      childForm: {
        addForm: false,
        editForm: false,
        viewForm: false,
        isEdit: false,
        stockForm: false,
        checkVisible: false
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
        serial: "",
        code: "",
        name: "",
        keeper: "",
        tel: "",
        address: "",
        initialYearMonth: "",
        currentYearMonth: "",
        control: 1,
        desc: "",
        organizationId: ""
      },
      formData: {
        warehouse: {},
        checkIn: {},
        checkOut: {},
        checkInItemList: [],
        checkOutItemList: [],
        warehouseList: [],
        stockOutInList: [],
        stockList: [],
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
      },
      statusList: status
    };
  },
  created() {
    this.searchData.control = "";
  },
  components: {
    OrganizationForm: () => import("@/components/Organization"),
    "add-form": AddForm,
    "edit-form": EditForm,
    AddStock: () => import("./stockAdd")
  },
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
  filters: {
    capitalizeState: function(value) {
      let item = status.find(it => {
        return it.value === value;
      });
      return item ? item.label : "";
    }
  },
  methods: {
    initCheckOut() {
      let now = moment().format("YYYYMMDDHHmmss");
      this.formData.checkOut = {
        id: UUID(32, 36),
        organizationId: this.formData.warehouse.organization.organizationId,
        organizationIds: this.formData.warehouse.organization.organizationIds,
        organizationName: this.formData.warehouse.organization.organizationName,
        organizationOrder: "",
        organizationCode: this.formData.warehouse.organization.organizationId,
        serial: "CO001" + now, //盘点出库CO001
        barcode: "CO001" + now, //盘点出库CO001
        annual: this.$store.state.system.annual,
        accountPeriod: this.formData.warehouse.currentYearMonth,
        author: this.$store.state.user.userName,
        title: "库存盘点出库",
        date: moment().format("YYYY-MM-DD"),
        operation: "CO001", //库存盘点出库
        deliveryOrganizationId: this.formData.warehouse.organization
          .organizationId,
        deliveryOrganizationName: this.formData.warehouse.organization
          .organizationName,
        deliveryInfo: "",
        arriveOrganizationId: this.formData.warehouse.organization
          .organizationId,
        arriveOrganizationName: this.formData.warehouse.organization
          .organizationName,
        deliver: "",
        refBillId: "",
        refBillSerial: "",
        refBillBarcode: "",
        control: "1",
        books: "000", //默认000
        warehouse: this.formData.warehouse.id,
        print: 0,
        itemCount: 0,
        itemMoney: 0,
        itemFreight: 0,
        itemTax: 0,
        itemTotal: 0,
        genType: 1,
        desc: "库存盘点出库"
      };
    },
    initCheckIn() {
      let now = moment().format("YYYYMMDDHHmmss");
      this.formData.checkIn = {
        id: UUID(32, 36),
        organizationId: this.formData.warehouse.organization.organizationId,
        organizationIds: this.formData.warehouse.organization.organizationIds,
        organizationName: this.formData.warehouse.organization.organizationName,
        organizationOrder: "",
        organizationCode: this.formData.warehouse.organization.organizationId,
        serial: "CI001" + now, //库存盘点入库
        barcode: "CI001" + now, //库存盘点入库
        annual: this.$store.state.system.annual,
        accountPeriod: this.formData.warehouse.currentYearMonth,
        author: this.$store.state.user.userName,
        title: "库存盘点入库",
        date: moment().format("YYYY-MM-DD"),
        operation: "CI001", //库存盘点出库
        deliveryOrganizationId: this.formData.warehouse.organization
          .organizationId,
        deliveryOrganizationName: this.formData.warehouse.organization
          .organizationName,
        deliveryInfo: "",
        arriveOrganizationId: this.formData.warehouse.organization
          .organizationId,
        arriveOrganizationName: this.formData.warehouse.organization
          .organizationName,
        deliver: "",
        refBillId: "",
        refBillSerial: "",
        refBillBarcode: "",
        control: "1",
        books: "000", //默认000
        warehouse: this.formData.warehouse.id,
        print: 0,
        itemCount: 0,
        itemMoney: 0,
        itemFreight: 0,
        itemTax: 0,
        itemTotal: 0,
        genType: 1,
        desc: "库存盘点入库"
      };
    },
    onCheckSubmitClick() {
      this.initCheckOut();
      this.initCheckIn();
      this.formData.checkOut.refBillId = this.formData.checkIn.id;
      this.formData.checkOut.refBillSerial = this.formData.checkIn.serial;
      this.formData.checkOut.refBillBarcode = this.formData.checkIn.barcode;
      this.formData.checkIn.refBillId = this.formData.checkOut.id;
      this.formData.checkIn.refBillSerial = this.formData.checkOut.serial;
      this.formData.checkIn.refBillBarcode = this.formData.checkOut.barcode;

      console.log(this.formData.checkIn);
      console.log(this.formData.checkOut);

      console.log(this.formData.stockOutInList);

      this.formData.checkInItemList = [];
      this.formData.checkOutItemList = [];
      for (let i = 0; i < this.formData.stockOutInList.length; i++) {
        let soi = this.formData.stockOutInList[i];
        let oItem = {
          id: UUID(32, 36),
          serial: i + 1,
          billId: this.formData.checkOut.id,
          materialId: soi.material.id,
          materialCode: soi.material.code,
          materialName: soi.material.name,
          measureId: soi.material.measure.id,
          measureName: soi.material.measure.name,
          measureUnitId: soi.material.measure.id,
          measureUnitName: soi.material.measure.name,
          price: 0,
          priceUnit: 0,
          amount: soi.currentAmount,
          amountUnit: soi.currentAmount,
          pricePurchase: 0,
          purchaseMoney: 0,
          money: 0,
          mfg: soi.mfg,
          exp: soi.exp,
          tax: 0,
          total: 0,
          convert: 1,
          desc: "盘点出库明细"
        };
        let iItem = {
          id: UUID(32, 36),
          serial: i + 1,
          billId: this.formData.checkIn.id,
          materialId: soi.material.id,
          materialCode: soi.material.code,
          materialName: soi.material.name,
          measureId: soi.material.measure.id,
          measureName: soi.material.measure.name,
          measureUnitId: soi.material.measure.id,
          measureUnitName: soi.material.measure.name,
          price: 0,
          priceUnit: 0,
          amount: soi.realAmount,
          amountUnit: soi.realAmount,
          pricePurchase: 0,
          purchaseMoney: 0,
          money: 0,
          mfg: soi.mfg,
          exp: soi.exp,
          tax: 0,
          total: 0,
          convert: 1,
          desc: soi.desc
        };
        this.formData.checkInItemList.push(iItem);
        this.formData.checkOutItemList.push(oItem);
      }

      console.log(this.formData.checkInItemList);
      console.log(this.formData.checkOutItemList);

      Promise.all([
        billOutApi.saveAll(
          this.formData.checkOut,
          this.formData.checkOutItemList
        ),
        billInApi.saveAll(this.formData.checkIn, this.formData.checkInItemList)
      ])
        .then(([outResponse, inResponse]) => {
          Promise.all([billOutApi.audit(this.formData.checkOut.id)])
            .then(([response]) => {
              Promise.all([billInApi.audit(this.formData.checkIn.id)])
                .then(([response]) => {
                  this.$message({
                    message: "盘点成功!",
                    type: "info"
                  });

                  this.childForm.checkVisible = false;
                })
                .catch(error => {
                  console.log(error);
                  this.$message({
                    type: "info",
                    message: error.message
                  });
                });
            })
            .catch(error => {
              console.log(error);
              this.$message({
                type: "info",
                message: error.message
              });
            });
        })
        .catch(error => {
          console.log(error);
        });
    },
    onUpdateStatus(row) {
      this.$confirm(
        "你确定库存初始化已完成,并将启用当前仓库吗?(注：启用后将无法再进行初始化操作)",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          console.log("确定");
          Promise.all([
            billInApi.getAll({
              size: 15,
              page: 0,
              search: "warehouse.id:eq:{wid};operation:eq:{operation}".format({
                wid: row.id,
                operation: "I000"
              })
            })
          ])
            .then(([billInResponse]) => {
              if (billInResponse.content.length > 0) {
                this.billIn = billInResponse.content[0];
                if (this.billIn !== undefined && this.billIn.id !== undefined) {
                  Promise.all([warehouseApi.start(row.id, this.billIn.id)])
                    .then(([response]) => {
                      this.$message({
                        type: "success",
                        message: "启用成功!"
                      });
                      this.formData.selectRow = null;
                      this.onSearchButtonClick();
                    })
                    .catch(error => {
                      console.error(error);
                    });
                }
              }
            })
            .catch(error => {
              console.error(error);
            });
        })
        .catch(error => {
          console.error(error);
          this.$message({
            type: "info",
            message: "已取消!"
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

      Promise.all([warehouseApi.softDelete(this.formData.selectRow.id)])
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
      let search = "organization.organizationId:like:{orgid}".format({
        orgid: this.searchData.organizationId
      });
      if (
        this.searchData.control !== undefined &&
        this.searchData.control !== null &&
        this.searchData.control !== ""
      ) {
        search += ";control:eq:" + this.searchData.control;
      }
      Promise.all([
        warehouseApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          sort: "organization.organizationId,asc",
          contains: "serial,code,name,keeper,tel,address,control,desc,:{keyword}:true".format(
            { keyword: this.formData.pagination.keyword }
          ),
          search: search
        })
      ])
        .then(([response]) => {
          this.formData.warehouseList = response.content;
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
    initButtonClick(row) {
      this.formData.selectRow = row;
      this.childForm.stockForm = true;
    },
    checkButtonClick(row) {
      this.formData.selectRow = row;
      this.formData.warehouse = row;
      this.childForm.checkVisible = true;
      this.formData.stockList = [];
      Promise.all([
        stockApi.getAll({
          size: 500,
          page: 0,
          sort: "currentAmount,desc",
          search:
            "warehouse.id:eq:" +
            this.formData.warehouse.id +
            ";accountPeriod:eq:" +
            this.formData.warehouse.currentYearMonth
        })
      ])
        .then(([response]) => {
          this.formData.stockList = response.content;
          this.formData.stockOutInList = [];
          for (let i = 0; i < this.formData.stockList.length; i++) {
            let stock = this.formData.stockList[i];
            let realAmount = stock.currentAmount;
            stock.realAmount = realAmount; //添加属性realAmount
            this.formData.stockOutInList.push(stock);
          }
        })
        .catch(error => {});
    }
  }
};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
