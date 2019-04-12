<template>
  <div class="mainPanel">
    <div class="toolPanel">
      <div class="queryCriteria">
        <el-button plain
                   type="text"
                   icon="el-icon-d-arrow-left"
                   @click="onBackClick()">{{ $t('base.buttonBack') }}</el-button>
      </div>
      <div class="toolButton"
           style="min-width: 600px">
        <el-button plain
                   v-if="this.formStep===0"
                   type="primary"
                   @click="onButtonCreate()">{{ $t('tobacco.tmaterial.stock.buttonInsert') }}</el-button>
        <el-button plain
                   v-else
                   type="primary"
                   @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}</el-button>
      </div>
    </div>
    <main class="contentPanel">
      <el-form v-if="formStep===1"
               :model="formItem"
               label-width="80px"
               :rules="ruleValidate"
               ref="formValidate"
               class="cas-group">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('tobacco.tmaterial.stock.material')">
              <el-select v-model="formItem.material"
                         style="width:100%"
                         filterable
                         remote
                         reserve-keyword
                         placeholder="请输入物资名称或者代码"
                         :remote-method="remoteLoadMaterial"
                         :loading="materialLoading"
                         clearable
                         @change="onMaterialChanged">
                <el-option v-for="item in materialList "
                           :key="item.id"
                           :label="item.name"
                           :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="数量">
              <el-input :placeholder="$t('base.pleaseInput')"
                        style="width:100%"
                        v-model="formItem.initialAmount">
                <template slot="append"> <span style="color:red;"> {{formItem.measureName}}</span></template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="质保期">
              <el-input v-bind:placeholder="$t('base.pleaseInput')"
                        style="width:100%"
                        v-model="formItem.expDays"
                        @change="expDateUpdate">
                <template slot="append"> <span style="color:red;"> 天</span></template>
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="生产日期">
              <el-date-picker v-model="formItem.mfg"
                              type="date"
                              value-format="yyyy-MM-dd"
                              @change="expDateUpdate"
                              placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="截至日期">
              <el-date-picker v-model="formItem.exp"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="库期">
              <el-input v-bind:placeholder="$t('base.pleaseInput')"
                        disabled
                        v-model="formItem.yearMonth" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('tobacco.tmaterial.stock.warehouse')">
              <el-input v-bind:placeholder="$t('base.pleaseInput')"
                        disabled
                        v-model="warehouse.name" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table highlight-current-row
                border
                :data="this.formData.billItemList"
                style="width: 100%"
                class="cas-group">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="materialCode"
                         label="物资编码" />
        <el-table-column prop="materialName"
                         label="物资名称" />
        <el-table-column prop="measureName"
                         label="计量单位" />
        <el-table-column prop="amount"
                         label="数量" />
        <el-table-column prop="mfg"
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
                         label="截至有效期">
          <template slot-scope="scope">
            <span v-if=" scope.row.exp">
              {{ scope.row.exp|parseDate('yyyy-mm-dd') }}
            </span>
            <span v-else>
              长期有效
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="deleteButtonClick(scope.row)"
                       type="text"
                       size="small">{{$t('base.buttonDelete')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </main>
    <div class="footerPanel">
      <el-pagination :page-size="formData.pagination.pageSize"
                     :total="formData.pagination.total"
                     :current-page="formData.pagination.currentPage"
                     @current-change="onPageChange"
                     :page-sizes="formData.pagination.pageSizeOpts"
                     @size-change="onPageSizeChange"
                     layout="total, sizes, prev, pager, next, jumper"
                     placement="top"></el-pagination>
    </div>
  </div>
</template>
<script>
import stockApi from "../../api/tmaterial/apiStock";
import billInApi from "../../api/tmaterial/apiBillIn";
import billItemApi from "../../api/tmaterial/apiBillItem";
import booksApi from "../../api/tmaterial/apiBooks";
import materialApi from "../../api/tmaterial/apiMaterial";
import materialUnitApi from "../../api/tmaterial/apiMaterialUnit";
import moment from "moment";
import UUID from "es6-uuid";
export default {
  props: ["master", "isEdit", "visible"],
  data () {
    var checkNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("初始数字不能为空"));
      }
      if (!Number.isInteger(value)) {
        callback(new Error("请输入数字值"));
      }
    };
    var checkUnitNumber = (rule, value, callback) => {
      if (value && !Number.isInteger(value)) {
        callback(new Error("请输入数字值"));
      }
    };
    return {
      formStep: 0, //表单状态
      materialLoading: false,
      warehouse: {},
      materialList: [],
      materialUnitList: [],
      formItem: {},
      ruleValidate: {
        code: [{ required: true, message: "编码不能为空", trigger: "blur" }]
      },
      billIn: {},
      billItem: {},
      formData: {
        billItemList: [],
        pagination: {
          //用于分页的变量
          currentPage: 1,
          pageSize: 10,
          total: 0,
          keyword: "",
          pageSizeOpts: [10, 15, 20, 25, 30]
        },
        rowSelection: []
      },
      books: {},
      initialAmount: [{ validator: checkNumber, trigger: "blur" }],
      initialAmountUnit: [{ validator: checkUnitNumber, trigger: "blur" }]
    };
  },
  created () {
    //加载
    this.warehouse = JSON.parse(JSON.stringify(this.master));

    //获取组织单位信息
    if (this.userOrgId !== undefined && this.userOrgId.length >= 6) {
      //获取到了有效的信息，根据组织单位的特性，采用前6位做为市公司编码
      Promise.all([
        booksApi.getAll({
          size: 15,
          page: 0,
          sort: "createDate,desc",
          search: "organization.organizationId:eq:{orgId};;status:eq:5".format({
            orgId: this.userOrgId.substring(0, 6)
          })
        }),
        billInApi.getAll({
          size: 15,
          page: 0,
          search: "warehouse.id:eq:{wid};operation:eq:{operation}".format({
            wid: this.warehouse.id,
            operation: "I000"
          })
        })
      ])
        .then(([response, billInResponse]) => {
          if (response.content.length === 0) {
            console.log("未获取到账套信息，采用默认值", ["000", "默认账套"]);
            this.formItem.books = { code: "000", month: "0" };
          } else {
            this.books = response.content[0];
          }

          if (billInResponse.content.length > 0) {
            this.billIn = billInResponse.content[0];
          } else {
            this.billIn = this.initBillIn();
            this.saveBillIn();
          }

          this.load();
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      //目前可以采用默认的账套信息
      console.log("组织单位信息不完整，采用默认账套", ["000", "默认账套"]);
      this.formItem.books = { code: "000", month: "0" };
    }
  },
  computed: {
    userOrgId () {
      if (this.$store.state.user.organization === undefined) {
        return undefined;
      } else {
        return this.$store.state.user.organization.organizationId;
      }
    }
  },
  methods: {
    onButtonCreate () {
      this.formStep = 1;
      this.formItem = this.createFormItem();
    },
    onButtonEdit (row) { },
    deleteButtonClick (row) {
      console.log(row);
      Promise.all([billItemApi.softDelete(row.id)])
        .then(([response]) => {
          this.$message({
            type: "info",
            message: this.$t("message.deleteOk")
          });
          this.onSearchButtonClick();
        })
        .catch(error => { });
    },
    onSubmitClick (name) {
      this.billItem = this.initBillItem();
      this.$refs[name].validate(valid => {
        if (valid) {
          Promise.all([billItemApi.save(this.billItem)])
            .then(([response]) => {
              this.formReset(name);
              this.formStep = 0;
              this.onSearchButtonClick();
              //重置表单，允许多次操作
              this.$message({
                message: this.$t("message.saveAndContinue"),
                type: "info"
              });
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
    formReset (name) {
      this.$refs[name].resetFields();
    },
    onBackClick () {
      this.$emit("update:visible", false);
    },
    load () {
      //加载原有数据
      this.onSearchButtonClick();
    },
    expDateUpdate () {
      this.formItem.exp = moment(this.formItem.mfg)
        .add(this.formItem.expDays, "days")
        .format("YYYY-MM-DD");
    },
    remoteLoadMaterial (query) {
      if (query !== "") {
        this.materialLoading = true;
        Promise.all([
          materialApi.getAll({
            contains: "serial,barcode,category,code,name,alphabet,title,author,brand,manufacturer,desc,:{keyword}:true".format(
              { keyword: query }
            )
          })
        ])
          .then(([response]) => {
            this.materialList = response.content;
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
            this.materialLoading = false;
          });
      } else {
        this.materialList = [];
      }
    },
    onMaterialChanged (item) {
      if (item === undefined || item === null || item === "") {
        this.materialList = [];
      } else {
        let entity = this.materialList.find(it => {
          return it.id === item;
        });
        console.log(entity);
        if (entity !== undefined) {
          this.formItem.measureName = entity.measure.name;
          this.formItem.expDays = entity.period;
          this.formItem.measureId = entity.measure.id;
          this.formItem.materialCode = entity.code;
          this.formItem.materialName = entity.name;
        }
      }
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
    onSearchButtonClick () {
      console.log(this.billIn);
      let search = "billId:eq:{billId}".format({
        billId: this.billIn.id
      });

      Promise.all([
        billItemApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          search: search
        })
      ])
        .then(([response]) => {
          this.formData.billItemList = response.content;
          this.formData.pagination.total = parseFloat(response.totalElements);
          console.log(this.formData.billItemList);
        })
        .catch(error => { });
    },
    initBillIn () {
      return {
        id: UUID(32, 36),
        organizationId: this.warehouse.organization.organizationId,
        organizationIds: this.warehouse.organization.organizationIds,
        organizationName: this.warehouse.organization.organizationName,
        organizationOrder: "",
        organizationCode: this.warehouse.organization.organizationId,
        serial: "I000" + moment().format("YYYYMMDDHHmmss"),
        barcode: "",
        annual: this.$store.state.system.annual,
        accountPeriod: this.warehouse.currentYearMonth,
        author: this.$store.state.user.userName,
        title: "库存初始化",
        date: moment().format("YYYY-MM-DD"),
        operation: "I000", //库存初始化
        deliveryOrganizationId: this.warehouse.organization.organizationId,
        deliveryOrganizationName: this.warehouse.organization.organizationName,
        deliveryInfo: "",
        arriveOrganizationId: this.warehouse.organization.organizationId,
        arriveOrganizationName: this.warehouse.organization.organizationName,
        deliver: "",
        refBillId: "",
        refBillSerial: "",
        refBillBarcode: "",
        control: "1",
        books: "000", //默认000
        warehouse: this.warehouse.id,
        print: 0,
        itemCount: 0,
        itemMoney: 0,
        itemFreight: 0,
        itemTax: 0,
        itemTotal: 0,
        genType: 1,
        desc: "库存初始化"
      };
    },
    initBillItem () {
      console.log(this.formItem);
      return {
        id: UUID(32, 36),
        billId: this.billIn.id,
        materialId: this.formItem.material,
        materialCode: this.formItem.materialCode,
        materialName: this.formItem.materialName,
        measureId: this.formItem.measureId,
        measureName: this.formItem.measureName,
        measureUnitId: this.formItem.measureId,
        measureUnitName: this.formItem.measureName,
        price: 0,
        priceUnit: 0,
        amount: this.formItem.initialAmount,
        amountUnit: this.formItem.initialAmount,
        pricePurchase: 0,
        purchaseMoney: 0,
        money: 0,
        mfg: this.formItem.mfg,
        exp: this.formItem.exp,
        tax: 0,
        total: 0,
        convert: 1,
        desc: "库存初始化"
      };
    },
    saveBillIn () {
      Promise.all([billInApi.save(this.billIn)])
        .then(([response]) => { })
        .catch(error => {
          console.log(error);
        });
    },
    createFormItem () {
      return {
        books: this.books.code,
        yearMonth: this.warehouse.currentYearMonth,
        warehouse: this.warehouse.id,
        material: "",
        materialName: "",
        materialUnit: "",
        initialAmount: 0,
        initialAmountUnit: 0,
        currentAmount: 0,
        currentAmountUnit: 0,
        control: 0,
        organizationId: this.$store.state.user.organization.organizationId,
        organizationIds: [this.$store.state.user.organization.organizationId],
        organizationName: this.$store.state.user.organization.organizationName,
        organizationOrder: 0,
        organizationCode: this.$store.state.user.organization.organizationId,
        desc: "",
        measureId: "",
        measureName: "",
        materialCode: "",
        measureUnitName: "",
        mfg: "",
        exp: "",
        expDays: 0
      };
    }
  },
  watch: {
    master (curVal, oldVal) {
      this.warehouse = JSON.parse(JSON.stringify(curVal));
      this.load();
    }
  }
};
</script>
