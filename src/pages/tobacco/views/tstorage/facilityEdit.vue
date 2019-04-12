<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.facility.serialno')" prop="serialno">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.serialno" disabled/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
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
          <el-select v-model="formItem.warehouse" clearable @change="getRegion(1)" style="width: 100%">
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
      <el-button v-show='isEdit' type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{
        $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import facilityApi from '../../api/tstorage/api_facility';
  import categoryApi from '../../api/basic/api_category';
  import warehouseApi from '../../api/tstorage/api_warehouse';
  import regionApi from '../../api/tstorage/api_region';

  export default {
    props: ['item', 'isEdit', 'visible'],
    data() {
      return {
        controllist: [],
        formItem: {
          'serialno': '',
          'name': '',
          'type': '',
          'warehouse': '',
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
        formData: {
          whouseList: [],
          regionList: [],
          typeList: [],
        },
        ruleValidate: {
          name: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],
        }
      };
    },
    created() {
      this.load();
      this.getWhouse();
      this.getRegion();
      Promise.all([
        categoryApi.getAll({search: 'lead:EQ:ST_FL'})])
        .then(([response]) => {
          this.controllist = response.content;
        })
        .catch(error => {
        });
      Promise.all([
        categoryApi.getAll({search: 'lead:EQ:ST_FT'})])
        .then(([response]) => {
          this.formData.typeList = response.content;
        })
        .catch(error => {
        });
    },
    methods: {
      load() {
        this.formItem = JSON.parse(JSON.stringify(this.item));
        if (this.formItem.warehouse !== '' && this.formItem.warehouse !== null) {
          this.formItem.warehouse = this.formItem.warehouse.id;
        }
        if (this.formItem.region !== '' && this.formItem.region !== null) {
          this.formItem.region = this.formItem.region.id;
          this.getRegion();//请求库区数据

        }
      },
      onSubmitClick(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            Promise.all([facilityApi.updateFacility(this.formItem.id, this.formItem)])
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
      getRegion(flag) {
        if (flag === 1) {
          this.formItem.region = '';
        }
        Promise.all([regionApi.getAll({
          sort: 'title',
          search: 'organization.organizationId:rlike:{orgid};warehouse.id:EQ:{warehouse};'.format({
            orgid: this.$store.state.user.organization.organizationId,
            warehouse: this.formItem.warehouse,
          })
        })])
          .then(([response]) => {
            this.formData.regionList = response.content;
          })
          .catch(error => {
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
