<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <transition name="slide-fade">
    <add-form v-if="childForm.addForm"
              :visible.sync="childForm.addForm" />
    <edit-form v-else-if="childForm.editForm"
               :tableId='formData.selectRow===null?"":formData.selectRow.id'
               :visible.sync="childForm.editForm" />
    <div v-else
         class="mainPanel">
      <div class="toolPanel">
        <div class="queryCriteria">
          <el-form :show-message="false"
                   inline>
            <el-form-item :label="$t('menu.belongSystem')">
              <el-select v-model='formData.systemId'
                         @change='onSystemChanged'>
                <el-option value='-'
                           key='-'>{{ $t('base.all') }}</el-option>
                <el-option v-for="item in  formData.systemList"
                           :key="item.id"
                           :label="item.name"
                           :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('base.keywords')">
              <el-input v-bind:placeholder="$t('base.ipKeywords')"
                        v-model="formData.pagination.keyword"
                        @keyup.enter.native="onSearchButtonClick" />
            </el-form-item>
          </el-form>
        </div>
        <div class="toolButton"
             style="flex:4 !important;line-height: 36px">
          <el-button-group>
            <el-button type="primary"
                       plain
                       @click="onSearchButtonClick"
                       size="small">{{ $t('base.buttonSearch') }}</el-button>
            <el-button type="success"
                       plain
                       @click="childForm.addForm=true"
                       size="small">{{ $t('base.buttonAdd') }}</el-button>
            <el-button type="success"
                       plain
                       @click="onGenAllButtonClick"
                       size="small">{{ $t('onlineForm.buttonGeneratorAll') }}
            </el-button>
            <el-button type="warning"
                       plain
                       @click="onClearButtonClick"
                       size="small">{{ $t('onlineForm.buttonClear') }}
            </el-button>
            <el-button type="success"
                       plain
                       @click="onDownloadButtonClick"
                       size="small">{{ $t('onlineForm.buttonDownload') }}
            </el-button>
            <el-button type="danger"
                       plain
                       @click="deleteButtonConfirm"
                       size="small">{{ $t('base.buttonDelete') }}</el-button>
          </el-button-group>
        </div>
      </div>
      <main class="contentPanel">
        <el-table border
                  highlight-current-row
                  :data="formData.roleList"
                  @current-change="handleCurrentChange"
                  @selection-change="handleSelectionChange"
                  style="width: 100%"
                  :row-class-name="tableRowClassName">
          <el-table-column type="selection">
          </el-table-column>
          <el-table-column prop="title"
                           :label="$t('onlineForm.title')"
                           show-overflow-tooltip />
          <el-table-column prop="packageName"
                           :label="$t('onlineForm.packageName')"
                           show-overflow-tooltip />
          <el-table-column prop="entityName"
                           :label="$t('onlineForm.entityName')"
                           show-overflow-tooltip />
          <el-table-column prop="schema"
                           :label="$t('onlineForm.schema')" />
          <el-table-column prop="tableName"
                           :label="$t('onlineForm.tableName')"
                           show-overflow-tooltip />
          <el-table-column prop="extend"
                           :label="$t('onlineForm.extend')" />
          <el-table-column prop="primaryKeyType"
                           :label="$t('onlineForm.primaryKeyType')" />
          <el-table-column prop="generator"
                           :label="$t('onlineForm.generator')" />
          <el-table-column prop="enablePagination"
                           width="60"
                           :label="$t('onlineForm.enablePagination')">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.enablePagination"
                           disabled />
            </template>
          </el-table-column>
          <el-table-column prop="isTree"
                           width="60"
                           :label="$t('onlineForm.isTree')">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.isTree"
                           disabled />
            </template>
          </el-table-column>

          <el-table-column fixed="right"
                           :label="$t('base.titleOperation')"
                           width="120px">
            <template slot-scope="scope">
              <el-button type="text"
                         @click="editButtonClick(scope.row,true)">
                {{$t('base.buttonEdit')}}
              </el-button>
              <el-dropdown split-button
                           type="text"
                           @command="showDetailDialog"
                           trigger="click"
                           v-show="false">
                <span class="el-dropdown-link">
                  {{ $t('base.more')}}
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command='1'> {{ $t('onlineForm.propertyPanel')}}</el-dropdown-item>
                  <el-dropdown-item command='2'> {{ $t('onlineForm.formPanel')}}</el-dropdown-item>
                  <el-dropdown-item command='3'> {{ $t('onlineForm.foreignKeyPanel')}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-button type="text"
                         @click="genButtonClick(scope.row)">
                {{ $t('onlineForm.buttonGenerator')}}
              </el-button>
            </template>
          </el-table-column>

        </el-table>
      </main>
      <div class="footerPanel">
        <el-pagination :page-size='formData.pagination.pageSize'
                       :total='formData.pagination.total'
                       :current-page='formData.pagination.currentPage'
                       @current-change='onPageChange'
                       :page-sizes='formData.pagination.pageSizeOpts'
                       @size-change='onPageSizeChange'
                       layout="total, sizes, prev, pager, next, jumper"
                       placement='top'></el-pagination>
      </div>
    </div>

  </transition>

</template>
<script>
import AddForm from "./formAdd.vue";
import EditForm from "./formEdit.vue";
import formApi from "../../api/online/apiForm";
const PropertyPanel = () => import("./propertyPanelNew.vue");
import systemApi from "../../api/apiSystem";
import util from "@/utils/util";
export default {
  name: "online-form",
  components: { "add-form": AddForm, "edit-form": EditForm, PropertyPanel },
  data() {
    return {
      childForm: {
        addForm: false,
        editForm: false,
        viewForm: false,
        assignForm: false,
        propertyForm: false
      },
      formData: {
        systemId: "-",
        systemList: [],
        selectRole: [],
        roleList: [],
        pagination: {
          //用于分页的变量
          currentPage: 1,
          pageSize: 10,
          total: 0,
          keyword: "",
          pageSizeOpts: [10, 15, 20, 25, 30]
        },
        rowSelection: [],
        selectRow: {},
        multipleSelection: []
      }
    };
  },
  created() {
    Promise.all([systemApi.getAll()])
      .then(([systems]) => {
        this.formData.systemList = systems.content;
      })
      .catch(error => {});
  },
  methods: {
    showDetailDialog(command) {
      switch (command) {
        case "1":
          this.childForm.propertyForm = true;
          break;
        case "2":
          break;
        case "3":
          break;
      }
    },
    handleSelectionChange(val) {
      this.formData.multipleSelection = [];
      console.log(val);
      for (var value of val) {
        this.formData.multipleSelection.push(value.id);
      }
    },
    onSystemChanged() {
      this.formData.pagination.currentPage = 1;
    },
    handleCurrentChange(val) {
      this.formData.selectRow = val;
    },
    editButtonClick(selectRow) {
      this.formData.selectRow = selectRow;
      this.childForm.editForm = true;
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
      Promise.all([formApi.deleteTable(this.formData.selectRow.id)])
        .then(([response]) => {
          this.$message({
            type: "info",
            message: this.$t("message.deleteOk")
          });
          this.formData.selectRow = null;
          this.onSearchButtonClick();
        })
        .catch(error => {
          console.log(error);
          this.$Message.info({
            content: error,
            duration: 10,
            closable: true
          });
        });
    },
    genButtonClick(row) {
      Promise.all([formApi.generator(row.id)])
        .then(([response]) => {
          this.$message({
            message: this.$t("onlineForm.operationOk"),
            type: "info"
          });
        })
        .catch(error => {});
    },
    onGenAllButtonClick(row) {
      if (
        this.formData.multipleSelection === undefined ||
        this.formData.multipleSelection.length === 0
      ) {
        this.$message({
          message: this.$t("message.unSelectAny"),
          type: "info"
        });
        return;
      }
      Promise.all([
        formApi.generatorAll({
          "tableIdList[]": this.formData.multipleSelection
        })
      ])
        .then(([response]) => {
          this.$message({
            message: this.$t("onlineForm.operationOk"),
            type: "info"
          });
        })
        .catch(error => {});
    },
    onClearButtonClick(row) {
      Promise.all([formApi.clearSourceDir()])
        .then(([response]) => {
          this.$message({
            message: this.$t("onlineForm.operationOk"),
            type: "info"
          });
        })
        .catch(error => {});
    },
    onDownloadButtonClick(row) {
      Promise.all([formApi.downloadSource()])
        .then(([response]) => {
          util.downloadWithStream(response);
          this.$message({
            message: this.$t("onlineForm.operationOk"),
            type: "info"
          });
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

    tableSelectChanged(selection, row) {
      this.formData.rowSelection = selection;
    },
    tableUnSelectChanged(selection, row) {
      this.formData.rowSelection = selection;
    },

    onSearchButtonClick() {
      var searchStr = "";
      if (
        this.formData.systemId !== undefined &&
        this.formData.systemId !== "-"
      ) {
        searchStr = "systemId:like:{systemId};".format({
          systemId: this.formData.systemId
        });
      }
      Promise.all([
        formApi.getAllTable({
          size: this.formData.pagination.pageSize,
          contains: "title,packageName,tableName,entityName:{keyword}:true".format(
            { keyword: this.formData.pagination.keyword }
          ),
          page: this.formData.pagination.currentPage - 1,
          search: searchStr
        })
      ])
        .then(([response]) => {
          this.formData.roleList = response.content;
          this.formData.pagination.total = parseFloat(response.totalElements);
        })
        .catch(error => {
          console.log(error);
        });
    },
    formateAncestry(data) {
      if (data === null || data === undefined || data === "") {
        return "无";
      }

      var jsoData = JSON.parse(data);
      var title = "";
      for (var value of jsoData) {
        title += value.name + "/";
        //console.log(value.title);
      }
      return title.substr(0, title.length - 1);
    },
    formateAncestryToParent(data) {
      if (data === null || data === undefined || data === "") {
        return "无";
      }
      var jsoData = JSON.parse(data);
      return jsoData[jsoData.length - 1].name;
    },
    onPageChange(index) {
      this.formData.pagination.currentPage = index;
      this.onSearchButtonClick();
    },
    onPageSizeChange(size) {
      this.formData.pagination.pageSize = size;
      this.onSearchButtonClick();
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

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
