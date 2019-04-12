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
          <el-form-item :label="$t('tobacco.tstorage.operation.balance')" prop="balance">
            <el-select v-model="searchData.balance" style="width: 100%" @change="handleBanceChange" clearable>
              <el-option v-for="(val,key) in formData.inOutTypeList"
                         :key="key" :value="key" :label="val"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('base.keywords')">
            <el-input v-bind:placeholder="$t('base.ipKeywords')"
                      v-model="formData.pagination.keyword" @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
        </el-form>
      </div>
      <div class='toolButton' style="min-width: 310px">
        <el-button-group>
          <el-button type='primary' @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }}</el-button>
          <el-button type='primary' @click='addProcessDetail'>收发管理</el-button>
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
        :data="formData.operationList"
        @expand-change="showFromTo"
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-row>
              <el-col :span="12">
                <el-table
                  highlight-current-row
                  border
                  @current-change="threeHandleCurrentChange"
                  :data="props.row.operationFromToList"
                  style="width: 100%"
                  :row-class-name="tableRowClassName">
                  <el-table-column prop="organization.organizationName"
                                   :label="$t('tobacco.tstorage.operationFromTo.organizationName')" min-width="150"
                                   show-overflow-tooltip/>
                  <el-table-column prop="warehouseName" :label="$t('tobacco.tstorage.operationFromTo.warehouseName')"
                                   min-width="150"
                                   show-overflow-tooltip/>
                  <el-table-column prop="threeOrganizationName"
                                   :label="$t('tobacco.tstorage.operationFromTo.threeOrganizationName')"
                                   min-width="150"
                                   show-overflow-tooltip/>
                  <el-table-column prop="threeWarehouseName"
                                   :label="$t('tobacco.tstorage.operationFromTo.threeWarehouseName')" min-width="150"
                                   show-overflow-tooltip/>
                  <el-table-column prop="desc" :label="$t('tobacco.tstorage.operationFromTo.desc')" min-width="150"
                                   show-overflow-tooltip/>
                  <el-table-column
                    fixed="right"
                    :label="$t('base.titleOperation')"
                    width="50">
                    <template slot-scope="scope">
                      <el-button type="text" size="small" @click='threeDeleteButtonConfirm(props.row,scope.row)'>{{
                        $t('base.buttonDelete')
                        }}
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="organization.organizationName" :label="$t('org.organizationName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="relationId" :label="$t('tobacco.tstorage.operation.relationId')" width="80"
                         show-overflow-tooltip/>
        <!--
                <el-table-column prop="lead" :label="$t('tobacco.tstorage.operation.lead')" width="100"
                                 show-overflow-tooltip/>
        -->
        <el-table-column prop="leaf" :label="$t('tobacco.tstorage.operation.leaf')" width="100"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <el-switch v-model="scope.row.leaf" disabled></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="prefix" :label="$t('tobacco.tstorage.operation.prefix')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="alias" :label="$t('tobacco.tstorage.operation.alias')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="name" :label="$t('tobacco.tstorage.operation.name')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="title" :label="$t('tobacco.tstorage.operation.title')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="balance" :label="$t('tobacco.tstorage.operation.balance')" width="100"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            {{formData.inOutTypeList[scope.row.balance]}}
          </template>
        </el-table-column>
        <el-table-column :label="$t('tobacco.tstorage.operation.immediate')" width="100"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <el-switch v-model="scope.row.immediate" disabled/>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tobacco.tstorage.operation.checking')" width="100"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <el-switch v-model="scope.row.checking" disabled/>
          </template>
        </el-table-column>
        <el-table-column label="是否复检" width="100"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <el-switch v-model="scope.row.reChecking" disabled/>
          </template>
        </el-table-column>
        <el-table-column prop="entry" :label="$t('tobacco.tstorage.operation.entry')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="print" :label="$t('tobacco.tstorage.operation.print')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="visible" :label="$t('tobacco.tstorage.operation.visible')" width="100"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <el-switch v-model="scope.row.visible" disabled></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="position" :label="$t('tobacco.tstorage.operation.position')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="constraint" :label="this.$t('tobacco.tstorage.operation.constraint')" width="100"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <el-switch v-model="scope.row.constraint" disabled></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="desc" :label="this.$t('tobacco.tstorage.operation.desc')" width="100"
                         show-overflow-tooltip/>
        <el-table-column
          fixed="right"
          :label="$t('base.titleOperation')"
          width="160">
          <template slot-scope="scope">
            <el-button @click="editButtonClick(scope.row,false)" type="text" size="small">{{$t('base.buttonView')}}
            </el-button>
            <el-button type="text" size="small" @click="editButtonClick(scope.row,true)">{{$t('base.buttonEdit')}}
            </el-button>
            <el-button type="text" size="small" @click="addMenuButtonClick(scope.row,true)">添加菜单
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
                 width="80%">
        <add-form/>
      </el-dialog>
      <el-dialog title="收发管理" :visible.sync="childForm.detailForm" top="10px" :before-close="handleClose">
        <add-detail-form :item.sync=formData.viewSelect :visible.sync="childForm.detailForm"/>
      </el-dialog>
      <el-dialog title="添加菜单" :visible.sync="childForm.menuForm" top="10px" :before-close="handleClose">
        <menu-form :item.sync=formData.viewSelect :visible.sync="childForm.menuForm"/>
      </el-dialog>
      <el-dialog :title="$t('base.buttonEdit')" :visible.sync="childForm.editForm" top="10px"
                 :before-close="handleClose" width="80%">
        <edit-form :item.sync=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.editForm"
                   @refresh="onSearchButtonClick"
        />
      </el-dialog>
      <el-dialog :title="$t('base.buttonView')" :visible.sync="childForm.viewForm" top="10px"
                 :before-close="handleClose" width="80%">
        <edit-form :item=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.viewForm"/>
      </el-dialog>
    </template>
  </div>
