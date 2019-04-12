<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-form-item :label="$t('tobacco.thuman.hrEmployee.organization')">
            <organization-form :root="userOrgId" @onchange="organizationOnchange" style="width:185px;" />
          </el-form-item>
          <el-form-item :label="$t('base.keywords')">
            <el-input v-bind:placeholder="$t('base.ipKeywords')" v-model="formData.pagination.keyword" @keyup.enter.native="onSearchButtonClick" style="width:185px;" />
          </el-form-item>
          <template v-if='expand'>
            <!-- 年度 -->
            <el-form-item :label="$t('tobacco.tsell.seContract.annual')">
              <el-date-picker value-format="yyyy" v-model="searchData.annual" type="year" placeholder="选择年" style="width:185px;">
              </el-date-picker>
            </el-form-item>
            <!-- 价区 -->
            <el-form-item :label="$t('tobacco.tsell.seContract.tareaName')">
              <el-select v-model='searchData.tareaId' filterable clearable style="width:185px;">
                <el-option v-for="item in  selectData.tareaList" :key="item.areaId" :label="item.name" :value="item.areaId">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- 烟叶类型 -->
            <el-form-item :label="$t('tobacco.tsell.seContract.typeName')">
              <type-select :value.sync="searchData.ttypeId" style="width:185px;" />
            </el-form-item>
            <!-- 所属地区-->
            <el-form-item :label="$t('tobacco.tsell.seContract.districtName')">
              <organization-form root="51" @onchange="directiveOnchange" model="district" style="width:185px;" />
            </el-form-item>
            <!-- 合同类型 -->
            <el-form-item :label="$t('tobacco.tsell.seContract.sign')">
              <el-select clearable v-model='searchData.signId' style="width:185px;">
                <el-option v-for="item in  selectData.signList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <!--计划类型-->
            <el-form-item :label="$t('tobacco.tsell.seContract.plan')">
              <el-select clearable v-model='searchData.planId' style="width:185px;">
                <el-option v-for="item in  selectData.planList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- 支付类型 -->
            <el-form-item :label="$t('tobacco.tsell.seContract.pay')">
              <el-select clearable v-model='searchData.payId' style="width:185px;">
                <el-option v-for="item in  selectData.payList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- 合同状态 -->
            <el-form-item :label="$t('tobacco.tsell.seContract.control')">
              <el-select clearable v-model='searchData.statusId' style="width:185px;">
                <el-option v-for="item in  selectData.statuslist" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </template>
        </el-form>
      </div>
      <div class='toolButton' style="min-width: 450px;">
        <el-button-group>
          <el-button type='primary' @click='onExpandClick'>{{ $t('base.buttonFilter') }} </el-button>
          <el-button type='primary' @click='onSearchButtonClick' style="width:53px">{{ $t('base.buttonSearch') }}</el-button>
          <el-button type='primary' @click='childForm.addForm=true' style="width:54px">{{ $t('base.buttonAdd') }}</el-button>
          <el-button type='danger' @click='deleteButtonConfirm' style="width:53px">{{ $t('base.buttonDelete') }}</el-button>
          <el-dropdown>
              <el-button type="primary">
                更多操作
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                   <el-button type='primary ' @click="childForm.importContractForm=true" style="width:90px;">{{ $t('tobacco.tsell.seContract.importMany') }}</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                   <el-button type='primary' @click="clickSelectAll" style="width:90px;">{{ $t('tobacco.tsell.seContract.selectAll') }}</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button type='primary' @click="clickAll" style="width:90px;">{{ $t('tobacco.tsell.seContract.confirmAll') }}</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>


        </el-button-group>
      </div>
    </div>
    <main class='contentPanel'>
      <el-table highlight-current-row border @selection-change="handleSelectionChange" @current-change="handleCurrentChange" :data="formData.seContractList" style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column  type="selection" width="55" fixed="left" show-overflow-tooltip/>
        <el-table-column type="index" fixed show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="annual" :label="this.$t('tobacco.tsell.seContract.annual')" width="50" fixed show-overflow-tooltip/>
        <el-table-column prop="number" :label="this.$t('tobacco.tsell.seContract.number')" width="160" fixed show-overflow-tooltip/>
        <el-table-column prop="date" :label="this.$t('tobacco.tsell.seContract.date')" width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ formatDate(scope.row.date)}}
          </template>
        </el-table-column>
        <el-table-column prop="author" :label="this.$t('tobacco.tsell.seContract.author')" />
        <el-table-column prop="organization.districtName" :label="this.$t('tobacco.tsell.seContract.districtName')" width="200" show-overflow-tooltip/>
        <el-table-column prop="sellTimes" :label="this.$t('tobacco.tsell.seContract.sellTimes')" width="100" show-overflow-tooltip/>
        <el-table-column prop="farmerName" :label="this.$t('tobacco.tsell.seContract.farmerName')" show-overflow-tooltip />
        <el-table-column prop="farmerIdentity" :label="this.$t('tobacco.tsell.seContract.farmerIdentity')" width="170" show-overflow-tooltip/>
        <el-table-column prop="relativeIdentity" :label="this.$t('tobacco.tsell.seContract.backupIdentity')" width="170" show-overflow-tooltip/>
        <el-table-column prop="farmerPhone" :label="this.$t('tobacco.tsell.seContract.farmerPhone')" width="120" show-overflow-tooltip/>
        <el-table-column prop="farmerAddress" :label="this.$t('tobacco.tsell.seContract.farmerAddress')" width="100" show-overflow-tooltip/>
        <el-table-column prop="bankName" :label="this.$t('tobacco.tsell.seContract.bankName')" width="130" show-overflow-tooltip/>
        <el-table-column prop="bankAccount" :label="this.$t('tobacco.tsell.seContract.bankAccount')" width="170" show-overflow-tooltip/>
        <el-table-column prop="backupBankAccount" :label="this.$t('tobacco.tsell.seContract.backupBankAccount')" width="170" show-overflow-tooltip/>
        <el-table-column prop="typeName" :label="this.$t('tobacco.tsell.seContract.typeName')" show-overflow-tooltip/>
        <el-table-column prop="areaName" :label="this.$t('tobacco.tsell.seContract.tareaName')" show-overflow-tooltip/>
        <el-table-column prop="signArea" :label="this.$t('tobacco.tsell.seContract.signArea')" show-overflow-tooltip/>
        <el-table-column prop="signPlant" :label="this.$t('tobacco.tsell.seContract.signPlant')" show-overflow-tooltip/>
        <el-table-column prop="signWeight" :label="this.$t('tobacco.tsell.seContract.signWeight')" show-overflow-tooltip/>
        <el-table-column prop="subsidy" :label="this.$t('tobacco.tsell.seContract.subsidy')" show-overflow-tooltip/>
        <el-table-column prop="debit" :label="this.$t('tobacco.tsell.seContract.debit')" show-overflow-tooltip/>
        <el-table-column prop="sign.name" :label="this.$t('tobacco.tsell.seContract.sign')" show-overflow-tooltip/>
        <el-table-column prop="plan.name" :label="this.$t('tobacco.tsell.seContract.plan')" show-overflow-tooltip/>
        <el-table-column prop="pay.name" :label="this.$t('tobacco.tsell.seContract.pay')" show-overflow-tooltip/>
        <el-table-column prop="card" :label="this.$t('tobacco.tsell.seContract.card')" show-overflow-tooltip/>
        <el-table-column prop="control.name" :label="this.$t('tobacco.tsell.seContract.control')" show-overflow-tooltip/>
        <el-table-column prop="technicianName" :label="this.$t('tobacco.tsell.seContract.technicianName')" show-overflow-tooltip/>
        <el-table-column prop="desc" :label="this.$t('tobacco.tsell.seContract.desc')" width="150" show-overflow-tooltip/>
        <el-table-column fixed="right" :label="$t('base.titleOperation')" width="100" show-overflow-tooltip>
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
      <el-dialog width="80%" :title="$t('base.buttonAdd')" :visible.sync="childForm.addForm" top="10px" style="text-align:center" :before-close="handleClose">
        <add-form/>
      </el-dialog>
      <el-dialog width="80%" :title="$t('base.buttonEdit')" :visible.sync="childForm.editForm" top="10px" style="text-align:center" :before-close="handleClose">
        <edit-form :item.sync=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.editForm" @refresh="onSearchButtonClick"
        />
      </el-dialog>
      <el-dialog width="80%" :title="$t('base.buttonView')" :visible.sync="childForm.viewForm" top="10px" style="text-align:center" :before-close="handleClose">
        <edit-form :item=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.viewForm" />
      </el-dialog>
      <el-dialog :title="$t('tobacco.tsell.seContract.importMany')" :visible.sync="childForm.importContractForm" top="10px">
        <import-contract :visible.sync="childForm.importContractForm" />
      </el-dialog>
    </template>
  </div>
