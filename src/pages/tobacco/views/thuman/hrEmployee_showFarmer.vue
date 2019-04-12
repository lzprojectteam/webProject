<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel' style="height:350px;">
    <div class='toolPanel'>
      <div class='queryCriteria' style="text-align:left">
        <el-form inline>
          <el-form-item :label="$t('tobacco.thuman.hrEmployee.name')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.name"
                      @keyup.enter.native="onSearchButtonClick" style="width:250px"/>
          </el-form-item>
        </el-form>
      </div>
      <div class='toolButton' style="min-width: 220px">
        <el-button-group>
          <el-button type='primary' @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }}</el-button>
          <el-button type='primary' @click='onUnbindMulButtonClick'>解除绑定</el-button>
          <el-button type='primary' @click='onUnbindAllButtonClick'>一键解绑</el-button>
        </el-button-group>
      </div>
    </div>
    <main class='contentPanel'>
      <el-table highlight-current-row border @current-change="handleCurrentChange" ref="multipleTable"
                @selection-change="handleSelectionChange" :data="formData.hrEmployeeList" style="width: 100%;"
                :row-class-name="tableRowClassName">
        <el-table-column type="selection" width="55" fixed="left">
        </el-table-column>
        <!-- <el-table-column type="index" fixed>
        </el-table-column> -->
        <el-table-column prop="name" :label="this.$t('tobacco.thuman.hrEmployee.name')" width="100" fixed/>
        <el-table-column prop="sex.name" :label="this.$t('tobacco.thuman.hrEmployee.sex')" width="100"/>
        <el-table-column prop="identity" :label="this.$t('tobacco.thuman.hrEmployee.identity')" min-width="170"
                         show-overflow-tooltip/>
        <el-table-column prop="control" :label="this.$t('tobacco.thuman.hrEmployee.control')" width="100">
          <template slot-scope="scope">
            {{ controlList[scope.row.control]}}
          </template>
        </el-table-column>
      </el-table>
    </main>
    <div class='footerPanel'>
      <el-pagination :page-size='formData.pagination.pageSize' :total='formData.pagination.total'
                     :current-page='formData.pagination.currentPage' @current-change='onPageChange'
                     :page-sizes='formData.pagination.pageSizeOpts' @size-change='onPageSizeChange'
                     layout="total, sizes, prev, pager, next, jumper" placement='top'></el-pagination>
    </div>
    <template>
      <el-dialog :title="$t('tobacco.thuman.hrFarmer.bindHarm')" :visible.sync="childForm.addForm" top="10px"
                 :before-close="handleClose">
        <add-form/>
      </el-dialog>
    </template>
  </div>
