// pages/houseMoney/houseMoney.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logining:false,
    hiddenButtom:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var name = wx.getStorageSync('name');
    console.log(name);
    if(name==""){
      name="交通银行"
    }
    this.setData({
       logining:app.globalData.logining,

       //测试
      // logining: true,

      
      name: name
    })

    this.setData({
      hiddenButtom:this.data.logining
    })
    if (this.data.logining==false){
    // if (false){
      var _self = this;
      wx.showModal({
        content: "本次操作需要您进行登录验证",
        title:'提示',
        confirmText: "确定",
        confirmColor: "#02BB00",
        success: function (a) {
          if (a.cancel) {
            //点击取消,返回
            wx.navigateBack({
              delta: 1
            })
          } else {
            wx.navigateTo({
              url: '../checkId/checkId',
            })
          }
        }
      })
    }
  },
  goMoneyRoom(){
    wx.navigateTo({
      url: '../MoneyRoom/MoneyRoom',
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

  },
  getPhoneNumber: function (e) {
    this.setData({
      hiddenButtom: !this.data.hiddenButtom
    })
    wx.login({
      success: function (r) {
        wx.request({
          url: 'http://localhost:8080/maven-web-demo/demo/index', //这里就写上后台解析手机号的接口
          //这里的几个参数是获取授权后的加密数据，作为参数传递给后台就行了
          data: {
            encryptedData: e.detail.encryptedData,
            code: r.code,
            iv: e.detail.iv
          },
          method: 'GET',
          header: {
            'content-type': 'application/x-www-form-urlencoded' // POST请求
          },
          success(res) {
            console.log(res.data);
            var info = res.data
            if (res.data!="11011011011"){
              wx.showModal({
                title: '提示',
                content: "您的手机号码已经被录入，后续有工作人员练习您",
              })
            }else{
              wx.showModal({
                title: '提示',
                content: "手机号码录入失败",
              })
            }
          }
        })
      }
    })
  }
})