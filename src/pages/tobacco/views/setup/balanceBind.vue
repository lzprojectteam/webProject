<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'
           style="float:left;">
        <el-form :model="formItem"
                 ref="formValidate"
                 inline>
          <el-form-item :label="$t('tobacco.thuman.hrEmployee.position')"
                        prop="positionId">
            <el-select v-model='tableData[0].positionId'>
              <el-option v-for="item in  formData.positionList"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('tobacco.setup.balance.user')"
                        prop="peopleId">
            <el-select v-model="formItem.peopleId"
                       filterable
                       clearable
                       remote
                       reserve-keyword
                       @change="addPeople"
                       :placeholder="$t('base.pleaseInput')"
                       :remote-method="remoteMethod"
                       :loading="loading">
              <el-option v-for="item in  options4"
                         :key="item.id"
                         :label="item.value"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class='toolButton'
           style="min-width: 116px;float: right;"
           id="toolButton">
        <el-button type="primary"
                   @click="onCogradientClick('formValidate')">{{
          $t('base.cogradient') }}
        </el-button>
        <el-button type="primary"
                   @click="onSubmitClick('formValidate')">{{
          $t('base.buttonSubmit') }}
        </el-button>
      </div>
    </div>
    <main class='contentPanel'>
      <el-row>

        <el-col :span="11"
                id="user">
          <el-table :data="tableData"
                    border
                    style="width: 100%"
                    id="bindSelect">
            <el-table-column prop="positionId"
                             :label="$t('tobacco.thuman.hrEmployee.position')"
                             width="150">
              <template slot-scope="scope">
                <el-select v-model='scope.row.positionId'
                           disabled>
                  <el-option v-for="item in  formData.positionList"
                             :key="item.id"
                             :label="item.name"
                             :value="item.id"
                             no-data-text="">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="name"
                             :label="$t('tobacco.setup.balance.user')"
                             width="100">
            </el-table-column>
            <el-table-column prop="loginId"
                             :label="$t('tobacco.setup.balance.loginId')"
                             min-width="150">
            </el-table-column>
            <el-table-column :label="$t('base.titleOperation')"
                             width="50">
              <template slot-scope="scope">
                <el-button type="text"
                           size="small"
                           @click="onSavaClick">{{$t('base.buttonSave')}}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="1">
          <div>&nbsp;</div>
        </el-col>

        <el-col :span="12">
          <el-table highlight-current-row
                    border
                    @current-change="handleCurrentChange"
                    :data="lineRoleAliasList"
                    style="width: 100%"
                    :row-class-name="tableRowClassName"
                    id="positionTable">

            <el-table-column prop="positionName"
                             :label="this.$t('tobacco.setup.lineRoleAlias.name')"
                             width="100"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="number"
                             :label="this.$t('tobacco.setup.balance.number2')"
                             width="150"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.number"
                          :placeholder="$t('base.pleaseInput')"></el-input>
              </template>

            </el-table-column>
            <el-table-column prop="username"
                             :label="this.$t('tobacco.setup.balance.username')"
                             min-width="100"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.username"
                          :placeholder="$t('base.pleaseInput')"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="password"
                             :label="this.$t('tobacco.setup.balance.password')"
                             min-width="100"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.password"
                          :placeholder="$t('base.pleaseInput')"></el-input>
              </template>
            </el-table-column>
            <el-table-column fixed="right"
                             :label="$t('base.titleOperation')"
                             width="50">
              <template slot-scope="scope">
                <el-button @click="deleteButtonClick(scope.row.positionId)"
                           type="text"
                           size="small">{{$t
                  ('base.buttonDelete')}}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

    </main>
  </div>

</template>
<script>
import categoryApi from "../../api/basic/api_category";
import balanceAssignApi from "../../api/setup/api_balanceAssign";
import balanceAssignAliasApi from "../../api/setup/api_balanceAssignAlias";
import userApi from "@/api/base/apiUser";
import lineRoleAliasApi from "../../api/setup/api_lineRoleAlias";

