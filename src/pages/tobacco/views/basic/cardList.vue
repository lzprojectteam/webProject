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
          <el-form-item :label="$t('tobacco.basic.card.barcode')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.barcode"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>

          <el-form-item :label="$t('base.keywords')">
            <el-input v-bind:placeholder="$t('base.ipKeywords')" v-model="formData.pagination.keyword"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
        </el-form>
      </div>
      <div class='toolButton' style="min-width: 240px">
        <el-button-group>
          <el-button type='primary' @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }}</el-button>
          <el-button type='primary' @click='childForm.addForm=true'>{{ $t('base.buttonAdd') }}</el-button>
          <el-button type='primary' @click='childForm.importForm=true'>{{ $t('base.import') }}</el-button>
          <el-button type='primary' @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }}</el-button>

        </el-button-group>
      </div>
    </div>
    <main class='contentPanel'>
      <el-table highlight-current-row border @current-change="handleCurrentChange" :data="formData.cardList"
                style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="id" :label="this.$t('tobacco.basic.card.isn')" width="200"
                         show-overflow-tooltip/>
        <el-table-column prop="organization.organizationName" :label="this.$t('org.organizationName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="barcode" :label="this.$t('tobacco.basic.card.barcode')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="content" :label="this.$t('tobacco.basic.card.content')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="date" :label="this.$t('tobacco.basic.card.date')" width="150"
                         show-overflow-tooltip/>
        <el-table-column prop="model" :label="this.$t('tobacco.basic.card.model')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="number" :label="this.$t('tobacco.basic.card.number')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="serial" :label="this.$t('tobacco.basic.card.serial')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="type" :label="this.$t('tobacco.basic.card.type')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="usage" :label="this.$t('tobacco.basic.card.usage')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="valid" :label="this.$t('tobacco.basic.card.valid')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="desc" :label="this.$t('tobacco.basic.card.desc')" width="100"
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
        <add-form/>
      </el-dialog>
      <el-dialog :title="$t('base.buttonEdit')" :visible.sync="childForm.editForm" top="10px"
                 :before-close="handleClose">
        <edit-form :item.sync=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.editForm" @refresh="onSearchButtonClick"
        />
      </el-dialog>
      <el-dialog :title="$t('base.buttonView')" :visible.sync="childForm.viewForm" top="10px"
                 :before-close="handleClose">
        <edit-form :item=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.viewForm"/>
      </el-dialog>

      <el-dialog :title="$t('base.import')" :visible.sync="childForm.importForm" top="10px"
                 :before-close="handleClose">
        <card-import  :visible.sync="childForm.importForm"/>
      </el-dialog>

    </template>
  </div>
</template>
<script>
  const AddForm = () => import('./cardAdd.vue');
  const EditForm = () => import('./cardEdit.vue');
  const OrganizationForm = () => import('@/components/Organization');

  import cardApi from '../../api/basic/api_card';

  export default {
    data() {
      return {
        childForm: {
          addForm: false,
          editForm: false,
          viewForm: false,
          isEdit: false,
          importForm: false
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
          'organizationId': this.$store.state.user.organization.organizationId,
          barcode: '',
          content: '',
          date: '',
          model: '',
          number: '',
          serial: '',
          type: '',
          valid: true
        },
        formData: {
          cardList: [],
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
      this.onSearchButtonClick();
    },
    components: {
      'add-form': AddForm,
      'edit-form': EditForm,
      OrganizationForm,
      'card-import': () => import('./CardImport.vue')
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
    methods: {
      organizationOnchange(label, value, values) {
        this.searchData.organizationId = value;
        this.searchData.organizationCode = value;
        this.searchData.organizationName = label;
        this.searchData.organizationOrder = '0';
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

        Promise.all([cardApi.deleteCard(this.formData.selectRow.id)])
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
          cardApi.getAll({
            contains: 'barcode,content,model,number,serial,type:{keyword}:true'.format(
              { keyword: this.formData.pagination.keyword }),
            size: this.formData.pagination.pageSize,
            sort: 'serial,ASC',
            page: this.formData.pagination.currentPage - 1,
            search: 'organization.organizationId:rlike:{orgid};'.format(
              {
                orgid: this.searchData.organizationId,
                barcode: this.searchData.barcode,
                content: this.searchData.content,
                date: this.searchData.date,
                model: this.searchData.model,
                number: this.searchData.number,
                serial: this.searchData.serial,
                type: this.searchData.type,
                valid: this.searchData.valid
              }
            )
          })
        ])
          .then(([response]) => {
            this.formData.cardList = response.content;
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
      }
    }
  };
</script>
