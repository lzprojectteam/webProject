<template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('systemAdditional.systemId')"
                  prop="systemId">

      <el-select v-model='formItem.systemId'
                 style="width: 100%">
        <el-option value='-'
                   key='-'>{{ $t('base.all') }} </el-option>
        <el-option v-for="item in  formData.systemList"
                   :key="item.id"
                   :label="item.name"
                   :value="item.id">
        </el-option>

      </el-select>

    </el-form-item>
    <el-form-item :label="$t('systemAdditional.code')"
                  prop="code">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.code" />
    </el-form-item>
    <el-form-item :label="$t('systemAdditional.value')"
                  prop="value">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.value" />
    </el-form-item>
    <el-form-item :label="$t('systemAdditional.name')"
                  prop="name">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.name" />
    </el-form-item>
    <el-form-item :label="$t('systemAdditional.desc')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.desc" />
    </el-form-item>
    <el-form-item>
      <el-button plain v-show='isEdit'
                 type="primary"
                 style="float: right"
                 @click="onSubmitClick('formValidate')">
        {{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import systemAdditionalApi from "../../api/apiSystemAdditional";
import systemApi from "../../api/apiSystem";

export default {
  props: ["item", "isEdit", "visible"],
  data() {
    return {
      formItem: {
        systemId: "",
        code: "",
        value: "",
        name: "",
        desc: ""
      },
      formData: {
        systemList: []
      },
      ruleValidate: {
        systemId: [
          { required: true, message: "系统不能为空", trigger: "blur" }
        ],
        code: [{ required: true, message: "编码不能为空", trigger: "blur" }],
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        value: [{ required: true, message: "值不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.formItem = JSON.parse(JSON.stringify(this.item));
      Promise.all([systemApi.getAll()])
        .then(([systems]) => {
          this.formData.systemList = systems.content;
        })
        .catch(error => {});
    },
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        // 进行前端检验
        if (valid) {
          Promise.all([
            systemAdditionalApi.updateSystemAdditional(
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
