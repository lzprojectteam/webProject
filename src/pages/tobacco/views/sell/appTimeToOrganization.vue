<template>
  <el-form label-width="80px"
           style="min-height:400px">
    <el-form-item :label="$t('tobacco.tsell.appointmentTime.organization')">
      <organization-form :root="userOrgId"
                         @onchange="organizationOnchange"
                         style="width:80%"
                         show-all-levels />
      <el-button type="primary"
                 style="float: right"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonAdd') }}
      </el-button>
    </el-form-item>
    <el-table highlight-current-row
              border
              :data="organizationList"
              style="width: 100%">
      <el-table-column type="index">
      </el-table-column>
      <el-table-column prop="code"
                       :label="this.$t('xbasic.organization.code')" />
      <el-table-column prop="lead"
                       :label="this.$t('xbasic.organization.lead')" />
      <el-table-column prop="name"
                       :label="this.$t('xbasic.organization.name')"
                       width="140"
                       show-overflow-tooltip />
      <el-table-column fixed="right"
                       :label="$t('base.titleOperation')"
                       width="100">
        <template slot-scope="scope">
          <el-button @click="onDeleteClick(scope.row)"
                     type="text">
            {{$t('base.buttonDelete')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </el-form>
</template>

<script>
const OrganizationForm = () => import("@/components/Organization");
import appointmentTimeApi from "../../api/tsell/api_appointmentTime";
import organizationApi from "@/api/xbasic/apiOrganization";
export default {
  props: ["item"],
  data() {
    return {
      organizationId: this.userOrgId,
      organizationList: []
    };
  },
  created() {
    this.load();
  },
  components: {
    OrganizationForm
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
  watch: {
    item(curVal, oldVal) {
      this.load();
    }
  },
  methods: {
    load() {
      let that = this;
      appointmentTimeApi
        .getExsitOrgId(this.item.id)
        .then(response => {
          let orgIds = "~";
          for (let id of response) {
            orgIds += "," + id;
          }
          Promise.all([
            organizationApi.getAll({
              size: 500,
              page: 0,
              search: "id:in:{ids}".format({ ids: orgIds })
            })
          ])
            .then(([response]) => {
              that.organizationList = response.content;
            })
            .catch(error => {});
        })
        .catch(error => {});
    },
    organizationOnchange(label, value, values) {
      this.organizationId = value;
    },
    onSubmitClick(name) {
      if (this.organizationId === undefined || this.organizationId === "") {
        this.$message({
          message: "组织单位不能为空",
          type: "error"
        });
        return;
      }
      Promise.all([
        appointmentTimeApi.saveAppTimeRelation({
          appointmentTimeId: this.item.id,
          organizationId: this.organizationId
        })
      ])
        .then(([response]) => {
          this.$message({
            message: this.$t("message.saveAndContinue"),
            type: "info"
          });
          this.load();
        })
        .catch(error => {
          console.log(error);
        });
    },
    onDeleteClick(row) {
      Promise.all([
        appointmentTimeApi.removeAppTimeRelation(this.item.id, row.id)
      ])
        .then(([response]) => {
          this.$message({
            message: this.$t("message.updateOk"),
            type: "info"
          });
          this.load();
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
