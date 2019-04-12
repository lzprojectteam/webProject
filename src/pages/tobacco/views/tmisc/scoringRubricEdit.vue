 <template>
     <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
           <el-form-item    :label="$t('tobacco.tmisc.scoringRubric.lead')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.lead"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmisc.scoringRubric.leaf')">
               <el-checkbox v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.leaf"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmisc.scoringRubric.code')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.code"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmisc.scoringRubric.name')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.name"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmisc.scoringRubric.score')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.score"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmisc.scoringRubric.weight')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.weight"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmisc.scoringRubric.visible')">
               <el-checkbox v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.visible"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmisc.scoringRubric.position')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.position"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmisc.scoringRubric.desc')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.desc"/>
           </el-form-item>
           <el-form-item>
               <el-button  v-show='isEdit' type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }} </el-button>
           </el-form-item>
     </el-form>
</template>
<script>
    import scoringRubricApi from '../../api/tmisc/api_scoringRubric';
    export default {
      props: ['item', 'isEdit', 'visible'],
      data () {
        return {
          formItem: {
            'lead': '',
            'leaf': true,
            'code': '',
            'name': '',
            'score': 0,
            'weight': 0,
            'visible': true,
            'position': 0,
            'desc': '',
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
              Promise.all([scoringRubricApi.updateScoringRubric(this.item.id, this.formItem)])
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
