<style>

</style>
<template>
  <div style="display: inherit">
    <div style="text-align: right">
      <el-button plain type="primary" @click="creatProperty()">增加</el-button>
    </div>
    <el-table
      row-key="index"
      ref="refs"
      border
      highlight-current-row
      :data="thisDataTable"
      style="width: 100%;margin-top: 10px"
      align="center">
      <el-table-column
        type="index">
      </el-table-column>
      <el-table-column prop="indexName" :label="$t('onlineForm.indexName')">
        <template slot-scope="scope">
          <el-input v-show="scope.row._edit" v-model="scope.row.indexName" clearable></el-input>
          <span v-show="!scope.row._edit"> {{ scope.row.indexName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="indexColumns" :label="$t('onlineForm.indexColumns')">
        <template slot-scope="scope">
          <el-input v-show="scope.row._edit" v-model="scope.row.indexColumns" clearable></el-input>
          <span v-show="!scope.row._edit"> {{ scope.row.indexColumns}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="indexType" :label="$t('onlineForm.indexType')">
        <template slot-scope="scope">
          <el-switch :disable="!scope.row._edit" v-model="scope.row.indexType"></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        :label="$t('base.titleOperation')"
        width="160"
        header-align='center'>
        <template slot-scope="scope">
          <el-button plain type="warning" size="small" @click="save(scope.row)">
            {{scope.row._edit ? $t('base.buttonSave') : $t('base.buttonEdit')}}
          </el-button>
          <el-button plain type="danger" size="small" @click="remove(scope.row)">
            {{$t('base.buttonDelete')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>
<script>
  import dateFormat from 'dateformat';

  export default {
    props: {
      indexList: Array,
      propertyList: Array,
    },

    data() {
      return {
        thisDataTable: []
      };
    },
    created() {
      this.init();
    },
    watch: {
      indexList(data) {
        this.thisDataTable = JSON.parse(JSON.stringify(data));
      }
    },
    methods: {
      save(row) {
        if (row.indexName === '' || row.indexColumns === '') {
          this.$message.error(this.$t('索引名或者索引列不能为空'));
        } else {
          row._edit = !row._edit;
          this.$emit('update:indexList', this.thisDataTable);
        }
      },
      remove(row) {
        console.log(row);
        let selectIndex = this.thisDataTable.findIndex(function(item, index, arr) {
          return item.index === row.index;
        }); // 2

        if (selectIndex > -1) {
          this.thisDataTable.splice(selectIndex, 1);
          this.$emit('update:indexList', this.thisDataTable);
        }
      },
      init() {

      },
      onSubmitClick(name) {

      },
      creatProperty() {
        var property = {
          indexName: '', //索引名称,
          indexColumns: '', //索引栏位
          indexType: '', //索引类型
          _edit: true,
          index: dateFormat(new Date(), 'yyyymmddHHMMss') + Math.ceil(Math.random() * 100) //序号

        };
        this.thisDataTable.push(property);
        //     this.$emit('update:indexList', this.thisDataTable);
      },

    }
  };
</script>
