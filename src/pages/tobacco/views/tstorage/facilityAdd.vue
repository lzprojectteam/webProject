<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-row>
      <!--<el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.facility.serialno')" prop="serialno">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.serialno" @blur="checkSerialno"/>
        </el-form-item>
      </el-col>-->
      <el-col :span="24">
        <el-form-item :label="$t('tobacco.tstorage.facility.name')" prop="name">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.name"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.facility.type')" prop="type">
          <el-select v-model="formItem.type" style="width: 100%">
            <el-option v-for="item in formData.typeList" :value="item.id" :label="item.name" :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
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
    </el-row>
    <el-row>
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
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.facility.rfid1')" prop="rfid1">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.rfid1"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.facility.rfid2')" prop="rfid2">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.rfid2"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.facility.hrfid')" prop="hrfid">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.hrfid"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.facility.num1')" prop="num1">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.num1"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.facility.num2')" prop="num2">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.num2"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.facility.tare')" prop="tare">
          <el-input-number size="small" v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.tare" style="width: 100%;"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.facility.capacityWeight')" prop="">
          <el-input-number v-model="formItem.capacityWeight" style="width: 100%"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.facility.capacityPack')" prop="capacityPack">
          <el-input-number v-model="formItem.capacityPack" style="width: 100%"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.facility.currentWeight')" prop="currentWeight">
          <el-input-number v-model="formItem.currentWeight" style="width: 100%"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.facility.currentPack')" prop="currentPack">
          <el-input-number v-model="formItem.currentPack" style="width: 100%"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.facility.valid')" prop="valid">
          <el-switch v-model="formItem.valid"></el-switch>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item :label="$t('tobacco.tstorage.facility.desc')" prop="desc">
      <el-input type='textarea' v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" style="float: right"
                 @click="onSubmitClick('formValidate')" :disabled="isDisabled">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import facilityApi from '../../api/tstorage/api_facility';
  import warehouseApi from '../../api/tstorage/api_warehouse';
  import regionApi from '../../api/tstorage/api_region';
  import categoryApi from '../../api/basic/api_category';

  export default {
    data() {
      return {
        isDisabled: false,
        formItem: {
          'serialno': '',
          'name': '',
          'type': '',
          'whouseid': '',
          'organizationId': this.$store.state.user.organization.organizationId,
          'region': '',
          'rfid1': '',
          'rfid2': '',
          'hrfid': '',
          'num1': '',
          'num2': '',
          'tare': '',
          'capacityWeight': '',
          'capacityPack': '',
          'currentWeight': '',
          'currentPack': '',
          'valid': true,
          'desc': '',
        },
        ruleValidate: {
          name: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],
        },
        formData: {
          whouseList: [],
          regionList: [],
          typeList: [],
        }
      };
    },
    created() {
      this.getWhouse();
      Promise.all([
        categoryApi.getAll({search: 'lead:EQ:ST_FT'})])
        .then(([response]) => {
          this.formData.typeList = response.content;
        })
        .catch(error => {
        });

    },
    methods: {
      getWhouse() {
        Promise.all([warehouseApi.getAll({
          sort: 'name',
          search: 'organization.organizationId:rlike:{orgid};'.format({
            orgid: this.formItem.organizationId,
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
          search: 'organization.organizationId:rlike:{orgid};warehouse.id:EQ:{warehouse};'.format({
            orgid: this.formItem.organizationId,
            warehouse: this.formItem.warehouse,
          })
        })])
          .then(([response]) => {
            this.formData.regionList = response.content;
          })
          .catch(error => {
          });
      },
      checkSerialno() {
        if (this.formItem.serialno === '') {
          this.isDisabled = false;
        } else {
          Promise.all([facilityApi.checkSerialno(this.formItem.serialno)])
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
            Promise.all([facilityApi.saveFacility(this.formItem)])
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
