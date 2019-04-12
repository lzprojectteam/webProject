 <template>
     <el-form :model="formItem" label-width="100px" :rules="ruleValidate" ref="formValidate">
         <el-form-item    :label="$t('tobacco.tmisc.plowland.title')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.title"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmisc.plowland.serial')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.serial"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmisc.plowland.number')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.number"/>
           </el-form-item>
         <el-row>
             <el-col :span="12">
           <el-form-item    :label="$t('tobacco.tmisc.plowland.type')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.type"/>
           </el-form-item>
             </el-col>
             <el-col :span="12">
           <el-form-item    :label="$t('tobacco.tmisc.plowland.date')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.date"/>
           </el-form-item>
             </el-col>
         </el-row>
            <el-row>
             <el-col :span="12">
           <el-form-item    :label="$t('tobacco.tmisc.plowland.author')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.author"/>
           </el-form-item>
             </el-col>
             <el-col :span="12">
           <el-form-item    :label="$t('tobacco.tmisc.plowland.cooperatorId')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.cooperatorId"/>
           </el-form-item>
             </el-col>
         </el-row>
           <el-row>
             <el-col :span="12">
           <el-form-item    :label="$t('tobacco.tmisc.plowland.cooperatorCode')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.cooperatorCode"/>
           </el-form-item>
             </el-col>
             <el-col :span="12">
            <el-form-item    :label="$t('tobacco.tmisc.plowland.countryId')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.countryId"/>
           </el-form-item>
             </el-col>
         </el-row>
           <el-row>
           <el-col :span="12">
           <el-form-item    :label="$t('tobacco.tmisc.plowland.cooperatorName')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.cooperatorName"/>
           </el-form-item>
           </el-col>
           <el-col :span="12">
           <el-form-item    :label="$t('tobacco.tmisc.plowland.countryName')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.countryName"/>
           </el-form-item>
           </el-col>
           </el-row>
           <el-row>
             <el-col :span="12">
           <el-form-item    :label="$t('tobacco.tmisc.plowland.area')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.area"/>
           </el-form-item>
             </el-col>
             <el-col :span="12">
           <el-form-item    :label="$t('tobacco.tmisc.plowland.length')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.length"/>
           </el-form-item>
             </el-col>
         </el-row>
              <el-row>
             <el-col :span="12">
           <el-form-item    :label="$t('tobacco.tmisc.plowland.contact')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.contact"/>
           </el-form-item>
             </el-col>
             <el-col :span="12">
           <el-form-item    :label="$t('tobacco.tmisc.plowland.summary')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.summary"/>
           </el-form-item>
             </el-col>
         </el-row>     
           <el-row>
             <el-col :span="12">
            <el-form-item    :label="$t('tobacco.tmisc.plowland.beginAnnual')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.beginAnnual"/>
           </el-form-item>
             </el-col>
             <el-col :span="12">
           <el-form-item    :label="$t('tobacco.tmisc.plowland.endAnnual')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.endAnnual"/>
           </el-form-item>
             </el-col>
         </el-row>
           <el-row>
             <el-col :span="12">
            <el-form-item    :label="$t('tobacco.tmisc.plowland.photo')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.photo"/>
           </el-form-item>
             </el-col>
             <el-col :span="12">
           <el-form-item    :label="$t('tobacco.tmisc.plowland.pictures')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.pictures"/>
           </el-form-item>
             </el-col>
         </el-row>
               <el-row>
             <el-col :span="12">
           <el-form-item    :label="$t('tobacco.tmisc.plowland.control')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.control"/>
           </el-form-item>
             </el-col>
             <el-col :span="12">
           <el-form-item    :label="$t('tobacco.tmisc.plowland.desc')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.desc"/>
           </el-form-item>
             </el-col>
         </el-row>  
           <el-form-item>
               <el-button  v-show='isEdit' type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }} </el-button>
           </el-form-item>
     </el-form>
</template>
<script>
    import plowlandApi from '../../api/tmisc/api_plowland';
    export default {
      props: ['item', 'isEdit', 'visible'],
      data () {
        return {
          formItem: {
            'serial': '',
            'number': '',
            'type': '',
            'title': '',
            'author': '',
            'date': '',
            'cooperatorId': '',
            'cooperatorCode': '',
            'cooperatorName': '',
            'countryId': '',
            'countryName': '',
            'area': 0,
            'length': 0,
            'contact': '',
            'summary': '',
            'beginAnnual': 0,
            'endAnnual': 0,
            'photo': '',
            'pictures': '',
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
              Promise.all([plowlandApi.updatePlowland(this.item.id, this.formItem)])
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
