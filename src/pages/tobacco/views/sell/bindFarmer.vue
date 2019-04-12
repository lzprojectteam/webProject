<template>
  <el-form :model="formItem"
           label-width="80px"
           style="height:150px;"
           ref="formValidate"
           inline>
    <!--  <el-form-item :label="$t('搜索用户')" style="width:60%">
      <el-select @change="selectChange" ref='userSelect' v-model='formItem.userId' filterable remote placeholder="请输入关键词" :remote-method='remoteMethod' style="width:240px">
        <el-option v-for="item in formItem.userList" :key="item.id" :label="item.name" :value="item.id">
          <span style="float: left;">[{{ item.loginName }}]</span>
          <span style="float: left">{{ item.name }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.phone }}</span>
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" style="float: right" @click="onSubmitClick('formValidate')">确定
      </el-button>
    </el-form-item> -->
    <el-row>
      <el-col :span="24">
        <el-form-item label="">
          {{formItem.title}}
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item :label="$t('发票号')">
          <el-input v-bind:placeholder="$t('请输入发票号')"
                    v-model="formItem.number" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item>
          <el-button type="primary"
                     style="float: right"
                     @click="onSubmitClick">确定
          </el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import receiptApi from "../../api/tsell/api_receipt";
import feePrint from "../../utils/support_fee_print_lodop_nomal.js";

//import contractPint from '@/uitls/temp_contract_print_lodop_nomal.js';
export default {
  props: ["item", "visible"],
  data() {
    return {
      formItem: {
        title: this.item.title,
        number: "",
        orgId: this.item.organization.organizationId
      },
      searchData: {
        orgId: ""
      }
    };
  },
  /* load() {
    this.formItem = JSON.parse(JSON.stringify(this.item));
  }, */
  created() {
    var tempObj = JSON.parse(JSON.stringify(this.item));
    if (
      tempObj.organization.organizationId === null ||
      tempObj.organization.organizationId === "" ||
      tempObj.organization.organizationId === undefined
    ) {
      this.formItem.orgId = this.$store.state.user.organization.organizationId;
    } else {
      this.formItem.orgId = this.$store.state.user.organization.organizationId;
    }
    //console.log(JSON.parse(JSON.stringify(this.item)));
    Promise.all([receiptApi.getMaxFeeNo(this.formItem.orgId, "R2")])
      .then(([response]) => {
        console.log(JSON.parse(JSON.stringify(response)));
        this.formItem.number = response;
        //this.searchData.plantList = response.content;
      })
      .catch(error => {});
    console.log(JSON.parse(JSON.stringify(this.item)));
  },
  /* computed: {
    userOrgId() {
      if (this.$store.state.user.organization === undefined) {
        this.formItem.orgId = undefined;
        return undefined;
      } else {
        this.formItem.orgId = this.$store.state.user.organization.organizationId;
        return this.$store.state.user.organization.organizationId;
      }
    }
  }, */
  methods: {
    selectChange(id) {
      let obj = {};
      obj = this.formItem.userList.find(item => {
        return item.id === id;
      });
      this.formItem.userName = obj.loginName;
    },
    onSubmitClick() {
      if (this.formItem.hrEmployeeId === null) {
        this.$message({
          message: this.$t("message.noId"),
          type: "error"
        });
        return;
      }
      Promise.all([
        receiptApi.buttonSupportFee_actionListener(
          this.formItem.orgId,
          this.item.uid
        )
      ])
        .then(([response]) => {
          //console.info(response);
          feePrint.Preview(response);
        })
        .catch(error => {});
    },
    formReset(name) {
      this.$refs[name].resetFields();
      this.$emit("refresh");
    }
  }
};
</script>
