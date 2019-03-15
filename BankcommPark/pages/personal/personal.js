// pages/myInfo/myInfo.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    boundNoPasswdPayStat: false,
    boundCarNoStat: false,
    carNo: "",
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onUnload: function () {
    console.log("????????");
    wx.reLaunch({
      url: '../home/home'
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // this.data.boundNoPasswdPayStat = app.globalData.boundNoPasswdPayStat;
    console.log("onload===" + app.globalData.boundNoPasswdPayStat);
    this.setData({
      boundNoPasswdPayStat: app.globalData.boundNoPasswdPayStat,
      boundCarNoStat: app.globalData.boundCarNoStat,
      carNo: app.globalData.carNo,
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /*开通无感支付监听 */
  checkNoPasswdPay: function (e) {
    console.log("aaa");
    var _self = this;
    console.log(this.data.boundNoPasswdPayStat + "***" + app.globalData.boundNoPasswdPayStat);
    if (this.data.boundNoPasswdPayStat == true) {
      //跳到取消页面
      this.canelNoPasswordPay();

    } else if (this.data.boundNoPasswdPayStat == false) {
      //跳到开通页面
      wx.navigateTo({
        url: '../noPasswordPay/noPasswordPay',
      })
    }


  },
  oderList() {
    wx.navigateTo({
      url: '../orderList/orderList',
    })
  },
  myCarInfo() {
    var boundCarNoStat = app.globalData.boundCarNoStat;
    if (boundCarNoStat == true) {
      wx.navigateTo({
        url: '../plateDetail/plateDetail',
      })
    } else {
      wx.navigateTo({
        url: '../park/park',
      })
    }
  },
  clickCarPosition(){
    wx.showModal({
      title: '',
      content: '暂未开放该功能，敬请期待',
    })
  },
  /*取消*/
  canelNoPasswordPay() {
    app.globalData.boundNoPasswdPayStat = false;
    var _self=this;
    wx.showModal({
      content: "确认取消无感支付",
      confirmText: "确定取消",
      confirmColor: "#02BB00",
      success: function (a) {

        if (a.cancel) {
          //点击取消,默认隐藏弹框

        } else {
          //保存全局变量
          app.globalData.boundNoPasswdPayStat = false;

          //保存到缓存
          wx.setStorage({
            key: 'boundNoPasswdPayStat',
            data: false,
          }),
            console.log('同步保存无感支付状态成功' + app.globalData.boundNoPasswdPayStat + "::" + false);
          wx.showToast({
            title: '你已经成功取消无感支付',
            icon: 'succes',
            duration: 1500,
            mask: true,
            success: function (e) {
              _self.onLoad();
            }
          })
        }
      }

    })
  },

  back: function() {
    wx.reLaunch({
      url: '../home/home',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }

})