</template>
<script>
  import dateFormat from 'dateformat';
  import hrEmployeeApi from '../../api/thuman/api_hrEmployee';
  import hrEmployeeRelation from '../../api/thuman/api_hrEmployeeRelation';

  const OrganizationForm = () => import('@/components/Organization');
  export default {
    props: ['item', 'visible', 'organizeId'],
    data() {
      return {
        controlList: {'1': '新增', '3': '质疑', '5': '核准', '7': '作废'},
        childForm: {
          isEdit: false
        },
        searchData: {
          name: '',
          multipleSelection: [],
          orgId: ''
        },
        relatiodata: {
          employeeId: '',
          relationId: '',
          positionId: '',
          employeePosition: ''
        },
        selectData: {
          positionId: '',
          positionList: []
        },
        acceptData: {},
        formData: {
          hrEmployeeList: [],
          pagination: {
            //用于分页的变量
            currentPage: 1,
            pageSize: 5,
            total: 0,
            keyword: '',
            pageSizeOpts: [5, 10, 15, 20, 25, 30]
          }
        }
      };
    },
    created() {
      if (!(this.userOrgId === undefined)) {
        this.searchData.orgId = this.userOrgId;
      }
      this.load();
    },
    computed: {
      userOrgId() {
        if (
          this.organizeId !== undefined ||
          this.organizeId !== this.$store.state.user.organization.organizationId
        ) {
          return this.organizeId;
        } else {
          if (this.$store.state.user.organization === undefined) {
            this.searchData.orgId = undefined;
            return undefined;
          } else {
            this.searchData.orgId = this.$store.state.user.organization.organizationId;
            return this.$store.state.user.organization.organizationId;
          }
        }
      }
    },
    components: {OrganizationForm},
    methods: {
      load() {
        this.acceptData = JSON.parse(JSON.stringify(this.item));
        this.onSearchButtonClick();
      },
      handleCurrentChange(val) {
        this.formData.selectRow = val;
      },
      organizationOnchange(label, value, values) {
        this.searchData.orgId = value;
      },
      onSearchButtonClick() {
        Promise.all([
          hrEmployeeApi.getFramerList(this.acceptData.id, {
            size: this.formData.pagination.pageSize,
            page: this.formData.pagination.currentPage - 1,
          })
        ])
          .then(([response]) => {
            this.formData.hrEmployeeList = response.content;
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
      onUnbindMulButtonClick() {
        let temp1 = JSON.parse(JSON.stringify(this.searchData.multipleSelection));
        if (temp1 === null || temp1.length === 0) {
          this.$message({
            message: this.$t('message.unSelectAny'),
            type: 'info'
          });
          return;
        }
        let farmerIds = [];
        temp1.forEach((item) => {
          farmerIds.push(item.id);
        });
        // 构建请求数据
        let data = {
          'employeeId': '',
          'employeeIds': [],
          'farmerIds': [],
          'organizationId': '',
          'positionId': ''
        };
        data.employeeId = this.acceptData.id;
        data.farmerIds = farmerIds;

        Promise.all([hrEmployeeRelation.ReleaseBind(data)])
          .then(([response]) => {
            //重置表单，允许多次操作
            this.$message({
              message: response,
              type: 'info'
            });
            this.onSearchButtonClick();
          })
          .catch(error => {
            console.log(error);
          });
      },
      onUnbindAllButtonClick() {
        this.$confirm(
          '此操作将解除所有绑定的烟农，是否继续',
          this.$t('base.titleTip'),
          {
            confirmButtonText: this.$t('base.buttonOk'),
            cancelButtonText: this.$t('base.buttonCancel'),
            type: 'warning'
          }
        )
          .then(() => {
            // 构建请求数据
            let data = {
              'employeeId': '',
              'employeeIds': [],
              'farmerIds': [],
              'organizationId': '',
              'positionId': ''
            };
            data.employeeId = this.acceptData.id;
            Promise.all([hrEmployeeRelation.oneKeyReleaseBind(data)])
              .then(([response]) => {
                //重置表单，允许多次操作
                this.$message({
                  message: '解绑成功',
                  type: 'info'
                });
                this.onSearchButtonClick();
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: this.$t('message.cancel')
            });
          });
      },
      bindButtonClick(selectRow) {
        var temp = JSON.parse(JSON.stringify(this.hrFarmerData));

        //console.log(temp);
        var list = [];
        var data = {};
        for (var i = 0; i < temp.data.length; i++) {
          data['employeeId'] = selectRow.id;
          data['relationId'] = temp.data[i].id;
          data['positionId'] = temp.data[i].positionList[0].id;
          data['employeePosition'] = 'SC_M010';
          //console.log(temp.data[i].id);
          //console.log(temp.data[i].positionList[0].id);
          list.push(data);
          data = {};
        }
        Promise.all([hrEmployeeRelation.saveAll(list)])
          .then(([response]) => {
            this.formReset(name);
            //重置表单，允许多次操作
            this.$message({
              message: this.$t('message.saveAndContinue'),
              type: 'info'
            });
          })
          .catch(error => {
            console.log(error);
          });
      },
      onPageChange(index) {
        this.formData.pagination.currentPage = index;
        this.onSearchButtonClick();
      },
      onPageSizeChange(size) {
        this.formData.pagination.pageSize = size;
        this.onSearchButtonClick();
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex % 2 === 0) {
          return 'warning-row';
        } else {
          return 'success-row';
        }
      },
      handleClose(done) {
        this.childForm.bindForm = false;
        this.onSearchButtonClick();
        done();
      },
      formatDate(date) {
        if (date === '' || date === undefined || date === null) {
          return '未设置';
        }
        return dateFormat(date, 'yyyy-mm-dd');
      },
      handleSelectionChange(val) {
        this.searchData.multipleSelection = val;
      }
    },
    watch: {
      item(curVal, oldVal) {
        this.load();
      }
    }
  };
</script>
