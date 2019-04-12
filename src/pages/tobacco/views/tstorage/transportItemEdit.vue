<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.tstorage.transportItem.transportId')" prop="transportId">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.transportNumber" disabled/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.transportItem.year')" prop="year">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.year" disabled/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tsell.invoice.statusName')">
      <el-input v-model="formItem.statusName" :placeholder="$t('base.pleaseInput')" disabled></el-input>
    </el-form-item>
    <el-row>
      <el-form-item :label="$t('tobacco.tsell.invoice.typeName')">
        <el-col :span='7'>
          <el-input v-model="formItem.typeName" :placeholder="$t('base.pleaseInput')" disabled></el-input>
        </el-col>
        <el-col :span='1' style="text-align: center">-</el-col>
        <el-col :span='7'>
          <el-input v-model="formItem.varietyName" :placeholder="$t('base.pleaseInput')" disabled></el-input>
        </el-col>
        <el-col :span='1' style="text-align: center">-</el-col>
        <el-col :span='8'>
          <el-input v-model="formItem.gradeName" :placeholder="$t('base.pleaseInput')" disabled></el-input>
        </el-col>
      </el-form-item>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.invoice.rankName')">
          <el-input v-model="formItem.rankName" :placeholder="$t('base.pleaseInput')" disabled></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.transportItem.standard')" prop="standard">
          <el-switch v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.standard" disabled/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item :label="$t('tobacco.tstorage.transportItem.amount')" prop="amount">
      <el-input-number :min="1" v-model="formItem.amount" style="width: 100%"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.transportItem.weight')" prop="weight">
      <el-input-number :min="formItem.standard?0:0.00001" v-model="formItem.weight" style="width: 100%"
                       disabled/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.transportItem.desc')" prop="desc">
      <el-input type="textarea" v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc"/>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{
        $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import transportItemApi from '../../api/tstorage/api_transportItem';

  const statusSelect = () => import('../components/statusSelect');
  const rankSelect = () => import('../components/rankSelect');
  const typeVarietyGradeSelect = () => import('@/components/Tobacco/typeVarietyGradeSelect');

  export default {
    props: ['item', 'isEdit', 'visible', 'selectRow'],
    data() {
      return {
        allData: {},
        formItem: {
          'transportNumber': '',
          'transportId': '',
          'itemId': 0,
          'countryId': '',
          'countryName': '',
          'year': '',
          'typeId': '10',
          'typeName': '烤烟',
          'statusId': '101',
          'statusName': '原烟',
          'varietyId': '',
          'varietyName': '',
          'rankId': '',
          'rankName': '',
          'gradeId': '',
          'gradeCode': '',
          'gradeName': '',
          'standard': true,
          'amount': 0,
          'weight': 0,
          'desc': '',
        },
        formData: {
          minWeight: 0,
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
    components: {
      statusSelect,
      rankSelect,
      typeVarietyGradeSelect,
    },
    methods: {
      load() {
        this.formItem = JSON.parse(JSON.stringify(this.item));
        //先重置对象,不然组件watch不生效
        this.allData = {};
        //初始化烟叶类型等数据，用于回显
        this.allData['typeId'] = this.formItem.typeId;
        this.allData['gradeId'] = this.formItem.gradeId;
        this.allData['varietyId'] = this.formItem.varietyId;
        if (this.selectRow) {
          this.formItem.transportNumber = JSON.parse(JSON.stringify(this.selectRow)).number;
        }
        this.formItem.organizationId = this.formItem.organization.organizationId;
        this.formItem.organizationName = this.formItem.organization.organizationName;
        this.formItem.organizationCode = this.formItem.organization.organizationCode;
        this.formItem.organizationOrder = this.formItem.organization.organizationOrder;
        if (this.formItem.annual) {
          this.formItem.year = this.formItem.annual.toString();
        }
      },
      onSubmitClick(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            Promise.all([transportItemApi.updateTransportItem(this.formItem.id, this.formItem)])
              .then(([response]) => {
                this.formReset('formValidate');
                this.$message({
                  message: this.$t('message.editAndExid'),
                  type: 'success',
                });
                this.$emit('update:visible', false);
                this.$emit('refresh2');
              })
              .catch(error => {
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

    },
    watch: {
      item(curVal, oldVal) {
        this.load();
      },
    },
  };
</script>
