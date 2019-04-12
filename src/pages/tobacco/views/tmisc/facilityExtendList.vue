<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-row>
            <el-form-item :label="$t('tobacco.tmisc.facilityExtend.display')">
              <el-input
                v-bind:placeholder="$t('base.pleaseInput')"
                v-model="searchData.display"
                @keyup.enter.native="onSearchButtonClick"
              />
            </el-form-item>
            <el-form-item :label="$t('base.keywords')">
              <el-input
                v-bind:placeholder="$t('base.ipKeywords')"
                v-model="formData.pagination.keyword"
                @keyup.enter.native="onSearchButtonClick"
              />
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <div
        class='toolButton'
        style="min-width: 300px"
      >
        <el-button-group>
          <el-button
            type='primary'
            @click='onSearchButtonClick'
          >{{ $t('base.buttonSearch') }} </el-button>
          <el-button
            type='primary'
            @click='childForm.addForm=true'
          >{{ $t('base.buttonAdd') }} </el-button>
          <el-button
            type='primary'
            @click='deleteButtonConfirm'
          >{{ $t('base.buttonDelete') }} </el-button>
        </el-button-group>
      </div>
    </div>
    <main class='contentPanel'>
      <el-table
        highlight-current-row
        border
        @current-change="handleCurrentChange"
        :data="formData.facilityExtendList"
        style="width: 100%"
        :row-class-name="tableRowClassName"
      >
        <el-table-column type="index">
        </el-table-column>
        <el-table-column
          prop="facilityId"
          :label="this.$t('tobacco.tmisc.facilityExtend.facilityId')"
        />
        <el-table-column
          prop="typeId"
          :label="this.$t('tobacco.tmisc.facilityExtend.typeId')"
        />
        <el-table-column
          prop="attrId"
          :label="this.$t('tobacco.tmisc.facilityExtend.attrId')"
        />
        <el-table-column
          prop="display"
          :label="this.$t('tobacco.tmisc.facilityExtend.display')"
        />
        <el-table-column
          prop="valueBoolean"
          :label="this.$t('tobacco.tmisc.facilityExtend.valueBoolean')"
        />
        <el-table-column
          prop="valueEnum"
          :label="this.$t('tobacco.tmisc.facilityExtend.valueEnum')"
        />
        <el-table-column
          prop="valueLong"
          :label="this.$t('tobacco.tmisc.facilityExtend.valueLong')"
        />
        <el-table-column
          prop="valueDouble"
          :label="this.$t('tobacco.tmisc.facilityExtend.valueDouble')"
        />
        <el-table-column
          prop="valueDate"
          :label="this.$t('tobacco.tmisc.facilityExtend.valueDate')"
        />
        <el-table-column
          prop="valueText"
          :label="this.$t('tobacco.tmisc.facilityExtend.valueText')"
        />
        <el-table-column
          prop="desc"
          :label="this.$t('tobacco.tmisc.facilityExtend.desc')"
        />
        <el-table-column
          fixed="right"
          :label="$t('base.titleOperation')"
          width="100"
        >
          <template slot-scope="scope">
            <el-button
              @click="editButtonClick(scope.row,false)"
              type="text"
              plain
            >{{$t('base.buttonView')}}</el-button>
            <el-button
              type="text"
              plain
              @click="editButtonClick(scope.row,true)"
            >{{$t('base.buttonEdit')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </main>
    <div class='footerPanel'>
      <el-pagination
        :page-size='formData.pagination.pageSize'
        :total='formData.pagination.total'
        :current-page='formData.pagination.currentPage'
        @current-change='onPageChange'
        :page-sizes='formData.pagination.pageSizeOpts'
        @size-change='onPageSizeChange'
        layout="total, sizes, prev, pager, next, jumper"
        placement='top'
      ></el-pagination>
    </div>
    <template>
      <el-dialog
        :title="$t('base.buttonAdd')"
        :visible.sync="childForm.addForm"
        top="10px"
        :before-close="handleClose"
      >
        <add-form />
      </el-dialog>
      <el-dialog
        :title="$t('base.buttonEdit')"
        :visible.sync="childForm.editForm"
        top="10px"
        :before-close="handleClose"
      >
        <edit-form
          :item.sync=formData.viewSelect
          :isEdit=childForm.isEdit
          :visible.sync="childForm.editForm"
        />
      </el-dialog>
      <el-dialog
        :title="$t('base.buttonView')"
        :visible.sync="childForm.viewForm"
        top="10px"
        :before-close="handleClose"
      >
        <edit-form
          :item=formData.viewSelect
          :isEdit=childForm.isEdit
          :visible.sync="childForm.viewForm"
        />
      </el-dialog>
    </template>
  </div>
</template>
<script>
const AddForm = () => import('./facilityExtendAdd.vue');
const EditForm = () => import('./facilityExtendEdit.vue');
import facilityExtendApi from '../../api/tmisc/api_facilityExtend';
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
        facilityId: '',
        typeId: '',
        attrId: 0,
        display: '',
        valueBoolean: true,
        valueEnum: 0,
        valueLong: 0,
        valueDouble: 0,
        valueDate: '',
        valueText: '',
        desc: ''
      },
      formData: {
        facilityExtendList: [],
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
    onExpandClick() {
      this.expand = !this.expand;
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
        facilityExtendApi.deleteFacilityExtend(this.formData.selectRow.id)
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
        facilityExtendApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          contains: 'facilityId,typeId,attrId,display,valueBoolean,valueEnum,valueLong,valueDouble,valueDate,valueText,desc,:{keyword}:true'.format(
            { keyword: this.formData.pagination.keyword }
          ),
          search: 'facilityId:EQ:{facilityId};typeId:EQ:{typeId};attrId:EQ:{attrId};display:EQ:{display};valueBoolean:EQ:{valueBoolean};valueEnum:EQ:{valueEnum};valueLong:EQ:{valueLong};valueDouble:EQ:{valueDouble};valueDate:EQ:{valueDate};valueText:EQ:{valueText};desc:EQ:{desc};'.format(
            {
              facilityId: this.searchData.facilityId,
              typeId: this.searchData.typeId,
              attrId: this.searchData.attrId,
              display: this.searchData.display,
              valueBoolean: this.searchData.valueBoolean,
              valueEnum: this.searchData.valueEnum,
              valueLong: this.searchData.valueLong,
              valueDouble: this.searchData.valueDouble,
              valueDate: this.searchData.valueDate,
              valueText: this.searchData.valueText,
              desc: this.searchData.desc
            }
          )
        })
      ])
        .then(([response]) => {
          this.formData.facilityExtendList = response.content;
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