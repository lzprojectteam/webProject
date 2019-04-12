<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>

  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form  inline>
          <el-form-item :label="$t('menu.belongSystem')">
            <el-select v-model='formData.systemId'
                       @change='onSystemChanged'>
              <el-option value='-' key='-'>{{ $t('base.all') }} </el-option>
              <el-option
                v-for="item in  formData.systemList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('base.keywords')">
            <el-input v-bind:placeholder="$t('base.ipKeywords')"
                      v-model='formData.pagination.keyword' @keyup.enter.native='searchButtonClick'/>
          </el-form-item>
        </el-form>

      </div>
      <div class='toolButton' style="min-width: 210px">
       <el-button-group>
          <el-button plain type='primary' @click='searchButtonClick'>{{ $t('base.buttonSearch') }} </el-button>
          <el-button plain type='primary' @click='childForm.addForm=true'>{{ $t('base.buttonAdd') }} </el-button>
          <el-button plain type='primary' @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }} </el-button>
        </el-button-group>

      </div>
    </div>
    <main class='contentPanel'>
      <el-table
        highlight-current-row
        border
        @current-change="handleCurrentChange"
        :data="formData.menuList"
        style="width: 100%"
        :row-class-name="tableRowClassName">
       
        <el-table-column
          prop="code"
          :label="$t('base.code')"
          width="140">
        </el-table-column>
        <el-table-column
          prop="title"
          :label="$t('menu.title')"
          width="140">
          <template slot-scope="scope">
            <i :class="scope.row.icon"></i>
            <span>{{ scope.row.title}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="ancestry"
          :label="$t('menu.ancestry')" width="140">
          <template slot-scope="scope">
            <el-tag size="medium">{{formateAncestry(scope.row.ancestry)}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="mark"
          :label="$t('menu.mark')" min-width="80" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="url"
          :label="$t('menu.url')"
          min-width="100" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="path"
          show-overflow-tooltip
          :label="$t('menu.path')">
        </el-table-column>
        <el-table-column
          :label="$t('menu.style')"
          width="60">         
        </el-table-column>
        <el-table-column
          :label="$t('menu.templet')"
          show-overflow-tooltip
          width="100">         
        </el-table-column>
        <el-table-column
          :label="$t('base.visible')"
          width="60">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.visible" disabled/>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('menu.cache')"
          width="60">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.cacheMenu" disabled/>
          </template>
        </el-table-column>

        <el-table-column
          fixed="right"
          :label="$t('base.titleOperation')"
          width="100">
          <template slot-scope="scope">
            <el-button plain @click="editButtonClick(scope.row,false)" type="text" size="small">{{$t('base.buttonView')}}
            </el-button>
            <el-button plain type="text" size="small" @click="editButtonClick(scope.row,true)">{{$t('base.buttonEdit')}}
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
        <edit-form :item.sync=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.editForm"/>
      </el-dialog>
      <el-dialog :title="$t('base.buttonView')" :visible.sync="childForm.viewForm" top="10px"
                 :before-close="handleClose">
        <edit-form :item=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.viewForm"/>
      </el-dialog>
    </template>
  </div>

</template>
<script>
  const AddForm = () => import('./menuAdd.vue');
  const EditForm = () => import('./menuEdit.vue');
  import systemApi from '../../api/apiSystem';
  import menuApi from '../../api/apiMenu';

  export default {
    data() {
      return {
        formData: {
          systemId: '-',
          systemList: [],
          menuList: [],
          pagination: {//用于分页的变量
            currentPage: 1,
            pageSize: 10,
            total: 0,
            keyword: '',
            pageSizeOpts: [10, 15, 20, 25, 30]
          },
          rowSelection: [],
          selectRow: null,
          viewSelect: null
        },
        childForm: {
          addForm: false,
          editForm: false,
          viewForm: false,
          isEdit: false
        }
      };
    },
    components: {
      'add-form': AddForm,
      'edit-form': EditForm
    },
    created() {
      Promise.all([systemApi.getAll()])
        .then(([systems]) => {

          this.formData.systemList = systems.content;
        })
        .catch(error => {
        });
    },
    methods: {
      onSystemChanged() {
        this.formData.pagination.currentPage = 1;
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
        if (this.formData.selectRow.child !== null && this.formData.selectRow.child !== undefined && this.formData.selectRow.child.length > 0) {
          this.$message({
            message: this.$t('menu.deleteWarn'),
            type: 'info',
          });
          return;
        }
        Promise.all([menuApi.deleteMenu(this.formData.selectRow.id)])
          .then(([response]) => {
            this.$message({
              type: 'info',
              message: this.$t('message.deleteOk')
            });
            this.formData.selectRow = null;
            this.searchButtonClick();

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
      searchButtonClick() {
        var systemId = this.formData.systemId;
        if (this.formData.systemId === undefined || this.formData.systemId === '') {
          systemId = '-';
        }

        Promise.all([menuApi.getBySystemId(systemId, {
          'size': this.formData.pagination.pageSize,
          'page': this.formData.pagination.currentPage - 1,
          'keyword': this.formData.pagination.keyword,
        })])
          .then(([response]) => {
            this.formData.menuList = response.content;
            this.formData.pagination.total = parseFloat(response.totalElements);
          })
          .catch(error => {
          });
      },
      formateAncestry(data) {
        if (data === null || data === undefined || data === '') {
          return '无';
        }

        var jsoData = JSON.parse(data);
        var title = '';
        for (var value of jsoData) {
          title += value.title + '/';
          //console.log(value.title);
        }
        return title.substr(0, title.length - 1);
      },
      onPageChange(index) {
        this.formData.pagination.currentPage = index;
        this.searchButtonClick();
      },
      onPageSizeChange(size) {
        this.formData.pagination.pageSize = size;
        this.searchButtonClick();
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
        this.searchButtonClick();
        done();
      }

    }
  };
</script>
