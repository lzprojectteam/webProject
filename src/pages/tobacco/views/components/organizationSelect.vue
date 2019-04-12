<!--仓储出入库专用，根据单据号获取组织单位-->

<template>
  <el-select ref="organizationSelect"
             clearable
             v-model="selectedOption"
             filterable
             :placeholder="$t('base.pleaseSelect')"
             @change="onChange"
             style="width: 100%">
    <el-option v-for="item in options"
               :key="item.threeOrganizationId"
               :label="item.threeOrganizationName"
               :value="item.threeOrganizationId">
    </el-option>
  </el-select>
</template>
<script>
import operationFromToApi from "../../api/tstorage/api_operationFromTo";

export default {
  name: "organizationSelect",
  props: {
    oId: {
      //这里的oid就是传过来的alias(别名)
      type: String
    }
  },
  data() {
    return {
      options: [],
      selectedOption: "",
      selectedOptionLabel: ""
    };
  },
  created() {
    this.loadData();
  },
  watch: {
    oId(curVal, oldVal) {
      this.loadData();
    }
  },
  computed: {
    // 格式化数据源
    formatData: function() {}
  },
  methods: {
    onChange(value) {
      if (value === undefined || value === null || value === "") {
        this.selectedOptionLabel = "";
      } else {
        let item = this.options.find(function(item) {
          return item.threeOrganizationId === value;
        });
        this.selectedOptionLabel = item.threeOrganizationName;
      }
      this.selectedOption = value;
      this.$emit("update:value", value);
      this.$emit("update:label", this.selectedOptionLabel);
      this.$emit("onchange", this.selectedOptionLabel, this.selectedOption);
    },
    loadData() {
      this.options = [];
      this.selectedOption = "";
      this.selectedOptionLabel = "";
      if (this.oId !== "") {
        Promise.all([
          operationFromToApi.getAll({
            size: 500,
            search: "oid:EQ:{oid}".format({
              oid: this.oId
            })
          })
        ])
          .then(([response]) => {
            //去除重复的组织
            let arr = [];
            let arr2 = response.content;
            arr2.forEach(item => {
              let flag = true;
              arr.forEach(item2 => {
                if (item.threeOrganizationId === item2.threeOrganizationId) {
                  flag = false;
                  return;
                }
              });
              if (flag) {
                arr.push(item);
              }
            });
            this.options = arr;
          })
          .catch(error => {});
      }
    }
  }
};
</script>
<style rel="stylesheet/css">
</style>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
