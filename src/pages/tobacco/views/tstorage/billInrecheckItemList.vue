<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-form-item :label="$t('tobacco.tstorage.billCheckItem.billId')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.billId"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tstorage.billCheckItem.checkId')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.checkId"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tstorage.billCheckItem.item_id')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.item_id"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tstorage.billCheckItem.countryId')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.countryId"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tstorage.billCheckItem.countryName')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.countryName"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tstorage.billCheckItem.tyear')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.tyear"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tstorage.billCheckItem.ttypeId')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.ttypeId"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tstorage.billCheckItem.ttypeName')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.ttypeName"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tstorage.billCheckItem.tstatusId')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.tstatusId"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tstorage.billCheckItem.tstatusName')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.tstatusName"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tstorage.billCheckItem.tvarietyId')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.tvarietyId"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tstorage.billCheckItem.tvarietyName')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.tvarietyName"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tstorage.billCheckItem.trankId')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.trankId"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tstorage.billCheckItem.trankName')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.trankName"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tstorage.billCheckItem.desc')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.desc"
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
        :data="formData.billCheckItemList"
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="tyear" :label="this.$t('tobacco.tstorage.billCheckItem.tyear')"/>
        <el-table-column prop="ttypeName" :label="this.$t('tobacco.tstorage.billCheckItem.ttypeName')"/>

        <el-table-column prop="tstatusName" :label="this.$t('tobacco.tstorage.billCheckItem.tstatusName')"/>

        <el-table-column prop="tvarietyName" :label="this.$t('tobacco.tstorage.billCheckItem.tvarietyName')"/>
        <el-table-column prop="trankName" :label="this.$t('tobacco.tstorage.billCheckItem.trankName')"/>
        <el-table-column prop="desc" :label="this.$t('tobacco.tstorage.billCheckItem.desc')"/>
        <el-table-column prop="oriGradeName" :label="this.$t('tobacco.tstorage.billCheckItem.oriGradeName')"/>
        <el-table-column prop="samGradeName" :label="this.$t('tobacco.tstorage.billCheckItem.samGradeName')"/>
        <el-table-column prop="totAmount" :label="this.$t('tobacco.tstorage.billCheckItem.totAmount')"/>
        <el-table-column prop="amount" :label="this.$t('tobacco.tstorage.billCheckItem.amount')"/>
        <el-table-column prop="samAmount" :label="this.$t('tobacco.tstorage.billCheckItem.samAmount')"/>
        <el-table-column prop="weight1" :label="this.$t('tobacco.tstorage.billCheckItem.weight1')"/>
        <el-table-column prop="weight2" :label="this.$t('tobacco.tstorage.billCheckItem.weight2')"/>
        <el-table-column prop="samBundle" :label="this.$t('tobacco.tstorage.billCheckItem.samBundle')"/>
        <el-table-column prop="bundle" :label="this.$t('tobacco.tstorage.billCheckItem.bundle')"/>
        <el-table-column prop="percent" :label="this.$t('tobacco.tstorage.billCheckItem.percent')"/>
        <el-table-column prop="moisture" :label="this.$t('tobacco.tstorage.billCheckItem.moisture')"/>
        <el-table-column prop="mildew" :label="this.$t('tobacco.tstorage.billCheckItem.mildew')"/>
        <el-table-column prop="insect" :label="this.$t('tobacco.tstorage.billCheckItem.insect')"/>
        <el-table-column prop="hollowAmount" :label="this.$t('tobacco.tstorage.billCheckItem.hollowAmount')"/>
        <el-table-column prop="hollowWeight" :label="this.$t('tobacco.tstorage.billCheckItem.hollowWeight')"/>
        <el-table-column prop="rainWetAmount" :label="this.$t('tobacco.tstorage.billCheckItem.rainWetAmount')"/>
        <el-table-column prop="rainWetWeight" :label="this.$t('tobacco.tstorage.billCheckItem.rainWetWeight')"/>
        <el-table-column prop="unqualifiedAmount" :label="this.$t('tobacco.tstorage.billCheckItem.unqualifiedAmount')"/>
        <el-table-column prop="unqualifiedWeight" :label="this.$t('tobacco.tstorage.billCheckItem.unqualifiedWeight')"/>
        <el-table-column prop="peculiarAmount" :label="this.$t('tobacco.tstorage.billCheckItem.peculiarAmount')"/>
        <el-table-column prop="peculiarWeight" :label="this.$t('tobacco.tstorage.billCheckItem.peculiarWeight')"/>
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
        <edit-form :item.sync=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.editForm"/>
      </el-dialog>
      <el-dialog :title="$t('base.buttonView')" :visible.sync="childForm.viewForm" top="10px"
                 :before-close="handleClose">
        <edit-form :item=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.viewForm"/>
      </el-dialog>
    </template>
  </div>
</template>
<script>
  const AddForm = () => import('./billInCheckItemAdd.vue');
  const EditForm = () => import('./billInCheckItemEdit.vue');
  import billCheckItemApi from '../../api/tstorage/api_billCheckItem';

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
          'billId': '',
          'checkId': 0,
          'item_id': 0,
          'countryId': '',
          'countryName': '',
          'tyear': 0,
          'ttypeId': '',
          'ttypeName': '',
          'tstatusId': '',
          'tstatusName': '',
          'tvarietyId': '',
          'tvarietyName': '',
          'trankId': '',
          'trankName': '',
          'desc': '',
        },
        formData: {
          billCheckItemList: [],
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

        Promise.all([billCheckItemApi.deleteBillCheckItem(this.formData.selectRow.id)])
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
        Promise.all([billCheckItemApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          contains: 'billId,checkId,item_id,countryId,countryName,tyear,ttypeId,ttypeName,tstatusId,tstatusName,tvarietyId,tvarietyName,trankId,trankName,desc,:{keyword}:true'.format({keyword: this.formData.pagination.keyword}),
          search: 'billId:EQ:{billId};checkId:EQ:{checkId};item_id:EQ:{item_id};countryId:EQ:{countryId};countryName:EQ:{countryName};tyear:EQ:{tyear};ttypeId:EQ:{ttypeId};ttypeName:EQ:{ttypeName};tstatusId:EQ:{tstatusId};tstatusName:EQ:{tstatusName};tvarietyId:EQ:{tvarietyId};tvarietyName:EQ:{tvarietyName};trankId:EQ:{trankId};trankName:EQ:{trankName};desc:EQ:{desc};'.format({
            billId: this.searchData.billId,
            checkId: this.searchData.checkId,
            item_id: this.searchData.item_id,
            countryId: this.searchData.countryId,
            countryName: this.searchData.countryName,
            tyear: this.searchData.tyear,
            ttypeId: this.searchData.ttypeId,
            ttypeName: this.searchData.ttypeName,
            tstatusId: this.searchData.tstatusId,
            tstatusName: this.searchData.tstatusName,
            tvarietyId: this.searchData.tvarietyId,
            tvarietyName: this.searchData.tvarietyName,
            trankId: this.searchData.trankId,
            trankName: this.searchData.trankName,
            desc: this.searchData.desc,
          })
        })])
          .then(([response]) => {
            this.formData.billCheckItemList = response.content;
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
