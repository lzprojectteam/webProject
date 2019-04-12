<template>
  <el-form
    :model="formItem"
    label-width="80px"
    :rules="ruleValidate"
    ref="formValidate"
  >
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.damage.annual')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.annual"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.damage.serial')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.serial"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.damage.disasterDegree')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.disasterDegree"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.damage.title')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.title"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.damage.author')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.author"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.damage.date')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.date"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.damage.countryId')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.countryId"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.damage.countryName')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.countryName"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.damage.farmerId')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.farmerId"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.damage.farmerNumber')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.farmerNumber"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.damage.farmerName')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.farmerName"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.damage.typeId')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.typeId"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.damage.typeName')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.typeName"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.damage.varietyId')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.varietyId"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.damage.varietyName')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.varietyName"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.damage.plantArea')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.plantArea"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.damage.plantNumber')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.plantNumber"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.damage.lostArea')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.lostArea"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.damage.lostNumber')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.lostNumber"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.damage.repairArea')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.repairArea"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.damage.repairNumber')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.repairNumber"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.damage.content')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.content"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.damage.affirm')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.affirm"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.damage.paid')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.paid"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.damage.photo')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.photo"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.damage.pictures')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.pictures"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.damage.control')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.control"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.damage.desc')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.desc"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button
        type="primary"
        style="float: right"
        @click="onSubmitClick('formValidate')"
      >{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import damageApi from '../../api/tmisc/api_damage';
export default {
  data() {
    return {
      formItem: {
        annual: 0,
        serial: '',
        disasterDegree: 0,
        title: '',
        author: '',
        date: '',
        countryId: '',
        countryName: '',
        farmerId: '',
        farmerNumber: '',
        farmerName: '',
        typeId: '',
        typeName: '',
        varietyId: '',
        varietyName: '',
        plantArea: 0,
        plantNumber: 0,
        lostArea: 0,
        lostNumber: 0,
        repairArea: 0,
        repairNumber: 0,
        content: '',
        affirm: 0,
        paid: 0,
        photo: '',
        pictures: '',
        control: 0,
        desc: ''
      },
      ruleValidate: {
        code: [{ required: true, message: '编码不能为空', trigger: 'blur' }]
      }
    };
  },
  created() {},
  methods: {
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          Promise.all([damageApi.saveDamage(this.formItem)])
            .then(([response]) => {
              this.formReset(name);
              //重置表单，允许多次操作
              this.$message({
                message: this.$t('message.saveAndContinue'),
                type: 'info'
              });
            })
            .catch(error => {
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
