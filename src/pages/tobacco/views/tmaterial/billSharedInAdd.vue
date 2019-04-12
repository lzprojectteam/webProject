<template>
  <div>
    <el-form v-loading.fullscreen.lock="loading"
             :model="formItem"
             label-width="80px"
             :rules="ruleValidate"
             ref="formValidate"
             v-if="step===0"
             class="cas-group cas-flex-2">
      <el-form-item :label="$t('tobacco.tmaterial.bill.sendBillSerial')"
                    prop="refBillId">

        <el-select v-model="formItem.refBillId"
                   ref='material'
                   filterable
                   remote
                   reserve-keyword
                   placeholder="请输入发货单据号"
                   :remote-method="loadBillList"
                   @change="onBillChanged">
          <el-option v-for="item in formData.billList"
                     :key="item.id"
                     :label="item.serial"
                     :value="item.id">
            <span style="float: left;color: #8492a6; font-size: 13px">{{ item.serial }}</span>

            <span style="float: right; color: #8492a6;">{{ item.organization.organizationName}}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('tobacco.tmaterial.bill.deliveryOrganizationName')"
                    prop="deliveryOrganizationId">
        <el-input v-model="formItem.deliveryOrganizationName"
                  disabled />

      </el-form-item>

      <el-form-item :label="$t('tobacco.tmaterial.bill.arriveOrganizationName')"
                    prop="arriveOrganizationId">
        <el-input v-model="formItem.arriveOrganizationName"
                  disabled />

      </el-form-item>
      <el-form-item :label="$t('tobacco.tmaterial.warehouse.name')"
                    prop="materialId">

        <el-select v-model="formItem.warehouse"
                   @change="onWarehouseChanged">
          <el-option v-for="item in formData.warehouseList"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('tobacco.tmaterial.bill.serial')">
        <el-input placeholder="如果为空，则自动生成"
                  v-model="formItem.serial" />
      </el-form-item>

      <el-form-item :label="$t('tobacco.tmaterial.bill.author')"
                    prop="author">
        <el-input v-bind:placeholder="$t('base.pleaseInput')"
                  v-model="formItem.author" />
      </el-form-item>
      <el-form-item :label="$t('tobacco.tmaterial.bill.date')">

        <el-date-picker v-model="formItem.date"
                        style="width:100%"
                        type="date"
                        format="yyyy-MM-dd"
                        :clearable="false"
                        placeholder="选择日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item :label="$t('tobacco.tmaterial.bill.deliver')"
                    prop="deliver">
        <el-input v-bind:placeholder="$t('base.pleaseInput')"
                  v-model="formItem.deliver" />
      </el-form-item>

      <el-form-item :label="$t('tobacco.tmaterial.bill.control')">

        <el-select v-model="formItem.control"
                   :placeholder="$t('base.pleaseSelect')"
                   style="width: 100%">
          <el-option v-for="item in statusList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('tobacco.tmaterial.bill.sendInfo')"
                    style="width:100%">
        <el-input v-bind:placeholder="$t('base.pleaseInput')"
                  type="textarea"
                  :span="4"
                  v-model="formItem.refBillInfo" />
      </el-form-item>
      <el-form-item :label="$t('tobacco.tmaterial.bill.desc')"
                    style="width:100%">
        <el-input v-bind:placeholder="$t('base.pleaseInput')"
                  type="textarea"
                  :span="4"
                  v-model="formItem.desc" />
      </el-form-item>

    </el-form>
    <el-table highlight-current-row
              border
              :data="this.formData.billItemList"
              style="width: 100%;min-height:300px"
              class="cas-group"
              v-if="step===1">
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

    <div style="width:100%;height: 40px; margin-top: 10px;">
      <el-button type="primary"
                 style="float: right"
                 v-if="step===0"
                 @click="step++">{{ $t('base.buttonNextStep') }}
      </el-button>
      <el-button type="primary"
                 style="float: right;margin-left:10px"
                 v-if="step===1"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
      <el-button type="primary"
                 style="float: right"
                 v-if="step===1"
                 @click="step--">{{ $t('base.buttonPreStep') }}
      </el-button>

    </div>
  </div>

