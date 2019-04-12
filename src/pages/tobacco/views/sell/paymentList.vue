<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
            <organization-form :root="userOrgId" @onchange="organizationOnchange" v-model="searchData.orgId" />
          </el-form-item>
          <el-form-item :label="$t('tobacco.setup.parameter.annual')">
            <el-date-picker value-format="yyyy" v-model="searchData.annual" type="year" :placeholder="$t('base.pleaseSelect')">
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('base.keywords')">
            <el-input v-bind:placeholder="$t('base.ipKeywords')" v-model="formData.pagination.keyword" style="width:150px" />
          </el-form-item>
          <template v-if='expand'>
            <el-form-item :label="$t('tobacco.tsell.payment.dateRange')">
              <el-date-picker v-model="formData.beginAndEnd" type="daterange" range-separator="至" :start-placeholder="$t('tobacco.basic.annual.begin')" :end-placeholder="$t('tobacco.basic.annual.end')" style="width: 424px;">
              </el-date-picker>
            </el-form-item>
          </template>
        </el-form>
      </div>
      <div class='toolButton' style="min-width: 350px">
        <el-button-group>
          <el-button type='primary' @click='onExpandClick'>{{ $t('base.buttonFilter') }}</el-button>
          <el-button type='primary' @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }}</el-button>
          <el-button type='primary' @click='childForm.calculateForm=true'>{{$t('tobacco.tsell.payment.calculate')}}</el-button>
          <el-button type='primary' @click='childForm.exportForm=true'>{{$t('tobacco.tsell.payment.export')}}</el-button>
          <el-button type='primary' @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }}</el-button>
        </el-button-group>
      </div>
    </div>
    <main class='contentPanel'>
      <el-table highlight-current-row border @current-change="handleCurrentChange" :data="formData.paymentList" style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="organization.organizationName" :label="this.$t('org.organizationName')" width="100" show-overflow-tooltip/>
        <el-table-column prop="annual" :label="this.$t('tobacco.tsell.payment.annual')" />
        <el-table-column prop="serial" :label="this.$t('tobacco.tsell.payment.serial')" width="200" show-overflow-tooltip/>
        <el-table-column prop="number" :label="this.$t('tobacco.tsell.payment.number')" width="100" show-overflow-tooltip/>
        <el-table-column prop="title" :label="this.$t('tobacco.tsell.payment.title')" width="100" show-overflow-tooltip/>
        <el-table-column prop="author" :label="this.$t('tobacco.tsell.payment.author')" />
        <el-table-column prop="date" :label="this.$t('tobacco.tsell.payment.date')" width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            {{dateFormat(scope.row.date,'yyyy-mm-dd')}}
          </template>
        </el-table-column>
        <el-table-column prop="countryId" :label="this.$t('tobacco.tsell.payment.countryId')" width="100" show-overflow-tooltip/>
        <el-table-column prop="countryName" :label="this.$t('tobacco.tsell.payment.countryName')" width="100" show-overflow-tooltip/>
        <el-table-column prop="contractNumber" :label="this.$t('tobacco.tsell.payment.contractNumber')" width="100" show-overflow-tooltip/>
        <el-table-column prop="farmerId" :label="this.$t('tobacco.tsell.payment.farmerId')" width="100" show-overflow-tooltip/>
        <el-table-column prop="farmerName" :label="this.$t('tobacco.tsell.payment.farmerName')" />
        <el-table-column prop="farmerIdentity" :label="this.$t('tobacco.tsell.payment.farmerIdentity')" width="100" show-overflow-tooltip/>
        <el-table-column prop="farmerPhone" :label="this.$t('tobacco.tsell.payment.farmerPhone')" width="150" />
        <el-table-column prop="farmerAddress" :label="this.$t('tobacco.tsell.payment.farmerAddress')" width="150" show-overflow-tooltip/>
        <el-table-column prop="bankName" :label="this.$t('tobacco.tsell.payment.bankName')" width="100" show-overflow-tooltip/>
        <el-table-column prop="bankAccount" :label="this.$t('tobacco.tsell.payment.bankAccount')" width="150" show-overflow-tooltip/>
        <el-table-column prop="weight" :label="this.$t('tobacco.tsell.payment.weight')" />
        <el-table-column prop="money" :label="this.$t('tobacco.tsell.payment.money')" />
        <el-table-column prop="price" :label="this.$t('tobacco.tsell.payment.price')" />
        <el-table-column prop="tax" :label="this.$t('tobacco.tsell.payment.tax')" />
        <el-table-column prop="allowance" :label="this.$t('tobacco.tsell.payment.allowance')" />
        <el-table-column prop="payable" :label="this.$t('tobacco.tsell.payment.payable')" />
        <el-table-column prop="deduct" :label="this.$t('tobacco.tsell.payment.deduct')" />
        <el-table-column prop="paid" :label="this.$t('tobacco.tsell.payment.paid')" />
        <el-table-column prop="control" :label="this.$t('tobacco.tsell.payment.control')">
        </el-table-column>
        <el-table-column prop="desc" :label="this.$t('tobacco.tsell.payment.desc')" width="100" show-overflow-tooltip/>
        <el-table-column fixed="right" :label="$t('base.titleOperation')" width="100">
          <template slot-scope="scope">
            <el-button @click="editButtonClick(scope.row,false)" type="text" size="small">{{$t('base.buttonView')}}
            </el-button>
            <el-button type="text" size="small" @click="editButtonClick(scope.row,true)">{{$t('base.buttonEdit')}}
            </el-button>
          </template>
        </el-table-column>
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
      <el-dialog :title="$t('tobacco.tsell.payment.exportTitle')" :visible.sync="childForm.exportForm" top="10px" :before-close="handleClose">
        <export-form :item=formData.viewSelect :visible.sync="childForm.exportForm" />
      </el-dialog>
      <el-dialog :title="$t('tobacco.tsell.payment.calculateTitle')" :visible.sync="childForm.calculateForm" top="10px" :before-close="handleClose">
        <calculate-form :item=formData.viewSelect :visible.sync="childForm.calculateForm" />
      </el-dialog>
    </template>
  </div>
