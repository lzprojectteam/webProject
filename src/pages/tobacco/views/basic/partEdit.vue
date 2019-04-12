<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.basic.part.typeId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.typeId"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.part.partId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.partId"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.part.code')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.code"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.part.name')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.name"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.part.visible')">
      <el-switch v-model="formItem.visible"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.part.desc')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc"/>
    </el-form-item>
    <el-form-item>
      <el-button v-show='isEdit' type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{
        $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import partApi from '../../api/basic/api_part';

  export default {
    props: ['item', 'isEdit', 'visible'],
    data() {
      return {
        formItem: {
          'typeId': '',
          'partId': '',
          'code': '',
          'name': '',
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
            Promise.all([partApi.updatePart(this.item.id, this.formItem)])
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
