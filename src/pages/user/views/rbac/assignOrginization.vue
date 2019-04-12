<style scoped>
.el-cascader-menu {
  min-height: 240px;
  min-width: 260px;
}
</style>
<template>
  <el-form label-width='80px'
           ref='formValidate'
           :rules='ruleValidate'>
    <el-form-item :label="$t('user.loginName')">
      <span>{{ displayName}}</span>
    </el-form-item>

    <el-form-item :label="$t('user.belongSystem')">
      <el-select v-model='formData.systemId'
                 @change='onSystemChanged'
                 style="width:100%">
        <el-option v-for='item in systemList'
                   :value='item.id'
                   :key='item.id'
                   :label="item.name">
          <span>[{{ item.name }}]</span>
          <span style='float:right;color:#ccc'>[{{ item.code }}]</span>
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('user.orginization')">
      <organization-form root="0"
                         style="width:100%"
                         :code.sync="formData.organizationId"
                         :name.sync="formData.organizationName" />
    </el-form-item>
    <el-form-item :label="$t('user.station')">
      <el-select style="width:100%"
                 v-model="formData.stationId"
                 @change='onStationChanged'
                 ref="stationSelect">

        <el-option v-for='item in stationList'
                   :value='item.value'
                   :key='item.value'
                   :label="item.label">
          <span>[{{ item.label }}]</span>
          <span style='float:right;color:#ccc'>[{{ item.value }}]</span>
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('user.exsitOrginization')">
      <el-table highlight-current-row
                border
                style="width: 100%"
                :data='userOrgList'>
        <el-table-column prop="systemName"
                         :label="this.$t('user.belongSystem')" />
        <el-table-column prop="organizationName"
                         :label="this.$t('user.orginization')" />
        <el-table-column prop="stationName"
                         :label="this.$t('user.station')" />
        <el-table-column fixed="right"
                         :label="$t('base.titleOperation')"
                         header-align="center"
                         width="100">
          <template slot-scope="scope">
            <el-button plain
                       type="danger"
                       @click="deleteButtonConfirm(scope.row)">
              {{$t('base.buttonDelete')}}
            </el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-form-item>

    <el-form-item>
      <el-button plain
                 type='primary'
                 size='large'
                 style="float: right"
                 @click="onSubmitClick(' formValidate')">{{ $t('base.buttonAdd') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import systemApi from "../../api/apiSystem";
import userApi from "@/api/base/apiUser";
const OrganizationForm = () => import("@/components/Organization");
export default {
  props: ["userId", "loginName", "displayName"],
  data() {
    const validateSystem = (rule, value, callback) => {
      if (
        this.formData.systemId === "" ||
        this.formData.systemId === undefined
      ) {
        callback(new Error("请选择系统信息"));
      }
    };
    const validateStation = (rule, value, callback) => {
      if (
        this.formData.stationId === "" ||
        this.formData.stationId === undefined
      ) {
        callback(new Error("请选择岗位信息"));
      }
    };
    const validateOrganization = (rule, value, callback) => {
      if (
        this.formData.organizationId === "" ||
        this.formData.organizationId === undefined
      ) {
        callback(new Error("请选择组织单位"));
      }
    };
    return {
      formData: {
        systemId: "",
        systemName: "",
        stationId: "",
        stationName: "",
        organizationId: "",
        organizationName: "",
        userId: this.userId
      },
      systemList: [],
      stationList: [
        {
          value: "0",
          label: this.$t("user.defaultStation")
        }
      ],
      organizationList: [],
      userOrgList: [], // 组织,
      ruleValidate: {
        systemId: [{ validator: validateSystem, trigger: "blur" }],
        stationId: [{ validator: validateStation, trigger: "blur" }],
        organizationId: [{ validator: validateOrganization, trigger: "blur" }]
      }
    };
  },
  created() {
    this.load();
  },
  components: {
    OrganizationForm
  },
  watch: {
    userId(curVal, oldVal) {
      //   this.formData.systemName = '';
      //    this.formData.stationId = '';
      //   this.formData.stationName = '';
      //  this.formData.organizationId = '';
      //  this.formData.organizationName = '';
      this.formData.userId = curVal;
      this.load();
    }
  },
  methods: {
    load() {
      Promise.all([systemApi.getAll(), userApi.getOrganization(this.loginName)])
        .then(([systemList, exsitOrgList]) => {
          this.systemList = systemList.content;
          this.userOrgList = exsitOrgList;
        })
        .catch(error => {});
    },

    onSubmitClick(name) {
      if (
        this.formData.systemId === "" ||
        this.formData.systemId === undefined
      ) {
        this.toast("请选择系统信息");
        return;
      }
      if (
        this.formData.stationId === "" ||
        this.formData.stationId === undefined
      ) {
        this.toast("请选择岗位信息");
        return;
      }
      if (
        this.formData.organizationId === "" ||
        this.formData.organizationId === undefined
      ) {
        this.toast("请选择组织单位");
        return;
      }

      Promise.all([userApi.updateOrganization(this.formData)])
        .then(([response]) => {
          this.userOrgList.push(response);
          //  this.userOrgList= exsitOrgList.data.data;
          this.toast("保存成功，你可以继续添加或者关闭");
        })
        .catch(error => {});
    },
    onStationChanged(value) {
      this.formData.stationId = value;
      this.formData.stationName = "默认";
    },
    onSystemChanged(value) {
      var item = this.systemList.find(item => {
        return item.id === value;
      });
      this.formData.systemId = value;
      this.formData.systemName = item.name;
    },

    deleteButtonConfirm(row) {
      Promise.all([userApi.removeOrganization(row.id)])
        .then(([response]) => {
          for (var i = 0; i < this.userOrgList.length; i++) {
            if (this.userOrgList[i].id === row.id) {
              this.userOrgList.splice(i, 1);
              break;
            }
          }

          this.toast("移除成功");
        })
        .catch(error => {});
    },
    toast(message) {
      this.$message({
        message: message,
        type: "info"
      });
    }
  }
};
</script>
