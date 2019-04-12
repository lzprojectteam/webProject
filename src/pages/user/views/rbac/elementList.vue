<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-form-item :label="$t('menu.belongSystem')">
            <el-select v-model='formData.systemId'
                       @change='onSystemChanged'>
              <el-option value='-'
                         key='-'>{{ $t('base.all') }} </el-option>
              <el-option v-for="item in  formData.systemList"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('menu.parent')">
            <el-cascader :options='formData.menuList'
                         v-model='formData.selectMenu'
                         :props='menuProps'
                         style="width: 100%"></el-cascader>
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
          <el-button plain type='primary'
                     @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }} </el-button>
          <el-button plain type='primary'
                     @click='childForm.addForm=true'>{{ $t('base.buttonAdd') }} </el-button>
          <el-button plain type='primary'
                     @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }} </el-button>
        </el-button-group>

      </div>
    </div>
    <main class='contentPanel'>
      <el-table highlight-current-row
                border
                @current-change="handleCurrentChange"
                :data="formData.elementList"
                style="width: 100%"
                :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="systemName"
                         :label="this.$t('element.belongSystem')"
                         show-overflow-tooltip />
        <el-table-column :label="this.$t('element.menu')">
          <template slot-scope="scope">
            <el-tag size="medium">
              {{formateAncestry(scope.row.menu.ancestry) + " / " + scope.row.menu.title}}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="code"
                         :label="this.$t('base.code')"
                         show-overflow-tooltip />
        <el-table-column prop="url"
                         :label="this.$t('element.url')" />
        <el-table-column prop="icon"
                         :label="this.$t('base.icon')"
                         width="80">
          <template slot-scope="scope">
            <i :class="scope.row.icon" />
          </template>
        </el-table-column>
        <el-table-column prop="name"
                         :label="this.$t('element.name')"
                         width="80" />
        <el-table-column prop="sortBy"
                         :label="this.$t('base.sortBy')"
                         width="80" />
        <el-table-column prop="typeName"
                         :label="this.$t('element.type')"
                         width="80" />

        <el-table-column prop="visible"
                         :label="this.$t('base.visible')"
                         width="60">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.visible"
                         disabled />
          </template>
        </el-table-column>

        <el-table-column fixed="right"
                         :label="$t('base.titleOperation')"
                         header-align="center"
                         width="100">
          <template slot-scope="scope">
            <el-button plain @click="editButtonClick(scope.row,false)"
                       type="text"
                       size="small">
              {{$t('base.buttonView')}}
            </el-button>
            <el-button plain type="text"
                       size="small"
                       @click="editButtonClick(scope.row,true)">
              {{$t('base.buttonEdit')}}
            </el-button>
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
const AddForm = () => import("./elementAdd.vue");
const EditForm = () => import("./elementEdit.vue");
import elementApi from "../../api/apiElement";
import systemApi from "../../api/apiSystem";
import menuApi from "../../api/apiMenu";

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
        url: ""
      },
      menuProps: {
        label: "title",
        // disabled: 'leaf',
        value: "id",
        children: "child"
      },
      formData: {
        systemId: "-",
        menuList: [],
        selectMenu: [],
        systemList: [],
        elementList: [],
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
  created() {
    Promise.all([systemApi.getAll()])
      .then(([systems]) => {
        this.formData.systemList = systems.content;
      })
      .catch(error => {});
  },
  components: {
    "add-form": AddForm,
    "edit-form": EditForm
  },
  methods: {
    onSystemChanged() {
      this.formData.pagination.currentPage = 1;
      this.formData.selectMenu = [];
      Promise.all([
        menuApi.getMenuTree(this.formData.systemId, {
          size: 400,
          number: 0,
          keyword: "%"
        })
      ])
        .then(([response]) => {
          //先将结果转化为JSON，操作完成后，再将JSON串转化数组
          this.formData.menuList = JSON.parse(
            JSON.stringify(response).replaceAll(',"child":\\[\\]', "")
          );
        })
        .catch(error => {});
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

      Promise.all([elementApi.deleteElement(this.formData.selectRow.id)])
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
      this.formData.elementList = [];
      var menuId = "-";
      if (
        this.formData.selectMenu !== undefined &&
        this.formData.selectMenu.length > 0
      ) {
        menuId = this.formData.selectMenu[this.formData.selectMenu.length - 1];
      }
      Promise.all([
        elementApi.getByMenuId(menuId, {
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          keyword: this.formData.pagination.keyword
        })
      ])
        .then(([response]) => {
          this.formData.elementList = response.content;
          this.formData.pagination.total = parseFloat(response.totalElements);
        })
        .catch(error => {});
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
    },
    formateAncestry(data) {
      if (data === null || data === undefined || data === "") {
        return "无";
      }
      var jsoData = JSON.parse(data);
      var title = "";
      for (var value of jsoData) {
        title += value.title + "/";
        //console.log(value.title);
      }
      return title.substr(0, title.length - 1);
    }
  }
};
</script>
