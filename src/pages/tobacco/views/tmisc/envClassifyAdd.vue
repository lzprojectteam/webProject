<template>
  <el-form
    :model="formItem"
    label-width="80px"
    :rules="ruleValidate"
    ref="formValidate"
  >
    <el-form-item :label="$t('tobacco.tmisc.envClassify.lead')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.lead"
      />
    </el-form-item>

    <el-form-item :label="$t('tobacco.tmisc.envClassify.name')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.name"
      />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmisc.envClassify.position')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.position"
        type="number"
      />
    </el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.envClassify.leaf')">
          <el-select
            v-model="formItem.leaf"
            style="width:100%;"
          >
            <el-option
              v-for="item in leafoption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.envClassify.visible')">
          <el-select
            v-model="formItem.visible"
            style="width:100%;"
          >
            <el-option
              v-for="item in visibleoption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item :label="$t('tobacco.tmisc.envClassify.desc')">
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
import envClassifyApi from '../../api/tmisc/api_envClassify';
export default {
  data() {
    return {
      visibleoption: [
        {
          value: true,
          label: '可见'
        },
        {
          value: false,
          label: '不可见'
        }
      ],
      leafoption: [
        {
          value: true,
          label: '节点'
        },
        {
          value: false,
          label: '非节点'
        }
      ],
      formItem: {
        lead: '',
        leaf: true,
        name: '',
        visible: true,
        position: '',
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
          Promise.all([envClassifyApi.saveEnvClassify(this.formItem)])
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
