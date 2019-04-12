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
          <el-form-item :label="$t('tobacco.tsell.forecast.beginEnd')">
            <el-date-picker v-model="searchData.beginEnd" type="daterange" range-separator="-" :start-placeholder="$t('tobacco.tsell.forecast.beginDate')" :end-placeholder="$t('tobacco.tsell.forecast.endDate')" value-format="yyyyMMdd" :picker-options="dateoptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('base.keywords')">
            <el-input v-bind:placeholder="$t('base.ipKeywords')" v-model="formData.pagination.keyword" @keyup.enter.native="onSearchButtonClick" />
          </el-form-item>
        </el-form>
      </div>
      <div class='toolButton' style="min-width: 210px">
        <el-button-group>
          <el-button type='primary' @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }} </el-button>
          <el-button type='primary' v-show="false" @click='childForm.addForm=true'>{{ $t('base.buttonAdd') }} </el-button>
          <el-button type='danger' @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }} </el-button>
        </el-button-group>
      </div>
    </div>
    <main class='contentPanel'>
      <el-table highlight-current-row border @current-change="handleCurrentChange"
                :summary-method="getSummaries" :data="formData.forecastList" style="width: 100%" :row-class-name="tableRowClassName" @expand-change="onExpandChange">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-table highlight-current-row border :data="scope.row.forecastItemList" style="width: 80%">
              <el-table-column type="index">
              </el-table-column>
              <el-table-column prop="serial" :label="$t('tobacco.tsell.forecastItem.serial')" />
              <el-table-column prop="title" :label="$t('tobacco.tsell.forecastItem.title')" />
              <!--
              <el-table-column prop="partName" :label="$t('tobacco.tsell.forecastItem.partName')" />
              <el-table-column prop="rodPart" :label="$t('tobacco.tsell.forecastItem.rodPart')" />
              -->
              <el-table-column prop="weight" :label="$t('tobacco.tsell.forecastItem.weight')">
                <template slot-scope="sc">
                  {{ sc.row.weight +' 公斤'}}
                </template>
              </el-table-column>
              <el-table-column prop="desc" :label="$t('tobacco.tsell.forecastItem.desc')" />
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="organization.organizationName" :label="this.$t('tobacco.common.organization')" width="160" />
        <el-table-column prop="organization.districtName" :label="this.$t('tobacco.common.district')" width="200" />
        <el-table-column prop="frequency" :label="this.$t('tobacco.tsell.forecast.frequency')" width="50" />
        <el-table-column prop="date" :label="this.$t('tobacco.tsell.forecast.date')" width="90">
          <template slot-scope="scope">
            {{dateFormat(scope.row.date,'yyyy-mm-dd')}}
          </template>
        </el-table-column>
        <el-table-column prop="contractNumber" :label="this.$t('tobacco.tsell.forecast.contractNumber')" />
        <el-table-column prop="contractName" :label="this.$t('tobacco.tsell.forecast.contractName')" />
        <el-table-column prop="totalWeight" :label="this.$t('tobacco.tsell.forecast.totalWeight')">
          <template slot-scope="scope">
            {{ scope.row.totalWeight +' 公斤'}}
          </template>
        </el-table-column>
        <el-table-column prop="desc" :label="this.$t('tobacco.tsell.forecast.desc')" />
        <!--
        <el-table-column prop="totalBar" :label="this.$t('tobacco.tsell.forecast.totalBar')" />
        <el-table-column prop="samplingBar" :label="this.$t('tobacco.tsell.forecast.samplingBar')" />
        <el-table-column prop="samplingRatio" :label="this.$t('tobacco.tsell.forecast.samplingRatio')" />
        <el-table-column prop="samplingWeight" :label="this.$t('tobacco.tsell.forecast.samplingWeight')" />


        <el-table-column prop="pictures" :label="this.$t('tobacco.tsell.forecast.pictures')">
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
         -->
      </el-table>
    </main>
    <div class='footerPanel'>
      <el-pagination :page-size='formData.pagination.pageSize' :total='formData.pagination.total' :current-page='formData.pagination.currentPage' @current-change='onPageChange' :page-sizes='formData.pagination.pageSizeOpts' @size-change='onPageSizeChange' layout="total, sizes, prev, pager, next, jumper" placement='top'></el-pagination>
    </div>
    <template>
      <el-dialog :title="$t('base.buttonAdd')" :visible.sync="childForm.addForm" top="10px" :before-close="handleClose">
        <add-form/>
      </el-dialog>
      <el-dialog :title="$t('base.buttonEdit')" :visible.sync="childForm.editForm" top="10px" :before-close="handleClose">
        <edit-form :item.sync=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.editForm" @refresh="onSearchButtonClick"
        />
      </el-dialog>
      <el-dialog :title="$t('base.buttonView')" :visible.sync="childForm.viewForm" top="10px" :before-close="handleClose">
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
const AddForm = () => import('./forecastAdd.vue');
const EditForm = () => import('./forecastEdit.vue');
import forecastApi from '../../api/tsell/api_forecast';
import forecastItemApi from '../../api/tsell/api_forecastItem';
const path = require('path');

export default {
  data() {
    return {
      //需要合计的列
      sumColumnNames: [
        {column: 'totalWeight', unit: '公斤'}
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
        organizationId: '',
        beginEnd: [
          this.dateFormat(this.getFirstDate(), 'yyyymmdd'),
          this.dateFormat(this.getLastDate(), 'yyyymmdd')
        ]
      },
      formData: {
        forecastList: [],
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
    OrganizationForm: () => import('@/components/Organization')
  },
  methods: {
    getSummaries(param) {
      const {columns, data} = param;
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
    onExpandChange(row, expandedRows) {
      //如果没有定义或者未展示，则查询数据，进行展开操作
      if (row.expanded === undefined || row.expanded === false) {
        row.expanded = true;
        Promise.all([
          forecastItemApi.getAll({
            size: 500,
            page: 0,
            sort: 'serial,asc',
            search: 'forecast:eq:' + row.id
          })
        ])
          .then(([response]) => {
            row.forecastItemList = response.content;
            let index = 0;
            for (let item of this.formData.forecastList) {
              if (item.id === row.id) {
                break;
              }
              index++;
            }
            this.formData.forecastList.splice(index, 1, row);
          })
          .catch(error => {});
      } else {
        //属于折叠操作
        row.expanded = false;
      }
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

      Promise.all([forecastApi.deleteForecast(this.formData.selectRow.id)])
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
      Promise.all([
        forecastApi.getAll({
          size: this.formData.pagination.pageSize,
          sort: 'id,ASC',
          page: this.formData.pagination.currentPage - 1,
          search: 'organization.organizationId:NRE:^{orgId};date:BETWEEN:{beginDate},{endDate}'.format(
            {
              orgId: this.searchData.organizationId,
              beginDate: this.searchData.beginEnd[0].replaceAll('-'),
              endDate: this.searchData.beginEnd[1].replaceAll('-')
            }
          )
        })
      ])
        .then(([response]) => {
          this.formData.forecastList = response.content;
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
    }
  }
};
</script>
