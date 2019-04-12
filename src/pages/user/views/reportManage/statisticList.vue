<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <transition name="slide-fade">
    <config-form v-if="childForm.configForm"
                 :visible.sync="childForm.configForm"
                 :item="formData.configSelect"
                 @refresh="onSearchButtonClick" />
    <div v-else
         class='mainPanel'>
      <div class='toolPanel'>
        <div class='queryCriteria'>
          <el-form inline>
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
                       plain
                       @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }} </el-button>
            <el-button type='primary'
                       plain
                       @click='childForm.addForm=true'>{{ $t('base.buttonAdd') }} </el-button>
            <el-button type='primary'
                       plain
                       @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }} </el-button>
          </el-button-group>
        </div>
      </div>
      <main class='contentPanel'>
        <el-table highlight-current-row
                  border
                  @current-change="handleCurrentChange"
                  :data="formData.statisticList"
                  style="width: 100%"
                  :row-class-name="tableRowClassName">
          <el-table-column type="index">
          </el-table-column>
          <el-table-column prop="serial"
                           :label="this.$t('statistic.serial')" />
          <el-table-column prop="code"
                           :label="this.$t('statistic.code')" />
          <el-table-column prop="usage"
                           :label="this.$t('statistic.usage')" />
          <el-table-column prop="category"
                           :label="this.$t('statistic.category')" />
          <el-table-column prop="template"
                           :label="this.$t('statistic.template')" />

          <el-table-column prop="name"
                           :label="this.$t('statistic.name')" />
          <el-table-column prop="title"
                           :label="this.$t('statistic.title')"
                           show-overflow-tooltip />
          <el-table-column prop="author"
                           :label="this.$t('statistic.author')"
                           v-if="false" />
          <el-table-column prop="date"
                           :label="this.$t('statistic.date')"
                           width="100"
                           v-if="false">
            <template slot-scope="scope">
              {{dateFormat(scope.row.date,'yyyy-mm-dd')}}
            </template>
          </el-table-column>
          <!-- <el-table-column
          prop="connection"
          :label="this.$t('statistic.connection')"
        />
        <el-table-column
          prop="interfaceId"
          :label="this.$t('statistic.interfaceId')"
        />
        <el-table-column
          prop="total"
          :label="this.$t('statistic.total')"
        /> -->
          <el-table-column prop="export"
                           :label="this.$t('statistic.export')">
            <template slot-scope="scope">
              {{scope.row.export|boolean}}
            </template>
          </el-table-column>
          <el-table-column prop="rate"
                           :label="this.$t('statistic.rate')"
                           v-if="false" />
          <el-table-column prop="desc"
                           :label="this.$t('statistic.desc')"
                           v-if="false" />
          <el-table-column prop="templatPath"
                           :label="this.$t('statistic.templatPath')" />
          <el-table-column fixed="right"
                           :label="$t('base.titleOperation')"
                           width="200">
            <template slot-scope="scope">
              <el-button @click="editButtonClick(scope.row,false)"
                         plain
                         type="text"
                         size="small">{{$t('base.buttonView')}}</el-button>
              <el-button type="text"
                         plain
                         size="small"
                         @click="editButtonClick(scope.row,true)">{{$t('base.buttonEdit')}}</el-button>
              <el-button type='text'
                         plain
                         @click="configButtonClick(scope.row)"
                         size="small">配置</el-button>
              <el-button type="text"
                         plain
                         size="small"
                         @click="addMenuButtonClick(scope.row,true)">添加菜单</el-button>
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
                     :visible.sync="childForm.editForm"
                     @refresh="onSearchButtonClick" />
        </el-dialog>
        <el-dialog :title="$t('base.buttonView')"
                   :visible.sync="childForm.viewForm"
                   top="10px"
                   :before-close="handleClose">
          <edit-form :item=formData.viewSelect
                     :isEdit=childForm.isEdit
                     :visible.sync="childForm.viewForm" />
        </el-dialog>
        <el-dialog title="添加菜单"
                   :visible.sync="childForm.menuForm"
                   top="10px"
                   :before-close="handleClose">
          <menu-form :item.sync=formData.menuSelect
                     :visible.sync="childForm.menuForm" />
        </el-dialog>
      </template>
    </div>
  </transition>
</template>
<script>
const configForm = () => import("./reportList.vue");
const AddForm = () => import("./statisticAdd.vue");
const EditForm = () => import("./statisticEdit.vue");
const AddMenuForm = () => import("./reportMenuAdd.vue");

import statisticApi from "../../api/online/apiStatistic";
export default {
  data() {
    return {
      childForm: {
        addForm: false,
        editForm: false,
        viewForm: false,
        isEdit: false,
        configForm: false,
        menuForm: false
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
            text: this.$t("base.oneWeek"),
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
        serial: "",
        usage: "",
        category: "",
        template: "",
        code: "",
        name: "",
        title: "",
        author: "",
        date: "",
        connection: 0,
        interfaceId: "",
        total: true,
        export: true,
        hot: 0,
        rate: 0,
        desc: ""
      },
      formData: {
        statisticList: [],
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
    "edit-form": EditForm,
    "config-form": configForm,
    "menu-form": AddMenuForm
  },
  methods: {
    addMenuButtonClick(selectRow, isEdit) {
      this.formData.menuSelect = selectRow;
      this.childForm.menuForm = true;
    },
    configButtonClick(selectRow) {
      this.formData.configSelect = selectRow;
      this.childForm.configForm = true;
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
          message: this.$t("message.unSelectAny"),
          type: "info"
        });
        return;
      }

      Promise.all([statisticApi.deleteStatistic(this.formData.selectRow.id)])
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
        statisticApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          contains: "serial,usage,category,template,code,name,title,author,date,connection,interfaceId,total,export,hot,rate,desc,:{keyword}:true".format(
            { keyword: this.formData.pagination.keyword }
          ),
          search: "serial:EQ:{serial};usage:EQ:{usage};category:EQ:{category};template:EQ:{template};code:EQ:{code};name:EQ:{name};title:EQ:{title};author:EQ:{author};date:EQ:{date};connection:EQ:{connection};interfaceId:EQ:{interfaceId};total:EQ:{total};export:EQ:{export};hot:EQ:{hot};rate:EQ:{rate};desc:EQ:{desc};".format(
            {
              serial: this.searchData.serial,
              usage: this.searchData.usage,
              category: this.searchData.category,
              template: this.searchData.template,
              code: this.searchData.code,
              name: this.searchData.name,
              title: this.searchData.title,
              author: this.searchData.author,
              date: this.searchData.date,
              connection: this.searchData.connection,
              interfaceId: this.searchData.interfaceId,
              total: this.searchData.total,
              export: this.searchData.export,
              hot: this.searchData.hot,
              rate: this.searchData.rate,
              desc: this.searchData.desc
            }
          )
        })
      ])
        .then(([response]) => {
          this.formData.statisticList = response.content;
          this.formData.pagination.total = parseFloat(response.totalElements);
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
      this.childForm.menuForm = false;
      this.onSearchButtonClick();
      done();
    }
  }
};
</script>
<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
</style>