// pages/myInfo/myInfo.js
var app=getApp();
Page({

  /**
   * 页面的初始数据 
   */
  data: {
    userInfo: {},
    boundNoPasswdPayStat:false,
    boundCarNoStat:false,
    carNo:"",
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
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
      wx.navigateTo({
        url: '../canelNoPasswordPay/canelNoPasswordPay',
      })
      
    } else if (this.data.boundNoPasswdPayStat == false) {
      //跳到开通页面
      wx.navigateTo({
        url: '../noPasswordPay/noPasswordPay',
      })
    }

    
  },
  oderList(){
    wx.navigateTo({
      url: '../orderList/orderList',
    })
  },
  myCarInfo(){
    var boundCarNoStat = app.globalData.boundCarNoStat;
    if (boundCarNoStat==true){
        wx.navigateTo({
          url: '../plateDetail/plateDetail',
        })
    }else{
        wx.navigateTo({
          url: '../park/park',
        })
    }
  }

})