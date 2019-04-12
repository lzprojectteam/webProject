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
          <el-form-item :label="$t('base.keywords')">
            <el-input v-bind:placeholder="$t('base.ipKeywords')" v-model="formData.pagination.keyword"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
        </el-form>
      </div>
      <div class='toolButton' style="min-width: 210px">
        <el-button-group>
          <el-button type='primary' @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }}</el-button>
          <el-button type='primary' @click='childForm.addForm=true'>{{ $t('base.buttonAdd') }}</el-button>
          <el-button type='primary' @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }}</el-button>
        </el-button-group>
      </div>
    </div>
    <main class='contentPanel'>
      <el-table highlight-current-row border @current-change="handleCurrentChange" :data="formData.inventoryLossList"
                style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="organization.organizationName" :label="this.$t('org.organizationName')" width="150"
                         show-overflow-tooltip/>

        <el-table-column prop="annual" :label="this.$t('tobacco.tsell.inventoryLoss.annual')"/>
        <el-table-column prop="serial" :label="this.$t('tobacco.tsell.inventoryLoss.serial')"/>
        <el-table-column prop="title" :label="this.$t('tobacco.tsell.inventoryLoss.title')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="author" :label="this.$t('tobacco.tsell.inventoryLoss.author')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="date" :label="this.$t('tobacco.tsell.inventoryLoss.date')" width="100"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            {{dateFormat(scope.row.date,'yyyy-mm-dd')}}
          </template>
        </el-table-column>
        <el-table-column prop="tyear" :label="this.$t('tobacco.tsell.inventoryLoss.tyear')"/>
        <el-table-column prop="areaName" :label="this.$t('tobacco.tsell.inventoryLoss.areaName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="typeName" :label="this.$t('tobacco.tsell.inventoryLoss.typeName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="varietyName" :label="this.$t('tobacco.tsell.inventoryLoss.varietyName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="statusName" :label="this.$t('tobacco.tsell.inventoryLoss.statusName')"/>
        <el-table-column prop="rankName" :label="this.$t('tobacco.tsell.inventoryLoss.rankName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="gradeName" :label="this.$t('tobacco.tsell.inventoryLoss.gradeName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="price" :label="this.$t('tobacco.tsell.inventoryLoss.price')"/>
        <el-table-column prop="weight" :label="this.$t('tobacco.tsell.inventoryLoss.weight')"/>
        <el-table-column prop="money" :label="this.$t('tobacco.tsell.inventoryLoss.money')"/>
        <!-- <el-table-column prop="receiptNumber" :label="this.$t('tobacco.tsell.inventoryLoss.receiptNumber')" width="100"
                          show-overflow-tooltip/>
         <el-table-column prop="paymentNumber" :label="this.$t('tobacco.tsell.inventoryLoss.paymentNumber')" width="100"
                          show-overflow-tooltip/>-->
        <el-table-column prop="control" :label="this.$t('tobacco.tsell.inventoryLoss.control')"/>
        <el-table-column prop="desc" :label="this.$t('tobacco.tsell.inventoryLoss.desc')" width="100"
                         show-overflow-tooltip/>
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
      <el-pagination :page-size='formData.pagination.pageSize' :total='formData.pagination.total'
                     :current-page='formData.pagination.currentPage' @current-change='onPageChange'
                     :page-sizes='formData.pagination.pageSizeOpts' @size-change='onPageSizeChange'
                     layout="total, sizes, prev, pager, next, jumper" placement='top'></el-pagination>
    </div>
    <template>
      <el-dialog :title="$t('base.buttonAdd')" :visible.sync="childForm.addForm" top="10px" :before-close="handleClose"
                 width="65%">
        <add-form/>
      </el-dialog>
      <el-dialog :title="$t('base.buttonEdit')" :visible.sync="childForm.editForm" top="10px"
                 :before-close="handleClose" width="65%">
        <edit-form :item.sync=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.editForm"
                   @refresh="onSearchButtonClick"
        />
      </el-dialog>
      <el-dialog :title="$t('base.buttonView')" :visible.sync="childForm.viewForm" top="10px"
                 :before-close="handleClose" width="65%">
        <edit-form :item=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.viewForm"/>
      </el-dialog>
    </template>
  </div>
</template>
<script>
  const AddForm = () => import('./inventoryLossAdd.vue');
  const EditForm = () => import('./inventoryLossEdit.vue');
  const OrganizationForm = () => import('@/components/Organization');

  import inventoryLossApi from '../../api/tsell/api_inventoryLoss';

  export default {
    data() {
      return {
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
        searchData: {
          'annual': '',
          'serial': '',
          'title': '',
          'author': '',
          'date': '',
          'countryId': '',
          'countryName': '',
          'tyear': '',
          'areaId': '',
          'areaName': '',
          'typeId': '',
          'typeName': '',
          'varietyId': '',
          'varietyName': '',
          'statusId': '',
          'statusName': '',
          'rankId': '',
          'rankName': '',
          'gradeId': '',
          'gradeCode': '',
          'gradeName': '',
          'price': '',
          'weight': '',
          'money': '',
          'receiptId': '',
          'receiptNumber': '',
          'paymentId': '',
          'paymentNumber': '',
          'control': '',
          'desc': '',
          'organizationId': this.$store.state.user.organization.organizationId.slice(0, 4),
          'orgId': '',
        },
        formData: {
          inventoryLossList: [],
          pagination: {//用于分页的变量
            currentPage: 1,
            pageSize: 10,
            total: 0,
            keyword: '',
            pageSizeOpts: [10, 15, 20, 25, 30]
          },
          rowSelection: []
        },
      };
    },
    created() {
      if (!(this.userOrgId === undefined)) {
        this.searchData.orgId = this.userOrgId;
      }
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
      OrganizationForm
    },
    methods: {
      organizationOnchange(label, value, values) {
        this.searchData.orgId = value;
      },
      editButtonClick(selectRow, isEdit) {
        console.info(isEdit);
        this.formData.viewSelect = selectRow;
        if (isEdit) {
          this.childForm.editForm = true;
        } else {
          this.childForm.viewForm = true;
        }
        this.childForm.isEdit = isEdit;
      },
      deleteButtonClick() {
        if (this.formData.selectRow === null || this.formData.selectRow === undefined) {
          this.$message({
            message: this.$t('message.unSelectAny'),
            type: 'info',
          });
          return;
        }

        Promise.all([inventoryLossApi.deleteInventoryLoss(this.formData.selectRow.id)])
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
        this.$confirm(this.$t('message.deleteConfirm'), this.$t('base.titleTip'), {
          confirmButtonText: this.$t('base.buttonOk'),
          cancelButtonText: this.$t('base.buttonCancel'),
          type: 'warning'
        }).then(() => {
          this.deleteButtonClick();
        }).catch(() => {
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
        Promise.all([inventoryLossApi.getAll({
          size: this.formData.pagination.pageSize,
          sort: 'id,ASC',
          page: this.formData.pagination.currentPage - 1,
          contains: 'annual,serial,title,author,countryName,tyear,areaName,typeName,varietyName,statusName,rankName,gradeName,price,weight,money,receiptNumber,paymentNumber,control,desc,:{keyword}:true'.format({keyword: this.formData.pagination.keyword}),
          search: 'organization.organizationId:rlike:{orgid};'.format({
            orgid: this.searchData.orgId
          })
        })])
          .then(([response]) => {
            this.formData.inventoryLossList = response.content;
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
        console.info(333);
        this.childForm.addForm = false;
        this.childForm.editForm = false;
        this.onSearchButtonClick();
        done();
      }
    }
  };
</script>
