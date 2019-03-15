// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  save: function (e) {
    console.log('开始保存')
    wx.setStorage({
      key: 'key1',
      data: 'data666',
      success: function (res) {
        console.log('异步保存成功')
      }
    })
    wx.setStorageSync('key2', 'data2');
    
    console.log('同步保存成功')
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
    //this.save();
    wx.getStorage({
      key: 'key1',
      success: function(res) {
        console.log(res);
      },
    })
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

  }
})