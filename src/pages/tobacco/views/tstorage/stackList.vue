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
        :data="formData.stackList"
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="warehouse.name" :label="this.$t('tobacco.tstorage.facility.whouseid')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="region.title" :label="this.$t('tobacco.tstorage.stack.regionId')" width="100"
                         show-overflow-tooltip
        />
        <!--<el-table-column prop="stackId" :label="this.$t('tobacco.tstorage.stack.stackId')" width="100"
                         show-overflow-tooltip
        />-->
        <el-table-column prop="lead" :label="this.$t('tobacco.tstorage.stack.lead')" width="100" show-overflow-tooltip
        />
        <el-table-column prop="leaf" :label="this.$t('tobacco.tstorage.stack.leaf')"
        >
          <template slot-scope="scope">
            <el-switch v-model="scope.row.leaf" disabled></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="number" :label="this.$t('tobacco.tstorage.stack.number')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="identity" :label="this.$t('tobacco.tstorage.stack.identity')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="name" :label="this.$t('tobacco.tstorage.stack.name')" width="100" show-overflow-tooltip
        />
        <el-table-column prop="space" :label="this.$t('tobacco.tstorage.stack.space')" width="100" show-overflow-tooltip
        />
        <el-table-column prop="capacity" :label="this.$t('tobacco.tstorage.stack.capacity')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="visible" :label="this.$t('tobacco.tstorage.stack.visible')">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.visible" disabled></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="position" :label="this.$t('tobacco.tstorage.stack.position')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="control.name" :label="this.$t('tobacco.tstorage.stack.control')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="desc" :label="this.$t('tobacco.tstorage.stack.desc')" width="100" show-overflow-tooltip
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
  const AddForm = () => import('./stackAdd.vue');
  const EditForm = () => import('./stackEdit.vue');

  import stackApi from '../../api/tstorage/api_stack';
  import warehouseApi from '../../api/tstorage/api_warehouse';
  import regionApi from '../../api/tstorage/api_region';

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
          'stackId': '',
          'lead': '',
          'leaf': true,
          'number': '',
          'identity': '',
          'name': '',
          'space': 0,
          'capacity': 0,
          'visible': true,
          'position': 0,
          'control': 0,
          'desc': '',
        },
        formData: {
          stackList: [],
          whouseList: [],
          regionList: [],
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

        Promise.all([stackApi.deleteStack(this.formData.selectRow.id)])
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
        Promise.all([stackApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          sort: 'id,ASC',
          contains: 'lead,leaf,number,identity,name,space,capacity,visible,position,control,desc,:{keyword}:true'.format({keyword: this.formData.pagination.keyword}),
          search: 'warehouse.organization.organizationId:LIKE:{organizationId};region.id:EQ:{region};warehouse.id:EQ:{warehouse};'.format({
            region: this.searchData.region,
            warehouse: this.searchData.warehouse,
            organizationId: this.$store.state.user.organization.organizationId,
          })
        })])
          .then(([response]) => {
            this.formData.stackList = response.content;
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
