<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
      <organization-form :root="userOrgId" @onchange="organizationOnchange" style="width:100%"/>
    </el-form-item>
    <el-row>
      <!--<el-form-item :label="$t('tobacco.tstorage.warehouse.serialno')" prop="number">
        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.number" @blur="checkSerialno"/>
      </el-form-item>-->
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.warehouse.name')" prop="name">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.name"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.warehouse.sname')" prop="sname">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.sname"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.warehouse.year')" prop="year">
          <el-date-picker
            value-format="yyyy"
            v-model="formItem.year"
            type="year"
            :placeholder="$t('base.pleaseSelect')" style="width: 100%">
            style="width: 100%"
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.warehouse.month')" prop="month">
          <el-select v-model="formItem.month" style="width: 100%">
            <el-option
              v-for="item in 12"
              :key="item"
              :label="item + '月'"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.warehouse.date')" prop="date">
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
                          v-model="formItem.date"
                          type="date"
                          :placeholder="$t('base.pleaseSelect')" style="width: 100%">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.warehouse.type')" prop="type">
          <el-select v-model="formItem.type" style="width: 100%">
            <el-option v-for="item in formData.warehouseList"
                       :label="item.name"
                       :value="item.id"
                       :key="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.warehouse.length')" prop="length">
          <el-input-number v-model="formItem.length" style="width: 100%"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.warehouse.width')" prop="width">
          <el-input-number v-model="formItem.width" style="width: 100%"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.warehouse.height')" prop="height">
          <el-input-number v-model="formItem.height" style="width: 100%"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.warehouse.area')" prop="area">
          <el-input-number v-model="formItem.area" style="width: 100%"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.warehouse.capacityWeight')" prop="capacityWeight">
          <el-input-number v-model="formItem.capacityWeight" style="width: 100%"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.warehouse.capacityPack')" prop="capacityPack">
          <el-input-number v-model="formItem.capacityPack" style="width: 100%"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.warehouse.currentWeight')" prop="currentWeight">
          <el-input-number v-model="formItem.currentWeight" style="width: 100%"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.warehouse.currentPack')" prop="currentPack">
          <el-input-number v-model="formItem.currentPack" style="width: 100%"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.warehouse.active')" prop="active">
          <el-switch
            v-model="formItem.active">
          </el-switch>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.warehouse.initialized')" prop="initialized">
          <el-switch
            v-model="formItem.initialized">
          </el-switch>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item :label="$t('tobacco.tstorage.warehouse.desc')" prop="desc">
      <el-input type="textarea" v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :disabled="isDisabled" style="float: right"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  const OrganizationForm = () => import('@/components/Organization');

  import warehouseApi from '../../api/tstorage/api_warehouse';
  import categoryApi from '../../api/basic/api_category';

  export default {
    data() {
      return {
        isDisabled: false,
        formItem: {
          'number': '',
          'name': '',
          'sname': '',
          'year': '',
          'month': '',
          'date': '',
          'type': '',
          'length': '',
          'width': '',
          'height': '',
          'area': '',
          'capacityWeight': '',
          'capacityPack': '',
          'currentWeight': '',
          'currentPack': '',
          'active': true,
          'initialized': true,
          'desc': '',
          'organizationId': this.$store.state.user.organization.organizationId,
          'organizationName': this.$store.state.user.organization.organizationName,
          'organizationOrder': '',
          'organizationCode': this.$store.state.user.organization.organizationId,
        },
        formData: {
          warehouseList: [],
        },
        ruleValidate: {
          name: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],
          sname: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],
          type: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],
        }
      };
    },
    created() {
      Promise.all([
        categoryApi.getAll({sort: 'id', search: 'lead:EQ:ST_WH'})])
        .then(([response]) => {
          this.formData.warehouseList = response.content;
        })
        .catch(error => {
        });
      this.formItem.date = new Date();
      this.formItem.year = new Date().getFullYear().toString();
      this.formItem.month = new Date().getMonth() + 1;

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
    components: {
      OrganizationForm
    },
    methods: {
      /*checkSerialno() {
        if (this.formItem.serialno === '') {
          this.isDisabled = false;
        } else {
          Promise.all([warehouseApi.checkSerialno(this.formItem.serialno)])
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
      },*/
      organizationOnchange(label, value, values) {
        this.formItem.organizationId = value;
        this.formItem.organizationCode = value;
        this.formItem.organizationName = label;
        this.formItem.organizationOrder = '0';
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
            Promise.all([warehouseApi.saveWarehouse(this.formItem)])
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
