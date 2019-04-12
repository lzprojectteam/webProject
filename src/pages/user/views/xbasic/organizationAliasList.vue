<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-form-item :label="$t('xbasic.organizationAlias.organizationId')">
            <organization-form root="0" :code.sync="searchData.organizationId"/>
          </el-form-item>

          <el-form-item :label="$t('base.keywords')">
            <el-input v-bind:placeholder="$t('base.ipKeywords')"
                      v-model="formData.pagination.keyword"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
        </el-form>
      </div>
      <div class='toolButton' style="min-width: 210px">
       <el-button-group>
          <el-button plain type='primary' @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }}
          </el-button>
          <el-button plain type='primary' @click='childForm.addForm=true'>{{ $t('base.buttonAdd') }}
          </el-button>
          <el-button plain type='primary' @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }}
          </el-button>
        </el-button-group>
      </div>
    </div>
    <main class='contentPanel'>
      <el-table highlight-current-row border @current-change="handleCurrentChange"
                :data="formData.organizationAliasList" style="width: 100%"
                :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="organizationId"
                         :label="this.$t('xbasic.organizationAlias.organizationId')"/>
        <el-table-column prop="aliasId" :label="this.$t('xbasic.organizationAlias.aliasId')"/>
        <el-table-column prop="key" :label="this.$t('xbasic.organizationAlias.key')"/>
        <el-table-column prop="code" :label="this.$t('xbasic.organizationAlias.code')"/>
        <el-table-column prop="name" :label="this.$t('xbasic.organizationAlias.name')"/>
        <el-table-column prop="desc" :label="this.$t('xbasic.organizationAlias.desc')"/>
        <el-table-column fixed="right" :label="$t('base.titleOperation')" width="100">
          <template slot-scope="scope">
            <el-button plain @click="editButtonClick(scope.row,false)" type="text" size="small">{{$t(
              'base.buttonView')}}
            </el-button>
            <el-button plain type="text" size="small" @click="editButtonClick(scope.row,true)">{{$t(
              'base.buttonEdit')}}
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
      <el-dialog :title="$t('base.buttonAdd')" :visible.sync="childForm.addForm" top="10px"
                 :before-close="handleClose">
        <add-form/>
      </el-dialog>
      <el-dialog :title="$t('base.buttonEdit')" :visible.sync="childForm.editForm" top="10px"
                 :before-close="handleClose">
        <edit-form :item.sync=formData.viewSelect :isEdit=childForm.isEdit
                   :visible.sync="childForm.editForm"/>
      </el-dialog>
      <el-dialog :title="$t('base.buttonView')" :visible.sync="childForm.viewForm" top="10px"
                 :before-close="handleClose">
        <edit-form :item=formData.viewSelect :isEdit=childForm.isEdit
                   :visible.sync="childForm.viewForm"/>
      </el-dialog>
    </template>
  </div>
</template>
<script>
  const AddForm = () => import('./organizationAliasAdd.vue');
  const EditForm = () => import('./organizationAliasEdit.vue');
  import organizationAliasApi from '../../api/xbasic/apiOrganizationAlias';

  export default {
    data() {
      return {
        childForm: {
          addForm: false,
          editForm: false,
          viewForm: false,
          isEdit: false
        },
        searchData: {
          organizationId: '',
          aliasId: '',
          key: '',
          code: '',
          name: '',
          desc: ''
        },
        formData: {
          organizationAliasList: [],
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
    },
    components: {
      'add-form': AddForm,
      'edit-form': EditForm,
      OrganizationForm: () => import('@/components/Organization')
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

        Promise.all([
          organizationAliasApi.deleteOrganizationAlias(this.formData.selectRow.id)
        ])
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
      onSearchButtonClick() {
        Promise.all([
          organizationAliasApi.getAll({
            size: this.formData.pagination.pageSize,
            page: this.formData.pagination.currentPage - 1,
            contains: 'organizationId,aliasId,key,code,name,desc,:{keyword}:true'.format(
              {keyword: this.formData.pagination.keyword}
            ),
            search: 'organizationId:RLIKE:{organizationId};aliasId:EQ:{aliasId};key:EQ:{key};code:EQ:{code};name:EQ:{name};desc:EQ:{desc};'.format(
              {
                organizationId: this.searchData.organizationId,
                aliasId: this.searchData.aliasId,
                key: this.searchData.key,
                code: this.searchData.code,
                name: this.searchData.name,
                desc: this.searchData.desc
              }
            )
          })
        ])
          .then(([response]) => {
            this.formData.organizationAliasList = response.content;
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
