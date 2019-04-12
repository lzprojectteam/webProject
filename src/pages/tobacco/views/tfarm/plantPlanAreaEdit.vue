 <template>
     <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
           <el-form-item    :label="$t('tobacco.tfarm.plantPlanArea.areaId')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.areaId"/>
           </el-form-item>
           <el-form-item   :label="$t('tobacco.tfarm.plantPlanArea.start')">
               <el-date-picker
                   v-model="formItem.start"
                   type="date"
                   style="width:100%;"
                   :placeholder="$t('base.pleaseSelect')">
               </el-date-picker>
            </el-form-item>
           <el-form-item   :label="$t('tobacco.tfarm.plantPlanArea.finish')">
               <el-date-picker
                   v-model="formItem.finish"
                   type="date"
                   style="width:100%;"
                   :placeholder="$t('base.pleaseSelect')">
               </el-date-picker>
            </el-form-item>
           <el-form-item    :label="$t('tobacco.tfarm.plantPlanArea.area')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.area"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tfarm.plantPlanArea.number')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.number"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tfarm.plantPlanArea.yield')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.yield"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tfarm.plantPlanArea.money')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.money"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tfarm.plantPlanArea.pictures')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.pictures"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tfarm.plantPlanArea.path')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.path"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tfarm.plantPlanArea.desc')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.desc"/>
           </el-form-item>
           <el-form-item>
               <el-button  v-show='isEdit' type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }} </el-button>
           </el-form-item>
     </el-form>
</template>
<script>
    import plantPlanAreaApi from '../../api/tfarm/api_plantPlanArea';
    export default {
      props: ['item', 'isEdit', 'visible'],
      data () {
        return {
          formItem: {
            'plantPlanId': '',
            'areaId': 0,
            'start': '',
            'finish': '',
            'typeName': '',
            'varietyName': '',
            'area': 0,
            'number': 0,
            'yield': 0,
            'money': 0,
            'pictures': '',
            'path': '',
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
              Promise.all([plantPlanAreaApi.updatePlantPlanArea(this.item.id, this.formItem)])
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
