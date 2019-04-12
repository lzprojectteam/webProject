<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form  inline>
          <el-form-item :label="$t('tobacco.setup.attribute.categoryId')" prop='categoryId'>
            <el-select v-model="searchData.categoryId" :placeholder="$t('base.pleaseSelectOrCreate')"
                       allow-create filterable>
              <el-option
                v-for="(item,index) in optionData.categoryIdOptions"
                :key="index"
                :label="item"
                :value="item">
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
      <el-table highlight-current-row border @current-change="handleCurrentChange" :data="formData.attributeList"
                style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="categoryId" :label="this.$t('tobacco.setup.attribute.categoryId')"/>
        <el-table-column prop="label" :label="this.$t('tobacco.setup.attribute.label')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="keyId" :label="this.$t('tobacco.setup.attribute.keyId')" width="130"
                         show-overflow-tooltip/>
        <el-table-column prop="value" :label="this.$t('tobacco.setup.attribute.value')" width="250"
                         show-overflow-tooltip/>
        <el-table-column prop="example" :label="this.$t('tobacco.setup.attribute.example')" width="250"
                         show-overflow-tooltip/>
        <el-table-column prop="type" :label="this.$t('tobacco.setup.attribute.type')"/>
        <el-table-column prop="edit" :label="this.$t('tobacco.setup.attribute.edit')" width="70"
                         show-overflow-tooltip/>
        <el-table-column :label="this.$t('tobacco.setup.attribute.visible')" width="70">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.visible" disabled/>
          </template>
        </el-table-column>
        <el-table-column prop="position" :label="this.$t('tobacco.setup.attribute.position')" width="70"
                         show-overflow-tooltip/>
        <el-table-column prop="desc" :label="this.$t('tobacco.setup.attribute.desc')" width="100"
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
  const AddForm = () => import('./attributeAdd.vue');
  const EditForm = () => import('./attributeEdit.vue');
  import attributeApi from '../../api/setup/api_attribute';

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
          categoryId: '',
          keyId: '',
          label: '',
          value: '',
          example: '',
          edit: 0,
          visible: true,
          position: 0,
          desc: ''
        },
        formData: {
          attributeList: [],
          pagination: {
            //用于分页的变量
            currentPage: 1,
            pageSize: 10,
            total: 0,
            keyword: '',
            pageSizeOpts: [10, 15, 20, 25, 30]
          },
          rowSelection: []
        },
        optionData: {
          categoryIdOptions: [],
        }
      };
    },
    created() {
      if (!(this.userOrgId === undefined)) {
        this.searchData.orgId = this.userOrgId;
      }
      Promise.all([attributeApi.showType()])
        .then(([response]) => {
          this.optionData.categoryIdOptions = response;
        })
        .catch(error => {
          console.log(error);
        });
      this.onSearchButtonClick();
    },
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

        Promise.all([attributeApi.deleteAttribute(this.formData.selectRow.id)])
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
      formReset(name) {
        this.$refs[name].resetFields();
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
          attributeApi.getAll({
            size: this.formData.pagination.pageSize,
            sort: 'position,ASC',
            page: this.formData.pagination.currentPage - 1,
            contains: 'categoryId,keyId,label,value,example,edit,visible,position,desc,:{keyword}:true'.format(
              {keyword: this.formData.pagination.keyword}
            ),
            search: 'categoryId:EQ:{categoryId}'.format(
              {
                categoryId: this.searchData.categoryId,
              }
            )
          })
        ])
          .then(([response]) => {
            this.formData.attributeList = response.content;
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
<style>
  #attr_search .el-form-item__content {
    width: 400px;
  }
</style>
