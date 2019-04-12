<style scoped>
  @import '~@/styles/css/main-list.css';
</style>
<template>
  <transition name="slide-fade">
    <add-form v-if="childForm.addForm" :visible.sync="childForm.addForm" :item="formData.selectRow"/>
    <!--<edit-form  :uid='formData.selectRow===null?"":formData.selectRow.uid'
               :visible.sync="childForm.editForm"/>-->
    <edit-form v-else-if="childForm.editForm" :item=formData.selectRow :isEdit="childForm.isEdit" :visible.sync="childForm.editForm"
               @refresh="onSearchButtonClick"
    />
    <div v-else class='mainPanel'>
      <div class='toolPanel'>
        <div class='queryCriteria'>
          <el-form inline>
            <el-form-item :label="$t('tobacco.thuman.hrEmployee.organization')">
              <organization-form :root="userOrgId" @onchange="organizationOnchange" v-model="searchData.organization"
                                 style="width:150px"/>
            </el-form-item>
            <el-form-item :label="$t('tobacco.tsell.delivery.annual')">
              <el-date-picker value-format="yyyy" v-model="searchData.annual" type="year" placeholder="选择年"
                              style="width:150px">
              </el-date-picker>
            </el-form-item>
               <template v-if='expand'>
                <el-form-item :label="$t('tobacco.tsell.delivery.control')">
                  <el-select v-model='searchData.control' style="width:150px">
                    <el-option value='' key=''>{{ $t('base.all') }}</el-option>
                    <el-option v-for="item in  formData.stateList" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item :label="$t('tobacco.tsell.delivery.begindate')">
                  <el-date-picker v-model="searchData.begindate" type="date" value-format="yyyyMMddHHmmss"
                                  placeholder="开始日期"
                                  style="width:150px">
                  </el-date-picker>
                </el-form-item>
                <el-form-item :label="$t('tobacco.tsell.delivery.enddate')">
                  <el-date-picker v-model="searchData.enddate" type="date" value-format="yyyyMMddHHmmss"
                                  placeholder="结束日期"
                                  style="width:150px">
                  </el-date-picker>
                </el-form-item>
              </template>
            <el-form-item :label="$t('base.keywords')">
              <el-input v-bind:placeholder="$t('base.ipKeywords')" v-model="formData.pagination.keyword"
                        @keyup.enter.native="onSearchButtonClick" style="width:150px"/>
            </el-form-item>
        
          </el-form>
        </div>
        <div class='toolButton' style="min-width: 250px">
          <el-button-group>
            <el-button type='primary' @click='onExpandClick'>{{ $t('base.buttonFilter') }}</el-button>
            <el-button type='primary' @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }}</el-button>
            <el-dropdown>
              <el-button type="primary">
                更多操作
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <el-button type='primary' @click='childForm.addForm=true' style="width:90px;">{{ $t('base.buttonAdd')
                    }}
                  </el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button type='primary' @click='createdReceiptBtn' style="width:90px;" v-if="showCreate">创建发票
                  </el-button>
                  <el-button type='primary' @click='downloadReceiptBtn' style="width:90px;" v-if="showDownload">下载发票
                  </el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button type='primary' @click='forceReleaseConfirm' style="width:90px;">强制结束</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button type='primary' @click='printpoorBtnfirm' style="width:90px;">扶持费打印</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-button-group>
        </div>
      </div>
      <main class='contentPanel' id="farmer_delivery">
        <el-table highlight-current-row border @current-change="handleCurrentChange" :data="formData.deliveryList"
                  style="width: 100%" :row-class-name="tableRowClassName">
          <el-table-column type="index" fixed="left">
          </el-table-column>
          <el-table-column prop="serial" :label="this.$t('tobacco.tsell.delivery.serial')" show-overflow-tooltip
                           width='170'/>
          <el-table-column prop="date" :label="this.$t('tobacco.tsell.delivery.date')" show-overflow-tooltip
                           width='100'>
            <template slot-scope="scope">
              {{dateFormat(scope.row.date,'yyyy-mm-dd')}}
            </template>
          </el-table-column>
          <el-table-column prop="contractNumber" :label="this.$t('tobacco.tsell.delivery.contractNumber')"
                           show-overflow-tooltip width='150'/>

          <el-table-column prop="farmerName" :label="this.$t('tobacco.tsell.delivery.farmerName')" show-overflow-tooltip
                           width='100' fixed="left">
            <template slot-scope="scope">
              <el-tooltip content="查看烟框" placement="right" :open-delay='300'>
                <el-button type="text" size="small" @click=clickFarmer(1) style="width: 100%;width: 100%;border: none;">
                  {{scope.row.farmerName}}
                </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="farmerIdentity" label="身份证"
                           show-overflow-tooltip width='160'/>
          <el-table-column prop="farmerPhone" :label="this.$t('tobacco.tsell.delivery.farmerPhone')"
                           show-overflow-tooltip width='100'/>
          <el-table-column prop="farmerAddress" :label="this.$t('tobacco.tsell.delivery.farmerAddress')"
                           show-overflow-tooltip width='100'/>
          <!--  <el-table-column prop="bankName" :label="this.$t('tobacco.tsell.delivery.bankName')" show-overflow-tooltip
                             width='100'/>-->
          <el-table-column prop="bankAccount" :label="this.$t('tobacco.tsell.delivery.bankAccount')"
                           show-overflow-tooltip width='100'/>
          <el-table-column prop="year" :label="this.$t('tobacco.tsell.delivery.year')" show-overflow-tooltip
                           width='100'></el-table-column>
          <el-table-column prop="areaName" :label="this.$t('tobacco.tsell.delivery.areaName')" show-overflow-tooltip
                           width='100'/>
          <el-table-column prop="typeName" :label="this.$t('tobacco.tsell.delivery.typeName')" show-overflow-tooltip
                           width='100'/>
          <el-table-column prop="varietyName" :label="this.$t('tobacco.tsell.delivery.varietyName')"
                           show-overflow-tooltip width='100'/>
          <el-table-column prop="signWeight" :label="this.$t('tobacco.tsell.delivery.signWeight')" show-overflow-tooltip
                           width='100'/>
          <el-table-column prop="restWeight" :label="this.$t('tobacco.tsell.delivery.restWeight')" show-overflow-tooltip
                           width='100'/>
          <el-table-column prop="dealWeight" :label="this.$t('tobacco.tsell.delivery.dealWeight')" show-overflow-tooltip
                           width='100'/>
          <!--  <el-table-column prop="balanceNumber" :label="this.$t('tobacco.tsell.delivery.balanceNumber')"
                             show-overflow-tooltip width='100'/>-->
          <el-table-column prop="balanceName" :label="this.$t('tobacco.tsell.delivery.balanceName')"
                           show-overflow-tooltip width='100'/>
          <!-- <el-table-column prop="filePath" :label="this.$t('tobacco.tsell.delivery.filePath')" show-overflow-tooltip
                            width='100'/>-->
          <!--  <el-table-column prop="picture" :label="this.$t('tobacco.tsell.delivery.picture')" show-overflow-tooltip
                             width='100'/>-->
          <el-table-column prop="print" :label="this.$t('tobacco.tsell.delivery.print')" show-overflow-tooltip
                           width='100'/>
          <el-table-column prop="control" :label="this.$t('tobacco.tsell.delivery.control')" show-overflow-tooltip
                           width='100'>
            <template slot-scope="scope">
              {{ controlList[scope.row.control]}}
            </template>
          </el-table-column>
          <el-table-column prop="desc" :label="this.$t('tobacco.tsell.delivery.desc')" show-overflow-tooltip
                           />
          <el-table-column fixed="right" :label="$t('base.titleOperation')" width="150px">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editButtonClick(scope.row,false)">
                {{$t('base.buttonView')}}
              </el-button>
              <el-button type="text" size="small" @click="editButtonClick(scope.row,true)" :disabled="checkEdit(scope.row.receiptFile)">
                {{$t('base.buttonEdit')}}
              </el-button>
              <el-button type='text' size="small" @click='deleteButtonConfirm'>{{ $t('base.buttonDelete')
                }}
              </el-button>
              <!-- <el-button type="text" size="small" @click="exportButtonClick(scope.row)"
               >{{$t('base.export')}}
               </el-button>-->
            </template>
          </el-table-column>
        </el-table>
      </main>
      <div class='footerPanel'>
        <el-pagination :page-size='formData.pagination.pageSize' :total='formData.pagination.total'
                       :current-page='formData.pagination.currentPage' @current-change='onPageChange'
                       :page-sizes='formData.pagination.pageSizeOpts' @size-change='onPageSizeChange'
                       layout="total, sizes, prev, pager, next, jumper" placement='top'></el-pagination>
      </div>
      <template>
        <el-dialog :title="$t('base.printPoor')" :visible.sync="childForm.bindForm" top="10px" style="text-align:center"
                   :before-close="handleClose">
          <bind-form :item=formData.selectRow :visible.sync="childForm.bindForm"/>
        </el-dialog>
        <el-dialog :title="formData.title" top='0px' :visible.sync="childForm.infoForm" width="auto"
                   style="text-align:center"
                   :before-close="handleClose">
          <info-form :item=formData.selectRow :visible.sync="childForm.infoForm"/>
        </el-dialog>
      </template>
    </div>
  </transition>
