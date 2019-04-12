 <template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('casit.tmisc.facilityAttribute.typeId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.typeId" />
    </el-form-item>
    <el-form-item :label="$t('casit.tmisc.facilityAttribute.attributeId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.attributeId" />
    </el-form-item>
    <el-form-item :label="$t('casit.tmisc.facilityAttribute.code')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.code" />
    </el-form-item>
    <el-form-item :label="$t('casit.tmisc.facilityAttribute.label')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.label" />
    </el-form-item>
    <el-form-item :label="$t('casit.tmisc.facilityAttribute.unit')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.unit" />
    </el-form-item>
    <el-form-item :label="$t('casit.tmisc.facilityAttribute.hint')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.hint" />
    </el-form-item>
    <el-form-item :label="$t('casit.tmisc.facilityAttribute.type')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.type" />
    </el-form-item>
    <el-form-item :label="$t('casit.tmisc.facilityAttribute.require')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.require" />
    </el-form-item>
    <el-form-item :label="$t('casit.tmisc.facilityAttribute.min')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.min" />
    </el-form-item>
    <el-form-item :label="$t('casit.tmisc.facilityAttribute.max')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.max" />
    </el-form-item>
    <el-form-item :label="$t('casit.tmisc.facilityAttribute.pattern')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.pattern" />
    </el-form-item>
    <el-form-item :label="$t('casit.tmisc.facilityAttribute.show')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.show" />
    </el-form-item>
    <el-form-item :label="$t('casit.tmisc.facilityAttribute.visible')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.visible" />
    </el-form-item>
    <el-form-item :label="$t('casit.tmisc.facilityAttribute.position')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.position" />
    </el-form-item>
    <el-form-item :label="$t('casit.tmisc.facilityAttribute.desc')">
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
import facilityAttributeApi from "../../api/tmisc/api_facilityAttribute";
export default {
  props: ["item", "isEdit", "visible"],
  data() {
    return {
      formItem: {
        typeId: "",
        attributeId: 0,
        code: "",
        label: "",
        unit: "",
        hint: "",
        type: 0,
        require: true,
        min: 0,
        max: 0,
        pattern: "",
        show: true,
        visible: 0,
        position: 0,
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
            facilityAttributeApi.updateFacilityAttribute(
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
