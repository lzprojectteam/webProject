<template>
  <el-form :model="formItem"
           label-width="100px"
           :rules="ruleValidate"
           ref="formValidate">

    <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
      <organization-form :root="userOrgId"
                         @onchange="organizationOnchange"
                         style="width:100%" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.card.isn')"
                  prop="id">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.id" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.card.barcode')"
                  prop="code">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.barcode" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.card.number')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.number" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.card.serial')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.serial" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.card.content')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.content" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.card.date')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.date" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.card.model')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.model" />
    </el-form-item>

    <el-form-item :label="$t('tobacco.basic.card.type')">
      <el-select v-model="formItem.type"
                 style="width: 100%">
        <el-option value="RFID"
                   label="RFID" />
        <el-option value="IC"
                   label="IC" />
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.card.usage')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.usage" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.card.desc')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.desc" />
    </el-form-item>

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

import cardApi from "../../api/basic/api_card";

export default {
  data() {
    return {
      formItem: {
        id: "",
        barcode: "",
        content: "",
        date: "",
        model: "",
        number: "",
        serial: "",
        type: "RFID",
        usage: "",
        valid: true,
        desc: "",
        organizationId: this.$store.state.user.organization.organizationId,
        organizationName: this.$store.state.user.organization.organizationName,
        organizationOrder: "",
        organizationCode: this.$store.state.user.organization.organizationId
      },
      ruleValidate: {
        code: [{ required: true, message: "二维码不能为空", trigger: "blur" }],
        id: [{ required: true, message: "内码不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    this.formItem.organizationId = this.userOrgId;
  },
  components: {
    OrganizationForm
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
    organizationOnchange(label, value, values) {
      this.formItem.organizationId = value;
      this.formItem.organizationCode = value;
      this.formItem.organizationName = label;
      this.formItem.organizationOrder = "0";
    },
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          Promise.all([cardApi.saveCard(this.formItem)])
            .then(([response]) => {
              this.formReset(name);
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
    }
  }
};
</script>
