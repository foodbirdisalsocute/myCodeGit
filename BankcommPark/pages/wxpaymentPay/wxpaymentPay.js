let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFocus: true,  //聚焦 
    inputValue: "",    //输入的内容 
    showPwdInput:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    

    
    this.setData({
      isFocus: true,
    });

   
  },
  imageLoad: function(e) {
    let ratio = 1;
    let _this = this;
    wx.getSystemInfo({
      success: function(res) {
        console.log(res.windowHeight);
        
          _this.setData({
            img_height: res.windowHeight,
          });

      },
    })
  },
  close:function(e){
    if(this.data.isFocus)
    wx.navigateBack({
      delta:1,
    })
  },
  
  inputPasswd:function(e) {
    var that = this;
    console.log(e.detail.value);
    var inputValue = e.detail.value;
    that.setData ({
      inputValue: inputValue,
    })
    if (inputValue.length>=6)
      wx.redirectTo({
        url: '../wxsuccesspayPay/wxsuccesspayPay',
      })
  },
  focusOn:function(e){
    this.setData({
      isFocus: true,
    });
  },
  
  

  

})