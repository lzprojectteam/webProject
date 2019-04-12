<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='manPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form  inline>
          <el-form-item    :label="$t('material.tmaterial.purchase.serial')" >
			<el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.serial"
                                                  @keyup.enter.native="onSearchButtonClick"/>
		  </el-form-item >
          <el-form-item    :label="$t('material.tmaterial.purchase.barcode')" >
			<el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.barcode"
                                                  @keyup.enter.native="onSearchButtonClick"/>
		  </el-form-item >
          <el-form-item    :label="$t('material.tmaterial.purchase.yearMOnth')" >
			<el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.yearMOnth"
                                                  @keyup.enter.native="onSearchButtonClick"/>
		  </el-form-item >
          <el-form-item    :label="$t('material.tmaterial.purchase.title')" >
			<el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.title"
                                                  @keyup.enter.native="onSearchButtonClick"/>
		  </el-form-item >
          <el-form-item    :label="$t('material.tmaterial.purchase.author')" >
			<el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.author"
                                                  @keyup.enter.native="onSearchButtonClick"/>
		  </el-form-item >
          <el-form-item    :label="$t('material.tmaterial.purchase.date')" >
			<el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.date"
                                                  @keyup.enter.native="onSearchButtonClick"/>
		  </el-form-item >
          <el-form-item    :label="$t('material.tmaterial.purchase.supplierId')" >
			<el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.supplierId"
                                                  @keyup.enter.native="onSearchButtonClick"/>
		  </el-form-item >
          <el-form-item    :label="$t('material.tmaterial.purchase.supplierName')" >
			<el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.supplierName"
                                                  @keyup.enter.native="onSearchButtonClick"/>
		  </el-form-item >
          <el-form-item    :label="$t('material.tmaterial.purchase.receiverId')" >
			<el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.receiverId"
                                                  @keyup.enter.native="onSearchButtonClick"/>
		  </el-form-item >
          <el-form-item    :label="$t('material.tmaterial.purchase.receiverName')" >
			<el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.receiverName"
                                                  @keyup.enter.native="onSearchButtonClick"/>
		  </el-form-item >
          <el-form-item    :label="$t('material.tmaterial.purchase.price')" >
			<el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.price"
                                                  @keyup.enter.native="onSearchButtonClick"/>
		  </el-form-item >
          <el-form-item    :label="$t('material.tmaterial.purchase.priceUnit')" >
			<el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.priceUnit"
                                                  @keyup.enter.native="onSearchButtonClick"/>
		  </el-form-item >
          <el-form-item    :label="$t('material.tmaterial.purchase.amount')" >
			<el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.amount"
                                                  @keyup.enter.native="onSearchButtonClick"/>
		  </el-form-item >
          <el-form-item    :label="$t('material.tmaterial.purchase.amountUnit')" >
			<el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.amountUnit"
                                                  @keyup.enter.native="onSearchButtonClick"/>
		  </el-form-item >
          <el-form-item    :label="$t('material.tmaterial.purchase.money')" >
			<el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.money"
                                                  @keyup.enter.native="onSearchButtonClick"/>
		  </el-form-item >
          <el-form-item    :label="$t('material.tmaterial.purchase.tax')" >
			<el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.tax"
                                                  @keyup.enter.native="onSearchButtonClick"/>
		  </el-form-item >
          <el-form-item    :label="$t('material.tmaterial.purchase.freight')" >
			<el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.freight"
                                                  @keyup.enter.native="onSearchButtonClick"/>
		  </el-form-item >
          <el-form-item    :label="$t('material.tmaterial.purchase.total')" >
			<el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.total"
                                                  @keyup.enter.native="onSearchButtonClick"/>
		  </el-form-item >
          <el-form-item    :label="$t('material.tmaterial.purchase.control')" >
			<el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.control"
                                                  @keyup.enter.native="onSearchButtonClick"/>
		  </el-form-item >
          <el-form-item    :label="$t('material.tmaterial.purchase.begin')" >
			<el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.begin"
                                                  @keyup.enter.native="onSearchButtonClick"/>
		  </el-form-item >
          <el-form-item    :label="$t('material.tmaterial.purchase.end')" >
			<el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.end"
                                                  @keyup.enter.native="onSearchButtonClick"/>
		  </el-form-item >
          <el-form-item    :label="$t('material.tmaterial.purchase.desc')" >
			<el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.desc"
                                                  @keyup.enter.native="onSearchButtonClick"/>
		  </el-form-item >
			  <el-form-item :label="$t('base.keywords')">
				<el-input v-bind:placeholder="$t('base.ipKeywords')"
					v-model="formData.pagination.keyword" @keyup.enter.native="onSearchButtonClick"/>
			  </el-form-item>                   
		  </el-form>
      </div>
		<div class='toolButton' style="min-width: 210px">
			<el-button-group>
				<el-button type='primary' @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }} </el-button>
				<el-button type='primary' @click='childForm.addForm=true'>{{ $t('base.buttonAdd') }} </el-button>
				<el-button type='primary' @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }} </el-button>                
			</el-button-group>
        </div>
      </div>
	  <main class='contentPanel'>
		<el-table
			highlight-current-row
			border
			@current-change="handleCurrentChange"
			:data="formData.purchaseList"
			style="width: 100%"
			:row-class-name="tableRowClassName">
		  <el-table-column type="index">
			</el-table-column>
			    <el-table-column prop="serial" :label="this.$t('material.tmaterial.purchase.serial')" />
			    <el-table-column prop="barcode" :label="this.$t('material.tmaterial.purchase.barcode')" />
			    <el-table-column prop="yearMOnth" :label="this.$t('material.tmaterial.purchase.yearMOnth')" />
			    <el-table-column prop="title" :label="this.$t('material.tmaterial.purchase.title')" />
			    <el-table-column prop="author" :label="this.$t('material.tmaterial.purchase.author')" />
			    <el-table-column prop="date" :label="this.$t('material.tmaterial.purchase.date')" />
			    <el-table-column prop="supplierId" :label="this.$t('material.tmaterial.purchase.supplierId')" />
			    <el-table-column prop="supplierName" :label="this.$t('material.tmaterial.purchase.supplierName')" />
			    <el-table-column prop="receiverId" :label="this.$t('material.tmaterial.purchase.receiverId')" />
			    <el-table-column prop="receiverName" :label="this.$t('material.tmaterial.purchase.receiverName')" />
			    <el-table-column prop="price" :label="this.$t('material.tmaterial.purchase.price')" />
			    <el-table-column prop="priceUnit" :label="this.$t('material.tmaterial.purchase.priceUnit')" />
			    <el-table-column prop="amount" :label="this.$t('material.tmaterial.purchase.amount')" />
			    <el-table-column prop="amountUnit" :label="this.$t('material.tmaterial.purchase.amountUnit')" />
			    <el-table-column prop="money" :label="this.$t('material.tmaterial.purchase.money')" />
			    <el-table-column prop="tax" :label="this.$t('material.tmaterial.purchase.tax')" />
			    <el-table-column prop="freight" :label="this.$t('material.tmaterial.purchase.freight')" />
			    <el-table-column prop="total" :label="this.$t('material.tmaterial.purchase.total')" />
			    <el-table-column prop="control" :label="this.$t('material.tmaterial.purchase.control')" />
			    <el-table-column prop="begin" :label="this.$t('material.tmaterial.purchase.begin')" />
			    <el-table-column prop="end" :label="this.$t('material.tmaterial.purchase.end')" />
			    <el-table-column prop="desc" :label="this.$t('material.tmaterial.purchase.desc')" />
		<el-table-column
		fixed="right"
		:label="$t('base.titleOperation')"
		width="100">
		<template slot-scope="scope">
			<el-button @click="editButtonClick(scope.row,false)" type="text" size="small">{{$t('base.buttonView')}}</el-button>
			<el-button type="text" size="small" @click="editButtonClick(scope.row,true)">{{$t('base.buttonEdit')}}</el-button>
		</template>
		</el-table-column>
		</el-table>
        </main>
        <div class='footerPanel'>
            <el-pagination :page-size='formData.pagination.pageSize' :total='formData.pagination.total'
                           :current-page='formData.pagination.currentPage' @current-change='onPageChange'
                           :page-sizes='formData.pagination.pageSizeOpts' @size-change='onPageSizeChange'
                           layout="total, sizes, prev, pager, next, jumper"
                           placement='top'></el-pagination>
        </div>
        <template>
            <el-dialog :title="$t('base.buttonAdd')" :visible.sync="childForm.addForm" top="10px"  :before-close="handleClose">
                <add-form/>
            </el-dialog>
            <el-dialog :title="$t('base.buttonEdit')" :visible.sync="childForm.editForm"  top="10px"  :before-close="handleClose">
                <edit-form :item.sync=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.editForm" />
            </el-dialog>
            <el-dialog :title="$t('base.buttonView')" :visible.sync="childForm.viewForm"  top="10px"  :before-close="handleClose">
                <edit-form :item=formData.viewSelect :isEdit =childForm.isEdit :visible.sync="childForm.viewForm" />
            </el-dialog>
        </template>
    </div>
