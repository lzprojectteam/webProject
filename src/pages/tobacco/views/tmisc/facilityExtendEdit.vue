 <template>
     <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
           <el-form-item    :label="$t('tobacco.tmisc.facilityExtend.facilityId')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.facilityId"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmisc.facilityExtend.typeId')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.typeId"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmisc.facilityExtend.attrId')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.attrId"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmisc.facilityExtend.display')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.display"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmisc.facilityExtend.valueBoolean')">
               <el-checkbox v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.valueBoolean"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmisc.facilityExtend.valueEnum')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.valueEnum"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmisc.facilityExtend.valueLong')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.valueLong"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmisc.facilityExtend.valueDouble')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.valueDouble"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmisc.facilityExtend.valueDate')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.valueDate"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmisc.facilityExtend.valueText')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.valueText"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmisc.facilityExtend.desc')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.desc"/>
           </el-form-item>
           <el-form-item>
               <el-button  v-show='isEdit' type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }} </el-button>
           </el-form-item>
     </el-form>
</template>
<script>
    import facilityExtendApi from '../../api/tmisc/api_facilityExtend';
    export default {
      props: ['item', 'isEdit', 'visible'],
      data () {
        return {
          formItem: {
            'facilityId': '',
            'typeId': '',
            'attrId': 0,
            'display': '',
            'valueBoolean': true,
            'valueEnum': 0,
            'valueLong': 0,
            'valueDouble': 0,
            'valueDate': '',
            'valueText': '',
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
              Promise.all([facilityExtendApi.updateFacilityExtend(this.item.id, this.formItem)])
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