</template>
<script>
const AddForm = () => import('./seContractAdd.vue');
const EditForm = () => import('./seContractEdit.vue');
const typeSelect = () => import('@/components/Tobacco/typeSelect');
const OrganizationForm = () => import('@/components/Organization');
import seContractApi from '../../api/tsell/api_seContract';
import tareaApi from '@/api/tobacco/apiArea';
import categoryApi from '../../api/basic/api_category';
import dateFormat from 'dateformat';
// 导出变量
export default {
  data() {
    return {
      expand: false,
      expandIcon: 'el-icon-arrow-left',
      childForm: {
        addForm: false,
        editForm: false,
        viewForm: false,
        isEdit: false,
        importContractForm: false
      },
      selectionData: {
        rows: []
      },
      // 日期过滤格式
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
      selectData: {
        signList: [],
        tareaList: [],
        payList: [],
        planList: [],
        statuslist: []
      },
      searchData: {
        annual: '',
        statusId: '',
        planId: '',
        ttypeId: '',
        orgId: this.$store.state.user.organization.organizationId,
        districtId: '',
        signId: '',
        tareaId: '',
        payId: ''
      },
      formData: {
        seContractList: [],
        pagination: {
          //用于分页的变量
          currentPage: 1,
          pageSize: 10,
          total: 0,
          keyword: '',
          pageSizeOpts: [10, 15, 20, 25, 30, 500]
        },
        rowSelection: []
      }
    };
  },
  // 获取页面初始化的数据
  created() {
    this.onSearchButtonClick();
    Promise.all([
      tareaApi.getAll(),
      categoryApi.getAll({ search: 'lead:EQ:SG_S' }),
      categoryApi.getAll({ search: 'lead:EQ:SG_C' }),
      categoryApi.getAll({ search: 'lead:EQ:SG_P' }),
      categoryApi.getAll({ search: 'lead:EQ:SC_ST' })
    ])
      .then(([trea, cont, cont2, cont3, status]) => {
        this.selectData.tareaList = trea.content;
        this.selectData.signList = cont.content;
        this.selectData.planList = cont2.content;
        this.selectData.payList = cont3.content;
        this.selectData.statuslist = status.content;
      })
      .catch(error => {});
    if (!(this.userOrgId === undefined)) {
      this.searchData.orgId = this.userOrgId;
    }
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
  // 组件
  components: {
    'add-form': AddForm,
    'edit-form': EditForm,
    typeSelect,
    OrganizationForm,
    'import-contract': () => import('./importContract.vue')
  },
  //参数传递
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
    formatDate(date) {
      if (date === '' || date === undefined || date === null) {
        return '未设置';
      }
      return dateFormat(date, 'yyyy-mm-dd');
    },
    directiveOnchange(label, value, values) {
      this.searchData.districtId = value;
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

      Promise.all([seContractApi.deleteSeContract(this.formData.selectRow.id)])
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
        seContractApi.getAll({
          size: this.formData.pagination.pageSize,
          sort: 'id,ASC',
          page: this.formData.pagination.currentPage - 1,
          contains: 'number,title,author,date,farmerName,farmerIdentity,farmerPhone,farmerAddress,bankName,bankAccount,areaName,typeName,year,signArea,signPlant,signWeight,subsidy,sellWeight,sellPrice,sellMoney,technicianName:{keyword}:true'.format(
            { keyword: this.formData.pagination.keyword }
          ),
          search: 'organization.organizationId:rlike:{orgId};organization.districtId:rlike:{districtId};annual:EQ:{annual};areaId:EQ:{tareaId};typeId:EQ:{ttypeId};sign.id:EQ:{sign};plan.id:EQ:{plan};pay.id:EQ:{pay};control.id:EQ:{control};'.format(
            {
              districtId: this.searchData.districtId,
              annual: this.searchData.annual,
              tareaId: this.searchData.tareaId,
              ttypeId: this.searchData.ttypeId,
              sign: this.searchData.signId,
              plan: this.searchData.planId,
              pay: this.searchData.payId,
              control: this.searchData.statusId,
              orgId: this.searchData.orgId
            }
          )
        })
      ])
        .then(([response]) => {
          this.formData.seContractList = response.content;
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
    handleSelectionChange(val) {
      this.selectionData.rows = [];
      var list = [];
      for (var x in val) {
        list.push(val[x].id);
      }
      this.selectionData.rows = list;
    },
    clickAll() {
      this.$confirm(
        this.$t('此操作将更新所有非废除合同状态为正式，是否继续操作'),
        this.$t('base.titleTip'),
        {
          confirmButtonText: this.$t('base.buttonOk'),
          cancelButtonText: this.$t('base.buttonCancel'),
          type: 'warning'
        }
      )
        .then(() => {
          Promise.all([
            seContractApi.updateControl(0, [0], this.searchData.orgId)
          ])
            .then(([response]) => {
              this.$message({
                type: 'info',
                message: this.$t('更新成功')
              });
              this.selectionData.rows = [];
              this.onSearchButtonClick();
            })
            .catch(error => {});
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('message.cancel')
          });
        });
    },
    clickSelectAll() {
      if (this.selectionData.rows.length === 0) {
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
      } else {
        this.$confirm(
          this.$t('此操作将更新所选非废除合同状态为正式，是否继续操作'),
          this.$t('base.titleTip'),
          {
            confirmButtonText: this.$t('base.buttonOk'),
            cancelButtonText: this.$t('base.buttonCancel'),
            type: 'warning'
          }
        )
          .then(() => {
            Promise.all([
              seContractApi.updateControl(
                1,
                this.selectionData.rows,
                this.searchData.orgId
              )
            ])
              .then(([response]) => {
                this.$message({
                  type: 'info',
                  message: this.$t('更新成功')
                });
                this.selectionData.rows = [];
                this.onSearchButtonClick();
              })
              .catch(error => {});
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: this.$t('message.cancel')
            });
          });
      }
    }
  }
};
</script>
