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
   
    this.confirmButtonClick();
    
  },
  

  /**
   * 确认
   */
  confirmButtonClick: function () {
    //保存全局变量
    app.globalData.boundNoPasswdPayStat = true;
    //保存到缓存
    wx.setStorage({
      key: 'boundNoPasswdPayStat',
      data: true,
    }),
      console.log('同步保存无感支付状态成功' + app.globalData.boundNoPasswdPayStat + "::" + true);
  },


  jump: function (e) {
    wx.setStorage({
      key: 'paid',
      data: true,
      success: function () {
        wx.reLaunch({
          url: '../personal/personal',
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