<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-form-item :label="$t('tobacco.setup.parameter.annual')">
            <el-date-picker value-format="yyyy" v-model="searchData.annual" type="year"
                            :placeholder="$t('base.pleaseSelect')">
            </el-date-picker>
          </el-form-item>

          <el-form-item :label="$t('tobacco.tsell.receipt.control')">
            <el-select v-model='searchData.control' style="width:150px">
              <el-option value='' key=''> -</el-option>
              <el-option v-for="item in  formData.controlList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('base.keywords')">
            <el-input v-bind:placeholder="$t('base.ipKeywords')" v-model="formData.pagination.keyword"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <template v-if='expand'>
            <el-form-item :label="$t('tobacco.tsell.payment.dateRange')">
              <el-date-picker v-model="formData.beginAndEnd" type="daterange" range-separator="至"
                              :start-placeholder="$t('tobacco.basic.annual.begin')"
                              :end-placeholder="$t('tobacco.basic.annual.end')" style="width: 396px;">
              </el-date-picker>
            </el-form-item>
          </template>
        </el-form>
      </div>
      <div class='toolButton' style="min-width: 300px">
        <el-button-group>
          <el-button type='primary' @click='onExpandClick'>{{ $t('base.buttonFilter') }}</el-button>
          <el-button type='primary' @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }}</el-button>
          <el-dropdown>
            <el-button type="primary">
              {{$t('tobacco.tsell.payment.moreOperations')}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button type='primary' @click=''>{{$t('tobacco.tsell.payment.invalid')}}</el-button>

              </el-dropdown-item>
              <el-dropdown-item>
                <el-button type='primary' @click=''>{{$t('tobacco.tsell.payment.downloadInvoice')}}</el-button>

              </el-dropdown-item>
              <el-dropdown-item>
                <el-button type='primary' @click=''>{{$t('tobacco.tsell.payment.uploadReconciliation')}}</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <!-- <el-button type='primary' @click='childForm.addForm=true'>{{ $t('base.buttonAdd') }}</el-button>-->
          <!-- <el-button type='primary' @click='childForm.addForm=true'>{{ $t('base.buttonAdd') }}</el-button>-->
          <el-button type='primary' @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }}</el-button>
        </el-button-group>
      </div>
    </div>
    <main class='contentPanel'>
      <el-table highlight-current-row border @current-change="handleCurrentChange" :data="formData.receiptList"
                style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="annual" :label="this.$t('tobacco.tsell.receipt.annual')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="serial" :label="this.$t('tobacco.tsell.receipt.serial')" width="150"
                         show-overflow-tooltip/>
        <el-table-column prop="number" :label="this.$t('tobacco.tsell.receipt.number')" width="150"
                         show-overflow-tooltip/>
        <el-table-column prop="type" :label="this.$t('tobacco.tsell.receipt.type')" width="100" show-overflow-tooltip/>
        <el-table-column prop="title" :label="this.$t('tobacco.tsell.receipt.title')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="author" :label="this.$t('tobacco.tsell.receipt.author')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="date" :label="this.$t('tobacco.tsell.receipt.date')" width="100" show-overflow-tooltip/>
        <el-table-column prop="countryId" :label="this.$t('tobacco.tsell.receipt.countryId')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="countryName" :label="this.$t('tobacco.tsell.receipt.countryName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="contractId" :label="this.$t('tobacco.tsell.receipt.contractId')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="farmerId" :label="this.$t('tobacco.tsell.receipt.farmerId')"width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="contractNumber" :label="this.$t('tobacco.tsell.receipt.contractNumber')" width="200"
                         show-overflow-tooltip/>
        <el-table-column prop="farmerNumber" :label="this.$t('tobacco.tsell.receipt.farmerNumber')" width="200"
                         show-overflow-tooltip/>
        <el-table-column prop="farmerName" :label="this.$t('tobacco.tsell.receipt.farmerName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="farmerIdentity" :label="this.$t('tobacco.tsell.receipt.farmerIdentity')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="farmerPhone" :label="this.$t('tobacco.tsell.receipt.farmerPhone')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="farmerAddress" :label="this.$t('tobacco.tsell.receipt.farmerAddress')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="bankName" :label="this.$t('tobacco.tsell.receipt.bankName')"/>
        <el-table-column prop="bankAccount" :label="this.$t('tobacco.tsell.receipt.bankAccount')" width="200"
                         show-overflow-tooltip/>
        <el-table-column prop="weight" :label="this.$t('tobacco.tsell.receipt.weight')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="money" :label="this.$t('tobacco.tsell.receipt.money')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="price" :label="this.$t('tobacco.tsell.receipt.price')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="tax" :label="this.$t('tobacco.tsell.receipt.tax')" width="100" show-overflow-tooltip/>
        <el-table-column prop="allowance" :label="this.$t('tobacco.tsell.receipt.allowance')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="total" :label="this.$t('tobacco.tsell.receipt.total')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="sign" :label="this.$t('tobacco.tsell.receipt.sign')" width="100" show-overflow-tooltip/>
        <el-table-column prop="file" :label="this.$t('tobacco.tsell.receipt.file')" width="200" show-overflow-tooltip/>
        <el-table-column prop="delivery" :label="this.$t('tobacco.tsell.receipt.delivery')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="tag" :label="this.$t('tobacco.tsell.receipt.tag')" width="100" show-overflow-tooltip/>
        <el-table-column prop="control" :label="this.$t('tobacco.tsell.receipt.control')" width="100"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            {{ controlList[scope.row.control]}}
          </template>
        </el-table-column>
        <el-table-column prop="desc" :label="this.$t('tobacco.tsell.receipt.desc')" width="100" show-overflow-tooltip/>
        <el-table-column fixed="right" :label="$t('base.titleOperation')" width="100">
          <template slot-scope="scope">
            <el-button @click="editButtonClick(scope.row,false)" type="text" size="small">{{$t('base.buttonView')}}
            </el-button>
            <!-- <el-button type="text" size="small" @click="editButtonClick(scope.row,true)">{{$t('base.buttonEdit')}}
            </el-button> -->
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
      <el-dialog :title="$t('base.buttonAdd')" :visible.sync="childForm.addForm" top="10px" :before-close="handleClose">
        <add-form/>
      </el-dialog>
      <el-dialog :title="$t('base.buttonEdit')" :visible.sync="childForm.editForm" top="10px"
                 :before-close="handleClose">
        <edit-form :item.sync=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.editForm"
                   @refresh="onSearchButtonClick"
        />
      </el-dialog>
      <el-dialog :title="$t('base.buttonView')" :visible.sync="childForm.viewForm" top="10px"
                 :before-close="handleClose">
        <edit-form :item=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.viewForm"/>
      </el-dialog>
    </template>
  </div>
</template>
<script>
  const AddForm = () => import('./receiptAdd.vue');
  const EditForm = () => import('./receiptEdit.vue');
  import receiptApi from '../../api/tsell/api_receipt';

  const OrganizationForm = () => import('@/components/Organization');
  //import dateFormat from 'dateformat';
  export default {
    data() {
      return {
        expand: false,
        expandIcon: 'el-icon-arrow-left',
        controlList: {
          '': '-',
          '1': '交售',
          '3': '作废单',
          '5': '正常单',
          '6': '冲红单',
          '7': '冲红原始单'
        },
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
          annual: '',
          serial: '',
          number: '',
          type: '',
          title: '',
          author: '',
          date: '',
          countryId: '',
          countryName: '',
          contractId: '',
          contractNumber: '',
          farmerId: '',
          farmerNumber: '',
          farmerName: '',
          farmerIdentity: '',
          farmerPhone: '',
          farmerAddress: '',
          bankName: '',
          bankAccount: '',
          weight: 0,
          money: 0,
          price: 0,
          tax: 0,
          allowance: 0,
          total: 0,
          sign: '',
          file: '',
          delivery: '',
          tag: 0,
          control: '',
          desc: '',
          orgId: '',
          organization: ''
        },
        formData: {
          beginAndEnd: [
            this.dateFormat(this.getFirstDate(), 'yyyy-mm-dd'),
            this.dateFormat(this.getLastDate(), 'yyyy-mm-dd')
          ],
          controlList: [
            {id: '1', name: '交售'},
            {id: '3', name: '作废单'},
            {id: '5', name: '正常单'},
            {id: '6', name: '冲红单'},
            {id: '7', name: '冲红原始单'}
          ],
          receiptList: [],
          pagination: {
            //用于分页的变量
            currentPage: 1,
            pageSize: 10,
            total: 0,
            keyword: '',
            pageSizeOpts: [10, 15, 20, 25, 30]
          },
          rowSelection: []
        }
      };
    },
    created() {
      this.searchData.annual = new Date().getFullYear().toString();
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
      OrganizationForm
    },
    methods: {
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
        Promise.all([receiptApi.deleteReceipt(this.formData.selectRow.id)])
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
      handleCurrentChange(val) {
        this.formData.selectRow = val;
      },
      organizationOnchange(label, value, values) {
        this.searchData.orgId = value;
      },
      onExpandClick() {
        this.expand = !this.expand;
        if (this.expand) {
          this.expandIcon = 'el-icon-arrow-down';
        } else {
          this.expandIcon = 'el-icon-arrow-left';
        }
      },
      onSearchButtonClick() {
        if (this.searchData.annual === null) {
          this.searchData.annual = '';
        }
        let beginDate = this.dateFormat(this.formData.beginAndEnd[0], 'yyyymmdd');
        let endDate = this.dateFormat(this.formData.beginAndEnd[1], 'yyyymmdd');

        Promise.all([
          receiptApi.getAll({
            size: this.formData.pagination.pageSize,
            sort: 'serial,ASC',
            page: this.formData.pagination.currentPage - 1,
            /*  contains: 'type,title,author,countryName,farmerId,farmerName,farmerIdentity,farmerAddress,bankName,tax,allowance,total,sign,file,delivery,tag,desc,:{keyword}:true'.format(
              { keyword: this.formData.pagination.keyword }
            ), */
            search: 'annual:EQ:{annual};control:EQ:{control};date:BETWEEN:{beginDate},{endDate};'.format(
              {
                annual: this.searchData.annual,
                control: this.searchData.control,
                beginDate: beginDate,
                endDate: endDate
              }
            )
          })
        ])
          .then(([response]) => {
            console.log(response.content);
            this.formData.receiptList = response.content;
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
        this.onSearchButtonClick();
        done();
      }
    }
  };
</script>
