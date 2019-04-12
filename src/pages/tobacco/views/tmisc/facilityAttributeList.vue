<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form  inline>
          <el-form-item    :label="$t('casit.tmisc.facilityAttribute.label')" >
			<el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.label"
                                                  @keyup.enter.native="onSearchButtonClick"/>
		  </el-form-item >
          <el-form-item    :label="$t('casit.tmisc.facilityAttribute.unit')" >
			<el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.unit"
                                                  @keyup.enter.native="onSearchButtonClick"/>
		  </el-form-item >
          <el-form-item    :label="$t('casit.tmisc.facilityAttribute.hint')" >
			<el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.hint"
                                                  @keyup.enter.native="onSearchButtonClick"/>
		  </el-form-item >
          <el-form-item    :label="$t('casit.tmisc.facilityAttribute.type')" >
			<el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.type"
                                                  @keyup.enter.native="onSearchButtonClick"/>
		  </el-form-item >
          <el-form-item    :label="$t('casit.tmisc.facilityAttribute.require')" >
			<el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.require"
                                                  @keyup.enter.native="onSearchButtonClick"/>
		  </el-form-item >
          <el-form-item    :label="$t('casit.tmisc.facilityAttribute.min')" >
			<el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.min"
                                                  @keyup.enter.native="onSearchButtonClick"/>
		  </el-form-item >
          <el-form-item    :label="$t('casit.tmisc.facilityAttribute.max')" >
			<el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.max"
                                                  @keyup.enter.native="onSearchButtonClick"/>
		  </el-form-item >
          <el-form-item    :label="$t('casit.tmisc.facilityAttribute.pattern')" >
			<el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.pattern"
                                                  @keyup.enter.native="onSearchButtonClick"/>
		  </el-form-item >
          <el-form-item    :label="$t('casit.tmisc.facilityAttribute.show')" >
			<el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.show"
                                                  @keyup.enter.native="onSearchButtonClick"/>
		  </el-form-item >
          <el-form-item    :label="$t('casit.tmisc.facilityAttribute.visible')" >
			<el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.visible"
                                                  @keyup.enter.native="onSearchButtonClick"/>
		  </el-form-item >
          <el-form-item    :label="$t('casit.tmisc.facilityAttribute.position')" >
			<el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.position"
                                                  @keyup.enter.native="onSearchButtonClick"/>
		  </el-form-item >
          <el-form-item    :label="$t('casit.tmisc.facilityAttribute.desc')" >
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
				<el-button plain type='primary' @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }} </el-button>
				<el-button plain type='primary' @click='childForm.addForm=true'>{{ $t('base.buttonAdd') }} </el-button>
				<el-button plain type='primary' @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }} </el-button>                
			</el-button-group>
        </div>
      </div>
	  <main class='contentPanel'>
		<el-table
			highlight-current-row
			border
			@current-change="handleCurrentChange"
			:data="formData.facilityAttributeList"
			style="width: 100%"
			:row-class-name="tableRowClassName">
		  <el-table-column type="index">
			</el-table-column>
			    <el-table-column prop="typeId" :label="this.$t('casit.tmisc.facilityAttribute.typeId')" />
			    <el-table-column prop="attributeId" :label="this.$t('casit.tmisc.facilityAttribute.attributeId')" />
			    <el-table-column prop="code" :label="this.$t('casit.tmisc.facilityAttribute.code')" />
			    <el-table-column prop="label" :label="this.$t('casit.tmisc.facilityAttribute.label')" />
			    <el-table-column prop="unit" :label="this.$t('casit.tmisc.facilityAttribute.unit')" />
			    <el-table-column prop="hint" :label="this.$t('casit.tmisc.facilityAttribute.hint')" />
			    <el-table-column prop="type" :label="this.$t('casit.tmisc.facilityAttribute.type')" />
			    <el-table-column prop="require" :label="this.$t('casit.tmisc.facilityAttribute.require')" />
			    <el-table-column prop="min" :label="this.$t('casit.tmisc.facilityAttribute.min')" />
			    <el-table-column prop="max" :label="this.$t('casit.tmisc.facilityAttribute.max')" />
			    <el-table-column prop="pattern" :label="this.$t('casit.tmisc.facilityAttribute.pattern')" />
			    <el-table-column prop="show" :label="this.$t('casit.tmisc.facilityAttribute.show')" />
			    <el-table-column prop="visible" :label="this.$t('casit.tmisc.facilityAttribute.visible')" />
			    <el-table-column prop="position" :label="this.$t('casit.tmisc.facilityAttribute.position')" />
			    <el-table-column prop="desc" :label="this.$t('casit.tmisc.facilityAttribute.desc')" />
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
    const AddForm = () => import('./facilityAttributeAdd.vue');
    const EditForm = () => import('./facilityAttributeEdit.vue');
    import facilityAttributeApi from '../../api/tmisc/api_facilityAttribute';
    export default {
      data () {
        return {
          childForm: {
            addForm: false,
            editForm: false,
            viewForm: false,
            isEdit: false
          },
          dateoptions: {
            shortcuts: [
              {
                text: this.$t('base.today'),

                onClick: (picker) => {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 );
                  picker.$emit('pick', [start, end]);
                }
              },
              {
                text: this.$t('base.yesterday'),

                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
                  picker.$emit('pick', [start, end]);
                }
              },
              {
                text: this.$t('base.oneWeek'),
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                  picker.$emit('pick', [start, end]);
                }
              }
            ]
          },
          searchData: {
            'typeId': '',
            'attributeId': 0,
            'code': '',
            'label': '',
            'unit': '',
            'hint': '',
            'type': 0,
            'require': true,
            'min': 0,
            'max': 0,
            'pattern': '',
            'show': true,
            'visible': 0,
            'position': 0,
            'desc': '',
          },
          formData: {
            facilityAttributeList: [],
            pagination: {//用于分页的变量
              currentPage: 1,
              pageSize: 10,
              total: 0,
              keyword: '',
              pageSizeOpts: [10, 15, 20, 25, 30]
            },
            rowSelection: []
          },
        };
      },
      created() {

      },
      components: {
        'add-form': AddForm,
        'edit-form': EditForm
      },
      methods: {
        editButtonClick(selectRow, isEdit) {
          this.formData.viewSelect = selectRow;
          if (isEdit) {
            this.childForm.editForm = true;
          } else {
            this.childForm.viewForm = true;
          }
          this.childForm.isEdit = isEdit;
        },
        deleteButtonClick() {
          if (this.formData.selectRow === null || this.formData.selectRow === undefined) {
            this.$message({
              message: this.$t('message.unSelectAny'),
              type: 'info',
            });
            return;
          }

          Promise.all([facilityAttributeApi.deleteFacilityAttribute(this.formData.selectRow.id)])
            .then(([response]) => {
              this.$message({
                type: 'info',
                message: this.$t('message.deleteOk')
              });
              this.formData.selectRow = null;
              this.onSearchButtonClick();

            })
            .catch(error => {

            });
        },
        deleteButtonConfirm() {
          this.$confirm( this.$t('message.deleteConfirm'), this.$t('base.titleTip'), {
            confirmButtonText: this.$t('base.buttonOk'),
            cancelButtonText: this.$t('base.buttonCancel'),
            type: 'warning'
          }).then(() => {
            this.deleteButtonClick();
          }).catch(() => {
            this.$message({
              type: 'info',
              message: this.$t('message.cancel')
            });
          });

        },
        handleCurrentChange(val) {
          this.formData.selectRow = val;
        },
        onSearchButtonClick() {
          Promise.all([facilityAttributeApi.getAll({
            size: this.formData.pagination.pageSize,
            page: this.formData.pagination.currentPage - 1,
            contains: 'typeId,attributeId,code,label,unit,hint,type,require,min,max,pattern,show,visible,position,desc,:{keyword}:true'.format({ keyword: this.formData.pagination.keyword }),
            search: 'typeId:EQ:{typeId};attributeId:EQ:{attributeId};code:EQ:{code};label:EQ:{label};unit:EQ:{unit};hint:EQ:{hint};type:EQ:{type};require:EQ:{require};min:EQ:{min};max:EQ:{max};pattern:EQ:{pattern};show:EQ:{show};visible:EQ:{visible};position:EQ:{position};desc:EQ:{desc};'.format({typeId: this.searchData.typeId, attributeId: this.searchData.attributeId, code: this.searchData.code, label: this.searchData.label, unit: this.searchData.unit, hint: this.searchData.hint, type: this.searchData.type, require: this.searchData.require, min: this.searchData.min, max: this.searchData.max, pattern: this.searchData.pattern, show: this.searchData.show, visible: this.searchData.visible, position: this.searchData.position, desc: this.searchData.desc, })
          })])
            .then(([response]) => {
              this.formData.facilityAttributeList = response.content;
              this.formData.pagination.total = parseFloat(response.totalElements);
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
          if (rowIndex % 2 === 0) {
            return 'warning-row';
          } else {
            return 'success-row';
          }
        },
        handleClose(done) {
          this.childForm.addForm = false;
          this.childForm.editForm = false;
          this.onSearchButtonClick();
          done();
        }
      }
    };
</script>