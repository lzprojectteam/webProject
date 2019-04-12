<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <h3>必填项:</h3>
    <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
      <organization-form :root="userOrgId" @onchange="organizationOnchange" style="width:100%" />
    </el-form-item>
    <el-row style="border-bottom: 2px solid #409EFF;">
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.operation.alias')" prop="alias">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.alias" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.operation.name')" prop="name">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.name" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.operation.title')" prop="title">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.title" />
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item :label="$t('tobacco.tstorage.operation.checking')" prop="checking">
          <el-switch v-model="formItem.checking" />
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item label="是否复检" prop="checking">
          <el-switch v-model="formItem.reChecking" />
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item :label="$t('tobacco.tstorage.operation.constraint')" prop="constraint">
          <el-switch v-model="formItem.constraint" />
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item :label="$t('tobacco.tstorage.operation.immediate')" prop="immediate">
          <el-switch v-model="formItem.immediate" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.operation.balance')" prop="balance">
          <el-select v-model="formItem.balance" style="width: 100%" @change="handleBanceChange">
            <el-option v-for="(val,key) in formData.inOutTypeList" :key="key" :value="key" :label="val"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <h3>选填项:</h3>
    <el-row>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.operation.relationId')" prop="relationId">
          <el-select v-model="formItem.relationId" style="width: 100%" placeholder="请选择" filterable clearable>
            <el-option v-for="item in formData.operationList" :key="item.id" :value="item.alias" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.operation.lead')" prop="lead">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.lead" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.operation.prefix')" prop="prefix">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.prefix" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.operation.entry')" prop="entry">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.entry" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.operation.print')" prop="print">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.print" />
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item :label="$t('tobacco.tstorage.operation.visible')" prop="visible">
          <el-switch v-model="formItem.visible"></el-switch>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item :label="$t('tobacco.tstorage.operation.leaf')" prop="leaf">
          <el-switch v-model="formItem.leaf"></el-switch>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.operation.position')" prop="position">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.position" style="width: 100%" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item :label="$t('tobacco.tstorage.operation.desc')" prop="desc">
          <el-input type="textarea" v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import operationApi from '../../api/tstorage/api_operation';

const OrganizationForm = () => import('@/components/Organization');

export default {
  data() {
    return {
      formItem: {
        relationId: '',
        lead: '',
        leaf: true,
        prefix: '',
        alias: '',
        name: '',
        title: '',
        balance: '',
        immediate: true,
        checking: true,
        reChecking: true,
        entry: '',
        print: '',
        visible: true,
        position: 0,
        constraint: true,
        desc: '',
        organizationId: this.$store.state.user.organization.organizationId,
        organizationName: this.$store.state.user.organization.organizationName,
        organizationOrder: '0',
        organizationCode: this.$store.state.user.organization.organizationId,
        districtOrder: '0'
      },
      formData: {
        // inOutTypeList: {'-1': '出库', '0': '移库', '1': '入库'},
        inOutTypeList: { '-1': '出库', '1': '入库' },
        operationList: [],
        operationList_temp: []
      },
      ruleValidate: {
        alias: [
          {
            required: true,
            message: this.$t('base.mustInput'),
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: this.$t('base.mustInput'),
            trigger: 'blur'
          }
        ],
        title: [
          {
            required: true,
            message: this.$t('base.mustInput'),
            trigger: 'blur'
          }
        ],
        balance: [
          {
            required: true,
            message: this.$t('base.mustInput'),
            trigger: 'blur'
          }
        ],
        checking: [
          {
            required: true,
            message: this.$t('base.mustInput'),
            trigger: 'blur'
          }
        ],
        reChecking: [
          {
            required: true,
            message: this.$t('base.mustInput'),
            trigger: 'blur'
          }
        ],
        constraint: [
          {
            required: true,
            message: this.$t('base.mustInput'),
            trigger: 'blur'
          }
        ],
        immediate: [
          {
            required: true,
            message: this.$t('base.mustInput'),
            trigger: 'blur'
          }
        ]
      }
    };
  },
  created() {
    this.getRelation();
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
    getRelation() {
      Promise.all([
        operationApi.getAll({
          size: 500,
          sort: 'alias,ASC',
          search: 'balance:EQ:1;'
        })
      ])
        .then(([response]) => {
          this.formData.operationList_temp = response.content;
        })
        .catch(error => {});
    },
    handleBanceChange() {
      if (this.formItem.balance === '-1') {
        //出库
        this.formData.operationList = this.formData.operationList_temp;
      } else {
        this.formData.operationList = [];
      }
    },
    organizationOnchange(label, value, values) {
      this.formItem.organizationId = value;
      this.formItem.organizationCode = value;
      this.formItem.organizationName = label;
      this.formItem.organizationOrder = '0';
    },
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: '处理中,请稍后',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          Promise.all([operationApi.saveOperation(this.formItem)])
            .then(([response]) => {
              loading.close();
              this.formReset('formValidate');
              //重置表单，允许多次操作
              this.$message({
                message: this.$t('message.saveAndContinue'),
                type: 'info'
              });
              // 再次获取关联类型
              this.getRelation();
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
  }
};
</script>
