<template>
  <el-row>
    <el-col :span="11">
      <el-select ref="typeSelect"
                 clearable
                 v-model="typeValue"
                 filterable
                 :placeholder="$t('tobacco.common.selectType')"
                 @change="onTypeChange"
                 style="width:100%">
        <el-option v-for="item in typeList"
                   :key="item.id"
                   :label="item.name"
                   :value="item.id">
        </el-option>
      </el-select>
    </el-col>
    <el-col class="line"
            :span="2"
            style="text-align: center;">-</el-col>
    <el-col :span="11">
      <el-select ref="varietySelect"
                 clearable
                 style="width:100%"
                 v-model="varietyValue"
                 filterable
                 :placeholder="$t('tobacco.common.selectVariety')"
                 @change="onVarietyChange">
        <el-option v-for="item in varietyList"
                   :key="item.varietyId"
                   :label="item.name"
                   :value="item.varietyId">
        </el-option>
      </el-select>
    </el-col>

  </el-row>

</template>

<script>
/**
   Auth: billow36@163.com
   Created: 2018/6/19-13:59
   */
import typeApi from "@/api/tobacco/apiType";
import varietyApi from "@/api/tobacco/apiVariety";

export default {
  name: "type-variety-select",
  props: {
    typeId: { type: String },
    typeName: { type: String },
    varietyId: { type: String },
    varietyName: { type: String },
    showAllLevels: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      typeList: [],
      typeLabel: "",
      typeValue: "",
      varietyList: [],
      varietyLabel: "",
      varietyValue: "",
      varietyValue_temp: ""
    };
  },
  created() {
    this.varietyValue_temp = this.varietyId;
    this.loadData();
  },
  watch: {
    allData(cur, old) {
      if (cur !== undefined && cur !== null && cur !== "") {
        this.onTypeChange(cur.typeId, () => {
          this.onVarietyChange(cur.varietyId);
        });
      }
    }
  },
  computed: {
    // 格式化数据源
    formatData: function() {}
  },
  methods: {
    onTypeChange(value, fn) {
      this.varietyList = [];
      this.varietyLabel = "";
      this.varietyValue = "";
      if (value === undefined || value === "") {
        this.typeLabel = "";
      } else {
        let item = this.typeList.find(function(item) {
          return item.id === value;
        });
        this.typeLabel = item.name;
      }
      this.typeValue = value;
      this.$emit("update:typeId", value);
      this.$emit("update:typeName", this.typeLabel);
      this.$emit("update:varietyId", "");
      this.$emit("update:varietyName", "");
      if (value !== "") {
        Promise.all([
          varietyApi.getAll({
            size: 500,
            page: 0,
            sort: "id",
            search: "typeId:eq:" + value
          })
        ])
          .then(([varietyResponse]) => {
            this.varietyList = varietyResponse.content;
            if (fn) {
              fn();
            }
          })
          .catch(error => {});
      }
    },
    onVarietyChange(value) {
      if (value === undefined || value === "") {
        this.varietyLabel = "";
      } else {
        let item = this.varietyList.find(function(item) {
          return item.varietyId === value;
        });
        this.varietyLabel = item.name;
      }
      this.varietyValue = value;
      this.$emit("update:varietyId", value);
      this.$emit("update:varietyName", this.varietyLabel);
      this.$emit(
        "onchange",
        this.typeLabel,
        this.typeValue,
        this.varietyLabel,
        this.varietyValue
      ); // 将当前对象 evt 传递到父组件
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
          this.typeList = response.content;
          if (this.typeId !== undefined || this.typeId !== "") {
            this.onTypeChange(this.typeId, () => {
              this.onVarietyChange(this.varietyValue_temp);
            });
          }
        })
        .catch(error => {});
    }
  }
};
</script>
