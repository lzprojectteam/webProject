<template>
  <el-form :model="formItem"
           label-width="90px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-row>
      <el-col :span="24">
        <el-form-item :label="$t('tobacco.tsell.inventoryLoss.title')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.title" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
          <organization-form :root="userOrgId"
                             @onchange="organizationOnchange"
                             style="width:100%" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.setup.parameter.annual')">
          <el-date-picker value-format="yyyy"
                          v-model="formItem.annual"
                          type="year"
                          :placeholder="$t('base.pleaseSelect')"
                          style="width: 100%">
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.inventoryLoss.author')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.author" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.inventoryLoss.date')">
          <el-date-picker v-model="formItem.date"
                          type="date"
                          style="width:100%;"
                          :placeholder="$t('base.pleaseSelect')">
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.inventoryLoss.tyear')">
          <el-date-picker value-format="yyyy"
                          v-model="formItem.tyear"
                          type="year"
                          :placeholder="$t('base.pleaseSelect')"
                          style="width: 100%">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.invoice.areaName')">
          <area-select :label.sync="formItem.areaName"
                       :value.sync="formItem.areaId"
                       :key.sync="formItem.areaId"
                       style="width:100%;" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.invoice.statusName')">
          <status-select :label.sync="formItem.statusName"
                         :value.sync="formItem.statusId"
                         :key.sync="formItem.statusId"
                         style="width:100%;" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.invoice.typeName')">
          <type-variety-grade-select :varietyName.sync="formItem.varietyName"
                                     :varietyId.sync="formItem.varietyId"
                                     :typeId.sync="formItem.typeId"
                                     :typeName.sync="formItem.typeName"
                                     :gradeId.sync="formItem.gradeId"
                                     :gradeName.sync="formItem.gradeName"
                                     :gradeCode.sync="formItem.gradeCode"
                                     style="width:100%;" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.inventoryLoss.weight')"
                      prop="weight">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.weight" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.inventoryLoss.control')">
          <el-select v-model="formItem.control"
                     placeholder="请选择"
                     style="width:100%;">
            <el-option v-for="(val,key) in controlList"
                       :key="key"
                       :label="val"
                       :value="key">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item :label="$t('tobacco.tsell.inventoryLoss.desc')">
          <el-input type="textarea"
                    v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.desc" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item>
      <el-button type="primary"
                 style="float: right"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
const OrganizationForm = () => import("@/components/Organization");
const areaSelect = () => import("../components/areaSelect");
const typeSelect = () => import("@/components/Tobacco/typeSelect");
const statusSelect = () => import("../components/statusSelect");
const rankSelect = () => import("../components/rankSelect");
const varietySelect = () => import("@/components/Tobacco/varietySelect");
const typeVarietySelect = () =>
  import("@/components/Tobacco/typeVarietySelect");
const typeGradeSelect = () => import("@/components/Tobacco/typeGradeSelect");
const typeVarietyGradeSelect = () =>
  import("@/components/Tobacco/typeVarietyGradeSelect");
import inventoryLossApi from "../../api/tsell/api_inventoryLoss";

export default {
  data() {
    return {
      formItem: {
        annual: "",
        serial: "",
        title: "",
        author: this.$store.state.user.userName,
        date: "",
        countryId: "86",
        countryName: "中国",
        tyear: "",
        areaId: "0",
        areaName: "",
        typeId: "",
        typeName: "",
        varietyId: "",
        varietyName: "",
        statusId: "901",
        statusName: "",
        rankId: "",
        rankName: "",
        gradeId: "",
        gradeCode: "",
        gradeName: "",
        price: "",
        weight: "",
        money: "",
        receiptId: "",
        receiptNumber: "",
        paymentId: "",
        paymentNumber: "",
        control: "5",
        desc: "",
        organizationId: this.$store.state.user.organization.organizationId,
        organizationOrder: 0,
        organizationCode: this.$store.state.user.organization.organizationCode,
        organizationName: this.$store.state.user.organization.organizationName
      },
      formData: {
        stateList: [
          { id: 0, name: "全部" },
          { id: 1, name: "交售中" },
          { id: 3, name: "退烟" },
          { id: 5, name: "正常" },
          { id: 6, name: "冲红" }
        ]
      },
      controlList: {
        "0": "全部",
        "1": "交售中",
        "3": "退烟",
        "5": "正常",
        "7": "冲红"
      },
      ruleValidate: {
        code: [{ required: true, message: "编码不能为空", trigger: "blur" }],
        price: [
          {
            pattern: /^\d+(?=\.{0,1}\d+$|$)/,
            message: "只能是数字",
            trigger: "blur"
          }
        ],
        weight: [
          {
            pattern: /^\d+(?=\.{0,1}\d+$|$)/,
            message: "只能是数字",
            trigger: "blur"
          }
        ],
        money: [
          {
            pattern: /^\d+(?=\.{0,1}\d+$|$)/,
            message: "只能是数字",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.formItem.annual = new Date().getFullYear().toString();
    this.formItem.tyear = new Date().getFullYear().toString();
    this.formItem.date = this.getNowFormatDate();
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
  components: {
    OrganizationForm,
    areaSelect,
    typeGradeSelect,
    typeSelect,
    varietySelect,
    typeVarietySelect,
    statusSelect,
    rankSelect,
    "type-grade-select": typeGradeSelect,
    typeVarietyGradeSelect
  },
  methods: {
    organizationOnchange(label, value, values) {
      this.formItem.organization.organizationId = value;
      this.formItem.organizationId = value;
      this.formItem.organization.organizationCode = value;
      this.formItem.organization.organizationName = label;
      this.formItem.organization.organizationOrder = "0";
    },
    getNowFormatDate() {
      let date = new Date();
      let seperator1 = "-";
      let seperator2 = ":";
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      let hour = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      if (month < 10) {
        month = "0" + month;
      }
      if (strDate < 10) {
        strDate = "0" + strDate;
      }
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      let currentdate =
        date.getFullYear() +
        seperator1 +
        month +
        seperator1 +
        strDate +
        " " +
        hour +
        seperator2 +
        minutes +
        seperator2 +
        seconds;
      return currentdate;
    },
    onSubmitClick(name) {
      console.log(this.formItem);
      this.$refs[name].validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "处理中,请稍后",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          Promise.all([inventoryLossApi.saveInventoryLoss(this.formItem)])
            .then(([response]) => {
              loading.close();
              this.formReset(name);
              //重置表单，允许多次操作
              this.$message({
                message: this.$t("message.saveAndContinue"),
                type: "info"
              });
            })
            .catch(error => {
              loading.close();
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
    }
  }
};
</script>
