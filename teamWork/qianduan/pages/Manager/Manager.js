// pages/Manager/Manager.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamInfo: [{ picPath: "../../images/icon/pic1.png", name: '小1' }, { picPath: "../../images/icon/pic2.png", name: '小2' }, { picPath: "../../images/icon/pic3.png", name: '小3' }, { picPath: "../../images/icon/pic4.png", name: '小4' }, { picPath: "../../images/icon/pic5.png", name: '小5' }, { picPath: "../../images/icon/pic6.png", name: '小6' }, { picPath: "../../images/icon/pic7.png", name: '小7' }],
    teamInfoSize: 0,
    eachLineSize:4  /*头像每行的大小 */

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      teamInfoSize: this.data.teamInfo.length
    })
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

  }
})