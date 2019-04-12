<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <transition name="slide-fade">
    <script-edit-form class='mainPanel' :select-id='formData.selectId' :item='formData.viewSelect ' :visible.sync="childForm.showMethodForm" v-if="childForm.showMethodForm" />

    <div v-else class='mainPanel'>
      <div class='toolPanel'>
        <div class='queryCriteria'>
          <el-form inline>
            <el-form-item :label="$t('base.keywords')">
              <el-input v-bind:placeholder="$t('base.ipKeywords')" v-model="formData.pagination.keyword" @keyup.enter.native="onSearchButtonClick" />
            </el-form-item>
          </el-form>

        </div>
        <div class='toolButton' style="min-width: 210px">
          <el-button-group>
            <el-button plain type='primary' @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }}</el-button>
            <el-button plain type='primary' @click='childForm.addForm=true'>{{ $t('base.buttonAdd') }}</el-button>
            <el-button plain type='primary' @click='deleteButtonConfirm' v-if="false">{{ $t('base.buttonDelete') }}</el-button>
          </el-button-group>

        </div>
      </div>
      <main class='contentPanel'>
        <el-table highlight-current-row border @current-change="handleCurrentChange" :data="formData.dynamicSqlList" style="width: 100%" :row-class-name="tableRowClassName">
          <el-table-column type="index">
          </el-table-column>
          <el-table-column prop="namespace" :label="this.$t('dynamicSql.namespace')" />
          <el-table-column prop="catalog" :label="this.$t('dynamicSql.catalog')" />
          <el-table-column prop="title" :label="this.$t('dynamicSql.title')" />
          <el-table-column prop="name" :label="this.$t('dynamicSql.name')" />
          <el-table-column prop="privilege" :label="this.$t('dynamicSql.privilege')" />
          <el-table-column prop="author" :label="this.$t('dynamicSql.author')" />

          <el-table-column fixed="right" :label="$t('base.titleOperation')" width="100px">
            <template slot-scope="scope">
              <el-button plain @click="showDynamicMethodDialog(scope.row)" type="text" size="small" v-if="false">
                {{$t('dynamicSql.script')}}
              </el-button>
              <el-button plain @click="onPublishClick(scope.row.id)" type="text" v-if="scope.row.status!==5">
                {{$t('dynamicSql.buttonPublish')}}
              </el-button>
              <el-button plain @click="onStopClick(scope.row.id)" type="text" v-else>
                {{$t('dynamicSql.buttonStop')}}
              </el-button>
              <el-button plain @click="editButtonClick(scope.row,true)" type="text">
                {{$t('base.buttonEdit')}}
              </el-button>
            </template>
          </el-table-column>

        </el-table>

      </main>
      <div class='footerPanel'>
        <el-pagination :page-size='formData.pagination.pageSize' :total='formData.pagination.total' :current-page='formData.pagination.currentPage' @current-change='onPageChange' :page-sizes='formData.pagination.pageSizeOpts' @size-change='onPageSizeChange' layout="total, sizes, prev, pager, next, jumper" placement='top'></el-pagination>
      </div>
      <template>
        <el-dialog :title="$t('base.buttonAdd')" :visible.sync="childForm.addForm" :before-close="handleClose">
          <add-form />
        </el-dialog>
        <el-dialog :title="$t('base.buttonEdit')" :visible.sync="childForm.editForm" :close-on-click-modal="false" :before-close="handleClose">
          <edit-form :item.sync=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.editForm" />
        </el-dialog>
        <el-dialog :title="$t('dynamicSql.script')" :visible.sync="childForm.scriptForm" :close-on-click-modal="false" top="10px" width="80%" :before-close="handleClose">
          <script-edit-form :selectId=formData.selectId :visible.sync="childForm.scriptForm" />
        </el-dialog>
      </template>
    </div>
  </transition>

</template>
<script>
import AddForm from './dynamicSqlAdd.vue';
import EditForm from './dynamicSqlEdit.vue';
import ScriptForm from './dynamicMethodList.vue';
import dynamicSqlApi from '../../api/online/apiDynamicSql';

export default {
  data() {
    return {
      childForm: {
        addForm: false,
        editForm: false,
        viewForm: false,
        scriptForm: false,
        isEdit: false,
        showMethodForm: false
      },
      searchData: {
        catalog: '',
        title: '',
        name: ''
      },
      formData: {
        dynamicSqlList: [],
        viewSelect: null,
        selectId: '',
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
  created() {},
  components: {
    'add-form': AddForm,
    'edit-form': EditForm,
    'script-edit-form': ScriptForm
  },
  methods: {
    showDynamicMethodDialog(row) {
      this.childForm.showMethodForm = true;
      this.formData.selectId = row.id;
      this.formData.viewSelect = row;
      // this.childForm.scriptForm = true;
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

      Promise.all([dynamicSqlApi.deleteDynamicSql(this.formData.selectRow.id)])
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
      //  console.log(val);
    },
    onPublishClick(id) {
      //点击发布按钮
      Promise.all([dynamicSqlApi.publishDynamicSql(id)])
        .then(([response]) => {
          this.onSearchButtonClick();
        })
        .catch(error => {});
    },
    onStopClick(id) {
      //点击发布按钮
      Promise.all([dynamicSqlApi.stopDynamicSql(id)])
        .then(([response]) => {
          this.onSearchButtonClick();
        })
        .catch(error => {});
    },
    onSearchButtonClick() {
      Promise.all([
        dynamicSqlApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          contains: 'catalog,title,name:{keyword}:true'.format({
            keyword: this.formData.pagination.keyword
          })
        })
      ])
        .then(([response]) => {
          this.formData.dynamicSqlList = response.content;
          this.formData.pagination.total = parseFloat(response.totalElements);
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
    }
  }
};
</script>
<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
