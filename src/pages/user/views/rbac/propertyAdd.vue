<template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('base.code')"
                  prop="id">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.id" />
    </el-form-item>

    <el-form-item :label="$t('base.name')"
                  prop="name">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.name" />
    </el-form-item>
    <el-form-item :label="$t('property.tag')"
                  prop="tag">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.tag" />
    </el-form-item>
    <el-form-item :label="$t('property.lead')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.lead" />
    </el-form-item>

    <el-row>
      <el-col :span="8">
        <el-form-item :label="$t('property.position')">
          <el-input-number :min="1"
                           :max="1000"
                           v-model="formItem.position" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item :label="$t('base.visible')">
          <el-switch v-model="formItem.visible" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('property.leaf')">
          <el-switch v-model="formItem.leaf" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item>
      <el-button plain type="primary"
                 style="float: right"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import propertyApi from "../../api/apiProperty";

export default {
  data() {
    return {
      formItem: {
        id: "",
        lead: "",
        leaf: true,
        name: "",
        position: "",
        tag: "",
        visible: true
      },
      ruleValidate: {
        id: [
          {
            required: true,
            message: "编码至少1个字符",
            trigger: "blur",
            min: 1,
            max: 32
          }
        ],
        name: [
          { required: true, message: "名称不能为空", trigger: "blur", min: 2 }
        ],
        tag: [{ required: true, message: "不能为空", trigger: "blur", min: 2 }]
      }
    };
  },
  created() {},
  methods: {
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        // 进行前端检验
        if (valid) {
          Promise.all([propertyApi.saveProperty(this.formItem)])
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