export default {
  props: ["item", "isEdit", "visible"],
  data() {
    return {
      lineRoleAliasList: [],
      formItem: {
        id: "",
        //positionId: '',
        peopleId: "",
        lineId: "",
        userList: [],
        isDisabled: false,
        assignId: "",
        organizationId: "",
        organizationId_user: ""
      },
      tableData: [
        {
          positionId: "",
          name: "",
          loginId: ""
        }
      ],
      acceptData: {},
      //用于下拉显示的人员数据
      peoples: [],
      //用于存储接收的所有人员数据
      resPeople: [],
      // 用于存放当前被选中人的数据
      selectPeople: "",
      //用于存放选中人的绑定数据
      bindData: "",
      options4: [],
      loading: false,
      loading2: false,
      formData: {
        positionList: [],
        balanceList: [],
        countData: [],
        selectRow: "",
        user: {
          name: "",
          loginId: ""
        }
      }
    };
  },
  created() {
    Promise.all([categoryApi.getAll({ search: "lead:EQ:SC_M" })])
      .then(([response]) => {
        this.formData.positionList = response.content;
      })
      .catch(error => {});
    this.load();
  },
  methods: {
    deleteButtonConfirm() {
      this.$confirm(
        this.$t("tobacco.setup.balance.replaceAlias"),
        this.$t("base.titleTip"),
        {
          confirmButtonText: this.$t("base.buttonOk"),
          cancelButtonText: this.$t("base.buttonCancel"),
          type: "warning"
        }
      )
        .then(() => {
          Promise.all([
            balanceAssignApi.saveBalanceAssign(
              this.formItem.id,
              this.formItem.lineId,
              this.tableData[0].positionId,
              this.tableData[0].name,
              this.tableData[0].loginId,
              "1"
            )
          ])
            .then(([response]) => {
              if (response) {
                this.formItem.assignId = response.data.assignId;
                console.log(response);
                if (
                  !(
                    this.formItem.assignId === "" ||
                    this.formItem.assignId === undefined
                  )
                ) {
                  this.showCount();
                }
                this.$message({
                  message: this.$t("message.bindSuccess"),
                  type: "success"
                });
              }
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$t("message.cancel")
          });
        });
    },
    load() {
      this.acceptData = JSON.parse(JSON.stringify(this.item));
      this.formItem.id = this.acceptData.id;
      this.formItem.organizationId = this.acceptData.organization.organizationId;
      this.formItem.organizationId_user = this.$store.state.user.organization.organizationId;
      this.formItem.peopleId = "";
      this.tableData = [
        {
          positionId: "",
          name: "",
          loginId: ""
        }
      ];
      if (this.acceptData.line !== "" && this.acceptData.line !== null) {
        this.formItem.lineId = this.acceptData.line.id;
      }
      this.lineRoleAliasList = [];
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "warning-row";
      } else {
        return "success-row";
      }
    },
    formReset(name) {
      this.$refs[name].resetFields();
    },
    //去模式关联拿数据
    showCount() {
      Promise.all([
        lineRoleAliasApi.getAll({
          search: "lineId:EQ:{lineId};roleId:EQ:{roleId};".format({
            lineId: this.formItem.lineId,
            roleId: this.tableData[0].positionId
          })
        })
      ])
        .then(([response]) => {
          let arr = [];
          let that = this;
          response.content.forEach(function(item) {
            arr.push({
              balanceId: that.formItem.id,
              lineId: that.formItem.lineId,
              roleId: that.tableData[0].positionId, //岗位类型
              assignId: that.formItem.assignId,
              positionId: item.code,
              number: "",
              username: "",
              password: "",
              lineNumber: item.code, //用于存放模式关联的海晟工位
              positionName: item.name
            });
          });
          if (arr.length === 0) {
            setTimeout(function() {
              that.$message({
                message: that.$t("tobacco.setup.balance.noData3"),
                type: "error",
                duration: 6000
              });
            }, 3500);
          }
          this.lineRoleAliasList = arr;
          this.$notify({
            title: this.$t("base.hint"),
            message: this.$t("base.loadingDone"),
            duration: 1000,
            position: "bottom-right"
          });
        })
        .catch(error => {});
    },
    onSubmitClick() {
      let that = this;
      let flag = true;
      this.lineRoleAliasList.forEach(function(item) {
        item.postionId = item.positionId;
        if (item.number === "" || item.number === null) {
          that.$message({
            message: that.$t("tobacco.setup.balance.inputNumber"),
            type: "error"
          });
          flag = false;
        }
        return;
      });
      if (flag) {
        balanceAssignAliasApi
          .saveList(this.lineRoleAliasList)
          .then(([response]) => {
            if (response) {
              this.$message({
                message: this.$t("message.bindSuccess"),
                type: "success"
              });
            } else {
              this.$message({
                message: this.$t("message.bindFaild"),
                type: "error"
              });
            }
          })
          .catch(error => {
            console.log(error);
            this.$message({
              message: this.$t("message.bindFaild"),
              type: "error"
            });
          });
      }
    },
    onSavaClick() {
      if (
        this.tableData[0].name !== "" &&
        this.tableData[0].loginId !== "" &&
        this.tableData[0].positionId !== ""
      ) {
        this.selectPeople.loginName = this.tableData[0].loginId;
        // 判断账号是否建立过绑定关系,如果不存在绑定用户并获取该岗位对应工位信息
        Promise.all([
          balanceAssignApi.saveBalanceAssign(
            this.formItem.id,
            this.formItem.lineId,
            this.tableData[0].positionId,
            this.tableData[0].name,
            this.tableData[0].loginId,
            "0"
          )
        ])
          .then(([response]) => {
            if (response) {
              console.log(response);
              if (response.code === 0) {
                this.formItem.assignId = response.data.assignId;
                if (
                  !(
                    this.formItem.assignId === "" ||
                    this.formItem.assignId === undefined
                  )
                ) {
                  this.showCount();
                }
                this.$message({
                  message: this.$t("message.bindSuccess"),
                  type: "success"
                });
              } else if (response.code === 2) {
                this.deleteButtonConfirm();
              } else if (response.code === 5) {
                this.formItem.assignId = response.data.assignId;
                if (
                  !(
                    this.formItem.assignId === "" ||
                    this.formItem.assignId === undefined
                  )
                ) {
                  this.$message({
                    message: this.$t("message.bindSuccess"),
                    type: "success"
                  });
                  this.showCount();
                }
              } else {
                this.$message({
                  message: this.$t("message.bindFaild"),
                  type: "error"
                });
              }
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.$message({
          message: this.$t("message.formValidate"),
          type: "error"
        });
      }
    },
    remoteMethod(query) {
      this.clearPeople();
      if (query !== "") {
        this.loading2 = true;
        var search =
          "(loginName:LIKE:{kw}:or;mobile:LIKE:{kw}:or;name:LIKE:{kw}:or;email:LIKE:{kw}:or;phone:LIKE:{kw}:or;)";
        Promise.all([
          userApi.findAllByOrgId(this.formItem.organizationId_user, {
            size: 10,
            page: 0,
            sort: "name,asc",
            search: search.format({
              kw: query
            })
          })
        ])
          .then(([response]) => {
            let arr = [];
            this.resPeople = response.content;
            response.content.forEach(function(item) {
              arr.push({ value: item.name + "(" + item.no + ")", id: item.id });
            });
            this.peoples = arr;
            this.options4 = this.peoples;
            this.loading = false;
          })
          .catch(error => {
            console.log(error);
          });

        /*Promise.all([userApi.findAll({contains: 'loginName,name:' + query + ':true', valid: true})])
            .then(([response]) => {

              this.resPeople = response.content;
              console.log(response.content);
              /!*let arr = [];
              response.content.forEach(function (item) {
                arr.push({'value': item.name + '(' + item.phone + ')', 'id': item.id});
              });
              this.peoples = arr;
              this.options4 = this.peoples.filter(item => {
                return item.value.toLowerCase()
                  .indexOf(query.toLowerCase()) > -1;
              });
              this.loading = false;*!/
              this.formItem.userList = response.content;
              this.loading2 = false;
            })
            .catch(error => {
            });*/
      } else {
        this.options4 = [];
      }
    },
    clearPeople() {
      this.tableData[0].name = "";
      this.tableData[0].loginId = "";
      this.formItem.assignId = "";
      this.formItem.peopleId = "";
      this.lineRoleAliasList = [];
    },
    addPeople() {
      let that = this;
      this.resPeople.forEach(function(item) {
        if (that.formItem.peopleId === item.id) {
          that.selectPeople = item;
          that.tableData[0].name = item.name;
          that.tableData[0].loginId = item.loginName;
          return;
        }
      });
      if (this.tableData[0].loginId) {
        this.formItem.isDisabled = true;
      } else {
        this.formItem.isDisabled = false;
      }
    },
    //同步事件
    onCogradientClick() {
      let url =
        this.acceptData.host +
        ":" +
        this.acceptData.port +
        "/api/v1/tobacco/sync/worker";
      fetch(url, {
        method: "POST"
      })
        .then(response => response.json())
        .then(response => {
          let arr = this.lineRoleAliasList; //存放同步前的工位
          let data = JSON.parse(response.data);
          //进行匹配
          if (!(data === "" || data === null)) {
            if (data.length >= 1) {
              arr.forEach(function(item) {
                data.forEach(function(item2) {
                  if (item.lineNumber === item2.role_id) {
                    item.number = item2.user_id; //如果匹配，为其添加流水号
                  }
                });
              });
              this.$message({
                message: this.$t("tobacco.setup.balance.cogradientSuccess"),
                type: "success"
              });
            } else {
              this.$message({
                message: this.$t("tobacco.setup.balance.noData2"),
                type: "info"
              });
            }
          } else {
            this.$message({
              message: this.$t("tobacco.setup.balance.noData2"),
              type: "info"
            });
          }
          this.lineRoleAliasList = arr; //赋值
        })
        .catch(error => {
          console.error(`Fetch Error =\n`, error);
          this.$message({
            message: this.$t("tobacco.setup.balance.cogradientFaild"),
            type: "error"
          });
        });
    },
    handleCurrentChange(val) {
      this.formData.selectRow = val;
    },
    deleteButtonClick(positionId) {
      let that = this;
      this.lineRoleAliasList.forEach(function(item, index) {
        if (item.positionId === positionId) {
          that.lineRoleAliasList.splice(index, 1);
          return;
        }
      });
    }
  },
  watch: {
    item(curVal, oldVal) {
      this.acceptData = JSON.parse(JSON.stringify(curVal));
      this.formItem.id = this.acceptData.id;
      this.load();
    }
  }
};
</script>
<style scoped>
#bindSelect .el-input__suffix-inner {
  visibility: hidden;
}
#bindSelect .el-select .is-disabled .el-input__inner {
  cursor: default;
  border: none;
  background-color: white;
  color: #606266;
}
</style>
