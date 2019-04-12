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
    <el-form-item :label="$t('tobacco.tmisc.rotation.name')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.name"
      />
    </el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.rotation.year')">
          <el-date-picker
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.year"
            format="yyyy"
            style="width:100%"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.rotation.plant')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.plant"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.rotation.color')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.color"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.rotation.visible')">
          <el-select
            v-model="formItem.visible"
            style="width:100%;"
          >
            <el-option
              v-for="item in visibleoptions"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item :label="$t('tobacco.tmisc.rotation.position')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.position"
        type="number"
      />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmisc.rotation.desc')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.desc"
        type="textarea"
        rows="4"
      />
    </el-form-item>
    <el-form-item>
      <el-button
        v-show='!isEdit'
        type="primary"
        style="float: right"
        @click="onSubmitClick('formValidate')"
      >{{ $t('base.buttonSave') }} </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import rotationApi from '../../api/tmisc/api_rotation';
export default {
  data() {
    return {
      visibleoptions: [
        { value: true, label: '可见' },
        { value: false, label: '不可见' }
      ],
      formItem: {
        name: '',
        year: 0,
        plant: 0,
        color: '',
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
          Promise.all([rotationApi.saveRotation(this.formItem)])
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
