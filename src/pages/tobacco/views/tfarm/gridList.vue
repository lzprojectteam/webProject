<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-form-item :label="$t('tobacco.common.organization')">
            <organization-form :root="userOrgId"
                               :code.sync="searchData.organizationId" />
          </el-form-item>
          <el-form-item :label="$t('tobacco.common.district')">
            <organization-form :root="userDistrictId"
                               :code.sync="searchData.districtId"
                               model="district" />
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
                :data="formData.gridList"
                style="width: 100%"
                :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="code"
                         :label="this.$t('tobacco.tfarm.grid.code')" />
        <el-table-column :label="this.$t('tobacco.common.organization')">
          <template slot-scope="scope">
            {{scope.row.organization?scope.row.organization.organizationName:''}}
          </template>
        </el-table-column>

        <el-table-column prop="name"
                         :label="this.$t('tobacco.tfarm.grid.name')" />

        <el-table-column prop="techName"
                         :label="this.$t('tobacco.tfarm.grid.techName')" />
        <el-table-column prop="date"
                         :label="this.$t('tobacco.tfarm.grid.date')">
          <template slot-scope="scope">
            {{scope.row.date|parseDate('yyyy-mm-dd')}}
          </template>
        </el-table-column>
        <el-table-column prop="status"
                         :label="this.$t('tobacco.tfarm.grid.status')">
          <template slot-scope="scope">
            {{scope.row.status|capitalizeState}}
          </template>
        </el-table-column>
        <el-table-column fixed="right"
                         :label="$t('base.titleOperation')"
                         min-width="160">
          <template slot-scope="scope">
            <el-button-group>
              <el-button @click="onShowDistrict(scope.row)"
                         plain>{{$t('tobacco.tfarm.grid.buttonJurisdiction')}}</el-button>
              <el-button plain
                         @click="onShowBelongTo(scope.row)">{{$t('tobacco.tfarm.grid.buttonBelong')}}</el-button>
              <el-button plain
                         @click="editButtonClick(scope.row,true)">{{$t('base.buttonEdit')}}</el-button>
            </el-button-group>

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
                 v-el-drag-dialog
                 :visible.sync="childForm.addForm"
                 top="10px"
                 :before-close="handleClose">
        <add-form />
      </el-dialog>
      <el-dialog :title="$t('base.buttonEdit')"
                 v-el-drag-dialog
                 :visible.sync="childForm.editForm"
                 top="10px"
                 :before-close="handleClose">
        <edit-form :item.sync=formData.viewSelect
                   :isEdit=childForm.isEdit
                   :visible.sync="childForm.editForm" />
      </el-dialog>
      <el-dialog :title="$t('base.buttonView')"
                 v-el-drag-dialog
                 :visible.sync="childForm.viewForm"
                 top="10px"
                 :before-close="handleClose">
        <edit-form :item=formData.viewSelect
                   :isEdit=childForm.isEdit
                   :visible.sync="childForm.viewForm" />
      </el-dialog>
      <el-dialog :title="$t('tobacco.tfarm.grid.buttonJurisdiction')"
                 v-el-drag-dialog
                 :visible.sync="childForm.jurisdictionForm"
                 top="10px"
                 :before-close="handleClose">
        <el-form label-width="80px">
          <el-row>
            <el-col :span="16">
              <el-form-item :label="$t('tobacco.common.district')">
                <organization-form :root="userDistrictId"
                                   style="width:100%"
                                   showAllLevels
                                   model="district"
                                   :showRoot="false"
                                   :code.sync="formJurisdiction.districtId"
                                   @onchange="onDistrictChanged" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>

                <el-button style="float:right"
                           @click="onSumbitDistrict()">
                  {{$t('tobacco.common.btnInsert')}}
                </el-button>
              </el-form-item>

            </el-col>
          </el-row>
        </el-form>
        <div class="cas-group"
             style="min-height:200px">
          <div v-for="o in formJurisdictionList"
               :key="o.id"
               style="font-size: 18px;margin: 5px;">
            <el-alert type="success"
                      @close="onDistrictDeleteClick(o)">
              <template slot="title">
                <span>{{ o.districtNames}} </span>
              </template>
            </el-alert>

          </div>
        </div>

      </el-dialog>
      <el-dialog :title="$t('tobacco.tfarm.grid.buttonBelong')"
                 v-el-drag-dialog
                 :visible.sync="childForm.belongToForm"
                 top="10px"
                 :before-close="handleClose">
        <div>
          <el-form label-width="80px"
                   inline>
            <el-form-item label='年度'>
              <el-input-number v-model="formBelongTo.annual" />
            </el-form-item>
            <el-form-item label='烟技员'>
              <el-select v-model="formBelongTo.techId"
                         filterable
                         remote
                         reserve-keyword
                         :placeholder="$t('base.pleaseInput')"
                         :remote-method="remoteMethod"
                         :loading="userloading"
                         @change="onUserChanged">
                <el-option v-for="item in userList"
                           :key="item.id"
                           :label="item.name"
                           :value="item.id">
                  <span style="float: left">{{ item.name }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">[{{ item.loginName }}] {{item.phone?"-":""}} {{item.phone}}</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="float:right">

              <el-button @click="onSumbitBelongTo()">
                {{$t('tobacco.common.btnInsert')}}
              </el-button>
            </el-form-item>

          </el-form>
          <el-table highlight-current-row
                    border
                    :data="belongToList"
                    style="width: 100%;min-height:200px">
            <el-table-column prop="gridName"
                             :label="$t('tobacco.tfarm.grid.gridName')" />
            <el-table-column prop="techName"
                             :label="$t('tobacco.tfarm.grid.techName')" />
            <el-table-column prop="annual"
                             :label="$t('tobacco.tfarm.grid.annual')" />
            <el-table-column prop="enable"
                             :label="$t('tobacco.tfarm.grid.enable')">
              <template slot-scope="scope">
                {{scope.row.enable|boolean}}
              </template>
            </el-table-column>
            <el-table-column fixed="right"
                             :label="$t('base.titleOperation')">
              <template slot-scope="scope"
                        width="80px">
                <el-button plain
                           @click="onBelongToDeleteClick(scope.row)">{{$t('base.buttonDelete')}}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

      </el-dialog>
    </template>
  </div>
</template>
<script>
const AddForm = () => import("./gridAdd.vue");
const EditForm = () => import("./gridEdit.vue");
import elDragDialog from "@/directive/el-dragDialog"; // base on element-ui
import userApi from "@/api/base/apiUser";
import gridApi from "../../api/tfarm/api_grid";
const status = [
  { value: 0, label: "编辑" },
  { value: 5, label: "启用" },
  { value: 9, label: "停用" }
];
export default {
  directives: { elDragDialog },
  data() {
    return {
      userloading: false,
      userList: [],
      childForm: {
        addForm: false,
        editForm: false,
        viewForm: false,
        isEdit: false,
        jurisdictionForm: false,
        belongToForm: false
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
        districtId: "",
        organizationId: ""
      },
      formData: {
        gridList: [],
        pagination: {
          //用于分页的变量
          currentPage: 1,
          pageSize: 10,
          total: 0,
          keyword: "",
          pageSizeOpts: [10, 15, 20, 25, 30]
        },
        rowSelection: []
      },
      formJurisdiction: {
        gridId: "",
        gridName: "",
        districtId: "",
        districtName: "",
        districtIds: "",
        districtNames: ""
      },
      formJurisdictionList: [],
      formBelongTo: {
        gridId: "",
        gridName: "",
        techId: "",
        techName: "",
        annual: this.$store.state.system.annual,
        enable: true
      },
      belongToList: []
    };
  },
  created() {
    this.searchData.organizationId = this.userOrgId;
  },
  filters: {
    capitalizeState: function(value) {
      let item = status.find(it => {
        return it.value === value;
      });
      return item ? item.label : "";
    }
  },
  computed: {
    userOrgId() {
      if (this.$store.state.user.organization === undefined) {
        this.searchData.orgId = undefined;
        return undefined;
      } else {
        this.searchData.orgId = this.$store.state.user.organization.organizationId;
        return this.$store.state.user.organization.organizationId;
      }
    },
    userDistrictId() {
      if (this.$store.state.user.detail.districtId === undefined) {
        return "0";
      } else {
        return this.$store.state.user.detail.districtId;
      }
    }
  },
  components: {
    "add-form": AddForm,
    "edit-form": EditForm,
    OrganizationForm: () => import("@/components/Organization")
  },
  methods: {
    onSumbitBelongTo() {
      if (
        this.formBelongTo.techId !== "" &&
        this.formBelongTo.techId !== null
      ) {
        let exsit = this.belongToList.find(it => {
          return (
            it.techId === this.formBelongTo.techId &&
            it.annual === this.formBelongTo.annual
          );
        });
        if (exsit !== undefined) {
          console.log("已经包含此辖区，不用重复保存");
          this.$notify({
            title: this.$t("base.hint"),
            message: "已经包含此辖区，不用重复保存",
            duration: 1000,
            position: "bottom-right"
          });
        } else {
          Promise.all([gridApi.saveBelongTo([this.formBelongTo])])
            .then(([response]) => {
              this.belongToList.push(response[0]);
            })
            .catch(error => {
              this.$notify({
                title: this.$t("base.hint"),
                message: error,
                duration: 1000,
                position: "bottom-right"
              });
            });
        }
      }
    },
    onShowBelongTo(row) {
      this.formBelongTo.gridId = row.id;
      this.formBelongTo.gridName = row.name;
      this.childForm.belongToForm = true;

      Promise.all([
        gridApi.getBelongToByGridId(row.id, this.formBelongTo.annual)
      ])
        .then(([response]) => {
          this.belongToList = response;
        })
        .catch(error => {
          this.$notify({
            title: this.$t("base.hint"),
            message: error,
            duration: 1000,
            position: "bottom-right"
          });
        });
    },
    onSumbitDistrict() {
      if (
        this.formJurisdiction.districtId !== "" &&
        this.formJurisdiction.districtId !== null
      ) {
        let exsit = this.formJurisdictionList.find(it => {
          return (
            it.districtId === this.formJurisdiction.districtId &&
            it.gridId === this.formJurisdiction.gridId
          );
        });
        if (exsit !== undefined) {
          console.log("已经包含此辖区，不用重复保存");
          this.$notify({
            title: this.$t("base.hint"),
            message: "已经包含此辖区，不用重复保存",
            duration: 1000,
            position: "bottom-right"
          });
        } else {
          Promise.all([gridApi.saveJurisdiction([this.formJurisdiction])])
            .then(([response]) => {
              this.formJurisdictionList.push(response[0]);
            })
            .catch(error => {
              this.$notify({
                title: this.$t("base.hint"),
                message: error,
                duration: 1000,
                position: "bottom-right"
              });
            });
        }
      }
    },
    onShowDistrict(row) {
      this.formJurisdiction.gridId = row.id;
      this.formJurisdiction.gridName = row.name;
      this.childForm.jurisdictionForm = true;

      Promise.all([gridApi.getJurisdictionByGridId(row.id)])
        .then(([response]) => {
          this.formJurisdictionList = response;
        })
        .catch(error => {
          this.$notify({
            title: this.$t("base.hint"),
            message: error,
            duration: 1000,
            position: "bottom-right"
          });
        });
    },
    onDistrictChanged(label, value, labels, values) {
      this.formJurisdiction.districtId = value;
      this.formJurisdiction.districtName = label;
      this.formJurisdiction.districtIds = values;
      this.formJurisdiction.districtNames = labels;
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

      Promise.all([gridApi.deleteGrid(this.formData.selectRow.id)])
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
        gridApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          sort: "code",
          contains: "name,code,techName:{keyword}:true".format({
            keyword: this.formData.pagination.keyword
          }),
          search: "".format({})
        })
      ])
        .then(([response]) => {
          this.formData.gridList = response.content;
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
      Object.keys(this.childForm).forEach(key => {
        this.childForm[key] = false;
      });
      this.onSearchButtonClick();
      done();
    },
    remoteMethod(query) {
      if (query !== "") {
        this.userloading = true;
        //远程调用API接口
        var search =
          "(loginName:LIKE:{kw}:or;mobile:LIKE:{kw}:or;name:LIKE:{kw}:or;email:LIKE:{kw}:or;phone:LIKE:{kw}:or;)";
        search += ";state:EQ:5";
        Promise.all([
          userApi.findAllByOrgId(this.userOrgId, {
            size: 20,
            page: 0,
            sort: "name,asc",
            search: search.format({
              kw: query
            })
          })
        ])
          .then(([response]) => {
            this.userList = response.content;
          })
          .catch(error => {})
          .finally(() => {
            this.userloading = false;
          });
      } else {
        this.userList = [];
      }
    },
    onUserChanged(value) {
      if (!value || !this.userList) {
        return;
      } else {
        let item = this.userList.find(it => {
          return it.id === value;
        });
        if (item !== undefined) {
          this.formBelongTo.techName = item.name;
        }
      }
    },
    onDistrictDeleteClick(row) {
      Promise.all([gridApi.deleteJurisdictionById(row.id)])
        .then(([response]) => {
          Promise.all([gridApi.getJurisdictionByGridId(row.gridId)])
            .then(([res]) => {
              this.formJurisdictionList = res;
            })
            .catch(error => {
              this.$notify({
                title: this.$t("base.hint"),
                message: error,
                duration: 1000,
                position: "bottom-right"
              });
            });
        })
        .catch(error => {});
    },
    onBelongToDeleteClick(row) {
      Promise.all([gridApi.deleteBelongToById(row.id)])
        .then(([response]) => {
          Promise.all([
            gridApi.getBelongToByGridId(row.gridId, this.formBelongTo.annual)
          ])
            .then(([res]) => {
              this.belongToList = res;
            })
            .catch(error => {
              this.$notify({
                title: this.$t("base.hint"),
                message: error,
                duration: 1000,
                position: "bottom-right"
              });
            });
        })
        .catch(error => {});
    }
  }
};
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>