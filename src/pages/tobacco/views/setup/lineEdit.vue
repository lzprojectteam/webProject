<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.setup.line.id')" prop="id">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.id" @blur="checkRepeat" disabled/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.line.name')" prop="name">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.name"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.line.visible')">
      <el-radio-group v-model="formItem.visible">
        <el-radio :label=true>是</el-radio>
        <el-radio :label=false>否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.line.desc')">
      <el-input
        type="textarea"
        :rows="2"
        :placeholder="$t('base.pleaseInput')" v-model="formItem.desc">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button v-show='isEdit' type="primary" style="float: right" @click="onSubmitClick('formValidate')"
                 :disabled="isDisabled">{{
        $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import lineApi from '../../api/setup/api_line';

  export default {
    props: ['item', 'isEdit', 'visible'],
    data() {
      return {
        formItem: {
          'name': '',
          'visible': true,
          'desc': '',
          'id': ''
        },
        isDisabled: false,
        currentId: '',
        ruleValidate: {
          id: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],
          name: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ]
        }
      };
    },
    created() {
      this.load();
    },
    methods: {
      load() {
        this.formItem = JSON.parse(JSON.stringify(this.item));
        this.currentId = this.formItem.id;
      },
      onSubmitClick(name) {
        this.$refs[name].validate((valid) => {//进行前端检验
          if (valid) {
            Promise.all([lineApi.updateLine(this.item.id, this.formItem)])
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
      checkRepeat() {
        if (this.currentId === this.formItem.id) {
          this.isDisabled = false;
        } else {
          Promise.all([lineApi.getAll({
            search: 'id:EQ:{id};'.format({
              id: this.formItem.id
            })
          })])
            .then(([response]) => {
              if (response.content.length > 0) {
                this.$message({
                  message: this.$t('tobacco.setup.line.repeatId'),
                  type: 'error'
                });
                this.isDisabled = true;
              } else {
                this.isDisabled = false;
              }
            })
            .catch(error => {
            });
        }
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
