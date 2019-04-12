<template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('tobacco.common.organization')">
      <organization-form :root="userOrgId"
                         showAllLevels
                         @onchange="organizationOnchange"
                         style="width:100%" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.grid.annual')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.annual"
                disabled />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.grid.code')"
                  prop="code">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.code" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.grid.name')"
                  prop="name">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.name" />
    </el-form-item>

    <el-form-item :label="$t('tobacco.tfarm.grid.techName')"
                  prop="techId">
      <el-select v-model="formItem.techId"
                 filterable
                 remote
                 reserve-keyword
                 :placeholder="$t('base.pleaseInput')"
                 style="width:100%"
                 :remote-method="remoteMethod"
                 :loading="userloading"
                 @change="onUserChanged">
        <el-option v-for="item in userList"
                   :key="item.id"
                   :label="item.name"
                   :value="item.id">
          <span style="float: left">{{ item.name }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">[{{ item.loginName }}] {{item.phone?"-":""}} {{item.phone}}</span>
        </el-option>
      </el-select>

    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.grid.date')">

      <el-date-picker v-model="formItem.date"
                      style="width:100%"
                      type="date"
                      :placeholder="$t('base.pleaseInput')">
      </el-date-picker>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.grid.status')">
      <el-select clearable
                 v-model="formItem.status"
                 filterable
                 :placeholder="$t('base.pleaseSelect')"
                 style="width: 100%">
        <el-option v-for="item in statusList"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>

    </el-form-item>

    <el-form-item>
      <el-button type="primary"
                 style="float: right"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import gridApi from "../../api/tfarm/api_grid";
import { parseDate } from "@/filters/index.js";
import userApi from "@/api/base/apiUser";
const status = [
  { value: 0, label: "编辑" },
  { value: 5, label: "启用" }
  //{ value: 9, label: "停用" }
];
export default {
  data() {
    return {
      userloading: false,
      userList: [],
      statusList: status,
      formItem: {
        annual: this.$store.state.system.annual,
        code: "",
        name: "",
        techId: "",
        techName: "",
        date: parseDate(new Date(), "yyyy-mm-dd"),
        status: 5,
        organizationId: this.$store.state.user.organization.organizationId,
        organizationName: this.$store.state.user.organization.organizationName,
        organizationIds: [this.$store.state.user.organization.organizationId],
        organizationOrder: "",
        organizationCode: this.$store.state.user.organization.organizationId
      },
      ruleValidate: {
        code: [{ required: true, message: "编码不能为空", trigger: "blur" }],
        name: [
          { required: true, message: "网格名称不能为空", trigger: "blur" }
        ],
        techId: [{ required: true, message: "网格员不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    this.formItem.organizationId = this.userOrgId;
  },
  components: {
    OrganizationForm: () => import("@/components/Organization")
  },
  computed: {
    userOrgId() {
      if (this.$store.state.user.organization === undefined) {
        return undefined;
      } else {
        return this.$store.state.user.organization.organizationId;
      }
    }
  },
  methods: {
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          Promise.all([gridApi.saveGrid(this.formItem)])
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
    organizationOnchange(label, value, labels, values) {
      this.formItem.organizationId = value;
      this.formItem.organizationCode = value;
      this.formItem.organizationName = label;
      this.formItem.organizationIds = values;
      this.formItem.organizationOrder = "0";
    },
    formReset(name) {
      this.$refs[name].resetFields();
    },
    remoteMethod(query) {
      if (query !== "") {
        this.userloading = true;
        //远程调用API接口
        var search =
          "(loginName:LIKE:{kw}:or;mobile:LIKE:{kw}:or;name:LIKE:{kw}:or;email:LIKE:{kw}:or;phone:LIKE:{kw}:or;)";
        search += ";state:EQ:5";
        Promise.all([
          userApi.findAllByOrgId(this.userOrgId, {
            size: 20,
            page: 0,
            sort: "name,asc",
            search: search.format({
              kw: query
            })
          })
        ])
          .then(([response]) => {
            this.userList = response.content;
          })
          .catch(error => {})
          .finally(() => {
            this.userloading = false;
          });
      } else {
        this.userList = [];
      }
    },
    onUserChanged(value) {
      if (!value || !this.userList) {
        return;
      } else {
        let item = this.userList.find(it => {
          return it.id === value;
        });
        if (item !== undefined) {
          this.formItem.techName = item.name;
        }
      }
    }
  }
};
</script>