</template>
<script>
const AddForm = () => import('./paymentAdd.vue');
const EditForm = () => import('./paymentEdit.vue');
const CalculateForm = () => import('./paymentCalculate.vue');
const ExportForm = () => import('./paymentExport.vue');
const OrganizationForm = () => import('@/components/Organization');

import paymentApi from '../../api/tsell/api_payment';

export default {
  data() {
    return {
      expand: false,
      expandIcon: 'el-icon-arrow-left',
      childForm: {
        addForm: false,
        editForm: false,
        viewForm: false,
        calculateForm: false,
        exportForm: false,
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
        orgId: '',
        serial: '',
        number: '',
        title: '',
        author: '',
        date: '',
        countryId: '',
        countryName: '',
        contractNumber: '',
        farmerId: '',
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
        payable: 0,
        deduct: 0,
        paid: 0,
        control: 0,
        desc: '',
        beginDate: '',
        endDate: ''
      },
      formData: {
        beginAndEnd: [
          this.dateFormat(this.getFirstDate(), 'yyyy-mm-dd'),
          this.dateFormat(this.getLastDate(), 'yyyy-mm-dd')
        ],
        paymentList: [],
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
    if (!(this.userOrgId === undefined)) {
      this.searchData.orgId = this.userOrgId;
    }
    this.onSearchButtonClick();
    this.searchData.annual = new Date().getFullYear().toString();
  },
  components: {
    'add-form': AddForm,
    'edit-form': EditForm,
    'calculate-form': CalculateForm,
    'export-form': ExportForm,
    OrganizationForm
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
  methods: {
    onExpandClick() {
      this.expand = !this.expand;
      if (this.expand) {
        this.expandIcon = 'el-icon-arrow-down';
      } else {
        this.expandIcon = 'el-icon-arrow-left';
      }
    },
    organizationOnchange(label, value, values) {
      this.searchData.orgId = value;
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

      Promise.all([paymentApi.deletePayment(this.formData.selectRow.id)])
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
      if (this.searchData.annual === null) {
        this.searchData.annual = '';
      }
      let beginDate = this.dateFormat(this.formData.beginAndEnd[0], 'yyyymmdd');
      let endDate = this.dateFormat(this.formData.beginAndEnd[1], 'yyyymmdd');
      console.log(this.searchData.annual);
      console.log(beginDate);
      console.log(endDate);
      Promise.all([
        paymentApi.getAll({
          size: this.formData.pagination.pageSize,
          sort: 'id,ASC',
          page: this.formData.pagination.currentPage - 1,
          contains: 'annual,number,title,author,countryId,countryName,contractNumber,farmerName,farmerIdentity,farmerPhone,farmerAddress,bankName,bankAccount,weight,money,price,tax,allowance,payable,deduct,paid,control,desc,:{keyword}:true'.format(
            { keyword: this.formData.pagination.keyword }
          ),
          search: 'annual:EQ:{annual};date:BETWEEN:{beginDate},{endDate};'.format(
            {
              annual: this.searchData.annual,
              beginDate: beginDate,
              endDate: endDate
            }
          )
        })
      ])
        .then(([response]) => {
          this.formData.paymentList = response.content;
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
