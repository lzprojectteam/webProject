<template>
  <el-cascader :options="options"
               v-model="selectedOptions"
               @change="handleChange"
               :props="props"
               :change-on-select="changeOnSelect"
               :show-all-levels='showAllLevels'
               :show-root="showRoot"
               :placeholder="placeholder"
               ref="org"
               clearable>
  </el-cascader>
</template>

<script>
/**
   Auth: billow36@163.com
   Created: 2018/6/19-13:59
   */
import orginizationApi from "@/api/xbasic/apiOrganization";
import districtApi from "@/api/xbasic/apiDistrict";

export default {
  name: "organization",
  props: {
    root: {
      type: String
      //default: () => '.'
    },
    onchange: Function,
    model: {
      type: String,
      default: () => "organization"
    },
    showAllLevels: {
      type: Boolean,
      default: () => false
    },
    changeOnSelect: {
      type: Boolean,
      default: () => true
    },
    showRoot: {
      type: Boolean,
      default: () => true
    },
    id: { type: String },
    code: { type: String },
    name: { type: String },
    orgId: { type: String },
    annual: { type: String | Number, default: () => new Date().getFullYear() },
    placeholder: { type: String, default: () => "请选择" }
  },
  data() {
    return {
      options: [],
      selectedOptions: [],
      props: {
        value: "code",
        label: "name"
      }
    };
  },
  created() {
    this.loadData();
    if (this.showRoot) {
      // this.selectedOptions.push(this.root);
      //创建回显数组
      this.createOptions(this.root, this.orgId);
    }
  },
  watch: {
    root(curVal, oldVal) {
      this.loadData();
    },
    annual(n, o) {
      this.loadData();
    },
    orgId(curVal, oldVal) {
      this.createOptions(this.root, this.orgId);
    },
    onchange(curFun, oldFun) {
      this.onchange = curFun;
    }
  },
  computed: {
    // 格式化数据源
    formatData: function() {}
  },
  methods: {
    handleChange(value) {
      //   console.log(value);
      if (value.length === 0) {
        this.$emit("update:code", "");
        this.$emit("update:name", "");
        this.$emit("onchange", "", "", [], value); // 将当前对象 evt 传递到父组件
      } else {
        var labels = this.$refs["org"].currentLabels;
        this.$emit("update:code", value[value.length - 1]);
        this.$emit("update:name", labels[labels.length - 1]);
        this.$emit(
          "onchange",
          labels[labels.length - 1],
          value[value.length - 1],
          labels,
          value
        ); // 将当前对象 evt 传递到父组件
      }
    },
    //通过rootOrgId 和 orgId 拼凑回显选项
    createOptions(rootOrgId, orgId) {
      this.selectedOptions = [];
      if (!this.showRoot) {
        return;
      }
      if (orgId === "" || orgId === undefined) {
        this.selectedOptions.push(rootOrgId);
      } else {
        let arr = [];
        let length1 = rootOrgId.length;
        let length2 = orgId.length;
        if ((length2 - length1) % 2 === 0) {
          let times = (length2 - length1) / 2; //计算字符串裁剪次数
          arr.push(rootOrgId);
          if (times > 0) {
            for (var i = 0; i < times; i++) {
              arr.push(orgId.slice(0, length1 + (i + 1) * 2));
            }
          }
          this.selectedOptions = arr;
        } else {
          this.selectedOptions.push(rootOrgId);
        }
      }
    },
    loadData() {
      this.options = [];
      if (this.root === undefined || this.root === "" || this.root === null) {
        return;
      }
      if (this.model === "organization") {
        this.loadOrg();
      } else {
        this.loadDistrict();
      }
    },
    loadOrg() {
      Promise.all([orginizationApi.getByRootLead(this.root, this.annual)])
        .then(([response]) => {
          this.options = response;
        })
        .catch(error => {});
    },
    loadDistrict() {
      Promise.all([districtApi.getByLead(this.root, this.annual)])
        .then(([response]) => {
          this.options = response;
        })
        .catch(error => {});
    },
    clear() {
      this.createOptions(this.root, this.orgId);
    }
  }
};
</script>