<style>
</style>
<template>
  <div style="display: inherit">
    <div style="text-align: right">
      <el-button plain type="primary" @click="creatProperty()" icon="el-icon-plus">{{$t('base.buttonAdd')}}</el-button>
    </div>
    <el-table row-key="index" ref="refs" border highlight-current-row :data="thisDataTable" style="width: 100%;margin-top: 10px" align="center">
      <el-table-column type="index">
      </el-table-column>
      <el-table-column prop="foreignName" :label="$t('onlineForm.foreignName')">
        <template slot-scope="scope">
          <el-input v-if="scope.row._edit" v-model="scope.row.foreignName" clearable></el-input>
          <span v-else> {{ scope.row.foreignName}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="foreignKey" :label="$t('onlineForm.foreignKey')">
        <template slot-scope="scope">
          <el-input v-if="scope.row._edit" v-model="scope.row.foreignKey" clearable></el-input>
          <span v-else> {{ scope.row.foreignKey}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="foreignColumnName" :label="$t('onlineForm.foreignColumnName')">
        <template slot-scope="scope">
          <el-input v-if="scope.row._edit" v-model="scope.row.foreignColumnName" clearable></el-input>
          <span v-else> {{ scope.row.foreignColumnName}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="foreignClass" :label="$t('onlineForm.foreignClass')">
        <template slot-scope="scope">
          <el-select v-if="scope.row._edit" v-model="scope.row.foreignClass" clearable filterable allow-create default-first-option>
            <el-option v-for="item in foreignEntityList" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <span v-else>{{ scope.row.foreignClass }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="foreignType" :label="this.$t('onlineForm.foreignType')">
        <template slot-scope="scope">
          <el-select v-if="scope.row._edit" v-model="scope.row.foreignType">
            <el-option v-for="item in  formData.foreignTypeList" :key="item" :label="item" :value="item" />
          </el-select>
          <span v-else>{{ scope.row.foreignType }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="fetchType" :label="this.$t('onlineForm.fetchType')">
        <template slot-scope="scope">
          <el-select v-if="scope.row._edit" v-model="scope.row.fetchType">
            <el-option v-for="item in  formData.fetchTypeList" :key="item" :label="item" :value="item" />
          </el-select>
          <span v-else>{{ scope.row.fetchType }}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" :label="$t('base.titleOperation')" width="160" header-align='center'>
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row._edit?$t('base.buttonSave'):$t('base.buttonEdit')" placement="top-end">
            <el-button plain type="warning" size="small" @click="save(scope.row)" :icon="scope.row._edit ? 'el-icon-check':'el-icon-edit'" />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="$t('base.buttonDelete')" placement="top-end">
            <el-button plain type="danger" size="small" @click="remove(scope.row)" icon="el-icon-delete" />

          </el-tooltip>

        </template>
      </el-table-column>
    </el-table>

  </div>

</template>
<script>
import dateFormat from 'dateformat';

export default {
  props: {
    foreignKeyList: Array
  },

  data() {
    return {
      thisDataTable: [],

      formData: {
        foreignTypeList: [
          'OneToOne',
          'ManyToOne',
          'ManyToMany',
          'OneToMany',
          'Embedded'
        ],
        fetchTypeList: ['FetchType.EAGER', 'FetchType.LAZY']
      },
      formItem: {},
      table2: {
        hasDragged: false,
        isDragging: false,
        oldIndex: 0,
        newIndex: 0,
        chooseRecord: [],
        draggingRecord: []
      },
      foreignEntityList: ['OrganizationEntity', 'GpsEntity']
    };
  },
  created() {
    this.init();
  },
  watch: {
    foreignKeyList(data) {
      this.thisDataTable = JSON.parse(JSON.stringify(data));
    }
  },
  methods: {
    save(row) {
      if (row.indexName === '' || row.indexColumns === '') {
        this.$message.error(this.$t('索引名或者索引列不能为空'));
      } else {
        row._edit = !row._edit;
        this.$emit('update:foreignKeyList', this.thisDataTable);
      }
    },
    remove(row) {
      console.log(row);
      let selectIndex = this.thisDataTable.findIndex(function(
        item,
        index,
        arr
      ) {
        return item.index === row.index;
      }); // 2

      if (selectIndex > -1) {
        this.thisDataTable.splice(selectIndex, 1);
        this.$emit('update:foreignKeyList', this.thisDataTable);
      }
    },
    init() {
      if (this.foreignKeyList !== undefined) {
        this.thisDataTable = JSON.parse(JSON.stringify(this.foreignKeyList));
      }
    },
    onSubmitClick(name) {},
    creatProperty() {
      var property = {
        foreignName: '', //外键中文名称
        foreignKey: '', //外键列名,
        foreignColumnName: '', //外键列名
        foreignClass: '', //外键类名
        foreignType: 'ManyToOne', //外键类型
        fetchType: 'FetchType.EAGER', //连接方法
        _edit: true,
        index:
          dateFormat(new Date(), 'yyyymmddHHMMss') +
          Math.ceil(Math.random() * 100) //序号
      };
      this.thisDataTable.push(property);
      this.$emit('update:foreignKeyList', this.thisDataTable);
    }
  }
};
</script>
