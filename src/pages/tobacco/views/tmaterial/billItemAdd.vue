<template>
  <div>
    <div style="text-align: right;">
      <el-button type="primary"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </div>
    <el-form :model="formItem"
             label-width="80px"
             :rules="ruleValidate"
             ref="formValidate"
             class="cas-group cas-flex-2">
      <el-form-item :label="$t('tobacco.tmaterial.billItem.billId')">
        <el-input v-bind:placeholder="$t('base.pleaseInput')"
                  disabled
                  v-model="billNo" />
      </el-form-item>
      <el-form-item :label="$t('tobacco.tmaterial.billItem.materialName')"
                    prop="materialId">

        <el-select v-model="formItem.materialId"
                   ref='material'
                   filterable
                   remote
                   reserve-keyword
                   placeholder="请输入物资关键词"
                   :remote-method="loadMaterial"
                   @change="onMaterialChange">
          <el-option v-for="item in materialList"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id">
            <span style="float: left;color: #8492a6; font-size: 13px">{{ item.name }}</span>
            <span style="float: left;margin-left:10px">{{ item.manufacturer }}</span>

            <span style="float: right;width:30%; color: #8492a6;">{{item.title?item.title:(item.measure?item.measure.name:'') }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('tobacco.tmaterial.billItem.units')">
        <el-select v-model="formItem.measureUnitId"
                   :placeholder="$t('base.pleaseSelect')"
                   style="width: 100%"
                   @change="onMaterialUnitChanged">
          <el-option v-for="item in formData. materialUnitList"
                     :key="item.measureId"
                     :label="item.measureName"
                     :value="item.measureId">
          </el-option>
        </el-select>

      </el-form-item>

      <el-form-item :label="$t('tobacco.tmaterial.billItem.amount')">
        <el-input v-bind:placeholder="$t('base.pleaseInput')"
                  style="width:100%"
                  v-model="formItem.amountUnit"
                  @change="onAmountChanged">
          <template slot="append">{{this.formItem.measureUnitName}}</template>
        </el-input>
      </el-form-item>

      <el-form-item :label="$t('tobacco.tmaterial.billItem.price')">
        <el-input-number v-bind:placeholder="$t('base.pleaseInput')"
                         style="width:100%"
                         v-model="formItem.price" />
      </el-form-item>
      <el-form-item :label="$t('tobacco.tmaterial.billItem.mfg')">
        <el-date-picker v-model="formItem.mfg"
                        type="date"
                        value-format='yyyy-MM-dd'
                        placeholder="选择日期">
        </el-date-picker>

      </el-form-item>
      <el-form-item :label="$t('tobacco.tmaterial.billItem.expDays')">
        <el-input-number v-bind:placeholder="$t('base.pleaseInput')"
                         style="width:100%"
                         v-model="formItem.expDays" />
      </el-form-item>

      <el-form-item :label="$t('tobacco.tmaterial.billItem.exp')">
        <el-date-picker v-model="formItem.exp"
                        type="date"
                        value-format='yyyy-MM-dd'
                        placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('tobacco.tmaterial.billItem.pricePurchase')"
                    v-if="false">
        <el-input-number v-bind:placeholder="$t('base.pleaseInput')"
                         style="width:100%"
                         v-model="formItem.pricePurchase" />
      </el-form-item>

      <el-form-item :label="$t('tobacco.tmaterial.billItem.tax')"
                    v-if="false">
        <el-input-number v-bind:placeholder="$t('base.pleaseInput')"
                         style="width:100%"
                         v-model="formItem.tax" />
      </el-form-item>

      <el-form-item :label="$t('tobacco.tmaterial.billItem.desc')"
                    style="width: 100%">
        <el-input v-bind:placeholder="$t('base.pleaseInput')"
                  type="textarea"
                  :span="2"
                  v-model="formItem.desc" />
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
import billItemApi from "../../api/tmaterial/apiBillItem";
import materialApi from "../../api/tmaterial/apiMaterial";
import moment from "moment";
import UUID from "es6-uuid";
import materialUnitApi from "../../api/tmaterial/apiMaterialUnit";
export default {
  props: ["master", "visible"],
  data() {
    var checkNumber = (rule, value, callback) => {
      if (value === "" || value === undefined || value === null) {
        callback(new Error("请输入有效数字"));
      }
      var re = /^(-?\d+)(\.\d+)?$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/
      if (!re.test(value)) {
        callback(new Error("请输入数字值"));
      }
    };
    return {
      measureName: "",
      billNo: "",
      formItem: this.createItem(),
      materialList: [],
      ruleValidate: {
        materialId: [
          { required: true, message: "物资不能为空", trigger: "blur" }
        ],
        amount: [{ validator: checkNumber, trigger: "blur" }]
      },
      formData: {
        materialUnitList: []
      }
    };
  },
  created() {
    this.billNo = this.master ? this.master.serial : "";
    this.formItem.billId = this.master ? this.master.id : "";
  },
  methods: {
    onSubmitClick(name) {
      if (
        this.formItem.billId === "" ||
        this.formItem.billId === undefined ||
        this.formItem.billId === null
      ) {
        this.$notify.error({
          title: "错误",
          message: "没有获取到单据信息，请刷新重试"
        });
        return;
      }
      var re = /^(-?\d+)(\.\d+)?$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/
      if (!re.test(this.formItem.amount)) {
        this.$notify.info({
          title: "消息",
          message: "请输入数量"
        });
        return;
      }
      if (this.formItem.amount <= 0) {
        this.$notify.info({
          title: "消息",
          message: "数量必须大于0"
        });
        return;
      }
      if (
        this.formItem.mfg !== undefined &&
        this.formItem.mfg !== null &&
        this.formItem.mfg !== ""
      ) {
        if (
          (this.formItem.exp === undefined ||
            this.formItem.exp === null ||
            this.formItem.exp === "") &&
          this.formItem.expDays
        ) {
          console.log("自动设置有效日期");
          this.formItem.exp = moment(this.formItem.mfg)
            .add(this.formItem.expDays, "days")
            .format("YYYY-MM-DD");
        }
      }
      this.$refs[name].validate(valid => {
        if (valid) {
          Promise.all([billItemApi.save(this.formItem)])
            .then(([response]) => {
              this.formReset(name);
              this.formItem = this.createItem();
              this.materialList=[];
              //重置表单，允许多次操作
              this.$message({
                message: this.$t("message.saveAndContinue"),
                type: "info"
              });
            })
            .catch(error => {
              console.log(error);
              this.$notify.error({
                title: "错误",
                message: error.message
              });
            });
        }
      });
    },

    formReset(name) {
      this.$refs[name].resetFields();
    },
    createItem() {
      return {
        id: UUID(32, 36),
        billId: this.master ? this.master.id : "",
        serial: 0,
        materialId: "",
        materialCode: "",
        materialName: "",
        measureId: "",
        measureName: "",
        measureUnitId: "",
        measureUnitName: "",
        amountUnit: "",
        convert: 0,
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
      };
    },
    loadMaterial(keyword) {
      if (keyword !== "") {
        Promise.all([
          materialApi.getAll({
            size: 30,
            sort: "code",
            contains: "barcode,manufacturer,code,name,serial:{keyword}:true".format(
              { keyword: keyword }
            )
          })
        ])
          .then(([materialResponse]) => {
            this.materialList = materialResponse.content;
          })
          .catch(error => {});
      } else {
        this.materialList = [];
      }
    },
    onAmountChanged(value) {
      var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/
      if (!re.test(value)) {
        this.$notify.info({
          title: "消息",
          message: "请输入数字值"
        });
        return;
      }
      if (
        this.formItem.convert === undefined ||
        this.formItem.convert === 0 ||
        this.formItem.convert === ""
      ) {
        this.formItem.convert = 1;
      }
      this.formItem.amount = this.formItem.amountUnit / this.formItem.convert;
    },
    onMaterialChange(value) {
      let item = this.materialList.find(it => {
        return it.id === value;
      });
      if (item !== undefined) {
        this.measureName = item.measure ? item.measure.name : "无";
        this.formItem.measureId = item.measure ? item.measure.id : "无";
        this.formItem.measureName = item.measure ? item.measure.name : "无";
        this.formItem.materialCode = item.code;
        this.formItem.materialName = item.name;
        this.formItem.measureUnitId = this.formItem.measureId;
        this.formItem.measureUnitName = this.formItem.measureName;
        this.formItem.convert = 1;
        this.formItem.expDays = item.period;
        let that = this;
        Promise.all([
          materialUnitApi.getAll({
            size: 500,
            page: 0,
            search: "material.id:eq:" + value
          })
        ])
          .then(([response]) => {
            let list = response.content;
            let item = list.find(it => {
              return it.measureId === this.formItem.measureId;
            });
            if (item === undefined) {
              list.push({
                measureId: this.formItem.measureId,
                measureName: this.formItem.measureName,
                convert: 1
              });
            }
            this.formData.materialUnitList = list;
          })
          .catch(error => {});
      } else {
        this.measureName = "";
      }
    },
    onMaterialUnitChanged(value) {
      let item = this.formData.materialUnitList.find(it => {
        return it.measureId === value;
      });
      if (item !== undefined) {
        this.formItem.measureUnitName = item.measureName;
        this.formItem.convert = item.convert;
        this.formItem.amount = this.formItem.amountUnit / this.formItem.convert;
      }
    }
  },
  watch: {
    master(curVal, oldVal) {
      if (curVal !== undefined && curVal !== null) {
        this.billNo = curVal.serial;
        this.formItem.billId = curVal.id;
      } else {
        this.billNo = "";
      }
    }
  }
};
</script>
