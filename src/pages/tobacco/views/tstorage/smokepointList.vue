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
          <el-form-item :label="$t('tobacco.tstorage.standWeightSet.businessYear')">
            <el-date-picker
              value-format="yyyy"
              v-model="searchData.tyear"
              type="year"
              :placeholder="$t('base.pleaseSelect')"
              style="width: 207px">
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('base.keywords')">
            <el-input v-bind:placeholder="$t('base.ipKeywords')"
                      v-model="formData.pagination.keyword" @keyup.enter.native="onSearchButtonClick"
                      style="width: 174px"/>
          </el-form-item>
          <template v-if='expand'>
            <el-form-item label="烟叶等级">
              <type-grade-select
                :gradeId.sync="searchData.gradeid" :gradeName.sync="searchData.gradename"
                :gradeCode.sync="searchData.gradecode"
                style="width: 100%;">
              </type-grade-select>
            </el-form-item>
<!--
            <el-form-item :label="$t('tobacco.tsell.invoice.statusName')">
              <status-select :lable.sync="searchData.tstatusName" :value.sync="searchData.tstatusId"
                             :key.sync="searchData.tstatusId" style="width:185px;"/>
            </el-form-item>
            <el-form-item :label="$t('tobacco.tsell.invoice.typeName')">
              <type-variety-select :typeId.sync="searchData.ttypeId" :typeName.sync="searchData.ttypeName"
                                   :varietyId.sync="searchData.tvarietyId" :varietyName.sync="searchData.tvarietyName"
                                   style="width:450px;"/>
            </el-form-item>
