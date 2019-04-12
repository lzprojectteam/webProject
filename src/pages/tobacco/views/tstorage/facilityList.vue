<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
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
            <el-select v-model="searchData.region" clearable>
              <el-option v-for="item in formData.regionList"
                         :value="item.id"
                         :label="item.title"
                         :key="item.id">
              </el-option>
            </el-select>
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
        :data="formData.facilityList"
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="serial" :label="this.$t('tobacco.tstorage.facility.serialno')" width="130"
                         show-overflow-tooltip
        />
        <el-table-column prop="name" :label="this.$t('tobacco.tstorage.facility.name')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="type.name" :label="this.$t('tobacco.tstorage.facility.type')" width="100"
                         show-overflow-tooltip
        />
        <!-- <el-table-column prop="whouseid" :label="this.$t('tobacco.tstorage.facility.whouseid')"/>-->
        <el-table-column prop="warehouse.name" :label="this.$t('tobacco.tstorage.facility.whouseid')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="region.title" :label="this.$t('tobacco.tstorage.facility.regionId')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="rfid1" :label="this.$t('tobacco.tstorage.facility.rfid1')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="rfid2" :label="this.$t('tobacco.tstorage.facility.rfid2')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="hrfid" :label="this.$t('tobacco.tstorage.facility.hrfid')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="num1" :label="this.$t('tobacco.tstorage.facility.num1')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="num2" :label="this.$t('tobacco.tstorage.facility.num2')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="tare" :label="this.$t('tobacco.tstorage.facility.tare')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="capacityWeight" :label="this.$t('tobacco.tstorage.facility.capacityWeight')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="capacityPack" :label="this.$t('tobacco.tstorage.facility.capacityPack')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="currentWeight" :label="this.$t('tobacco.tstorage.facility.currentWeight')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="currentPack" :label="this.$t('tobacco.tstorage.facility.currentPack')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="valid" :label="this.$t('tobacco.tstorage.facility.valid')" width="100"
                         show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-switch v-model="scope.row.valid" disabled></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="desc" :label="this.$t('tobacco.tstorage.facility.desc')" width="100"
                         show-overflow-tooltip
        />
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
  const AddForm = () => import('./facilityAdd.vue');
  const EditForm = () => import('./facilityEdit.vue');
  import warehouseApi from '../../api/tstorage/api_warehouse';
  import regionApi from '../../api/tstorage/api_region';
  import facilityApi from '../../api/tstorage/api_facility';

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
          'warehouse': '',
          'region': '',
          'organizationId': '',
          'serialno': '',
          'name': '',
          'type': '',
          'rfid1': '',
          'rfid2': '',
          'hrfid': '',
          'num1': '',
          'num2': '',
          'tare': '',
          'capacityWeight': '',
          'capacityPack': '',
          'currentWeight': '',
          'currentPack': '',
          'valid': true,
          'desc': '',
          'control': '',
        },
        formData: {
          facilityList: [],
          whouseList: [],
          regionList: [],
          viewSelect: '',
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
      this.searchData.organizationId = this.$store.state.user.organization.organizationId;
      this.onSearchButtonClick();
      this.getWhouse();
    },
    components: {
      'add-form': AddForm,
      'edit-form': EditForm
    },
    methods: {
      getWhouse() {
        Promise.all([warehouseApi.getAll({
          sort: 'name',
          search: 'organization.organizationId:rlike:{orgid};'.format({
            orgid: this.searchData.organizationId,
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
          search: 'organization.organizationId:rlike:{orgid};warehouse.id:EQ:{warehouse};'.format({
            orgid: this.searchData.organizationId,
            warehouse: this.searchData.warehouse,
          })
        })])
          .then(([response]) => {
            this.formData.regionList = response.content;
          })
          .catch(error => {
          });
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

        Promise.all([facilityApi.deleteFacility(this.formData.selectRow.id)])
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
        Promise.all([facilityApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          sort: 'id,ASC',
          contains: 'serialno,name,type,whouseid,shelfid,rfid1,rfid2,hrfid,num1,num2,tare,capacityWeight,capacityPack,currentWeight,currentPack,valid,desc,:{keyword}:true'.format({keyword: this.formData.pagination.keyword}),
          search: 'warehouse.organization.organizationId:LIKE:{organizationId};warehouse.id:EQ:{warehouse};region.id:EQ:{region}'.format({
            warehouse: this.searchData.warehouse,
            region: this.searchData.region,
            organizationId: this.$store.state.user.organization.organizationId,
          })
        })])
          .then(([response]) => {
            this.formData.facilityList = response.content;
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
