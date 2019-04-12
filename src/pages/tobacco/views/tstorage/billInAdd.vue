<template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-row>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
          <organization-form :root="userOrgId"
                             @onchange="organizationOnchange"
                             style="width:100%" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billIn.sourceOrganizationName')"
                      prop="sourceOrganizationId">
          <organization-select :value.sync="formItem.sourceOrganizationId"
                               :label.sync="formItem.sourceOrganizationName"
                               :oId.sync="formItem.operationId"
                               @onchange="sourceOrganizationOnchange"
                               v-if="haveorg" />
          <organization-form :root="sourceOrgId"
                             @onchange="sourceOrganizationOnchange"
                             style="width:100%"
                             v-if="!haveorg"
                             :showRoot="false" />

        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billIn.annual')"
                      prop="annual">
          <el-date-picker value-format="yyyy"
                          v-model="formItem.annual"
                          type="year"
                          :placeholder="$t('base.pleaseSelect')"
                          style="width: 100%">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="this.$t('tobacco.tstorage.region.whouseId')"
                      prop="warehouse">
          <el-select v-model="formItem.warehouse"
                     clearable
                     @change="getRegion(1)"
                     style="width: 100%;">
            <el-option v-for="item in formData.whouseList"
                       :value="item.id"
                       :label="item.name"
                       :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.facility.regionId')"
                      prop="region">
          <el-select v-model="formItem.region"
                     clearable
                     @change="getStack(1)"
                     style="width: 100%;">
            <el-option v-for="item in formData.regionList"
                       :value="item.id"
                       :label="item.title"
                       :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billIn.control')"
                      prop="control">
          <el-select v-model="formItem.control"
                     style="width: 100%"
                     disabled>
            <el-option v-for="item in controllist"
                       :value="item.id"
                       :label="item.name"
                       :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <!--<el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billIn.title')" prop="title">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.title"/>
        </el-form-item>
      </el-col>-->
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billIn.author')"
                      prop="author">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.author" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billIn.date')"
                      prop="date">
          <el-date-picker v-model="formItem.date"
                          type="date"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          style="width:100%;"
                          :placeholder="$t('base.pleaseSelect')">
          </el-date-picker>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billIn.operation')"
                      prop="operation">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.operationName"
                    disabled />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billIn.tobaccoYear')"
                      prop="tobaccoYear">
          <el-date-picker value-format="yyyy"
                          v-model="formItem.tobaccoYear"
                          type="year"
                          :placeholder="$t('base.pleaseSelect')"
                          style="width: 100%">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.invoice.typeName')">
          <type-select :label.sync="formItem.typeName"
                       :value.sync="formItem.typeId"
                       :key.sync="formItem.typeId"
                       style="width: 100%;">
          </type-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.invoice.statusName')">
          <status-select :label.sync="formItem.statusName"
                         :value.sync="formItem.statusId"
                         :key.sync="formItem.statusId"
                         style="width:100%;" />
        </el-form-item>
      </el-col>
      <!-- <el-col :span="8" style="height:47px">
         <el-form-item :label="$t('tobacco.tstorage.billIn.totalAmount')" prop="totalAmount">
           <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.totalAmount"
                            style="width: 100%"/>
         </el-form-item>
       </el-col>
       <el-col :span="8" style="height:47px">
         <el-form-item :label="$t('tobacco.tstorage.billIn.totalWeight')" prop="totalWeight">
           <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.totalWeight"
                            style="width: 100%"/>
         </el-form-item>
       </el-col>-->
      <el-col :span="8"
              style="height:47px">
        <el-form-item :label="$t('tobacco.tstorage.billIn.lostAmount')"
                      prop="lostAmount">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')"
                           v-model="formItem.lostAmount"
                           style="width: 100%" />
        </el-form-item>
      </el-col>
      <el-col :span="8"
              style="height:47px">
        <el-form-item :label="$t('tobacco.tstorage.billIn.lostWeight')"
                      prop="lostWeight">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')"
                           v-model="formItem.lostWeight"
                           style="width: 100%" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billIn.transfer')"
                      prop="transfer">
          <el-select v-model="formItem.transfer"
                     style="width: 100%">
            <el-option :value="1"
                       label="是"
                       key="0"></el-option>
            <el-option :value="0"
                       label="否"
                       key="1"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8"
              style="height:47px">
        <el-form-item :label="$t('tobacco.tstorage.billIn.riseAmount')"
                      prop="riseAmount">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')"
                           v-model="formItem.riseAmount"
                           style="width: 100%" />
        </el-form-item>
      </el-col>
      <el-col :span="8"
              style="height:47px">
        <el-form-item :label="$t('tobacco.tstorage.billIn.riseWeight')"
                      prop="riseWeight">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')"
                           v-model="formItem.riseWeight"
                           style="width: 100%" />
        </el-form-item>
      </el-col>
      <el-col :span="16">
        <el-form-item :label="$t('tobacco.tstorage.billIn.sourceBillId')"
                      prop="sourceBillId">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.sourceBillId" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item :label="$t('tobacco.tstorage.billIn.desc')"
                  prop="desc">
      <el-input type="textarea"
                v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.desc" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary"
                 style="float: right"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
