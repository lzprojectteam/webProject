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
            <el-input v-bind:placeholder="$t('base.ipKeywords')"
                      v-model="formData.pagination.keyword" @keyup.enter.native="onSearchButtonClick"/>
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
      <el-table
        highlight-current-row
        border
        @current-change="handleCurrentChange"
        :data="formData.fertilityList"
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column prop="organization.organizationName" :label="this.$t('org.organizationName')" width="100"
                         show-overflow-tooltip/>
        <!-- <el-table-column prop="contractId" :label="this.$t('tobacco.tsell.fertility.contractId')" width="170"
                          show-overflow-tooltip/>-->
        <el-table-column prop="contractNumber" :label="this.$t('tobacco.tsell.fertility.contractNumber')" width="170"
                         show-overflow-tooltip/>
        <el-table-column prop="contractName" :label="this.$t('tobacco.tsell.fertility.contractName')" width="100"
                         show-overflow-tooltip fixed/>
        <el-table-column prop="farmerPhone" :label="this.$t('tobacco.tsell.fertility.farmerPhone')" width="150"
                         show-overflow-tooltip/>
        <el-table-column prop="farmerAddress" :label="this.$t('tobacco.tsell.fertility.farmerAddress')" width="200"
                         show-overflow-tooltip/>
        <el-table-column prop="bankNo" :label="this.$t('tobacco.tsell.fertility.bankNo')" width="200"
                         show-overflow-tooltip/>
        <el-table-column prop="farmerIdentity" label="身份证号" width="200"
                         show-overflow-tooltip/>
        <el-table-column prop="weight" :label="this.$t('tobacco.tsell.fertility.weight')" width="100"
                         show-overflow-tooltip fixed/>
        <el-table-column prop="restWeight" :label="this.$t('tobacco.tsell.fertility.restWeight')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="date" :label="this.$t('tobacco.tsell.fertility.date')" width="170"
                         show-overflow-tooltip/>
        <el-table-column prop="annual" :label="this.$t('tobacco.tsell.fertility.annual')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="author" :label="this.$t('tobacco.tsell.fertility.author')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="control.name" :label="this.$t('tobacco.tstorage.transport.control')" width="100"
                         show-overflow-tooltip/>
        <el-table-column
          fixed="right"
          :label="$t('base.titleOperation')"
          width="150">
          <template slot-scope="scope">
            <el-button @click="editButtonClick(scope.row,false)" type="text" size="small"
            >{{$t('base.buttonView')}}
            </el-button>
            <el-button type="text" size="small" @click="editButtonClick(scope.row,true)"
                       :disabled="checkEdit(scope.row)">{{$t('base.buttonEdit')}}
            </el-button>
            <el-button type="text" size="small" @click="reviewConfirm(scope.row)"
                       :disabled="checkReview(scope.row.control)">{{$t('base.buttonReview')}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </main>
    <div class='footerPanel'>
      <el-pagination :page-size='formData.pagination.pageSize' :total='formData.pagination.total'
                     :current-page='formData.pagination.currentPage' @current-change='onPageChange'
                     :page-sizes='formData.pagination.pageSizeOpts' @size-change='onPageSizeChange'
                     layout="total, sizes, prev, pager, next, jumper"
                     placement='top'></el-pagination>
    </div>
    <template>
      <el-dialog :title="$t('base.buttonAdd')" :visible.sync="childForm.addForm" top="10px" :before-close="handleClose"
                 width="60%">
        <add-form/>
      </el-dialog>
      <el-dialog :title="$t('base.buttonEdit')" :visible.sync="childForm.editForm" top="10px"
                 :before-close="handleClose" width="60%">
        <edit-form :item.sync=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.editForm"
                   @refresh="onSearchButtonClick"
        />
      </el-dialog>
      <el-dialog :title="$t('base.buttonView')" :visible.sync="childForm.viewForm" top="10px"
                 :before-close="handleClose" width="60%">
        <edit-form :item=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.viewForm"/>
      </el-dialog>
    </template>
  </div>
</template>
<script>
  const AddForm = () => import('./fertilityAdd.vue');
  const EditForm = () => import('./fertilityEdit.vue');
  const OrganizationForm = () => import('@/components/Organization');
  import fertilityApi from '../../api/tsell/api_fertility';

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
          'organizationId': this.$store.state.user.organization.organizationId,
        },
        formData: {
          fertilityList: [],
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
      this.onSearchButtonClick();
    },
    components: {
      'add-form': AddForm,
      'edit-form': EditForm,
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
      //判断能否编辑
      checkEdit(row) {
        if (row.control === '' || row.control === null) {
          return false;
        } else if (row.control.id === 'SG_CF01') {
          return false;
        } else {
          return true;
        }
      },
      // 判断是否能审核
      checkReview(item) {
        if (item === '' || item === null) {
          return true;
        } else if (item.id !== 'SG_CF05') {
          return false;
        } else {
          return true;
        }
      },
      //审核确认
      reviewConfirm(row) {
        this.$confirm('审核后将不可编辑，是否继续？', this.$t('base.titleTip'), {
          confirmButtonText: this.$t('base.buttonOk'),
          cancelButtonText: this.$t('base.buttonCancel'),
          type: 'warning'
        }).then(() => {
          this.reviewButtonClick(row);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('message.cancel')
          });
        });
      },
      //审核
      reviewButtonClick(row) {
        Promise.all([fertilityApi.approval(row.id)])
          .then(([response]) => {
            this.$message({
              message: '审核成功',
              type: 'info',
            });
            this.onSearchButtonClick();
          })
          .catch(error => {
            this.$message({
              message: error,
              type: 'info',
            });
          });
      },
      organizationOnchange(label, value, values) {
        this.searchData.organizationId = value;
        this.searchData.organizationCode = value;
        this.searchData.organizationName = label;
        this.searchData.organizationOrder = '0';
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
        if (this.formData.selectRow === null || this.formData.selectRow === undefined) {
          this.$message({
            message: this.$t('message.unSelectAny'),
            type: 'info',
          });
          return;
        }

        Promise.all([fertilityApi.deleteFertility(this.formData.selectRow.id)])
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
        Promise.all([fertilityApi.getAll({
          size: this.formData.pagination.pageSize,
          sort: 'contractName,ASC',
          page: this.formData.pagination.currentPage - 1,
          contains: ':{keyword}:true'.format({keyword: this.formData.pagination.keyword}),
          search: 'organization.organizationId:rlike:{orgid};'.format({
            orgid: this.searchData.organizationId,
          })
        })])
          .then(([response]) => {
            this.formData.fertilityList = response.content;
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
