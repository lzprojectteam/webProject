<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
      <organization-form :root="userOrgId" :orgId='formItem.organizationId' @onchange="organizationOnchange" style="width:100%"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.card.isn')" prop="id">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.id"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.card.barcode')" prop="code">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.barcode"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.card.number')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.number"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.card.serial')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.serial"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.card.content')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.content"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.card.date')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.date"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.card.model')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.model"/>
    </el-form-item>

    <el-form-item :label="$t('tobacco.basic.card.type')">
      <el-select v-model="formItem.type"   style="width: 100%">
        <el-option  value="RFID" label="RFID"/>
        <el-option  value="IC" label="IC"/>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.card.usage')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.usage"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.card.desc')">
      <el-input type="textarea" v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc"/>
    </el-form-item>

    <el-form-item>
      <el-button v-show='isEdit' type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{
        $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  const OrganizationForm = () => import('@/components/Organization');

  import cardApi from '../../api/basic/api_card';

  export default {
    props: ['item', 'isEdit', 'visible'],
    data() {
      return {
        formItem: {
          barcode: '',
          content: '',
          date: '',
          model: '',
          number: '',
          serial: '',
          type: '',
          usage: '',
          valid: true,
          desc: '',
          'organizationId': '',
          'organizationName': '',
          'organizationOrder': '',
          'organizationCode': '',

        },
        ruleValidate: {
          code: [{ required: true, message: '二维码不能为空', trigger: 'blur' }],
          id: [{ required: true, message: '内码不能为空', trigger: 'blur' }]
        }
      };
    },
    created() {
      this.load();
    },
    components: {
      OrganizationForm
    },
    computed: {
      userOrgId() {
        if (this.$store.state.user.organization === undefined) {
          return undefined;
        } else {
          return this.$store.state.user.organization.organizationId;
        }
      }
    },
    methods: {
      organizationOnchange(label, value, values) {
        this.formItem.organizationId = value;
        this.formItem.organizationCode = value;
        this.formItem.organizationName = label;
        this.formItem.organizationOrder = '0';
      },
      load() {
        this.formItem = JSON.parse(JSON.stringify(this.item));
        this.formItem.organizationId = this.formItem.organization.organizationId;
        this.formItem.organizationCode = this.formItem.organization.organizationId;
        this.formItem.organizationName = this.formItem.organization.organizationName;
        this.formItem.organizationOrder = this.formItem.organization.organizationOrder;
      },
      onSubmitClick(name) {
        this.$refs[name].validate(valid => {
          //进行前端检验
          if (valid) {
            Promise.all([cardApi.updateCard(this.item.id, this.formItem)])
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
              type: 'warn'
            });
          }
        });
      },

      formReset(name) {
        this.$refs[name].resetFields();
      }
    },
    watch: {
      item(curVal, oldVal) {
        this.formItem = JSON.parse(JSON.stringify(curVal));
        this.load();
      }
    }
  };
</script>