const typeSelect = () => import("@/components/Tobacco/typeSelect");
const OrganizationForm = () => import("@/components/Organization");
const statusSelect = () => import("../components/statusSelect");
const whouseSelect = () => import("../components/whouseSelect");
const organizationSelect = () => import("../components/organizationSelect");

import operationFromToApi from "../../api/tstorage/api_operationFromTo";
import billInApi from "../../api/tstorage/api_billIn";
import warehouseApi from "../../api/tstorage/api_warehouse";
import regionApi from "../../api/tstorage/api_region";
import stackApi from "../../api/tstorage/api_stack";
import operationApi from "../../api/tstorage/api_operation";
import booksApi from "../../api/tstorage/api_books";
import categoryApi from "../../api/basic/api_category";

export default {
  data() {
    return {
      haveorg: true,
      formItem: {
        bookId: "",
        organizationId: this.$store.state.user.organization.organizationId,
        organizationName: this.$store.state.user.organization.organizationName,
        organizationOrder: "",
        organizationCode: this.$store.state.user.organization.organizationId,
        region: "",
        warehouse: "",
        stack: "",
        annual: "",
        serial: "",
        number: "",
        title: "",
        author: this.$store.state.user.userName,
        date: "",
        operation: "", //这里的operation存的是别名
        operationId: "", //用于获取收发管理下库房
        operationName: "",
        tobaccoYear: "",
        typeName: "烤烟",
        typeId: "10",
        statusName: "原烟",
        statusId: "101",
        totalAmount: "",
        totalWeight: "",
        lostAmount: "",
        lostWeight: "",
        sign: "",
        countryId: "86",
        countryName: "中国",
        transfer: 0,
        riseAmount: "",
        riseWeight: "",
        sourceBillId: "",
        sourceOrganizationId: "",
        sourceOrganizationCode: "",
        sourceOrganizationName: "",
        control: "ST_IN01",
        desc: ""
      },
      controllist: [],
      formData: {
        whouseList: [],
        regionList: [],
        stackList: [],
        bookList: []
      },
      ruleValidate: {}
    };
  },
  components: {
    organizationSelect,
    OrganizationForm,
    typeSelect,
    statusSelect,
    whouseSelect
  },
  computed: {
    userOrgId() {
      if (this.$store.state.user.organization === undefined) {
        return undefined;
      } else {
        return this.$store.state.user.organization.organizationId;
      }
    },
    sourceOrgId() {
      if (this.$store.state.user.organization === undefined) {
        return undefined;
      } else {
        return this.$store.state.user.organization.organizationId.slice(0, 4);
      }
    }
  },
  created() {
    this.load();
    //获取状态列表
    Promise.all([categoryApi.getAll({ search: "lead:EQ:ST_IN" })])
      .then(([response]) => {
        this.controllist = response.content;
      })
      .catch(error => {});

    //获取账套数据
    Promise.all([
      booksApi.getAll({
        size: 500,
        sort: "name",
        search: "organization.organizationId:rlike:{orgid};control.id:EQ:ST_BK03".format(
          {
            orgid: this.formItem.organizationId
          }
        )
      })
    ])
      .then(([response]) => {
        this.formData.bookList = response.content;
        //设置默认账套
        if (this.formData.bookList.length >= 1) {
          this.formItem.bookId = this.formData.bookList[0].id;
        } else {
          this.$message({
            message: "当前组织下没有启用账套，请及时配置！",
            type: "error"
          });
        }
      })
      .catch(error => {});
    this.getWhouse();
    this.formItem.annual = new Date().getFullYear().toString();
    this.formItem.tobaccoYear = new Date().getFullYear().toString();
    this.formItem.date = new Date();
  },
  methods: {
    load() {
      let arr = this.$route.path.split("/");
      this.formItem.operation = arr[arr.length - 1]; //通过路由获取alias
      //获取id对应的业务流程名称
      Promise.all([
        operationApi.getAll({
          search: "alias:EQ:{alias};".format({
            alias: this.formItem.operation
          })
        })
      ])
        .then(([response]) => {
          this.formItem.operationName = response.content[0].name;
          this.formItem.operationId = response.content[0].id;
          //判断业务流程下有无组织单位，无则显示另一个组织组件
          Promise.all([
            operationFromToApi.getAll({
              size: 500,
              search: "oid:EQ:{oid}".format({
                oid: this.formItem.operationId
              })
            })
          ]).then(([response]) => {
            if (response.content.length === 0) {
              this.haveorg = false;
            }
          });
        })
        .catch(error => {});
    },
    organizationOnchange(label, value, values) {
      this.formItem.organizationId = value;
      this.formItem.organizationCode = value;
      this.formItem.organizationName = label;
      this.formItem.organizationOrder = "0";
    },
    sourceOrganizationOnchange(label, value, values) {
      this.formItem.sourceOrganizationId = value;
      this.formItem.sourceOrganizationCode = value;
      this.formItem.sourceOrganizationName = label;
      this.formItem.sourceOrganizationOrder = "0";
    },
    getWhouse() {
      Promise.all([
        warehouseApi.getAll({
          sort: "name",
          size: 500,
          search: "organization.organizationId:rlike:{orgid};".format({
            orgid: this.$store.state.user.organization.organizationId
          })
        })
      ])
        .then(([response]) => {
          this.formData.whouseList = response.content;
          // 赋值不会触发change,导致库区无数据
          if (this.formData.whouseList.length > 0) {
            this.formItem.warehouse = this.formData.whouseList[0].id;
            this.getRegion();
          }
        })
        .catch(error => {});
    },
    getRegion() {
      this.formItem.region = "";
      this.formItem.stack = "";
      Promise.all([
        regionApi.getAll({
          sort: "title",
          search: "warehouse.id:EQ:{warehouse};".format({
            warehouse: this.formItem.warehouse
          })
        })
      ])
        .then(([response]) => {
          this.formData.regionList = response.content;
          if (response.content.length > 0) {
            this.formItem.region = this.formData.regionList[0].id;
          }
        })
        .catch(error => {});
    },
    getStack() {
      this.formItem.stock = "";
      Promise.all([
        stackApi.getAll({
          sort: "name",
          size: 500,
          search: "region.id:EQ:{region};".format({
            region: this.formItem.region
          })
        })
      ])
        .then(([response]) => {
          this.formData.stackList = response.content;
        })
        .catch(error => {});
    },
    onSubmitClick(name) {
      console.log(this.formItem);
      this.$refs[name].validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "处理中,请稍后",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          Promise.all([billInApi.saveBillIn(this.formItem)])
            .then(([response]) => {
              loading.close();
              this.formReset("formValidate");
              //重置表单，允许多次操作
              this.$message({
                message: this.$t("message.saveAndContinue"),
                type: "info"
              });
            })
            .catch(error => {
              loading.close();
              console.log(error);
            });
        } else {
          this.$message({
            message: this.$t("message.formValidate"),
            type: "warn"
          });
        }
      });
    },
    formReset(name) {
      this.$refs[name].resetFields();
    }
  },
  watch: {
    //监听路由变化
    $route: {
      handler: function(val, oldVal) {
        this.load();
      },
      // 深度观察监听
      deep: true
    }
  }
};
</script>
