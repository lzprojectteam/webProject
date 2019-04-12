<template>
    <el-form :model="formItem"  label-width="80px" :rules="ruleValidate" ref="formValidate">
                    <el-form-item   :label="$t('material.tmaterial.purchase.serial')" >
                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.serial"/>
                    </el-form-item>
                    <el-form-item   :label="$t('material.tmaterial.purchase.barcode')" >
                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.barcode"/>
                    </el-form-item>
                    <el-form-item   :label="$t('material.tmaterial.purchase.yearMOnth')" >
                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.yearMOnth"/>
                    </el-form-item>
                    <el-form-item   :label="$t('material.tmaterial.purchase.title')" >
                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.title"/>
                    </el-form-item>
                    <el-form-item   :label="$t('material.tmaterial.purchase.author')" >
                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.author"/>
                    </el-form-item>
                    <el-form-item   :label="$t('material.tmaterial.purchase.date')" >
                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.date"/>
                    </el-form-item>
                    <el-form-item   :label="$t('material.tmaterial.purchase.supplierId')" >
                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.supplierId"/>
                    </el-form-item>
                    <el-form-item   :label="$t('material.tmaterial.purchase.supplierName')" >
                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.supplierName"/>
                    </el-form-item>
                    <el-form-item   :label="$t('material.tmaterial.purchase.receiverId')" >
                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.receiverId"/>
                    </el-form-item>
                    <el-form-item   :label="$t('material.tmaterial.purchase.receiverName')" >
                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.receiverName"/>
                    </el-form-item>
                    <el-form-item   :label="$t('material.tmaterial.purchase.price')" >
                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.price"/>
                    </el-form-item>
                    <el-form-item   :label="$t('material.tmaterial.purchase.priceUnit')" >
                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.priceUnit"/>
                    </el-form-item>
                    <el-form-item   :label="$t('material.tmaterial.purchase.amount')" >
                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.amount"/>
                    </el-form-item>
                    <el-form-item   :label="$t('material.tmaterial.purchase.amountUnit')" >
                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.amountUnit"/>
                    </el-form-item>
                    <el-form-item   :label="$t('material.tmaterial.purchase.money')" >
                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.money"/>
                    </el-form-item>
                    <el-form-item   :label="$t('material.tmaterial.purchase.tax')" >
                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.tax"/>
                    </el-form-item>
                    <el-form-item   :label="$t('material.tmaterial.purchase.freight')" >
                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.freight"/>
                    </el-form-item>
                    <el-form-item   :label="$t('material.tmaterial.purchase.total')" >
                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.total"/>
                    </el-form-item>
                    <el-form-item   :label="$t('material.tmaterial.purchase.control')" >
                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.control"/>
                    </el-form-item>
                    <el-form-item   :label="$t('material.tmaterial.purchase.begin')" >
                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.begin"/>
                    </el-form-item>
                    <el-form-item   :label="$t('material.tmaterial.purchase.end')" >
                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.end"/>
                    </el-form-item>
                    <el-form-item   :label="$t('material.tmaterial.purchase.desc')" >
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
    import purchaseApi from '../../api/tmaterial/apiPurchase';
    export default {
         data () {
            return {
                formItem: {
                    'serial':'',
                    'barcode':'',
                    'yearMOnth':'',
                    'title':'',
                    'author':'',
                    'date':'',
                    'supplierId':'',
                    'supplierName':'',
                    'receiverId':'',
                    'receiverName':'',
                    'price':0,
                    'priceUnit':0,
                    'amount':0,
                    'amountUnit':0,
                    'money':0,
                    'tax':0,
                    'freight':0,
                    'total':0,
                    'control':0,
                    'begin':'',
                    'end':'',
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
                        Promise.all([ purchaseApi.save(this.formItem)])
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
