<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-form-item :label="$t('tobacco.tstorage.billIn.annual')">
            <el-date-picker
              value-format="yyyy"
              v-model="searchData.annual"
              type="year"
              :placeholder="$t('base.pleaseSelect')">
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('tobacco.common.type')">
            <type-variety-select :typeId.sync="searchData.typeId" :varietyId.sync="searchData.varietyId"/>
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
        :data="formData.priceList"
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column
          type="index">
        </el-table-column>
        <!-- <el-table-column prop="id" :label="this.$t('tobacco.basic.price.id')" width="100"
                          show-overflow-tooltip/>-->
        <el-table-column prop="annual" :label="this.$t('tobacco.basic.price.annual')"/>
      <!--  <el-table-column prop="organizationid" :label="this.$t('tobacco.basic.price.organizationId')" width="100"
                         show-overflow-tooltip/>-->
        <el-table-column prop="organizationname" :label="this.$t('tobacco.basic.price.organizationName')" width="150"
                         show-overflow-tooltip/>
        <el-table-column prop="type" :label="this.$t('tobacco.basic.price.typeId')"/>
        <el-table-column prop="variety" :label="this.$t('tobacco.basic.price.varietyId')"/>
        <el-table-column prop="gradename" :label="this.$t('tobacco.basic.price.gradeName')"/>
        <el-table-column prop="gradeid" :label="this.$t('tobacco.basic.price.gradeId')"/>
        <el-table-column prop="gradecode" :label="this.$t('tobacco.basic.price.gradeCode')"/>
        <el-table-column prop="pay" :label="this.$t('tobacco.basic.price.payId')"/>
        <el-table-column prop="area" :label="this.$t('tobacco.basic.price.areaId')"/>
        <el-table-column prop="status" :label="this.$t('tobacco.basic.price.statusId')"/>
        <el-table-column prop="supportfee" :label="this.$t('tobacco.basic.price.supportFee')"/>
        <el-table-column prop="subsidy" :label="this.$t('tobacco.basic.price.subsidy')"/>
        <!--<el-table-column prop="tax" :label="this.$t('tobacco.basic.price.tax')"/>-->
        <el-table-column prop="total" :label="this.$t('tobacco.basic.price.total')"/>
        <!--<el-table-column prop="control" :label="this.$t('tobacco.basic.price.control')"/>
        <el-table-column prop="visible" :label="this.$t('tobacco.basic.price.visible')"/>
        <el-table-column prop="desc" :label="this.$t('tobacco.basic.price.desc')"/>-->

        <el-table-column
          fixed="right"
          :label="$t('base.titleOperation')"
          width="100">
          <template slot-scope="scope">
            <el-button @click="editButtonClick(scope.row,false)" type="text" size="small"
                       :disabled="checkDisabled(scope.row)">{{$t('base.buttonView')}}
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
  const typeVarietySelect = () =>
    import('@/components/Tobacco/typeVarietySelect');

  import AddForm from './priceAdd.vue';
  import EditForm from './priceEdit.vue';
  import priceApi from '../../api/basic/api_price';

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
          typeId: '',
          annual: '',
          varietyId: '',
          'organizationId': this.$store.state.user.organization.organizationId,
        },
        formData: {
          priceList: [],
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
      this.searchData.annual = new Date().getFullYear().toString();
      this.onSearchButtonClick();
    },
    components: {
      'add-form': AddForm,
      'edit-form': EditForm,
      typeVarietySelect,
    },
    methods: {
      checkDisabled(row) {
        if (row.organizationid.slice(0, 4) === this.searchData.organizationId.slice(0, 4)) {
          return false;
        } else {
          return true;
        }
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

        Promise.all([priceApi.deletePrice(this.formData.selectRow.id)])
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
        Promise.all([priceApi.getPriceJson({
          organizationId: this.searchData.organizationId,
          annual: this.searchData.annual,
          varietyId: this.searchData.varietyId,
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
        })])
          .then(([response]) => {
            this.formData.priceList = response.content;
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
        this.formData.pagination.currentPage = index;
        this.onSearchButtonClick();
      },
      onPageSizeChange(size) {
        this.formData.pagination.pageSize = size;
        this.onSearchButtonClick();
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
