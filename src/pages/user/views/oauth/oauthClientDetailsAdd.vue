<template>
  <el-form :model="formItem"
           label-width="120px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('oauthClientDetails.clientId')"
                  prop="clientId">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.clientId" />
    </el-form-item>
    <el-form-item :label="$t('oauthClientDetails.resourceIds')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.resourceIds" />
    </el-form-item>
    <el-form-item :label="$t('oauthClientDetails.clientSecret')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.clientSecret" />
    </el-form-item>
    <el-form-item :label="$t('oauthClientDetails.scope')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.scope" />
    </el-form-item>
    <el-form-item :label="$t('oauthClientDetails.authorizedGrantTypes')"
                  prop="authorizedGrantTypes">

      <el-select v-model="formItem.authorizedGrantTypes"
                 multiple
                 :placeholder="$t('base.pleaseSelect')"
                 style="width:100%">
        <el-option v-for="item in GrantTypeList"
                   :key="item"
                   :label="item"
                   :value="item">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('oauthClientDetails.redirectUri')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.redirectUri" />
    </el-form-item>
    <el-form-item :label="$t('oauthClientDetails.authorities')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.authorities" />
    </el-form-item>
    <el-form-item :label="$t('oauthClientDetails.accessTokenValidity')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.accessTokenValidity" />
    </el-form-item>
    <el-form-item :label="$t('oauthClientDetails.refreshTokenValidity')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.refreshTokenValidity" />
    </el-form-item>
    <el-form-item :label="$t('oauthClientDetails.additionalInformation')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.additionalInformation" />
    </el-form-item>
    <el-form-item :label="$t('oauthClientDetails.autoApprove')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.autoApprove" />
    </el-form-item>
    <el-form-item :label="$t('oauthClientDetails.trusted')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.trusted" />
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
import oauthClientDetailsApi from "../../api/oauth/apiOauthClientDetails";
export default {
  data() {
    return {
      formItem: {
        clientId: "",
        resourceIds: "",
        clientSecret: "",
        scope: "",
        authorizedGrantTypes: "",
        redirectUri: "",
        authorities: "",
        accessTokenValidity: "",
        refreshTokenValidity: "",
        additionalInformation: "",
        autoApprove: "",
        trusted: ""
      },
      ruleValidate: {
        clientId: [
          { required: true, message: "编码不能为空", trigger: "blur" }
        ],
        authorizedGrantTypes: [
          { required: true, message: "认证类型不能为空", trigger: "blur" }
        ]
      },
      GrantTypeList: [
        "authorization_code",
        "password",
        "refresh_token",
        "implicit",
        "client_credentials"
      ]
    };
  },
  created() {},
  methods: {
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          Promise.all([oauthClientDetailsApi.save(this.formItem)])
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
