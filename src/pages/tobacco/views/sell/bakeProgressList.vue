<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-form-item :label="$t('tobacco.common.organization')">
            <organization-form :root="userOrgId" :code.sync="searchData.organizationId" />
          </el-form-item>
          <el-form-item :label="$t('base.keywords')">
            <el-input v-bind:placeholder="$t('base.ipKeywords')" v-model="formData.pagination.keyword" @keyup.enter.native="onSearchButtonClick" />
          </el-form-item>
        </el-form>
      </div>
      <div class='toolButton' style="min-width: 210px">
        <el-button-group>
          <el-button type='primary' @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }} </el-button>
          <el-button type='primary' @click='childForm.addForm=true'>{{ $t('base.buttonAdd') }} </el-button>
          <el-button type='danger' @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }} </el-button>
        </el-button-group>
      </div>
    </div>
    <main class='contentPanel'>
      <el-table highlight-current-row border @current-change="handleCurrentChange" @expand-change="onExpandChange" :data="formData.bakeProgressList" style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-table highlight-current-row border :data="scope.row.itemList" style="width: 80%">
              <el-table-column type="index">
              </el-table-column>
              <el-table-column prop="auditor" :label="$t('tobacco.tsell.bakeProgressTrace.auditor')" />
              <el-table-column prop="auditType" :label="$t('tobacco.tsell.bakeProgressTrace.auditType')">
                <template slot-scope="sc">
                  {{sc.row.auditType===1?'通过':(sc.row.auditType===-1?'驳回':'其它')}}
                </template>
              </el-table-column>
              <el-table-column prop="auditOpinion" :label="$t('tobacco.tsell.bakeProgressTrace.auditOpinion')" />
              <el-table-column prop="date" :label="$t('tobacco.tsell.bakeProgressTrace.date')">
                <template slot-scope="sc">
                  {{dateFormat(sc.row.date,'yyyy-mm-dd')}}
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="date" :label="this.$t('tobacco.tsell.bakeProgress.date')" />
        <el-table-column prop="bakeAmount" :label="this.$t('tobacco.tsell.bakeProgress.bakeAmount')" />
        <el-table-column prop="finishAmount" :label="this.$t('tobacco.tsell.bakeProgress.finishAmount')" />
        <el-table-column prop="topMatureAmount" :label="this.$t('tobacco.tsell.bakeProgress.topMatureAmount')" />
        <el-table-column prop="operator" :label="this.$t('tobacco.tsell.bakeProgress.operator')" />
        <el-table-column prop="status" :label="this.$t('tobacco.tsell.bakeProgress.status')">
          <template slot-scope="scope">
            {{formatStatus(scope.row.status)}}
          </template>
        </el-table-column>
        <el-table-column fixed="right" :label="$t('base.titleOperation')" width="180">
          <template slot-scope="scope">
            <el-button @click="editButtonClick(scope.row,false)" type="text">{{$t('base.buttonView')}}</el-button>
            <el-button type="text" :disabled="!(scope.row.status===0&&searchData.orgLevel==='11N')" @click="editButtonClick(scope.row,true)">{{$t('base.buttonEdit')}}</el-button>
            <el-button type="text" :disabled="!showReview(scope.row)" @click="reviewButtonClick(scope.row,true)">{{$t('base.buttonReview')}}</el-button>
            <el-button type="text" :disabled="!showUnreview(scope.row)" @click="unreviewButtonClick(scope.row,true)">{{$t('base.buttonUnreview')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </main>
    <div class='footerPanel'>
      <el-pagination :page-size='formData.pagination.pageSize' :total='formData.pagination.total' :current-page='formData.pagination.currentPage' @current-change='onPageChange' :page-sizes='formData.pagination.pageSizeOpts' @size-change='onPageSizeChange' layout="total, sizes, prev, pager, next, jumper" placement='top'></el-pagination>
    </div>
    <template>
      <el-dialog :title="$t('base.buttonAdd')" :visible.sync="childForm.addForm" top="10px" :before-close="handleClose">
        <add-form :level="searchData.orgLevel" />
      </el-dialog>
      <el-dialog :title="$t('base.buttonEdit')" :visible.sync="childForm.editForm" top="10px" :before-close="handleClose">
        <edit-form :item.sync=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.editForm" @refresh="onSearchButtonClick"
        />
      </el-dialog>
      <el-dialog :title="$t('base.buttonView')" :visible.sync="childForm.viewForm" top="10px" :before-close="handleClose">
        <edit-form :item=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.viewForm" />
      </el-dialog>
    </template>
  </div>
</template>
<script>
const AddForm = () => import('./bakeProgressAdd.vue');
const EditForm = () => import('./bakeProgressEdit.vue');
import organizationApi from '@/api/xbasic/apiOrganization';
import bakeProgressApi from '../../api/tsell/api_bakeProgress';
import bakeProgressTraceApi from '../../api/tsell/api_bakeProgressTrace';
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
        orgLevel: '',
        organizationId: this.userOrgId
      },
      formData: {
        bakeProgressList: [],
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
    this.searchData.organizationId = this.userOrgId;
    this.onSearchButtonClick();
    Promise.all([organizationApi.getById(this.userOrgId)])
      .then(([response]) => {
        this.searchData.orgLevel = response.level.id;
      })
      .catch(error => {});
  },
  components: {
    'add-form': AddForm,
    'edit-form': EditForm,
    OrganizationForm: () => import('@/components/Organization')
  },
  methods: {
    onExpandChange(row, expandedRows) {
      //如果没有定义或者未展示，则查询数据，进行展开操作
      if (row.expanded === undefined || row.expanded === false) {
        row.expanded = true;
        Promise.all([
          bakeProgressTraceApi.getAll({
            size: 500,
            page: 0,
            search: 'bakeProgressId:eq:' + row.id
          })
        ])
          .then(([response]) => {
            row.itemList = response.content;
            let index = 0;
            for (let item of this.formData.bakeProgressList) {
              if (item.id === row.id) {
                break;
              }
              index++;
            }
            this.formData.bakeProgressList.splice(index, 1, row);
          })
          .catch(error => {});
      } else {
        //属于折叠操作
        row.expanded = false;
      }
    },
    reviewButtonClick(row) {
      this.$prompt('请录入审核意见', this.$t('base.titleTip'), {
        confirmButtonText: this.$t('base.buttonOk'),
        cancelButtonText: this.$t('base.buttonCancel')
      })
        .then(({ value }) => {
          var data = {
            bakeProgressId: row.id,
            auditor: this.$store.state.user.userName,
            auditId: this.$store.state.user.loginName,
            auditOpinion: value,
            level: this.searchData.orgLevel,
            date: this.dateFormat(new Date(), 'yyyy-mm-dd'),
            history: JSON.stringify(row)
          };
          Promise.all([bakeProgressApi.review(data)])
            .then(([response]) => {
              this.$message({
                message: this.$t('message.reviewSuccess'),
                type: 'info'
              });
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('base.buttonCancel')
          });
        });
    },
    unreviewButtonClick(row) {
      this.$prompt('请录入驳回意见', this.$t('base.titleTip'), {
        confirmButtonText: this.$t('base.buttonOk'),
        cancelButtonText: this.$t('base.buttonCancel')
      })
        .then(({ value }) => {
          var data = {
            bakeProgressId: row.id,
            auditor: this.$store.state.user.userName,
            auditId: this.$store.state.user.loginName,
            auditOpinion: value,
            level: this.searchData.orgLevel,
            date: this.dateFormat(new Date(), 'yyyy-mm-dd'),
            history: JSON.stringify(row)
          };
          Promise.all([bakeProgressApi.unreview(data)])
            .then(([response]) => {
              this.$message({
                message: this.$t('message.unreviewSuccess'),
                type: 'info'
              });
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('base.buttonCancel')
          });
        });
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

      Promise.all([
        bakeProgressApi.deleteBakeProgress(this.formData.selectRow.id)
      ])
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
        bakeProgressApi.getAll({
          size: this.formData.pagination.pageSize,
          sort: 'id,ASC',
          page: this.formData.pagination.currentPage - 1,
          contains: 'operator:{keyword}:true'.format({
            keyword: this.formData.pagination.keyword
          }),
          search: 'organization.organizationId:rlike:{orgId}'.format({
            level: this.searchData.orgLevel,
            orgId: this.searchData.organizationId
          })
        })
      ])
        .then(([response]) => {
          this.formData.bakeProgressList = response.content;
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
    },
    formatStatus(status) {
      var statusAlias = this.$t('tobacco.tsell.bakeProgress.statusAlias');
      var item = statusAlias.find(function(item) {
        return parseInt(Object.keys(item)[0]) === status;
      });
      if (item === undefined) {
        return '未知';
      }
      //  console.log(item);
      return item[status];
    },
    showReview(row) {
      var canReview = false;
      switch (row.level) {
        case '11N':
          if (
            (row.status === 0 && this.searchData.orgLevel === row.level) ||
            (row.status === 1 && this.searchData.orgLevel === '11M')
          ) {
            canReview = true;
          }
          break;
        case '11M':
          if (row.status === 3 && this.searchData.orgLevel === '11F') {
            canReview = true;
          }
          break;
        case '11F':
          break;
      }
      return canReview;
    },
    showUnreview(row) {
      var canReview = false;
      switch (row.level) {
        case '11N':
          if (row.status === 1 && this.searchData.orgLevel === '11M') {
            canReview = true;
          }
          break;
        case '11M':
          if (this.searchData.orgLevel === '11F') {
            canReview = true;
          }
          break;
        case '11F':
          if (row.status === 3) {
            canReview = true;
          }
          break;
      }
      return canReview;
    }
  }
};
</script>
