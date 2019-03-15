let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFocus: false,  //聚焦 
    inputValue: "",    //输入的内容 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
    
    
  },
  


  jump: function (e) {
    wx.setStorage({
      key: 'paid',
      data: true,
      success: function () {
        wx.reLaunch({
          url: '../home/home',
        });
      },
      fail: function (e) {
        wx.showToast({
          title: '跳转失败',
        })
      },
    });
    
  },
 
 
  

  

})