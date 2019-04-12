<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-form-item :label="$t('tobacco.tstorage.transportItem.transportId')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.transportId"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tstorage.transportItem.itemId')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.itemId"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tstorage.transportItem.countryId')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.countryId"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tstorage.transportItem.countryName')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.countryName"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tstorage.transportItem.year')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.year"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tstorage.transportItem.typeId')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.typeId"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tstorage.transportItem.typeName')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.typeName"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tstorage.transportItem.statusId')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.statusId"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tstorage.transportItem.statusName')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.statusName"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tstorage.transportItem.varietyId')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.varietyId"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tstorage.transportItem.varietyName')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.varietyName"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tstorage.transportItem.rankId')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.rankId"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tstorage.transportItem.rankName')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.rankName"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tstorage.transportItem.gradeId')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.gradeId"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tstorage.transportItem.gradeCode')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.gradeCode"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tstorage.transportItem.gradeName')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.gradeName"
                      @keyup.enter.native="onSearchButtonClick"/>
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
        :data="formData.transportItemList"
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="transportId" :label="this.$t('tobacco.tstorage.transportItem.transportId')"/>
        <el-table-column prop="itemId" :label="this.$t('tobacco.tstorage.transportItem.itemId')"/>
        <el-table-column prop="countryId" :label="this.$t('tobacco.tstorage.transportItem.countryId')"/>
        <el-table-column prop="countryName" :label="this.$t('tobacco.tstorage.transportItem.countryName')"/>
        <el-table-column prop="year" :label="this.$t('tobacco.tstorage.transportItem.year')"/>
        <el-table-column prop="typeId" :label="this.$t('tobacco.tstorage.transportItem.typeId')"/>
        <el-table-column prop="typeName" :label="this.$t('tobacco.tstorage.transportItem.typeName')"/>
        <el-table-column prop="statusId" :label="this.$t('tobacco.tstorage.transportItem.statusId')"/>
        <el-table-column prop="statusName" :label="this.$t('tobacco.tstorage.transportItem.statusName')"/>
        <el-table-column prop="varietyId" :label="this.$t('tobacco.tstorage.transportItem.varietyId')"/>
        <el-table-column prop="varietyName" :label="this.$t('tobacco.tstorage.transportItem.varietyName')"/>
        <el-table-column prop="rankId" :label="this.$t('tobacco.tstorage.transportItem.rankId')"/>
        <el-table-column prop="rankName" :label="this.$t('tobacco.tstorage.transportItem.rankName')"/>
        <el-table-column prop="gradeId" :label="this.$t('tobacco.tstorage.transportItem.gradeId')"/>
        <el-table-column prop="gradeCode" :label="this.$t('tobacco.tstorage.transportItem.gradeCode')"/>
        <el-table-column prop="gradeName" :label="this.$t('tobacco.tstorage.transportItem.gradeName')"/>
        <el-table-column prop="standard" :label="this.$t('tobacco.tstorage.transportItem.standard')"/>
        <el-table-column prop="amount" :label="this.$t('tobacco.tstorage.transportItem.amount')"/>
        <el-table-column prop="weight" :label="this.$t('tobacco.tstorage.transportItem.weight')"/>
        <el-table-column prop="desc" :label="this.$t('tobacco.tstorage.transportItem.desc')"/>
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
  const AddForm = () => import('./transportItemAdd.vue');
  const EditForm = () => import('./transportItemEdit.vue');
  import transportItemApi from '../../api/tstorage/api_transportItem';

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
          'transportId': '',
          'itemId': 0,
          'countryId': '',
          'countryName': '',
          'year': 0,
          'typeId': '',
          'typeName': '',
          'statusId': '',
          'statusName': '',
          'varietyId': '',
          'varietyName': '',
          'rankId': '',
          'rankName': '',
          'gradeId': '',
          'gradeCode': '',
          'gradeName': '',
        },
        formData: {
          transportItemList: [],
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
        if (this.formData.selectRow === null || this.formData.selectRow === undefined) {
          this.$message({
            message: this.$t('message.unSelectAny'),
            type: 'info',
          });
          return;
        }

        Promise.all([transportItemApi.deleteTransportItem(this.formData.selectRow.id)])
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
        Promise.all([transportItemApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          sort: 'id,ASC',
          contains: 'transportId,itemId,countryId,countryName,year,typeId,typeName,statusId,statusName,varietyId,varietyName,rankId,rankName,gradeId,gradeCode,gradeName,:{keyword}:true'.format({keyword: this.formData.pagination.keyword}),
          search: 'transportId:EQ:{transportId};itemId:EQ:{itemId};countryId:EQ:{countryId};countryName:EQ:{countryName};year:EQ:{year};typeId:EQ:{typeId};typeName:EQ:{typeName};statusId:EQ:{statusId};statusName:EQ:{statusName};varietyId:EQ:{varietyId};varietyName:EQ:{varietyName};rankId:EQ:{rankId};rankName:EQ:{rankName};gradeId:EQ:{gradeId};gradeCode:EQ:{gradeCode};gradeName:EQ:{gradeName};'.format({
            transportId: this.searchData.transportId,
            itemId: this.searchData.itemId,
            countryId: this.searchData.countryId,
            countryName: this.searchData.countryName,
            year: this.searchData.year,
            typeId: this.searchData.typeId,
            typeName: this.searchData.typeName,
            statusId: this.searchData.statusId,
            statusName: this.searchData.statusName,
            varietyId: this.searchData.varietyId,
            varietyName: this.searchData.varietyName,
            rankId: this.searchData.rankId,
            rankName: this.searchData.rankName,
            gradeId: this.searchData.gradeId,
            gradeCode: this.searchData.gradeCode,
            gradeName: this.searchData.gradeName,
          })
        })])
          .then(([response]) => {
            this.formData.transportItemList = response.content;
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
