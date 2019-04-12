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
          <el-form-item :label="$t('tobacco.thuman.hrTeam.position')">
            <el-select v-model='searchData.positionId' @change='onSystemChanged' clearable>
              <el-option v-for="item in  searchData.positionList" :key="item.id" :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('base.keywords')">
            <el-input v-bind:placeholder="$t('base.ipKeywords')" v-model="formData.pagination.keyword"
                      @keyup.enter.native="onSearchButtonClick"/>
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
      <el-table highlight-current-row border @current-change="handleCurrentChange" :data="formData.hrTeamList"
                style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column prop="number" :label="$t('tobacco.thuman.hrTeam.number')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="position.name" :label="$t('tobacco.thuman.hrTeam.positionType')" width="100"
                         show-overflow-tooltip/>

        <el-table-column prop="title" :label="$t('tobacco.thuman.hrTeam.title')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="author" :label="$t('tobacco.thuman.hrTeam.author')"width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="date" :label="$t('tobacco.thuman.hrTeam.date')" width="100">
          <template slot-scope="scope">
            {{ formatDate(scope.row.date)}}
          </template>
        </el-table-column>
        <el-table-column prop="organization.organizationName"
                         :label="$t('org.organizationName')" width="120" show-overflow-tooltip/>
        <el-table-column prop="leader" :label="$t('tobacco.thuman.hrTeam.leader')"width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="people" :label="$t('tobacco.thuman.hrTeam.people')"width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="contact" :label="$t('tobacco.thuman.hrTeam.contact')" width="120"
                         show-overflow-tooltip/>
        <el-table-column :label="$t('tobacco.thuman.hrTeam.temporary')">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.temporary" disabled/>
          </template>
        </el-table-column>
        <el-table-column prop="start" :label="this.$t('tobacco.thuman.hrTeam.start')" width="100">
          <template slot-scope="scope">
            {{ formatDate(scope.row.start)}}
          </template>
        </el-table-column>
        <el-table-column prop="finish" :label="this.$t('tobacco.thuman.hrTeam.finish')" width="100">
          <template slot-scope="scope">
            {{ formatDate(scope.row.finish)}}
          </template>
        </el-table-column>
        <el-table-column prop="deadline" :label="this.$t('tobacco.thuman.hrTeam.deadline')">
          <template slot-scope="scope">
            {{ timeDifference(scope.row.start,scope.row.finish)}}
          </template>
        </el-table-column>
        <el-table-column prop="loginId" :label="this.$t('tobacco.thuman.hrTeam.loginId')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="loginName" :label="this.$t('tobacco.thuman.hrTeam.loginName')" width="100"
                         show-overflow-tooltip />
        <el-table-column prop="control" :label="this.$t('tobacco.thuman.hrTeam.control')">
          <template slot-scope="scope">
            {{ formatControl(scope.row.control)}}
          </template>
        </el-table-column>
        <el-table-column prop="desc" :label="this.$t('tobacco.thuman.hrTeam.desc')" width="100"
                         show-overflow-tooltip/>
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
      <el-dialog :title="$t('base.buttonAdd')" :visible.sync="childForm.addForm" top="10px" :before-close="handleClose">
        <add-form :selectData="searchData.positionList"/>
      </el-dialog>

      <el-dialog :title="$t('base.buttonEdit')" :visible.sync="childForm.editForm" top="10px"
                 :before-close="handleClose">
        <edit-form :item.sync=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.editForm"
                   :selectData="searchData.positionList" @refresh="onSearchButtonClick"/>
      </el-dialog>

      <el-dialog :title="$t('base.buttonView')" :visible.sync="childForm.viewForm" top="10px"
                 :before-close="handleClose">
        <edit-form :item=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.viewForm"
                   :selectData="searchData.positionList" @handleClose="handleClose"/>
      </el-dialog>
    </template>
  </div>
</template>
<script>
  const AddForm = () => import('./hrTeamAdd.vue');
  const EditForm = () => import('./hrTeamEdit.vue');
  const OrganizationForm = () => import('@/components/Organization');
  import hrTeamApi from '../../api/thuman/api_hrTeam';
  import categoryApi from '../../api/basic/api_category';
  import dateFormat from 'dateformat';

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
          desc: '',
          positionList: [],
          positionId: '',
          organizationId: ''
        },
        formData: {
          hrTeamList: [],
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
        categoryApi.getAll({size: 500, search: 'lead:EQ:SG_TM'})])
        .then(([response]) => {
          this.searchData.positionList = response.content;
        })
        .catch(error => {
        });
      if (!(this.userOrgId === undefined)) {
        this.searchData.organizationId = this.userOrgId;
      }
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
      OrganizationForm
    },
    methods: {
      //格式化状态
      formatControl(control) {
        switch (control) {
          case 1:
            return '新增';
          case 3:
            return '质疑';
          case 5:
            return '核准';
          case 7:
            return '作废';
          default:
            return '未设置';
        }
      },
      onSystemChanged() {
        this.formData.pagination.currentPage = 1;
        this.onSearchButtonClick();
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
      organizationOnchange(label, value, values) {
        this.searchData.organizationId = value;
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

        Promise.all([hrTeamApi.deleteHrTeam(this.formData.selectRow.id)])
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
        Promise.all([
          hrTeamApi.getAll({
            size: this.formData.pagination.pageSize,
            sort: 'serial,ASC',
            page: this.formData.pagination.currentPage - 1,
            search: 'organization.organizationId:rlike:{organizationId};position.id:EQ:{positionId};(position.name:LIKE:{keyword}:or;title:LIKE:{keyword}:or;author:LIKE:{keyword}:or;organization.organizationName:LIKE:{keyword}:or;leader:LIKE:{keyword}:or;members:LIKE:{keyword}:or;task:LIKE:{keyword}:or;loginName:LIKE:{keyword}:or;desc:LIKE:{keyword})'.format(
              {
                organizationId: this.searchData.organizationId,
                positionId: this.searchData.positionId,
                keyword: this.formData.pagination.keyword
              }
            )
          })
        ])
          .then(([response]) => {
            this.formData.hrTeamList = response.content;
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
        this.formData.pagination.currentPage = index;
        this.onSearchButtonClick();
      },
      onPageSizeChange(size) {
        this.formData.pagination.pageSize = size;
        this.onSearchButtonClick();
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
      },
      formatDate(date) {
        if (date === '' || date === undefined || date === null) {
          return this.$t('tobacco.thuman.hrTeam.unSet');
        }
        date = new Date(date);
        return dateFormat(date, 'yyyy-mm-dd');
      },
      timeDifference(start, end) {
        if (end === '' || end === null) {
          return ' ';
        }
        let date1 = new Date(start); //开始时间
        let date2 = new Date(end);//结束时间
        let date3 = date2.getTime() - new Date(date1).getTime();//时间差的毫秒数
        let days = Math.floor(date3 / (24 * 3600 * 1000));//计算出相差天数
        return days + '天';
      }
    }
  };
</script>
