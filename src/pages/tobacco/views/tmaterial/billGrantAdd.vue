<template>
  <el-form v-loading.fullscreen.lock="loading"
           :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate"
           class="cas-group cas-flex-2">
    <el-form-item :label="$t('tobacco.tmaterial.bill.deliveryOrganizationName')"
                  prop="deliveryOrganizationId">

      <organization-form root="XC"
                         style="width:100%"
                         :showRoot="false"
                         :code.sync="formItem.deliveryOrganizationId"
                         :name.sync="formItem.deliveryOrganizationName" />
    </el-form-item>

    <el-form-item :label="$t('tobacco.tmaterial.bill.arriveOrganizationName')"
                  prop="arriveOrganizationId">

      <organization-form :root="userOrgId"
                         style="width:100%"
                         :code.sync="formItem.arriveOrganizationId"
                         :name.sync="formItem.arriveOrganizationName"
                         @onchange="onArriveChanged" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.bill.arriveWarehouse')"
                  prop="warehouse">

      <el-select v-model="formItem.warehouse"
                 @change="onWarehouseChanged">
        <el-option v-for="item in formData.warehouseList"
                   :key="item.id"
                   :label="item.name"
                   :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.bill.sendBillSerial')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.refBillSerial" />
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
    <el-form-item style="width:100%">
      <el-button type="primary"
                 style="float: right"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import billApi from "../../api/tmaterial/apiBillIn";
import { parseDate } from "@/filters/index.js";
import booksApi from "../../api/tmaterial/apiBooks";
import warehouseApi from "../../api/tmaterial/apiWarehouse";
import UUID from "es6-uuid";
export default {
  props: ["operation", "visible"],
  data() {
    return {
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
        warehouse: [
          { required: true, message: "物资仓库不能为空", trigger: "blur" }
        ]
      },
      formData: {
        warehouseList: []
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
    this.formItem.arriveOrganizationId = this.userOrgId;
    this.formItem.arriveOrganizationName = this.$store.state.user.organization.organizationName;
    this.onArriveChanged("", this.formItem.arriveOrganizationId);
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
  components: {
    OrganizationForm: () => import("@/components/Organization")
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
          this.formData.warehouseList = response.content;
          if (response.content.length > 0) {
            this.formItem.warehouse = this.formData.warehouseList[0].id;
            this.formItem.accountPeriod = this.formData.warehouseList[0].currentYearMonth;
          }
        })
        .catch(error => {});
    }
  }
};
</script>
