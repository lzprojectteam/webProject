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
        :data="formData.booksList"
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="organization.organizationName" :label="this.$t('org.organizationName')" width="150"
                         show-overflow-tooltip/>
        <el-table-column prop="code" :label="this.$t('tobacco.tstorage.books.code')" width="150" show-overflow-tooltip
        />
        <el-table-column prop="name" :label="this.$t('tobacco.tstorage.books.name')" width="100" show-overflow-tooltip
        />
        <el-table-column prop="title" :label="this.$t('tobacco.tstorage.books.title')" width="100" show-overflow-tooltip
        />
        <el-table-column prop="author" :label="this.$t('tobacco.tstorage.books.author')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="date" :label="this.$t('tobacco.tstorage.books.date')" width="100" show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ dateFormat(scope.row.date,'yyyy-mm-dd')}}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="zone" :label="this.$t('tobacco.tstorage.books.zone')" width="100" show-overflow-tooltip
         />
         <el-table-column prop="stock" :label="this.$t('tobacco.tstorage.books.stock')" width="100" show-overflow-tooltip
         />-->
        <el-table-column prop="period" :label="this.$t('tobacco.tstorage.books.period')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="createYear" :label="this.$t('tobacco.tstorage.books.createYear')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="createMonth" :label="this.$t('tobacco.tstorage.books.createMonth')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="currentYear" :label="this.$t('tobacco.tstorage.books.currentYear')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="currentMonth" :label="this.$t('tobacco.tstorage.books.currentMonth')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="control.name" :label="this.$t('tobacco.tstorage.transport.control')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="desc" :label="this.$t('tobacco.tstorage.books.desc')" width="100" show-overflow-tooltip
        />
        <el-table-column
          fixed="right"
          :label="$t('base.titleOperation')"
          width="140">
          <template slot-scope="scope">
            <el-button @click="editButtonClick(scope.row,false)" type="text" size="small">{{$t('base.buttonView')}}
            </el-button>
            <el-button type="text" size="small" @click="editButtonClick(scope.row,true)">{{$t('base.buttonEdit')}}
            </el-button>
            <el-button type="text" size="small" @click="toggleButtonClick(scope.row,2)"
                       v-if="scope.row.control.id === 'ST_BK03'">
              {{$t('tobacco.tstorage.books.close')}}
            </el-button>
            <el-button type="text" size="small" @click="toggleButtonClick(scope.row,1)"
                       v-else>{{$t('tobacco.tstorage.books.open')}}
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
  const AddForm = () => import('./booksAdd.vue');
  const OrganizationForm = () => import('@/components/Organization');
  const EditForm = () => import('./booksEdit.vue');
  import booksApi from '../../api/tstorage/api_books';

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
          'code': '',
          'name': '',
          'title': '',
          'author': '',
          'date': '',
          'zone': '',
          'stock': '',
          'period': '',
          'createYear': '',
          'createMonth': '',
          'currentYear': '',
          'currentMonth': '',
          'desc': '',
          'organizationId': this.$store.state.user.organization.organizationId,
        },
        formData: {
          booksList: [],
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
      //切换账套启用和停用
      toggleButtonClick(row, param) {
        if (param === 2) {
          this.closeConfirm(row);
        } else {
          //第一个标识表示 是启用还是停用（0启用，1停用）,第二个标识表示此次请求是普通请求还是强制更新请求（0普通请求，1强制更新）
          Promise.all([booksApi.updateControl(row.id, param, 0)])
            .then(([response]) => {
              console.log(response);
              //-1表示已有账套启用
              if (response.code === -1) {
                //用户确认是否关闭其他已启用，启用当前账套
                this.replaceConfirm(row);
              } else {
                this.$message({
                  type: 'success',
                  message: this.$t('message.updateOk')
                });
                this.onSearchButtonClick();

              }
            })
            .catch(error => {
              this.$message({
                type: 'error',
                message: this.$t('message.updateFailed')
              });
            });
        }

      },
      /*
            closeButtonClick(row) {
              Promise.all([booksApi.updateControl(row.id, 2)])
                .then(([response]) => {
                  this.$message({
                    type: 'success',
                    message: this.$t('message.updateOk')
                  });
                  this.onSearchButtonClick();
                })
                .catch(error => {
                  this.$message({
                    type: 'success',
                    message: this.$t('message.updateFailed')
                  });
                });
            },
      */
      replaceConfirm(row) {
        this.$confirm(this.$t('tobacco.tstorage.books.replaceConfirm'), this.$t('base.titleTip'), {
          confirmButtonText: this.$t('base.buttonOk'),
          cancelButtonText: this.$t('base.buttonCancel'),
          type: 'warning',
          customClass: 'bookList_replaceConfirm',
        }).then(() => {
          Promise.all([booksApi.updateControl(row.id, 1, 1)])
            .then(([response]) => {
              this.$message({
                type: 'success',
                message: this.$t('message.updateOk')
              });
              this.onSearchButtonClick();
            })
            .catch(error => {
              this.$message({
                type: 'error',
                message: this.$t('message.updateFailed')
              });
              console.log(error);
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('message.cancel')
          });
        });
      },
      //关闭账套确认
      closeConfirm(row) {
        this.$confirm(this.$t('tobacco.tstorage.books.closeConfirm'), this.$t('base.titleTip'), {
          confirmButtonText: this.$t('base.buttonOk'),
          cancelButtonText: this.$t('base.buttonCancel'),
          type: 'warning'
        }).then(() => {
          Promise.all([booksApi.updateControl(row.id, 2, 1)])
            .then(([response]) => {
              this.$message({
                type: 'success',
                message: this.$t('message.updateOk')
              });
              this.onSearchButtonClick();
            })
            .catch(error => {
              this.$message({
                type: 'error',
                message: this.$t('message.updateFailed')
              });
              console.log(error);
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('message.cancel')
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
        Promise.all([booksApi.deleteBooks(this.formData.selectRow.id)])
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
        if (this.formData.selectRow && this.formData.selectRow.control.id === 'ST_BK03') {
          this.$confirm('当前账套处于启动状态,确认删除？', this.$t('base.titleTip'), {
            confirmButtonText: this.$t('base.buttonOk'),
            cancelButtonText: this.$t('base.buttonCancel'),
            type: 'error'
          }).then(() => {
            this.deleteButtonClick();
          }).catch(() => {
            this.$message({
              type: 'info',
              message: this.$t('message.cancel')
            });
          });
        } else {
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
        }
      },
      handleCurrentChange(val) {
        this.formData.selectRow = val;
      },
      onSearchButtonClick() {
        Promise.all([booksApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          sort: 'code,ASC',
          contains: 'name,title,author,zone,stock,period,createYear,createMonth,currentYear,currentMonth,desc,:{keyword}:true'.format({keyword: this.formData.pagination.keyword}),
          search: 'organization.organizationId:rlike:{orgid};'.format({
            orgid: this.searchData.organizationId,
          })
        })])
          .then(([response]) => {
            this.formData.booksList = response.content;
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
<style>
  .bookList_replaceConfirm {
    width: 460px !important;
  }
</style>