</template>
<script>
  const AddForm = () => import('./deliveryAdd.vue');
  const EditForm = () => import('./deliveryEdit.vue');
  const BindForm = () => import('./bindFarmer.vue');
  const InfoForm = () => import('./delivery_invoice.vue');
  const OrganizationForm = () => import('@/components/Organization');
  const path = require('path');

  
  import deliveryApi from '../../api/tsell/api_delivery';
  import receiptApi from '../../api/tsell/api_receipt';
  // import util from '@/utils/util';

  export default {
    data() {
      return {
        showCreate: true,
        showDownload: false,
        expand: false,
        expandIcon: 'el-icon-arrow-left',
        controlList: {0: '-', 2: '录入', 8: '完成'},
        childForm: {
          addForm: false,
          editForm: false,
          bindForm: false,
          viewForm: false,
          isEdit: false,
          infoForm: false,
        },
        /* dateoptions: {
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
        }, */
        searchData: {
          annual: this.dateFormat(new Date(), 'yyyy'),
          date: '',
          begindate: '',
          enddate: '',
          control: '',
          organizationId: this.$store.state.user.organization.organizationId,
        },
        formData: {
          deliveryList: [],
          title: '',
          pagination: {
            //用于分页的变量
            currentPage: 1,
            pageSize: 10,
            total: 0,
            keyword: '',
            pageSizeOpts: [10, 15, 20, 25, 30]
          },
          viewSelect: '',
          rowSelection: [],
          stateList: [{id: '2', name: '录入'}, {id: '8', name: '完成'}]
        }
      };
    },
    created() {
      this.onSearchButtonClick();
    },
    computed: {
      userOrgId() {
        if (this.$store.state.user.organization === undefined) {
          this.searchData.orgId = undefined;
          return undefined;
        } else {
          this.searchData.orgId = this.$store.state.user.organization.organizationId;
          return this.$store.state.user.organization.organizationId;
        }
      }
    },
    components: {
      'add-form': AddForm,
      'edit-form': EditForm,
      'bind-form': BindForm,
      'info-form': InfoForm,
      OrganizationForm
    },
    methods: {
      downloadReceiptBtn() {
        let url = this.getfilePath(this.formData.selectRow.receiptFile);
        this.downloadXlsFile(url);
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
      downloadXlsFile(url) {
        var x = new XMLHttpRequest();
        x.open('GET', url, true);
        x.responseType = 'blob';
        x.onload = function (e) {
          require('downloadjs')(x.response, '发票.xls');
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
      },
      editButtonClick(selectRow, isEdit) {
        this.formData.viewSelect = selectRow;
        this.childForm.editForm = true;
        this.childForm.isEdit = isEdit;
      },
      /* bindfFarmBtn(row, isTrue) {
        parseFloat(response.totalElements).info(JSON.parse(JSON.stringify(row)));
        this.formData.selectRow = row;
        this.childForm.bindForm = true;
      }, */
      deleteButtonClick() {
        //alert(this.formData.selectRow.uid);
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
        Promise.all([deliveryApi.deleteDelivery(this.formData.selectRow.uid)])
          .then(([response]) => {
            this.$message({
              type: 'info',
              message: this.$t('message.deleteOk')
            });
            this.formData.selectRow = null;
            this.onSearchButtonClick();
          })
          .catch(error => {
          });
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
      printpoorBtnfirm() {
        if (
          this.formData.selectRow === null ||
          this.formData.selectRow === undefined
        ) {
          this.$message({
            message: this.$t('message.unSelectAny'),
            type: 'info'
          });
          return;
        } else {
          this.childForm.bindForm = true;
        }
      },
      createdReceiptBtn() {
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
        this.$confirm(
          this.$t('创建发票后将无法编辑，是否继续'),
          this.$t('base.titleTip'),
          {
            confirmButtonText: this.$t('base.buttonOk'),
            cancelButtonText: this.$t('base.buttonCancel'),
            type: 'warning'
          }
        )
          .then(() => {
            Promise.all([receiptApi.createReceipt(this.formData.selectRow.uid)])
              .then(([response]) => {
                this.$message({
                  type: 'info',
                  message: '创建发票成功'
                });
                // 刷新页面，获取最新数据
                this.onSearchButtonClick();
              })
              .catch(error => {
              });
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: this.$t('message.cancel')
            });
          });
      },
      forceReleaseConfirm() {
        this.$confirm(this.$t('确认要强制结束？'), this.$t('base.titleTip'), {
          confirmButtonText: this.$t('base.buttonOk'),
          cancelButtonText: this.$t('base.buttonCancel'),
          type: 'warning'
        })
          .then(() => {
            this.forceReleaseButtonClick();
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: this.$t('message.cancel')
            });
          });
      },
      forceReleaseButtonClick() {
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
        Promise.all([receiptApi.release(this.formData.selectRow.uid)])
          .then(([response]) => {
            this.$message({
              type: 'info',
              message: this.$t('message.OK')
            });
            this.formData.selectRow = null;
            //this.onSearchButtonClick();
          })
          .catch(error => {
          });
      },
      organizationOnchange(label, value, values) {
        this.searchData.organizationId = value;
      },
      handleCurrentChange(val) {
        this.formData.selectRow = val;
        // 通过receiptFile判断显示创建发票还是下载发票
        if (this.formData.selectRow) {
          if (this.formData.selectRow.receiptFile) {
            this.showCreate = false;
            this.showDownload = true;
          } else {
            this.showCreate = true;
            this.showDownload = false;
          }
        }
        this.getTitle();
      },
      checkEdit(item) {
        if (item) {
          return true;
        } else {
          return false;
        }
      },
      getTitle() {
        if (this.formData.selectRow === '' || this.formData.selectRow === null) {
          this.formData.title = '';
        } else {
          this.formData.title = this.formData.selectRow.farmerName + '的烟框信息';
        }
      },
      clickFarmer(flag) {
        if (flag === 1) {
          this.childForm.infoForm = true;
        } else {
          if (this.formData.selectRow === null ||
            this.formData.selectRow === undefined) {
            this.$message({
              message: this.$t('message.unSelectAny'),
              type: 'info'
            });
          } else {
            this.childForm.infoForm = true;
          }
        }
      },
      onSearchButtonClick() {
        if (this.searchData.annual === null) {
          this.searchData.annual = '';
        }
        Promise.all([
          deliveryApi.getAll({
            size: this.formData.pagination.pageSize,
            page: this.formData.pagination.currentPage - 1,
            sort: 'serial,date,ASC',
            contains: 'title,author,regionName,countryName,farmerName,farmerIdentity,farmerPhone,farmerAddress,bankName,areaName,varietyName,signWeight,restWeight,dealWeight,balanceName:{keyword}:true'.format(
              {keyword: this.formData.pagination.keyword}
            ),
            search: 'organization.organizationId:LIKE:{orgid};annual:EQ:{annual};date:BETWEEN:{begindate},{enddate};control:EQ:{control};'.format(
              {
                orgid: this.searchData.organizationId,
                annual: this.searchData.annual,
                begindate: (this.searchData.begindate === '' || this.searchData.begindate === null) ? '19700101000000' : this.searchData.begindate,
                enddate: (this.searchData.enddate === '' || this.searchData.enddate === null) ? '29990101000000' : this.searchData.enddate,

                control: this.searchData.control
              }
            )
          })
        ])
          .then(([response]) => {
            this.formData.deliveryList = response.content;
            this.formData.pagination.total = parseFloat(response.totalElements);
            this.$notify({
              title: this.$t('base.hint'),
              message: this.$t('base.loadingDone'),
              duration: 1000,
              position: 'bottom-right'
            });
          })
          .catch(error => {
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
        this.childForm.BindForm = false;
        this.onSearchButtonClick();
        done();
      },
      /*
            exportButtonClick(row) {
              Promise.all([deliveryApi.export(row.id)])
                .then(([response]) => {
                  util.downloadWithStream(response);
                  this.$message({
                    message: this.$t('onlineForm.operationOk'),
                    type: 'info'
                  });
                })
                .catch(error => {
                  console.log(error);
                });
            }
      */
    }
  };
</script>
<style scoped>
  .el-dropdown {
    vertical-align: top;
  }

  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .slide-fade-enter-active {
    transition: all 0.3s ease;
  }

  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }

  /*.el-table_1_column_7{
    cursor: pointer !important;
    background-color: red !important;
  }*/
</style>
