<template>
  <el-row>
    <el-col :span="7">
      <el-select ref="typeSelect"
                 clearable
                 v-model="typeValue"
                 filterable
                 :placeholder="$t('tobacco.common.selectType')"
                 @change="onTypeChange"
                 :disabled="cantEdit">
        <el-option v-for="item in typeList"
                   :key="item.id"
                   :label="item.name"
                   :value="item.id">
        </el-option>
      </el-select>
    </el-col>
    <el-col class="line"
            :span="1"
            style="text-align: center;">-</el-col>
    <el-col :span="7">
      <el-select ref="varietySelect"
                 clearable
                 v-model="varietyValue"
                 filterable
                 :placeholder="$t('tobacco.common.selectVariety')"
                 @change="onVarietyChange"
                 :disabled="cantEdit">
        <el-option v-for="item in varietyList"
                   :key="item.varietyId"
                   :label="item.name"
                   :value="item.varietyId">
        </el-option>
      </el-select>
    </el-col>
    <el-col class="line"
            :span="1"
            style="text-align: center;">-</el-col>
    <el-col :span="8">
      <el-select ref="gradeSelect"
                 clearable
                 v-model="gradeValue"
                 filterable
                 :placeholder="$t('tobacco.common.selectGrade')"
                 @change="onGradeChange"
                 :disabled="cantEdit">
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
import varietyApi from "@/api/tobacco/apiVariety";
import gradeApi from "@/api/tobacco/apiGrade";

export default {
  name: "type-variety-grade-select",
  props: {
    typeId: { type: String },
    typeName: { type: String },
    varietyId: { type: String },
    varietyName: { type: String },
    gradeId: { type: String },
    gradeName: { type: String },
    gradeCode: { type: String },
    allData: { type: Object },
    cantEdit: { type: Boolean }
  },
  data() {
    return {
      typeList: [],
      typeLabel: "",
      typeValue: "",
      varietyList: [],
      varietyLabel: "",
      varietyValue: "",
      varietyValue_temp: "",
      gradeList: [],
      gradeLabel: "",
      gradeValue: "",
      gradeValue_temp: "",
      gradeCodes: ""
    };
  },
  created() {
    this.typeValue = this.typeId;
    this.gradeValue_temp = this.gradeId;
    this.varietyValue_temp = this.varietyId;
    this.loadData();
  },
  watch: {
    allData(cur, old) {
      if (cur !== undefined && cur !== null && cur !== "") {
        if (cur.typeId !== undefined) {
          this.onTypeChange(cur.typeId, () => {
            this.onVarietyChange(cur.varietyId);
            this.onGradeChange(cur.gradeId);
          });
        }
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
      this.gradeList = [];
      this.varietyLabel = "";
      this.varietyValue = "";
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
      this.$emit("update:varietyId", "");
      this.$emit("update:varietyName", "");
      this.$emit("update:gradeId", "");
      this.$emit("update:gradeName", "");
      this.$emit("update:gradeCode", "");
      this.$emit("handelTypeChange");
      if (value !== "") {
        Promise.all([
          varietyApi.getAll({
            size: 500,
            page: 0,
            sort: "id",
            search: "typeId:eq:" + value
          }),
          gradeApi.getAll({
            size: 500,
            page: 0,
            sort: "id",
            search: "type:eq:" + value
          })
        ])
          .then(([varietyResponse, gradeResponse]) => {
            this.varietyList = varietyResponse.content;
            this.gradeList = gradeResponse.content;
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
      this.$emit("handelVarietyChange");
      this.$emit(
        "onchange",
        this.typeLabel,
        this.typeValue,
        this.varietyLabel,
        this.varietyValue,
        this.gradeLabel,
        this.gradeValue,
        this.gradeCodes
      ); // 将当前对象 evt 传递到父组件
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
      this.$emit("handelGradeChange");
      this.$emit(
        "onchange",
        this.typeLabel,
        this.typeValue,
        this.varietyLabel,
        this.varietyValue,
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
          this.onTypeChange(this.typeValue, () => {
            this.onVarietyChange(this.varietyValue_temp);
            this.onGradeChange(this.gradeValue_temp);
          });
        })
        .catch(error => {});
    }
  }
};
</script>