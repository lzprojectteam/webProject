<template>
  <el-row>
    <el-col :span="11">
      <el-select ref="typeSelect"
                 clearable
                 v-model="typeValue"
                 filterable
                 :placeholder="$t('tobacco.common.selectType')"
                 style="width:100%"
                 @change="onTypeChange">
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
      <el-select ref="gradeSelect"
                 clearable
                 v-model="gradeValue"
                 filterable
                 :placeholder="$t('tobacco.common.selectGrade')"
                 style="width:100%"
                 @change="onGradeChange">
        <el-option v-for="item in gradeList"
                   :key="item.id"
                   :label="item.name"
                   :value="item.id"
                   :code="item.code">
          <span style="float: left">{{ item.code }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
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
import gradeApi from "@/api/tobacco/apiGrade";

export default {
  name: "type-grade-select",
  props: {
    typeId: { type: String },
    typeName: { type: String },
    gradeId: { type: String },
    gradeName: { type: String },
    gradeCode: { type: String },
    allData: { type: Object },
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
      gradeList: [],
      gradeLabel: "",
      gradeValue: "",
      gradeValue_temp: "",
      gradeCodes: ""
    };
  },
  created() {
    this.gradeValue_temp = this.gradeId;
    this.loadData();
  },
  watch: {
    allData(cur, old) {
      if (cur !== undefined && cur !== null && cur !== "") {
        this.onTypeChange(cur.typeId, () => {
          this.onGradeChange(cur.gradeId);
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
      this.gradeList = [];
      this.gradeLabel = "";
      this.gradeValue = "";
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

      this.$emit("update:gradeId", "");
      this.$emit("update:gradeName", "");
      this.$emit("update:graceCode", "");
      if (this.typeValue !== "") {
        Promise.all([
          gradeApi.getAll({
            size: 500,
            page: 0,
            sort: "id",
            search: "type:eq:" + value
          })
        ])
          .then(([gradeResponse]) => {
            this.gradeList = gradeResponse.content;
            if (fn) {
              fn();
            }
          })
          .catch(error => {});
      }
    },

    onGradeChange(value) {
      if (value === undefined || value === "") {
        this.gradeLabel = "";
        this.gradeCodes = "";
      } else {
        let item = this.gradeList.find(function(item) {
          return item.id === value;
        });
        this.gradeCodes = item.code;
        this.gradeLabel = item.name;
      }
      this.gradeValue = value;
      this.$emit("update:gradeId", value);
      this.$emit("update:gradeName", this.gradeLabel);
      this.$emit("update:gradeCode", this.gradeCodes);
      this.$emit(
        "onchange",
        this.typeLabel,
        this.typeValue,
        this.gradeLabel,
        this.gradeValue,
        this.gradeCodes
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
          this.onTypeChange(this.typeId, () => {
            this.onGradeChange(this.gradeValue_temp);
          });
        })
        .catch(error => {});
    }
  }
};
</script>