<template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('tobacco.tmaterial.material.category')"
                  prop="category">
      <el-select v-model='formItem.category'
                 style="width:100%">
        <el-option v-for="category in  formData.categoryList"
                   :key="category.id"
                   :label="category.name"
                   :value="category.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.material.code')"
                  prop="code">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.code" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.material.name')"
                  prop="name">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.name" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.material.title')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.title" />
    </el-form-item>    
    <el-form-item :label="$t('tobacco.tmaterial.material.manufacturer')">
      <el-autocomplete class="inline-input" style="width:100%"
                       v-model="formItem.manufacturer"
                       :fetch-suggestions="querySearch"
                       placeholder="请输入供货商名称"
                       :trigger-on-focus="false"
                       @select="handleSelect">
          <template slot-scope="{ item }">
              <div class="name">{{ item.name }}</div>
          </template>
      </el-autocomplete>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.material.measure')">
      <el-select v-model='formItem.measure'
                 style="width:100%">
        <el-option v-for="measure in  formData.measureList"
                   :key="measure.id"
                   :label="measure.name"
                   :value="measure.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.material.visible')">
      <el-checkbox v-model="formItem.visible" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.material.desc')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
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
import materialApi from "../../api/tmaterial/apiMaterial";
import categoryApi from "../../api/tmaterial/apiCategory";
import measureApi from "../../api/tmaterial/apiMeasure";
import organizationApi from "@/api/xbasic/apiOrganization";
import moment from "moment";
export default {
  data() {
    return {
      formData: {
        categoryList: [],
        measureList: [],
        manufacturerList: []
      },
      formItem: {
        serial: moment().format("YYYYMMDDHHmmss"),
        barcode: "",
        category: "",
        code: "",
        name: "",
        alphabet: "",
        title: "",
        author: this.$store.state.user.userName,
        date: moment().format("YYYY-MM-DD"),
        brand: "",
        manufacturerId: "",
        manufacturer: "",
        measure: "",
        period: 0,
        picture: "",
        visible: true,
        desc: ""
      },
      ruleValidate: {
        code: [{ required: true, message: "编码不能为空", trigger: "blur" }],
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    Promise.all([
      categoryApi.getAll({ size: 100 }),
      measureApi.getAll({ search: "leaf:eq:true", size: 100 }),
      organizationApi.getAll({ search: "lead:eq:XC", size: 500 })
    ])
      .then(([response, measureResponse, manufacturerResponse]) => {
        this.formData.categoryList = response.content;
        this.formData.measureList = measureResponse.content;
        this.formData.manufacturerList = manufacturerResponse.content;
      })
      .catch(error => {});
  },
  components: {
    OrganizationForm: () => import("@/components/Organization")
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
    querySearch(queryString, cb) {
      var manufacturers = this.formData.manufacturerList;
      console.log(manufacturers);
      var results = queryString ? manufacturers.filter(this.createFilter(queryString)): manufacturers;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      console.log(queryString);
      return manufacturer => {
        return (
          manufacturer.name.toLowerCase().indexOf(queryString.toLowerCase()) >=
          0
        );
      };
    },
    handleSelect(item) {
      this.formItem.manufacturerId = item.id;
      this.formItem.manufacturer = item.name;
    },    
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          Promise.all([materialApi.save(this.formItem)])
            .then(([response]) => {
              this.formReset(name);
              //重置表单，允许多次操作
              this.$message({
                message: this.$t("message.saveAndContinue"),
                type: "info"
              });
            })
            .catch(error => {
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
  }
};
</script>
