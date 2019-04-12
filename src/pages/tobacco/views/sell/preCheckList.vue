<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-form-item :label="$t('tobacco.common.organization')">
            <organization-form :root="userOrgId" :code.sync="searchData.organizationId" />
          </el-form-item>
          <el-form-item :label="$t('tobacco.common.type')">
            <type-variety-select :type-id.sync="searchData.typeId" :variety-id.sync="searchData.varietyId" />
          </el-form-item>
          <el-form-item :label="$t('base.keywords')">
            <el-input v-bind:placeholder="$t('base.ipKeywords')" v-model="formData.pagination.keyword" @keyup.enter.native="onSearchButtonClick" />
          </el-form-item>
        </el-form>
      </div>
      <div class='toolButton' style="min-width: 210px">
        <el-button-group>
          <el-button type='primary' @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }} </el-button>
          <el-button type='primary' @click='childForm.addForm=true'>{{ $t('base.buttonAdd') }} </el-button>
          <el-button type='primary' @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }} </el-button>
        </el-button-group>
      </div>
    </div>
    <main class='contentPanel'>
      <el-table highlight-current-row border stripe show-summary :summary-method="getSummaries" @current-change="handleCurrentChange" :data="formData.preCheckList" style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column type="index" fixed>
        </el-table-column>
        <el-table-column prop="farmerName" fixed :label="this.$t('tobacco.tsell.preCheck.farmerName')" />
        <el-table-column prop="organization.organizationName" :label="this.$t('tobacco.common.organization')" width="160" />
        <el-table-column prop="organization.districtName" :label="this.$t('tobacco.common.district')" width="200" />
        <el-table-column prop="annual" :label="this.$t('tobacco.tsell.preCheck.annual')">
          <template slot-scope="scope">
            {{scope.row.annual.toString()}}
          </template>
        </el-table-column>
        <el-table-column prop="barcode" :label="this.$t('tobacco.tsell.preCheck.barcode')" />
        <!--
        <el-table-column prop="title" :label="this.$t('tobacco.tsell.preCheck.title')"  />
         -->
        <el-table-column prop="author" :label="this.$t('tobacco.tsell.preCheck.author')" />
        <el-table-column prop="date" :label="this.$t('tobacco.tsell.preCheck.date')" width="100">
          <template slot-scope="scope">
            {{dateFormat(scope.row.date,'yyyy-mm-dd')}}
          </template>
        </el-table-column>
        <el-table-column prop="reserveBegin" :label="this.$t('tobacco.tsell.preCheck.reserveDate')" width="100">
          <template slot-scope="scope">
            {{dateFormat(scope.row.reserveBegin,'yyyy-mm-dd')}}
          </template>
        </el-table-column>
        <el-table-column prop="reserveBegin" :label="this.$t('tobacco.tsell.preCheck.reserveBeginEnd')" width="160">
          <template slot-scope="scope">
            {{dateFormat(scope.row.reserveBegin,'HH:MM:ss')}} - {{dateFormat(scope.row.reserveEnd,'HH:MM:ss')}}
          </template>
        </el-table-column>
        <el-table-column prop="partName" :label="this.$t('tobacco.tsell.preCheck.partName')" />
        <!--
        <el-table-column prop="statusName" :label="this.$t('tobacco.tsell.preCheck.statusName')" />
        <el-table-column prop="colorName" :label="this.$t('tobacco.tsell.preCheck.colorName')" />
        <el-table-column prop="gradeCode" :label="this.$t('tobacco.tsell.preCheck.gradeCode')" />
        <el-table-column prop="gradeName" :label="this.$t('tobacco.tsell.preCheck.gradeName')" />
        <el-table-column prop="rankName" :label="this.$t('tobacco.tsell.preCheck.rankName')" width="100" />
        <el-table-column prop="tobaccoPack" :label="this.$t('tobacco.tsell.preCheck.tobaccoPack')" />
        <el-table-column prop="tobaccoPurity" :label="this.$t('tobacco.tsell.preCheck.tobaccoPurity')" />
        <el-table-column prop="pack" :label="this.$t('tobacco.tsell.preCheck.pack')" />
        <el-table-column prop="amount" :label="this.$t('tobacco.tsell.preCheck.amount')" />
        -->
        <el-table-column prop="weight" :label="this.$t('tobacco.tsell.preCheck.weight')" width="100" />

        <!--
        <el-table-column prop="reserveEnd" :label="this.$t('tobacco.tsell.preCheck.reserveEnd')" width="100">
          <template slot-scope="scope">
            {{dateFormat(scope.row.reserveEnd,'yyyy-mm-dd')}}
          </template>
        </el-table-column>

        <el-table-column prop="contractArea" :label="this.$t('tobacco.tsell.preCheck.contractArea')" />
        <el-table-column prop="contractPlant" :label="this.$t('tobacco.tsell.preCheck.contractPlant')" />
        <el-table-column prop="contractWeight" :label="this.$t('tobacco.tsell.preCheck.contractWeight')" />
        <el-table-column prop="year" :label="this.$t('tobacco.tsell.preCheck.tobaccoYear')" />
        <el-table-column prop="typeName" :label="this.$t('tobacco.tsell.preCheck.typeName')" />
        <el-table-column prop="varietyName" :label="this.$t('tobacco.tsell.preCheck.varietyName')" />

        <el-table-column prop="technicianName" :label="this.$t('tobacco.tsell.preCheck.technicianName')" width="120" />
        <el-table-column prop="usageName" :label="this.$t('tobacco.tsell.preCheck.usageName')" />
        <el-table-column prop="recheckDate" :label="this.$t('tobacco.tsell.preCheck.recheckDate')" width="100">
          <template slot-scope="scope">
            {{dateFormat(scope.row.recheckDate,'yyyy-mm-dd')}}
          </template>
        </el-table-column>
        <el-table-column prop="recheckerName" :label="this.$t('tobacco.tsell.preCheck.recheckerName')" />
        <el-table-column prop="material" :label="this.$t('tobacco.tsell.preCheck.material')" />
        <el-table-column prop="impurity" :label="this.$t('tobacco.tsell.preCheck.impurity')" />
        <el-table-column prop="sampling" :label="this.$t('tobacco.tsell.preCheck.sampling')" />
        <el-table-column prop="qualified" :label="this.$t('tobacco.tsell.preCheck.qualified')" />
        <el-table-column prop="ratio" :label="this.$t('tobacco.tsell.preCheck.ratio')" />
        -->
        <el-table-column prop="pictures" :label="this.$t('tobacco.tsell.preCheck.pictures')">
          <template slot-scope="scope">
            <el-button type="text" @click="onShowPhoto(scope.row)">{{$t('base.buttonView')}}</el-button>
          </template>
        </el-table-column>
        <el-table-column fixed="right" :label="$t('base.titleOperation')" width="100">
          <template slot-scope="scope">
            <el-button @click="editButtonClick(scope.row,false)" type="text" size="small">{{$t('base.buttonView')}}</el-button>
            <el-button type="text" size="small" @click="editButtonClick(scope.row,true)">{{$t('base.buttonEdit')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </main>
    <div class='footerPanel'>
      <el-pagination :page-size='formData.pagination.pageSize' :total='formData.pagination.total' :current-page='formData.pagination.currentPage' @current-change='onPageChange' :page-sizes='formData.pagination.pageSizeOpts' @size-change='onPageSizeChange' layout="total, sizes, prev, pager, next, jumper" placement='top'></el-pagination>
    </div>
    <template>
      <el-dialog :title="$t('base.buttonAdd')" :visible.sync="childForm.addForm" top="10px" :before-close="handleClose" width="80%">
        <add-form/>
      </el-dialog>
      <el-dialog :title="$t('base.buttonEdit')" :visible.sync="childForm.editForm" top="10px" :before-close="handleClose" width="80%">
        <edit-form :item.sync=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.editForm" @refresh="onSearchButtonClick"
        />
      </el-dialog>
      <el-dialog :title="$t('base.buttonView')" :visible.sync="childForm.viewForm" top="10px" :before-close="handleClose" width="80%">
        <edit-form :item=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.viewForm" />
      </el-dialog>
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
const AddForm = () => import('./preCheckAdd.vue');
const EditForm = () => import('./preCheckEdit.vue');
import dateFormat from 'dateformat';
import preCheckApi from '../../api/tsell/api_preCheck';
const path = require('path');

export default {
  data() {
    return {
      //需要合计的列
      sumColumnNames: [
        { column: 'weight', unit: '公斤' },
        { column: 'contractArea', unit: '亩' },
        { column: 'contractPlantweight', unit: '公斤' },
        { column: 'contractPlant', unit: '公斤' },
        { column: 'contractWeight', unit: '公斤' }
      ],
      photoLoading: false,
      childForm: {
        addForm: false,
        editForm: false,
        viewForm: false,
        isEdit: false,
        showPic: false
      },
      dateoptions: {
        shortcuts: [
          {
            text: this.$t('base.today'),

            onClick: picker => {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: this.$t('base.yesterday'),

            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: this.$t('base.oneWeek'),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }
        ]
      },
      searchData: {
        gradeId: '',
        typeId: '10',
        varietyId: '',
        organizationId: ''
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
    this.searchData.organizationId = this.userOrgId;
    this.onSearchButtonClick();
  },
  computed: {
    userOrgId() {
      if (this.$store.state.user.organization === undefined) {
        return undefined;
      } else {
        return this.$store.state.user.organization.organizationId;
      }
    }
  },
  components: {
    'add-form': AddForm,
    'edit-form': EditForm,
    typeVarietySelect: () => import('@/components/Tobacco/typeVarietySelect'),
    OrganizationForm: () => import('@/components/Organization')
  },
  methods: {
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        let col = this.sumColumnNames.find(item => {
          return item.column === column.property;
        });
        if (col === undefined || col === null) {
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += ' ' + col.unit;
        } else {
          sums[index] = 'N/A';
        }
      });

      return sums;
    },
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
    editButtonClick(selectRow, isEdit) {
      this.formData.viewSelect = selectRow;
      if (isEdit) {
        this.childForm.editForm = true;
      } else {
        this.childForm.viewForm = true;
      }
      this.childForm.isEdit = isEdit;
    },
    deleteButtonClick() {
      if (
        this.formData.selectRow === null ||
        this.formData.selectRow === undefined
      ) {
        this.$message({
          message: this.$t('message.unSelectAny'),
          type: 'info'
        });
        return;
      }

      Promise.all([preCheckApi.deletePreCheck(this.formData.selectRow.id)])
        .then(([response]) => {
          this.$message({
            type: 'info',
            message: this.$t('message.deleteOk')
          });
          this.formData.selectRow = null;
          this.onSearchButtonClick();
        })
        .catch(error => {});
    },
    deleteButtonConfirm() {
      this.$confirm(
        this.$t('message.deleteConfirm'),
        this.$t('base.titleTip'),
        {
          confirmButtonText: this.$t('base.buttonOk'),
          cancelButtonText: this.$t('base.buttonCancel'),
          type: 'warning'
        }
      )
        .then(() => {
          this.deleteButtonClick();
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('message.cancel')
          });
        });
    },
    handleCurrentChange(val) {
      this.formData.selectRow = val;
    },
    onSearchButtonClick() {
      let search = '';
      if (
        this.searchData.typeId !== undefined &&
        this.searchData.typeId !== '' &&
        this.searchData.typeId !== null
      ) {
        search += 'typeId:eq:' + this.searchData.typeId + ';';
      }
      if (
        this.searchData.varietyId !== undefined &&
        this.searchData.varietyId !== '' &&
        this.searchData.varietyId !== null
      ) {
        search += 'varietyId:eq:' + this.searchData.varietyId + ';';
      }

      Promise.all([
        preCheckApi.getAll({
          size: this.formData.pagination.pageSize,
          sort: 'serial,ASC',
          page: this.formData.pagination.currentPage - 1,
          contains: 'farmerName,author:{keyword}:true'.format({
            keyword: this.formData.pagination.keyword
          }),
          search: ('organization.organizationId:NRE:^{orgId};' + search).format(
            {
              orgId: this.searchData.organizationId
            }
          )
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
      this.childForm.addForm = false;
      this.childForm.editForm = false;
      this.onSearchButtonClick();
      done();
    },
    dateFormat(date, pattern) {
      return dateFormat(date, pattern);
    }
  }
};
</script>
