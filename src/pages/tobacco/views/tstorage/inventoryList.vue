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
          <el-form-item :label="$t('tobacco.tstorage.inventory.annual')">
            <el-date-picker
              value-format="yyyy"
              v-model="searchData.annual"
              type="year"
              :placeholder="$t('base.pleaseSelect')">
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('base.keywords')">
            <el-input v-bind:placeholder="$t('base.ipKeywords')"
                      v-model="formData.pagination.keyword" @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <template v-if='expand'>
            <el-row>
              <el-form-item :label="$t('tobacco.tsell.invoice.typeName')">
                <type-variety-grade-select :varietyName.sync="searchData.varietyName"
                                           :varietyId.sync="searchData.varietyId"
                                           :typeId.sync="searchData.typeId" :typeName.sync="searchData.typeName"
                                           :gradeId.sync="searchData.gradeId" :gradeName.sync="searchData.gradeName"
                                           :gradeCode.sync="searchData.gradeCode" style="width:100%;"/>
              </el-form-item>
              <el-form-item :label="$t('tobacco.tsell.invoice.statusName')">
                <status-select :lable.sync="searchData.statusName" :value.sync="searchData.statusId"
                               :key.sync="searchData.statusId" style="width:185px;"/>
              </el-form-item>
            </el-row>
          </template>
        </el-form>
      </div>
      <div class='toolButton' style="min-width: 350px">
        <el-button-group>
          <el-button type='primary' @click='onExpandClick'>{{ $t('base.buttonFilter') }}</el-button>
          <el-button type='primary' @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }}</el-button>
          <el-button type='primary' @click='childForm.addForm=true'>{{ $t('base.buttonAdd') }}</el-button>
          <el-button type='primary' @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }}</el-button>
          <el-button type='primary' @click='packgeAll'>批量打包</el-button>
        </el-button-group>
      </div>
    </div>
    <main class='contentPanel'>
      <el-table
        highlight-current-row
        border
        @current-change="handleCurrentChange"
        :data="formData.inventoryList"
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-row>
              <el-col :span="18">
                <el-table
                  highlight-current-row
                  border
                  :data="props.row.detailList"
                  style="width: 100%"
                  :row-class-name="tableRowClassName">
                  <el-table-column prop="detailId" :label="$t('tobacco.tstorage.inventoryDetail.detailId')"
                                   min-width="100"
                                   show-overflow-tooltip/>
                  <el-table-column prop="title" :label="$t('tobacco.tstorage.inventoryDetail.title')" min-width="100"
                                   show-overflow-tooltip/>
                  <!--<el-table-column prop="countryId" :label="$t('tobacco.tstorage.inventoryDetail.countryId')"/>-->
                  <el-table-column prop="countryName" :label="$t('tobacco.tstorage.inventoryDetail.countryName')"/>
                  <el-table-column prop="contractId" :label="$t('tobacco.tstorage.inventoryDetail.contractId')"
                                   min-width="200" show-overflow-tooltip/>
                  <el-table-column prop="contractNumber"
                                   :label="$t('tobacco.tstorage.inventoryDetail.contractNumber')" min-width="100"
                                   show-overflow-tooltip/>
                  <el-table-column prop="contractCard" :label="$t('tobacco.tstorage.inventoryDetail.contractCard')"
                                   min-width="100"
                                   show-overflow-tooltip/>
                  <el-table-column prop="farmerId" :label="$t('tobacco.tstorage.inventoryDetail.farmerId')"
                                   min-width="200"
                                   show-overflow-tooltip/>
                  <el-table-column prop="farmerNumber" :label="$t('tobacco.tstorage.inventoryDetail.farmerNumber')"
                                   min-width="100"
                                   show-overflow-tooltip/>
                  <el-table-column prop="farmerName" :label="$t('tobacco.tstorage.inventoryDetail.farmerName')"
                                   min-width="100"
                                   show-overflow-tooltip/>
                  <el-table-column prop="farmerIdentity"
                                   :label="$t('tobacco.tstorage.inventoryDetail.farmerIdentity')" min-width="100"
                                   show-overflow-tooltip/>
                  <el-table-column prop="unpackWeight" :label="$t('tobacco.tstorage.inventoryDetail.unpackWeight')"/>
                  <el-table-column prop="weight" :label="$t('tobacco.tstorage.inventoryDetail.weight')"/>
                  <el-table-column prop="basket" :label="$t('tobacco.tstorage.inventoryDetail.basket')" min-width="100"
                                   show-overflow-tooltip/>
                  <el-table-column prop="content" :label="$t('tobacco.tstorage.inventoryDetail.content')"
                                   min-width="100"
                                   show-overflow-tooltip/>
                  <el-table-column prop="desc" :label="$t('tobacco.tstorage.inventoryDetail.desc')" min-width="100"
                                   show-overflow-tooltip/>
                </el-table>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="organization.organizationName" :label="this.$t('org.organizationName')" width="100"
                         show-overflow-tooltip/>

        <el-table-column prop="annual" :label="this.$t('tobacco.tstorage.inventory.annual')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="serial" :label="this.$t('tobacco.tstorage.inventory.serial')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="barcode" :label="this.$t('tobacco.tstorage.inventory.barcode')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="number" :label="this.$t('tobacco.tstorage.inventory.number')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="title" :label="this.$t('tobacco.tstorage.inventory.title')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="author" :label="this.$t('tobacco.tstorage.inventory.author')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="date" :label="this.$t('tobacco.tstorage.inventory.date')" width="100"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            {{dateFormat(scope.row.date,'yyyy-mm-dd')}}
          </template>
        </el-table-column>
        <el-table-column prop="countryName" :label="this.$t('tobacco.tstorage.inventory.countryName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="typeName" :label="this.$t('tobacco.tstorage.inventory.typeName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="year" :label="this.$t('tobacco.tstorage.inventory.year')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="farmerName" :label="this.$t('tobacco.tstorage.inventory.farmerName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="year" :label="this.$t('tobacco.tstorage.inventory.year')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="printTimes" :label="this.$t('tobacco.tstorage.inventory.printTimes')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="statusName" :label="this.$t('tobacco.tstorage.inventory.statusName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="varietyName" :label="this.$t('tobacco.tstorage.inventory.varietyName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="rankName" :label="this.$t('tobacco.tstorage.inventory.rankName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="gradeName" :label="this.$t('tobacco.tstorage.inventory.gradeName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="standard" :label="this.$t('tobacco.tstorage.inventory.standard')" width="100"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <el-switch v-model="scope.row.standard" disabled></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="weight" :label="this.$t('tobacco.tstorage.inventory.weight')"/>
        <el-table-column prop="picture" :label="this.$t('tobacco.tstorage.inventory.picture')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="control" :label="this.$t('tobacco.tstorage.inventory.control')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="desc" :label="this.$t('tobacco.tstorage.inventory.desc')"/>
        <el-table-column
          fixed="right"
          :label="$t('base.titleOperation')"
          width="100">
          <template slot-scope="scope">
            <!-- <el-button @click="addDetailButtonClick(scope.row,false)" type="text" size="small">添加明细
             </el-button>-->
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
      <el-dialog title="添加明细" :visible.sync="childForm.detailForm" top="10px" width="50%"
                 :before-close="handleClose">
        <detail-form :item.sync="formData.viewSelect"/>
      </el-dialog>
      <el-dialog :title="$t('base.buttonAdd')" :visible.sync="childForm.addForm" top="10px" width="70%"
                 :before-close="handleClose">
        <add-form/>
      </el-dialog>
      <el-dialog :title="$t('base.buttonEdit')" :visible.sync="childForm.editForm" top="10px" width="70%"
                 :before-close="handleClose">
        <edit-form :item.sync=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.editForm"
                   @refresh="onSearchButtonClick"
        />
      </el-dialog>
      <el-dialog :title="$t('base.buttonView')" :visible.sync="childForm.viewForm" top="10px" width="70%"
                 :before-close="handleClose">
        <edit-form :item=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.viewForm"/>
      </el-dialog>
      <el-dialog title="批量打包" :visible.sync="childForm.packageForm" top="10px" width="50%"
                 :before-close="handleClose">
        <package-form  :visible.sync="childForm.packageForm"/>
      </el-dialog>
    </template>
  </div>
</template>
<script>
  const AddForm = () => import('./inventoryAdd.vue');
  const EditForm = () => import('./inventoryEdit.vue');
  const DetailForm = () => import('./inventoryDetailAdd.vue');
  const PackageForm = () => import('./inventory_package.vue');
  const OrganizationForm = () => import('@/components/Organization');
  const typeVarietySelect = () => import('@/components/Tobacco/typeVarietySelect');
  const statusSelect = () => import('../components/statusSelect');
  const typeVarietyGradeSelect = () => import('@/components/Tobacco/typeVarietyGradeSelect');

  import inventoryApi from '../../api/tstorage/api_inventory';

  export default {
    data() {
      return {
        expand: false,
        childForm: {
          addForm: false,
          editForm: false,
          viewForm: false,
          detailForm: false,
          isEdit: false,
          packageForm: false,
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
          'barcode': '',
          'number': '',
          'title': '',
          'author': '',
          'date': '',
          'countryId': '',
          'countryName': '',
          'year': '',
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
          'standard': true,
          'weight': '',
          'picture': '',
          'control': '',
          'desc': '',
        },
        formData: {
          inventoryList: [],
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
      'detail-form': DetailForm,
      'package-form': PackageForm,
      OrganizationForm,
      typeVarietySelect,
      statusSelect,
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
      packgeAll() {
        this.childForm.packageForm = true;
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
      addDetailButtonClick(selectRow) {
        this.formData.viewSelect = selectRow;
        this.childForm.detailForm = true;
      },
      deleteButtonClick() {
        if (this.formData.selectRow === null || this.formData.selectRow === undefined) {
          this.$message({
            message: this.$t('message.unSelectAny'),
            type: 'info',
          });
          return;
        }

        Promise.all([inventoryApi.deleteInventory(this.formData.selectRow.id)])
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
        Promise.all([inventoryApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          contains: 'annual,serial,barcode,number,title,author,date,countryId,countryName,year,typeId,typeName,statusId,statusName,varietyId,varietyName,rankId,rankName,gradeId,gradeCode,gradeName,standard,weight,picture,control,desc,:{keyword}:true'.format({keyword: this.formData.pagination.keyword}),
          search: 'organization.organizationId:rlike:{orgid};annual:EQ:{annual};serial:EQ:{serial};barcode:EQ:{barcode};number:EQ:{number};title:EQ:{title};author:EQ:{author};date:EQ:{date};countryId:EQ:{countryId};countryName:EQ:{countryName};year:EQ:{year};typeId:EQ:{typeId};typeName:EQ:{typeName};statusId:EQ:{statusId};statusName:EQ:{statusName};varietyId:EQ:{varietyId};varietyName:EQ:{varietyName};rankId:EQ:{rankId};rankName:EQ:{rankName};gradeId:EQ:{gradeId};gradeCode:EQ:{gradeCode};gradeName:EQ:{gradeName};weight:EQ:{weight};picture:EQ:{picture};control:EQ:{control};desc:EQ:{desc};'.format({
            orgid: this.searchData.organizationId,
            annual: this.searchData.annual,
            serial: this.searchData.serial,
            barcode: this.searchData.barcode,
            number: this.searchData.number,
            title: this.searchData.title,
            author: this.searchData.author,
            date: this.searchData.date,
            countryId: this.searchData.countryId,
            countryName: this.searchData.countryName,
            year: this.searchData.year,
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
            standard: this.searchData.standard,
            weight: this.searchData.weight,
            picture: this.searchData.picture,
            control: this.searchData.control,
            desc: this.searchData.desc,
          })
        })])
          .then(([response]) => {
            this.formData.inventoryList = response.content;
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
