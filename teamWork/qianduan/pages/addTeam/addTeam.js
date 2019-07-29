var app=getApp();
Page({
  /**
   * 初始化数据
   */
  data: {
    teamName: '',
  },

  /**
   * 监听手机号输入
   */
  listenerPhoneInput: function (e) {
    this.data.teamName = e.detail.value;

  },

 

  /**
   * 监听登录按钮
   */
  listenerLogin: function () {
    //打印收入账号和密码
    console.log('手机号为: ', this.data.teamName);

    var sessionToken = wx.getStorageSync("sessionToken");
    app.checkLoginStatus(sessionToken, this.sendRequestToCreate);
    console.log("啊啊啊啊");
    // wx.switchTab({
    //   url: '/pages/projectTeam/projectTeam',
    // })
  },

  sendRequestToCreate(sessionToken){
    console.log("dddddddddddddddddd");
    var _this = this;
    wx.request({
      url: 'http://127.0.0.1:8001/teamController/addTeam', //改成自己的服务器地址
      data: {
        sessionToken: sessionToken,
        teamName: this.data.teamName
      },
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function (res) {
        console.log(res);
        if(res.data.code=="2"){
          //TODO
          _this.showInfoJump("添加成功","../projectTeam/projectTeam");
        }else if(res.data.code="1"){
          _this.showInfo("项目组已经存在，请使用其他名称");
        }else
          _this.showInfo("未知错误");
      }
    })
  },

  showInfoJump(message, path) {
    wx.showToast({
      title: message,
      icon: 'none',
      duration: 2000//持续的时间
    })
    setTimeout(function () {
      //要延时执行的代码
      wx.reLaunch({
        url: path
      })
    }, 3000) //延迟时间
  },

  showInfo(message) {
    wx.showToast({
      title: message,
      icon: 'none',
      duration: 1000
    })
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var sessionToken = wx.getStorageSync("sessionToken");
    console.log("**************" + sessionToken);

    app.checkLoginStatus(sessionToken, this.sendRequestLatter);
   
    console.log("????");
  },

  sendRequestLatter(sessionToken){

  },

  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})