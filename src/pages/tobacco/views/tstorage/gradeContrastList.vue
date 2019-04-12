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
          <el-form-item :label="$t('base.keywords')">
            <el-input v-bind:placeholder="$t('base.ipKeywords')"
                      v-model="formData.pagination.keyword" @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-row>
            <template v-if='expand'>
              <el-form-item :label="$t('tobacco.tstorage.gradeContrast.ogradeName')">
                <type-grade-select :typeId.sync="searchData.typeId" :typeName.sync="searchData.typeName"
                                   :gradeId.sync="searchData.ogradeId" :gradeName.sync="searchData.ogradeName"
                                   :gradeCode.sync="searchData.ogradeCode"
                                   style="width: 100%;">
                </type-grade-select>
              </el-form-item>
              <el-form-item :label="$t('tobacco.tstorage.gradeContrast.cgradeName')">
                <type-grade-select :typeId.sync="searchData.typeId" :typeName.sync="searchData.typeName"
                                   :gradeId.sync="searchData.cgradeId" :gradeName.sync="searchData.cgradeName"
                                   :gradeCode.sync="searchData.cgradeCode"
                                   style="width: 100%;">
                </type-grade-select>
              </el-form-item>
            </template>
          </el-row>

        </el-form>
      </div>
      <div class='toolButton' style="min-width: 280px">
        <el-button-group>
          <el-button type='primary' @click='onExpandClick'>{{ $t('base.buttonFilter') }}</el-button>
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
        :data="formData.gradeContrastList"
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="organization.organizationName" :label="this.$t('org.organizationName')" min-width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="typeName" :label="this.$t('tobacco.tsell.inventoryLoss.typeName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="ogradeName" :label="this.$t('tobacco.tstorage.gradeContrast.ogradeName')"/>
        <el-table-column prop="cgradeName" :label="this.$t('tobacco.tstorage.gradeContrast.cgradeName')"/>
        <el-table-column prop="gap" :label="this.$t('tobacco.tstorage.gradeContrast.gap')"/>
        <el-table-column prop="desc" :label="this.$t('tobacco.tstorage.gradeContrast.desc')"/>
        <!--
                <el-table-column
                  fixed="right"
                  :label="$t('base.titleOperation')"
                  width="50">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }}</el-button>
                    &lt;!&ndash;<el-button @click="editButtonClick(scope.row,false)" type="text" size="small">{{$t('base.buttonView')}}
                    </el-button>
                    <el-button type="text" size="small" @click="editButtonClick(scope.row,true)">{{$t('base.buttonEdit')}}
                    </el-button>&ndash;&gt;
                  </template>
                </el-table-column>
        -->
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
      <!-- <el-dialog :title="$t('base.buttonEdit')" :visible.sync="childForm.editForm" top="10px"
                  :before-close="handleClose">
         <edit-form :item.sync=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.editForm"
                    @refresh="onSearchButtonClick"
         />
       </el-dialog>
       <el-dialog :title="$t('base.buttonView')" :visible.sync="childForm.viewForm" top="10px"
                  :before-close="handleClose">
         <edit-form :item=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.viewForm"/>
       </el-dialog>-->
    </template>
  </div>
</template>
<script>
  const AddForm = () => import('./gradeContrastAdd.vue');
  const EditForm = () => import('./gradeContrastEdit.vue');
  const OrganizationForm = () => import('@/components/Organization');
  const typeGradeSelect = () => import('@/components/Tobacco/typeGradeSelect2');

  import gradeContrastApi from '../../api/tstorage/api_gradeContrast';

  export default {
    data() {
      return {
        expand: '',
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
          'organizationId': this.$store.state.user.organization.organizationId,
          'typeId': '',
          'typeName': '',
          'ogradeId': '',
          'ogradeCode': '',
          'ogradeName': '',
          'cgradeId': '',
          'cgradeCode': '',
          'cgradeName': '',
          'gap': 0,
          'desc': '',
        },
        formData: {
          gradeContrastList: [],
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
      this.onSearchButtonClick();

    },
    components: {
      'add-form': AddForm,
      'edit-form': EditForm,
      OrganizationForm,
      typeGradeSelect
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
      onExpandClick() {
        this.expand = !this.expand;
        if (this.expand) {
          this.expandIcon = 'el-icon-arrow-down';
        } else {
          this.expandIcon = 'el-icon-arrow-left';
        }
      },
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
        if (this.formData.selectRow === null || this.formData.selectRow === undefined) {
          this.$message({
            message: this.$t('message.unSelectAny'),
            type: 'info',
          });
          return;
        }

        Promise.all([gradeContrastApi.deleteGradeContrast(this.formData.selectRow.id)])
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
        Promise.all([gradeContrastApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          sort: 'id,ASC',
          contains: 'ogradeName,cgradeName,gap,desc,:{keyword}:true'.format({keyword: this.formData.pagination.keyword}),
          search: 'organization.organizationId:rlike:{orgid};typeId:EQ:{typeId};ogradeId:EQ:{ogradeId};ogradeCode:EQ:{ogradeCode};ogradeName:EQ:{ogradeName};cgradeId:EQ:{cgradeId};cgradeCode:EQ:{cgradeCode};cgradeName:EQ:{cgradeName};'.format({
            ogradeId: this.searchData.ogradeId,
            ogradeCode: this.searchData.ogradeCode,
            ogradeName: this.searchData.ogradeName,
            cgradeId: this.searchData.cgradeId,
            cgradeCode: this.searchData.cgradeCode,
            cgradeName: this.searchData.cgradeName,
            typeId: this.searchData.typeId,
            gap: this.searchData.gap,
            desc: this.searchData.desc,
            orgid: this.searchData.organizationId,
          })
        })])
          .then(([response]) => {
            this.formData.gradeContrastList = response.content;
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
