// pages/canelNoPasswordPay/canelNoPasswordPay.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  /*取消*/
  canelNoPasswordPay(){
    app.globalData.boundNoPasswdPayStat=false;
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
              setTimeout(function () {
                //要延时执行的代码
                wx.redirectTo({
                  url: '../myInfo/myInfo',
                })
              }, 1500) 
            }
          })
        }
      }

    })
  }
})