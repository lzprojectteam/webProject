<template>
  <el-form :model="formItem" label-width="100px" :rules="ruleValidate" ref="formValidate">
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.billItem.billId')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.number" disabled/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.stack.stackId')" prop="stack">
          <el-select v-model="formItem.stack" style="width: 100%;" disabled>
            <el-option v-for="item in formData.stackList"
                       :value="item.id"
                       :label="item.name"
                       :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.billIn.annual')">
          <el-date-picker
            disabled
            value-format="yyyy"
            v-model="formItem.year"
            type="year"
            :placeholder="$t('base.pleaseSelect')">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.invoice.statusName')">
          <status-select :label.sync="formItem.statusName" :value.sync="formItem.statusId" :key.sync="formItem.statusId" :cantEdit="true"
                         style="width:100%;"/>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item :label="$t('tobacco.tsell.invoice.typeName')">
          <type-variety-grade-select :allData.sync="allData"
                                     :cantEdit="true"
                                     :varietyName.sync="formItem.varietyName" :varietyId.sync="formItem.varietyId"
                                     :typeId.sync="formItem.typeId" :typeName.sync="formItem.typeName"
                                     :gradeId.sync="formItem.gradeId" :gradeName.sync="formItem.gradeName"
                                     :gradeCode.sync="formItem.gradeCode" style="width:100%;"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.invoice.rankName')">
          <rank-select :label.sync="formItem.rankName"
                       :cantEdit="true"
                       :value.sync="formItem.rankId" :key.sync="formItem.rankId"
                       style="width:100%;"/>
        </el-form-item>
      </el-col>
      <el-col :span="12" style="height: 47px">
        <el-form-item :label="$t('tobacco.tstorage.billItem.standard')">
          <el-switch v-model="formItem.standard" disabled></el-switch>
        </el-form-item>
      </el-col>
      <el-col :span="12" style="height: 47px">
        <el-form-item :label="$t('tobacco.tstorage.billItem.amount')" prop="amount">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.amount"
                           style="width: 100%;" :min="1" disabled/>
        </el-form-item>
      </el-col>
      <el-col :span="12" style="height: 47px">
        <el-form-item :label="$t('tobacco.tstorage.billItem.weight')" prop="weight">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.weight"
                           style="width: 100%;" :min="formItem.standard?0:0.00001" disabled/>
        </el-form-item>
      </el-col>
      <el-col :span="12" style="height: 47px">
        <el-form-item :label="$t('tobacco.tstorage.billItem.transfer')">
          <el-select v-model="formItem.transfer" style="width: 100%" disabled>
            <el-option :value="1" label="是" key="0"></el-option>
            <el-option :value="0" label="否" key="1"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.billItem.forkliftName')" prop="forkliftName">
          <!-- <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.forkliftName"/>-->
          <el-select v-model="formItem.forkliftId" style="width: 100%;" @change="forkliftChange">
            <el-option v-for="item in formData.forkliftList"
                       :key="item.id"
                       :label="item.title"
                       :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item :label="$t('tobacco.tstorage.billItem.desc')">
          <el-input type="textarea" v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{
        $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  const statusSelect = () => import('../components/statusSelect');
  const rankSelect = () => import('../components/rankSelect');
  const typeVarietyGradeSelect = () => import('@/components/Tobacco/typeVarietyGradeSelect');

  import billItemApi from '../../api/tstorage/api_billItem';
  import stackApi from '../../api/tstorage/api_stack';
  import forkliftApi from '../../api/tstorage/api_forklift';

  export default {
    props: ['item', 'isEdit', 'visible', 'selectRow', 'special'],
    data() {
      return {
        weightDisable: true, //重量能否编辑
        amountDisable: false, //数量能否编辑
        allData: {},
        formItem: {
          'number': '',
          'billId': '',
          'itemId': 0,
          'countryId': '',
          'countryName': '',
          'year': '',
          'typeId': '',
          'typeName': '',
          'statusId': '',
          'statusName': '',
          'varietyId': '',
          'varietyName': '',
          'gradeId': '',
          'gradeCode': '',
          'gradeName': '',
          'rankId': '',
          'rankName': '',
          'standard': true,
          'amount': 0,
          'weight': 0,
          'transfer': 0,
          'forkliftId': '',
          'forkliftName': '',
          'desc': '',
        },
        formData: {
          stackList: [],
          forkliftList: [],
        },
        ruleValidate: {
          code: [
            {required: true, message: '编码不能为空', trigger: 'blur'}
          ],
          stack: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
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
      forkliftChange() {
        this.formItem.forkliftName = this.formData.forkliftList.find((item) => {
          return item.id === this.formItem.forkliftId;
        }).title;
      },
      getForklift() {
        Promise.all([forkliftApi.getAll({
          size: 500,
          sort: 'number,ASC',
          search: 'organization.organizationId:rlike:{orgid};'.format({
            orgid: this.formItem.organizationId,
          })
        })])
          .then(([response]) => {
            this.formData.forkliftList = response.content;
            if (this.formData.forkliftList.length > 0) {
              this.formItem.forkliftId = this.formData.forkliftList[0].id;
              this.formItem.forkliftName = this.formData.forkliftList[0].title;
            }
          })
          .catch(error => {
          });
      },

      getStack() {
        Promise.all([stackApi.getAll({
          sort: 'name',
          size: 500,
          search: 'region.id:EQ:{region};'.format({
            region: this.formItem.region,
          })
        })])
          .then(([response]) => {
            this.formData.stackList = response.content;
          })
          .catch(error => {
          });
      },
      load() {
        this.formItem = JSON.parse(JSON.stringify(this.item));
        //先重置对象,不然组件watch不生效
        this.allData = {};
        //初始化烟叶类型等数据，用于回显
        this.allData['typeId'] = this.formItem.typeId;
        this.allData['gradeId'] = this.formItem.gradeId;
        this.allData['varietyId'] = this.formItem.varietyId;
        if (this.selectRow) {
          this.formItem.number = JSON.parse(JSON.stringify(this.selectRow)).number;
        }
        if (this.formItem.year) {
          this.formItem.year = this.formItem.year.toString();
        }
        //获取垛位下拉数据
        this.getStack();
        //获取叉车数据
        this.getForklift();

      },
      onSubmitClick(name) {
        this.$refs[name].validate((valid) => {//进行前端检验
          if (valid) {
            Promise.all([billItemApi.updateBillItem(this.item.id, this.formItem)])
              .then(([response]) => {
                this.formReset(name);
                this.$message({
                  message: this.$t('message.editAndExid'),
                  type: 'success',
                });
                this.$emit('update:visible', false);
                this.$emit('refresh2');
              })
              .catch(error => {

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
        this.formItem = JSON.parse(JSON.stringify(curVal));
        this.load();
      },
    },
  };
</script>
