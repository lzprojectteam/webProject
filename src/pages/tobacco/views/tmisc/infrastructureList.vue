<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-form-item :label="$t('tobacco.tmisc.infrastructure.type')">
            <el-select
              v-bind:placeholder="$t('base.pleaseInput')"
              v-model="searchData.type"
              @keyup.enter.native="onSearchButtonClick"
            >
              <el-option
                v-for="item in typeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tmisc.infrastructure.control')">
            <el-select
              v-bind:placeholder="$t('base.pleaseInput')"
              v-model="searchData.control"
              @keyup.enter.native="onSearchButtonClick"
            >
              <el-option
                v-for="item in controloptions"
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
        style="min-width: 340px"
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
        :data="formData.infrastructureList"
        style="width: 100%"
        :row-class-name="tableRowClassName"
      >
        <el-table-column type="index">
        </el-table-column>

        <el-table-column
          prop="number"
          :label="this.$t('tobacco.tmisc.infrastructure.number')"
        />
        <el-table-column
          prop="type"
          :label="this.$t('tobacco.tmisc.infrastructure.type')"
        />
        <el-table-column
          prop="title"
          :label="this.$t('tobacco.tmisc.infrastructure.title')"
        />
        <el-table-column
          prop="date"
          :label="this.$t('tobacco.tmisc.infrastructure.date')"
        />
        <el-table-column
          prop="support"
          :label="this.$t('tobacco.tmisc.infrastructure.support')"
        />
        <el-table-column
          prop="own"
          :label="this.$t('tobacco.tmisc.infrastructure.own')"
        />
        <el-table-column
          prop="ownerName"
          :label="this.$t('tobacco.tmisc.infrastructure.ownerName')"
        />
        <el-table-column
          prop="cooperatorName"
          :label="this.$t('tobacco.tmisc.infrastructure.cooperatorName')"
        />
        <el-table-column
          prop="control"
          :label="this.$t('tobacco.tmisc.infrastructure.control')"
        />
        <el-table-column
          prop="summary"
          :label="this.$t('tobacco.tmisc.infrastructure.summary')"
        />
        <el-table-column
          prop="desc"
          :label="this.$t('tobacco.tmisc.infrastructure.desc')"
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
const AddForm = () => import('./infrastructureAdd.vue');
const EditForm = () => import('./infrastructureEdit.vue');
import infrastructureApi from '../../api/tmisc/api_infrastructure';
import infrastructureTypeApi from '../../api/tmisc/api_infrastructureType';
export default {
  data() {
    return {
      typeList: null,
      controloptions: [
        {
          value: 1,
          label: '新建'
        },
        {
          value: 3,
          label: '删除'
        },
        {
          value: 5,
          label: '其他'
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
        serial: '',
        number: '',
        type: '',
        title: '',
        author: '',
        date: '',
        countryId: '',
        countryName: '',
        support: 0,
        own: '',
        ownerId: '',
        ownerNumber: '',
        ownerName: '',
        contact: '',
        summary: '',
        begin: 0,
        end: 0,
        photo: '',
        cooperatorId: '',
        cooperatorName: '',
        pictures: '',
        control: '',
        desc: ''
      },
      typeSearchData: {
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
        infrastructureList: [],
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
  created() {
    Promise.all([
      infrastructureTypeApi.getAll({
        contains: 'lead,leaf,name,shape,entry,icon,style,visible,position,control,desc,:{keyword}:true'.format(
          { keyword: this.formData.pagination.keyword }
        ),
        search: 'lead:EQ:{lead};leaf:EQ:{leaf};name:EQ:{name};shape:EQ:{shape};entry:EQ:{entry};icon:EQ:{icon};style:EQ:{style};visible:EQ:{visible};position:EQ:{position};control:EQ:{control};desc:EQ:{desc};'.format(
          {
            lead: this.typeSearchData.lead,
            leaf: this.typeSearchData.leaf,
            name: this.typeSearchData.name,
            shape: this.typeSearchData.shape,
            entry: this.typeSearchData.entry,
            icon: this.typeSearchData.icon,
            style: this.typeSearchData.style,
            visible: this.typeSearchData.visible,
            position: this.typeSearchData.position,
            control: this.typeSearchData.control,
            desc: this.typeSearchData.desc
          }
        )
      })
    ])
      .then(([response]) => {
        this.typeList = response.content;
      })
      .catch(error => {});
  },
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
        infrastructureApi.deleteInfrastructure(this.formData.selectRow.id)
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
        infrastructureApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          contains: 'serial,number,type,title,author,date,countryId,countryName,support,own,ownerId,ownerNumber,ownerName,contact,summary,begin,end,photo,cooperatorId,cooperatorName,pictures,control,desc,:{keyword}:true'.format(
            { keyword: this.formData.pagination.keyword }
          ),
          search: 'serial:EQ:{serial};number:EQ:{number};type:EQ:{type};title:EQ:{title};author:EQ:{author};date:EQ:{date};countryId:EQ:{countryId};countryName:EQ:{countryName};support:EQ:{support};own:EQ:{own};ownerId:EQ:{ownerId};ownerNumber:EQ:{ownerNumber};ownerName:EQ:{ownerName};contact:EQ:{contact};summary:EQ:{summary};begin:EQ:{begin};end:EQ:{end};photo:EQ:{photo};cooperatorId:EQ:{cooperatorId};cooperatorName:EQ:{cooperatorName};pictures:EQ:{pictures};control:EQ:{control};desc:EQ:{desc};'.format(
            {
              serial: this.searchData.serial,
              number: this.searchData.number,
              type: this.searchData.type,
              title: this.searchData.title,
              author: this.searchData.author,
              date: this.searchData.date,
              countryId: this.searchData.countryId,
              countryName: this.searchData.countryName,
              support: this.searchData.support,
              own: this.searchData.own,
              ownerId: this.searchData.ownerId,
              ownerNumber: this.searchData.ownerNumber,
              ownerName: this.searchData.ownerName,
              contact: this.searchData.contact,
              summary: this.searchData.summary,
              begin: this.searchData.begin,
              end: this.searchData.end,
              photo: this.searchData.photo,
              cooperatorId: this.searchData.cooperatorId,
              cooperatorName: this.searchData.cooperatorName,
              pictures: this.searchData.pictures,
              control: this.searchData.control,
              desc: this.searchData.desc
            }
          )
        })
      ])
        .then(([response]) => {
          this.formData.infrastructureList = response.content;
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