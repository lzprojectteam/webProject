<template>
  <el-form
    :model="formItem"
    label-width="80px"
    :rules="ruleValidate"
    ref="formValidate"
  >
    <el-form-item :label="$t('base.id')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.id"
      />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmisc.facilityField.name')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.name"
      />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmisc.facilityField.position')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.position"
        type="number"
      />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmisc.facilityField.visible')">
      <el-select
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.visible"
      >
        <el-option
          v-for="item in visibleoptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmisc.facilityField.desc')">
      <el-input
        type="textarea"
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.desc"
      />
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        style="float: right"
        @click="onSubmitClick('formValidate')"
      >{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import facilityFieldApi from '../../api/tmisc/api_facilityField';
export default {
  data() {
    return {
      visibleoptions: [
        { value: true, label: '可见' },
        { value: false, label: '不可见' }
      ],
      formItem: {
        id: '',
        name: '',
        visible: true,
        position: 0,
        desc: ''
      },
      ruleValidate: {
        code: [{ required: true, message: '编码不能为空', trigger: 'blur' }]
      }
    };
  },
  created() {},
  methods: {
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          Promise.all([facilityFieldApi.saveFacilityField(this.formItem)])
            .then(([response]) => {
              this.formReset(name);
              //重置表单，允许多次操作
              this.$message({
                message: this.$t('message.saveAndContinue'),
                type: 'info'
              });
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.$message({
            message: this.$t('message.formValidate'),
            type: 'warn'
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
