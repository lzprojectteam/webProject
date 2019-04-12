 <template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('tobacco.tfarm.processAttr.processId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.processId" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.processAttr.attrId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.attrId" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.processAttr.code')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.code" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.processAttr.label')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.label" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.processAttr.hintInput')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.hintInput" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.processAttr.hintPoint')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.hintPoint" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.processAttr.unit')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.unit" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.processAttr.type')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.type" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.processAttr.require')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.require" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.processAttr.min')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.min" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.processAttr.max')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.max" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.processAttr.point')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.point" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.processAttr.formula')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.formula" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.processAttr.weight')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.weight" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.processAttr.pattern')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.pattern" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.processAttr.position')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.position" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.processAttr.show')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.show" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.processAttr.desc')">
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
import processAttrApi from "../../api/tfarm/apiProcessAttr";
export default {
  props: ["item", "isEdit", "visible"],
  data() {
    return {
      formItem: {
        processId: "",
        attrId: 0,
        code: "",
        label: "",
        hintInput: "",
        hintPoint: "",
        unit: "",
        type: 0,
        require: true,
        min: 0,
        max: 0,
        point: 0,
        formula: "",
        weight: 0,
        pattern: "",
        position: 0,
        show: true,
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
            processAttrApi.updateProcessAttr(this.item.id, this.formItem)
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
