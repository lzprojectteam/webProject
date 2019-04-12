 <template>
     <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
           <el-form-item    :label="$t('tobacco.tfarm.plantPlan.annual')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.annual"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tfarm.plantPlan.serial')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.serial"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tfarm.plantPlan.title')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.title"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tfarm.plantPlan.author')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.author"/>
           </el-form-item>
           <el-form-item   :label="$t('tobacco.tfarm.plantPlan.date')">
               <el-date-picker
                   v-model="formItem.date"
                   type="date"
                   style="width:100%;"
                   :placeholder="$t('base.pleaseSelect')">
               </el-date-picker>
            </el-form-item>
           <el-form-item    :label="$t('tobacco.tfarm.plantPlan.plant')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.plant"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tfarm.plantPlan.price')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.price"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tfarm.plantPlan.area')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.area"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tfarm.plantPlan.number')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.number"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tfarm.plantPlan.yield')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.yield"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tfarm.plantPlan.money')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.money"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tfarm.plantPlan.icon')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.icon"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tfarm.plantPlan.pictures')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.pictures"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tfarm.plantPlan.score')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.score"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tfarm.plantPlan.control')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.control"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tfarm.plantPlan.desc')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.desc"/>
           </el-form-item>
           <el-form-item>
               <el-button  v-show='isEdit' type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }} </el-button>
           </el-form-item>
     </el-form>
</template>
<script>
    import plantPlanApi from '../../api/tfarm/api_plantPlan';
    export default {
      props: ['item', 'isEdit', 'visible'],
      data () {
        return {
          formItem: {
            'annual': 0,
            'serial': '',
            'title': '',
            'author': '',
            'date': '',
            'farmerName': '',
            'typeName': '',
            'varietyName': '',
            'plant': 0,
            'price': 0,
            'area': 0,
            'number': 0,
            'yield': 0,
            'money': 0,
            'icon': '',
            'pictures': '',
            'score': 0,
            'control': 0,
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
              Promise.all([plantPlanApi.updatePlantPlan(this.item.id, this.formItem)])
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
