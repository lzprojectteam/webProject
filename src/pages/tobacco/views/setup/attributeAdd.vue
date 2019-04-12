<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.setup.attribute.categoryId')" prop='categoryId'>
      <el-select v-model="formItem.categoryId" :placeholder="$t('base.pleaseSelectOrCreate')" style="width: 100%"
                 allow-create filterable>
        <el-option
          v-for="(item,index) in optionData.categoryIdOptions"
          :key="index"
          :label="item"
          :value="item">
        </el-option>
      </el-select>

    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.attribute.label')" prop="label">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.label"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.attribute.keyId')" prop="keyId">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.keyId"/>
    </el-form-item>


    <el-form-item :label="$t('tobacco.setup.attribute.value')" prop="value">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.value"/>
    </el-form-item>

    <el-form-item :label="$t('tobacco.setup.attribute.example')" prop="example">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.example"/>
    </el-form-item>


    <el-form-item :label="$t('tobacco.setup.attribute.type')" prop="type">
      <el-select filterable
                 default-first-option
                 allow-create v-model="formItem.type" :placeholder="$t('base.pleaseSelectOrCreate')" style="width: 100%">
        <el-option
          v-for="(item,index) in optionData.typeOptions"
          :key="index"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    </el-form-item>


    <el-form-item :label="$t('tobacco.setup.attribute.edit')" prop="edit">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.edit"/>
    </el-form-item>


    <el-form-item :label="$t('tobacco.setup.attribute.visible')" prop="visible">
      <el-radio-group v-model="formItem.visible">
        <el-radio :label=true>是</el-radio>
        <el-radio :label=false>否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.attribute.position')" prop="position">
      <el-input-number v-model="formItem.position" label="$t('base.pleaseInput')" style="width:100%"></el-input-number>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.attribute.desc')" prop="desc">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" type="textarea" :rows="2" v-model="formItem.desc"/>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" style="float: right" @click="onSubmitClick('formValidate')" ref="formValidate">{{
        $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import attributeApi from '../../api/setup/api_attribute';

  export default {
    data() {
      // 验证数值型
      let checkNumber = (rule, value, callback) => {
        if (value === '') {
          callback();
        } else if (isNaN(value)) {
          callback(new Error(this.$t('tobacco.setup.station.number')));
        } else {
          callback();
        }
      };
      return {
        formItem: {
          categoryId: '',
          keyId: '',
          label: '',
          value: '',
          example: '',
          type: '',
          edit: '',
          visible: true,
          position: '',
          desc: ''
        },
        optionData: {
          categoryIdOptions: [],
          typeOptions: ['String', 'Boolean', 'Integer', 'Double']
        },
        ruleValidate: {
          categoryId:
            [
              {type: 'string', required: true, message: this.$t('tobacco.setup.station.need'), trigger: 'blur'}
            ],
          label:
            [
              {type: 'string', required: true, message: this.$t('tobacco.setup.station.need'), trigger: 'blur'}
            ],
          keyId:
            [
              {type: 'string', required: true, message: this.$t('tobacco.setup.station.need'), trigger: 'blur'}
            ],
          value:
            [
              {type: 'string', required: true, message: this.$t('tobacco.setup.station.need'), trigger: 'blur'}
            ],
          edit:
            [
              {validator: checkNumber, trigger: 'blur'}
            ],
          position:
            [
              {validator: checkNumber, trigger: 'blur'}
            ]
        }
      };
    },
    created() {
      Promise.all([attributeApi.showType()])
        .then(([response]) => {
          this.optionData.categoryIdOptions = response;
        })
        .catch(error => {
          console.log(error);
        });
    },
    methods: {
      onSubmitClick(name) {
        this.$refs[name].validate(valid => {
          if (valid) {
            const loading = this.$loading({
              lock: true,
              text: '处理中,请稍后',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            Promise.all([attributeApi.saveAttribute(this.formItem)])
              .then(([response]) => {
                loading.close();
                this.formReset(name);
                //重置表单，允许多次操作
                this.$message({
                  message: this.$t('message.saveAndContinue'),
                  type: 'info'
                });
              })
              .catch(error => {
                loading.close();
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
    },
    props: []
  };
</script>
