<template>
  <el-select ref="typeSelect"
             clearable
             v-model="selectedOption"
             filterable
             :placeholder="$t('tobacco.common.selectType')"
             @change="onChange">
    <el-option v-for="item in options"
               :key="item.id"
               :label="item.name"
               :value="item.id">
    </el-option>
  </el-select>

</template>

<script>
/**
  Auth: billow36@163.com
  Created: 2018/6/19-13:59
*/
import typeApi from "@/api/tobacco/apiType";
export default {
  name: "typeSelect",
  props: {
    value: {
      type: String
    },
    label: {
      type: String,
      default: () => "10"
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
    this.selectedOption = this.value;
    this.loadData();
  },
  watch: {
    root(curVal, oldVal) {
      this.loadData();
    },
    value(curVal, oldVal) {
      this.selectedOption = curVal;
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
      this.$emit("handleTypeChange");
      this.$emit("update:value", value);
      this.$emit("update:label", this.selectedOptionLabel);
      this.$emit("onchange", this.selectedOption, this.selectedOptionLabel); // 将当前对象 evt 传递到父组件
    },
    loadData() {
      Promise.all([
        typeApi.getAll({
          size: 500,
          page: 0,
          sort: "id"
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
