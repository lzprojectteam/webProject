<template>
  <div id="box_pa">
    <div id="select">
      <el-form inline style="margin-bottom: 30px;border-bottom: 1px solid #606266;">
        <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
          <organization-form :root="userOrgId" @onchange="organizationOnchange"/>
        </el-form-item>
        <el-form-item :label="$t('tobacco.setup.station.host')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.host"/>
        </el-form-item>
        <el-form-item :label="$t('tobacco.setup.station.port')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.port"/>
        </el-form-item>

      </el-form>
    </div>
    <div id="nav">
      <el-button-group>
        <el-button type="primary" @click="SendBalance">{{$t('tobacco.setup.balance.tab2')}}</el-button>
        <el-button type="primary" @click="SendUser">{{$t('tobacco.setup.balance.tab3')}}</el-button>
        <el-button type="primary" @click="SendBalanceUser">{{$t('tobacco.setup.balance.tab4')}}</el-button>
        <el-button type="primary" @click="SendUserMapping">{{$t('tobacco.setup.balance.tab5')}}</el-button>
        <el-button type="primary" @click="SendParameter">{{$t('tobacco.setup.balance.tab6')}}</el-button>
        <el-button type="primary" @click="SendPrice">{{$t('tobacco.setup.balance.tab7')}}</el-button>
        <el-button type="primary" @click="SendCard">{{$t('tobacco.setup.balance.tab8')}}</el-button>
        <el-button type="primary" @click="SendContract">{{$t('tobacco.setup.balance.tab9')}}</el-button>
      </el-button-group>
    </div>
    <div class="content"
         style="height: 300px;line-height: 300px;text-align: center;border: 1px solid #ccc;background-color: #f5f5f5;margin-top: 30px;color:#080808"
         v-html="message"></div>
  </div>
