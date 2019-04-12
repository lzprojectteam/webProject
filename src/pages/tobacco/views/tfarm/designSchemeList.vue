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
                            :placeholder="$t('base.pleaseSelect')"></el-date-picker>
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
                :data="formData.designSchemeList"
                style="width: 100%"
                :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="code"
                         :label="this.$t('tobacco.tfarm.designScheme.code')" />
        <el-table-column prop="name"
                         width="160"
                         :label="this.$t('tobacco.tfarm.designScheme.name')" />
        <el-table-column prop="shortName"
                         :label="this.$t('tobacco.tfarm.designScheme.shortName')" />
        <el-table-column prop="startAnnual"
                         :label="this.$t('tobacco.tfarm.designScheme.startAnnual')" />
        <el-table-column :label="this.$t('tobacco.tfarm.designScheme.classify')">
          <template slot-scope="slot">
            {{formatClassify(slot.row)}}
          </template>
        </el-table-column>
        <el-table-column prop="level"
                         :label="this.$t('tobacco.tfarm.designScheme.level')">
          <template slot-scope="slot">
            {{formatLevel(slot.row.level)}}
          </template>
        </el-table-column>
        <el-table-column prop="minLevel"
                         :label="this.$t('tobacco.tfarm.designScheme.minLevel')">
          <template slot-scope="slot">
            {{formatLevel(slot.row.minLevel)}}
          </template>
        </el-table-column>
        <el-table-column prop="allowExtend"
                         :label="this.$t('tobacco.tfarm.designScheme.allowExtend')">
          <template slot-scope="slot">
            <el-checkbox v-model="slot.row.allowExtend"
                         disabled />
          </template>
        </el-table-column>
        <el-table-column prop="control"
                         :label="this.$t('tobacco.tfarm.designScheme.control')">
          <template slot-scope="slot">
            {{slot.row.control|controlFilter}}
          </template>
        </el-table-column>
        <el-table-column prop="distributeStatus"
                         :label="this.$t('tobacco.tfarm.designScheme.distributeStatus')">
          <template slot-scope="slot">
            {{slot.row.control|statusFilter}}
          </template>
        </el-table-column>
        <el-table-column prop="desc"
                         :label="this.$t('tobacco.tfarm.designScheme.desc')" />
        <el-table-column fixed="right"
                         :label="$t('base.titleOperation')"
                         width="150">
          <template slot-scope="scope">
            <!-- 这里其实是指派 -->

            <el-button @click="onDistributeClick(scope.row)"
                       type="text"
                       plain
                       :disabled="!checkDistribute(scope.row.minLevel)||scope.row.distributeStatus===3||scope.row.control!==5"
                       size="small">{{$t('tobacco.tfarm.designScheme.distribute')}}</el-button>
            <el-button type="text"
                       size="small"
                       plain
                       @click="editButtonClick(scope.row,scope.row.control===1)">{{$t('base.buttonEdit')}}</el-button>
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
      <el-dialog :title="$t('tobacco.tfarm.designScheme.distribute')+'['+ formData.viewSelect.name+']'"
                 :visible.sync="childForm.distributeForm"
                 top="10px"
                 :before-close="handleClose">
        <div class="cas-group">
          <el-button type="success"
                     plain
                     @click="onDistributeSubmitClick"
                     style="margin 5px 0px"
                     size="small">{{$t('tobacco.tfarm.designScheme.distribute')}}</el-button>
          <el-tree :props="formData.props"
                   ref="tree"
                   :load="loadChild"
                   node-key="id"
                   lazy
                   show-checkbox
                   style="min-height:300px;margin-top:5px;border-top: 1px solid;">
          </el-tree>
        </div>
      </el-dialog>

    </template>
  </div>
