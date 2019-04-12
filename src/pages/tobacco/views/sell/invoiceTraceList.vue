<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form  inline>
          <el-form-item    :label="$t('tobacco.tsell.invoiceTrace.invoiceId')" >
			<el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.invoiceId"
                                                  @keyup.enter.native="onSearchButtonClick"/>
		  </el-form-item >
          <el-form-item    :label="$t('tobacco.tsell.invoiceTrace.timeId')" >
			<el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.timeId"
                                                  @keyup.enter.native="onSearchButtonClick"/>
		  </el-form-item >
          <el-form-item    :label="$t('tobacco.tsell.invoiceTrace.code')" >
			<el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.code"
                                                  @keyup.enter.native="onSearchButtonClick"/>
		  </el-form-item >
          <el-form-item    :label="$t('tobacco.tsell.invoiceTrace.action')" >
			<el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.action"
                                                  @keyup.enter.native="onSearchButtonClick"/>
		  </el-form-item >
          <el-form-item    :label="$t('tobacco.tsell.invoiceTrace.operator')" >
			<el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.operator"
                                                  @keyup.enter.native="onSearchButtonClick"/>
		  </el-form-item >
          <el-form-item    :label="$t('tobacco.tsell.invoiceTrace.message')" >
			<el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.message"
                                                  @keyup.enter.native="onSearchButtonClick"/>
		  </el-form-item >
          <el-form-item    :label="$t('tobacco.tsell.invoiceTrace.loginId')" >
			<el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.loginId"
                                                  @keyup.enter.native="onSearchButtonClick"/>
		  </el-form-item >
          <el-form-item    :label="$t('tobacco.tsell.invoiceTrace.loginName')" >
			<el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.loginName"
                                                  @keyup.enter.native="onSearchButtonClick"/>
		  </el-form-item >
          <el-form-item    :label="$t('tobacco.tsell.invoiceTrace.desc')" >
			<el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.desc"
                                                  @keyup.enter.native="onSearchButtonClick"/>
		  </el-form-item >
			  <el-form-item :label="$t('base.keywords')">
				<el-input v-bind:placeholder="$t('base.ipKeywords')"
					v-model="formData.pagination.keyword" @keyup.enter.native="onSearchButtonClick"/>
			  </el-form-item>
		  </el-form>
      </div>
		<div class='toolButton' style="min-width: 210px">
			<el-button-group>
				<el-button type='primary' @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }} </el-button>
				<el-button type='primary' @click='childForm.addForm=true'>{{ $t('base.buttonAdd') }} </el-button>
				<el-button type='primary' @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }} </el-button>
			</el-button-group>
        </div>
      </div>
	  <main class='contentPanel'>
		<el-table
			highlight-current-row
			border
			@current-change="handleCurrentChange"
			:data="formData.invoiceTraceList"
			style="width: 100%"
			:row-class-name="tableRowClassName">
		  <el-table-column type="index">
			</el-table-column>
			    <el-table-column prop="invoiceId" :label="this.$t('tobacco.tsell.invoiceTrace.invoiceId')" />
			    <el-table-column prop="timeId" :label="this.$t('tobacco.tsell.invoiceTrace.timeId')" />
			    <el-table-column prop="code" :label="this.$t('tobacco.tsell.invoiceTrace.code')" />
			    <el-table-column prop="action" :label="this.$t('tobacco.tsell.invoiceTrace.action')" />
			    <el-table-column prop="operator" :label="this.$t('tobacco.tsell.invoiceTrace.operator')" />
			    <el-table-column prop="message" :label="this.$t('tobacco.tsell.invoiceTrace.message')" />
			    <el-table-column prop="loginId" :label="this.$t('tobacco.tsell.invoiceTrace.loginId')" />
			    <el-table-column prop="loginName" :label="this.$t('tobacco.tsell.invoiceTrace.loginName')" />
			    <el-table-column prop="desc" :label="this.$t('tobacco.tsell.invoiceTrace.desc')" />
		<el-table-column
		fixed="right"
		:label="$t('base.titleOperation')"
		width="100">
		<template slot-scope="scope">
			<el-button @click="editButtonClick(scope.row,false)" type="text" size="small">{{$t('base.buttonView')}}</el-button>
			<el-button type="text" size="small" @click="editButtonClick(scope.row,true)">{{$t('base.buttonEdit')}}</el-button>
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
            <el-dialog :title="$t('base.buttonAdd')" :visible.sync="childForm.addForm" top="10px"  :before-close="handleClose">
                <add-form/>
            </el-dialog>
            <el-dialog :title="$t('base.buttonEdit')" :visible.sync="childForm.editForm"  top="10px"  :before-close="handleClose">
                <edit-form :item.sync=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.editForm" @refresh="onSearchButtonClick"
                />
            </el-dialog>
            <el-dialog :title="$t('base.buttonView')" :visible.sync="childForm.viewForm"  top="10px"  :before-close="handleClose">
                <edit-form :item=formData.viewSelect :isEdit =childForm.isEdit :visible.sync="childForm.viewForm" />
            </el-dialog>
        </template>
    </div>
</template>
<script>
const AddForm = () => import('./invoiceTraceAdd.vue');
const EditForm = () => import('./invoiceTraceEdit.vue');
import invoiceTraceApi from '../../api/tsell/api_invoiceTrace';
export default {
  data () {
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
              start.setTime(start.getTime() - 3600 * 1000 * 24 );
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
        'invoiceId': '',
        'timeId': 0,
        'code': 0,
        'action': '',
        'operator': '',
        'message': '',
        'loginId': 0,
        'loginName': '',
        'desc': '',
      },
      formData: {
        invoiceTraceList: [],
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
    'edit-form': EditForm
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
      if (this.formData.selectRow === null || this.formData.selectRow === undefined) {
        this.$message({
          message: this.$t('message.unSelectAny'),
          type: 'info',
        });
        return;
      }

      Promise.all([invoiceTraceApi.deleteInvoiceTrace(this.formData.selectRow.id)])
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
      this.$confirm( this.$t('message.deleteConfirm'), this.$t('base.titleTip'), {
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
      Promise.all([invoiceTraceApi.getAll({
        size: this.formData.pagination.pageSize,
        sort: 'id,ASC',
        page: this.formData.pagination.currentPage - 1,
        contains: 'invoiceId,timeId,code,action,operator,message,loginId,loginName,desc,:{keyword}:true'.format({ keyword: this.formData.pagination.keyword }),
        search: 'invoiceId:EQ:{invoiceId};timeId:EQ:{timeId};code:EQ:{code};action:EQ:{action};operator:EQ:{operator};message:EQ:{message};loginId:EQ:{loginId};loginName:EQ:{loginName};desc:EQ:{desc};'.format({invoiceId: this.searchData.invoiceId, timeId: this.searchData.timeId, code: this.searchData.code, action: this.searchData.action, operator: this.searchData.operator, message: this.searchData.message, loginId: this.searchData.loginId, loginName: this.searchData.loginName, desc: this.searchData.desc, })
      })])
        .then(([response]) => {
          this.formData.invoiceTraceList = response.content;
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
