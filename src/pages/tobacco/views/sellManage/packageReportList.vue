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
          <el-form-item :label="$t('tobacco.tstorage.billIn.annual')">
            <el-date-picker
              value-format="yyyy"
              v-model="searchData.annual"
              :clearable="false"
              type="year"
              :placeholder="$t('base.pleaseSelect')" style="width: 100px">
            </el-date-picker>
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
              <el-form-item :label="$t('tobacco.tsell.invoice.typeName')">
                <type-variety-grade-select :varietyName.sync="searchData.varietyname"
                                           :varietyId.sync="searchData.varietyid"
                                           :typeId.sync="searchData.typeid" :typeName.sync="searchData.typename"
                                           :gradeId.sync="searchData.gradeid" :gradeName.sync="searchData.gradename"
                                           :gradeCode.sync="searchData.gradecode" style="width:100%;"/>
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
        stripe
      >
        <el-table-column type="index">
        </el-table-column>
        <el-table-column :label="searchData.annual+ '年'">
          <el-table-column prop="month" label="月">
          </el-table-column>
          <el-table-column prop="day" label="日">
          </el-table-column>
        </el-table-column>
        <el-table-column prop="title" label="摘要" show-overflow-tooltip width="150">
        </el-table-column>
        <el-table-column label="收购数量">
          <el-table-column prop="invoiceweight" label="数量">
          </el-table-column>
        </el-table-column>
        <el-table-column label="打包成件数量">
          <el-table-column prop="amount" label="件数">
          </el-table-column>
          <el-table-column prop="inventoryweight" label="数量">
          </el-table-column>
        </el-table-column>
        <el-table-column label="未成件数量">
          <el-table-column prop="unpackweight" label="数量">
          </el-table-column>
        </el-table-column>
        <el-table-column label="库管员签章">
        </el-table-column>
      </el-table>
    </main>
  </div>
</template>
<script>
  const OrganizationForm = () => import('@/components/Organization');
  const typeVarietyGradeSelect = () => import('@/components/Tobacco/typeVarietyGradeSelect');
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
          'depart': [this.dateFormat(new Date(), 'yyyy-mm-dd'), this.dateFormat(new Date(), 'yyyy-mm-dd')],
          'begin': '',
          'end': '',
          'gradeid': '',
          'gradecode': '',
          'gradename': '',
          'varietyid': '',
          'varietyname': '',
          'annual': '',
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
        sumColumnNames: [],
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
      this.searchData.annual = new Date().getFullYear().toString();
      this.onSearchButtonClick();
    },
    components: {
      OrganizationForm,
      typeVarietyGradeSelect
    },
    methods: {
      downloadXlsFile() {
        var x = new XMLHttpRequest();
        x.open('GET', this.url, true);
        x.responseType = 'blob';
        x.onload = function (e) {
          require('downloadjs')(x.response, '打包台账表.xls');
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
        console.log(root);
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
        this.searchData.begin = (this.searchData.depart === '' || this.searchData.depart === null) ? '1970-01-01' : this.searchData.depart[0];
        this.searchData.end = (this.searchData.depart === '' || this.searchData.depart === null) ? '2999-01-01' : this.searchData.depart[1];
        //判断选择日期区间是否在当前年度内
        let begin = parseInt(this.searchData.begin.slice(0, 4));
        let end = parseInt(this.searchData.end.slice(0, 4));
        let selecTyear = parseInt(this.searchData.annual);
        if (begin !== selecTyear || end !== selecTyear) {
          this.$message({
            message: '日期区间必须在选择年度范围内',
            type: 'error'
          });
          return;
        }
        if (this.searchData.gradename === '') {
          this.searchData.gradename = '全部';
        }
        if (this.searchData.varietyname === '') {
          this.searchData.varietyname = '全部';
        }
        Promise.all([deliveryApi.getPackageReport(this.searchData)])
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
