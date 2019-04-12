<template>
  <div class='mainPanel' style="height:200px;">
    <div class='toolPanel'>
      <el-form :model="formItem" label-width="80px" style="height:80px;" ref="formValidate" inline>
        <el-form-item label='搜索用户'>
          <el-select @change="selectChange" ref='userSelect' v-model='formItem.userId' filterable remote placeholder="请输入关键词进行搜索" :remote-method='remoteMethod' style="width: 400px" suffix-icon="el-icon-search">
            <el-option v-for="item in  formItem.userList" :key="item.id" :label="item.name" :value="item.id">
              <span style="float: left;">[{{ item.loginName }}]</span>
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.phone }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
        </el-button>
      </el-form>
    </div>
    <main class='contentPanel'>
      <el-table highlight-current-row border  ref="multipleTable"  :data="formItem.hrEmployeeList" style="width: 100%;" >
        <el-table-column prop="name" :label="this.$t('tobacco.thuman.hrEmployee.name')" />
        <el-table-column prop="phone" :label="this.$t('tobacco.thuman.hrEmployee.phone')" width="130"/>
        <el-table-column prop="loginName" label="登录名" width="130"/>
      </el-table>
    </main>
  </div>
</template>
<script>
import hrEmployeeApi from '../../api/thuman/api_hrEmployee';
import userApi from '@/api/base/apiUser';

export default {
  props: ['item', 'visible'],
  data() {
    return {
      formItem: {
        hrEmployeeId: '',
        userId: '',
        userList: [],
        userName: '',
        hrEmployeeList: []
      }
    };
  },
  created() {
    this.formItem.userId = '';
  },
  methods: {
    selectChange(id) {
      let obj = {};
      this.formItem.hrEmployeeList = [];
      obj = this.formItem.userList.find(item => {
        return item.id === id;
      });
      this.formItem.userName = obj.loginName;
      this.formItem.hrEmployeeList.push(obj);
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          Promise.all([
            userApi.findAll({
              contains: 'loginName,name,phone:' + query + ':true',
              valid: true
            })
          ])
            .then(([response]) => {
              this.formItem.userList = response.content;
            })
            .catch(error => {});
        }, 200);
      } else {
        this.formItem.userList = [];
      }
    },
    onSubmitClick(name) {
      this.formItem.hrEmployeeId = this.item.id;
      if (this.formItem.hrEmployeeId === null) {
        this.$message({
          message: this.$t('message.noId'),
          type: 'error'
        });
        return;
      }
      if (this.formItem.userId === null || this.formItem.userId === '') {
        this.$message({
          message: this.$t('message.noUser'),
          type: 'error'
        });
        return;
      }
      this.$refs[name].validate(valid => {
        if (valid) {
          Promise.all([
            hrEmployeeApi.bindUser(
              this.formItem.hrEmployeeId,
              this.formItem.userId,
              this.formItem.userName
            )
          ])
            .then(([response]) => {
              this.formReset(name);
              //重置表单，允许多次操作
              this.$message({
                message: '绑定成功',
                type: 'info'
              });
              this.$emit('update:visible', false);
              this.$emit('refresh');
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.$message({
            message: this.$t('message.formValidate'),
            type: 'warn'
          });
        }
      });
    },
    formReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>
