 <template>
  <el-form :model="formItem"
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
                         :name.sync="formItem.deliveryOrganizationName"
                         :placeholder="placeholder.deliveryOrganizationName" />
    </el-form-item>

    <el-form-item :label="$t('tobacco.tmaterial.bill.arriveOrganizationName')"
                  prop="arriveOrganizationId">

      <organization-form :root="userOrgId"
                         style="width:100%"
                         :showRoot="false"
                         :code.sync="formItem.arriveOrganizationId"
                         :name.sync="formItem.arriveOrganizationName"
                         :placeholder="placeholder.arriveOrganizationName"
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
                v-model="formItem.refBillId" />
    </el-form-item>

    <el-form-item :label="$t('tobacco.tmaterial.bill.serial')">
      <el-input placeholder="如果为空，则自动生成"
                disabled
                v-model="formItem.serial" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.bill.year')">
      <el-input-number v-bind:placeholder="$t('base.pleaseInput')"
                       style="width:100%"
                       v-model="formItem.year" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.bill.month')">
      <el-input-number v-bind:placeholder="$t('base.pleaseInput')"
                       style="width:100%"
                       v-model="formItem.month" />
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
    <el-form-item>
      <el-button v-show='isEdit'
                 type="primary"
                 style="float: right"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }} </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import billApi from "../../api/tmaterial/apiBillIn";
import { parseDate } from "@/filters/index.js";
import booksApi from "../../api/tmaterial/apiBooks";
import warehouseApi from "../../api/tmaterial/apiWarehouse";
export default {
  props: ["item", "operation", "isEdit", "visible"],
  data() {
    return {
      books: {},
      formItem: {
        type: "",
        serial: "",
        barcode: "",
        year: 0,
        month: 0,
        title: "",
        author: "",
        date: "",
        operation: "",
        deliveryOrganizationId: "",
        deliveryOrganizationName: "",
        deliveryInfo: "",
        arriveOrganizationId: "",
        arriveOrganizationName: "",
        arriveInfo: "",
        deliver: "",
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
        desc: ""
      },
      ruleValidate: {
        code: [{ required: true, message: "编码不能为空", trigger: "blur" }]
      },
      statusList: [
        { value: 0, label: "编辑" },
        { value: 5, label: "确认" },
        { value: 7, label: "作废" }
      ],
      placeholder: {
        deliveryOrganizationName: "",
        arriveOrganizationName: ""
      },
      formData: {
        warehouseList: []
      }
    };
  },
  created() {
    this.formItem = JSON.parse(JSON.stringify(this.item));
    this.formItem.operation = this.operation;

    this.placeholder.deliveryOrganizationName = this.item.deliveryOrganizationName;
    this.placeholder.arriveOrganizationName = this.item.arriveOrganizationName;
    this.onArriveChanged("", this.formItem.arriveOrganizationId);
  },
  methods: {
    onArriveChanged(label, value) {
      this.formData.warehouseList = [];
      let search = "organization.organizationId:eq:{orgid};control:eq:1".format(
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
    onWarehouseChanged(value) {
      let item = this.formData.warehouseList.find(it => {
        return it.id === value;
      });
      if (item !== undefined) {
        this.formItem.warehouse = item.id;
        this.formItem.accountPeriod = item.currentYearMonth;
      }
    },
    load() {
      if (this.item) this.formItem = JSON.parse(JSON.stringify(this.item));
      else this.formItem = this.item;
    },
    onSubmitClick(name) {
      Object.assign(this.formItem, this.formItem.organization);
      this.$refs[name].validate(valid => {
        //进行前端检验
        if (valid) {
          Promise.all([billApi.update(this.item.id, this.formItem)])
            .then(([response]) => {
              this.formReset(name);
              this.$message({
                message: this.$t("message.saveAndContinue"),
                type: "info"
              });
              this.$emit("update:visible", false);
            })
            .catch(error => {});
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
    item(curVal, oldVal) {
      if (curVal !== null && curVal !== undefined) {
        this.formItem = JSON.parse(JSON.stringify(curVal));
        this.placeholder.deliveryOrganizationName = this.formItem.deliveryOrganizationName;
        this.placeholder.arriveOrganizationName = this.formItem.arriveOrganizationName;
        this.load();
      } else {
        this.formItem = {};
      }
    },
    operation(curl, old) {
      this.formItem.operation = curl;
    }
  }
};
</script>
