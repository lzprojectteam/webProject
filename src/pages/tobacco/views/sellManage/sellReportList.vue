<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
            <organization-form :root="userOrgId" @onchange="organizationOnchange"/>
          </el-form-item>
          <el-form-item label="时间区间">
            <el-date-picker v-model="searchData.depart"
                            type="daterange"
                            value-format="yyyy-MM-dd"
                            :picker-options="dateoptions"
                            :range-separator="$t('base.titleDateTo')"
                            :start-placeholder="$t('base.titleDateBegin')"
                            :end-placeholder="$t('base.titleDateEnd')"
                            align="right"
            >
            </el-date-picker>
          </el-form-item>
          <template v-if='expand'>
            <el-row>
              <el-form-item label="烟叶等级">
                <type-grade-select
                  :gradeId.sync="searchData.gradeid" :gradeName.sync="searchData.gradename"
                  :gradeCode.sync="searchData.gradecode"
                  style="width: 100%;">
                </type-grade-select>
              </el-form-item>
            </el-row>
          </template>
        </el-form>
      </div>
      <div class='toolButton' style="min-width: 60px">
        <el-button-group>
          <el-button type='primary' @click='onExpandClick'>{{ $t('base.buttonFilter') }}</el-button>
          <el-button type='primary' @click='downloadXlsFile'>导出</el-button>
          <el-button type='primary' @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }}</el-button>
        </el-button-group>
      </div>
    </div>
    <main class='contentPanel'>
      <el-table
        highlight-current-row
        border
        @current-change="handleCurrentChange"
        :data="formData.sellList"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        show-summary
        stripe
        :summary-method="getSummaries">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="rankname" label="大等级名称"
                         show-overflow-tooltip/>
        <el-table-column prop="gradecode" label="等级"
                         show-overflow-tooltip
        />
        <el-table-column prop="gradename" label="等级名称"
                         show-overflow-tooltip
        />
        <el-table-column prop="weight" label="重量（公斤）"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <span style="float:right">{{scope.row.weight| Number(2) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="proportion" label="占总重量比例">
          <template slot-scope="scope">
            <span style="float:right">{{scope.row.proportion| Percent(4) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="money" label="金额（元）">
          <template slot-scope="scope">
            <span style="float:right">{{scope.row.money| Currency }}</span>
          </template>
        </el-table-column>

      </el-table>
    </main>
  </div>
</template>
<script>
  const OrganizationForm = () => import('@/components/Organization');
  const typeGradeSelect = () => import('@/components/Tobacco/typeGradeSelect');
  const path = require('path');

  import deliveryApi from '../../api/tsell/api_delivery';
  

  export default {
    data() {
      return {
        expand: false,
        expandIcon: 'el-icon-arrow-left',
        childForm: {
          addForm: false,
          editForm: false,
          viewForm: false,
          isEdit: false
        },
        dateoptions: {
          shortcuts: [
            {
              text: this.$t('base.today'),

              onClick: (picker) => {
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
        url: '', //存放解析后的文件路径
        searchData: {
          'organizationid': this.$store.state.user.organization.organizationId,
          'organizationname': this.$store.state.user.organization.organizationName,
          'time': '',
          'depart': [this.dateFormat(new Date(), 'yyyy-mm-dd'), this.dateFormat(new Date(), 'yyyy-mm-dd')],
          'start': '',
          'end': '',
          'state': '',
          'gradeid': '',
          'gradecode': '',
          'gradename': '',
        },
        formData: {
          pagination: {//用于分页的变量
            currentPage: 1,
            pageSize: 10,
            total: 0,
            keyword: '',
            pageSizeOpts: [10, 15, 20, 25, 30]
          },
          sellList: []
        },
        sumColumnNames: [
          {column: 'weight', unit: '公斤'},
          {column: 'money', unit: ' 元'}
        ],
      };
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
    created() {
      this.onSearchButtonClick();
    },
    components: {
      OrganizationForm,
      typeGradeSelect
    },
    methods: {
      downloadXlsFile() {
        var x = new XMLHttpRequest();
        x.open('GET', this.url, true);
        x.responseType = 'blob';
        x.onload = function (e) {
          require('downloadjs')(x.response, '日报区间报表.xls');
        };
        x.send();
      },
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
            sums[index] = this.$accounting.formatNumber(sums[index], 2) + ' ' + col.unit;
          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;
      },
      onExpandClick() {
        this.expand = !this.expand;
        if (this.expand) {
          this.expandIcon = 'el-icon-arrow-down';
        } else {
          this.expandIcon = 'el-icon-arrow-left';
        }
      },
      getfilePath(filepath) {
        let isProduction = process.env.NODE_ENV === 'production';//如果是生产环境，前缀要发生变化
        if (
          filepath === undefined ||
          filepath === '' ||
          filepath === null
        ) {
          return '/#/tobacco/sellManage/';
        }
        let pps = filepath;
        let root = '';
        root = path.join('/tobacco/upload', pps);
        let rootPath = process.env.VUE_APP_API_URL;
        if (isProduction) {
          rootPath = '';
        }
        root = '{rootPath}{path}'.format({path: root, rootPath: rootPath});
        return root;
      },
      organizationOnchange(label, value, values) {
        this.searchData.organizationid = value;
        this.searchData.organizationcode = value;
        this.searchData.organizationname = label;
        this.searchData.organizationorder = '0';
      },
      handleCurrentChange(val) {
        this.formData.selectRow = val;
      },
      onSearchButtonClick() {
        this.searchData.beginDate = (this.searchData.depart === '' || this.searchData.depart === null) ? '1970-01-01' : this.searchData.depart[0];
        this.searchData.endDate = (this.searchData.depart === '' || this.searchData.depart === null) ? '2999-01-01' : this.searchData.depart[1];
        Promise.all([deliveryApi.getReport(this.searchData.organizationid, this.searchData.beginDate, this.searchData.endDate, this.searchData.organizationname, {
          'gradeId': this.searchData.gradeid,
        })])
          .then(([response]) => {
            this.formData.sellList = response.data;
            this.url = this.getfilePath(response.url);
            this.$notify({
              title: this.$t('base.hint'),
              message: this.$t('base.loadingDone'),
              duration: 1000,
              position: 'bottom-right'
            });
          })
          .catch(error => {
            console.log(error);
          });

      },

      onPageChange(index) {
        if (this.formData.pagination.currentPage !== index) {
          this.formData.pagination.currentPage = index;
          this.onSearchButtonClick();
        }
      },
      onPageSizeChange(size) {
        if (this.formData.pagination.pageSize !== size) {
          this.formData.pagination.pageSize = size;
          this.onSearchButtonClick();
        }
      },
      tableRowClassName({row, rowIndex}) {
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
    },
  };
</script>
<style scoped>
  .el-input--mini .el-input__inner {
    width: 130px !important;
  }
</style>
