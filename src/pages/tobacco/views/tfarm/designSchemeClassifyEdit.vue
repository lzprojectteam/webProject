 <template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate"
           :readonly="!isEdit">
    <el-form-item :label="$t('base.id')"
                  prop="id">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.id"
                readonly />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.designSchemeClassify.name')"
                  prop="name">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.name" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.designSchemeClassify.position')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.position" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.designSchemeClassify.desc')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
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
import designSchemeClassifyApi from "../../api/tfarm/apiDesignSchemeClassify";
export default {
  props: ["item", "isEdit", "visible"],
  data() {
    return {
      formItem: {
        code: "",
        position: 0,
        desc: ""
      },
      ruleValidate: {
        name: [{ required: true, message: "编码不能为空", trigger: "blur" }]
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
            designSchemeClassifyApi.updateDesignSchemeClassify(
              this.item.id,
              this.formItem
            )
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
