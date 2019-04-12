<template>
  <el-form label-width="120px"
           ref="formValidate">
    <el-form-item v-for="(item,index) in propertyList"
                  :label="item.name"
                  :key="item.id">

      <template v-if="item.tag ==='DistrictId' ">

        <organization-form ref="org"
                           root="51"
                           @onchange="organizationOnchange"
                           model="district"
                           style="width:100%" />
      </template>
      <template v-else>
        <el-input v-model="userInfoExtList[index].propertyValue"
                  :placeholder="$t('base.pleaseInput')+item.name"
                  :tag="item" />
      </template>

    </el-form-item>

    <el-form-item>
      <el-button plain type="primary"
                 size="large"
                 style="float: right"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import propertyApi from "../../api/apiProperty";
import userApi from "@/api/base/apiUser";
import districtApi from "@/api/xbasic/apiDistrict";

export default {
  props: ["userId", "loginName"],
  data() {
    return {
      propertyList: [],
      userInfoExtList: [],
      districtList: [],
      districtId: "",
      districtName: "",
      selectDistrict: []
    };
  },
  components: {
    OrganizationForm: () => import("@/components/Organization")
  },
  created() {
    this.load();
  },
  watch: {
    userId(curVal, oldVal) {
      this.load();
    }
  },
  methods: {
    load() {
      this.propertyList = [];
      this.userInfoExtList = [];
      this.selectDistrict = [];
      Promise.all([
        propertyApi.getAll({
          size: 400,
          page: 0,
          sort: "position,asc",
          search: "lead:eq:C;visible:eq:true"
        }),
        userApi.getProperty(this.loginName)
      ])
        .then(([systemList, exsitProperty]) => {
          this.propertyList = systemList.content;

          for (var p of this.propertyList) {
            var pro = {};
            pro.id = {};
            pro.id.userId = this.userId;
            pro.id.propertyId = p.tag;
            pro.propertyName = p.name;
            pro.propertyValue = this.pickpropertyValue(exsitProperty, p.tag);
            if (p.tag === "DistrictId") {
              // 约定的组织单位编码

              this.getDistrict(0);
              if (
                pro.propertyValue !== null &&
                pro.propertyValue !== undefined
              ) {
                this.selectDistrict = pro.propertyValue.splitToArray(2);
                this.onDistrictSelect(this.selectDistrict);
              }
            }
            this.userInfoExtList.push(pro);
          }
        })
        .catch(error => {});
    },
    organizationOnchange(label, value, labels, values) {
      this.districtId = value;

      this.districtName = label;
    },

    getDistrict(lead) {
      Promise.all([districtApi.getByLead(lead)])
        .then(([districtList]) => {
          this.districtList = this.toCascaderData(districtList);
        })
        .catch(error => {});
    },
    pickpropertyValue(exsitProperty, propertyId) {
      for (var p of exsitProperty) {
        if (p.id.propertyId === propertyId) {
          return p.propertyValue;
        }
      }
    },
    onSubmitClick(name) {
      if (this.districtId !== undefined && this.districtId !== "") {
        var districtEntity = {};
        districtEntity.id = {};
        districtEntity.id.userId = this.userId;
        districtEntity.id.propertyId = "DistrictId";
        districtEntity.propertyName = "行政编码";
        districtEntity.propertyValue = this.districtId;
        this.userInfoExtList.push(districtEntity);
        districtEntity = {};
        districtEntity.id = {};
        districtEntity.id.userId = this.userId;
        districtEntity.id.propertyId = "DistrictName";
        districtEntity.propertyName = "行政名称";
        districtEntity.propertyValue = this.districtName;
        this.userInfoExtList.push(districtEntity);
      }
      if (
        this.userInfoExtList === undefined ||
        this.userInfoExtList.length === 0
      ) {
        this.toast("没有任何信息");
        return;
      }
      Promise.all([userApi.updateProperty(this.userInfoExtList)])
        .then(([response]) => {
          this.toast("保存成功");
        })
        .catch(error => {
          this.toast(error);
        });
    },
    toCascaderData(organizationList) {
      let list = [];
      if (organizationList !== undefined && organizationList.length > 0) {
        for (var item of organizationList) {
          var org = {};
          org.value = item.id;
          org.label = item.name;
          org.children = [];
          if (!item.leaf) {
            org.children = [];
          }
          org.loading = false;
          list.push(org);
        }
      }
      return list;
    },
    toast(message) {
      this.$message({
        message: message,
        type: "info"
      });
    }
  }
};
</script>
