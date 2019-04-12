<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-form-item :label="$t('casit.tstorage.inventoryDetail.detailId')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.detailId"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('casit.tstorage.inventoryDetail.title')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.title"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('casit.tstorage.inventoryDetail.countryId')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.countryId"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('casit.tstorage.inventoryDetail.countryName')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.countryName"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('casit.tstorage.inventoryDetail.contractId')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.contractId"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('casit.tstorage.inventoryDetail.contractNumber')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.contractNumber"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('casit.tstorage.inventoryDetail.contractCard')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.contractCard"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('casit.tstorage.inventoryDetail.farmerId')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.farmerId"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('casit.tstorage.inventoryDetail.farmerNumber')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.farmerNumber"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('casit.tstorage.inventoryDetail.farmerName')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.farmerName"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('casit.tstorage.inventoryDetail.farmerIdentity')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.farmerIdentity"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('casit.tstorage.inventoryDetail.weight')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.weight"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('casit.tstorage.inventoryDetail.basket')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.basket"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('casit.tstorage.inventoryDetail.content')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.content"
                      @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <el-form-item :label="$t('casit.tstorage.inventoryDetail.desc')">
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
        :data="formData.inventoryDetailList"
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="detailId" :label="this.$t('casit.tstorage.inventoryDetail.detailId')"/>
        <el-table-column prop="title" :label="this.$t('casit.tstorage.inventoryDetail.title')"/>
        <el-table-column prop="countryId" :label="this.$t('casit.tstorage.inventoryDetail.countryId')"/>
        <el-table-column prop="countryName" :label="this.$t('casit.tstorage.inventoryDetail.countryName')"/>
        <el-table-column prop="contractId" :label="this.$t('casit.tstorage.inventoryDetail.contractId')"/>
        <el-table-column prop="contractNumber" :label="this.$t('casit.tstorage.inventoryDetail.contractNumber')"/>
        <el-table-column prop="contractCard" :label="this.$t('casit.tstorage.inventoryDetail.contractCard')"/>
        <el-table-column prop="farmerId" :label="this.$t('casit.tstorage.inventoryDetail.farmerId')"/>
        <el-table-column prop="farmerNumber" :label="this.$t('casit.tstorage.inventoryDetail.farmerNumber')"/>
        <el-table-column prop="farmerName" :label="this.$t('casit.tstorage.inventoryDetail.farmerName')"/>
        <el-table-column prop="farmerIdentity" :label="this.$t('casit.tstorage.inventoryDetail.farmerIdentity')"/>
        <el-table-column prop="unpackWeight" :label="this.$t('casit.tstorage.inventoryDetail.unpackWeight')"/>
        <el-table-column prop="weight" :label="this.$t('casit.tstorage.inventoryDetail.weight')"/>
        <el-table-column prop="basket" :label="this.$t('casit.tstorage.inventoryDetail.basket')"/>
        <el-table-column prop="content" :label="this.$t('casit.tstorage.inventoryDetail.content')"/>
        <el-table-column prop="desc" :label="this.$t('casit.tstorage.inventoryDetail.desc')"/>
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
  const AddForm = () => import('./inventoryDetailAdd.vue');
  const EditForm = () => import('./inventoryDetailEdit.vue');
  import inventoryDetailApi from '../../api/tstorage/api_inventoryDetail';

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
          'detailId': 0,
          'title': '',
          'countryId': '',
          'countryName': '',
          'contractId': '',
          'contractNumber': '',
          'contractCard': 0,
          'farmerId': '',
          'farmerNumber': '',
          'farmerName': '',
          'farmerIdentity': '',
          'weight': 0,
          'basket': '',
          'content': '',
          'desc': '',
        },
        formData: {
          inventoryDetailList: [],
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

        Promise.all([inventoryDetailApi.deleteInventoryDetail(this.formData.selectRow.id)])
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
        Promise.all([inventoryDetailApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          sort: 'id,ASC',
          contains: 'detailId,title,countryId,countryName,contractId,contractNumber,contractCard,farmerId,farmerNumber,farmerName,farmerIdentity,weight,basket,content,desc,:{keyword}:true'.format({keyword: this.formData.pagination.keyword}),
          search: 'detailId:EQ:{detailId};title:EQ:{title};countryId:EQ:{countryId};countryName:EQ:{countryName};contractId:EQ:{contractId};contractNumber:EQ:{contractNumber};contractCard:EQ:{contractCard};farmerId:EQ:{farmerId};farmerNumber:EQ:{farmerNumber};farmerName:EQ:{farmerName};farmerIdentity:EQ:{farmerIdentity};weight:EQ:{weight};basket:EQ:{basket};content:EQ:{content};desc:EQ:{desc};'.format({
            detailId: this.searchData.detailId,
            title: this.searchData.title,
            countryId: this.searchData.countryId,
            countryName: this.searchData.countryName,
            contractId: this.searchData.contractId,
            contractNumber: this.searchData.contractNumber,
            contractCard: this.searchData.contractCard,
            farmerId: this.searchData.farmerId,
            farmerNumber: this.searchData.farmerNumber,
            farmerName: this.searchData.farmerName,
            farmerIdentity: this.searchData.farmerIdentity,
            weight: this.searchData.weight,
            basket: this.searchData.basket,
            content: this.searchData.content,
            desc: this.searchData.desc,
          })
        })])
          .then(([response]) => {
            this.formData.inventoryDetailList = response.content;
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
