<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-form-item :label="$t('tobacco.tfarm.plantPlanArea.plantPlanId')">
            <el-select v-model="searchData.plantPlanId">
              <el-option value='-'
                         key='-'>{{ $t('base.all') }} </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tfarm.plantPlanArea.areaId')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="searchData.areaId"
                      @keyup.enter.native="onSearchButtonClick" />
          </el-form-item>
          <el-form-item :label="$t('tobacco.tfarm.plantPlanArea.start')">
            <el-date-picker v-model="searchData.start"
                            type="datetimerange"
                            :picker-options="dateoptions"
                            :range-separator="$t('base.titleDateTo')"
                            :start-placeholder="$t('base.titleDateBegin')"
                            :end-placeholder="$t('base.titleDateEnd')"
                            align="right">
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tfarm.plantPlanArea.finish')">
            <el-date-picker v-model="searchData.finish"
                            type="datetimerange"
                            :picker-options="dateoptions"
                            :range-separator="$t('base.titleDateTo')"
                            :start-placeholder="$t('base.titleDateBegin')"
                            :end-placeholder="$t('base.titleDateEnd')"
                            align="right">
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tfarm.plantPlanArea.typeName')">
            <el-select v-model="searchData.typeName">
              <el-option value='-'
                         key='-'>{{ $t('base.all') }} </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tfarm.plantPlanArea.varietyName')">
            <el-select v-model="searchData.varietyName">
              <el-option value='-'
                         key='-'>{{ $t('base.all') }} </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tfarm.plantPlanArea.area')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="searchData.area"
                      @keyup.enter.native="onSearchButtonClick" />
          </el-form-item>
          <el-form-item :label="$t('tobacco.tfarm.plantPlanArea.number')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="searchData.number"
                      @keyup.enter.native="onSearchButtonClick" />
          </el-form-item>
          <el-form-item :label="$t('tobacco.tfarm.plantPlanArea.yield')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="searchData.yield"
                      @keyup.enter.native="onSearchButtonClick" />
          </el-form-item>
          <el-form-item :label="$t('tobacco.tfarm.plantPlanArea.money')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="searchData.money"
                      @keyup.enter.native="onSearchButtonClick" />
          </el-form-item>
          <el-form-item :label="$t('tobacco.tfarm.plantPlanArea.pictures')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="searchData.pictures"
                      @keyup.enter.native="onSearchButtonClick" />
          </el-form-item>
          <el-form-item :label="$t('tobacco.tfarm.plantPlanArea.desc')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="searchData.desc"
                      @keyup.enter.native="onSearchButtonClick" />
          </el-form-item>
          <el-form-item :label="$t('base.keywords')">
            <el-input v-bind:placeholder="$t('base.ipKeywords')"
                      v-model="formData.pagination.keyword"
                      @keyup.enter.native="onSearchButtonClick" />
          </el-form-item>
        </el-form>
      </div>
      <div class='toolButton'
           style="min-width: 210px">
        <el-button-group>
          <el-button type='primary' plain
                     @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }} </el-button>
          <el-button type='primary' plain
                     @click='childForm.addForm=true'>{{ $t('base.buttonAdd') }} </el-button>
          <el-button type='primary' plain
                     @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }} </el-button>
        </el-button-group>
      </div>
    </div>
    <main class='contentPanel'>
      <el-table highlight-current-row
                border
                @current-change="handleCurrentChange"
                :data="formData.plantPlanAreaList"
                style="width: 100%"
                :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="plantPlanId"
                         :label="this.$t('tobacco.tfarm.plantPlanArea.plantPlanId')" />
        <el-table-column prop="areaId"
                         :label="this.$t('tobacco.tfarm.plantPlanArea.areaId')" />
        <el-table-column prop="start"
                         :label="this.$t('tobacco.tfarm.plantPlanArea.start')" />
        <el-table-column prop="finish"
                         :label="this.$t('tobacco.tfarm.plantPlanArea.finish')" />
        <el-table-column prop="typeName"
                         :label="this.$t('tobacco.tfarm.plantPlanArea.typeName')" />
        <el-table-column prop="varietyName"
                         :label="this.$t('tobacco.tfarm.plantPlanArea.varietyName')" />
        <el-table-column prop="area"
                         :label="this.$t('tobacco.tfarm.plantPlanArea.area')" />
        <el-table-column prop="number"
                         :label="this.$t('tobacco.tfarm.plantPlanArea.number')" />
        <el-table-column prop="yield"
                         :label="this.$t('tobacco.tfarm.plantPlanArea.yield')" />
        <el-table-column prop="money"
                         :label="this.$t('tobacco.tfarm.plantPlanArea.money')" />
        <el-table-column prop="pictures"
                         :label="this.$t('tobacco.tfarm.plantPlanArea.pictures')" />
        <el-table-column prop="path"
                         :label="this.$t('tobacco.tfarm.plantPlanArea.path')" />
        <el-table-column prop="desc"
                         :label="this.$t('tobacco.tfarm.plantPlanArea.desc')" />
        <el-table-column fixed="right"
                         :label="$t('base.titleOperation')"
                         width="100">
          <template slot-scope="scope">
            <el-button @click="editButtonClick(scope.row,false)"
                       type="text"
                       size="small">{{$t('base.buttonView')}}</el-button>
            <el-button type="text"
                       size="small"
                       @click="editButtonClick(scope.row,true)">{{$t('base.buttonEdit')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </main>
    <div class='footerPanel'>
      <el-pagination :page-size='formData.pagination.pageSize'
                     :total='formData.pagination.total'
                     :current-page='formData.pagination.currentPage'
                     @current-change='onPageChange'
                     :page-sizes='formData.pagination.pageSizeOpts'
                     @size-change='onPageSizeChange'
                     layout="total, sizes, prev, pager, next, jumper"
                     placement='top'></el-pagination>
    </div>
    <template>
      <el-dialog :title="$t('base.buttonAdd')"
                 :visible.sync="childForm.addForm"
                 top="10px"
                 :before-close="handleClose">
        <add-form />
      </el-dialog>
      <el-dialog :title="$t('base.buttonEdit')"
                 :visible.sync="childForm.editForm"
                 top="10px"
                 :before-close="handleClose">
        <edit-form :item.sync=formData.viewSelect
                   :isEdit=childForm.isEdit
                   :visible.sync="childForm.editForm" />
      </el-dialog>
      <el-dialog :title="$t('base.buttonView')"
                 :visible.sync="childForm.viewForm"
                 top="10px"
                 :before-close="handleClose">
        <edit-form :item=formData.viewSelect
                   :isEdit=childForm.isEdit
                   :visible.sync="childForm.viewForm" />
      </el-dialog>
    </template>
  </div>
</template>
<script>
const AddForm = () => import('./plantPlanAreaAdd.vue');
const EditForm = () => import('./plantPlanAreaEdit.vue');
import plantPlanAreaApi from '../../api/tfarm/api_plantPlanArea';
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
      searchData: {
        plantPlanId: '',
        areaId: 0,
        start: '',
        finish: '',
        typeName: '',
        varietyName: '',
        area: 0,
        number: 0,
        yield: 0,
        money: 0,
        pictures: '',
        desc: ''
      },
      formData: {
        plantPlanAreaList: [],
        pagination: {
          //用于分页的变量
          currentPage: 1,
          pageSize: 10,
          total: 0,
          keyword: '',
          pageSizeOpts: [10, 15, 20, 25, 30]
        },
        rowSelection: []
      }
    };
  },
  created() {},
  components: {
    'add-form': AddForm,
    'edit-form': EditForm
  },
  methods: {
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
        plantPlanAreaApi.deletePlantPlanArea(this.formData.selectRow.id)
      ])
        .then(([response]) => {
          this.$message({
            type: 'info',
            message: this.$t('message.deleteOk')
          });
          this.formData.selectRow = null;
          this.onSearchButtonClick();
        })
        .catch(error => {});
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
      Promise.all([
        plantPlanAreaApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          contains: 'plantPlanId,areaId,start,finish,typeName,varietyName,area,number,yield,money,pictures,desc,:{keyword}:true'.format(
            { keyword: this.formData.pagination.keyword }
          ),
          search: 'plantPlanId:EQ:{plantPlanId};areaId:EQ:{areaId};start:EQ:{start};finish:EQ:{finish};typeName:EQ:{typeName};varietyName:EQ:{varietyName};area:EQ:{area};number:EQ:{number};yield:EQ:{yield};money:EQ:{money};pictures:EQ:{pictures};desc:EQ:{desc};'.format(
            {
              plantPlanId: this.searchData.plantPlanId,
              areaId: this.searchData.areaId,
              start: this.searchData.start,
              finish: this.searchData.finish,
              typeName: this.searchData.typeName,
              varietyName: this.searchData.varietyName,
              area: this.searchData.area,
              number: this.searchData.number,
              yield: this.searchData.yield,
              money: this.searchData.money,
              pictures: this.searchData.pictures,
              desc: this.searchData.desc
            }
          )
        })
      ])
        .then(([response]) => {
          this.formData.plantPlanAreaList = response.content;
          this.formData.pagination.total = parseFloat(response.totalElements);
          this.$notify({
            title: this.$t('base.hint'),
            message: this.$t('base.loadingDone'),
            duration: 1000,
            position: 'bottom-right'
          });
        })
        .catch(error => {});
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
    tableRowClassName({ row, rowIndex }) {
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