 <template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('tobacco.tfarm.processAttrEnum.processId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.processId" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.processAttrEnum.attrId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.attrId" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.processAttrEnum.enumId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.enumId" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.processAttrEnum.data')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.data" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.processAttrEnum.key')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.key" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.processAttrEnum.value')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.value" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.processAttrEnum.point')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.point" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.processAttrEnum.desc')">
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
import processAttrEnumApi from "../../api/tfarm/apiProcessAttrEnum";
export default {
  props: ["item", "isEdit", "visible"],
  data() {
    return {
      formItem: {
        processId: "",
        attrId: 0,
        enumId: 0,
        dataType: "",
        data: "",
        key: "",
        value: "",
        point: 0,
        desc: ""
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
            processAttrEnumApi.updateProcessAttrEnum(
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
