<template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-row>
      <el-col :span=12>
        <el-form-item :label="$t('xbasic.organization.lead')">
          <organization-form root="0"
                             :code.sync="formItem.lead"
                             @onchange="organizationOnchange"
                             style="width:100%" />
        </el-form-item>
      </el-col>
      <el-col :span=12>
        <el-form-item :label="$t('xbasic.organization.level')">
          <el-select v-model="formItem.level"
                     clearable
                     filterable
                     style="width:100%">
            <el-option v-for="item in levelList"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span=12>

        <el-form-item :label="$t('xbasic.organization.id')"
                      prop='id'>
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.id"
                    disabled />
        </el-form-item>
      </el-col>
      <el-col :span=12>
        <el-form-item :label="$t('xbasic.organization.code')"
                      prop='code'>
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.code" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span=12>
        <el-form-item :label="$t('xbasic.organization.name')"
                      prop="name">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.name" />
        </el-form-item>
      </el-col>
      <el-col :span=12>
        <el-form-item :label="$t('xbasic.organization.shortName')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.shortName" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span=12>
        <el-form-item :label="$t('xbasic.organization.fullName')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.fullName" />
        </el-form-item>
      </el-col>
      <el-col :span=12>

        <el-form-item :label="$t('xbasic.organization.fullShortName')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.fullShortName" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span=12>
        <el-form-item :label="$t('xbasic.organization.inames')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.inames" />
        </el-form-item>
      </el-col>
      <el-col :span=12>
        <el-form-item :label="$t('xbasic.organization.alpha')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.alpha" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span=12>
        <el-form-item :label="$t('xbasic.organization.ldap')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.ldap" />
        </el-form-item>
      </el-col>
      <el-col :span=12>
        <el-form-item :label="$t('xbasic.organization.catalog')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.catalog" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span=12>
        <el-form-item :label="$t('xbasic.organization.leaf')">
          <el-switch v-model="formItem.leaf" />
        </el-form-item>
      </el-col>
      <el-col :span=12>
        <el-form-item :label="$t('xbasic.organization.visible')">
          <el-switch v-model="formItem.visible" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span=12>
        <el-form-item :label="$t('xbasic.organization.position')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.position" />
        </el-form-item>
      </el-col>
      <el-col :span=12>
        <el-form-item :label="$t('xbasic.organization.picture')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.picture" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item :label="$t('xbasic.organization.desc')">
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
import organizationApi from "../../api/xbasic/apiOrganization";
import levelApi from "../../api/xbasic/apiLevel";
const OrganizationForm = () => import("@/components/Organization");
export default {
  props: ["item", "isEdit", "visible"],
  components: {
    OrganizationForm
  },
  data() {
    return {
      levelList: [],
      formItem: {
        id: "",
        code: "",
        lead: "",
        leaf: true,
        name: "",
        shortName: "",
        fullName: "",
        fullShortName: "",
        inames: "",
        alpha: "",
        ldap: "",
        catalog: "",
        visible: true,
        position: 0,
        picture: "",
        desc: ""
      },
      ruleValidate: {
        code: [{ required: true, message: "编码不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    Promise.all([
      levelApi.getAll({
        size: 500,
        page: 0
      })
    ])
      .then(([response]) => {
        this.levelList = response.content;
      })
      .catch(error => {});
    this.load();
  },
  methods: {
    organizationOnchange(label, value, labels, values) {
      this.formItem.code = value;
      this.formItem.lead = value;
      let names = "";
      for (let ll of labels) {
        names += ll + "-";
      }
      this.formItem.names = names;
    },
    load() {
      this.formItem = JSON.parse(JSON.stringify(this.item));
    },
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        // 进行前端检验
        if (valid) {
          Promise.all([
            organizationApi.updateOrganization(this.item.id, this.formItem)
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
