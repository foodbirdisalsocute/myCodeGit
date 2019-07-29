//app.js
var prom = require('/utils/sync-utils.js');
App({

  onLaunch: function () {
    console.log("asdsa");
  },

  // data: {
  //   result:""
  // },


  // onLaunch: function () {
  //   // 展示本地存储能力
  //   var logs = wx.getStorageSync('logs') || []
  //   logs.unshift(Date.now())
  //   wx.setStorageSync('logs', logs)

  //   // 登录
  //   wx.login({
  //     success: res => {
  //       // 发送 res.code 到后台换取 openId, sessionKey, unionId
  //     }
  //   })
  //   // 获取用户信息
  //   wx.getSetting({
  //     success: res => {
  //       if (res.authSetting['scope.userInfo']) {
  //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
  //         wx.getUserInfo({
  //           success: res => {
  //             // 可以将 res 发送给后台解码出 unionId
  //             this.globalData.userInfo = res.userInfo

  //             // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //             // 所以此处加入 callback 以防止这种情况
  //             if (this.userInfoReadyCallback) {
  //               this.userInfoReadyCallback(res)
  //             }
  //           }
  //         })
  //       }
  //     }
  //   })
  // },



  //公共类，用来校验登录状态,若校验通过则执行
  // checkLoginStatus(sessionToken){
  //   var _this=this;
   
  //   console.log("2222222222222");

  //   var promise =  new Promise(function(resolve,reject){
  //         wx.request({
  //           url: 'http://127.0.0.1:8001/loginController/checkLoginStatus',//请求登录状态
  //           data: {
  //             sessionToken: sessionToken
  //           },
  //           header: {
  //             'content-type': 'application/json' //默认值
  //           },
  //           success: function (res) {
  //             //判断是否超时
  //             console.log(JSON.stringify(res));
  //             if(res.data.code=="3"){
  //               //登录用户已经登录，进行下一个请求
  //               wx.setStorageSync("loginStatus", "true");
  //               resolve("33----");
  //             } else if (res.data.code == "-2"){
  //               //未登录 提示去登录，跳转
  //               resolve("-2----");
  //               _this.confirmAndJump("尚未登录，请先去登录","/pages/index/index");
                
  //             } else{
  //               //未知错误，跳转
  //               resolve("0000----");
  //               _this.confirmAndJump("未知系统错误", "/pages/index/index");
              
  //             }
              
  //           },
  //           fail: function (res) {
  //             reject("8888");
  //             _this.confirmAndJump("未知系统错误", "/pages/index/index");
  //           }
  //         })
  //   })
  // },


//提示信息，按确定跳转
confirmAndJump(msssage,path){
  wx.showModal({
    content: msssage,
    icon: 'sucessful',
    duration: 1000,//持续的时间

    success: function (res) {
      if (res.confirm) {
        wx.reLaunch({
          url: path
        })
      } else {
        console.log('用户点击取消')
      }
    }
  })
},

//公共函数
checkLoginStatus(sessionToken,sendReuqst){
  var _this=this;
  prom.wxPromisify(wx.request)({
    url: 'http://127.0.0.1:8001/loginController/checkLoginStatus',//请求登录状态
    data: {
      sessionToken: sessionToken
    },
    header: {
      'content-type': 'application/json' //默认值
    }
  }).then(function (res) {
    console.log(res);

    if (res.data.code == "3") {
      console.log("!!!");
      sendReuqst(sessionToken);
    } else if (res.data.code == "-2"){
      _this.confirmAndJump("登录过期，请先登录","/pages/index/index");
    }else{
      _this.confirmAndJump("未知错误", "/pages/index/index");
    }
  })
},

  globalData: {
    userInfo: null
  }
})
