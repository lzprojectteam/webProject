<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form
          inline
          style="width:120%"
        >

          <el-form-item :label="$t('tobacco.tmisc.rotation.year')">
            <el-date-picker
              v-bind:placeholder="$t('base.pleaseInput')"
              v-model="searchData.year"
              @keyup.enter.native="onSearchButtonClick"
              format="yyyy"
              style="width:100%;"
            />
          </el-form-item>

          <el-form-item :label="$t('tobacco.tmisc.rotation.visible')">
            <el-select v-model="searchData.visible">
              <el-option
                v-for="item in visibleoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tmisc.rotation.plant')">
            <el-input
              v-bind:placeholder="$t('base.pleaseInput')"
              v-model="searchData.plant"
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
        </el-form>
      </div>
      <div
        class='toolButton'
        style="min-width: 210px"
      >
        <el-button-group>
          <el-button
            type='primary' plain
            @click='onSearchButtonClick'
          >{{ $t('base.buttonSearch') }} </el-button>
          <el-button
            type='primary' plain
            @click='childForm.addForm=true'
          >{{ $t('base.buttonAdd') }} </el-button>
          <el-button
            type='primary' plain
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
        :data="formData.rotationList"
        style="width: 100%"
        :row-class-name="tableRowClassName"
      >
        <el-table-column type="index">
        </el-table-column>
        <el-table-column
          prop="id"
          :label="this.$t('base.id')"
        />
        <el-table-column
          prop="name"
          :label="this.$t('tobacco.tmisc.rotation.name')"
        />
        <el-table-column
          prop="year"
          :label="this.$t('tobacco.tmisc.rotation.year')"
        />
        <el-table-column
          prop="plant"
          :label="this.$t('tobacco.tmisc.rotation.plant')"
        />
        <el-table-column
          prop="color"
          :label="this.$t('tobacco.tmisc.rotation.color')"
        />
        <el-table-column
          prop="visible"
          :label="this.$t('tobacco.tmisc.rotation.visible')"
        >
          <template slot-scope="scope">
            {{scope.row.visible==true?"可见":"不可见"}}
          </template>
        </el-table-column>
        <el-table-column
          prop="position"
          :label="this.$t('tobacco.tmisc.rotation.position')"
        />
        <el-table-column
          prop="desc"
          :label="this.$t('tobacco.tmisc.rotation.desc')"
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
              size="small"
            >{{$t('base.buttonView')}}</el-button>
            <el-button
              type="text"
              size="small"
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
const AddForm = () => import('./rotationAdd.vue');
const EditForm = () => import('./rotationEdit.vue');
import rotationApi from '../../api/tmisc/api_rotation';
export default {
  data() {
    return {
      visibleoptions: [
        {
          value: true,
          label: '可见'
        },
        {
          value: false,
          label: '不可见'
        },
        {
          value: '',
          label: '全部'
        }
      ],
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
        name: '',
        year: '',
        plant: '',
        color: '',
        visible: '',
        position: '',
        desc: ''
      },
      formData: {
        rotationList: [],
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

      Promise.all([rotationApi.deleteRotation(this.formData.selectRow.id)])
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
        rotationApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          contains: 'name,year,plant,color,visible,desc,:{keyword}:true'.format(
            { keyword: this.formData.pagination.keyword }
          ),
          search: 'name:EQ:{name};year:EQ:{year};plant:EQ:{plant};color:EQ:{color};visible:EQ:{visible};desc:EQ:{desc};'.format(
            {
              name: this.searchData.name,
              year: this.searchData.year,
              plant: this.searchData.plant,
              color: this.searchData.color,
              visible: this.searchData.visible,
              position: this.searchData.position,
              desc: this.searchData.desc
            }
          )
        })
      ])
        .then(([response]) => {
          this.formData.rotationList = response.content;
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