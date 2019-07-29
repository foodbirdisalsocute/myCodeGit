//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })

    //将头像和昵称写入缓存
    wx.setStorageSync('userInfo', this.data.userInfo);
    wx.setStorageSync('hasUserInfo', true);

    //获取用户openId,以判断该用户是否已经注册
    console.log("==============判断用户是否注册===========");
    this.registry();


  },


  registry:function(e){
    var _this = this;
    wx.login({
      success: function (res) {
        // console.log('code:' + res)
        //发送请求
        wx.request({
          url: 'http://127.0.0.1:8001/loginController/login', //改成自己的服务器地址
          data: {
            code: res.code,//上面wx.login()成功获取到的code
            operFlag: 'getOpenid',
            sessionToken:'6666'
          },
          header: {
            'content-type': 'application/json' //默认值
          },
          success: function (res) {
            //object转json
            console.log("#############" + JSON.stringify(res));
            // console.log(res.data.resultVo.code)
            if (res.data.resultVo.code=="0"){
              console.log("该用户未注册");
              _this.showInfoSucess("您还未注册，请先注册信息","/pages/registry/registry");
             
            }else if(res.data.resultVo.code=="1"){
              //进行登录处理
              var sessionToken=res.data.resultVo.sessionToken;
              console.log("???" + res.data.resultVo.sessionToken);
              wx.setStorageSync("sessionToken", sessionToken);
              wx.switchTab({
                url: '/pages/projectTeam/projectTeam',
              })
            }else{
              // _this.showInfo("登录过期，请重新登录");
            }
          }
        })
      }
    })
  },

  showInfo(message){
    wx.showToast({
      title: message,
      icon: 'none',
      duration:1000
    })
  },

  showInfoSucess(msssage, path) {
    wx.showModal({
      content: msssage,
      icon: 'sucessful',
      duration: 1000,//持续的时间

      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: path
          })
        } else {
          console.log('用户点击取消')
        }
      }
    })
  },

})
