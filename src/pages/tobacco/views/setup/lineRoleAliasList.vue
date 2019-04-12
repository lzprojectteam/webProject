<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-form-item :label="$t('tobacco.setup.lineRoleAlias.name')">
            <el-cascader
              :options="formData.options" :show-all-levels="false" clearable change-on-select
              @change="formChange">
            </el-cascader>
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
        :data="formData.lineRoleAliasList"
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="lineId" :label="this.$t('tobacco.setup.lineRoleAlias.lineId')">
          <template slot-scope="scope">
            {{formData.lines[scope.row.lineId]}}
          </template>
        </el-table-column>
        <el-table-column prop="roleId" :label="this.$t('tobacco.setup.lineRoleAlias.roleId')">
          <template slot-scope="scope">
            {{formData.roles[scope.row.roleId]}}
          </template>
        </el-table-column>

        <el-table-column prop="code" :label="this.$t('tobacco.setup.lineRoleAlias.code')"/>
        <el-table-column prop="name" :label="this.$t('tobacco.setup.lineRoleAlias.name')"/>
        <el-table-column prop="desc" :label="this.$t('tobacco.setup.lineRoleAlias.desc')"/>
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
  const AddForm = () => import('./lineRoleAliasAdd.vue');
  const EditForm = () => import('./lineRoleAliasEdit.vue');
  import lineRoleAliasApi from '../../api/setup/api_lineRoleAlias';
  import lineRoleApi from '../../api/setup/api_lineRole';
  import lineApi from '../../api/setup/api_line';

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
          'lineId': '',
          'roleId': '',
          'keyId': '',
          'code': '',
          'name': '',
          'desc': '',
          'id': ''
        },
        formData: {
          lineRoleAliasList: [],
          lines: {},
          roles: {},
          options: [],
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
      if (!(this.userOrgId === undefined)) {
        this.searchData.orgId = this.userOrgId;
      }
      Promise.all([lineApi.getAll()])
        .then(([response]) => {
          let arr = [];
          let tempObj = {};
          let roles = {};
          let lines = {};
          for (var k in response.content) {
            tempObj = {};
            tempObj.children = [];
            tempObj['label'] = response.content[k].name;
            tempObj['value'] = response.content[k].id;
            lines[response.content[k].id] = response.content[k].name;
            arr.push(tempObj);
          }
          Promise.all([lineRoleApi.getAll()])
            .then(([response]) => {
              let data2 = response.content;
              let flag = true;
              arr.forEach(function (val) {
                data2.forEach(function (val2) {
                  if (val['value'] === val2.lineId) {
                    tempObj = {};
                    tempObj.children = [];
                    tempObj['value'] = val2.roleId;
                    tempObj['label'] = val2.name;
                    val.children.push(tempObj);
                  }
                  if (flag) {
                    roles[val2.roleId] = val2.name;
                  }
                });
                flag = false;
              });
              Promise.all([lineRoleAliasApi.getAll()])
                .then(([response]) => {
                  let data3 = response.content;
                  arr.forEach(function (val) {
                    val['children'].forEach(function (val2) {
                      data3.forEach(function (val3) {
                        if (val3.lineId === val['value'] && val3.roleId === val2['value']) {
                          tempObj = {};
                          tempObj['value'] = val3.id;
                          tempObj['label'] = val3.name;
                          val2['children'].push(tempObj);
                        }
                      });
                    });
                  });
                  this.formData.options = arr;
                  this.formData.lines = lines;
                  this.formData.roles = roles;
                  this.onSearchButtonClick();
                })
                .catch(error => {
                });
            })
            .catch(error => {
            });
        })
        .catch(error => {
        });
    },
    components: {
      'add-form': AddForm,
      'edit-form': EditForm
    },
    methods: {
      formChange(label, value, values) {
        this.searchData.lineId = label[0] === undefined ? this.searchData.lineId = '' : this.searchData.lineId = label[0];
        this.searchData.roleId = label[1] === undefined ? this.searchData.roleId = '' : this.searchData.roleId = label[1];
        this.searchData.id = label[2] === undefined ? this.searchData.id = '' : this.searchData.id = label[2];
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

        Promise.all([lineRoleAliasApi.deleteLineRoleAlias(this.formData.selectRow.id)])
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
        Promise.all([lineRoleAliasApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          sort: 'code,ASC',
          contains: 'code,name,desc:{keyword}:true'.format({keyword: this.formData.pagination.keyword}),
          search: 'lineId:EQ:{lineId};roleId:EQ:{roleId};id:EQ:{id}'.format({
            lineId: this.searchData.lineId,
            roleId: this.searchData.roleId,
            id: this.searchData.id
          }),
        })])
          .then(([response]) => {
            this.formData.lineRoleAliasList = response.content;
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
      },
    }
  };
</script>
