 <template>
     <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
           <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('statistic.serial')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.serial"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('statistic.name')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.name"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('statistic.code')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.code"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('statistic.title')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.title"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('statistic.author')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.author"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('statistic.date')">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="formItem.date"
            type="date"
            :placeholder="$t('base.pleaseSelect')"
            style="width: 100%"
          >
          </el-date-picker>
        </el-form-item>

      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('statistic.export')">
          <el-switch v-model="formItem.export" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item :label="$t('statistic.desc')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.desc"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <!-- <el-form-item :label="$t('statistic.usage')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.usage"
      />
    </el-form-item>
    <el-form-item :label="$t('statistic.category')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.category"
      />
    </el-form-item>
    <el-form-item :label="$t('statistic.template')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.template"
      />
    </el-form-item> 
    <el-form-item :label="$t('statistic.connection')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.connection"
      />
    </el-form-item>
    <el-form-item :label="$t('statistic.interfaceId')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.interfaceId"
      />
    </el-form-item>
    <el-form-item :label="$t('statistic.total')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.total"
      />
    </el-form-item>
  
    <el-form-item :label="$t('statistic.hot')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.hot"
      />
    </el-form-item>
    <el-form-item :label="$t('statistic.rate')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.rate"
      />
    </el-form-item>
    <el-form-item :label="$t('statistic.templatPath')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.templatPath"
      />
    </el-form-item>-->
           <el-form-item>
               <el-button plain  v-show='isEdit' type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }} </el-button>
           </el-form-item>
     </el-form>
</template>
<script>
    import statisticApi from '../../api/online/apiStatistic';
    export default {
      props: ['item', 'isEdit', 'visible'],
      data () {
        return {
          formItem: {
            'serial': '',
            'usage': '',
            'category': '',
            'template': '',
            'code': '',
            'name': '',
            'title': '',
            'author': '',
            'date': '',
            'connection': 0,
            'interfaceId': '',
            'total': true,
            'export': true,
            'hot': 0,
            'rate': 0,
            'desc': '',
            'templatPath': '',
          },
          ruleValidate: {
            code: [
              { required: true, message: '编码不能为空', trigger: 'blur' }
            ],
          }
        };
      },
      created() {
        this.load();
      },
      methods: {
        load() {
          this.formItem = JSON.parse(JSON.stringify(this.item));
        },
        onSubmitClick(name) {
          this.$refs[name].validate((valid) => {//进行前端检验
            if (valid) {
              Promise.all([statisticApi.updateStatistic(this.item.id, this.formItem)])
                .then(([response]) => {
                  this.formReset(name);
                  this.$message({
                    message: this.$t('message.saveAndContinue'),
                    type: 'info',
                  });
                  this.$emit('update:visible', false);
                  this.$emit('refresh');
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

        formReset (name) {
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
