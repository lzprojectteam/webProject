<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-form-item :label="$t('base.keywords')">
            <el-input v-bind:placeholder="$t('base.ipKeywords')" v-model="formData.pagination.keyword" @keyup.enter.native="onSearchButtonClick" />
          </el-form-item>
        </el-form>
      </div>
      <div class='toolButton' style="min-width: 210px">
        <el-button-group>
          <el-button type='primary' @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }} </el-button>
          <!-- <el-button type='primary' @click='childForm.addForm=true'>{{ $t('base.buttonAdd') }} </el-button>
          <el-button type='primary' @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }} </el-button> -->
        </el-button-group>
      </div>
    </div>
    <main class='contentPanel'>
      <el-table highlight-current-row border stripe @current-change="handleCurrentChange" :data="formData.preCheckList" style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column type="index" fixed>
        </el-table-column>
         <el-table-column prop="farmerName" fixed :label="this.$t('tobacco.tsell.preCheck.farmerName')" />
        <el-table-column prop="organization.organizationName" :label="this.$t('tobacco.common.organization')" width="160" />
        <el-table-column prop="organization.districtName" :label="this.$t('tobacco.common.district')" width="200" />
        <el-table-column prop="recheckerName" :label="this.$t('tobacco.tsell.preCheck.recheckerName')" />
        <el-table-column prop="recheckDate" :label="this.$t('tobacco.tsell.preCheck.recheckDate')" show-overflow-tooltip width='160'>
          <template slot-scope="scope">
            {{dateFormat(scope.row.recheckDate,'yyyy-mm-dd')}}
          </template>
        </el-table-column>
        <el-table-column prop="qualified" :label="this.$t('tobacco.tsell.preCheck.qualified')" >
          <template slot-scope="scope">
            {{scope.row.qualified===0?'合格':'不合格' }}
          </template>
        </el-table-column>
        <el-table-column prop="unqualifiedReason" :label="this.$t('tobacco.tsell.preCheck.unqualifiedReason')" />

        <el-table-column prop="pictures" :label="this.$t('tobacco.tsell.preCheck.pictures')">
          <template slot-scope="scope">
            <el-button type="text" @click="onShowPhoto(scope.row)">{{$t('base.buttonView')}}</el-button>
          </template>
        </el-table-column>
        <!--  <el-table-column fixed="right" :label="$t('base.titleOperation')" width="100">
          <template slot-scope="scope">
            <el-button @click="editButtonClick(scope.row,false)" type="text" size="small">{{$t('base.buttonView')}}</el-button>
            <el-button type="text" size="small" @click="editButtonClick(scope.row,true)">{{$t('base.buttonEdit')}}</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </main>
    <div class='footerPanel'>
      <el-pagination :page-size='formData.pagination.pageSize' :total='formData.pagination.total' :current-page='formData.pagination.currentPage' @current-change='onPageChange' :page-sizes='formData.pagination.pageSizeOpts' @size-change='onPageSizeChange' layout="total, sizes, prev, pager, next, jumper" placement='top'></el-pagination>
    </div>
    <template>
      <el-dialog :visible.sync="childForm.showPic">
        <el-carousel indicator-position="outside" v-loading="photoLoading" type="card" height="400px">
          <el-carousel-item v-for="(item, index)  in formData.photoList" :key="index" style="text-align:center">
            <img :src="item" style=" width: auto;height: auto;max-height: 100%;  ">
          </el-carousel-item>
        </el-carousel>
      </el-dialog>
    </template>
  </div>
</template>
<script>
/* const AddForm = () => import('./preCheckAdd.vue');
const EditForm = () => import('./preCheckEdit.vue'); */
import dateFormat from 'dateformat';
/* const typeVarietyGradeSelect = () => import('@/components/Tobacco/typeVarietyGradeSelect');*/
import preCheckApi from '../../api/tsell/api_preCheck';
const path = require('path');

export default {
  data() {
    return {
      photoLoading: false,
      childForm: {
        addForm: false,
        editForm: false,
        viewForm: false,
        isEdit: false,
        showPic: false
      },
      searchData: {
        gradeId: '',
        typeId: '',
        varietyId: ''
      },
      formData: {
        preCheckList: [],
        pagination: {
          //用于分页的变量
          currentPage: 1,
          pageSize: 10,
          total: 0,
          keyword: '',
          pageSizeOpts: [10, 15, 20, 25, 30]
        },
        rowSelection: [],
        photoList: []
      }
    };
  },
  created() {
    this.onSearchButtonClick();
  },
  components: {},
  methods: {
    onShowPhoto(row) {
      //如果是生产环境，前缀要发生变化
      let isProduction = process.env.NODE_ENV === 'production';
      this.photoLoading = true;
      this.formData.photoList = [];
      if (
        row.pictures === undefined ||
        row.pictures === '' ||
        row.pictures === null
      ) {
        this.$message({
          type: 'info',
          message: '没有可用照片'
        });
        return;
      }
      let pps = row.pictures.split(',');
      if (pps.length > 0) {
        let pts = [];
        for (var item of pps) {
          let root = '';
          root = path.join('/upload', row.filePath);
          root = path.join(root, item);
          let rootPath = process.env.VUE_APP_API_URL;
          if (isProduction) {
            rootPath = '';
          }
          root = '{rootPath}{path}'.format({ path: root, rootPath: rootPath });
          pts.push(root);
        }
        this.formData.photoList = pts;
        this.childForm.showPic = true;
      }
      this.photoLoading = false;
    },
    handleCurrentChange(val) {
      this.formData.selectRow = val;
    },
    onSearchButtonClick() {
      let search = 'control:eq:5';

      Promise.all([
        preCheckApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          contains: 'farmerName,author:{keyword}:true'.format({
            keyword: this.formData.pagination.keyword
          }),
          search: search
        })
      ])
        .then(([response]) => {
          this.formData.preCheckList = response.content;
          this.formData.pagination.total = parseFloat(response.totalElements);
          this.$notify({
            title: this.$t('base.hint'),
            message: this.$t('base.loadingDone'),
            duration: 1000,
            position: 'bottom-right'
          });
        })
        .catch(error => {});
    },

    onPageChange(index) {
      this.formData.pagination.currentPage = index;
      this.onSearchButtonClick();
    },
    onPageSizeChange(size) {
      this.formData.pagination.pageSize = size;
      this.onSearchButtonClick();
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'warning-row';
      } else {
        return 'success-row';
      }
    },
    handleClose(done) {
      this.onSearchButtonClick();
      done();
    },
    dateFormat(date, pattern) {
      return dateFormat(date, pattern);
    }
  }
};
</script>
