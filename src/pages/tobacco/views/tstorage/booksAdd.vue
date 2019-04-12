<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
      <organization-form :root="userOrgId" @onchange="organizationOnchange" style="width:100%"/>
    </el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.books.code')" prop="code">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.code" @blur="checkCode"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.books.name')" prop="name">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.name"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.books.title')" prop="title">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.title"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.books.author')" prop="author">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.author"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.books.date')" prop="date">
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
                          v-model="formItem.date"
                          type="date"
                          :placeholder="$t('base.pleaseSelect')" style="width: 100%">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.books.period')" prop="period">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.period" style="width: 100%"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.books.createYear')" prop="createYear">
          <el-date-picker
            value-format="yyyy"
            v-model="formItem.createYear"
            type="year"
            :placeholder="$t('base.pleaseSelect')" style="width: 100%">
            style="width: 100%"
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.books.createMonth')" prop="createMonth">
          <el-select v-model="formItem.createMonth" style="width: 100%">
            <el-option
              v-for="item in 12"
              :key="item"
              :label="item+'月'"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.books.currentYear')" prop="currentYear">
          <el-date-picker
            value-format="yyyy"
            v-model="formItem.currentYear"
            type="year"
            :placeholder="$t('base.pleaseSelect')" style="width: 100%" prop="currentYear">
            style="width: 100%"
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.books.currentMonth')" prop="currentMonth">
          <el-select v-model="formItem.currentMonth" style="width: 100%">
            <el-option
              v-for="item in 12"
              :key="item"
              :label="item+'月'"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item :label="$t('tobacco.tstorage.books.desc')" prop="desc">
      <el-input type='textarea' v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" style="float: right" :disabled="isDisabled"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  const OrganizationForm = () => import('@/components/Organization');

  import booksApi from '../../api/tstorage/api_books';

  export default {
    data() {
      return {
        isDisabled: false,
        formItem: {
          'control': 'ST_BK01',
          'code': '',
          'name': '',
          'title': '',
          'author': this.$store.state.user.userName,
          'date': '',
          'zone': '',
          'stock': '',
          'period': 99,
          'createYear': '',
          'createMonth': '',
          'currentYear': '',
          'currentMonth': '',
          'desc': '',
          'createYearAndMonth': '',
          'currentYearAndMonth': '',
          'organizationId': this.$store.state.user.organization.organizationId,
          'organizationName': this.$store.state.user.organization.organizationName,
          'organizationOrder': '',
          'organizationCode': this.$store.state.user.organization.organizationId,
        },
        ruleValidate: {
          name: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],
        }
      };
    },
    created() {
      this.formItem.date = new Date();
      this.formItem.createYear = new Date().getFullYear().toString();
      this.formItem.createMonth = new Date().getMonth() + 1;
      this.formItem.currentYear = new Date().getFullYear().toString();
      this.formItem.currentMonth = new Date().getMonth() + 1;
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
      checkCode() {
        if (this.formItem.code === '') {
          this.isDisabled = false;
        } else {
          Promise.all([booksApi.checkCode(this.formItem.code)])
            .then(([response]) => {
              this.isDisabled = false;
            })
            .catch(error => {
              this.$message({
                message: this.$t('tobacco.tstorage.books.codeRepeat'),
                type: 'error',
              });
              this.isDisabled = true;
            });
        }
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
            Promise.all([booksApi.saveBooks(this.formItem)])
              .then(([response]) => {
                loading.close();
                this.formReset('formValidate');
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
