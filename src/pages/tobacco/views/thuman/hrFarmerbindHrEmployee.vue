<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel' style="height:350px;">
    <div class='toolPanel'>
      <div class='queryCriteria' style="text-align:left">
        <el-form label-width="60px" inline>
          <el-form-item :label="$t('tobacco.thuman.hrEmployee.organization')">
            <organization-form :root="userOrgId" @onchange="organizationOnchange" v-model="searchData.organization"
            />
          </el-form-item>
          <el-form-item :label="$t('tobacco.thuman.hrEmployee.name')">
            <el-input v-bind:placeholder="$t('tobacco.thuman.hrEmployee.name')" v-model="searchData.name"
                      @keyup.enter.native="onSearchButtonClick" style="width:150px"/>
          </el-form-item>
        </el-form>
      </div>
      <div class='toolButton' style="min-width: 120px">
        <el-button-group>
          <el-button type='primary' @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }}</el-button>
          <el-button type='primary' @click='onbindMulButtonClick'>{{$t('tobacco.thuman.hrFarmer.bindHarm')}}</el-button>
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
        <el-table-column prop="name" :label="this.$t('tobacco.thuman.hrEmployee.name')" fixed/>
        <el-table-column prop="sex.name" :label="this.$t('tobacco.thuman.hrEmployee.sex')" width="60"/>
        <!-- <el-table-column :label="this.$t('tobacco.thuman.hrEmployee.position')">
          <template slot-scope="scope">
            <span v-for="item in scope.row.positionList" :key="item.id">
              {{ item.name}}
            </span>
          </template>
        </el-table-column> -->
        <el-table-column prop="identity" :label="this.$t('tobacco.thuman.hrEmployee.identity')" width="170"
                         show-overflow-tooltip/>
        <!-- <el-table-column prop="birth" :label="this.$t('tobacco.thuman.hrEmployee.birth')" width="110">
          <template slot-scope="scope">
            {{ formatDate(scope.row.birth)}}
          </template>
        </el-table-column>
        <el-table-column prop="team.title" :label="this.$t('tobacco.thuman.hrEmployee.team')" width="180" show-overflow-tooltip />
        <el-table-column prop="education.name" :label="this.$t('tobacco.thuman.hrEmployee.education')" width="180" show-overflow-tooltip />
        <el-table-column prop="phone" :label="this.$t('tobacco.thuman.hrEmployee.phone')" width="120" /> -->
        <el-table-column prop="control" :label="this.$t('tobacco.thuman.hrEmployee.control')" width="60">
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
    props: ['hrFarmerData', 'visible', 'organizeId', 'searchInfo'],
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
      /* Promise.all([categoryApi.getAll({ search: 'lead:EQ:SC_M' })])
        .then(([response, response2]) => {
          this.selectData.positionList = response.content;
        })
        .catch(error => {});*/
      if (!(this.userOrgId === undefined)) {
        this.searchData.orgId = this.userOrgId;
      }
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
      handleCurrentChange(val) {
        this.formData.selectRow = val;
      },
      organizationOnchange(label, value, values) {
        this.searchData.orgId = value;
      },
      onSearchButtonClick() {
        Promise.all([
          hrEmployeeApi.getAll({
            size: this.formData.pagination.pageSize,
            page: this.formData.pagination.currentPage - 1,
            sort: 'name,ASC',
            search: 'organization.organizationId:rlike:{orgid};positionList.id:EQ:{positionids};name:LIKE:{name};control:EQ:{control}'.format(
              {
                positionids: 'SC_M010',
                name: this.searchData.name,
                orgid: this.searchData.orgId,
                control: 5
              }
            )
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
      onbindMulButtonClick() {
        var temp = JSON.parse(JSON.stringify(this.hrFarmerData));
        var temp1 = JSON.parse(JSON.stringify(this.searchData.multipleSelection));
        if (temp1 === null || temp1.length === 0) {
          this.$message({
            message: this.$t('message.unSelectAny'),
            type: 'info'
          });
          return;
        }
        var list = [];
        var data = {};
        for (var x = 0; x < temp1.length; x++) {
          for (var i = 0; i < temp.data.length; i++) {
            data['employeeId'] = temp1[x].id;
            data['relationId'] = temp.data[i].id;
            data['employeePosition'] = 'SC_M010';
            if (temp.data[i].positionList.length === 0) {
              this.$message({
                message: this.$t('message.noPosition'),
                type: 'info'
              });
              return;
            }
            data['positionId'] = temp.data[i].positionList[0].id;
            //console.log(temp.data[i].id);
            //console.log(temp.data[i].positionList[0].id);
            list.push(data);
            data = {};
          }
        }
        //通过this.hrFarmerData判断是批量绑定还是一键绑定
        if (this.hrFarmerData.data.length >= 1) {
          Promise.all([hrEmployeeRelation.saveAll(list)])
            .then(([response]) => {
              //重置表单，允许多次操作
              this.$message({
                message: '绑定成功',
                type: 'info'
              });
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          var searchInfo = JSON.parse(JSON.stringify(this.searchInfo));
          var employeeIds = [];
          temp1.forEach((item) => {
            employeeIds.push(item.id);
          });
          searchInfo.employeeIds = employeeIds;
          Promise.all([hrEmployeeRelation.oneKeyBindings(searchInfo.mark, searchInfo)])
            .then(([response]) => {
              //重置表单，允许多次操作
              this.$message({
                message: '绑定成功',
                type: 'info'
              });
            })
            .catch(error => {
              console.log(error);
            });

        }
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
    /*watch: {
      hrFarmerData(curVal, oldVal) {
        this.searchData.multipleSelection = [];
      }
    },*/
  };
</script>
