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
          <el-form-item :label="$t('tobacco.tstorage.stock.accountSet')">
            <el-select v-model="searchData.booksId" clearable>
              <el-option v-for="item in formData.bookList"
                         :key="item.id"
                         :value="item.id"
                         :label="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('base.keywords')">
            <el-input v-bind:placeholder="$t('base.ipKeywords')"
                      v-model="formData.pagination.keyword" @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-row>
            <template v-if='expand'>
              <el-form-item :label="this.$t('tobacco.tstorage.region.whouseId')">
                <el-select v-model="searchData.warehouse" clearable @change="getRegion">
                  <el-option v-for="item in formData.whouseList"
                             :value="item.id"
                             :label="item.name"
                             :key="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('tobacco.tstorage.facility.regionId')">
                <el-select v-model="searchData.region" clearable @change="getStack()">
                  <el-option v-for="item in formData.regionList"
                             :value="item.id"
                             :label="item.title"
                             :key="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('tobacco.tstorage.stack.stackId')" prop="stack">
                <el-select v-model="formItem.stack" clearable style="width: 100%;">
                  <el-option v-for="item in formData.stackList"
                             :value="item.id"
                             :label="item.name"
                             :key="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('tobacco.tsell.invoice.statusName')">
                <status-select :label.sync="searchData.statusName" :value.sync="searchData.statusId"
                               :key.sync="searchData.statusId"
                               style="width:100%;"/>
              </el-form-item>

              <el-form-item :label="$t('tobacco.tsell.invoice.typeName')">
                <type-variety-grade-select :varietyName.sync="searchData.varietyName"
                                           :varietyId.sync="searchData.varietyId"
                                           :typeId.sync="searchData.typeId" :typeName.sync="searchData.typeName"
                                           :gradeId.sync="searchData.gradeId" :gradeName.sync="searchData.gradeName"
                                           :gradeCode.sync="searchData.gradeCode" style="width:100%;"/>
              </el-form-item>
            </template>
          </el-row>
        </el-form>
      </div>
      <div class='toolButton' style="min-width: 260px">
        <el-button-group>
          <el-button type='primary' @click='onExpandClick'>{{ $t('base.buttonFilter') }}</el-button>
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
        :data="formData.stockList"
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="organization.organizationName" :label="this.$t('org.organizationName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="booksId" :label="this.$t('tobacco.tstorage.stock.accountSet')" width="100"
                         show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{formatBooksId(scope.row.booksId)}}
          </template>
        </el-table-column>
        <el-table-column prop="warehouse.name" :label="this.$t('tobacco.tstorage.facility.whouseid')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="region.title" :label="this.$t('tobacco.tstorage.facility.regionId')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="stack.name" label="垛位" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="annual" :label="this.$t('tobacco.tstorage.stock.annual')"/>
        <el-table-column prop="serial" :label="this.$t('tobacco.tstorage.stock.serial')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="year" :label="this.$t('tobacco.tstorage.stock.year')"/>
        <el-table-column prop="month" :label="this.$t('tobacco.tstorage.stock.month')"/>
        <!-- <el-table-column prop="countryName" :label="this.$t('tobacco.tstorage.stock.countryName')" width="100"
                          show-overflow-tooltip/>
         <el-table-column prop="tobaccoYear" :label="this.$t('tobacco.tstorage.stock.tobaccoYear')"/>-->
        <el-table-column prop="typeName" :label="this.$t('tobacco.tstorage.stock.typeName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="statusName" :label="this.$t('tobacco.tstorage.stock.statusName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="varietyName" :label="this.$t('tobacco.tstorage.stock.varietyName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="rankName" :label="this.$t('tobacco.tstorage.stock.rankName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="gradeName" :label="this.$t('tobacco.tstorage.stock.gradeName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="standard" :label="this.$t('tobacco.tstorage.stock.standard')">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.standard" disabled></el-switch>
          </template>

        </el-table-column>
        <el-table-column prop="amount" :label="this.$t('tobacco.tstorage.stock.amount')" width="100"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="weight" :label="this.$t('tobacco.tstorage.stock.weight')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="desc" :label="this.$t('tobacco.tstorage.stock.desc')" width="100" show-overflow-tooltip/>
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
  const AddForm = () => import('./stockAdd.vue');
  const EditForm = () => import('./stockEdit.vue');
  const OrganizationForm = () => import('@/components/Organization');
  const typeSelect = () => import('@/components/Tobacco/typeSelect');
  const statusSelect = () => import('../components/statusSelect');
  const rankSelect = () => import('../components/rankSelect');
  const varietySelect = () => import('@/components/Tobacco/varietySelect');
  const typeVarietySelect = () => import('@/components/Tobacco/typeVarietySelect');
  const typeGradeSelect = () => import('@/components/Tobacco/typeGradeSelect');
  const typeVarietyGradeSelect = () => import('@/components/Tobacco/typeVarietyGradeSelect');

  import stockApi from '../../api/tstorage/api_stock';
  import warehouseApi from '../../api/tstorage/api_warehouse';
  import regionApi from '../../api/tstorage/api_region';
  import booksApi from '../../api/tstorage/api_books';
  import stackApi from '../../api/tstorage/api_stack';

  export default {
    data() {
      return {
        expand: false,
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
          'acountSet': '',
          'organizationId': this.$store.state.user.organization.organizationId,
          'warehouse': '',
          'region': '',
          'annual': 0,
          'serial': '',
          'year': 0,
          'month': 0,
          'countryId': '',
          'countryName': '',
          'typeId': '',
          'typeName': '',
          'statusId': '',
          'tobaccoYear': '',
          'statusName': '',
          'varietyId': '',
          'varietyName': '',
          'rankId': '',
          'rankName': '',
          'gradeId': '',
          'gradeCode': '',
          'gradeName': '',
          'standard': true,
          'amount': 0,
          'weight': 0,
          'desc': '',
          'booksId': '',
        },
        formData: {
          stockList: [],
          bookList: [],
          bookList_format: {},
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
      //获取账套数据
      Promise.all([booksApi.getAll({
        size: 500,
        sort: 'name',
        search: 'organization.organizationId:rlike:{orgid};'.format({
          orgid: this.searchData.organizationId,
        })
      })])
        .then(([response]) => {
          this.formData.bookList = response.content;
          let obj = {};
          this.formData.bookList.forEach((item) => {
            obj[item.id] = item.name;
          });
          this.formData.bookList_format = obj;
          this.onSearchButtonClick();
        })
        .catch(error => {
        });

      this.getWhouse();
    },
    components: {
      'add-form': AddForm,
      'edit-form': EditForm,
      OrganizationForm,
      typeGradeSelect,
      typeSelect,
      varietySelect,
      typeVarietySelect,
      statusSelect,
      rankSelect,
      'type-grade-select': typeGradeSelect,
      typeVarietyGradeSelect

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
      //格式化账套显示
      formatBooksId(id) {
        if (id !== '' && id !== null) {
          return this.formData.bookList_format[id];
        }
      },
      getWhouse() {
        Promise.all([warehouseApi.getAll({
          sort: 'name',
          search: 'organization.organizationId:rlike:{orgid};'.format({
            orgid: this.$store.state.user.organization.organizationId,
          })
        })])
          .then(([response]) => {
            this.formData.whouseList = response.content;
          })
          .catch(error => {
          });
      },
      getRegion() {
        this.searchData.region = '';
        Promise.all([regionApi.getAll({
          sort: 'title',
          search: 'warehouse.id:EQ:{warehouse};'.format({
            warehouse: this.searchData.warehouse,
          })
        })])
          .then(([response]) => {
            this.formData.regionList = response.content;
          })
          .catch(error => {
          });
      },
      getStack() {
        this.searchData.stack = '';
        Promise.all([stackApi.getAll({
          sort: 'name',
          size: 500,
          search: 'region.id:EQ:{region};'.format({
            region: this.formItem.region,
          })
        })])
          .then(([response]) => {
            this.formData.stackList = response.content;
          })
          .catch(error => {
          });
      },
      onExpandClick() {
        this.expand = !this.expand;
        if (this.expand) {
          this.expandIcon = 'el-icon-arrow-down';
        } else {
          this.expandIcon = 'el-icon-arrow-left';
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
      deleteButtonClick() {
        if (this.formData.selectRow === null || this.formData.selectRow === undefined) {
          this.$message({
            message: this.$t('message.unSelectAny'),
            type: 'info',
          });
          return;
        }

        Promise.all([stockApi.deleteStock(this.formData.selectRow.id)])
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
        Promise.all([stockApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          sort: 'serial,ASC',
          contains: 'annual,serial,year,month,countryName,year,typeId,typeName,statusId,statusName,varietyId,varietyName,rankId,rankName,gradeId,gradeCode,gradeName,standard,amount,weight,desc,:{keyword}:true'.format({keyword: this.formData.pagination.keyword}),
          search: 'organization.organizationId:rlike:{orgid};typeId:EQ:{typeId};typeName:EQ:{typeName};statusId:EQ:{statusId};statusName:EQ:{statusName};varietyId:EQ:{varietyId};varietyName:EQ:{varietyName};gradeId:EQ:{gradeId};gradeCode:EQ:{gradeCode};gradeName:EQ:{gradeName};booksId:EQ:{booksId};'.format({
            orgid: this.searchData.organizationId,
            typeId: this.searchData.typeId,
            typeName: this.searchData.typeName,
            statusId: this.searchData.statusId,
            statusName: this.searchData.statusName,
            varietyId: this.searchData.varietyId,
            varietyName: this.searchData.varietyName,
            gradeId: this.searchData.gradeId,
            gradeCode: this.searchData.gradeCode,
            gradeName: this.searchData.gradeName,
            booksId: this.searchData.booksId,
          })
        })])
          .then(([response]) => {
            this.formData.stockList = response.content;
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
