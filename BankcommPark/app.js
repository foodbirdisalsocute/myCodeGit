//app.js
App({


  getLocalInfo(){
    var _self = this;
    this.globalData.carNo = wx.getStorageSync('carNo');
    console.log(this.globalData.carNo);
    this.globalData.boundCarNoStat = wx.getStorageSync('boundCarNoStat');
    console.log(this.globalData.boundCarNoStat);
    this.globalData.boundNoPasswdPayStat = wx.getStorageSync('boundNoPasswdPayStat');
    console.log(this.globalData.boundNoPasswdPayStat);
    // wx.getStorageSync({
    //   key: 'carNo',
    //   success: function (res) {
    //     console.log("-车牌号码--"+res.data);
    //     _self.globalData.carNo = res.data;
    //   },
    //   fail: function () {
    //     console.log("获取本地车牌号码失败");
    //   }
    // })

    // wx.getStorageSync({
    //   key: 'boundCarNoStat',
    //   success: function (res) {
    //     console.log("-车牌绑定状态--" + res.data);
    //     _self.globalData.boundCarNoStat = res.data;
    //   },
    //   fail:function(){
    //     console.log("获取绑定车牌状态失败");
    //   }
    // })

    // wx.getStorageSync({
    //   key: 'boundNoPasswdPayStat',
    //   success: function (res) {
    //     console.log("-无感状态--" + res.data);
    //     _self.globalData.boundNoPasswdPayStat = res.data;
        
    //   },
    //   fail: function () {
    //     console.log("获取无感支付绑定状态失败");
    //   }
    // })
    


  },



  onLaunch: function () {

    this.getLocalInfo();

    


    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    carNo:'NULL',
    inPark:'false',
    boundCarNoStat:false,
    boundNoPasswdPayStat:false,
    parkingIn:false
  }
})