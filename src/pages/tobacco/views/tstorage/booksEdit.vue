<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
      <organization-form :root="userOrgId" :orgId='formItem.organizationId' @onchange="organizationOnchange" style="width:100%"/>
    </el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.books.code')" prop="code">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.code" @blur="checkCode" disabled/>
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
      <el-button v-show='isEdit' type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{
        $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  const OrganizationForm = () => import('@/components/Organization');

  import booksApi from '../../api/tstorage/api_books';

  export default {
    props: ['item', 'isEdit', 'visible'],
    data() {
      return {
        tempCode: '',
        formItem: {
          'control': '',
          'code': '',
          'name': '',
          'title': '',
          'author': '',
          'date': '',
          'zone': '',
          'stock': '',
          'period': '',
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
          code: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],
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
      getValue(val) {
        console.log(val);
      },
      checkCode() {
        if (this.formItem.code === '') {
          this.isDisabled = true;
        } else if (this.formItem.code !== this.tempCode) {
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
      load() {
        this.formItem = JSON.parse(JSON.stringify(this.item));
        this.tempCode = this.formItem.code;
        this.formItem.control = this.formItem.control.id;
        this.formItem.createYear = this.formItem.createYear.toString();
        if (this.formItem.currentYear !== null) {
          this.formItem.currentYear = this.formItem.currentYear.toString();
        }
        this.formItem.organizationId = this.formItem.organization.organizationId;
        this.formItem.organizationCode = this.formItem.organization.organizationId;
        this.formItem.organizationName = this.formItem.organization.organizationName;
        this.formItem.organizationOrder = this.formItem.organization.organizationOrder;
      },

      organizationOnchange(label, value, values) {
        this.formItem.organizationId = value;
        this.formItem.organizationCode = value;
        this.formItem.organizationName = label;
        this.formItem.organizationOrder = '0';
      },
      onSubmitClick(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            Promise.all([booksApi.updateBooks(this.item.id, this.formItem)])
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
