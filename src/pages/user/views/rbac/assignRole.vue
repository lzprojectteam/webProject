<style scoped>
.el-transfer-panel {
  width: 40%;
  min-height: 400px;
}

.el-transfer-panel__list.is-filterable {
  min-height: 300px;
  padding-top: 0;
}
</style>
<template>
  <div>
    <el-transfer v-model="targetKeys"
                 :data='srcRoleList'
                 :right-default-checked='targetKeys'
                 :render-content='renderFunc'
                 :button-texts='transfer.operations'
                 :titles='transfer.titles'
                 filterable
                 @change='transferOnChange'>
      <div :style="{float: 'right', margin: '5px'}">
        <el-button plain type='ghost'
                   size='small'
                   @click='reloadMockData'>刷新</el-button>
      </div>
    </el-transfer>
  </div>

</template>
<script>
import roleApi from "../../api/apiRole";
import userApi from "@/api/base/apiUser";

export default {
  props: ["userId"],
  data() {
    return {
      srcRoleList: [],
      targetKeys: [],
      transfer: {
        titles: ["全部角色", "分配角色"],
        operations: ["向左", "向右"]
      }
    };
  },
  created() {
    this.getMockData();
  },
  watch: {
    userId(curVal, oldVal) {
      this.getMockData();
    }
  },
  methods: {
    getMockData() {
      this.srcRoleList = [];
      //全部查询出来
      Promise.all([
        roleApi.getAll({ size: 400, number: 0, keyword: "" }),
        userApi.getRoles(this.userId)
      ])
        .then(([roleList, exsitRoleList]) => {
          let mockData = [];
          for (var item of roleList.content) {
            mockData.push({
              key: item.id,
              //    label: '[{0}]{1}'.format(item.code, item.name),
              label: "[{0}]".format(item.name),
              description: item.title,
              disabled: !item.visible
            });
          }
          this.srcRoleList = mockData;
          this.targetKeys = exsitRoleList;
        })
        .catch(error => {});
    },
    transferOnChange(targetKeys, direction, moveKeys) {
      this.targetKeys = targetKeys;

      Promise.all([
        userApi.updateRoles(this.userId, direction, { roleIds: moveKeys })
      ])
        .then(([response]) => {
          this.$message({
            type: "info",
            message: this.$t("message.updateOk")
          });
        })
        .catch(error => {});
    },
    renderFunc(h, option) {
      return (
        <span>
          {" "}
          {option.label} -{option.description}
        </span>
      );
    },
    reloadMockData() {
      this.srcRoleList = this.getMockData();
      this.targetKeys = this.getTargetKeys();
    }
  }
};
</script>
