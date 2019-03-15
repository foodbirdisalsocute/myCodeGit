// pages/parkingDetail/parkingDetail.js

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

  /**
   * 立即预约
   */
  appointButtonClick: function () {
    var inPark = app.globalData.inPark;
    var boundCarNo = app.globalData.boundCarNo;
    console.log(inPark + "==" + boundCarNo);

    if (inPark == 'false' && boundCarNo=='false'){
      wx.navigateTo({
        url: '/pages/park/park',
      })
    } else if (inPark == 'false' && boundCarNo == 'true'){
      wx.navigateTo({
        url: '/pages/plateDetail/plateDetail',
      })
    } else if (inPark == 'true' && boundCarNo == 'false') {
      wx.navigateTo({
        url: '/pages/parkingDetail/parkingDetail',
      })
    } else if (inPark == 'true' && boundCarNo == 'true') {
      wx.navigateTo({
        url: '/pages/parkingDetail/parkingDetail',
      })
    }

   
  },
})