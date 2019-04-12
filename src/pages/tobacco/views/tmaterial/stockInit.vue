<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='toolButton'
           style="min-width: 600px">
        <el-button type='primary'
                   @click="addItemVisible=true">新增明细</el-button>
        <el-button type='primary'
                   @click="onSubmitClick('formValidate')">保存数据</el-button>

      </div>
    </div>
    <main class='contentPanel'>
      <el-form v-if="formStep===1"
               :model="formItem"
               label-width="80px"
               :rules="ruleValidate"
               ref="formValidate"
               class="cas-group">
        <el-row>
          <el-col :span="6">
            <el-form-item :label="$t('tobacco.tmaterial.stock.year')">
              <el-input v-bind:placeholder="$t('base.pleaseInput')"
                        disabled
                        v-model="formItem.year" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('tobacco.tmaterial.stock.month')">
              <el-input v-bind:placeholder="$t('base.pleaseInput')"
                        disabled
                        v-model="formItem.month" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('tobacco.tmaterial.stock.warehouse')">
              <el-input v-bind:placeholder="$t('base.pleaseInput')"
                        disabled
                        v-model="warehouse.name" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
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
                           :value="item.id">
                </el-option>
              </el-select>

            </el-form-item>

          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('tobacco.tmaterial.stock.initialAmount')"
                          prop="initialAmount">
              <el-input :placeholder="$t('base.pleaseInput')"
                        style="width:100%"
                        v-model="formItem.initialAmount">
                <template slot="append">{{formItem.measureName}}</template>
              </el-input>

            </el-form-item>
          </el-col>
          <el-col :span="6">

            <el-form-item :label="$t('tobacco.tmaterial.stock.materialUnit')">

              <el-select v-model="formItem.materialUnit"
                         :disabled="materialUnitList.length===0"
                         style="width:100%"
                         @change="onMaterialUnitChanged">
                <el-option v-for="item in materialUnitList"
                           :key="item.measureId"
                           :label="item.measureName"
                           :value="item.measureId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">

            <el-form-item :label="$t('tobacco.tmaterial.stock.initialAmountUnit')"
                          prop="initialAmountUnit">
              <el-input :placeholder="$t('base.pleaseInput')"
                        :disabled="materialUnitList.length===0"
                        style="width:100%"
                        v-model="formItem.initialAmountUnit">
                <template slot="append">{{formItem.measureUnitName}}</template>
              </el-input>

            </el-form-item>

          </el-col>
        </el-row>

      </el-form>
      <el-table highlight-current-row
                border
                :data="formData.stockList"
                style="width: 100%"
                class="cas-group">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="year"
                         :label="this.$t('tobacco.tmaterial.stock.year')" />
        <el-table-column prop="material.name"
                         :label="this.$t('tobacco.tmaterial.stock.material')" />
        <el-table-column prop="initialAmount"
                         :label="this.$t('tobacco.tmaterial.stock.initialAmount')" />
        <el-table-column prop="initialAmountUnit"
                         :label="this.$t('tobacco.tmaterial.stock.initialAmountUnit')" />
        <el-table-column prop="currentAmount"
                         :label="this.$t('tobacco.tmaterial.stock.currentAmount')" />
        <el-table-column prop="currentAmountUnit"
                         :label="this.$t('tobacco.tmaterial.stock.currentAmountUnit')" />
        <el-table-column fixed="right"
                         :label="$t('base.titleOperation')"
                         width="100">
          <template slot-scope="scope">
            <el-button @click="editButtonClick(scope.row,false)"
                       type="text"
                       size="small">{{$t('base.buttonDelete')}}</el-button>
            <el-button @click="editButtonClick(scope.row,false)"
                       type="text"
                       size="small">{{$t('base.buttonEdit')}}</el-button>
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
      <el-dialog :title="新增明细"
                 :visible.sync="addItemVisible"
                 top="10px"
                 append-to-body
                 :before-close="handleClose">
        <el-form :model="inputItem"
                 label-width="80px">
          <el-form-item label="物资名称">
            <el-autocomplete class="inline-input"
                             style="width:100%"
                             :value="inputItem.material.name"
                             :fetch-suggestions="querySearch"
                             placeholder="请输入物资名称过滤"
                             @select="handleSelect">
              <template slot-scope="{ item }">
                <span style="float: left;width:20%; color: #8492a6; font-size: 13px">{{ item.code }}</span>
                <span style="float: left;">{{ item.name }}</span>
                <span style="float: right; color: #8492a6;">{{ item.manufacturer }}</span>
                <span style="float: right;width:30%; color: #8492a6;">{{ item.title }}</span>
              </template>
            </el-autocomplete>
          </el-form-item>
          <el-form-item label="计量单位">
            <el-select v-model='inputItem.materialUnit.id'
                       @change="unitSelectChange"
                       style="width:100%">
              <el-option v-for="unit in  materialUnitList"
                         :key="unit.id"
                         :label="unit.measureName"
                         :value="unit.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="物资数量">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="inputItem.amount" />
          </el-form-item>
          <el-form-item label="生产日期">
            <el-date-picker v-model="inputItem.proDate"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="过期日期">
            <el-date-picker v-model="inputItem.expDate"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-form>

      </el-dialog>
    </template>
  </div>

