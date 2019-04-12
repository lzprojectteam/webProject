<template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('oauthAccessToken.tokenId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.tokenId" />
    </el-form-item>
    <el-form-item :label="$t('oauthAccessToken.token')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.token" />
    </el-form-item>
    <el-form-item :label="$t('oauthAccessToken.authenticationId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.authenticationId" />
    </el-form-item>
    <el-form-item :label="$t('oauthAccessToken.userName')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.userName" />
    </el-form-item>
    <el-form-item :label="$t('oauthAccessToken.clientId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.clientId" />
    </el-form-item>
    <el-form-item :label="$t('oauthAccessToken.authentication')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.authentication" />
    </el-form-item>
    <el-form-item :label="$t('oauthAccessToken.refreshToken')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.refreshToken" />
    </el-form-item>

    <el-form-item>
      <el-button plain type="primary"
                 style="float: right"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import oauthAccessTokenApi from "../../api/oauth/apiOauthAccessToken";
export default {
  data() {
    return {
      formItem: {
        tokenId: "",
        token: 0,
        authenticationId: "",
        userName: "",
        clientId: "",
        authentication: 0,
        refreshToken: ""
      },
      ruleValidate: {
        code: [{ required: true, message: "编码不能为空", trigger: "blur" }]
      }
    };
  },
  created() {},
  methods: {
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          Promise.all([oauthAccessTokenApi.save(this.formItem)])
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
