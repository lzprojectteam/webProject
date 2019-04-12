<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form
          inline
          style="width:120%;"
        >
          <el-form-item :label="$t('tobacco.tmisc.plowland.type')">
            <el-select
              v-bind:placeholder="$t('base.pleaseInput')"
              v-model="searchData.type"
              @keyup.enter.native="onSearchButtonClick"
            >
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tmisc.plowland.area')">
            <el-input
              v-bind:placeholder="$t('base.pleaseInput')"
              v-model="searchData.area"
              @keyup.enter.native="onSearchButtonClick"
            />
          </el-form-item>
          <el-form-item :label="$t('tobacco.tmisc.plowland.control')">
            <el-select
              v-bind:placeholder="$t('base.pleaseInput')"
              v-model="searchData.control"
              @keyup.enter.native="onSearchButtonClick"
            >
              <el-option
                v-for="item in statusoptions"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
            </el-select>
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
        :data="formData.plowlandList"
        style="width: 100%"
        :row-class-name="tableRowClassName"
      >
        <el-table-column type="index">
        </el-table-column>
        <el-table-column
          prop="serial"
          :label="this.$t('tobacco.tmisc.plowland.serial')"
        />
        <el-table-column
          prop="number"
          :label="this.$t('tobacco.tmisc.plowland.number')"
        />
        <el-table-column
          prop="type"
          :label="this.$t('tobacco.tmisc.plowland.type')"
        />
        <el-table-column
          prop="title"
          :label="this.$t('tobacco.tmisc.plowland.title')"
        />
        <el-table-column
          prop="author"
          :label="this.$t('tobacco.tmisc.plowland.author')"
        />
        <el-table-column
          prop="date"
          :label="this.$t('tobacco.tmisc.plowland.date')"
        />
        <el-table-column
          prop="cooperatorId"
          :label="this.$t('tobacco.tmisc.plowland.cooperatorId')"
        />
        <el-table-column
          prop="cooperatorCode"
          :label="this.$t('tobacco.tmisc.plowland.cooperatorCode')"
        />
        <el-table-column
          prop="cooperatorName"
          :label="this.$t('tobacco.tmisc.plowland.cooperatorName')"
        />
        <el-table-column
          prop="countryId"
          :label="this.$t('tobacco.tmisc.plowland.countryId')"
        />
        <el-table-column
          prop="countryName"
          :label="this.$t('tobacco.tmisc.plowland.countryName')"
        />
        <el-table-column
          prop="area"
          :label="this.$t('tobacco.tmisc.plowland.area')"
        />
        <el-table-column
          prop="length"
          :label="this.$t('tobacco.tmisc.plowland.length')"
        />
        <el-table-column
          prop="contact"
          :label="this.$t('tobacco.tmisc.plowland.contact')"
        />
        <el-table-column
          prop="summary"
          :label="this.$t('tobacco.tmisc.plowland.summary')"
        />
        <el-table-column
          prop="beginAnnual"
          :label="this.$t('tobacco.tmisc.plowland.beginAnnual')"
        />
        <el-table-column
          prop="endAnnual"
          :label="this.$t('tobacco.tmisc.plowland.endAnnual')"
        />
        <el-table-column
          prop="photo"
          :label="this.$t('tobacco.tmisc.plowland.photo')"
        />
        <el-table-column
          prop="pictures"
          :label="this.$t('tobacco.tmisc.plowland.pictures')"
        />
        <el-table-column
          prop="control"
          :label="this.$t('tobacco.tmisc.plowland.control')"
        />
        <el-table-column
          prop="desc"
          :label="this.$t('tobacco.tmisc.plowland.desc')"
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
const AddForm = () => import('./plowlandAdd.vue');
const EditForm = () => import('./plowlandEdit.vue');
import plowlandApi from '../../api/tmisc/api_plowland';
export default {
  data() {
    return {
      typeList: [],
      statusoptions: [
        { value: 1, label: '新增' },
        { value: 3, label: '删除' },
        { value: '', label: '全部' }
      ],
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
        serial: '',
        number: '',
        type: '',
        title: '',
        author: '',
        date: '',
        cooperatorId: '',
        cooperatorCode: '',
        cooperatorName: '',
        countryId: '',
        countryName: '',
        area: 0,
        length: 0,
        contact: '',
        summary: '',
        beginAnnual: 0,
        endAnnual: 0,
        photo: '',
        pictures: '',
        control: '',
        desc: ''
      },
      formData: {
        plowlandList: [],
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

      Promise.all([plowlandApi.deletePlowland(this.formData.selectRow.id)])
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
        plowlandApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          contains: 'serial,number,type,title,author,date,cooperatorId,cooperatorCode,cooperatorName,countryId,countryName,area,length,contact,summary,beginAnnual,endAnnual,photo,pictures,control,desc,:{keyword}:true'.format(
            { keyword: this.formData.pagination.keyword }
          ),
          search: 'serial:EQ:{serial};number:EQ:{number};type:EQ:{type};title:EQ:{title};author:EQ:{author};date:EQ:{date};cooperatorId:EQ:{cooperatorId};cooperatorCode:EQ:{cooperatorCode};cooperatorName:EQ:{cooperatorName};countryId:EQ:{countryId};countryName:EQ:{countryName};area:EQ:{area};length:EQ:{length};contact:EQ:{contact};summary:EQ:{summary};beginAnnual:EQ:{beginAnnual};endAnnual:EQ:{endAnnual};photo:EQ:{photo};pictures:EQ:{pictures};control:EQ:{control};desc:EQ:{desc};'.format(
            {
              serial: this.searchData.serial,
              number: this.searchData.number,
              type: this.searchData.type,
              title: this.searchData.title,
              author: this.searchData.author,
              date: this.searchData.date,
              cooperatorId: this.searchData.cooperatorId,
              cooperatorCode: this.searchData.cooperatorCode,
              cooperatorName: this.searchData.cooperatorName,
              countryId: this.searchData.countryId,
              countryName: this.searchData.countryName,
              area: this.searchData.area,
              length: this.searchData.length,
              contact: this.searchData.contact,
              summary: this.searchData.summary,
              beginAnnual: this.searchData.beginAnnual,
              endAnnual: this.searchData.endAnnual,
              photo: this.searchData.photo,
              pictures: this.searchData.pictures,
              control: this.searchData.control,
              desc: this.searchData.desc
            }
          )
        })
      ])
        .then(([response]) => {
          this.formData.plowlandList = response.content;
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