</template>
<script>
import stockApi from "../../api/tmaterial/apiStock";
import booksApi from "../../api/tmaterial/apiBooks";
import materialApi from "../../api/tmaterial/apiMaterial";
import materialUnitApi from "../../api/tmaterial/apiMaterialUnit";
import moment from "moment";
import UUID from "es6-uuid";
export default {
  props: ["master", "isEdit", "visible"],
  data() {
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
      inputItem: {
        material: "",
        materialUnit: {
          id: "",
          measureName: ""
        },
        amount: 0,
        proDate: "",
        expDate: "",
        desc: ""
      },
      addItemVisible: false,
      formStep: 0, //表单状态
      materialLoading: false,
      warehouse: {},
      materialList: [],
      materialUnitList: [],
      formItem: {},
      bill: {
        organizationId: "",
        serial: "",
        barcode: "",
        year: "",
        month: 0,
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
      },
      billItem: {
        id: "",
        billId: "",
        serial: 0,
        materialId: "",
        materialCode: "",
        materialName: "",
        measureId: "",
        measureName: "",
        price: "",
        priceUnit: "",
        amount: "",
        amountUnit: "",
        pricePurchase: "",
        purchaseMoney: "",
        money: "",
        mfg: "",
        exp: "",
        tax: "",
        total: "",
        desc: "",
        expDays: ""
      },
      billItemList: [],
      ruleValidate: {
        code: [{ required: true, message: "编码不能为空", trigger: "blur" }]
      },
      formData: {
        stockList: [],
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
  created() {
    Promise.all([materialApi.getAll({ size: 500, sort: "code" })])
      .then(([materialResponse]) => {
        this.materialList = materialResponse.content;
      })
      .catch(error => {});
    //加载账套
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
        })
      ])
        .then(([response]) => {
          if (response.content.length === 0) {
            console.log("未获取到账套信息，采用默认值", ["000", "默认账套"]);
            this.formItem.books = { code: "000", month: "0" };
          } else {
            this.books = response.content[0];
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
      this.load();
    }
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
    unitSelectChange(value) {
      var name = this.materialUnitList.find(item => {
        return item.id === value;
      }).measureName;
      this.inputItem.materialUnit.measureName = name;
    },
    querySearch(queryString, cb) {
      var materials = this.materialList;
      var results = queryString
        ? materials.filter(this.createFilter(queryString))
        : materials;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return material => {
        return (
          material.name.toLowerCase().indexOf(queryString.toLowerCase()) >= 0
        );
      };
    },
    handleSelect(item) {
      this.inputItem.material = JSON.parse(JSON.stringify(item));
      this.materialList = [];
      this.inputItem.materialUnit = {};
      Promise.all([
        materialUnitApi.getAll({
          size: 100,
          search: "material.id:eq:" + this.inputItem.material.id
        })
      ])
        .then(([unitResponse]) => {
          this.materialUnitList = unitResponse.content;
        })
        .catch(error => {});
    },
    onButtonCreate() {
      this.formStep = 1;
      this.formItem = this.createFormItem();
    },
    onButtonEdit(row) {},
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          Promise.all([stockApi.save(this.formItem)])
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
    formReset(name) {
      this.$refs[name].resetFields();
    },
    onBackClick() {
      this.$emit("update:visible", false);
    },
    load() {
      //加载原有数据
      this.onSearchButtonClick();
    },
    remoteLoadMaterial(query) {
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
    onMaterialChanged(item) {
      if (item === undefined || item === null || item === "") {
        this.materialList = [];
      } else {
        let entity = this.materialList.find(it => {
          return it.id === item;
        });
        console.log(entity);
        if (entity !== undefined) {
          this.formItem.measureName = entity.measure.name;
          //查询对应物资的规格转化
          Promise.all([
            materialUnitApi.getAll({
              size: 500,
              page: 0,
              search: "material.id:eq:" + item
            })
          ])
            .then(([response]) => {
              this.materialUnitList = response.content;
            })
            .catch(error => {});
        }
      }
    },
    onMaterialUnitChanged(item) {
      if (item === undefined || item === null || item === "") {
        this.materialList = [];
      } else {
        let entity = this.materialUnitList.find(it => {
          return it.measureId === item;
        });
        if (entity !== undefined) {
          this.formItem.measureUnitName = measureName;
        }
      }
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
    onSearchButtonClick() {
      let search = "warehouse.id:like:{warehouseId};books.code:eq:{booksCode}".format(
        {
          warehouseId: this.master.id,
          booksCode: this.books.code
        }
      );

      Promise.all([
        stockApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          search: search
        })
      ])
        .then(([response]) => {
          this.formData.stockList = response.content;
          this.formData.pagination.total = parseFloat(response.totalElements);
        })
        .catch(error => {});
    },
    createFormItem() {
      return {
        books: this.books.code,
        year: this.$store.state.system.annual,
        month: this.books.month,
        warehouse: this.warehouse.id,
        material: "",
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
        measureName: "",
        measureUnitName: ""
      };
    }
  },
  watch: {
    master(curVal, oldVal) {
      this.warehouse = JSON.parse(JSON.stringify(curVal));
      this.load();
    }
  }
};
</script>
