<template>
  <el-form
    :model="formItem"
    label-width="80px"
    :rules="ruleValidate"
    ref="formValidate"
  >
    <el-row>

      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructure.number')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.number"
            style="50%"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructure.type')">
          <el-select
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.type"
            style="width:100%"
          >
            <el-option
              v-for="item in types"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructure.title')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.title"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructure.author')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.author"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructure.date')">
          <el-date-picker
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.date"
            format="yyyy-MM-dd"
            style="width:100%"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructure.support')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.support"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructure.own')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.own"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructure.ownerId')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.ownerId"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructure.ownerNumber')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.ownerNumber"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructure.ownerName')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.ownerName"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructure.contact')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.contact"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructure.end')">
          <el-date-picker
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.end"
            format="yyyy-MM-dd"
            style="width:100%"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructure.begin')">
          <el-date-picker
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.begin"
            format="yyyy-MM-dd"
            style="width:100%"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructure.summary')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.summary"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructure.photo')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.photo"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructure.cooperatorId')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.cooperatorId"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructure.cooperatorName')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.cooperatorName"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructure.pictures')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.pictures"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructure.control')">
          <el-select
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.control"
            style="width:100%"
          >
            <el-option
              v-for="item in controls"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item :label="$t('tobacco.tmisc.infrastructure.desc')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.desc"
        type="textarea"
        rows="4"
      />
    </el-form-item>

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
import infrastructureApi from '../../api/tmisc/api_infrastructure';
export default {
  data() {
    return {
      types: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '',
          label: '全部'
        }
      ],
      controls: [
        {
          value: '1',
          label: '新建'
        },
        {
          value: '3',
          label: '删除'
        },
        {
          value: '',
          label: '全部'
        }
      ],
      formItem: {
        serial: '',
        number: '',
        type: '',
        title: '',
        author: '',
        date: '',
        countryId: '',
        countryName: '',
        support: 0,
        own: '',
        ownerId: '',
        ownerNumber: '',
        ownerName: '',
        contact: '',
        summary: '',
        begin: 0,
        end: 0,
        photo: '',
        cooperatorId: '',
        cooperatorName: '',
        pictures: '',
        control: '',
        desc: '',
        orgnization: ''
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
          Promise.all([infrastructureApi.saveInfrastructure(this.formItem)])
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
