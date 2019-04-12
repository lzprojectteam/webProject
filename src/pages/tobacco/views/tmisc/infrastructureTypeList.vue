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
          <el-form-item :label="$t('tobacco.tmisc.infrastructureType.control')">
            <el-select
              v-bind:placeholder="$t('base.pleaseInput')"
              v-model="searchData.control"
              @keyup.enter.native="onSearchButtonClick"
            >
              <el-option
                v-for="item in status"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tmisc.infrastructureType.leaf')">
            <el-select
              v-model="searchData.leaf"
              @keyup.enter.native="onSearchButtonClick"
            >
              <el-option
                v-for="item in leafoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />

            </el-select>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tmisc.infrastructureType.visible')">
            <el-select
              v-model="searchData.visible"
              @keyup.enter.native="onSearchButtonClick"
            >
              <el-option
                v-for="item in visibleoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
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
        :data="formData.infrastructureTypeList"
        style="width: 100%"
        :row-class-name="tableRowClassName"
      >
        <el-table-column type="index">
        </el-table-column>
        <el-table-column
          prop="lead"
          :label="this.$t('tobacco.tmisc.infrastructureType.lead')"
        />
        <el-table-column
          prop="leaf"
          :label="this.$t('tobacco.tmisc.infrastructureType.leaf')"
        >
          <template slot-scope="scope">
            {{scope.row.leaf==true?"节点":"非节点"}}
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          :label="this.$t('tobacco.tmisc.infrastructureType.name')"
        />
        <el-table-column
          prop="shape"
          :label="this.$t('tobacco.tmisc.infrastructureType.shape')"
        />
        <el-table-column
          prop="entry"
          :label="this.$t('tobacco.tmisc.infrastructureType.entry')"
        />
        <el-table-column
          prop="icon"
          :label="this.$t('tobacco.tmisc.infrastructureType.icon')"
        />
        <el-table-column
          prop="style"
          :label="this.$t('tobacco.tmisc.infrastructureType.style')"
        />
        <el-table-column
          prop="visible"
          :label="this.$t('tobacco.tmisc.infrastructureType.visible')"
        >
          <template slot-scope="scope">
            {{scope.row.visible==true?"可见":"不可见"}}
          </template>
        </el-table-column>
        <el-table-column
          prop="position"
          :label="this.$t('tobacco.tmisc.infrastructureType.position')"
        />
        <el-table-column
          prop="control"
          :label="this.$t('tobacco.tmisc.infrastructureType.control')"
        />
        <el-table-column
          prop="desc"
          :label="this.$t('tobacco.tmisc.infrastructureType.desc')"
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
const AddForm = () => import('./infrastructureTypeAdd.vue');
const EditForm = () => import('./infrastructureTypeEdit.vue');
import infrastructureTypeApi from '../../api/tmisc/api_infrastructureType';
export default {
  data() {
    return {
      status: [
        {
          value: 1,
          label: '新增'
        },
        {
          value: 3,
          label: '删除'
        },
        {
          value: '',
          label: '全部'
        }
      ],
      leafoptions: [
        {
          value: true,
          label: '节点'
        },
        {
          value: false,
          label: '非节点'
        },
        {
          value: '',
          label: '全部'
        }
      ],
      visibleoptions: [
        {
          value: true,
          label: '节点'
        },
        {
          value: false,
          label: '非节点'
        },
        {
          value: '',
          label: '全部'
        }
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
        lead: '',
        leaf: '',
        name: '',
        shape: '',
        entry: '',
        icon: '',
        style: '',
        visible: '',
        position: '',
        control: '',
        desc: ''
      },
      formData: {
        infrastructureTypeList: [],
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
        infrastructureTypeApi.deleteInfrastructureType(
          this.formData.selectRow.id
        )
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
        infrastructureTypeApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          contains: 'lead,leaf,name,shape,entry,icon,style,visible,position,control,desc,:{keyword}:true'.format(
            { keyword: this.formData.pagination.keyword }
          ),
          search: 'lead:EQ:{lead};leaf:EQ:{leaf};name:EQ:{name};shape:EQ:{shape};entry:EQ:{entry};icon:EQ:{icon};style:EQ:{style};visible:EQ:{visible};position:EQ:{position};control:EQ:{control};desc:EQ:{desc};'.format(
            {
              lead: this.searchData.lead,
              leaf: this.searchData.leaf,
              name: this.searchData.name,
              shape: this.searchData.shape,
              entry: this.searchData.entry,
              icon: this.searchData.icon,
              style: this.searchData.style,
              visible: this.searchData.visible,
              position: this.searchData.position,
              control: this.searchData.control,
              desc: this.searchData.desc
            }
          )
        })
      ])
        .then(([response]) => {
          this.formData.infrastructureTypeList = response.content;
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