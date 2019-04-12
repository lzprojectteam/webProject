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
                 type="primary"
                 @click="creatProperty()"
                 icon="el-icon-plus">{{$t('base.buttonAdd')}}</el-button>
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
              align="center"
              @selection-change="onRowSelectChanged">
      <el-table-column type="index"
                       width="50">
      </el-table-column>
      <el-table-column prop="columnName"
                       :label="$t('onlineForm.columnName')">
        <template slot-scope="scope">
          <template v-if="scope.row._edit">
            <el-input v-model="scope.row.columnName"
                      clearable
                      @blur="validateColumnName"></el-input>
          </template>
          <span v-else> {{ scope.row.columnName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="filed"
                       :label="$t('onlineForm.filed')">
        <template slot-scope="scope">
          <el-input v-if="scope.row._edit"
                    v-model="scope.row.filed"
                    clearable
                    @blur="validateField"></el-input>
          <span v-else> {{ scope.row.filed}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('onlineForm.displayName')">
        <template slot-scope="scope">
          <el-input v-if="scope.row._edit"
                    v-model="scope.row.displayName"
                    clearable></el-input>
          <span v-else> {{ scope.row.displayName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="length"
                       :label="$t('onlineForm.length')"
                       width="100">
        <template slot-scope="scope">

          <el-input v-if="scope.row._edit"
                    v-model="scope.row.length"></el-input>
          <span v-else> {{ scope.row.length}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="precision"
                       :label="this.$t('onlineForm.precision')"
                       width="80">
        <template slot-scope="scope">
          <el-input v-if="scope.row._edit"
                    v-model="scope.row.precision"></el-input>
          <span v-else> {{ scope.row.precision}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="filedType"
                       :label="this.$t('onlineForm.filedType')">
        <template slot-scope="scope">

          <el-select v-if="scope.row._edit"
                     v-model="scope.row.filedType"
                     filterable
                     allow-create
                     default-first-option>
            <el-option v-for="item in  formData.typeData"
                       :key="item"
                       :label="item"
                       :value="item">
            </el-option>
          </el-select>
          <span v-else> {{ scope.row.filedType}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="isPrimary"
                       :label="this.$t('onlineForm.isPrimary')"
                       width="60">
        <template slot-scope="scope">
          <el-switch :disabled="!scope.row._edit"
                     v-model="scope.row.isPrimary"></el-switch>

        </template>
      </el-table-column>
      <el-table-column prop="notNull"
                       :label="this.$t('onlineForm.notNull')"
                       width="60">
        <template slot-scope="scope">
          <el-switch :disabled="!scope.row._edit"
                     v-model="scope.row.notNull"></el-switch>

        </template>
      </el-table-column>
      <el-table-column prop="columnUnique"
                       :label="this.$t('onlineForm.columnUnique')"
                       width="60">
        <template slot-scope="scope">
          <el-switch :disabled="!scope.row._edit"
                     v-model="scope.row.columnUnique"></el-switch>

        </template>
      </el-table-column>

      <el-table-column fixed="right"
                       :label="$t('base.titleOperation')"
                       width="140"
                       header-align='center'>
        <template slot-scope="scope">
          <el-tooltip class="item"
                      effect="dark"
                      :content="scope.row._edit?$t('base.buttonSave'):$t('base.buttonEdit')"
                      placement="right">
            <el-button plain
                       type="warning"
                       size="small"
                       @click="save(scope.row)"
                       :icon="scope.row._edit ? 'el-icon-check':'el-icon-edit'" />
          </el-tooltip>
          <el-tooltip class="item"
                      effect="dark"
                      :content="$t('base.buttonDelete')"
                      placement="right">
            <el-button plain
                       type="danger"
                       size="small"
                       @click="remove(scope.row)"
                       icon="el-icon-delete" />

          </el-tooltip>
        </template>
      </el-table-column>

    </el-table>
  </div>

</template>
<script>
import Sortable from "sortablejs";
import dateFormat from "dateformat";

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
      }
    };
  },
  created() {},

  mounted() {
    var el = this.$refs["refs"].$children[
      this.$refs["refs"].$children.length - 1
    ].$el.children[1];
    let vm = this;
    Sortable.create(el, {
      onStart: vm.startFunc,
      onEnd: vm.endFunc,
      onChoose: vm.chooseFunc
    });
  },
  watch: {
    propertyList(data) {
      var list = [];
      //    var index = 0;
      for (let item of data) {
        //   item.sortby = index++;
        if (item.index === undefined) {
          item.index = item.sortby;
        }
        // if (item._edit === undefined)
        //   item._edit = true;
        list.push(item);
      }
      this.thisDataTable = list;
    }
  },
  methods: {
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
      if (row._edit === false) {
        row._edit = true;
        this.thisDataTable.splice(index - 1, 1, row);
      } else if (this.validate(row.columnName, row.filed)) {
        row._edit = false;
        this.thisDataTable.splice(index - 1, 1, row);
      }

      //   this.$emit('update:propertyList', this.thisDataTable);
    },
    saveAll() {
      for (var item of this.thisDataTable) {
        if (!this.validate(item.columnName, item.filed)) {
          return;
        }
      }
      var list = [];
      for (var it of this.thisDataTable) {
        it._edit = false;
        list.push(it);
      }
      this.thisDataTable = list;
      //  this.$emit('update:propertyList', this.thisDataTable);
      this.cacheAll = false;
    },
    editAll() {
      var list = [];
      for (var it of this.thisDataTable) {
        it._edit = true;
        list.push(it);
      }
      this.thisDataTable = list;
      this.cacheAll = true;
    },
    validate(columnName, filed) {
      if (columnName === undefined || columnName === "") {
        this.$notify({
          title: "提示",
          message: "列名不能为空",
          duration: 3000,
          type: "warning"
        });
        return false;
      }
      if (filed === undefined || filed === "") {
        this.$notify({
          title: "提示",
          message: "字段不能为空",
          duration: 3000,
          type: "warning"
        });
        return false;
      }
      return true;
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
    creatProperty() {
      var property = {
        sortby: this.thisDataTable.length + 1, //排序
        columnName: "", // 数据库字段名
        filed: "", //实体字段
        filedComment: "", //字段备注
        length: 32, //数据库长度
        precision: 2, //小数精度
        defaultValue: "", //默认值
        filedType: "String", //数据类型
        isPrimary: false, //是否为主键
        notNull: true, //是否为空
        columnUnique: false, //是否惟一
        displayName: "", //表格显示名
        formVisible: true, //表单是否可见
        listVisible: true, //列表可见
        controlType: "Input", //控件类型
        controlLength: 120, //控件长度
        canSearch: false, //是否可以查询
        searchType: "EQ", //查询类型
        index:
          dateFormat(new Date(), "yyyymmddHHMMss") +
          Math.ceil(Math.random() * 100), //序号
        _edit: true //用于属性编辑状态
      };
      this.thisDataTable.push(property);
      this.$emit("update:propertyList", this.thisDataTable);
    },

    startFunc(from) {},
    endFunc(e) {
      /*
        let movedRow = this.thisDataTable[e.oldIndex];
        this.thisDataTable.splice(e.oldIndex, 1);//移除指定数据
        this.thisDataTable.splice(e.newIndex, 0, movedRow);//将移除的数据插入新的位置
        */
      const targetRow = this.thisDataTable.splice(e.oldIndex, 1)[0];
      this.thisDataTable.splice(e.newIndex, 0, targetRow);
      this.$emit("update:propertyList", this.thisDataTable);
    },
    chooseFunc(from) {},
    onRowSelectChanged(row) {
      let selectIndex = this.thisDataTable.findIndex(function(
        item,
        index,
        arr
      ) {
        return item._edit === true;
      }); // 2
      if (selectIndex >= -1) {
        let preEdit = this.thisDataTable[selectIndex];
        preEdit._edit = false;
        this.thisDataTable.splice(selectIndex, 0, preEdit);
      }
      selectIndex = this.thisDataTable.findIndex(function(item, index, arr) {
        return item._edit === row.index;
      }); // 2
      if (selectIndex >= -1) {
        let preEdit = this.thisDataTable[selectIndex];
        preEdit._edit = true;
        this.thisDataTable.splice(selectIndex, 0, preEdit);
      }
    }
  }
};
</script>
