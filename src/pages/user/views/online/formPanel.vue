<style scoped>
.el-input__inner {
  height: 32px;
}

.el-input-number {
  width: 140px;
  line-height: 30px;
}
</style>
<template>
  <div style="display: inherit">
    <div style="text-align: right">
      <el-button plain
                 v-if="cacheAll"
                 type="primary"
                 @click="saveAll"
                 icon="el-icon-check">{{$t('base.buttonCacheAll')}}</el-button>
      <el-button plain
                 v-else
                 type="primary"
                 @click="editAll"
                 icon="el-icon-check">{{$t('base.buttonCacheEdit')}}</el-button>
    </div>
    <el-table row-key="index"
              ref="refs"
              border
              highlight-current-row
              :data="thisDataTable"
              style="width: 100%;margin-top: 10px"
              align="center">
      <el-table-column type="index"
                       width="50">
      </el-table-column>
      <el-table-column :label="$t('onlineForm.displayName')"
                       prop="displayName">
        <template slot-scope="scope">
          <el-input v-model="scope.row.displayName"
                    disabled
                    clearable></el-input>

        </template>
      </el-table-column>
      <el-table-column :label="$t('onlineForm.controlType')"
                       width="120">
        <template slot-scope="scope">
          <el-select :disabled="!(scope.row._edit||scope.row._edit===undefined)"
                     v-model="scope.row.controlType"
                     filterable
                     allow-create
                     default-first-option>
            <el-option v-for="item in  formData.controlTypeList"
                       :key="item"
                       :label="item"
                       :value="item" />
          </el-select>

        </template>
      </el-table-column>
      <el-table-column :label="$t('onlineForm.defaultValue')">
        <template slot-scope="scope">
          <el-input v-model="scope.row.defaultValue"
                    :clearable='scope.row._edit||scope.row._edit===undefined'
                    :disabled='!scope.row._edit&&scope.row._edit!==undefined'
                    style="width: 140px" />
        </template>

      </el-table-column>
      <el-table-column prop="filedComment"
                       :label="$t('onlineForm.filedComment')">
        <template slot-scope="scope">
          <el-input v-model="scope.row.filedComment"
                    :clearable='scope.row._edit||scope.row._edit===undefined'
                    :disabled='!scope.row._edit&&scope.row._edit!==undefined'
                    style="width: 140px" />
        </template>

      </el-table-column>
      <el-table-column :label="$t('onlineForm.controlLength')"
                       prop="controlLength">
        <template slot-scope="scope">
          <el-input v-model="scope.row.controlLength"
                    :disabled='!scope.row._edit&&scope.row._edit!==undefined'
                    :clearable='scope.row._edit||scope.row._edit===undefined'></el-input>
        </template>

      </el-table-column>

      <el-table-column prop="listVisible"
                       :label="$t('onlineForm.listVisible')"
                       width="60">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.listVisible"
                     :disabled='!scope.row._edit&&scope.row._edit!==undefined'></el-switch>
        </template>

      </el-table-column>
      <el-table-column prop="formVisible"
                       :label="this.$t('onlineForm.formVisible')"
                       width="60">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.formVisible"
                     :disabled='!scope.row._edit&&scope.row._edit!==undefined'></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="canSearch"
                       :label="this.$t('onlineForm.canSearch')"
                       width="60">
        <template slot-scope="scope">
          <el-switch :disabled="!(scope.row._edit||scope.row._edit===undefined)"
                     v-model="scope.row.canSearch"></el-switch>
        </template>
      </el-table-column>

      <el-table-column prop="searchType"
                       :label="this.$t('onlineForm.searchType')">
        <template slot-scope="scope">
          <el-select :disabled="!(scope.row._edit||scope.row._edit===undefined)"
                     v-model="scope.row.searchType">
            <el-option v-for="item in  formData.searchTypeList"
                       :key="item"
                       :label="item"
                       :value="item" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column fixed="right"
                       :label="$t('base.titleOperation')"
                       width="60"
                       header-align='center'>
        <template slot-scope="scope">
          <el-tooltip class="item"
                      effect="dark"
                      :content="scope.row._edit||scope.row._edit===undefined?$t('base.buttonSave'):$t('base.buttonEdit')"
                      placement="right">
            <el-button plain
                       type="warning"
                       size="small"
                       @click="save(scope.row)"
                       :icon="scope.row._edit||scope.row._edit===undefined ? 'el-icon-check':'el-icon-edit'" />
          </el-tooltip>
        </template>
      </el-table-column>

    </el-table>
  </div>

</template>
<script>
export default {
  props: {
    propertyList: Array
  },

  data() {
    return {
      cacheAll: true,
      thisDataTable: [],
      formData: {
        typeData: [
          "String",
          "Boolean",
          "Integer",
          "Byte",
          "Short",
          "Long",
          "Float",
          "Double",
          "Date",
          "DateTime",
          "Decimal"
        ],
        controlTypeList: [
          "Input",
          "Checkbox",
          "Select",
          "Switch",
          "DatePicker"
        ],
        searchTypeList: [
          "EQ",
          "NEQ",
          "LIKE",
          "GT",
          "GTE",
          "LT",
          "LTE",
          "IN",
          "BETWEEN",
          "ISNULL"
        ]
      },
      formItem: {}
    };
  },
  created() {},

  mounted() {},
  watch: {
    propertyList(data) {
      let list = [];
      var index = 0;
      for (let item of data) {
        item.sortby = index++;
        if (item.index === undefined) {
          item.index = item.sortby;
        }
        list.push(item);
      }
      this.thisDataTable = list;
    }
  },
  methods: {
    saveAll() {
      let list = [];
      for (var it of this.thisDataTable) {
        it._edit = false;
        list.push(it);
      }
      this.cacheAll = false;
      this.thisDataTable = list;
      this.$emit("update:propertyList", this.thisDataTable);
    },
    editAll() {
      let list = [];
      for (var it of this.thisDataTable) {
        it._edit = true;
        list.push(it);
      }
      this.thisDataTable = list;
      this.cacheAll = true;
    },
    remove(row) {
      let selectIndex = this.thisDataTable.findIndex(function(
        item,
        index,
        arr
      ) {
        return item.index === row.index;
      }); // 2

      if (selectIndex > -1) {
        this.thisDataTable.splice(selectIndex, 1);
        this.$emit("update:propertyList", this.thisDataTable);
      }
    },
    save(row) {
      var index = 1;
      for (let item of this.thisDataTable) {
        if (item.index === row.index) {
          break;
        }
        index++;
      }
      if (row._edit === true || row._edit === undefined || row._edit === null) {
        row._edit = false;
      } else {
        row._edit = true;
      }
      this.thisDataTable.splice(index - 1, 1, row);
      this.$emit("update:propertyList", this.thisDataTable);
    },
    validateColumnName(event) {
      if (event.target.value === undefined || event.target.value === "") {
        this.$notify({
          title: "提示",
          message: "列名不能为空",
          duration: 3000,
          type: "warning"
        });
      }
    },
    validateField(event) {
      if (event.target.value === undefined || event.target.value === "") {
        this.$notify({
          title: "提示",
          message: "字段不能为空",
          duration: 3000,
          type: "warning"
        });
      }
    },

    onSubmitClick(name) {},
    chooseFunc(from) {}
  }
};
</script>
