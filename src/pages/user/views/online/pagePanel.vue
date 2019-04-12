<style>

</style>
<template>
  <div style="display: inherit">
    <el-table
      style="margin-top: 10px"


      :data="thisDataTable">
      <el-table-column prop="filed" label="字段">

      </el-table-column>
      <el-table-column prop="displayName" label="显示名">
        <template slot-scope="scope">
          <el-input v-show="scope.row._pageEdit" v-model="scope.row.displayName" clearable></el-input>
          <span v-show="!scope.row._pageEdit"> {{ scope.row.displayName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="searchType" label="查询类型">
        <template slot-scope="scope">
          <el-select v-show="scope.row._pageEdit" v-model="scope.row.searchType">
            <el-option v-for="item in  formData.searchTypeList" :key="item"
                       :label="item" :value="item"/>
          </el-select>
          <span v-show="!scope.row._pageEdit"> {{ scope.row.searchType}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="controlType" label="控件类型">
        <template slot-scope="scope">
          <el-select v-show="scope.row._pageEdit" v-model="scope.row.controlType">
            <el-option v-for="item in  formData.controlTypeList" :key="item"
                       :label="item" :value="item"/>
          </el-select>
          <span v-show="!scope.row._pageEdit"> {{ scope.row.controlType}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="controlLength" label="控件长度">
        <template slot-scope="scope">
          <el-input-number v-show="scope.row._pageEdit" v-model="scope.row.controlLength"
                           clearable></el-input-number>
          <span v-show="!scope.row._pageEdit"> {{ scope.row.controlLength}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="formVisable" label="表单可见">
        <template slot-scope="scope">
          <el-checkbox v-show="scope.row._pageEdit" v-model="scope.row.formVisable"></el-checkbox>
          <el-checkbox v-show="!scope.row._pageEdit" v-model="scope.row.formVisable"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="listVisable" label="列表可见">
        <template slot-scope="scope">
          <el-checkbox v-show="scope.row._pageEdit" v-model="scope.row.listVisable"></el-checkbox>
          <el-checkbox v-show="!scope.row._pageEdit" v-model="scope.row.listVisable"></el-checkbox>
        </template>
      </el-table-column>

      <el-table-column prop="canSearch" label="是否查询">
        <template slot-scope="scope">
          <el-checkbox v-show="scope.row._pageEdit" v-model="scope.row.canSearch"></el-checkbox>
          <el-checkbox v-show="!scope.row._pageEdit" v-model="scope.row.canSearch"></el-checkbox>
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        :label="$t('base.titleOperation')"
        width="80"
        header-align='center'>
        <template slot-scope="scope">
          <el-button plain type="warning" size="small" @click="scope.row._pageEdit=!scope.row._pageEdit">
            {{scope.row._pageEdit ? $t('base.buttonSave') : $t('base.buttonEdit')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>

</template>
<script>
  export default {
    props: {
      propertyList: Array,
      value: Array,
    },

    data() {
      return {
        thisDataTable: [],
        formData: {
          controlTypeList: ['Input', 'Checkbox', 'Select', 'Switch', 'DatePicker'],
          searchTypeList: ['EQ', 'NEQ', 'LIKE', 'GT', 'GTE', 'LT', 'LTE', 'IN', 'BETWEEN', 'ISNULL']
        },
        formItem: {},

      };
    },
    created() {
    },
    watch: {
      propertyList(data) {
        this.thisDataTable = JSON.parse(JSON.stringify(data));
      }
    },
    methods: {}
  };
</script>
