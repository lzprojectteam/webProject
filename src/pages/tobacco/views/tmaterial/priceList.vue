<style scoped>
@import "~@/styles/css/main-list.css";

</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-form-item :label="$t('tobacco.tmaterial.price.annual')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="searchData.annual"
                      @keyup.enter.native="onSearchButtonClick" />
          </el-form-item>
          <el-form-item :label="$t('tobacco.tmaterial.price.price')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="searchData.price"
                      @keyup.enter.native="onSearchButtonClick" />
          </el-form-item>
          <el-form-item :label="$t('tobacco.tmaterial.price.priceUnit')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="searchData.priceUnit"
                      @keyup.enter.native="onSearchButtonClick" />
          </el-form-item>
          <el-form-item :label="$t('tobacco.tmaterial.price.tax')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="searchData.tax"
                      @keyup.enter.native="onSearchButtonClick" />
          </el-form-item>
          <el-form-item :label="$t('tobacco.tmaterial.price.freight')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="searchData.freight"
                      @keyup.enter.native="onSearchButtonClick" />
          </el-form-item>
          <el-form-item :label="$t('tobacco.tmaterial.price.begin')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="searchData.begin"
                      @keyup.enter.native="onSearchButtonClick" />
          </el-form-item>
          <el-form-item :label="$t('tobacco.tmaterial.price.end')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="searchData.end"
                      @keyup.enter.native="onSearchButtonClick" />
          </el-form-item>
          <el-form-item :label="$t('tobacco.tmaterial.price.active')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="searchData.active"
                      @keyup.enter.native="onSearchButtonClick" />
          </el-form-item>
          <el-form-item :label="$t('tobacco.tmaterial.price.desc')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="searchData.desc"
                      @keyup.enter.native="onSearchButtonClick" />
          </el-form-item>
          <el-form-item :label="$t('base.keywords')">
            <el-input v-bind:placeholder="$t('base.ipKeywords')"
                      v-model="formData.pagination.keyword"
                      @keyup.enter.native="onSearchButtonClick" />
          </el-form-item>
        </el-form>
      </div>
      <div class='toolButton'
           style="min-width: 210px">
        <el-button-group>
          <el-button type='primary'
                     @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }} </el-button>
          <el-button type='primary'
                     @click='childForm.addForm=true'>{{ $t('base.buttonAdd') }} </el-button>
          <el-button type='primary'
                     @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }} </el-button>
        </el-button-group>
      </div>
    </div>
    <main class='contentPanel'>
      <el-table highlight-current-row
                border
                @current-change="handleCurrentChange"
                :data="formData.priceList"
                style="width: 100%"
                :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="annual"
                         :label="this.$t('tobacco.tmaterial.price.annual')" />
        <el-table-column prop="price"
                         :label="this.$t('tobacco.tmaterial.price.price')" />
        <el-table-column prop="priceUnit"
                         :label="this.$t('tobacco.tmaterial.price.priceUnit')" />
        <el-table-column prop="tax"
                         :label="this.$t('tobacco.tmaterial.price.tax')" />
        <el-table-column prop="freight"
                         :label="this.$t('tobacco.tmaterial.price.freight')" />
        <el-table-column prop="begin"
                         :label="this.$t('tobacco.tmaterial.price.begin')" />
        <el-table-column prop="end"
                         :label="this.$t('tobacco.tmaterial.price.end')" />
        <el-table-column prop="active"
                         :label="this.$t('tobacco.tmaterial.price.active')" />
        <el-table-column prop="desc"
                         :label="this.$t('tobacco.tmaterial.price.desc')" />
        <el-table-column fixed="right"
                         :label="$t('base.titleOperation')"
                         width="100">
          <template slot-scope="scope">
            <el-button @click="editButtonClick(scope.row,false)"
                       type="text"
                       size="small">{{$t('base.buttonView')}}</el-button>
            <el-button type="text"
                       size="small"
                       @click="editButtonClick(scope.row,true)">{{$t('base.buttonEdit')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </main>
    <div class='footerPanel'>
      <el-pagination :page-size='formData.pagination.pageSize'
                     :total='formData.pagination.total'
                     :current-page='formData.pagination.currentPage'
                     @current-change='onPageChange'
                     :page-sizes='formData.pagination.pageSizeOpts'
                     @size-change='onPageSizeChange'
                     layout="total, sizes, prev, pager, next, jumper"
                     placement='top'></el-pagination>
    </div>
    <template>
      <el-dialog :title="$t('base.buttonAdd')"
                 :visible.sync="childForm.addForm"
                 top="10px"
                 :before-close="handleClose">
        <add-form />
      </el-dialog>
      <el-dialog :title="$t('base.buttonEdit')"
                 :visible.sync="childForm.editForm"
                 top="10px"
                 :before-close="handleClose">
        <edit-form :item.sync=formData.viewSelect
                   :isEdit=childForm.isEdit
                   :visible.sync="childForm.editForm" />
      </el-dialog>
      <el-dialog :title="$t('base.buttonView')"
                 :visible.sync="childForm.viewForm"
                 top="10px"
                 :before-close="handleClose">
        <edit-form :item=formData.viewSelect
                   :isEdit=childForm.isEdit
                   :visible.sync="childForm.viewForm" />
      </el-dialog>
    </template>
  </div>
</template>
<script>
const AddForm = () => import("./priceAdd.vue");
const EditForm = () => import("./priceEdit.vue");
import priceApi from "../../api/tmaterial/apiPrice";
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
            text: this.$t("base.today"),

            onClick: picker => {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: this.$t("base.yesterday"),

            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: this.$t("base.threeMonth"),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      searchData: {
        annual: 0,
        price: 0,
        priceUnit: 0,
        tax: 0,
        freight: 0,
        begin: "",
        end: "",
        active: true,
        desc: ""
      },
      formData: {
        priceList: [],
        pagination: {
          //用于分页的变量
          currentPage: 1,
          pageSize: 10,
          total: 0,
          keyword: "",
          pageSizeOpts: [10, 15, 20, 25, 30]
        },
        rowSelection: []
      }
    };
  },
  created() {},
  components: {
    "add-form": AddForm,
    "edit-form": EditForm
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
          message: this.$t("message.unSelectAny"),
          type: "info"
        });
        return;
      }

      Promise.all([priceApi.softDelete(this.formData.selectRow.id)])
        .then(([response]) => {
          this.$message({
            type: "info",
            message: this.$t("message.deleteOk")
          });
          this.formData.selectRow = null;
          this.onSearchButtonClick();
        })
        .catch(error => {});
    },
    deleteButtonConfirm() {
      this.$confirm(
        this.$t("message.deleteConfirm"),
        this.$t("base.titleTip"),
        {
          confirmButtonText: this.$t("base.buttonOk"),
          cancelButtonText: this.$t("base.buttonCancel"),
          type: "warning"
        }
      )
        .then(() => {
          this.deleteButtonClick();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$t("message.cancel")
          });
        });
    },
    handleCurrentChange(val) {
      this.formData.selectRow = val;
    },
    onSearchButtonClick() {
      Promise.all([
        priceApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          contains: "annual,price,priceUnit,tax,freight,begin,end,active,desc,:{keyword}:true".format(
            { keyword: this.formData.pagination.keyword }
          ),
          search: "annual:EQ:{annual};price:EQ:{price};priceUnit:EQ:{priceUnit};tax:EQ:{tax};freight:EQ:{freight};begin:EQ:{begin};end:EQ:{end};active:EQ:{active};desc:EQ:{desc};".format(
            {
              annual: this.searchData.annual,
              price: this.searchData.price,
              priceUnit: this.searchData.priceUnit,
              tax: this.searchData.tax,
              freight: this.searchData.freight,
              begin: this.searchData.begin,
              end: this.searchData.end,
              active: this.searchData.active,
              desc: this.searchData.desc
            }
          )
        })
      ])
        .then(([response]) => {
          this.formData.priceList = response.content;
          this.formData.pagination.total = parseFloat(response.totalElements);;
          this.$notify({
            title: this.$t("base.hint"),
            message: this.$t("base.loadingDone"),
            duration: 1000,
            position: "bottom-right"
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
        return "warning-row";
      } else {
        return "success-row";
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