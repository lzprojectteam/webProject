<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
      <organization-form :root="userOrgId" @onchange="organizationOnchange" style="width:100%"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.inventory.serial')" prop="barcode">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.barcode"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tsell.invoice.typeName')">
      <type-variety-grade-select :varietyName.sync="formItem.varietyName" :varietyId.sync="formItem.varietyId"
                                 :typeId.sync="formItem.typeId" :typeName.sync="formItem.typeName"
                                 :gradeId.sync="formItem.gradeId" :gradeName.sync="formItem.gradeName"
                                 :gradeCode.sync="formItem.gradeCode"
                                 @handelGradeChange="handelGradeChange"
                                 @handelVarietyChange="handelVarietyChange"
                                 @handelTypeChange="handelTypeChange"
                                 style="width:100%;"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.inventory.standard')" prop="standard">
      <el-switch v-model="formItem.standard" @change="standardChange"/>
    </el-form-item>
    <el-form-item label="件数" prop="amount">
      <el-input-number v-model="formItem.amount" style="width: 100%;" :disabled="amountDisable"
                       @change="amountChange"></el-input-number>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.inventory.weight')">
      <el-input-number v-model="formItem.weight" style="width: 100%;" :disabled="weightDisable"
                       @change="weightChange"></el-input-number>
    </el-form-item>
    <el-form-item>
      <el-row>
        <el-col :span="8"><span>可打包量:</span>
          <span>{{allPackage}}</span></el-col>
        <el-col :span="8"><span>当前打包量:</span>
          <span v-bind:class="{ overflow: isOverflow }">{{currentPackage}}</span></el-col>
        <el-col :span="8">
          <el-button type="primary" style="float: right" :disabled="cantSave"
                     @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
          </el-button>
        </el-col>
      </el-row>
    </el-form-item>
  </el-form>
</template>
<script>
  const OrganizationForm = () => import('@/components/Organization');
  const typeVarietyGradeSelect = () => import('@/components/Tobacco/typeVarietyGradeSelect');
  import inventoryApi from '../../api/tstorage/api_inventory';

  export default {
    data() {
      return {
        cantSave: true, //判断能否保存
        allPackage: 0, //可打包量
        currentPackage: 0, //当前打包量
        standWeight: 0, //标件重量
        weightDisable: true, //重量能否编辑
        amountDisable: false, //数量能否编辑
        isOverflow: false, //当前打包量是否超出可打包量
        formItem: {
          'organizationId': this.$store.state.user.organization.organizationId,
          'organizationName': this.$store.state.user.organization.organizationName,
          'barcode': '',
          'author': this.$store.state.user.userName,
          'typeId': '',
          'typeName': '',
          'gradeId': '',
          'gradeCode': '',
          'gradeName': '',
          'varietyId': '',
          'varietyName': '',
          'standard': true,
          'weight': 0,
          'amount': 0,
          'unpackWeight': 0,
        },
        ruleValidate: {
          barcode: [
            {required: true, message: '编码不能为空', trigger: 'blur'}
          ],
        }
      };
    },
    created() {
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
      OrganizationForm,
      typeVarietyGradeSelect
    },
    methods: {
      getWeightAndAmount() {
        Promise.all([inventoryApi.getStandardWeightAndUnpackWeight(this.formItem.typeId, this.formItem.varietyId, this.formItem.gradeId, this.formItem.organizationId)])
          .then(([response]) => {
            this.standWeight = response.standardWeight;
            this.allPackage = response.unpackWeight;
            if (this.allPackage === 0) {
              this.cantSave = true;
            } else {
              this.cantSave = false;
            }
            this.formItem.standard = true;
            this.weightDisable = true;
            this.amountDisable = false;
            this.formItem.amount = 0;
            this.formItem.weight = this.standWeight;
            this.currentPackage = 0;
            this.isOverflow = false;
          })
          .catch(error => {
            console.log(error);
          });
      },
      amountChange(value) {
        if (this.formItem.typeId === '' || this.formItem.varietyId === '' || this.formItem.gradeId === ''
        ) {
          this.$message({
            message: '请先正确填写烟叶类型数据',
            type: 'error',
          });
          return;
        }
        this.currentPackage = this.standWeight * parseFloat(value);
        if (this.currentPackage > this.allPackage) {
          this.isOverflow = true;
        } else {
          this.isOverflow = false;
        }
      },
      weightChange(value) {
        if (this.formItem.typeId === '' || this.formItem.varietyId === '' || this.formItem.gradeId === ''
        ) {
          this.$message({
            message: '请先正确填写烟叶类型数据',
            type: 'error',
          });
          return;
        }
        this.currentPackage = 1 * parseFloat(value);
        if (this.currentPackage > this.allPackage) {
          this.isOverflow = true;
        } else {
          this.isOverflow = false;
        }

      },
      //等级改变事件
      handelGradeChange() {
        if (this.formItem.varietyId === '') {
          this.$message({
            message: '请先选择品种',
            type: 'error',
          });
        } else {
          //获取可打包量和标件重量
          this.getWeightAndAmount();
        }
      },
      //品种改变事件
      handelVarietyChange() {
        if (this.formItem.gradeId === '') {
          return;
        } else {
          //获取可打包量和标件重量
          this.getWeightAndAmount();
        }
      },
      //类型改变事件
      handelTypeChange() {
        this.formItem.weight = 0;
        this.standWeight = 0;
        this.formItem.weight = 0;
        this.formItem.amount = 0;
        this.formItem.standard = true;
        this.currentPackage = 0;
        this.allPackage = 0;
        this.isOverflow = false;
      },
      //是否标件改变事件
      standardChange() {
        if (this.formItem.standard === true) {
          this.weightDisable = true;
          this.amountDisable = false;
          this.formItem.weight = this.standWeight;
          this.formItem.amount = 0;
        } else {
          this.weightDisable = false;
          this.amountDisable = true;
          this.formItem.weight = 0;
          this.formItem.amount = 1;
        }
        this.currentPackage = 0;
        this.isOverflow = false;
      },
      organizationOnchange(label, value, values) {
        this.formItem.organizationId = value;
        this.formItem.organizationCode = value;
        this.formItem.organizationName = label;
        this.formItem.organizationOrder = '0';
      },
      onSubmitClick(name) {
        if (this.formItem.typeId === '' || this.formItem.varietyId === '' || this.formItem.gradeId === ''
        ) {
          this.$message({
            message: '请正确填写烟叶类型数据',
            type: 'error',
          });
          return;
        } else if (this.allPackage < this.currentPackage) {
          this.$message({
            message: '当前打包量不能大于可打包量',
            type: 'error',
          });
          return;
        } else {
          this.$refs[name].validate((valid) => {
            if (valid) {
              this.formItem.unpackWeight = this.allPackage;
              const loading = this.$loading({
                lock: true,
                text: '处理中,请稍后',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
              Promise.all([inventoryApi.batchPack(this.formItem)])
                .then(([response]) => {
                  this.formReset('formValidate');
                  this.currentPackage = 0;
                  //再次获取可打包量
                  this.getWeightAndAmount();
                  //重置表单，允许多次操作
                  loading.close();
                  this.$message({
                    message: response,
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
        }
      },

      formReset(name) {
        this.$refs[name].resetFields();
      },
    }
  };
</script>
<style scoped>
  .overflow {
    color: #F56C6C !important;
  }
</style>
