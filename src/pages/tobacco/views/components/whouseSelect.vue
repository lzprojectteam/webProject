<template>
  <el-select ref="whouseSelect"
             clearable
             v-model="selectedOption"
             filterable
             :placeholder="$t('base.pleaseSelect')"
             @change="onChange"
             style="width: 100%">
    <el-option v-for="item in options"
               :key="item.id"
               :label="item.name"
               :value="item.id">
    </el-option>
  </el-select>
</template>
<script>
import warehouseApi from "../../api/tstorage/api_warehouse";

export default {
  name: "whouseSelect",
  props: {
    orgId: {
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
    orgId(curVal, oldVal) {
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
          return item.id === value;
        });
        this.selectedOptionLabel = item.name;
      }
      this.selectedOption = value;
      this.$emit("update:value", value);
      this.$emit("update:label", this.selectedOptionLabel);
      /*this.$emit(
          'onchange',
          this.selectedOption,
          this.selectedOptionLabel
        );*/
    },
    loadData() {
      this.options = [];
      this.selectedOption = "";
      this.selectedOptionLabel = "";
      if (this.orgId !== "") {
        Promise.all([
          warehouseApi.getAll({
            sort: "name",
            size: 500,
            search: "organization.organizationId:EQ:{orgid};".format({
              orgid: this.orgId
            })
          })
        ])
          .then(([response]) => {
            this.options = response.content;
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
