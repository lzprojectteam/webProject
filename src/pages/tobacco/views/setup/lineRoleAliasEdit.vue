<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.setup.lineRole.lineId')" prop="lineId">
      <el-select :placeholder="$t('base.pleaseSelect')"
                 v-model="formItem.lineId" clearable style="width:100%" @change="roleChange" disabled>
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
                 v-model="formItem.roleId" clearable style="width:100%" disabled>
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
    <el-form-item :label="$t('tobacco.setup.lineRoleAlias.desc')">
      <el-input type="textarea" v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button v-show='isEdit' type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{
        $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import lineRoleAliasApi from '../../api/setup/api_lineRoleAlias';
  import lineApi from '../../api/setup/api_line';
  import lineRoleApi from '../../api/setup/api_lineRole';

  export default {
    props: ['item', 'isEdit', 'visible'],
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
          this.roleChange();
        })
        .catch(error => {
        });
      this.load();
    },
    methods: {
      roleChange() {
        let arr = [];
        let that = this;
        this.formData.lineRoles.forEach(function (val) {
          if (val['lineId'] === that.formItem.lineId) {
            arr.push({
              'label': val['label'],
              'value': val['value'],
            });
          }
        });
        this.formData.lineRoleList = arr;
      },
      load() {
        this.formItem = JSON.parse(JSON.stringify(this.item));
        // console.log(this.formItem.roleId);
      },
      onSubmitClick(name) {
        this.$refs[name].validate((valid) => {//进行前端检验
          if (valid) {
            Promise.all([lineRoleAliasApi.updateLineRoleAlias(this.item.id, this.formItem)])
              .then(([response]) => {
                this.formReset(name);
                this.$message({
                  message: this.$t('message.saveAndContinue'),
                  type: 'info',
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
        this.roleChange();
        this.load();
      },
    },
  };
</script>
