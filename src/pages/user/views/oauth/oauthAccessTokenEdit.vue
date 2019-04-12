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
      <el-button plain v-show='isEdit'
                 type="primary"
                 style="float: right"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }} </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import oauthAccessTokenApi from "../../api/oauth/apiOauthAccessToken";
export default {
  props: ["item", "isEdit", "visible"],
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
          Promise.all([oauthAccessTokenApi.update(this.item.id, this.formItem)])
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