</template>
<script>
  const OrganizationForm = () => import('@/components/Organization');

  // import categoryApi from '../../api/basic/api_category';
  import parameterApi from '../../api/setup/api_parameter';
  import balanceApi from '../../api/setup/api_balance';
  import balanceAssignAliasApi from '../../api/setup/api_balanceAssignAlias';
  import priceApi from '../../api/basic/api_price';
  import balanceAssignApi from '../../api/setup/api_balanceAssign';
  import cardApi from '../../api/basic/api_card';
  import stationApi from '../../api/setup/api_station';
  import seContractApi from '../../api/tsell/api_seContract';

  export default {
    props: ['item', 'isEdit', 'visible'],
    data() {
      return {
        arr: [],
        count: 0,
        currentIndex: 0,
        //推送合同每组数据长度
        size: 100,
        tempObj: {},
        formData: {
          activeName: 'first',
          loginList: [],
          balanceIdList: {}
        },
        formItem: {
          'organizationId': '',
          'organizationName': '',
          'stationList': [],
          'host': '',
          'port': '',
          'year': '',
        },
        url: '',
        message: ''
      };
    },
    computed: {
      userOrgId() {
        if (this.$store.state.user.organization === undefined) {
          return undefined;
        } else {
          return this.$store.state.user.organization.organizationId;
        }
      }
    },
    components: {
      OrganizationForm
    },
    created() {
      this.load();
    },
    methods: {
      organizationOnchange(label, value, values) {
        this.formItem.organizationId = value;
        this.formItem.organizationCode = value;
        this.formItem.organizationName = label;
        this.getStation();
      },
      load() {
        this.formItem.organizationId = this.$store.state.user.organization.organizationId;
        this.formItem.organizationName = this.$store.state.user.organization.organizationName;
        console.log(this.formItem.organizationId);
        this.formItem.year = new Date().getFullYear().toString();
        this.getStation();
        this.message = this.$t('tobacco.setup.balance.noMessage');
      },
      formReset(name) {
        this.$refs[name].resetFields();
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      SendBalance() {
        if (this.checkHost()) {
          this.message = this.$t('base.loading');
          Promise.all([balanceApi.getBalanceJson(
            this.formItem.organizationId
          )])
            .then(([response]) => {
              console.log(response);
              fetch(this.url + '/api/v1/tobacco/sync/balance', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json', 'Content-Type': 'application/json'
                },
                body: response
              })
                .then((r) => {
                  console.log(r);
                  return r.json();
                })
                .then((j) => {
                  console.log(j);
                  this.message = j.message;
                })
                .catch((e) => {
                  console.log(e);
                  this.message = this.$t('tobacco.setup.balance.timeOut');
                });
            })
            .catch(error => {
              console.log(error);
              this.message = this.$t('tobacco.setup.balance.noData');
            });
        }
      },
      SendUser() {
        if (this.checkHost()) {
          console.log(this.formItem.organizationId);
          this.message = this.$t('base.loading');
          Promise.all([balanceApi.getBalanceUserJson(this.formItem.organizationId)])
            .then(([response]) => {
              console.log(response);
              if (response.code === -1) {
                this.message = this.$t('tobacco.setup.balance.noData');
                return;
              }
              response = JSON.parse(response);
              // 清空数据
              this.formData.balanceIdList = {};
              this.formData.loginList = [];
              console.log('balanceUser');
              console.log(response);
              if (response['balanceUserList'].length >= 1) {
                let that = this;
                response['balanceUserList'].forEach(function (item) {
                  that.formData.loginList.push(item['UserId']);
                  that.formData.balanceIdList[item['UserId']] = item.BalanceId;
                });
                console.log('loginList');
                console.log(this.formData.loginList);
                //三方接口，不是本地接口！
                Promise.all([balanceAssignApi.getParam({
                  search: 'loginName:IN:{loginId};'.format({
                    loginId: this.formData.loginList,
                  })
                })])
                  .then(([response]) => {
                    console.log('与三方id对比后结果');
                    console.log(response);
                    let RequstData = {'userList': []};
                    let that = this;
                    response.content.forEach(function (item) {
                      RequstData.userList.push({
                        'Id': item.loginName,
                        'UserName': item.name,
                        'UserId': item.loginName,
                        'Password': item.password,
                        'OrgId': that.formItem.organizationId,
                        'OrgName': that.formItem.organizationName,
                        'BalanceId': that.formData.balanceIdList[item.loginName]
                      });
                    });
                    /* console.log('balanceList');
                     console.log(this.formData.balanceIdList);*/
                    console.log('推送参数');
                    console.log(RequstData);
                    if (RequstData.userList.length >= 1) {
                      //转为字符串
                      RequstData = JSON.stringify(RequstData);
                      fetch(this.url + '/api/v1/tobacco/sync/user', {
                        method: 'POST',
                        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                        // cache: 'default',
                        // credentials: 'include',
                        body: RequstData
                      })
                        .then((r) => {
                          return r.json();
                        })
                        .then((j) => {
                          console.log(j);
                          this.message = j.message;
                        })
                        .catch((e) => {
                          console.log(e);
                          this.message = this.$t('tobacco.setup.balance.timeOut');
                        });
                    } else {
                      this.message = this.$t('tobacco.setup.balance.noData');
                    }
                  })
                  .catch(error => {
                    console.log(error);
                    this.message = error.message;
                  });
              } else {
                this.message = this.$t('tobacco.setup.balance.noBindUser');
              }
            })
            .catch(error => {
              console.log(error);
              this.message = this.$t('tobacco.setup.balance.noData');
            });
        }
      },
      SendBalanceUser(url, data) {
        if (this.checkHost()) {
          this.message = this.$t('base.loading');
          Promise.all([balanceApi.getBalanceUserJson(
            this.formItem.organizationId
          )])
            .then(([response]) => {
              console.log(response);
              // response = JSON.parse(response);
              if (JSON.parse(response).balanceUserList.length === 0) {
                this.message = this.$t('tobacco.setup.balance.noData');
              } else {
                fetch(this.url + '/api/v1/tobacco/sync/balanceuser', {
                  method: 'POST',
                  headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                  // cache: 'default',
                  // credentials: 'include',
                  body: response
                })
                  .then((r) => {
                    return r.json();
                  })
                  .then((j) => {
                    this.message = j.message;
                  })
                  .catch((e) => {
                    this.message = this.$t('tobacco.setup.balance.timeOut');
                  });
              }
            })
            .catch(error => {
              this.message = this.$t('tobacco.setup.balance.noData');
            });
        }
      },
      SendUserMapping(url, data) {
        if (this.checkHost()) {
          this.message = this.$t('base.loading');
          Promise.all([balanceAssignAliasApi.getUserMappingJson(
            this.formItem.organizationId
          )])
            .then(([response]) => {
              // response = JSON.parse(response);
              console.log(response);
              fetch(this.url + '/api/v1/tobacco/sync/usermapping', {
                method: 'POST',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                /* cache: 'default',
                 credentials: 'include',*/
                body: response
              })
                .then((r) => {
                  return r.json();
                })
                .then((j) => {
                  this.message = j.message;
                })
                .catch((e) => {
                  this.message = this.$t('tobacco.setup.balance.timeOut');
                });
            })
            .catch(error => {
              console.log(error);
              this.message = this.$t('tobacco.setup.balance.noData');
            });
        }
      },
      SendParameter(url, data) {
        if (this.checkHost()) {
          this.message = this.$t('base.loading');
          let year = new Date().getFullYear();
          Promise.all([parameterApi.getParameterJson(
            year, this.formItem.organizationId
          )])
            .then(([response]) => {
              // response = JSON.parse(response);
              console.log(response);
              fetch(this.url + '/api/v1/tobacco/sync/parameter', {
                method: 'POST',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                // cache: 'default',
                // credentials: 'include',
                body: response
              })
                .then((r) => {
                  return r.json();
                })
                .then((j) => {
                  this.message = j.message;
                })
                .catch((e) => {
                  this.message = this.$t('tobacco.setup.balance.timeOut');
                });
            })
            .catch(error => {
              this.message = this.$t('tobacco.setup.balance.noData');
              console.log(error);
            });
        }
      },
      SendPrice(url, data) {
        if (this.checkHost()) {
          this.message = this.$t('base.loading');
          let year = new Date().getFullYear();
          // year = 2012;
          Promise.all([priceApi.getPriceJson(
            year, this.formItem.organizationId
          )])
            .then(([response]) => {
              // response = JSON.parse(response);
              console.log(response);
              fetch(this.url + '/api/v1/tobacco/basic/prices', {
                method: 'POST',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                // cache: 'default',
                // credentials: 'include',
                body: response
              })
                .then((r) => {
                  return r.json();
                })
                .then((j) => {
                  console.log(j);
                  this.message = j.message;
                })
                .catch((e) => {
                  console.log(e);
                  this.message = this.$t('tobacco.setup.balance.timeOut');
                });
            })
            .catch(error => {
              this.message = this.$t('tobacco.setup.balance.noData');
              console.log(error);
            });
        }
      },
      SendCard(url, data) {
        if (this.checkHost()) {
          this.message = this.$t('base.loading');
          let pageSize = 50;
          Promise.all([
            cardApi.getAll({
              disableFilter: true,
              size: pageSize,
              sort: 'serial,ASC',
              page: 0,
              search: 'organization.organizationId:EQ:{orgId};'.format(
                {
                  orgId: this.formItem.organizationId
                }
              )
            })
          ])
            .then(([response]) => {
              console.log(response);
              if (response.content.length === 0) {
                this.message = this.$t('tobacco.setup.balance.noData');
              } else {
                let totalPages = response.totalPages;
                let page = 0;
  
                do {
                  Promise.all([
                    cardApi.getAll({
                      disableFilter: true,
                      size: pageSize,
                      sort: 'serial,ASC',
                      page: page++,
                      search: 'organization.organizationId:EQ:{orgId};'.format(
                        {
                          orgId: this.formItem.organizationId
                        }
                      )
                    })
                  ])
                    .then(([response]) => {
                      var sendData = {};
                      sendData['rfidList'] = response.content;
                      sendData = JSON.stringify(sendData);
                      //console.log(sendData);
                      fetch(this.url + '/api/v1/tobacco/basic/rfid', {
                        method: 'POST',
                        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                        body: sendData
                      })
                        .then((r) => {
                          console.log(r);
                          return r.json();
                        })
                        .then((j) => {
                          console.log(j);
                          this.message = j.message;
                        })
                        .catch((e) => {
                          this.message = this.$t('tobacco.setup.balance.timeOut');
                        });
                    })
                    .catch(error => {
                    });
  
                } while (totalPages > page);
              }
            })
            .catch(error => {
            });
        }
      },
      SendContract(url, data) {
        if (this.checkHost()) {
          // this.message = this.$t('base.loading');
          this.message = this.$t('base.loading');
          Promise.all([
            seContractApi.getContractInfoListByOrgId(this.formItem.organizationId)
          ])
            .then(([response]) => {
              if (response === '') {
                this.message = this.$t('tobacco.setup.balance.noData');
              } else {
                // 初始化数据
                this.currentIndex = 0;
                this.count = 0;
                this.arr = [];
                let obj = JSON.parse(response);
                this.arr = obj['contractList'];
                console.log('合同数据');
                console.log(this.arr);
                console.log('分组推送开始');
                console.log('每组数据长度：' + this.size);
                if (this.arr.length % this.size === 0) {
                  this.count = Math.floor(this.arr.length / this.size);
                } else {
                  this.count = Math.floor(this.arr.length / this.size) + 1;
                }
                if (this.arr.length === 0) {
                  this.message = this.$t('tobacco.setup.balance.noData');
                } else {
                  this.message = '推送中...当前进度0%';
                  //调用迭代器，开始分组推送
                  this.iterator();
                }
              }
            })
            .catch(error => {
              this.message = this.$t('tobacco.setup.balance.noData');
            });
        }
      },
      checkHost: function () {
        if (this.formItem.host !== '' && this.formItem.host !== undefined && this.formItem.port !== '' && this.formItem.port !== undefined) {
          this.url = this.formItem.host + ':' + this.formItem.port;
          return true;
        } else {
          this.message = '请填写主机地址和端口！';
          return false;
        }
      },
      getStation: function () {
        Promise.all([
          stationApi.getAll({
            search: 'organization.organizationId:EQ:{organizationId};'.format(
              {
                organizationId: this.formItem.organizationId
              }
            )
          })
        ])
          .then(([response]) => {
            if (response.content.length === 0) {
              this.message = this.$t('tobacco.setup.balance.noStation');
              this.formItem.host = '';
              this.formItem.port = '';
            } else {
              this.message = this.$t('tobacco.setup.balance.noMessage');
              this.formItem.host = response.content[0].host;
              this.formItem.port = response.content[0].port;
            }
            this.formItem.stationList = response.content;
          })
          .catch(error => {
          });
      },
      iterator: function () {
        let that = this;
        if (that.currentIndex === that.count - 1) {
          (function () {
            console.log(that.arr.slice(that.currentIndex * that.size, that.arr.length));
            let sendData = {contractList: that.arr.slice(that.currentIndex * that.size, that.arr.length)};
            console.log('----------------------------------------');
            console.log('最后一组');
            console.log('推送数据');
            console.log(sendData);
            sendData = JSON.stringify(sendData);
            fetch(that.url + '/api/v1/tobacco/sync/' + that.formItem.organizationId + '/' + that.formItem.year + '/farmer', {
              method: 'POST',
              headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
              body: sendData
            })
              .then((r) => {
                return r.json();
              })
              .then((j) => {
                that.message = j.message;
                console.log(j.message);
                that.message = '推送成功';
              })
              .catch((e) => {
                console.log(e);
                that.message = that.$t('tobacco.setup.balance.timeOut');
              });
          })(that.currentIndex);
          return;
        } else {
          (function (index) {
            console.log('----------------------------------------');
            console.log('组数：' + index);
            let sendData = {contractList: that.arr.slice(that.currentIndex * that.size, (index + 1) * that.size)};
            console.log('推送数据');
            console.log(sendData);
            sendData = JSON.stringify(sendData);
            console.log(sendData);
            fetch(that.url + '/api/v1/tobacco/sync/' + that.formItem.organizationId + '/' + that.formItem.year + '/farmer', {
              method: 'POST',
              headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
              body: sendData
            })
              .then((r) => {
                return r.json();
              })
              .then((j) => {
                if (j.code === 1) {
                  that.message = j.message;
                  console.log(j.message);
                } else {
                  that.currentIndex++;
                  that.message = '推送中...当前进度' + Math.floor(that.currentIndex / that.count * 100) + '%';
                  console.log(j.message);
                  that.iterator(index);
                }
              })
              .catch((e) => {
                console.log(e);
                that.message = that.$t('tobacco.setup.balance.timeOut');
              });
          })(that.currentIndex);
        }
      }
    },
  };
</script>
<style scoped>
  #box_pa .el-button {
    margin-left: 10px !important;
  }

  #box_pa .el-button:focus, #box_pa .el-button:hover {
    background: #85ce61;
    border-color: #85ce61;
    color: #fff;
  }
</style>
