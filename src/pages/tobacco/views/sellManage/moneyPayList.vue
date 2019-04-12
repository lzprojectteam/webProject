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
          <el-form-item label="年度">
            <el-date-picker
              value-format="yyyy"
              style="width: 100px"
              v-model="searchData.annual"
              type="year"
              :placeholder="$t('base.pleaseSelect')">
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
        </el-form>
      </div>
      <div class='toolButton' style="min-width: 60px">
        <el-button-group>
          <el-button type='primary' @click='downloadFile()'>导出</el-button>
          <el-button type='primary' @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }}</el-button>
        </el-button-group>
      </div>
    </div>
    <main class='contentPanel'>
      <el-table
        highlight-current-row
        border
        :data="formData.sellList"
        style="width: 100%"
        stripe
        show-summary
        :summary-method="getSummaries" >
        <el-table-column prop="serial" label="序号" width="60"
                         show-overflow-tooltip/>
        <el-table-column prop="farmername" label="姓名"
                         show-overflow-tooltip
        />

        <el-table-column prop="farmeridentity" label="身份证号"
                         show-overflow-tooltip
        />
        <el-table-column prop="bankaccount" label="银行卡号"
                         show-overflow-tooltip>
                         <template slot-scope="scope">
              <span > {{scope.row.bankaccount }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="weight" label="重量（公斤）">
          <template slot-scope="scope">
              <span style="float:right">{{scope.row.weight| Number(2) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="money" label="金额（元）">
           <template slot-scope="scope">
              <span  style="float:right">{{scope.row.money| Currency }}</span>
          </template>
        </el-table-column>
      </el-table>
    </main>
  </div>
</template>
<script>
  const OrganizationForm = () => import('@/components/Organization');
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
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            }
          ]
        },
        url: '', //存放解析后的文件路径
        searchData: {
          'organizationid': this.$store.state.user.organization.organizationId,
          'depart': [this.dateFormat(new Date(), 'yyyy-mm-dd'), this.dateFormat(new Date(), 'yyyy-mm-dd')],
          'start': '',
          'end': '',
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
        sumColumnNames: [
          { column: 'weight', unit: '公斤' },
          { column: 'money', unit: ' 元' }
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
      this.searchData.annual = new Date().getFullYear().toString();
      this.onSearchButtonClick();
    },
    components: {
      OrganizationForm,
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
            sums[index] = this.$accounting.formatNumber( sums[index], 2) + ' ' + col.unit;
          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;
      },
      downloadFile() {
        var x = new XMLHttpRequest();
        x.open('GET', this.url, true);
        x.responseType = 'blob';
        x.onload = function(e) { require('downloadjs')(x.response, '资金支付报表.xls'); };
        x.send();
      },
      getfilePath(filepath) {
        let isProduction = process.env.NODE_ENV === 'production';//如果是生产环境，前缀要发生变化
        if (
          filepath === undefined ||
          filepath === '' ||
          filepath === null
        ) {
          return '/#/tobacco/sellManage/sellReport';
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

      onSearchButtonClick() {
        this.searchData.beginDate = (this.searchData.depart === '' || this.searchData.depart === null) ? '1970-01-01' : this.searchData.depart[0];
        this.searchData.endDate = (this.searchData.depart === '' || this.searchData.depart === null) ? '2999-01-01' : this.searchData.depart[1];
        Promise.all([deliveryApi.getBankrollReport(this.searchData.organizationid, this.searchData.beginDate, this.searchData.endDate, this.searchData.annual)])
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

      }
    },
  };
</script>

<style scoped>
  .el-input--mini .el-input__inner {
    width: 130px !important;
  }
</style>
