<template>
  <el-form :model="formItem" label-width="100px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.setup.lineRole.lineId')" prop="lineId">
      <el-select :placeholder="$t('base.pleaseSelect')"
                 v-model=" formItem.lineId" style="width:100%" clearable disabled>
        <el-option
          v-for="item in modelIdList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.lineRole.roleId')" prop="roleId">
      <el-select v-model='formItem.roleId' @change="checkRepeat" style="width: 100%" disabled>
        <el-option v-for="item in  formData.positionList" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
   <!-- <el-form-item :label="$t('tobacco.setup.lineRole.name')" prop="name">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.name" disabled/>
    </el-form-item>-->
    <el-form-item :label="$t('tobacco.setup.lineRole.required')">
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
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.position"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.lineRole.desc')">
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
  import lineRoleApi from '../../api/setup/api_lineRole';
  import categoryApi from '../../api/basic/api_category';

  export default {
    props: ['item', 'isEdit', 'visible', 'modelIdList'],
    data() {
      return {
        formItem: {
          'lineId': '',
          'roleId': '',
          'name': '',
          'required': true,
          'requireMin': 0,
          'requireMax': 0,
          'position': 0,
          'desc': '',
        },
        formData: {
          positionList: []
        },
        tempLineId: '',
        tempRoleId: '',
        isDisabled: false,
        ruleValidate: {
          lineId: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],
          roleId: [
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
      Promise.all([
        categoryApi.getAll({size: 500, search: 'lead:EQ:SC_M'}),
      ])
        .then(([response]) => {
          this.formData.positionList = response.content;
        })
        .catch(error => {
        });
    },
    methods: {
      load() {
        this.formItem = JSON.parse(JSON.stringify(this.item));
        this.tempLineId = this.formItem.lineId;
        this.tempRoleId = this.formItem.roleId;
      },
      onSubmitClick(name) {
        this.$refs[name].validate((valid) => {//进行前端检验
          if (valid) {
            Promise.all([lineRoleApi.updateLineRole(this.item.id, this.formItem)])
              .then(([response]) => {
                this.formReset(name);
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
        if (this.formItem.lineId !== '' && this.formItem.roleId !== '' && (this.formItem.lineId !== this.tempLineId || this.formItem.roleId !== this.tempRoleId)) {
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
    },
    watch: {
      item(curVal, oldVal) {
        this.formItem = JSON.parse(JSON.stringify(curVal));
        this.load();
      },
    },
  };
</script>