-->
          </template>
        </el-form>
      </div>
      <div class='toolButton' style="min-width: 280px">
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
        :data="formData.smokepointList"
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="organization.organizationName" :label="this.$t('org.organizationName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="annual" :label="this.$t('tobacco.tstorage.smokepoint.annual')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="serial" :label="this.$t('tobacco.tstorage.smokepoint.serial')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="title" :label="this.$t('tobacco.tstorage.smokepoint.title')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="author" :label="this.$t('tobacco.tstorage.smokepoint.author')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="date" :label="this.$t('tobacco.tstorage.smokepoint.date')" width="100"
                         show-overflow-tooltip/>
       <!-- <el-table-column prop="operation" :label="this.$t('tobacco.tstorage.smokepoint.operation')" width="100"
                         show-overflow-tooltip/>-->
        <!-- <el-table-column prop="countryId" :label="this.$t('tobacco.tstorage.smokepoint.countryId')"width="100"
                          show-overflow-tooltip/>
         <el-table-column prop="countryName" :label="this.$t('tobacco.tstorage.smokepoint.countryName')"width="100"
                          show-overflow-tooltip/>-->
        <el-table-column prop="tyear" :label="this.$t('tobacco.tstorage.smokepoint.tyear')" width="100"
                         show-overflow-tooltip/>

        <el-table-column prop="ttypeName" :label="this.$t('tobacco.tstorage.smokepoint.ttypeName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="tstatusName" :label="this.$t('tobacco.tstorage.smokepoint.tstatusName')" width="100"
                         show-overflow-tooltip/>

        <el-table-column prop="tvarietyName" :label="this.$t('tobacco.tstorage.smokepoint.tvarietyName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="trankName" :label="this.$t('tobacco.tstorage.smokepoint.trankName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="tgradeName" :label="this.$t('tobacco.tstorage.smokepoint.tgradeName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="standard" :label="this.$t('tobacco.tstorage.smokepoint.standard')">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.standard" disabled></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="amount" :label="this.$t('tobacco.tstorage.smokepoint.amount')"/>
        <el-table-column prop="weight" :label="this.$t('tobacco.tstorage.smokepoint.weight')"/>
        <el-table-column prop="control.name" :label="this.$t('tobacco.tstorage.smokepoint.control')"/>
        <el-table-column prop="desc" :label="this.$t('tobacco.tstorage.smokepoint.desc')" width="100"
                         show-overflow-tooltip/>
        <!--<el-table-column prop="type" :label="this.$t('tobacco.tstorage.smokepoint.type')" width="100"
                         show-overflow-tooltip/>-->
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
  const AddForm = () => import('./smokepointAdd.vue');
  const EditForm = () => import('./smokepointEdit.vue');
  const OrganizationForm = () => import('@/components/Organization');
  const typeVarietySelect = () =>
    import('@/components/Tobacco/typeVarietySelect');
  const statusSelect = () => import('../components/statusSelect');
  const rankSelect = () => import('../components/rankSelect');

  import smokepointApi from '../../api/tstorage/api_smokepoint';

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
          'organizationId': this.$store.state.user.organization.organizationId,
          'annual': '',
          'serial': '',
          'title': '',
          'author': '',
          'date': '',
          'operation': '',
          'countryId': '',
          'countryName': '',
          'tyear': '',
          'ttypeId': '',
          'ttypeName': '',
          'tstatusId': '',
          'tstatusName': '',
          'tvarietyId': '',
          'tvarietyName': '',
          'trankId': '',
          'trankName': '',
          'tgradeId': '',
          'tgradeName': '',
          'tgradeCode': '',
          'standard': '',
          'amount': '',
          'weight': '',
          'control': '',
          'desc': '',
          'type': -1,
        },
        formData: {
          smokepointList: [],
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
      this.searchData.tyear = new Date().getFullYear().toString();
      this.onSearchButtonClick();
    },
    components: {
      'add-form': AddForm,
      'edit-form': EditForm,
      typeVarietySelect,
      statusSelect,
      OrganizationForm,
      rankSelect
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
      organizationOnchange(label, value, values) {
        this.searchData.organizationId = value;
        this.searchData.organizationCode = value;
        this.searchData.organizationName = label;
        this.searchData.organizationOrder = '0';
      },
      onExpandClick() {
        this.expand = !this.expand;
        if (this.expand) {
          this.expandIcon = 'el-icon-arrow-down';
        } else {
          this.expandIcon = 'el-icon-arrow-left';
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

        Promise.all([smokepointApi.deleteSmokepoint(this.formData.selectRow.id)])
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
        Promise.all([smokepointApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          contains: 'annual,serial,title,author,date,operation,countryId,countryName,tyear,ttypeId,ttypeName,tstatusId,tstatusName,tvarietyId,tvarietyName,trankId,trankName,tgradeId,tgradeName,tgradeCode,standard,amount,weight,control,desc,:{keyword}:true'.format({keyword: this.formData.pagination.keyword}),
          search: 'organization.organizationId:rlike:{orgid};annual:EQ:{annual};serial:EQ:{serial};tyear:EQ:{tyear};ttypeId:EQ:{ttypeId};ttypeName:EQ:{ttypeName};tstatusId:EQ:{tstatusId};tstatusName:EQ:{tstatusName};tvarietyId:EQ:{tvarietyId};tvarietyName:EQ:{tvarietyName};trankId:EQ:{trankId};trankName:EQ:{trankName};tgradeId:EQ:{tgradeId};tgradeName:EQ:{tgradeName};tgradeCode:EQ:{tgradeCode};type:EQ:{type};'.format({
            orgid: this.searchData.organizationId,
            annual: this.searchData.annual,
            serial: this.searchData.serial,
            title: this.searchData.title,
            author: this.searchData.author,
            date: this.searchData.date,
            operation: this.searchData.operation,
            countryId: this.searchData.countryId,
            countryName: this.searchData.countryName,
            tyear: this.searchData.tyear,
            ttypeId: this.searchData.ttypeId,
            ttypeName: this.searchData.ttypeName,
            tstatusId: this.searchData.tstatusId,
            tstatusName: this.searchData.tstatusName,
            tvarietyId: this.searchData.tvarietyId,
            tvarietyName: this.searchData.tvarietyName,
            trankId: this.searchData.trankId,
            trankName: this.searchData.trankName,
            tgradeId: this.searchData.tgradeId,
            tgradeName: this.searchData.tgradeName,
            tgradeCode: this.searchData.tgradeCode,
            standard: this.searchData.standard,
            amount: this.searchData.amount,
            weight: this.searchData.weight,
            control: this.searchData.control,
            type: this.searchData.type,
          })
        })])
          .then(([response]) => {
            this.formData.smokepointList = response.content;
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
