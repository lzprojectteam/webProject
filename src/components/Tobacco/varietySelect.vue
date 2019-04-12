<template>
  <el-select ref="varietySelect"
             clearable
             v-model="selectedOption"
             filterable
             :placeholder="$t('tobacco.common.selectVariety')"
             @change="onChange">
    <el-option v-for="item in options"
               :key="item.varietyId"
               :label="item.name"
               :value="item.varietyId">
    </el-option>
  </el-select>

</template>

<script>
/**
  Auth: billow36@163.com
  Created: 2018/6/19-13:59
*/
import api from "@/api/tobacco/apiVariety";
export default {
  name: "varietySelect",
  props: {
    value: {
      type: String
    },
    typeId: {
      type: String
    },
    showAllLevels: {
      type: Boolean,
      default: () => false
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
    root(curVal, oldVal) {
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
          return item.varietyId === value;
        });
        this.selectedOptionLabel = item.name;
      }
      this.selectedOption = value;
      this.$emit("update:value", value);
      this.$emit("update:typeId", this.selectedOptionLabel);
      this.$emit("onchange", this.selectedOption, this.selectedOptionLabel); // 将当前对象 evt 传递到父组件
    },
    loadData() {
      Promise.all([
        api.getAll({
          size: 500,
          page: 0,
          sort: "id",
          search: "typeId:eq:" + this.typeId
        })
      ])
        .then(([response]) => {
          this.options = response.content;
        })
        .catch(error => {});
    }
  }
};
</script>