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
              v-model="searchData.businessYear"
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
            <el-form-item :label="$t('tobacco.tsell.invoice.statusName')">
              <status-select :lable.sync="searchData.statusName" :value.sync="searchData.statusId"
                             :key.sync="searchData.statusId" style="width:185px;"/>
            </el-form-item>
            <el-form-item :label="$t('tobacco.tsell.invoice.typeName')">
              <type-variety-select :typeId.sync="searchData.typeId" :typeName.sync="searchData.typeName"
                                   :varietyId.sync="searchData.varietyId" :varietyName.sync="searchData.varietyName"
                                   style="width:450px;"/>
            </el-form-item>
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
        :data="formData.standWeightSetList"
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="organization.organizationName" :label="this.$t('org.organizationName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="tobaccoYear" :label="this.$t('tobacco.tstorage.standWeightSet.tobaccoYear')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="businessYear" :label="this.$t('tobacco.tstorage.standWeightSet.businessYear')"/>
        <el-table-column prop="typeName" :label="this.$t('tobacco.tstorage.standWeightSet.typeName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="statusName" :label="this.$t('tobacco.tstorage.standWeightSet.statusName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="varietyName" :label="this.$t('tobacco.tstorage.standWeightSet.varietyName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="rankName" :label="this.$t('tobacco.tstorage.standWeightSet.rankName')" width="130"
                         show-overflow-tooltip/>
        <el-table-column prop="gradeName" :label="this.$t('tobacco.tstorage.standWeightSet.gradeName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="weight" :label="this.$t('tobacco.tstorage.standWeightSet.weight')"/>
        <el-table-column prop="upperWeight" :label="this.$t('tobacco.tstorage.standWeightSet.upperWeight')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="lowerWeight" :label="this.$t('tobacco.tstorage.standWeightSet.lowerWeight')"/>
        <el-table-column prop="desc" :label="this.$t('tobacco.tstorage.standWeightSet.desc')" width="100"
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
  const AddForm = () => import('./standWeightSetAdd.vue');
  const EditForm = () => import('./standWeightSetEdit.vue');
  const typeVarietySelect = () =>
    import('@/components/Tobacco/typeVarietySelect');
  const statusSelect = () => import('../components/statusSelect');
  const OrganizationForm = () => import('@/components/Organization');

  import standWeightSetApi from '../../api/tstorage/api_standWeightSet';

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
          'tobaccoYear': '',
          'businessYear': '',
          'typeId': '',
          'typeName': '',
          'statusId': '',
          'statusName': '',
          'varietyId': '',
          'varietyName': '',
          'rankId': '',
          'rankName': '',
          'gradeId': '',
          'gradeCode': '',
          'gradeName': '',
          'weight': '',
          'desc': '',
          'upperWeight': '',
          'lowerWeight': '',
        },
        formData: {
          standWeightSetList: [],
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
      this.searchData.businessYear = new Date().getFullYear().toString();
      this.onSearchButtonClick();

    },
    components: {
      'add-form': AddForm,
      'edit-form': EditForm,
      typeVarietySelect,
      statusSelect,
      OrganizationForm
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

        Promise.all([standWeightSetApi.deleteStandWeightSet(this.formData.selectRow.id)])
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
        Promise.all([standWeightSetApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          sort: 'id,ASC',
          contains: 'weight,desc,:{keyword}:true'.format({keyword: this.formData.pagination.keyword}),
          search: 'organization.organizationId:rlike:{orgid};tobaccoYear:EQ:{tobaccoYear};businessYear:EQ:{businessYear};typeId:EQ:{typeId};typeName:EQ:{typeName};statusId:EQ:{statusId};statusName:EQ:{statusName};varietyId:EQ:{varietyId};varietyName:EQ:{varietyName};gradeId:EQ:{gradeId};gradeCode:EQ:{gradeCode};gradeName:EQ:{gradeName};weight:EQ:{weight};'.format({
            orgid: this.searchData.organizationId,
            tobaccoYear: this.searchData.tobaccoYear,
            businessYear: this.searchData.businessYear,
            typeId: this.searchData.typeId,
            typeName: this.searchData.typeName,
            statusId: this.searchData.statusId,
            statusName: this.searchData.statusName,
            varietyId: this.searchData.varietyId,
            varietyName: this.searchData.varietyName,
            rankId: this.searchData.rankId,
            rankName: this.searchData.rankName,
            gradeId: this.searchData.gradeId,
            gradeCode: this.searchData.gradeCode,
            gradeName: this.searchData.gradeName,
            weight: this.searchData.weight,
            desc: this.searchData.desc,
            upperWeight: this.searchData.upperWeight,
            lowerWeight: this.searchData.lowerWeight,
          })
        })])
          .then(([response]) => {
            this.formData.standWeightSetList = response.content;
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
