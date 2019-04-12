<template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('role.parent')">
      <el-cascader :options="formData.roleList"
                   change-on-select
                   v-model="formData.topRole"
                   :props='menuProps'
                   @change="onTopRoleChanged"
                   style="width: 100%"
                   clearable />
    </el-form-item>
    <el-form-item :label="$t('base.code')">
      <el-input v-model="formData.inputCode"
                :placeholder="$t('base.pleaseInput')">
        <div slot="prepend"
             style="min-width: 40px;text-align: left;">
          <span>{{ formData.prefixCode}}</span>
        </div>
      </el-input>
    </el-form-item>
    <el-form-item :label="$t('base.name')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.name" />
    </el-form-item>
    <el-form-item :label="$t('role.title')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.title" />
    </el-form-item>
    <el-form-item :label="$t('role.ancestry')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.ancestry"
                disabled />
    </el-form-item>
    <el-form-item :label="$t('base.remark')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.remark" />
    </el-form-item>
    <el-form-item :label="$t('base.visible')">
      <el-switch v-model="formItem.visible" />
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
import roleApi from "../../api/apiRole";

export default {
  props: ["item", "isEdit", "visible"],
  data() {
    return {
      formData: {
        roleList: [],
        topRole: [],
        prefixCode: "",
        inputCode: ""
      },
      menuProps: {
        label: "title",
        disabled: "leaf",
        value: "id",
        children: "child"
      },
      formItem: {
        code: "",
        name: "",
        title: "",
        ancestry: "",
        remark: "",
        visible: true
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
      this.formData.prefixCode = this.formItem.code.substr(
        0,
        this.formItem.code.length - 2
      );
      this.formData.inputCode = this.formItem.code.substr(
        this.formItem.code.length - 2,
        2
      );

      Promise.all([roleApi.getRoleTree({ size: 400, number: 0, keyword: "%" })])
        .then(([response]) => {
          if (response !== null) {
            //先将结果转化为JSON，操作完成后，再将JSON串转化数组
            this.formData.roleList = response;
            this.formData.topRole = this.formateAncestry(
              this.formItem.ancestry
            );
          }
        })
        .catch(error => {});
    },
    onSubmitClick(name) {
      if (
        this.formData.topRole !== undefined &&
        this.formData.topRole.length > 0
      ) {
        this.formItem.parent = this.formData.topRole[
          this.formData.topRole.length - 1
        ];
      }
      if (
        this.formData.inputCode === null ||
        this.formData.inputCode === undefined ||
        this.formData.inputCode === ""
      ) {
        const h = this.$createElement;
        this.$notify({
          title: this.$t("base.titleTip"),
          message: h(
            "i",
            { style: "color: teal" },
            this.$t("role.codeNotEmpty")
          )
        });
        return;
      }
      this.formItem.code = this.formData.prefixCode + this.formData.inputCode;
      this.$refs[name].validate(valid => {
        // 进行前端检验
        if (valid) {
          Promise.all([roleApi.updateRole(this.item.id, this.formItem)])
            .then(([response]) => {
              //重置表单，允许多次操作
              this.formReset(name);
              this.formData.prefixCode = "";
              this.formData.inputCode = "";
              this.formItem.code = "";
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
    },
    formateAncestry(data) {
      let ancestryArray = [];
      if (data === null || data === undefined || data === "") {
        return ancestryArray;
      }
      var jsoData = JSON.parse(data);

      for (var value of jsoData) {
        ancestryArray.push(value.id);
        //console.log(value.title);
      }
      return ancestryArray;
    },
    onTopRoleChanged(ids) {
      if (ids.length === 0) {
        this.formData.prefixCode = "";
        this.formItem.parent = undefined;
        this.formItem.parent = undefined;
      } else {
        var currentItem;
        for (var item of this.formData.roleList) {
          currentItem = this.searchTree(item, ids[ids.length - 1]);
          if (currentItem !== null) {
            break;
          }
        }
        this.formData.prefixCode = currentItem.code;
      }
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
