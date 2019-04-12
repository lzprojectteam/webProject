<template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('dynamicParam.name')"
                  prop="name">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.name" />
    </el-form-item>
    <el-form-item :label="$t('dynamicParam.title')"
                  prop="title">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.title" />
    </el-form-item>
    <el-form-item :label="$t('dynamicParam.type')"
                  prop="type">
      <el-select style="width:100%"
                 v-model="formItem.type">
        <el-option v-for="item in dataTypeList"
                   :key="item"
                   :label="item"
                   :value="item" />
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('dynamicParam.collection')"
                  prop="collectinType">
      <el-select style="width:100%"
                 v-model="formItem.collectinType">
        <el-option v-for="item in collectionTypeList"
                   :key="item"
                   :label="item.lable"
                   :value="item.key" />
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('dynamicParam.testValue')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.testValue" />
    </el-form-item>
    <el-form-item :label="$t('dynamicParam.defaultValue')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.defaultValue" />
    </el-form-item>
    <el-form-item :label="$t('dynamicParam.format')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.format" />
    </el-form-item>
    <el-form-item :label="$t('dynamicParam.constant')">
      <el-switch v-bind:placeholder="$t('base.pleaseInput')"
                 v-model="formItem.constant" />
    </el-form-item>
    <el-form-item :label="$t('dynamicParam.description')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.description"
                type="textarea"
                :rows="2" />
    </el-form-item>
    <el-form-item>
      <el-button plain v-show='isEdit'
                 type="primary"
                 style="float: right"
                 @click="onSubmitClick('formValidate')">{{
        $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import dynamicParamApi from "../../api/online/apiDynamicParam";

export default {
  props: ["item", "isEdit", "visible"],
  data() {
    return {
      dataTypeList: [
        "String",
        "Integer",
        "Double",
        "Date",
        "DateTime",
        "Boolean"
      ],
      collectionTypeList: [
        { key: "0", lable: "默认" },
        { key: "1", lable: "集合" }
      ],
      formItem: {
        methodId: "",
        name: "",
        title: "",
        type: "",
        testValue: "",
        defaultValue: "",
        format: "",
        constant: true,
        description: "",
        collectinType: "0"
      },

      ruleValidate: {
        name: [{ required: true, message: "参数名不能为空", trigger: "blur" }],
        type: [{ required: true, message: "请选择数据类型", trigger: "blur" }],
        title: [{ required: true, message: "显示名不能为空", trigger: "blur" }]
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
            dynamicParamApi.updateDynamicParam(this.item.id, this.formItem)
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
