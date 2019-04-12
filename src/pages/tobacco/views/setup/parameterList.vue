<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline >
          <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
            <organization-form :root="userOrgId" @onchange="organizationOnchange"/>
          </el-form-item>
          <el-form-item :label="$t('tobacco.setup.parameter.annual')">
            <el-date-picker
              value-format="yyyy"
              v-model="searchData.annual"
              type="year"
              :placeholder="$t('base.pleaseSelect')"
            style="width: 100px">
            </el-date-picker>
            <el-form-item :label="$t('tobacco.setup.attribute.categoryId')" prop="categoryId">
              <el-select v-model="searchData.catalog" :placeholder="$t('base.pleaseSelectOrCreate')"  allow-create filterable>
                <el-option v-for="(item,index) in optionData.categoryIdOptions" :key="index" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
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
          <el-button type='primary' @click='onImportButtonClick'>{{ $t('base.import') }}</el-button>
          <el-button type='primary' @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }}</el-button>
        </el-button-group>
      </div>
    </div>
    <main class='contentPanel'>
      <el-table
        highlight-current-row
        border
        @current-change="handleCurrentChange"
        :data="formData.parameterList"
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="organization.organizationName"
                         :label="$t('org.organizationName')" width="120" show-overflow-tooltip/>
        <el-table-column prop="annual" :label="this.$t('tobacco.setup.parameter.annual')"/>
        <el-table-column prop="catalog" :label="this.$t('tobacco.setup.parameter.catalog')"/>
        <el-table-column prop="name" :label="this.$t('tobacco.setup.parameter.name')" width="150"
                         show-overflow-tooltip/>

        <el-table-column prop="key" :label="this.$t('tobacco.setup.parameter.key')" width="150"
                         show-overflow-tooltip/>
        <el-table-column prop="value" :label="this.$t('tobacco.setup.parameter.value')" width="150"
                         show-overflow-tooltip/>
                         <el-table-column prop="date" :label="this.$t('tobacco.setup.parameter.date')" width="150">
          <template slot-scope="scope">
            {{ dateFormat(scope.row.date,'yyyy-mm-dd')}}
          </template>
        </el-table-column>
        <el-table-column prop="desc" :label="this.$t('tobacco.setup.parameter.desc')" width="150"
                         show-overflow-tooltip/>


        <el-table-column
          fixed="right"
          :label="$t('base.titleOperation')"
          width="100">
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
                     layout="total, sizes, prev, pager, next, jumper"
                     placement='top'></el-pagination>
    </div>
    <template>
      <el-dialog :title="$t('base.import')" :visible.sync="childForm.addForm" top="10px" :before-close="handleClose"
                 id="import">
        <add-form ref="child"/>
      </el-dialog>
      <el-dialog :title="$t('base.buttonEdit')" :visible.sync="childForm.editForm" top="10px"
                 :before-close="handleClose">
        <edit-form :item.sync=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.editForm" @refresh="onSearchButtonClick"/>
      </el-dialog>
      <el-dialog :title="$t('base.buttonView')" :visible.sync="childForm.viewForm" top="10px"
                 :before-close="handleClose">
        <edit-form :item=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.viewForm"/>
      </el-dialog>
    </template>
  </div>
</template>
<script>
  const AddForm = () => import('./parameterAdd.vue');
  const EditForm = () => import('./parameterEdit.vue');
  const OrganizationForm = () => import('@/components/Organization');
  import parameterApi from '../../api/setup/api_parameter';

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
          'catalog': '',
          'key': '',
          'value': '',
          'desc': '',
          'orgId': '',
        },
        optionData: {
          categoryIdOptions: ['CASIT', 'LZ']
        },
        formData: {
          parameterList: [],
          pagination: {//用于分页的变量
            currentPage: 1,
            pageSize: 10,
            total: 0,
            keyword: '',
            pageSizeOpts: [10, 15, 20, 25, 30]
          },
          rowSelection: [],
          clickFlag: false
        },
      };
    },
    created() {
      Promise.all([parameterApi.showType()])
        .then(([response]) => {
          this.optionData.categoryIdOptions = response;
        })
        .catch(error => {
          console.log(error);
        });

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

        Promise.all([parameterApi.deleteParameter(this.formData.selectRow.id)])
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
        if (this.searchData.annual === null) {
          this.searchData.annual = '';
        }
        Promise.all([parameterApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          sort: 'catalog,ASC',
          contains: 'annual,catalog,key,value,desc,:{keyword}:true'.format({keyword: this.formData.pagination.keyword}),
          search: 'annual:EQ:{annual};catalog:EQ:{catalog};key:EQ:{key};value:EQ:{value};desc:EQ:{desc};organization.organizationId:EQ:{orgId};'.format({
            annual: this.searchData.annual === null ? '' : this.searchData.annual,
            catalog: this.searchData.catalog,
            key: this.searchData.key,
            value: this.searchData.value,
            desc: this.searchData.desc,
            orgId: this.searchData.orgId
          })
        })])
          .then(([response]) => {
            this.formData.parameterList = response.content;
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
      onImportButtonClick() {
        this.childForm.addForm = true;
        if (this.formData.clickFlag) {
          this.$refs['child'].resetData();
        }
        this.formData.clickFlag = true;
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
      },

    }
  };
</script>
<style scoped>
  #import .el-dialog {
    width: 1000px;
  }
</style>
