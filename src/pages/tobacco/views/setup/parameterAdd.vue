<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form  ref="formValidate">
          <el-row>
            <el-col :span=5>
              <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')" prop="organization">
                <organization-form :root="userOrgId" @onchange="organizationOnchange" />
              </el-form-item>
            </el-col>
            <el-col :span=5>
              <el-form-item :label="$t('tobacco.setup.parameter.balance')">
                <el-select clearable v-model="searchData.balanceId" filterable>
                  <el-option v-for="item in balanceList" :key="item.id" :label="item.title" :value="item.id">
                  </el-option>
                </el-select>

              </el-form-item>
            </el-col>
            <el-col :span=5>

              <el-form-item :label="$t('tobacco.setup.attribute.categoryId')" prop="categoryId">
                <el-select v-model="searchData.categoryId" :placeholder="$t('base.pleaseSelectOrCreate')" @change="resetData" allow-create filterable>
                  <el-option v-for="(item,index) in optionData.categoryIdOptions" :key="index" :label="item" :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span=5>

              <el-form-item :label="$t('tobacco.setup.parameter.annual')" prop="annual">
                <el-date-picker value-format="yyyy" v-model="searchData.annual" type="year" :placeholder="$t('base.pleaseSelect')">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </div>
      <div class='toolButton' style="min-width: 70px">
        <el-button-group>
          <el-button type='primary' @click='onImportButtonClick'>{{ $t('base.import') }}</el-button>
        </el-button-group>
      </div>
    </div>
    <main class='contentPanel'>
      <el-table highlight-current-row border @current-change="handleCurrentChange" :data="formData.parameterList" style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="organization.organizationName" :label="$t('org.organizationName')" width="120" show-overflow-tooltip/>
        <el-table-column prop="annual" :label="this.$t('tobacco.setup.parameter.annual')" />
        <el-table-column prop="catalog" :label="this.$t('tobacco.setup.parameter.catalog')" />
        <el-table-column prop="key" :label="this.$t('tobacco.setup.parameter.key')" width="150" show-overflow-tooltip/>
        <el-table-column prop="value" :label="this.$t('tobacco.setup.parameter.value')" width="150" show-overflow-tooltip/>
        <el-table-column prop="desc" :label="this.$t('tobacco.setup.attribute.example')" width="150" show-overflow-tooltip/>
        <el-table-column prop="date" :label="this.$t('tobacco.setup.parameter.date')">
          <template slot-scope="scope">
            {{ formatDate(scope.row.date)}}
          </template>
        </el-table-column>
      </el-table>
    </main>
    <div class='footerPanel'>
      <el-pagination :page-size='formData.pagination.pageSize' :total='formData.pagination.total' :current-page='formData.pagination.currentPage' @current-change='onPageChange' :page-sizes='formData.pagination.pageSizeOpts' @size-change='onPageSizeChange' layout="total" placement='top'></el-pagination>
    </div>
    <template>
      <el-dialog :title="$t('base.import')" :visible.sync="childForm.addForm" top="10px" :before-close="handleClose" id="import">
        <add-form/>
      </el-dialog>

    </template>
  </div>
</template>
<script>
const AddForm = () => import('./parameterAdd.vue');
const EditForm = () => import('./parameterEdit.vue');
const OrganizationForm = () => import('@/components/Organization');
import parameterApi from '../../api/setup/api_parameter';
import dateFormat from 'dateformat';
import balanceApi from '../../api/setup/api_balance';
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
      optionData: {
        categoryIdOptions: ['CASIT', 'LZ']
      },
      balanceList: [],
      searchData: {
        orgId: this.$store.state.user.organization.organizationId,
        categoryId: '',
        annual: '',
        balanceId: '',
        organizationName: this.$store.state.user.organization.organizationName
      },
      formData: {
        parameterList: [],
        pagination: {
          //用于分页的变量
          currentPage: 1,
          pageSize: 5,
          total: 0,
          keyword: '',
          pageSizeOpts: [10, 15, 20, 25, 30]
        },
        rowSelection: []
      }
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
    this.formData.pagination.total = 0;
    Promise.all([
      balanceApi.getAll({
        size: 500,
        page: 0,
        search: 'organization.organizationId:rlike:{orgid};'.format({
          orgid: this.searchData.orgId
        })
      })
    ])
      .then(([response]) => {
        this.balanceList = response.content;
        if (this.balanceList.length > 0) {
          this.searchData.balanceId = this.balanceList[0].id;
        }
      })
      .catch(error => {});
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
      this.searchData.organizationName = label;
      this.formData.parameterList = [];
      Promise.all([
        balanceApi.getAll({
          size: 500,
          page: 0,
          search: 'organization.organizationId:rlike:{orgid};'.format({
            orgid: this.searchData.orgId
          })
        })
      ])
        .then(([response]) => {
          this.balanceList = response.content;
        })
        .catch(error => {});
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

    handleCurrentChange(val) {
      this.formData.selectRow = val;
    },
    onImportButtonClick() {
      Promise.all([
        parameterApi.parameterBind(
          this.searchData.annual,
          this.searchData.categoryId,
          this.searchData.orgId,
          this.searchData.organizationName,
          { balanceId: this.searchData.balanceId }
        )
      ])
        .then(([response]) => {
          this.formData.parameterList = response;
          this.formData.pagination.total = response.length;
          this.$message({
            message: this.$t('tobacco.setup.parameter.importSuccess'),
            type: 'success'
          });
        })
        .catch(error => {
          this.$message({
            message: this.$t('message.formValidate'),
            type: 'warn'
          });
        });
    },

    onPageChange(index) {
      if (this.formData.pagination.currentPage !== index) {
        this.formData.pagination.currentPage = index;
        this.onImportButtonClick();
      }
    },
    onPageSizeChange(size) {
      if (this.formData.pagination.pageSize !== size) {
        this.formData.pagination.pageSize = size;
        this.onImportButtonClick();
      }
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'warning-row';
      } else {
        return 'success-row';
      }
    },
    resetData() {
      this.formData.parameterList = [];
      this.searchData.annual = '';
    },
    handleClose(done) {
      this.childForm.addForm = false;
      this.childForm.editForm = false;
      // this.onImportButtonClick();
      done();
    },
    formatDate(date) {
      if (date === '' || date === undefined || date === null) {
        return '未设置';
      }
      return dateFormat(date, 'yyyy-mm-dd');
    },
    clearForm() {
      this.formData.parameterList = [];
    }
  }
};
</script>
<style scoped>
#import .el-dialog {
  width: 1000px;
}
</style>
