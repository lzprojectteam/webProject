<template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('xbasic.district.lead')">
      <organization-form ref="org"
                         root="51"
                         @onchange="organizationOnchange"
                         model="district"
                         style="width:100%" />
    </el-form-item>

    <el-form-item :label="$t('xbasic.district.code')"
                  prop="code">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.code" />
    </el-form-item>

    <el-form-item :label="$t('xbasic.district.name')"
                  prop="name">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.name" />
    </el-form-item>
    <el-form-item :label="$t('xbasic.district.sname')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.sname" />
    </el-form-item>
    <el-form-item :label="$t('xbasic.district.iname')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.iname" />
    </el-form-item>
    <el-form-item :label="$t('xbasic.district.ids')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.ids" />
    </el-form-item>
    <el-form-item :label="$t('xbasic.district.names')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.names" />
    </el-form-item>
    <el-form-item :label="$t('xbasic.district.snames')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.snames" />
    </el-form-item>
    <el-form-item :label="$t('xbasic.district.inames')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.inames" />
    </el-form-item>
    <el-form-item :label="$t('xbasic.district.alpha')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.alpha" />
    </el-form-item>
    <el-form-item :label="$t('xbasic.district.desc')">
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
import districtApi from "../../api/xbasic/apiDistrict";
const OrganizationForm = () => import("@/components/Organization");
export default {
  data() {
    return {
      formItem: {
        id: "",
        countryId: "86",
        districtId: "",
        code: "",
        lead: "",
        leaf: true,
        name: "",
        sname: "",
        iname: "",
        ids: "",
        names: "",
        snames: "",
        inames: "",
        alpha: "",
        desc: ""
      },
      ruleValidate: {
        code: [{ required: true, message: "编码不能为空", trigger: "blur" }],
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }]
      }
    };
  },
  components: {
    OrganizationForm
  },
  created() {},
  methods: {
    organizationOnchange(label, value, labels, values) {
      this.formItem.districtId = value;
      let codes = value.split("_");
      this.formItem.code = codes[codes.length - 1];
      this.formItem.lead = codes[codes.length - 1];
      let names = "";
      for (let ll of labels) {
        names += ll + "-";
      }
      this.formItem.names = names;
    },
    onSubmitClick(name) {
      this.formItem.districtId = this.formItem.code;
      this.formItem.id = this.formItem.countryId + this.formItem.code;
      this.$refs[name].validate(valid => {
        if (valid) {
          Promise.all([districtApi.saveDistrict(this.formItem)])
            .then(([response]) => {
              this.formReset(name);
              this.$refs.org.loadData();
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
