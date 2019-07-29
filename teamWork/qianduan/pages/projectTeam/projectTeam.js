// pages/projectTeam/projectTeam.js
// var Promises = require("../../utils/Promise.js");
var app = getApp(); 
// var Promise = require('../../utils/sync-utils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectNames:["BBIP","GCPS"],
    a:"1"
  },

  

  clickProject(e){
    console.log(e.currentTarget.id);
    wx.navigateTo({
      url: '/pages/workLog/workLog?id='+e.currentTarget.id,
    });

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    var sessionToken=wx.getStorageSync("sessionToken");
    console.log("**************" + sessionToken);

    app.checkLoginStatus(sessionToken, this.sendRequestLatter);
    console.log(this.data.a);
   
    // var Test = app.checkLoginStatus(sessionToken);
    // Test.then();

    //函数式编程，将发送函数作为参数传入
    // var loginStatus = app.checkLoginStatus(sessionToken);
  
    // if(loginStatus=="sucessful"){
    //   this.sendRequestLatter(sessionToken);
    // }

  },

  sendRequestLatter(sessionToken){

    var _this = this;
    console.log("111111111111111");
     wx.request({
      url: 'http://127.0.0.1:8001/userInTeamController/getTeamListByWechatOpenId', //改成自己的服务器地址
      data: {
        sessionToken: sessionToken,
        // projectNames: this.data.projectNames
      },
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function (res) {
        //判断是否超时
        console.log("::::::::::::::::::::" + JSON.stringify(res));
        //TODO
        _this.setData({
          projectNames:res.data
        })
        
      }
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

  //添加项目组
  addTeamClick(){
    wx.navigateTo({
      url: '/pages/addTeam/addTeam',
    })
  }
})