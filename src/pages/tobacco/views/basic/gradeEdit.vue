<template>
  <el-form :model="formItem" label-width="100px" :rules="ruleValidate" ref="formValidate">
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.basic.grade.id')" prop="id">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.id"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.basic.grade.code')" prop="code">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.code"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.basic.grade.name')" prop="name">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.name"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.basic.grade.type')" prop="type">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.type"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.basic.grade.rankId')" prop="rankId">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.rankId"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.basic.grade.partId')" prop="partId">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.partId"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.basic.grade.colorId')" prop="colorId">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.colorId"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.basic.grade.classifyId')" prop="classifyId">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.classifyId"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.basic.grade.countryId')" prop="countryId">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.countryId"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.basic.grade.visible')" prop="visible">
          <el-switch v-model="formItem.visible"/>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item :label="$t('tobacco.basic.grade.desc')" prop="desc">
          <el-input type="textarea" v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button v-show='isEdit' type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{
        $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import gradeApi from '../../api/basic/api_grade';

  export default {
    props: ['item', 'isEdit', 'visible'],
    data() {
      return {
        formItem: {
          'id': '',
          'code': '',
          'name': '',
          'type': '',
          'rankId': '',
          'partId': '',
          'colorId': '',
          'classifyId': '',
          'countryId': '',
          'visible': true,
          'desc': '',
        },
        ruleValidate: {
          code: [
            {required: true, message: '编码不能为空', trigger: 'blur'}
          ],
        }
      };
    },
    created() {
      this.load();
    },
    methods: {
      load() {
        this.formItem = JSON.parse(JSON.stringify(this.item));
      },
      onSubmitClick(name) {
        this.$refs[name].validate((valid) => {//进行前端检验
          if (valid) {
            Promise.all([gradeApi.updateGrade(this.item.id, this.formItem)])
              .then(([response]) => {
                this.formReset('formValidate');
                this.$message({
                  message: this.$t('message.editAndExid'),
                  type: 'success',
                });
                this.$emit('update:visible', false);
                this.$emit('refresh');
              })
              .catch(error => {

              });
          } else {
            this.$message({
              message: this.$t('message.formValidate'),
              type: 'warn',
            });
          }
        });
      },

      formReset(name) {
        this.$refs[name].resetFields();
      },

    },
    watch: {
      item(curVal, oldVal) {
        this.formItem = JSON.parse(JSON.stringify(curVal));
        this.load();
      },
    },
  };
</script>
