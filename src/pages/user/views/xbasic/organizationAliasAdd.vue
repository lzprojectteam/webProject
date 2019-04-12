<template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('xbasic.organizationAlias.organizationId')">
      <organization-form root="0"
                         style="width:100%"
                         :code.sync="formItem.organizationId" />
    </el-form-item>
    <el-form-item :label="$t('xbasic.organizationAlias.aliasId')">
      <template>
        <el-select v-model="formItem.aliasId"
                   filterable
                   allow-create
                   default-first-option
                   style="width:100%">
          <el-option key="AMAP"
                     label="AMAP"
                     value="AMAP" />
          <el-option key="IOP"
                     label="IOP"
                     value="IOP" />
          <el-option key="HS"
                     label="海晟"
                     value="HS" />
        </el-select>
      </template>
    </el-form-item>
    <el-form-item :label="$t('xbasic.organizationAlias.key')"
                  prop="key">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.key" />
    </el-form-item>
    <el-form-item :label="$t('xbasic.organizationAlias.code')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.code" />
    </el-form-item>
    <el-form-item :label="$t('xbasic.organizationAlias.name')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.name" />
    </el-form-item>
    <el-form-item :label="$t('xbasic.organizationAlias.desc')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.desc" />
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
import organizationAliasApi from "../../api/xbasic/apiOrganizationAlias";
export default {
  components: {
    "organization-form": () => import("@/components/Organization")
  },
  data() {
    return {
      formItem: {
        organizationId: "",
        aliasId: "",
        key: "",
        code: "",
        name: "",
        desc: ""
      },
      ruleValidate: {
        key: [{ required: true, message: "别名编码不能为空", trigger: "blur" }],
        organizationId: [
          { required: true, message: "请选择组织单位", trigger: "blur" }
        ],
        aliasId: [{ required: true, message: "请设置分类", trigger: "blur" }]
      }
    };
  },
  created() {},
  methods: {
    onSubmitClick(name) {
      if (
        this.formItem.organizationId === undefined ||
        this.formItem.organizationId === null ||
        this.formItem.organizationId === ""
      ) {
        this.$message({
          message: "请正确选择组织单位",
          type: "info"
        });
        return;
      }
      if (
        this.formItem.aliasId === undefined ||
        this.formItem.aliasId === null ||
        this.formItem.aliasId === ""
      ) {
        this.$message({
          message: "请设置分类",
          type: "info"
        });
        return;
      }
      this.$refs[name].validate(valid => {
        if (valid) {
          Promise.all([
            organizationAliasApi.saveOrganizationAlias(this.formItem)
          ])
            .then(([response]) => {
              this.formReset(name);
              this.formItem.code = "";
              this.formItem.name = "";
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
