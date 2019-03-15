// pages/jump/jump.js
let app = getApp();
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../myInfo/myInfo'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },


  /*缴费 */
  clickcontrol() {
    console.log("缴费");
    // let { controlId } = e;
    // let mpCtx = wx.createMapContext("map");
    // mpCtx.moveToLocation();
   if(app.globalData.boundCarNoStat==true){
     wx.navigateTo({
       url: '/pages/appointment/appointment',
       success: function (res) { },
       fail: function (res) { },
       complete: function (res) { },
     })
   }else{
     wx.navigateTo({
       url: '/pages/park/park?toPay=' + true,
       success: function (res) { },
       fail: function (res) { },
       complete: function (res) { },
     })
   }
  },
  outUse() {
    app.globalData.parkingIn = false;
    wx.navigateTo({
      url: '/pages/parkMap/parkMap',
    })
  },

  inUse(){
    app.globalData.parkingIn = true;
    if (app.globalData.boundCarNoStat==true){
      wx.navigateTo({
        url: '/pages/plateDetail/plateDetail',
      })
    }else{
      wx.navigateTo({
         url: '/pages/parkMap/parkMap',
      })
    }
    
  },
  inSao(){
    app.globalData.parkingIn=true;
    if (app.globalData.boundCarNoStat==false){
      this.showInfo();
    } else if (app.globalData.boundCarNoStat == true) {
      wx.navigateTo({
        url: '/pages/plateDetail/plateDetail',
      })
    }
  },


  showInfo(){
    // wx.showModal({
    //   content: "您尚未绑卡，请先进行绑卡操作",
    //   confirmText: "去绑卡",
    //   confirmColor: "#02BB00",
    //   success: function (a) {
    //     if (a.cancel) {
    //       //点击取消,默认隐藏弹框
    //     } else {
          wx.navigateTo({
            url: '/pages/park/park',
          })
    //     }
    //   }
    // });

  }

})