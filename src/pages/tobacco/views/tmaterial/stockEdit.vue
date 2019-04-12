 <template>
     <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
           <el-form-item    :label="$t('material.tmaterial.stock.yearMonth')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.yearMonth"/>
           </el-form-item>
           <el-form-item    :label="$t('material.tmaterial.stock.initialAmount')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.initialAmount"/>
           </el-form-item>
           <el-form-item    :label="$t('material.tmaterial.stock.initialAmountUnit')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.initialAmountUnit"/>
           </el-form-item>
           <el-form-item    :label="$t('material.tmaterial.stock.currentAmount')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.currentAmount"/>
           </el-form-item>
           <el-form-item    :label="$t('material.tmaterial.stock.currentAmountUnit')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.currentAmountUnit"/>
           </el-form-item>
           <el-form-item    :label="$t('material.tmaterial.stock.control')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.control"/>
           </el-form-item>
           <el-form-item    :label="$t('material.tmaterial.stock.desc')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.desc"/>
           </el-form-item>
           <el-form-item>
               <el-button  v-show='isEdit' type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }} </el-button>
           </el-form-item>
     </el-form>
</template>
<script>
    import stockApi from '../../api/tmaterial/apiStock';
    export default {
        props: ['item', 'isEdit','visible'],
        data () {
            return {
                formItem: {
                    'yearMonth':'',
                'initialAmount':0,
                'initialAmountUnit':0,
                'currentAmount':0,
                'currentAmountUnit':0,
                'control':0,
                    'desc':'',
                },
                ruleValidate: {
                    code: [
                        { required: true, message: '编码不能为空', trigger: 'blur' }
                    ],
                }
            };
        },
        created(){
            this.load();
        },
        methods:{
            load(){
                this.formItem = JSON.parse(JSON.stringify(this.item));
            },
            onSubmitClick(name) {
                this.$refs[name].validate((valid) => {//进行前端检验
                    if (valid) {
                        Promise.all([ stockApi.update(this.item.id,this.formItem)])
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
