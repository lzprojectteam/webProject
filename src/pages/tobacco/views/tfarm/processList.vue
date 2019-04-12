<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-form-item :label="$t('tobacco.common.annual')">
            <el-date-picker v-model="searchData.annual"
                            type="year"
                            :clearable=false
                            value-format="yyyy"
                            :placeholder="$t('base.pleaseSelect')"
                            @change='onAnnaulChange'></el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tfarm.designScheme.name')">
            <el-select v-model="searchData.designScheme">
              <el-option v-for="item in formData.designSchemeList"
                         :value='item.id'
                         :key='item.id'
                         :label="item.name" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tfarm.designScheme.classify')">
            <el-select v-model="searchData.classify">
              <el-option value='-'
                         key='-'
                         :label="$t('base.all')">{{ $t('base.all') }} </el-option>
              <el-option v-for="item in formData.classifyList"
                         :value='item.id'
                         :key='item.id'
                         :label="item.name" />
            </el-select>
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

        </el-button-group>
      </div>
    </div>
    <main class='contentPanel'>
      <el-table :data="formData.processList"
                style="width: 100%;"
                border
                row-key="id">
        <el-table-column v-for="item in columns"
                         :key='item.value'
                         :prop="item.value"
                         :label="item.text"
                         :width="item.width" />
        <el-table-column prop="position"
                         :label="this.$t('tobacco.tfarm.process.position')" />
        <el-table-column prop="control"
                         :label="this.$t('tobacco.tfarm.process.control')">
          <template slot-scope="scope">
            <el-select v-model="scope.row.control"
                       disabled>
              <el-option v-for="item in $t('tobacco.tfarm.process.controlList')"
                         :value='item.key'
                         :key='item.key'
                         :label="item.value" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="desc"
                         :label="this.$t('tobacco.tfarm.process.desc')" />
        <el-table-column fixed="right"
                         :label="$t('base.titleOperation')"
                         width="260">
          <template slot-scope="scope">
            <el-button-group>
              <el-button plain
                         :disabled="!scope.row.leaf"
                         @click="onShowDialog(scope.row)">{{$t('tobacco.tfarm.process.configAtrr')}}</el-button>
              <el-button plain
                         @click="editButtonClick(scope.row,true)">{{$t('base.buttonEdit')}}</el-button>

              <el-button type='danger'
                         plain
                         :disabled='scope.row.children!==undefined&&scope.row.children.length>0'
                         @click='deleteButtonConfirm(scope.row)'>{{ $t('base.buttonDelete') }} </el-button>
            </el-button-group>

          </template>
        </el-table-column>
      </el-table>
    </main>
    <div class='footerPanel'>

    </div>
    <template>
      <el-dialog :title="$t('base.buttonAdd')"
                 :item.sync='formData.viewSelect'
                 :visible.sync="childForm.addForm"
                 top="10px"
                 :before-close="handleClose">
        <add-form />
      </el-dialog>
      <el-dialog :title="$t('base.buttonEdit')"
                 :visible.sync="childForm.editForm"
                 top="10px"
                 :before-close="handleClose">
        <add-form :item.sync=formData.viewSelect
                  :isEdit=childForm.isEdit
                  :visible.sync="childForm.editForm" />
      </el-dialog>
      <el-dialog :title="$t('tobacco.tfarm.process.configAtrr')+'['+ formData.viewSelect.name+']'"
                 :visible.sync="childForm.configForm"
                 :item.sync=formData.viewSelect
                 top="10px"
                 width="1000px">
        <process-attr-config :item.sync=formData.viewSelect
                             :isEdit=childForm.isEdit
                             :visible.sync="childForm.editForm" />
      </el-dialog>
    </template>
  </div>
</template>
<script>
const AddForm = () => import("./processAdd.vue");
const EditForm = () => import("./processEdit.vue");

import processApi from "../../api/tfarm/apiProcess";
import categoryApi from "../../api/basic/api_category";
import designSchemeClassifyApi from "../../api/tfarm/apiDesignSchemeClassify";
import designSchemeApi from "../../api/tfarm/apiDesignScheme";
import levelApi from "@/api/xbasic/apiLevel";
export default {
  data() {
    return {
      childForm: {
        addForm: false,
        editForm: false,
        viewForm: false,
        isEdit: false,
        configForm: false
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
        classify: "-",
        annual: this.$store.state.system.annual.toString(),
        designScheme: ""
      },
      formData: {
        classifyList: [],
        processList: [],
        levelList: [],
        designSchemeList: [],
        pagination: {
          //用于分页的变量
          currentPage: 1,
          pageSize: 10,
          total: 0,
          keyword: "",
          pageSizeOpts: [10, 15, 20, 25, 30]
        },
        rowSelection: [],
        viewSelect: {}
      },
      columns: [
        {
          text: this.$t("tobacco.tfarm.process.name"),
          value: "name",
          width: 200
        },
        {
          text: this.$t("tobacco.tfarm.process.code"),
          value: "code"
        },
        {
          text: this.$t("tobacco.tfarm.process.begin"),
          value: "begin"
        },
        {
          text: this.$t("tobacco.tfarm.process.from"),
          value: "from"
        },
        {
          text: this.$t("tobacco.tfarm.process.to"),
          value: "to"
        }
      ]
    };
  },
  created() {
    Promise.all([
      designSchemeClassifyApi.getAll({
        size: 500,
        page: 0,
        sort: "id,asc"
      }),
      levelApi.getAll({
        size: 500,
        page: 0,
        sort: "id",
        search: "lead:eq:11"
      }),
      designSchemeApi.getAll({
        size: 500,
        page: 0,
        search: "startAnnual:eq:" + this.$store.state.system.annual.toString()
      })
    ])
      .then(([response, levelResponse, designResponse]) => {
        this.formData.classifyList = response.content;
        this.formData.levelList = levelResponse.content;
        this.formData.designSchemeList = designResponse.content;
        if (this.formData.designSchemeList.length > 0) {
          this.searchData.designScheme = this.formData.designSchemeList[0].id;
        }
      })
      .catch(error => {});
  },
  components: {
    "add-form": AddForm,
    "edit-form": EditForm,
    treeTable: () => import("@/components/TreeTable"),
    processAttrConfig: () => import("./processAttrConfig")
  },
  methods: {
    onAnnaulChange(annual) {
      Promise.all([
        designSchemeApi.getAll({
          size: 500,
          page: 0,
          search: "startAnnual:eq:" + annual
        })
      ])
        .then(([designResponse]) => {
          this.formData.designSchemeList = designResponse.content;
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
    onShowDialog(row) {
      this.formData.viewSelect = row;
      this.childForm.configForm = true;
    },
    deleteButtonClick(row) {
      Promise.all([processApi.deleteProcess(row.id)])
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
    deleteButtonConfirm(row) {
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
          this.deleteButtonClick(row);
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
        processApi.getTree(
          this.searchData.annual,
          this.searchData.designScheme,
          this.searchData.classify,
          this.$store.getters.user.organization !== undefined
            ? this.$store.getters.user.organization.organizationId
            : ""
        )
      ])
        .then(([response]) => {
          this.formData.processList = response;
          this.$notify({
            title: this.$t("base.hint"),
            message: this.$t("base.loadingDone"),
            duration: 1000,
            position: "bottom-right"
          });
        })
        .catch(error => {});
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
