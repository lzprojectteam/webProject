<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
            <organization-form :root="userOrgId"
                               @onchange="organizationOnchange"
                               v-model="searchData.orgId" />
          </el-form-item>
          <el-form-item :label="this.$t('tobacco.setup.balance.model')">
            <el-select :placeholder="$t('base.pleaseSelect')"
                       v-model="searchData.lineId"
                       clearable>
              <el-option v-for="item in formData.modelList"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
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
      <div class='toolButton'
           style="min-width: 250px">
        <el-button-group>
          <el-button type='primary'
                     @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }}</el-button>
          <el-button type="primary"
                     @click="parameterButtonClick">
            {{$t('tobacco.setup.balance.parameter')}}
          </el-button>
          <el-button type='primary'
                     @click='childForm.addForm=true'>{{ $t('base.buttonAdd') }}</el-button>
          <el-button type='primary'
                     @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }}</el-button>
        </el-button-group>
      </div>
    </div>
    <main class='contentPanel'>
      <el-table highlight-current-row
                border
                @current-change="handleCurrentChange"
                @expand-change="findBind"
                :data="formData.balanceList"
                style="width: 100%"
                :row-class-name="tableRowClassName">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-row>
              <el-col :span="6">
                <el-table highlight-current-row
                          label-position="left"
                          inline
                          class="demo-table-expand"
                          :data="props.row.tableData"
                          border>
                  <el-table-column prop="operatorName"
                                   :label="$t('tobacco.setup.balance.user')"
                                   min-width="80"
                                   show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="roleId"
                                   :label="$t('tobacco.setup.balance.positionName')"
                                   min-width="80"
                                   show-overflow-tooltip>
                    <template slot-scope="scope">
                      {{formateRoleId(scope.row.roleId)}}
                    </template>
                  </el-table-column>
                  <el-table-column prop="operatorNumber"
                                   :label="$t('tobacco.setup.balance.loginId')"
                                   min-width="90"
                                   show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column :label="$t('base.titleAction')"
                                   width="90">
                    <template slot-scope="scope">
                      <el-button @click="findCount(props.row,scope.row)"
                                 type="text"
                                 size="small">
                        {{$t('base.titleView')}}
                      </el-button>
                      <el-button @click="userDeleteButtonConfirm(scope.row.id,props.row,scope.row)"
                                 type="text"
                                 size="small">
                        {{$t('base.buttonDelete')}}
                      </el-button>

                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
              <el-col :span="1"><span>&nbsp;</span></el-col>
              <el-col :span="7">
                <el-table highlight-current-row
                          label-position="left"
                          inline
                          class="demo-table-expand"
                          :data="props.row.countData"
                          border>
                  <el-table-column prop="lineId"
                                   :label="$t('tobacco.setup.lineRoleAlias.lineId')"
                                   width="160"
                                   show-overflow-tooltip>
                    <template slot-scope="scope">
                      {{formateLineId(scope.row.lineId)}}
                    </template>

                  </el-table-column>
                  <el-table-column prop="number"
                                   :label="$t('tobacco.setup.balance.number2')"
                                   width="100"
                                   show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="postionId"
                                   :label="$t('tobacco.setup.balance.number3')"
                                   width="100"
                                   show-overflow-tooltip>
                    <template slot-scope="scope">
                      {{formData.lineRoleAliasList[scope.row.postionId]}}
                    </template>
                  </el-table-column>
                  <el-table-column prop="username"
                                   :label="$t('tobacco.setup.balance.username')"
                                   min-width="100"
                                   show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="password"
                                   :label="$t('tobacco.setup.balance.password')"
                                   min-width="100"
                                   show-overflow-tooltip>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>

          </template>
        </el-table-column>
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="serial"
                         :label="this.$t('tobacco.setup.balance.serial')"
                         width="120"
                         show-overflow-tooltip />
        <el-table-column prop="number"
                         :label="this.$t('tobacco.setup.balance.number')"
                         width="100"
                         show-overflow-tooltip />
        <el-table-column prop="organization.organizationName"
                         :label="this.$t('org.organizationName')"
                         width="100"
                         show-overflow-tooltip />
        <el-table-column prop="line.name"
                         :label="this.$t('tobacco.setup.balance.model')"
                         width="150"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="title"
                         :label="this.$t('tobacco.setup.balance.title')"
                         width="100"
                         show-overflow-tooltip />
        <el-table-column prop="author"
                         :label="this.$t('tobacco.setup.balance.author')"
                         width="100"
                         show-overflow-tooltip />
        <el-table-column prop="date"
                         :label="this.$t('tobacco.setup.balance.date')"
                         width="100">
          <template slot-scope="scope">
            {{ formatDate(scope.row.date)}}
          </template>
        </el-table-column>
        <el-table-column prop="alias"
                         :label="this.$t('tobacco.setup.balance.alias')"
                         width="100"
                         show-overflow-tooltip />
        <el-table-column prop="host"
                         :label="this.$t('tobacco.setup.balance.host')"
                         width="150"
                         show-overflow-tooltip />
        <el-table-column prop="port"
                         :label="this.$t('tobacco.setup.balance.port')" />
        <el-table-column prop="picture"
                         :label="this.$t('tobacco.setup.balance.picture')" />
        <el-table-column prop="control"
                         :label="this.$t('tobacco.setup.balance.control')">
          <template slot-scope="scope">
            {{ formatControl(scope.row.control)}}
          </template>
        </el-table-column>
        <el-table-column prop="desc"
                         :label="this.$t('tobacco.setup.balance.desc')"
                         width="100"
                         show-overflow-tooltip />
        <el-table-column fixed="right"
                         :label="$t('base.titleOperation')"
                         width="150">
          <template slot-scope="scope">
            <el-button @click="editButtonClick(scope.row,false)"
                       type="text"
                       size="small">{{$t ('base.buttonView')}}
            </el-button>
            <el-button type="text"
                       size="small"
                       @click="editButtonClick(scope.row,true)">{{$t('base.buttonEdit')}}
            </el-button>
            <el-button type="text"
                       size="small"
                       @click="bindButtonClick(scope.row,true)">{{$t('base.bindUser')}}
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
      <el-dialog :title="formData.bindTitle"
                 :visible.sync="childForm.bindForm"
                 top="10px"
                 :before-close="handleClose"
                 id="bind">
        <bind-form :item=formData.viewSelect
                   :isEdit=childForm.isEdit
                   :visible.sync="childForm.bindForm"
                   id="bindForm" />
      </el-dialog>
      <el-dialog title="参数下发"
                 :visible.sync="childForm.parameterForm"
                 top="10px"
                 :before-close="handleClose"
                 id="xiaFa">
        <parameter-form :item=formData.viewSelect
                        :isEdit=childForm.isEdit
                        :visible.sync="childForm.parameterForm" />
      </el-dialog>
    </template>
  </div>
