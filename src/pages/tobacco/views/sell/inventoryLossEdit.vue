<template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-row>
      <el-col :span="24">
        <el-form-item :label="$t('tobacco.tsell.inventoryLoss.title')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.title" />
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
          <organization-form :root="userOrgId"
                             :orgId='formItem.organization.organizationId'
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

      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.invoice.statusName')">
          <status-select :label.sync="formItem.statusName"
                         :value.sync="formItem.statusId"
                         :key.sync="formItem.statusId"
                         style="width:100%;" />
        </el-form-item>
      </el-col>
      <el-col :span="12"
              v-show='!isEdit'>
        <el-form-item :label="$t('tobacco.tsell.invoice.rankName')">
          <rank-select :label.sync="formItem.rankName"
                       :value.sync="formItem.rankId"
                       :key.sync="formItem.rankId"
                       style="width:100%;" />
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.invoice.typeName')">
          <type-variety-grade-select :allData.sync="allData"
                                     :varietyName.sync="formItem.varietyName"
                                     :varietyId.sync="formItem.varietyId"
                                     :typeId.sync="formItem.typeId"
                                     :typeName.sync="formItem.typeName"
                                     :gradeId.sync="formItem.gradeId"
                                     :gradeName.sync="formItem.gradeName"
                                     :gradeCode.sync="formItem.gradeCode"
                                     style="width:100%;" />
        </el-form-item>
      </el-col>
      <el-col :span="12"
              v-show='!isEdit'>
        <el-form-item :label="$t('tobacco.tsell.inventoryLoss.serial')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.serial"
                    disabled />
        </el-form-item>
      </el-col>

      <el-col :span="12"
              v-show='!isEdit'>
        <el-form-item :label="$t('tobacco.tsell.inventoryLoss.price')"
                      prop="price">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')"
                           v-model="formItem.price"
                           style="width: 100%;" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.inventoryLoss.weight')"
                      prop="weight">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')"
                           v-model="formItem.weight"
                           style="width: 100%;" />
        </el-form-item>
      </el-col>

      <el-col :span="12"
              v-show='!isEdit'>
        <el-form-item :label="$t('tobacco.tsell.inventoryLoss.money')"
                      prop="money">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')"
                           v-model="formItem.money"
                           style="width: 100%;" />
        </el-form-item>
      </el-col>
      <el-col :span="12"
              v-show='!isEdit'>
        <el-form-item :label="$t('tobacco.tsell.inventoryLoss.receiptId')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.receiptId" />
        </el-form-item>
      </el-col>

      <el-col :span="12"
              v-show='!isEdit'>
        <el-form-item :label="$t('tobacco.tsell.inventoryLoss.receiptNumber')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.receiptNumber" />
        </el-form-item>
      </el-col>
      <el-col :span="12"
              v-show='!isEdit'>
        <el-form-item :label="$t('tobacco.tsell.inventoryLoss.paymentId')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.paymentId" />
        </el-form-item>
      </el-col>

      <el-col :span="12"
              v-show='!isEdit'>
        <el-form-item :label="$t('tobacco.tsell.inventoryLoss.paymentNumber')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.paymentNumber" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.inventoryLoss.control')">
          <el-select v-model='formItem.control'
                     style="width:100%;">
            <el-option v-for="item in  formData.stateList"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="24">
        <el-form-item :label="$t('tobacco.tsell.inventoryLoss.desc')">
          <el-input type="textarea"
                    v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.desc" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button v-show='isEdit'
                 type="primary"
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
  props: ["item", "isEdit", "visible"],
  data() {
    return {
      allData: {},
      formItem: {
        annual: "",
        serial: "",
        title: "",
        author: "",
        date: "",
        countryId: "",
        countryName: "",
        tyear: "",
        areaId: "",
        areaName: "",
        typeId: "",
        typeName: "",
        varietyId: "",
        varietyName: "",
        statusId: "",
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
        control: "",
        organizationId: "",
        desc: "",
        organization: {
          organizationId: this.$store.state.user.organization.organizationId,
          organizationCode: this.$store.state.user.organization
            .organizationCode,
          organizationName: this.$store.state.user.organization.organizationName
        }
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
    this.load();
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
    load() {
      this.formItem = JSON.parse(JSON.stringify(this.item));
      this.allData = {};
      //初始化烟叶类型等数据，用于回显
      this.allData["typeId"] = this.formItem.typeId;
      this.allData["varietyId"] = this.formItem.varietyId;
      this.allData["gradeId"] = this.formItem.gradeId;
      this.formItem.annual = this.formItem.annual.toString();
      this.formItem.tyear = this.formItem.tyear.toString();
      this.formItem.organizationId = this.formItem.organization.organizationId;
      this.formItem.organizationCode = this.formItem.organization.organizationId;
      this.formItem.organizationName = this.formItem.organization.organizationName;
      this.formItem.organizationOrder = this.formItem.organization.organizationOrder;
    },
    organizationOnchange(label, value, values) {
      this.formItem.organization.organizationId = value;
      this.formItem.organization.organizationCode = value;
      this.formItem.organization.organizationName = label;
      this.formItem.organization.organizationOrder = "0";
    },
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        //进行前端检验
        if (valid) {
          Promise.all([
            inventoryLossApi.updateInventoryLoss(this.item.id, this.formItem)
          ])
            .then(([response]) => {
              this.formReset("formValidate");
              this.$message({
                message: this.$t("message.editAndExid"),
                type: "success"
              });
              this.$emit("update:visible", false);
              this.$emit("refresh");
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
  watch: {
    item(curVal, oldVal) {
      this.formItem = JSON.parse(JSON.stringify(curVal));
      console.info(123);
      this.load();
    }
  }
};
</script>
