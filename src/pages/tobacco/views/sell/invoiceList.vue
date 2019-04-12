<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-form-item :label="$t('tobacco.thuman.hrEmployee.organization')">
            <organization-form :root="userOrgId" @onchange="organizationOnchange" v-model="searchData.organization" style="width:185px;" />
          </el-form-item>
          <el-form-item :label="$t('tobacco.tsell.invoice.annual')">
            <el-date-picker value-format="yyyy" v-model="searchData.annual" type="year" placeholder="选择年" style="width:185px;">
            </el-date-picker>
          </el-form-item>
          <template v-if='expand'>
            <el-form-item :label="$t('tobacco.tsell.delivery.begindate')">
              <el-date-picker value-format="yyyyMMdd" v-model="searchData.begindate" type="date" placeholder="开始日期" style="width:185px;">
              </el-date-picker>
            </el-form-item>
            <el-form-item :label="$t('tobacco.tsell.delivery.enddate')">
              <el-date-picker value-format="yyyyMMdd" v-model="searchData.enddate" type="date" placeholder="结束日期" style="width:185px;">
              </el-date-picker>
            </el-form-item>
            <el-form-item :label="$t('tobacco.tsell.invoice.typeName')">
              <type-variety-select :typeId.sync="searchData.typeId" :typeName.sync="searchData.typeName" :varietyId.sync="searchData.varietyId" :varietyName.sync="searchData.varietyName" style="width:450px;" />
            </el-form-item>
            <!-- <el-form-item :label="$t('tobacco.tsell.invoice.varietyName')">
                          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.varietyName" style="width:185px;" />
                      </el-form-item> -->
            <el-form-item :label="$t('tobacco.tsell.invoice.control')">
              <!-- <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.control" style="width:185px;" /> -->
              <el-select v-model='searchData.control' style="width:185px;">
                <el-option v-for="item in  formData.stateList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('tobacco.tsell.invoice.piweight')">
              <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.tareWeightbegin" style="width:90px;" />
              -
              <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.tareWeightend" style="width:90px;" />
            </el-form-item>
          </template>
          <el-form-item :label="$t('base.keywords')">
            <el-input v-bind:placeholder="$t('base.ipKeywords')" v-model="formData.pagination.keyword" style="width:185px;" />
          </el-form-item>

        </el-form>
      </div>
      <div class='toolButton' style="min-width: 210px">
        <el-button-group>
          <el-button type='primary' @click='onExpandClick'>{{ $t('base.buttonFilter') }}</el-button>
          <el-button type='primary' @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }}</el-button>
        </el-button-group>
      </div>
    </div>
    <main class='contentPanel'>
      <el-table highlight-current-row border @current-change="handleCurrentChange" :data="formData.invoiceList" style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column prop="annual" :label="this.$t('tobacco.tsell.invoice.annual')" />
        <el-table-column prop="serial" :label="this.$t('tobacco.tsell.invoice.serial')" width="100" show-overflow-tooltip />
        <!-- <el-table-column prop="number" :label="this.$t('tobacco.tsell.invoice.number')" width="100"
                          show-overflow-tooltip/>-->
        <el-table-column prop="arranged" :label="this.$t('tobacco.tsell.invoice.arranged')" width="100" show-overflow-tooltip />
        <!-- <el-table-column prop="title" :label="this.$t('tobacco.tsell.invoice.title')" width="100"
                          show-overflow-tooltip/>-->
        <!-- <el-table-column prop="author" :label="this.$t('tobacco.tsell.invoice.author')" width="100"
                          show-overflow-tooltip/>-->
        <el-table-column prop="date" :label="this.$t('tobacco.tsell.invoice.date')" width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            {{dateFormat(scope.row.date,'yyyy-mm-dd')}}
          </template>
        </el-table-column>
        <el-table-column prop="contractNumber" :label="this.$t('tobacco.tsell.invoice.contractNumber')" width="100" show-overflow-tooltip />
        <!-- <el-table-column prop="contractCard" :label="this.$t('tobacco.tsell.invoice.contractCard')" width="100"
                          show-overflow-tooltip/>-->
        <el-table-column prop="farmerName" :label="this.$t('tobacco.tsell.invoice.farmerName')" width="100" show-overflow-tooltip />
        <el-table-column prop="farmerIdentity" :label="this.$t('tobacco.tsell.invoice.farmerIdentity')" width="100" show-overflow-tooltip />
        <!--
                <el-table-column prop="year" :label="this.$t('tobacco.tsell.invoice.year')"/>
        -->
        <el-table-column prop="typeName" :label="this.$t('tobacco.tsell.invoice.typeName')" width="100" show-overflow-tooltip />
        <el-table-column fixed="left" prop="varietyName" :label="this.$t('tobacco.tsell.invoice.varietyName')" width="100" show-overflow-tooltip />
        <el-table-column fixed="left" prop="statusName" :label="this.$t('tobacco.tsell.invoice.statusName')" width="100" show-overflow-tooltip />
        <el-table-column fixed="left" prop="rankName" :label="this.$t('tobacco.tsell.invoice.rankName')" width="100" show-overflow-tooltip />
        <el-table-column fixed="left" prop="gradeName" :label="this.$t('tobacco.tsell.invoice.gradeName')" width="100" show-overflow-tooltip />
        <el-table-column prop="price" :label="this.$t('tobacco.tsell.invoice.price')" width="100" show-overflow-tooltip />
        <el-table-column prop="weight" fixed="left" :label="this.$t('tobacco.tsell.invoice.weight')" width="80" show-overflow-tooltip />
        <el-table-column prop="money" fixed="left" :label="this.$t('tobacco.tsell.invoice.money')" width="80" show-overflow-tooltip />
        <!-- <el-table-column prop="tax" :label="this.$t('tobacco.tsell.invoice.tax')"/>
         <el-table-column prop="allowance" :label="this.$t('tobacco.tsell.invoice.allowance')" width="100"
                          show-overflow-tooltip/>
         <el-table-column prop="total" :label="this.$t('tobacco.tsell.invoice.total')" width="100"
                          show-overflow-tooltip/>-->
        <el-table-column prop="tareWeight" :label="this.$t('tobacco.tsell.invoice.tareWeight')" width="100" show-overflow-tooltip />
        <!--<el-table-column prop="delivery" :label="this.$t('tobacco.tsell.invoice.delivery')" width="100"
                         show-overflow-tooltip/>-->
        <el-table-column prop="sorting" :label="this.$t('tobacco.tsell.invoice.sorting')" width="100" show-overflow-tooltip />
        <el-table-column prop="basketCard" :label="this.$t('tobacco.tsell.invoice.basketCard')" width="100" show-overflow-tooltip />
        <el-table-column prop="basketCode" :label="this.$t('tobacco.tsell.invoice.basketCode')" width="100" show-overflow-tooltip />
        <el-table-column prop="tag" :label="this.$t('tobacco.tsell.invoice.tag')" />
        <el-table-column prop="choiceName" :label="this.$t('tobacco.tsell.invoice.choiceName')" width="100" show-overflow-tooltip />
        <el-table-column prop="balanceName" :label="this.$t('tobacco.tsell.invoice.balanceName')" width="100" show-overflow-tooltip />
        <el-table-column prop="balanceNumber" :label="this.$t('tobacco.tsell.invoice.balanceNumber')" width="100" show-overflow-tooltip />
        <el-table-column prop="receiptNumber" :label="this.$t('tobacco.tsell.invoice.receiptNumber')" width="100" show-overflow-tooltip />
        <el-table-column prop="paymentNumber" :label="this.$t('tobacco.tsell.invoice.paymentNumber')" width="100" show-overflow-tooltip />
        <el-table-column prop="picture" :label="this.$t('tobacco.tsell.invoice.picture')" width="100" show-overflow-tooltip />
        <el-table-column prop="step" :label="this.$t('tobacco.tsell.invoice.step')" />
        <!--<el-table-column prop="control" :label="this.$t('tobacco.tsell.invoice.control')" />-->
        <el-table-column prop="generateMode.name" :label="this.$t('tobacco.tsell.invoice.generateMode')" width="100" show-overflow-tooltip />
        <el-table-column prop="desc" :label="this.$t('tobacco.tsell.invoice.desc')" width="100" show-overflow-tooltip />
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
        <add-form />
      </el-dialog>
      <el-dialog :title="$t('base.buttonEdit')" :visible.sync="childForm.editForm" top="10px" :before-close="handleClose">
        <edit-form :item.sync=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.editForm" @refresh="onSearchButtonClick" />
      </el-dialog>
      <el-dialog :title="$t('base.buttonView')" :visible.sync="childForm.viewForm" top="10px" :before-close="handleClose">
        <edit-form :item.sync=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.viewForm" />
      </el-dialog>
    </template>
  </div>
