<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-row>
      <el-col :span="12">
        <el-form-item :label="this.$t('tobacco.tstorage.region.whouseId')">
          <el-select v-model="formItem.warehouse" clearable @change="getRegion" style="width: 100%">
            <el-option v-for="item in formData.whouseList"
                       :value="item.id"
                       :label="item.name"
                       :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.facility.regionId')">
          <el-select v-model="formItem.region" clearable style="width: 100%">
            <el-option v-for="item in formData.regionList"
                       :value="item.id"
                       :label="item.title"
                       :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.stack.position')" prop="position">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.position"/>
        </el-form-item>
        <!-- <el-form-item :label="$t('tobacco.tstorage.stack.stackId')" prop="stackId">
           <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.stackId"/>
         </el-form-item>-->
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.stack.lead')" prop="lead">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.lead"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.stack.leaf')" prop="leaf">
          <el-switch v-model="formItem.leaf"></el-switch>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.stack.visible')" prop="visible">
          <el-switch v-model="formItem.visible"></el-switch>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.stack.name')" prop="name">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.name"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.stack.space')" prop="space">
          <el-input-number v-model="formItem.space" style="width: 100%"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.stack.capacity')" prop="capacity">
          <el-input-number v-model="formItem.capacity" style="width: 100%"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.stack.identity')" prop="identity">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.identity"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
      </el-col>
    </el-row>
    <el-form-item :label="$t('tobacco.tstorage.stack.desc')" prop="desc">
      <el-input type="textarea" v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc"/>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" style="float: right"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import stackApi from '../../api/tstorage/api_stack';
  import warehouseApi from '../../api/tstorage/api_warehouse';
  import regionApi from '../../api/tstorage/api_region';

  export default {
    data() {
      return {
        formItem: {
          'warehouse': '',
          'region': '',
          'stackId': '',
          'lead': '',
          'leaf': true,
          'number': '',
          'identity': '',
          'name': '',
          'space': '',
          'capacity': '',
          'visible': true,
          'position': '',
          'control': 'ST_SK03',
          'desc': '',
        },
        formData: {
          whouseList: [],
          regionList: [],
        },
        ruleValidate: {
          stackId: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],

        }
      };
    },
    created() {
      this.getWhouse();
    },
    methods: {
      getWhouse() {
        Promise.all([warehouseApi.getAll({
          sort: 'name',
          search: 'organization.organizationId:rlike:{orgid};'.format({
            orgid: this.$store.state.user.organization.organizationId,
          })
        })])
          .then(([response]) => {
            this.formData.whouseList = response.content;
          })
          .catch(error => {
          });
      },
      getRegion() {
        this.formItem.region = '';
        Promise.all([regionApi.getAll({
          sort: 'title',
          search: 'warehouse.id:EQ:{warehouse};'.format({
            warehouse: this.formItem.warehouse,
          })
        })])
          .then(([response]) => {
            this.formData.regionList = response.content;
          })
          .catch(error => {
          });
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
            Promise.all([stackApi.saveStack(this.formItem)])
              .then(([response]) => {
                loading.close();
                this.formReset(name);
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
