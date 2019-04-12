<style scoped>
@import "~@/styles/css/main-list.css";

  .mainPanel {
    position: relative;
  }
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
              <el-form-item :label="$t('tobacco.tsell.invoice.typeName')">
                <type-variety-select :varietyName.sync="searchData.varietyname"
                                     :varietyId.sync="searchData.varietyid"
                                     style="width:100%;"/>
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
    <main class='contentPanel' id="excelDefaults">
      <div v-html="tableData" class="table1" style="overflow:auto;"></div>
      <div class="outerBox">
        <table class="t1 table2" align="center">
          <tbody></tbody>
        </table>
      </div>
    </main>
  </div>
</template>
<script>
  const OrganizationForm = () => import('@/components/Organization');
  const typeVarietySelect = () => import('@/components/Tobacco/typeVarietySelect');
  const path = require('path');

  import deliveryApi from '../../api/tsell/api_delivery';
  

  export default {
    data() {
      return {
        firstLoad: true,
        scrollCount: 0,
        expand: false,
        tableData: '',
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
    mounted() {
      let contentPanel = document.getElementsByClassName('contentPanel')[0];
      //内容区域滚动监听
      contentPanel.addEventListener('scroll', this.handleScroll);
    },
    components: {
      OrganizationForm,
      typeVarietySelect
    },
    methods: {
      //监听滚动，动态设置表头固定
      handleScroll() {
        this.scrollCount++;
        if (this.scrollCount > 5) {
          //获取1表宽度，使2表表头宽度与其保持一致
          let table1_width = document.querySelector('.table1').offsetWidth;
          let outerBox = document.querySelector('.outerBox');
          outerBox.style.width = table1_width + 'px';
          //获取1表的表头，需要对行高进行正确配置
          let contentPanel = document.querySelector('.contentPanel');
          let tableHeads = document.querySelectorAll('.table1 .r2'); //获取表头
          if (tableHeads === null) {
            console.log('没有正确配置表头！');
            return;
          }
          //为表2动态添加1表表头数据
          let table2_tbody = document.querySelector('.table2 tbody');
          let scrollTop = contentPanel.scrollTop; //滚动掉的高度
          let offsetTop = tableHeads[0].offsetTop;
          //第一次触发滚动创建一个新的表格，用于显示表头
          if (this.firstLoad) {
            //在做动态报表时，选择其他报表要将firstLoad设为true
            let colgroup = document.querySelector('.table1 .t1 colgroup');//获取设置表格宽度的那部分html
            let colgroup_temp = colgroup.cloneNode(true);
            for (var i = 0, len = tableHeads.length; i < len; i++) {
              let temp = tableHeads[i].cloneNode(true);
              table2_tbody.appendChild(temp);
            }
            document.querySelector('.table2').appendChild(colgroup_temp);
            this.firstLoad = false;
          }
          //根据卷动高度判断是否显示2表（表头）
          if (offsetTop < scrollTop) {
            //根据搜索栏高度动态设置表头位置
            let top = document.querySelector('.toolPanel').offsetHeight + 20;
            outerBox.style.top = top + 5 + 'px';

            outerBox.style.display = 'block';
          } else {
            outerBox.style.display = 'none';
          }
          this.scrollCount = 0;
        }
      },
      downloadXlsFile() {
        var x = new XMLHttpRequest();
        x.open('GET', this.url, true);
        x.responseType = 'blob';
        x.onload = function (e) {
          require('downloadjs')(x.response, '购调存报表.xls');
        };
        x.send();
      },
      onExpandClick() {
        this.expand = !this.expand;
        if (this.expand) {
          this.expandIcon = 'el-icon-arrow-down';
        } else {
          this.expandIcon = 'el-icon-arrow-left';
        }
        setTimeout(() => {
          let top = document.querySelector('.toolPanel').offsetHeight + 20;
          let outerBox = document.querySelector('.outerBox');
          outerBox.style.top = top + 5 + 'px';
        }, 100);
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
        if (this.searchData.varietyname === '') {
          this.searchData.varietyname = '全部';
        }
        Promise.all([deliveryApi.getPurchaseAndStorage(this.searchData)])
          .then(([response]) => {
            // if(response.html)
            if (response.data.length !== 0) {
              this.tableData = response.html;
              this.url = this.getfilePath(response.url);
            } else {
              this.tableData = '<div style="text-align:center;line-height: 50px;color: #606266;font-size: 12px;border-bottom: 1px solid #ebeef5;">暂无数据</div>';
            }
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
<style>

  #excelDefaults {
    /*position: relative;*/
    width: 100%;
  }
  #excelDefaults .t1{
    margin-top: -21px;
    width: 100% !important;
  }

  #excelDefaults table{
    table-layout:fixed;
  }

  #excelDefaults tr {
    height: 36px !important;
    background-color: #fff !important;
  }

  #excelDefaults tr.r2 {
    z-index: 9999;
  }

  #excelDefaults tr td {
    font-size: 12px !important;
    color: #606266 !important;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif !important;
    line-height: 36px !important;
    padding-left: 10px;
    width: 300px;
  }

  #excelDefaults tr.r2 td {
    color: #909399 !important;
  }

  #excelDefaults tr:hover {
    background-color: #f5f7fa;
  }

  #excelDefaults td {
    border: 1px solid #dadde4 !important;
    box-sizing: border-box !important;
    text-overflow: ellipsis !important;
    vertical-align: middle !important;
    position: relative !important;
  }

  #excelDefaults tr:nth-child(1):hover, #excelDefaults tr:nth-child(2):hover, #excelDefaults tr:nth-child(3):hover, #excelDefaults tr:nth-child(4):hover, #excelDefaults tr:nth-child(5):hover, #excelDefaults tr:nth-child(6):hover {
    background-color: #fff;
  }

  /*表2样式*/
  .outerBox {
    display: none;
    position: absolute;
    width: auto;
    left: 0;
    top: 40px;
    margin: auto;
  }

  .table2 {
    margin: auto;
  }
</style>