</template>
<script>
const AddForm = () => import('./invoiceAdd.vue');
const EditForm = () => import('./invoiceEdit.vue');
const OrganizationForm = () => import('@/components/Organization');
const areaSelect = () => import('../components/areaSelect');
const typeSelect = () => import('@/components/Tobacco/typeSelect');
const statusSelect = () => import('../components/statusSelect');
const rankSelect = () => import('../components/rankSelect');
const varietySelect = () => import('@/components/Tobacco/varietySelect');
const typeVarietySelect = () =>
  import('@/components/Tobacco/typeVarietySelect');
const typeGradeSelect = () => import('@/components/Tobacco/typeGradeSelect');
import categoryApi from '../../api/basic/api_category';
import invoiceApi from '../../api/tsell/api_invoice';

export default {
  data() {
    return {
      expand: false,
      expandIcon: 'el-icon-arrow-left',
      childForm: {
        isEdit: false,
        addForm: false,
        editForm: false,
        viewForm: false
      },
      searchData: {
        annual: this.dateFormat(new Date(), 'yyyy'),
        serial: '',
        number: '',
        arranged: '',
        title: '',
        author: '',
        date: '',
        contractNumber: '',
        contractCard: '',
        farmerName: '',
        farmerIdentity: '',
        year: '',
        areaList: [],
        areaId: '',
        areaName: '',
        typeList: [],
        typeId: '',
        typeName: '',
        varietyList: [],
        varietyId: '',
        varietyName: '',
        statusList: [],
        statusId: '',
        statusName: '',
        rankList: [],
        rankId: '',
        rankName: '',
        gradeList: [],
        gradeId: '',
        gradeCode: '',
        gradeName: '',
        price: '',
        weight: '',
        money: '',
        tax: '',
        allowance: '',
        total: '',
        tareWeight: '',
        tareWeightbegin: '',
        tareWeightend: '',
        delivery: '',
        sorting: '',
        basketCard: '',
        basketCode: '',
        tag: '',
        choiceId: '',
        choiceName: '',
        balanceId: '',
        balanceName: '',
        balanceNumber: '',
        receiptId: '',
        receiptNumber: '',
        paymentId: '',
        paymentNumber: '',
        picture: '',
        step: '',
        control: '',
        generateModeList: [],
        generateModeId: '',
        generateMode: '',
        desc: '',
        orgId: '',
        begindate: '',
        enddate: '',
        organization: ''
      },
      formData: {
        invoiceList: [],
        pagination: {
          //用于分页的变量
          currentPage: 1,
          pageSize: 10,
          total: 0,
          keyword: '',
          pageSizeOpts: [10, 15, 20, 25, 30]
        },
        rowSelection: [],
        stateList: [
          { id: 0, name: '全部' },
          { id: 1, name: '交售中' },
          { id: 3, name: '退烟' },
          { id: 5, name: '正常' },
          { id: 6, name: '冲红' }
        ]
      }
    };
  },
  created() {
    this.searchData.organizationId = this.userOrgId;
    this.onSearchButtonClick();
    Promise.all([categoryApi.getAll({ search: 'lead:EQ:SG_M' })])
      .then(([response]) => {
        this.searchData.generateModeList = response.content;
      })
      .catch(error => {});
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
    OrganizationForm,
    areaSelect,
    typeGradeSelect,
    typeSelect,
    varietySelect,
    typeVarietySelect,
    statusSelect,
    rankSelect
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
    handleCurrentChange(val) {
      this.formData.selectRow = val;
    },
    editButtonClick(selectRow, isEdit) {
      console.info(isEdit);
      this.formData.viewSelect = selectRow;
      console.info(selectRow);
      if (isEdit) {
        this.childForm.editForm = true;
      } else {
        this.childForm.viewForm = true;
      }
      this.childForm.isEdit = isEdit;
    },
    onSearchButtonClick() {
      if (this.searchData.annual === null) {
        this.searchData.annual = '';
      }
      Promise.all([
        invoiceApi.getAll({
          size: this.formData.pagination.pageSize,
          sort: 'serial,ASC',
          page: this.formData.pagination.currentPage - 1,
          contains: 'annual,serial,number,arranged,title,author,date,contractNumber,contractCard,farmerName,farmerIdentity,year,areaId,areaName,typeId,typeName,varietyId,varietyName,statusId,statusName,rankId,rankName,gradeId,gradeCode,gradeName,price,weight,money,tax,allowance,total,tareWeight,delivery,sorting,basketCard,basketCode,tag,choiceId,choiceName,balanceId,balanceName,balanceNumber,receiptId,receiptNumber,paymentId,paymentNumber,picture,step,control,desc,:{keyword}:true'.format(
            { keyword: this.formData.pagination.keyword }
          ),
          search: ' tareWeight:GT:{tareWeightbegin};tareWeight:LT:{tareWeightend};annual:EQ:{annual};serial:EQ:{serial};serial:EQ:{serial};number:EQ:{number};arranged:EQ:{arranged};title:EQ:{title};author:EQ:{author};date:EQ:{date};contractNumber:EQ:{contractNumber};contractCard:EQ:{contractCard};farmerName:EQ:{farmerName};farmerIdentity:EQ:{farmerIdentity};year:EQ:{year};areaId:EQ:{areaId};areaName:EQ:{areaName};typeId:EQ:{typeId};typeName:EQ:{typeName};varietyId:EQ:{varietyId};varietyName:EQ:{varietyName};statusId:EQ:{statusId};statusName:EQ:{statusName};rankId:EQ:{rankId};rankName:EQ:{rankName};gradeId:EQ:{gradeId};gradeCode:EQ:{gradeCode};gradeName:EQ:{gradeName};price:EQ:{price};weight:EQ:{weight};money:EQ:{money};tax:EQ:{tax};allowance:EQ:{allowance};total:EQ:{total};tareWeight:EQ:{tareWeight};delivery:EQ:{delivery};sorting:EQ:{sorting};basketCard:EQ:{basketCard};basketCode:EQ:{basketCode};tag:EQ:{tag};choiceId:EQ:{choiceId};choiceName:EQ:{choiceName};balanceId:EQ:{balanceId};balanceName:EQ:{balanceName};balanceNumber:EQ:{balanceNumber};receiptId:EQ:{receiptId};receiptNumber:EQ:{receiptNumber};paymentId:EQ:{paymentId};paymentNumber:EQ:{paymentNumber};picture:EQ:{picture};step:EQ:{step};control:EQ:{control};desc:EQ:{desc};'.format(
            {
              tareWeightbegin: this.searchData.tareWeightbegin,
              tareWeightend: this.searchData.tareWeightend,
              annual: this.searchData.annual,
              serial: this.searchData.serial,
              number: this.searchData.number,
              arranged: this.searchData.arranged,
              title: this.searchData.title,
              author: this.searchData.author,
              date: this.searchData.date,
              contractNumber: this.searchData.contractNumber,
              contractCard: this.searchData.contractCard,
              farmerName: this.searchData.farmerName,
              farmerIdentity: this.searchData.farmerIdentity,
              year: this.searchData.year,
              areaId: this.searchData.areaId,
              areaName: this.searchData.areaName,
              typeId: this.searchData.typeId,
              typeName: this.searchData.typeName,
              varietyId: this.searchData.varietyId,
              varietyName: this.searchData.varietyName,
              statusId: this.searchData.statusId,
              statusName: this.searchData.statusName,
              rankId: this.searchData.rankId,
              rankName: this.searchData.rankName,
              gradeId: this.searchData.gradeId,
              gradeCode: this.searchData.gradeCode,
              gradeName: this.searchData.gradeName,
              price: this.searchData.price,
              weight: this.searchData.weight,
              money: this.searchData.money,
              tax: this.searchData.tax,
              allowance: this.searchData.allowance,
              total: this.searchData.total,
              tareWeight: this.searchData.tareWeight,
              delivery: this.searchData.delivery,
              sorting: this.searchData.sorting,
              basketCard: this.searchData.basketCard,
              basketCode: this.searchData.basketCode,
              tag: this.searchData.tag,
              choiceId: this.searchData.choiceId,
              choiceName: this.searchData.choiceName,
              balanceId: this.searchData.balanceId,
              balanceName: this.searchData.balanceName,
              balanceNumber: this.searchData.balanceNumber,
              receiptId: this.searchData.receiptId,
              receiptNumber: this.searchData.receiptNumber,
              paymentId: this.searchData.paymentId,
              paymentNumber: this.searchData.paymentNumber,
              picture: this.searchData.picture,
              step: this.searchData.step,
              control: this.searchData.control,
              desc: this.searchData.desc
            }
          )
        })
      ])
        .then(([response]) => {
          this.formData.invoiceList = response.content;
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
