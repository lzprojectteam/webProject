<template>
  <el-form :model="formItem" label-width="100px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.setup.lineRole.lineId')" prop="lineId">
      <el-select :placeholder="$t('base.pleaseSelect')"
                 v-model=" formItem.lineId" clearable style="width: 100%" @change="checkRepeat">
        <el-option
          v-for="(item,key) in modelIdList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.lineRole.roleId')" prop="roleId">
      <el-select v-model='formItem.roleId' @change="checkRepeat" style="width: 100%">
        <el-option v-for="item in  formData.positionList" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
   <!-- <el-form-item :label="$t('tobacco.setup.lineRole.name')" prop="name" >
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.name" disabled/>
    </el-form-item>-->
    <el-form-item :label="$t('tobacco.setup.lineRole.required')" prop="required">
      <el-radio-group v-model="formItem.required">
        <el-radio :label=true>是</el-radio>
        <el-radio :label=false>否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.lineRole.requireMin')" prop="requireMin">
      <el-input-number v-model="formItem.requireMin" style="width: 100%"></el-input-number>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.lineRole.requireMax')" prop="requireMax">
      <el-input-number v-model="formItem.requireMax" style="width: 100%"></el-input-number>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.lineRole.position')" prop="position">
      <el-input-number  style="width: 100%" v-model="formItem.position"></el-input-number>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.lineRole.desc')" prop="desc">
      <el-input
        type="textarea"
        :rows="2"
        :placeholder="$t('base.pleaseInput')" v-model="formItem.desc">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" style="float: right"
                 @click="onSubmitClick('formValidate')" :disabled="isDisabled">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import lineRoleApi from '../../api/setup/api_lineRole';
  import categoryApi from '../../api/basic/api_category';

  export default {
    data() {
      return {
        formData: {
          positionList: []
        },
        formItem: {
          'lineId': '',
          'roleId': '',
          'name': '',
          'required': true,
          'requireMin': '',
          'requireMax': '',
          'position': '',
          'desc': '',
        },
        isDisabled: true,
        ruleValidate: {
          lineId: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],
          roleId: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],
          name: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],

        }
      };
    },
    created() {
      Promise.all([
        categoryApi.getAll({size: 500, search: 'lead:EQ:SC_M'}),
      ])
        .then(([response]) => {
          this.formData.positionList = response.content;
        })
        .catch(error => {
        });
    },
    props: ['modelIdList'],
    methods: {
      onSubmitClick(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            const loading = this.$loading({
              lock: true,
              text: '处理中,请稍后',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            Promise.all([lineRoleApi.saveLineRole(this.formItem)])
              .then(([response]) => {
                loading.close();
                this.formReset('formValidate');
                //重置表单，允许多次操作
                this.$message({
                  message: this.$t('message.saveAndContinue'),
                  type: 'info',
                });

              })
              .catch(error => {
                loading.close();
                console.log(error);
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
        if (this.formItem.lineId !== '' && this.formItem.roleId !== '') {
          Promise.all([lineRoleApi.getAll({
            search: 'lineId:EQ:{lineId};roleId:EQ:{roleId};'.format({
              lineId: this.formItem.lineId,
              roleId: this.formItem.roleId
            })
          })])
            .then(([response]) => {
              console.log(response);
              if (response.content.length > 0) {
                this.$message({
                  message: this.$t('tobacco.setup.lineRole.repeatId'),
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
        let that = this;
        this.formData.positionList.forEach(function (item) {
          if (that.formItem.roleId === item.id) {
            that.formItem.name = item.name;
            return;
          }
        });
      },
    }
  };
</script>