</template>
<script>
    const AddForm =()=> import('./purchaseAdd.vue');
    const EditForm =()=> import('./purchaseEdit.vue');
    import purchaseApi from '../../api/tmaterial/apiPurchase';
    export default {
        data () {
            return {
                childForm: {
                    addForm: false,
                    editForm: false,
                    viewForm:false,
                    isEdit:false
                },
                dateoptions: {
                    shortcuts: [
                        {
                            text: this.$t('base.today') ,

                            onClick: (picker) => {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 );
                                picker.$emit('pick', [start, end]);
                            }
                        },
                        {
                            text:this.$t('base.yesterday')  ,

                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
                                picker.$emit('pick', [start, end]);
                            }
                        },
                        {
                            text:this.$t('base.threeMonth')  ,
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                picker.$emit('pick', [start, end]);
                            }
                        }
                    ]
                },
                searchData:{
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
                formData:{
                    purchaseList:[],
                    pagination:{//用于分页的变量
                        currentPage:1,
                        pageSize:10,
                        total:0,
                        keyword:'',
                        pageSizeOpts:[10,15,20,25,30]
                    },
                    rowSelection:[]
                },
            };
        },
        created(){

        },
        components: {
            'add-form': AddForm,
            'edit-form':EditForm
        },
        methods: {
            editButtonClick(selectRow,isEdit) {
                this.formData.viewSelect = selectRow;
                if(isEdit){
                    this.childForm.editForm=true;
                } else {
                    this.childForm.viewForm=true;
                }
                this.childForm.isEdit=isEdit;
            },
            deleteButtonClick() {
                if (this.formData.selectRow === null || this.formData.selectRow === undefined) {
                    this.$message({
                        message: this.$t('message.unSelectAny'),
                        type: 'info',
                    });
                    return;
                }

                Promise.all([purchaseApi.softDelete(this.formData.selectRow.id)])
                    .then(([response]) => {
                        this.$message({
                            type: 'info',
                            message: this.$t('message.deleteOk')
                        });
                        this.formData.selectRow=null;
                        this.onSearchButtonClick();

                    })
                    .catch(error => {

                    });
            },
            deleteButtonConfirm() {
                this.$confirm( this.$t('message.deleteConfirm'),  this.$t('base.titleTip'), {
                    confirmButtonText: this.$t('base.buttonOk'),
                    cancelButtonText: this.$t('base.buttonCancel'),
                    type: 'warning'
                }).then(() => {
                    this.deleteButtonClick();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message:this.$t('message.cancel')
                    });
                });

            },
            handleCurrentChange(val) {
                this.formData.selectRow = val;
            },
            onSearchButtonClick(){
                Promise.all([purchaseApi.getAll({
                    size: this.formData.pagination.pageSize,
                    page: this.formData.pagination.currentPage - 1,
                    contains:'serial,barcode,yearMOnth,title,author,date,supplierId,supplierName,receiverId,receiverName,price,priceUnit,amount,amountUnit,money,tax,freight,total,control,begin,end,desc,:{keyword}:true'.format({ keyword: this.formData.pagination.keyword }),
                    	 search:'serial:EQ:{serial};barcode:EQ:{barcode};yearMOnth:EQ:{yearMOnth};title:EQ:{title};author:EQ:{author};date:EQ:{date};supplierId:EQ:{supplierId};supplierName:EQ:{supplierName};receiverId:EQ:{receiverId};receiverName:EQ:{receiverName};price:EQ:{price};priceUnit:EQ:{priceUnit};amount:EQ:{amount};amountUnit:EQ:{amountUnit};money:EQ:{money};tax:EQ:{tax};freight:EQ:{freight};total:EQ:{total};control:EQ:{control};begin:EQ:{begin};end:EQ:{end};desc:EQ:{desc};'.format({serial:this.searchData.serial,barcode:this.searchData.barcode,yearMOnth:this.searchData.yearMOnth,title:this.searchData.title,author:this.searchData.author,date:this.searchData.date,supplierId:this.searchData.supplierId,supplierName:this.searchData.supplierName,receiverId:this.searchData.receiverId,receiverName:this.searchData.receiverName,price:this.searchData.price,priceUnit:this.searchData.priceUnit,amount:this.searchData.amount,amountUnit:this.searchData.amountUnit,money:this.searchData.money,tax:this.searchData.tax,freight:this.searchData.freight,total:this.searchData.total,control:this.searchData.control,begin:this.searchData.begin,end:this.searchData.end,desc:this.searchData.desc,})
                })])
                    .then(([response]) => {
                        this.formData.purchaseList = response.content;
                        this.formData.pagination.total = parseFloat(response.totalElements);;
                        this.$notify({
                            title: this.$t('base.hint'),
                            message: this.$t('base.loadingDone'),
                            duration: 1000,
                            position: 'bottom-right'
                            });
                    })
                    .catch(error => {
                    });

            },

          onPageChange(index) {
            if (this.formData.pagination.currentPage !== index) {
              this.formData.pagination.currentPage = index;
              this.onSearchButtonClick();
            }
          },
          onPageSizeChange(size) {
            if (this.formData.pagination.pageSize !== size) {
              this.formData.pagination.pageSize = size;
              this.onSearchButtonClick();
            }
          },
            tableRowClassName({row, rowIndex}) {
                if (rowIndex%2 === 0) {
                    return 'warning-row';
                } else {
                    return 'success-row';
                }
            },
            handleClose(done) {
                this.childForm.addForm=false;
                this.childForm.editForm=false;
                this.onSearchButtonClick();
                done();
            }
        }
    };
</script>