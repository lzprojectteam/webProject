<template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate"
           status-icon>
    <el-form-item :label="$t('navbar.loginName')">
      <el-input v-model="$store.state.user.loginName"
                disabled></el-input>
    </el-form-item>
    <el-form-item :label="$t('navbar.name')">
      <el-input v-model="$store.state.user.userName"
                disabled></el-input>
    </el-form-item>
    <el-form-item :label="$t('navbar.organizationName')">
      <el-input v-if='$store.state.user.organization!==undefined'
                v-model="$store.state.user.organization.organizationName"
                disabled></el-input>
      <el-input v-else
                disabled></el-input>
    </el-form-item>
    <el-form-item :label="$t('navbar.districtName')">
      <el-input v-model="$store.state.user.districtName"
                disabled></el-input>
    </el-form-item>

    <el-form-item>
      <el-button plain @click="onSubmitClick(formItem)"
                 type="primary"
                 style="float: right">{{ $t('base.buttonOk') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
//import userApi from '@/api/base/apiUser';

export default {
  props: ["visible"],
  data() {
    return {
      formItem: {
        oldPassword: "",
        password: "",
        confirmPassword: ""
      },
      ruleValidate: {}
    };
  },
  created() {},
  methods: {
    onSubmitClick(name) {
      this.$emit("update:visible", false);
      // this.$refs[name].validate((valid) => { // 进行前端检验
      // });
    },

    formReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>
<style scoped>
.el-input__inner {
  background-color: white !important;
  color: black !important;
}
</style>
