<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.setup.lineRole.lineId')" prop="lineId">
      <el-select :placeholder="$t('base.pleaseSelect')"
                 v-model="formItem.lineId" clearable style="width:100%" @change="roleChange">
        <el-option
          v-for="item in formData.modelIdList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.lineRoleAlias.roleId')" prop="roleId">
      <el-select :placeholder="$t('base.pleaseSelect')"
                 v-model="formItem.roleId" clearable style="width:100%">
        <el-option
          v-for="item in formData.lineRoleList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.lineRoleAlias.code')" prop="code">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.code"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.lineRoleAlias.name')" prop="name">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.name"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.lineRoleAlias.desc')" prop="desc">
      <el-input type="textarea" v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" style="float: right"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import lineRoleAliasApi from '../../api/setup/api_lineRoleAlias';
  import lineApi from '../../api/setup/api_line';
  import lineRoleApi from '../../api/setup/api_lineRole';

  export default {
    data() {
      return {
        formItem: {
          'lineId': '',
          'roleId': '',
          'keyId': '',
          'code': '',
          'name': '',
          'desc': '',
        },
        formData: {
          //存放模式编码
          modelIdList: [],
          lineRoleList: [],
          lineRoles: [],
        },
        ruleValidate: {
          lineId: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],
          roleId: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],
          code: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],
          name: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],

        }
      };
    },
    created() {
      Promise.all([lineApi.getAll()])
        .then(([response]) => {
          var arr = [];
          for (var k in response.content) {
            arr.push({
              'label': response.content[k].name,
              'value': response.content[k].id
            });
          }
          this.formData.modelIdList = arr;
        })
        .catch(error => {
        });
      Promise.all([lineRoleApi.getAll()])
        .then(([response]) => {
          var arr2 = [];
          for (var k in response.content) {
            arr2.push({
              'label': response.content[k].name,
              'value': response.content[k].roleId,
              'lineId': response.content[k].lineId,
            });
          }
          this.formData.lineRoles = arr2;
        })
        .catch(error => {
        });
    },
    methods: {
      roleChange(item) {
        let arr = [];
        let that = this;
        this.formItem.roleId = '';
        that.formData.lineRoles.forEach(function (val) {
          if (val['lineId'] === item) {
            arr.push({
              'label': val['label'],
              'value': val['value'],
            });
          }
        });
        that.formData.lineRoleList = arr;
      },
      onSubmitClick(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            const loading = this.$loading({
              lock: true,
              text: '处理中,请稍后',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            Promise.all([lineRoleAliasApi.saveLineRoleAlias(this.formItem)])
              .then(([response]) => {
                loading.close();
                this.formReset(name);
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

    }
  };
</script>