</template>
<script>
import billApi from "../../api/tmaterial/apiBillIn";
import billOutApi from "../../api/tmaterial/apiBillOut";
import { parseDate } from "@/filters/index.js";
import booksApi from "../../api/tmaterial/apiBooks";
import warehouseApi from "../../api/tmaterial/apiWarehouse";
import UUID from "es6-uuid";
export default {
  props: ["operation", "visible"],
  data() {
    return {
      step: 0,
      loading: false,
      books: {},
      formItem: this.creatItem(),
      ruleValidate: {
        deliveryOrganizationId: [
          { required: true, message: "发货单位不能为空", trigger: "blur" }
        ],
        arriveOrganizationId: [
          { required: true, message: "到货单位不能为空", trigger: "blur" }
        ],
        author: [
          { required: true, message: "登记人不能为空", trigger: "blur" }
        ],
        deliver: [
          { required: true, message: "经办人不能为空", trigger: "blur" }
        ],
        refBillId: [
          { required: true, message: "发货单号不能为空", trigger: "blur" }
        ]
      },
      formData: {
        warehouseList: [],
        billList: [],
        billItemList: []
      },
      statusList: [
        { value: 0, label: "编辑" }
        // { value: 5, label: "确认" },
        // { value: 7, label: "作废" }
      ]
    };
  },
  created() {
    this.formItem.operation = this.operation;
    this.loading = true;
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
          if (response.content.length > 0) {
            this.books = response.content[0];
            this.load();
            this.loading = false;
            this.formItem.books = this.books.id;
          } else {
            this.$notify.error({
              title: "错误",
              message: "未设置有效账套"
            });
          }
        })
        .catch(error => {
          console.log(error);
          this.$notify.error({
            title: "错误",
            message: "获取账套信息失败,请刷新界面重试"
          });
        });
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
  watch: {
    operation(curl, old) {
      this.formItem.operation = curl;
    }
  },
  methods: {
    onSubmitClick(name) {
      this.formItem.books = this.books.id;
      this.$refs[name].validate(valid => {
        if (valid) {
          Promise.all([billApi.save(this.formItem)])
            .then(([response]) => {
              this.formItem.id = UUID(32, 36);
              //重置表单，允许多次操作
              this.$message({
                message: this.$t("message.saveAndContinue"),
                type: "info"
              });
              this.$emit("update:visible", false);
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },
    creatItem() {
      return {
        id: UUID(32, 36),
        serial: "",
        barcode: "",
        annual: this.$store.state.system.annual,
        accountPeriod: "",
        title: "",
        author: this.$store.state.user.userName,
        date: parseDate(new Date(), "yyyy-mm-dd"),
        operation: this.operation,
        deliveryOrganizationId: "",
        deliveryOrganizationName: "",
        deliveryInfo: "",
        arriveOrganizationId: "",
        arriveOrganizationName: "",
        arriveInfo: "",
        deliver: this.$store.state.user.userName,
        itemCount: 0,
        itemMoneys: 0,
        itemTaxs: 0,
        itemFreights: 0,
        itemTotals: 0,
        refBillId: "",
        refBillSerial: "",
        refBillBarcode: "",
        refBillInfo: "",
        print: 0,
        control: 0,
        desc: "",
        warehouse: "",
        books: "",
        organizationId: this.$store.state.user.organization.organizationId,
        organizationIds: [this.$store.state.user.organization.organizationId],
        organizationName: this.$store.state.user.organization.organizationName,
        organizationOrder: "",
        organizationCode: this.$store.state.user.organization.organizationId
      };
    },

    formReset(name) {
      this.$refs[name].resetFields();
      this.formItem.id = UUID(32, 36);
    },
    load() {},
    onWarehouseChanged(value) {
      let item = this.formData.warehouseList.find(it => {
        return it.id === value;
      });
      if (item !== undefined) {
        this.formItem.warehouse = item.id;
        this.formItem.accountPeriod = item.currentYearMonth;
      }
    },
    onArriveChanged(label, value) {
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
          this.formData.warehouseList = response.content;
          if (response.content.length > 0) {
            this.formItem.warehouse = this.formData.warehouseList[0].id;
            this.formItem.accountPeriod = this.formData.warehouseList[0].currentYearMonth;
          }
        })
        .catch(error => {});
    },
    loadBillList(keyword) {
      if (keyword !== "") {
        Promise.all([
          billOutApi.getNotEnter(this.formItem.organizationId, keyword, {
            size: 30,
            sort: "serial"
          })
        ])
          .then(([response]) => {
            this.formData.billList = response.content;
          })
          .catch(error => {});
      } else {
        this.materialList = [];
      }
    },
    onBillChanged(value) {
      let item = this.formData.billList.find(it => {
        return it.id === value;
      });
      if (item !== undefined) {
        this.formItem.refBillId = value;
        this.formItem.refBillSerial = item.serial;
        this.formItem.refBillBarcode = item.barcode;
        this.formItem.deliveryOrganizationId = item.deliveryOrganizationId;
        this.formItem.deliveryOrganizationName = item.deliveryOrganizationName;
        this.formItem.arriveOrganizationId = item.arriveOrganizationId;
        this.formItem.arriveOrganizationName = item.arriveOrganizationName;
        this.onArriveChanged(
          item.arriveOrganizationName,
          item.arriveOrganizationId
        );
      }
    }
  }
};
</script>
