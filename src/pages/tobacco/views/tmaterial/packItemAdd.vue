<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.tmaterial.packItem.pack')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        :disabled="true"
        v-model="formItem.pack.name"
      />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.packItem.material')">
      <el-autocomplete
        class="inline-input"
        style="width:100%"
        :value="formItem.material.name"
        :fetch-suggestions="querySearch"
        placeholder="请输入物资名称过滤"
        @select="handleSelect"
      >
        <template slot-scope="{ item }">
          <span style="float: left;width:20%; color: #8492a6; font-size: 13px">{{ item.code }}</span>
          <span style="float: left;">{{ item.name }}</span>
          <span style="float: right; color: #8492a6;">{{ item.manufacturer }}</span>
          <span style="float: right;width:30%; color: #8492a6;">{{ item.title }}</span>
        </template>
      </el-autocomplete>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.packItem.materialUnit')">
      <el-select v-model="formItem.materialUnit.id" @change="unitSelectChange" style="width:100%">
        <el-option
          v-for="unit in  formData.unitList"
          :key="unit.id"
          :label="unit.measureName"
          :value="unit.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.packItem.amount')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.amount"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.packItem.money')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.money"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.packItem.desc')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc"/>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        style="float: right"
        @click="onSubmitClick('formValidate')"
      >{{ $t('base.buttonSave') }}</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import packItemApi from "../../api/tmaterial/apiPackItem";
import materialApi from "../../api/tmaterial/apiMaterial";
import priceApi from "../../api/tmaterial/apiPrice";
import materialUnitApi from "../../api/tmaterial/apiMaterialUnit";
import moment from "moment";
import UUID from "es6-uuid";
export default {
  props: ["parentForm"],
  data() {
    return {
      formData: {
        materialList: [],
        unitList: []
      },
      formItem: {
        pack: "",
        material: "",
        materialUnit: {
          id: "",
          measureName: ""
        },
        amount: 0,
        money: 0,
        desc: ""
      },
      ruleValidate: {
        code: [{ required: true, message: "编码不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    this.load();
    Promise.all([materialApi.getAll({ size: 500, sort: "code" })])
      .then(([materialResponse]) => {
        this.formData.materialList = materialResponse.content;
      })
      .catch(error => {});
  },
  methods: {
    load() {
      this.formItem.pack = JSON.parse(JSON.stringify(this.parentForm));
    },
    unitSelectChange(value) {
      var name = this.formData.unitList.find(item => {
        return item.id === value;
      }).measureName;
      this.formItem.materialUnit.measureName = name;
    },
    querySearch(queryString, cb) {
      var materials = this.formData.materialList;
      var results = queryString
        ? materials.filter(this.createFilter(queryString))
        : materials;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return material => {
        return (
          material.name.toLowerCase().indexOf(queryString.toLowerCase()) >= 0
        );
      };
    },
    handleSelect(item) {
      this.formItem.material = JSON.parse(JSON.stringify(item));
      this.formData.unitList = [];
      this.formItem.materialUnit = {};
      Promise.all([
        materialUnitApi.getAll({
          size: 100,
          search: "material.id:eq:" + this.formItem.material.id
        })
      ])
        .then(([unitResponse]) => {
          this.formData.unitList = unitResponse.content;
        })
        .catch(error => {});
    },
    onSubmitClick(name) {
      var price =
        this.formItem.amount === 0
          ? 0
          : this.formItem.money / this.formItem.amount;
      var uid = UUID(32, 36);
      var priceForm = {
        id: uid,
        annual: this.$store.state.system.annual,
        material: this.formItem.material.id,
        materialUnit: this.formItem.materialUnit.id,
        packId: this.parentForm.id,
        packName: this.parentForm.name,
        pay: "S50",
        price: price.toFixed(2),
        priceUnit: price.toFixed(2),
        tax: 0,
        freight: 0,
        begin: moment(this.parentForm.tempBegin).format("YYYY-MM-DD"),
        end: moment(this.parentForm.tempEnd).format("YYYY-MM-DD"),
        active: true,
        desc: ""
      };
      var itemForm = {
        pack: this.parentForm.id,
        price: priceForm.id,
        amount: this.formItem.amount,
        money: this.formItem.money,
        desc: ""
      };
      console.log(priceForm);
      this.$refs[name].validate(valid => {
        if (valid) {
          Promise.all([priceApi.save(priceForm)])
            .then(([response]) => {
              Promise.all([packItemApi.save(itemForm)])
                .then(([response]) => {
                  this.formReset(name);
                  //重置表单，允许多次操作
                  this.$message({
                    message: this.$t("保存成功！"),
                    type: "info"
                  });
                })
                .catch(error => {
                  console.log(error);
                });
            })
            .catch(error => {
              console.log(error);
            });
          this.$emit("update:visible", false);
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
