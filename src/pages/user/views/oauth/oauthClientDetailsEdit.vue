 <template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('oauthClientDetails.clientId')">
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
    <el-form-item :label="$t('oauthClientDetails.authorizedGrantTypes')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.authorizedGrantTypes" />
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
      <el-button plain v-show='isEdit'
                 type="primary"
                 style="float: right"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }} </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import oauthClientDetailsApi from "../../api/oauth/apiOauthClientDetails";
export default {
  props: ["item", "isEdit", "visible"],
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
        trusted: true
      },
      ruleValidate: {
        code: [{ required: true, message: "编码不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.formItem = JSON.parse(JSON.stringify(this.item));
    },
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        //进行前端检验
        if (valid) {
          Promise.all([
            oauthClientDetailsApi.update(this.item.id, this.formItem)
          ])
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
  watch: {
    item(curVal, oldVal) {
      this.formItem = JSON.parse(JSON.stringify(curVal));
      this.load();
    }
  }
};
</script>
