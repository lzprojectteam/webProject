 <template>
     <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
           <el-form-item    :label="$t('statisticParam.statisticId')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.statisticId"/>
           </el-form-item>
           <el-form-item    :label="$t('statisticParam.pid')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.pid"/>
           </el-form-item>
           <el-form-item    :label="$t('statisticParam.name')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.name"/>
           </el-form-item>
           <el-form-item    :label="$t('statisticParam.display')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.display"/>
           </el-form-item>
           <el-form-item    :label="$t('statisticParam.type')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.type"/>
           </el-form-item>
           <el-form-item    :label="$t('statisticParam.position')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.position"/>
           </el-form-item>
           <el-form-item    :label="$t('statisticParam.value')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.value"/>
           </el-form-item>
           <el-form-item    :label="$t('statisticParam.label')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.label"/>
           </el-form-item>
           <el-form-item    :label="$t('statisticParam.replace')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.replace"/>
           </el-form-item>
           <el-form-item    :label="$t('statisticParam.pattern')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.pattern"/>
           </el-form-item>
           <el-form-item    :label="$t('statisticParam.enabled')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.enabled"/>
           </el-form-item>
           <el-form-item    :label="$t('statisticParam.desc')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.desc"/>
           </el-form-item>
           <el-form-item    :label="$t('statisticParam.source')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.source"/>
           </el-form-item>
           <el-form-item>
               <el-button plain  v-show='isEdit' type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }} </el-button>
           </el-form-item>
     </el-form>
</template>
<script>
    import statisticParamApi from '../../api/online/apiStatisticParam';
    export default {
      props: ['item', 'isEdit', 'visible'],
      data () {
        return {
          formItem: {
            'statisticId': '',
            'pid': 0,
            'name': '',
            'display': '',
            'type': '',
            'position': 0,
            'value': '',
            'label': '',
            'replace': true,
            'pattern': '',
            'enabled': true,
            'desc': '',
            'source': 0,
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
              Promise.all([statisticParamApi.updateStatisticParam(this.item.id, this.formItem)])
                .then(([response]) => {
                  this.formReset(name);
                  this.$message({
                    message: this.$t('message.saveAndContinue'),
                    type: 'info',
                  });
                  this.$emit('update:visible', false);
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
