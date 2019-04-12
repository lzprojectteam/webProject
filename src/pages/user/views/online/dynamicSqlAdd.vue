<template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('dynamicSql.dataSource')"
                  prop="dataSource">
      <el-select v-model='formItem.dataSource'
                 style="width: 100%">
        <el-option v-for="item in  dataSourceList"
                   :key="item.id"
                   :label="item.title"
                   :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('dynamicSql.namespace')"
                  prop="namespace">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.namespace" />
    </el-form-item>
    <el-form-item :label="$t('dynamicSql.catalog')"
                  prop="catalog">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.catalog" />
    </el-form-item>
    <el-form-item :label="$t('dynamicSql.title')"
                  prop="title">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.title" />
    </el-form-item>
    <el-form-item :label="$t('dynamicSql.name')"
                  prop="name">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.name" />
    </el-form-item>
    <el-form-item :label="$t('dynamicSql.privilege')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.privilege" />
    </el-form-item>

    <el-row>
      <el-col :span="8">
        <el-form-item :label="$t('dynamicSql.author')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.author" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('dynamicSql.status')">
          <el-select v-model="formItem.status">
            <el-option value=1
                       :label="$t('dynamicSql.status1')" />
            <el-option value=5
                       :label="$t('dynamicSql.status5')" />
            <el-option value=7
                       :label="$t('dynamicSql.status7')" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('base.version')">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')"
                           v-model="formItem.xVersion"
                           style="width: auto" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item>
      <el-button plain type="primary"
                 style="float: right"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import dynamicSqlApi from "../../api/online/apiDynamicSql";
import dataSourceApi from "../../api/online/apiDataSource";

export default {
  data() {
    return {
      dataSourceList: [],
      formItem: {
        namespace: "",
        catalog: "",
        title: "",
        name: "",
        privilege: "",
        mapper: "",
        author: "",
        xVersion: 0,
        status: "1",
        dataSource: ""
      },
      ruleValidate: {
        dataSource: [
          { required: true, message: "必须选择一个数据源", trigger: "blur" }
        ],
        namespace: [
          {
            required: true,
            message: "命名空间不能为空，与映射文件一致",
            trigger: "blur"
          }
        ],
        catalog: [{ required: true, message: "分类不能为空", trigger: "blur" }],
        title: [
          { required: true, message: "分类信息不能为空", trigger: "blur" }
        ],
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    Promise.all([
      dataSourceApi.getAll({
        size: 100,
        page: 0
      })
    ])
      .then(([response]) => {
        this.dataSourceList = response.content;
      })
      .catch(error => {});
  },
  methods: {
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        //进行前端检验
        if (valid) {
          Promise.all([dynamicSqlApi.saveDynamicSql(this.formItem)])
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