</template>
<script>
  const AddForm = () => import('./operationAdd.vue');
  const EditForm = () => import('./operationEdit.vue');
  const AddDetailForm = () => import('./operationFromToAdd.vue');
  const AddMenuForm = () => import('./operationMenuAdd.vue');
  const OrganizationForm = () => import('@/components/Organization');

  import operationApi from '../../api/tstorage/api_operation';
  import operationFromToApi from '../../api/tstorage/api_operationFromTo';

  export default {
    data() {
      return {
        childForm: {
          addForm: false,
          editForm: false,
          viewForm: false,
          isEdit: false,
          detailForm: false,
          menuForm: false,
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
          'lead': '',
          'leaf': true,
          'prefix': '',
          'alias': '',
          'name': '',
          'title': '',
          'balance': '',
          'immediate': true,
          'checking': true,
          'entry': '',
          'print': '',
          'visible': true,
          'position': 0,
          'desc': '',
          'organizationId': this.$store.state.user.organization.organizationId,
        },
        formData: {
          inOutTypeList: {'-1': '出库', '1': '入库'},
          operationList: [],
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
      'add-detail-form': AddDetailForm,
      'menu-form': AddMenuForm,
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
      // 行展开事件
      showFromTo(row, expandedRows) {
        if (row.expanded === undefined || row.expanded === false) {
          row.expanded = true;
          row.operationFromToList = [];
          Promise.all([operationFromToApi.getAll({
            size: 500,
            search: 'oid:EQ:{oid}'.format(
              {
                oid: row.id
              })
          })])
            .then(([response]) => {
              row.operationFromToList = response.content;
              this.$notify({
                title: this.$t('base.hint'),
                message: this.$t('base.loadingDone'),
                duration: 1000,
                position: 'bottom-right'
              });
            })
            .catch(error => {
            });
        } else {
          row.expanded = false;
        }
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
      addMenuButtonClick(selectRow, isEdit) {
        this.formData.viewSelect = selectRow;
        this.childForm.menuForm = true;
      },
      deleteButtonClick() {
        if (this.formData.selectRow === null || this.formData.selectRow === undefined) {
          this.$message({
            message: this.$t('message.unSelectAny'),
            type: 'info',
          });
          return;
        }

        Promise.all([operationApi.deleteOperation(this.formData.selectRow.id)])
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
      threeDeleteButtonClick(row1, row2) {
        if (this.formData.selectRow2 === null || this.formData.selectRow2 === undefined) {
          this.$message({
            message: this.$t('message.unSelectAny'),
            type: 'info',
          });
          return;
        }
        Promise.all([operationFromToApi.deleteOperationFromTo(row2.id)])
          .then(([response]) => {
            this.$message({
              type: 'info',
              message: this.$t('message.deleteOk')
            });
            this.formData.selectRow = null;
            row1.expanded = false;
            this.showFromTo(row1, row2);
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
      threeDeleteButtonConfirm(row1, row2) {
        this.$confirm(this.$t('message.deleteConfirm'), this.$t('base.titleTip'), {
          confirmButtonText: this.$t('base.buttonOk'),
          cancelButtonText: this.$t('base.buttonCancel'),
          type: 'warning'
        }).then(() => {
          this.threeDeleteButtonClick(row1, row2);
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
      threeHandleCurrentChange(val) {
        this.formData.selectRow2 = val;
      },
      addProcessDetail() {
        if (this.formData.selectRow === null || this.formData.selectRow === undefined) {
          this.$message({
            message: this.$t('message.unSelectAny'),
            type: 'info',
          });
          return;
        }
        this.formData.viewSelect = this.formData.selectRow;
        this.childForm.detailForm = true;
      },
      onSearchButtonClick() {
        Promise.all([operationApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          sort: 'alias,ASC',
          search: 'balance:EQ:{balance}'.format({balance: this.searchData.balance}),
          contains: 'lead,leaf,prefix,alias,name,title,balance,immediate,checking,entry,print,visible,position,desc,:{keyword}:true'.format({keyword: this.formData.pagination.keyword})
        })])
          .then(([response]) => {
            let arr = response.content;
            arr.forEach(function (item) {
              item.operationFromToList = [];
            });
            this.formData.operationList = arr;
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