</template>
<script>
const AddForm = () => import("./designSchemeAdd.vue");
const EditForm = () => import("./designSchemeEdit.vue");
const OrganizationForm = () => import("@/components/Organization");
import designSchemeClassifyApi from "../../api/tfarm/apiDesignSchemeClassify";
import designSchemeApi from "../../api/tfarm/apiDesignScheme";
import levelApi from "@/api/xbasic/apiLevel";
import organizationApi from "@/api/xbasic//apiOrganization";
import hrEmployeeApi from "../../api/thuman/api_hrEmployee";
import constant from "../../lang/zh/constant";
export default {
  data() {
    return {
      hrEmployeeList: null,
      childForm: {
        addForm: false,
        editForm: false,
        viewForm: false,
        isEdit: false,
        distributeForm: false
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
        annual: this.$store.state.system.annual.toString()
      },
      searchPerson: {
        taskCode: "",
        personCode: ""
      },
      formData: {
        distributeOptions: [],
        distributeSelect: [],
        classifyList: [],
        levelList: [],
        designSchemeList: [],
        currentLevel: "",
        pagination: {
          //用于分页的变量
          currentPage: 1,
          pageSize: 10,
          total: 0,
          keyword: "",
          pageSizeOpts: [10, 15, 20, 25, 30]
        },
        rowSelection: [],
        viewSelect: {},
        props: {
          value: "id",
          label: "name"
        }
      }
    };
  },
  created() {
    let orgId = undefined;
    if (this.$store.getters.user.organization !== undefined) {
      orgId = this.$store.getters.user.organization.organizationId;
      this.formData.distributeOptions = [
        {
          id: this.$store.getters.user.organization.organizationId,
          name: this.$store.getters.user.organization.organizationName,
          children: []
        }
      ];
    }
    this.searchData.annual = this.$store.state.system.annual + "";
    Promise.all([
      designSchemeClassifyApi.getAll({
        size: 500,
        page: 0,
        sort: "id,asc",
        search: "".format({})
      }),
      levelApi.getAll({
        size: 500,
        page: 0,
        sort: "id",
        search: "lead:eq:11"
      }),
      organizationApi.getAll({
        search: "id:eq:" + orgId
      })
    ])
      .then(([response, levelResponse, organizationResponse]) => {
        this.formData.classifyList = response.content;
        this.formData.levelList = levelResponse.content;
        if (organizationResponse.content.length > 0) {
          this.formData.currentLevel = organizationResponse.content[0].level;
        }
      })
      .catch(error => {});

    this.onSearchButtonClick();
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
  components: {
    "add-form": AddForm,
    "edit-form": EditForm,
    OrganizationForm
  },
  filters: {
    controlFilter: function(key) {
      let it = constant.tfarm.controlList.find(item => {
        return item.key === key;
      });
      return it === undefined ? "" : it.value;
    },
    statusFilter: function(key) {
      let it = constant.tfarm.distributeStatusList.find(item => {
        return item.key === key;
      });
      return it === undefined ? "" : it.value;
    }
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "warning-row";
      } else {
        return "success-row";
      }
    },
    organizationOnchange(label, value, values) {
      console.info(value);
      this.searchData.orgId = value;

      console.info("查找用户" + value);
      // this.searchData.orgId = value;

      Promise.all([
        hrEmployeeApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          sort: "name,ASC",
          search: "organization.organizationId:rlike:{orgid}".format({
            orgid: value
          })
        })
      ])
        .then(([response]) => {
          this.hrEmployeeList = response.content;
          console.info("查找到了：" + this.hrEmployeeList);
          this.$notify({
            title: this.$t("base.hint"),
            message: this.$t("base.loadingDone"),
            duration: 1000,
            position: "bottom-right"
          });
        })
        .catch(error => {});
    },
    onDistributeClick(row) {
      this.formData.viewSelect = row;
      this.childForm.distributeForm = true;
    },
    formatClassify(item) {
      let cl = this.formData.classifyList.find(it => {
        return it.id === item.classify.id;
      });
      return cl === undefined ? "" : cl.name;
    },
    checkDistribute(item) {
      let cl = this.formData.levelList.find(it => {
        return it.id === item;
      });
      if (cl === undefined) {
        return false;
      } else {
        return this.formData.currentLevel.depth < cl.depth;
      }
    },
    formatLevel(item) {
      let cl = this.formData.levelList.find(it => {
        return it.id === item;
      });
      return cl === undefined ? "" : cl.name;
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

      Promise.all([
        designSchemeApi.deleteDesignScheme(this.formData.selectRow.id)
      ])
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
    handlePersionChange(val) {
      console.info(val);
    },
    handleCurrentChange(val) {
      this.formData.selectRow = val;
      console.info(val);
    },
    onSearchButtonClick() {
      let search = "startAnnual:eq:{annual};".format({
        annual: this.searchData.annual
      });
      let orgId = "";
      if (this.$store.getters.user.organization !== undefined) {
        orgId = this.$store.getters.user.organization.organizationId;
      }
      search = "organization.organizationId:eq:{organizationId};".format({
        organizationId: orgId
      });
      if (this.searchData.classify !== "-") {
        search += "classify.id:eq:" + this.searchData.classify;
      }
      Promise.all([
        designSchemeApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          contains: "name,shortName:{keyword}:true".format({
            keyword: this.formData.pagination.keyword
          }),
          search: search
        })
      ])
        .then(([response]) => {
          this.formData.designSchemeList = response.content;
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
    loadChild(node, resolve) {
      if (node.level === 0) {
        return resolve([
          {
            id: this.$store.getters.user.organization.organizationId,
            name: this.$store.getters.user.organization.organizationName,
            children: []
          }
        ]);
      }
      if (node.level > 1) return resolve([]);

      let current = node.data.id;
      Promise.all([
        organizationApi.getAll({
          search: "lead:eq:" + current
        })
      ])
        .then(([response]) => {
          // response.content;
          let child = undefined;
          if (response.content.length > 0) {
            let tmp = response.content[0];
            let minLevel = this.formData.levelList.find(it => {
              return it.id === this.formData.viewSelect.minLevel;
            });
            //还要到下一级
            if (minLevel !== undefined && minLevel.depth >= tmp.level.depth) {
              response.content.forEach(item => {
                if (minLevel.depth === tmp.level.depth) {
                  item.children = undefined;
                } else {
                  item.children = [];
                }
              });
              child = response.content;
              return resolve(child);
            }
          }
          return resolve([]);
        })
        .catch(error => {
          console.log(error);
        });
    },
    loadUserChild(node, resolve) {
      console.info(node.data.id);
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
      this.childForm.distributeForm = false;
      this.onSearchButtonClick();
      done();
    },
    RecursiveOrganization(data, id) {
      let find = data.find(item => {
        return item.id === id;
      });
      //没有查找到，继续查找
      if (find === undefined) {
        if (data.children !== undefined && data.children instanceof Array) {
          return RecursiveOrganization(data.children, id);
        } else {
          //无法找到
          return undefined;
        }
      } else {
        //查找到了
        return find;
      }
    },
    onTaskAssignClick(val) {
      console.info("绑定到人");
      console.info(val.id);
      console.info(this.formData.viewSelect.id);
    },
    onDistributeSubmitClick() {
      // console.log(this.$refs.tree.getCheckedNodes());
      // console.log(this.$refs.tree.getCheckedKeys());
      let keys = this.$refs.tree.getCheckedKeys();
      console.info(keys);
      if (this.$store.getters.user.organization !== undefined) {
        let orgId = this.$store.getters.user.organization.organizationId;
        let index = keys.indexOf(orgId);
        if (index !== -1) {
          keys.splice(index, 1);
        }
      }
      console.log(keys);
      if (keys.length === 0) {
        this.$notify({
          title: this.$t("base.hint"),
          message: "请至少选择一条记录",
          duration: 1000,
          position: "bottom-right"
        });
        return;
      }
      //传跟后台
      Promise.all([
        designSchemeApi.distribute(this.formData.viewSelect.id, keys)
      ])
        .then(([response]) => {
          this.$notify({
            title: this.$t("base.hint"),
            message: response,
            duration: 1000,
            position: "bottom-right"
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>