</template>
<script>
const AddForm = () => import("./balanceAdd.vue");
const EditForm = () => import("./balanceEdit.vue");
const BindForm = () => import("./balanceBind.vue");
const ParameterForm = () => import("./balanceParameter.vue");
const OrganizationForm = () => import("@/components/Organization");
import balanceApi from "../../api/setup/api_balance";
import lineApi from "../../api/setup/api_line";
import dateFormat from "dateformat";
import balanceAssignApi from "../../api/setup/api_balanceAssign";
import balanceAssignAliasApi from "../../api/setup/api_balanceAssignAlias";
import categoryApi from "../../api/basic/api_category";
import lineRoleAliasApi from "../../api/setup/api_lineRoleAlias";

export default {
  data() {
    return {
      countData: {},
      childForm: {
        addForm: false,
        editForm: false,
        viewForm: false,
        bindForm: false,
        parameterForm: false,
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
        serial: "",
        number: "",
        title: "",
        author: "",
        date: "",
        alias: "",
        host: "",
        port: "",
        picture: "",
        control: "",
        desc: "",
        id: "",
        orgId: "",
        lineId: ""
      },
      // currentRow: '',
      formData: {
        balanceList: [],
        modelList: [],
        positionList: [],
        lineRoleAliasList: {},
        pagination: {
          //用于分页的变量
          currentPage: 1,
          pageSize: 10,
          total: 0,
          keyword: "",
          pageSizeOpts: [10, 15, 20, 25, 30]
        },
        rowSelection: [],
        selectRow: "",
        bindTitle: "",
        parameterTitle: ""
      }
    };
  },
  created() {
    if (!(this.userOrgId === undefined)) {
      this.searchData.orgId = this.userOrgId;
    }
    this.onSearchButtonClick();
    //获取收购模式编码与名称对应关系
    Promise.all([lineApi.getAll({ size: 500 })])
      .then(([response]) => {
        var arr = [];
        for (var k in response.content) {
          arr.push({
            label: response.content[k].name,
            value: response.content[k].id
          });
        }
        this.formData.modelList = arr;
      })
      .catch(error => {});
    //获取岗位表
    Promise.all([categoryApi.getAll({ size: 500, search: "lead:EQ:SC_M" })])
      .then(([response]) => {
        this.formData.positionList = response.content;
      })
      .catch(error => {});
    //获取模式关联工位编码与名称对应关系
    Promise.all([lineRoleAliasApi.getAll({ size: 500 })])
      .then(([response]) => {
        let obj = {};
        response.content.forEach(item => {
          obj[item.code + ""] = item.name;
        });
        this.formData.lineRoleAliasList = obj;
        console.log(this.formData.lineRoleAliasList);
      })
      .catch(error => {});
  },
  components: {
    "add-form": AddForm,
    "edit-form": EditForm,
    "bind-form": BindForm,
    "parameter-form": ParameterForm,
    OrganizationForm
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
    handleCurrentChange(val) {
      this.formData.selectRow = val;
      if (val !== null) {
        if (val.line !== null && val.line !== "") {
          this.formData.bindTitle =
            this.$t("base.bindUser") +
            ":" +
            val.organization.organizationName +
            "/" +
            val.line.name;
          this.formData.parameterTitle =
            this.$t("tobacco.setup.balance.parameter") +
            ":" +
            "流水线(" +
            val.alias +
            ")";
        }
      }
    },
    findBind(row, expandedRows) {
      //如果没有定义或者未展示，则查询数据，进行展开操作
      if (row.expanded === undefined || row.expanded === false) {
        row.expanded = true;
        row.countData = [];
        //只展开一行会和判断展开关闭冲突
        /*
                    if (expandedRows.length > 1) {
                      expandedRows.shift();
                    }
          */
        Promise.all([
          balanceAssignApi.getAll({
            search: "balanceId:EQ:{balanceId}".format({
              balanceId: row.id
            })
          })
        ])
          .then(([response]) => {
            row.tableData = response.content;
            this.$notify({
              title: this.$t("base.hint"),
              message: this.$t("base.loadingDone"),
              duration: 1000,
              position: "bottom-right"
            });
          })
          .catch(error => {});
      } else {
        //属于折叠操作
        row.expanded = false;
      }
    },
    findCount(row1, row2) {
      Promise.all([
        balanceAssignAliasApi.getBalanceAssignAliasList(
          row2.balanceId,
          row2.lineId,
          row2.roleId,
          row2.assignId
        )
      ])
        .then(([response]) => {
          row1.countData = response;
          this.$notify({
            title: this.$t("base.hint"),
            message: this.$t("base.loadingDone"),
            duration: 1000,
            position: "bottom-right"
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteUser(id, parentRow, childRow) {
      Promise.all([balanceAssignApi.deleteBalanceAssign(id)])
        .then(([response]) => {
          if (response === "" || null) {
            this.$message({
              message: this.$t("message.deleteOk"),
              type: "info"
            });
            //由于进行了合并行不发送请求处理，触发该函数需要先将expnad改为false
            parentRow.expanded = false;
            this.findBind(parentRow, childRow);
          }
        })
        .catch(error => {
          console.log(error);
        });
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
    bindButtonClick(selectRow, isEdit) {
      this.formData.viewSelect = selectRow;
      this.childForm.isEdit = isEdit;
      this.childForm.bindForm = true;
    },
    parameterButtonClick(selectRow, isEdit) {
      this.childForm.parameterForm = true;
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

      Promise.all([balanceApi.deleteBalance(this.formData.selectRow.id)])
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
    userDeleteButtonConfirm(id, parentRow, childRow) {
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
          this.deleteUser(id, parentRow, childRow);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$t("message.cancel")
          });
        });
    },
    organizationOnchange(label, value, values) {
      this.searchData.orgId = value;
    },
    onSearchButtonClick() {
      Promise.all([
        balanceApi.getAll({
          size: this.formData.pagination.pageSize,
          sort: "serial,ASC",
          page: this.formData.pagination.currentPage - 1,
          contains: "title,author,alias,host,control,desc,line.name:{keyword}:true".format(
            { keyword: this.formData.pagination.keyword }
          ),
          search: "organization.organizationId:rlike:{orgid};line.id:EQ:{lineId}".format(
            {
              orgid: this.searchData.orgId,
              lineId: this.searchData.lineId
            }
          )
        })
      ])
        .then(([response]) => {
          let arr = response.content;
          //为每条数据初始化一个tableData属性，用于存储展开行的数据
          arr.forEach(function(item) {
            item.tableData = [];
            item.countData = [];
          });
          this.formData.balanceList = arr;
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
      this.onSearchButtonClick();
      done();
    },
    //格式化状态显示
    formatControl(control) {
      switch (control) {
        case 1:
          return "新增";
        case 3:
          return "质疑";
        case 5:
          return "核准";
        case 7:
          return "作废";
        default:
          return "未设置";
      }
    },
    formatDate(date) {
      if (date === "" || date === undefined || date === null) {
        return "未设置";
      }
      return dateFormat(date, "yyyy-mm-dd");
    },
    formateRoleId(roleId) {
      let roleName = "";
      this.formData.positionList.forEach(function(item) {
        if (roleId === item.id) {
          roleName = item.name;
        }
      });
      return roleName;
    },
    formateLineId(lineId) {
      let lineName = "";
      this.formData.modelList.forEach(function(item) {
        if (lineId === item.value) {
          lineName = item.label;
        }
      });
      return lineName;
    }
  }
};
</script>
<style scoped>
#bind .el-dialog {
  width: 1200px;
  height: 400px;
}

#bind .el-dialog__body {
  overflow: auto;
}

#xiaFa .el-dialog {
  width: 860px;
}
</style>
