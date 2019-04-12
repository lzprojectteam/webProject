<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-form-item :label="$t('tobacco.common.organization')">
            <organization-form :root="userOrgId" @onchange="organizationOnchange"/>
          </el-form-item>
          <el-form-item :label="$t('tobacco.common.type')">
            <type-select style="width:150px"/>
          </el-form-item>
          <el-form-item :label="$t('tobacco.common.annual')">
            <el-date-picker v-model="searchData.annual" value-format="yyyy" type="year"
                            :placeholder="$t('tobacco.common.selectAnnual')" style="width:150px">
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('base.keywords')">
            <el-input v-bind:placeholder="$t('base.ipKeywords')" v-model="formData.pagination.keyword"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <template v-if='expand'>
            <el-form-item :label="$t('tobacco.tsell.appointment.beginDate')">
              <el-date-picker v-model="searchData.beginDate" type="date" value-format="yyyyMMddHHmmss"
                              :placeholder="$t('base.pleaseSelect')">
              </el-date-picker>
            </el-form-item>
            <el-form-item :label="$t('tobacco.tsell.appointment.endDate')">
              <el-date-picker v-model="searchData.endDate" type="date" value-format="yyyyMMddHHmmss"
                              :placeholder="$t('base.pleaseSelect')">
              </el-date-picker>
            </el-form-item>
          </template>
        </el-form>
      </div>
      <div class='toolButton' style="min-width: 240px">
        <el-button-group>
          <el-button type='primary' @click='onExpandClick'>{{ $t('base.buttonFilter') }}</el-button>
          <el-button type='primary' @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }}</el-button>
          <el-button type='primary' @click='childForm.addForm=true'>{{ $t('base.buttonAdd') }}</el-button>
          <el-button type='danger' @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }}</el-button>
        </el-button-group>
      </div>
    </div>
    <main class='contentPanel'>
      <el-table highlight-current-row border show-summary stripe :summary-method="getSummaries"
                @current-change="handleCurrentChange" :data="formData.appointmentList" style="width: 100%"
                :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="organization.organizationName" :label="this.$t('tobacco.common.organization')"
                         width="160"/>
        <el-table-column prop="organization.districtName" :label="this.$t('tobacco.common.district')" width="200"/>
        <el-table-column prop="title" :label="this.$t('tobacco.tsell.appointment.title')"/>
        <el-table-column prop="date" :label="this.$t('tobacco.tsell.appointment.date')" width="100px">
          <template slot-scope="scope">
            {{dateFormat(scope.row.date,'yyyy-mm-dd')}}
          </template>
        </el-table-column>
        <el-table-column prop="contractNumber" :label="this.$t('tobacco.tsell.appointment.contractNumber')"
                         min-width="160px"/>
        <el-table-column prop="farmerName" :label="this.$t('tobacco.tsell.appointment.farmerName')"/>
        <el-table-column prop="typeName" :label="this.$t('tobacco.tsell.appointment.typeName')"/>
        <el-table-column prop="partName" :label="this.$t('tobacco.tsell.appointment.partName')"/>
        <el-table-column prop="weight" :label="this.$t('tobacco.tsell.appointment.weight')" min-width="100px"/>
        <el-table-column :label="this.$t('tobacco.tsell.appointment.beginEnd')" width="140px">
          <template slot-scope="scope">
            {{dateFormat(scope.row.begin,'HH:MM:ss') }} -- {{dateFormat(scope.row.end,'HH:MM:ss')}}
          </template>
        </el-table-column>

        <el-table-column prop="control" :label="this.$t('tobacco.tsell.appointment.control')"/>
        <el-table-column prop="contractArea" :label="this.$t('tobacco.tsell.appointment.contractArea')"
                         min-width="100px"/>
        <el-table-column prop="contractPlant" :label="this.$t('tobacco.tsell.appointment.contractPlant')"
                         min-width="100px"/>
        <el-table-column prop="contractWeight" :label="this.$t('tobacco.tsell.appointment.contractWeight')"
                         min-width="100px"/>
        <el-table-column prop="varietryNames" :label="this.$t('tobacco.tsell.appointment.varietryNames')"/>
        <el-table-column prop="pictures" :label="this.$t('tobacco.tsell.appointment.pictures')">
          <template slot-scope="scope">
            <el-button type="text" @click="onShowPhoto(scope.row)">{{$t('base.buttonView')}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="desc" :label="this.$t('tobacco.tsell.appointment.desc')"/>
        <el-table-column fixed="right" :label="$t('base.titleOperation')" width="100">
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
                     layout="total, sizes, prev, pager, next, jumper" placement='top'></el-pagination>
    </div>
    <template>
      <el-dialog :title="$t('base.buttonAdd')" width="80%" :visible.sync="childForm.addForm" top="10px"
                 :before-close="handleClose">
        <add-form/>
      </el-dialog>
      <el-dialog :title="$t('base.buttonEdit')" :visible.sync="childForm.editForm" top="10px"
                 :before-close="handleClose" width="80%">
        <edit-form :item.sync=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.editForm"
                   @refresh="onSearchButtonClick"
        />
      </el-dialog>
      <el-dialog :title="$t('base.buttonView')" :visible.sync="childForm.viewForm" top="10px"
                 :before-close="handleClose" width="80%">
        <view-form :item=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.viewForm"/>
      </el-dialog>
      <el-dialog :visible.sync="childForm.showPic">
        <el-carousel indicator-position="outside" v-loading="photoLoading" type="card" height="400px">
          <el-carousel-item v-for="(item, index)  in formData.photoList" :key="index" style="text-align:center">
            <img :src="item" style=" width: auto;height: auto;max-height: 100%;  ">
          </el-carousel-item>
        </el-carousel>
      </el-dialog>

    </template>
  </div>
</template>
<script>
  const AddForm = () => import('./appointmentAdd.vue');
  const EditForm = () => import('./appointmentEdit.vue');
  const ViewForm = () => import('./appointmentView.vue');

  const OrganizationForm = () => import('@/components/Organization');
  const typeSelect = () => import('@/components/Tobacco/typeSelect');
  import appointmentApi from '../../api/tsell/api_appointment';

  const path = require('path');
  

  export default {
    data() {
      return {
        expand: false,
        expandIcon: 'el-icon-arrow-left',
        //需要合计的列
        sumColumnNames: [
          {column: 'weight', unit: '公斤'},
          {column: 'contractArea', unit: '亩'},
          {column: 'contractPlantweight', unit: '公斤'},
          {column: 'contractPlant', unit: '公斤'},
          {column: 'contractWeight', unit: '公斤'}
        ],
        photoLoading: false,
        childForm: {
          addForm: false,
          editForm: false,
          viewForm: false,
          isEdit: false,
          showPic: false,
          filter: false
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
        searchData: {
          orgId: this.userOrgId,
          annual: this.dateFormat(new Date(), 'yyyy'),
          beginDate: this.dateFormat(this.getFirstDate(), 'yyyymmddHHMMss'),
          endDate: this.dateFormat(this.getLastDate(), 'yyyymmddHHMMss')
        },
        formData: {
          appointmentList: [],
          pagination: {
            //用于分页的变量
            currentPage: 1,
            pageSize: 10,
            total: 0,
            keyword: '',
            pageSizeOpts: [10, 15, 20, 25, 30]
          },
          rowSelection: [],
          photoList: []
        }
      };
    },
    created() {
      this.searchData.orgId = this.userOrgId;
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
      OrganizationForm,
      typeSelect,
      ViewForm
    },
    methods: {
      onExpandClick() {
        this.expand = !this.expand;
        if (this.expand) {
          this.expandIcon = 'el-icon-arrow-down';
        } else {
          this.expandIcon = 'el-icon-arrow-left';
        }
      },
      getSummaries(param) {
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          let col = this.sumColumnNames.find(item => {
            return item.column === column.property;
          });
          if (col === undefined || col === null) {
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' ' + col.unit;
          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;
      },
      onShowPhoto(row) {
        //如果是生产环境，前缀要发生变化
        let isProduction = process.env.NODE_ENV === 'production';
        this.photoLoading = true;
        this.formData.photoList = [];
        if (
          row.pictures === undefined ||
          row.pictures === '' ||
          row.pictures === null
        ) {
          this.$message({
            type: 'info',
            message: '没有可用照片'
          });
          return;
        }
        let pps = row.pictures.split(',');
        if (pps.length > 0) {
          let pts = [];
          for (var item of pps) {
            let root = '';
            root = path.join('/upload', row.filePath);
            root = path.join(root, item);
            let rootPath = process.env.VUE_APP_API_URL;
            if (isProduction) {
              rootPath = '';
            }
            root = '{rootPath}{path}'.format({path: root, rootPath: rootPath});
            pts.push(root);
          }
          this.formData.photoList = pts;
          this.childForm.showPic = true;
        }
        this.photoLoading = false;
      },
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

        Promise.all([
          appointmentApi.deleteAppointment(this.formData.selectRow.id)
        ])
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
      },
      onSearchButtonClick() {
        if (this.searchData.annual === null) {
          this.searchData.annual = '';
        }
        Promise.all([
          appointmentApi.getAll({
            size: this.formData.pagination.pageSize,
            page: this.formData.pagination.currentPage - 1,
            sort: 'date',
            contains: 'serial,barcode,title,author,farmerNumber,contractNumber,farmerName,partName,typeName:{keyword}:true'.format(
              {keyword: this.formData.pagination.keyword}
            ),
            search: 'organization.organizationId:rlike:{orgid};annual:eq:{annual};date:BETWEEN:{beginDate},{endDate}'.format(
              {
                orgid: this.searchData.orgId,
                annual: this.searchData.annual,
                beginDate: this.searchData.beginDate,
                endDate: this.searchData.endDate
              }
            )
          })
        ])
          .then(([response]) => {
            this.formData.appointmentList = response.content;
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
