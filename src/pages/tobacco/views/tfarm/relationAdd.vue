<template>
    <el-form :model="formItem"  label-width="80px" :rules="ruleValidate" ref="formValidate">
                    <el-form-item   :label="$t('tobacco.tfarm.relation.name')" >
                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.name"/>
                    </el-form-item>
                    <el-form-item   :label="$t('tobacco.tfarm.relation.logic')" >
                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.logic"/>
                    </el-form-item>
                    <el-form-item   :label="$t('tobacco.tfarm.relation.desc')" >
                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc"/>
                    </el-form-item>

        <el-form-item>
            <el-button type="primary" style="float: right"
                       @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
            </el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    import relationApi from '../../api/tfarm/apiRelation';
    export default {
         data () {
            return {
                formItem: {
                    'name':'',
                    'logic':'',
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

        },
        methods:{
            onSubmitClick(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        Promise.all([ relationApi.saveRelation(this.formItem)])
                            .then(([response]) => {
                                this.formReset(name);
                                //重置表单，允许多次操作
                                this.$message({
                                    message: this.$t('message.saveAndContinue'),
                                    type: 'info',
                                });

                            })
                            .catch(error => {
                                console.log(error);
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

        }
    };
</script>
