<template>
  <div class='mainPanel'>
    <main class='contentPanel'
          style=" display: flex; display: -webkit-flex; /* Safari */">
      <div style="flex:3;padding:5px;border-right:1px solid green;overflow-y:auto;overflow-x:auto; "
           v-vscroll>

        <el-tabs style="margin-top:5px"
                 v-model="dataType"
                 @tab-click="handleClick">
          <el-tab-pane label="组织单位"
                       name="0"></el-tab-pane>
          <el-tab-pane label="行政单位"
                       name="1"></el-tab-pane>
        </el-tabs>
        <el-input placeholder="输入关键字进行过滤"
                  v-model="filterText"
                  style="margin-top:5px">
        </el-input>
        <el-tree ref='dataTree'
                 :data="data"
                 accordion
                 v-loading="loading"
                 element-loading-text="拼命加载中"
                 element-loading-spinner="el-icon-loading"
                 class="filter-tree"
                 :props="defaultProps"
                 :filter-node-method="filterNode"
                 @node-click="handleNodeClick">
        </el-tree>
      </div>
      <div style="flex:9"
           id="list">
        <div class='toolPanel'
             style="padding: 5px; ">
          <div class='queryCriteria'>
            <el-pagination :page-size='formData.pagination.pageSize'
                           :total='formData.pagination.total'
                           :current-page='formData.pagination.currentPage'
                           @current-change='onPageChange'
                           :page-sizes='formData.pagination.pageSizeOpts'
                           @size-change='onPageSizeChange'
                           layout="total, sizes, prev, pager, next, jumper"
                           placement='top'></el-pagination>
          </div>
          <div class='toolButton'
               v-show="false"
               style="min-width: 210px">
            <el-button type='primary'
                       plain>{{ $t('base.buttonDelete') }} </el-button>

          </div>
        </div>
        <main class='contentPanel'>
          <el-table highlight-current-row
                    border
                    style="width:100%;"
                    :data="formData.userList">
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="name"
                             :label="this.$t('user.name')"
                             show-overflow-tooltip />
            <el-table-column prop="loginName"
                             :label="this.$t('user.loginName')" />
            <el-table-column prop="mobile"
                             :label="this.$t('user.mobile')" />
            <el-table-column prop="no"
                             :label="this.$t('user.no')" />
            <el-table-column prop="phone"
                             :label="this.$t('user.phone')" />

          </el-table>
        </main>

      </div>
    </main>
  </div>

</template>
<script>
import orginizationApi from "@/api/xbasic/apiOrganization";
import districtApi from "@/api/xbasic/apiDistrict";
import userApi from "@/api/base/apiUser";
export default {
  data() {
    return {
      filterText: "",
      data: [],
      dataType: 0, //0：组织单位，1:行政单位
      defaultProps: {
        children: "children",
        label: "name"
      },
      selected: {},
      loading: false,
      formData: {
        userList: [],
        pagination: {
          //用于分页的变量
          currentPage: 1,
          pageSize: 10,
          total: 0,
          keyword: "",
          pageSizeOpts: [10, 15, 20, 25, 30]
        }
      }
    };
  },
  created() {
    this.loadData(this.dataType);
  },
  watch: {
    filterText(val) {
      this.$refs.dataTree.filter(val);
    }
  },
  directives: {
    vscroll: {
      // 指令的定义
      inserted: function(el) {
        el.style.cssText +=
          "height:" + el.parentElement.children["list"].clientHeight + "px;";
      }
    }
  },
  methods: {
    handleNodeClick(data) {
      // console.log(data);
      this.selected = data;
      switch (parseInt(this.dataType)) {
        case 0:
          //查询组织单位数据
          Promise.all([
            userApi.findAllWithOrgId(data.id, {
              size: this.formData.pagination.pageSize,
              page: this.formData.pagination.currentPage - 1,
              sort: "name,asc"
            })
          ])
            .then(([response]) => {
              this.formData.userList = response.content;
              this.formData.pagination.total = parseFloat(
                response.totalElements
              );
            })
            .catch(error => {});
          break;
        case 1:
          //查询行政单位数据
          Promise.all([
            userApi.findAllWithDistrictId(data.id, {
              size: this.formData.pagination.pageSize,
              page: this.formData.pagination.currentPage - 1,
              sort: "name,asc"
            })
          ])
            .then(([response]) => {
              this.formData.userList = response.content;
              this.formData.pagination.total = parseFloat(
                response.totalElements
              );
            })
            .catch(error => {});
          break;
      }
    },
    loadData(dataType) {
      this.loading = true;
      this.data = [];
      switch (parseInt(dataType)) {
        case 0:
          this.loadOrgData();
          break;
        case 1:
          this.loadDistrictData();
          break;
      }
    },
    loadOrgData() {
      Promise.all([orginizationApi.getByRootLead(0, 0)])
        .then(([response]) => {
          this.data = response;
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
        });
    },
    loadDistrictData() {
      Promise.all([districtApi.getByLead(0, 0)])
        .then(([response]) => {
          this.data = response;
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
        });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([]);
      }
      switch (parseInt(this.dataType)) {
        case 0:
          Promise.all([orginizationApi.getTreeByLead(node.data.id, 0)])
            .then(([response]) => {
              resolve(response);
            })
            .catch(error => {});
          break;
        case 1:
          break;
      }
    },
    handleClick(tab, event) {
      this.loadData(this.dataType);
    },
    onPageChange(index) {
      this.formData.pagination.currentPage = index;
      this.handleNodeClick(this.selected);
    },
    onPageSizeChange(size) {
      this.formData.pagination.pageSize = size;
      this.handleNodeClick(this.selected);
    }
  }
};
</script>
