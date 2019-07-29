// pages/test/test.js
var prom=require('../../utils/sync-utils.js');
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
    prom.wxPromisify(wx.request)({
              url: 'http://127.0.0.1:8001/loginsdaoller/checkLoginStatus',//请求登录状态
              data: {
                sessionToken: "123"
              },
              header: {
                'content-type': 'application/json' //默认值
              },
              success: function (res) {
                console.log("?asda??");
                
                //判断是否超时
                console.log(JSON.stringify(res));
                if(res.data.code=="3"){
                  //登录用户已经登录，进行下一个请求
                  wx.setStorageSync("loginStatus", "true");
                  resolve("33----");
                } else if (res.data.code == "-2"){
                  //未登录 提示去登录，跳转
                  resolve("33----");
                } else{
                  //未知错误，跳转
                  resolve("33----");
                }
                
              },
              fail: function (res) {
                console.log("???");
              }
    }).then(function(res){
       // console.log(res);
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