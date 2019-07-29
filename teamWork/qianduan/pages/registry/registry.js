// pages/registry/registry.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:'',
    userInfo: {},
    phone:'',
    mail:'',
    workNum:'',
    wechatOpenId:'',
    picPath:'',
    wechatName:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo:userInfo
    })
   
   console.log(this.data.userInfo);

  },
  getMail(e){
      this.setData({
        mail: e.detail.value
      })
  },
  getPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  getWorkNum(e) {
    this.setData({
      workNum: e.detail.value
    })
  },
  registry(){
    // if (this.data.phone !== '' && this.data.phone !== '' && this.data.phone !== ''){
    //   console.log("可以提交")
    //   this.showInfoSucess("注册成功",'../index/index');
    // }else{
    // }
      // console.log("缺少必要")
      // this.showInfoError("缺少必要");

    var picPath = this.data.userInfo.avatarUrl;
    var wechatName = this.data.userInfo.nickName;

      /**============测试========== */
      this.setData({
        phone: "13138165634",
        mail:"981536311@qq.com",
        workNum:"HQ20125",
        picPath: picPath,
        wechatName: wechatName
      })
    this.registrySend();

  },


//注册
  registrySend: function (e) {
    console.log("#########################");
    console.log(this.data.phone)
    var _this=this;
    wx.login({
      success: function (res) {
        console.log('code++++++++++++++++:' + res.code)
        //发送请求
        wx.request({
          url: 'http://127.0.0.1:8001/registryController/Registry', //改成自己的服务器地址
          data: {
            code: res.code,//上面wx.login()成功获取到的code
            phone: _this.data.phone,
            mail: _this.data.mail,
            workNum: _this.data.workNum,
            picPath: _this.data.picPath,
            wechatName:_this.data.wechatName
          },
          header: {
            'content-type': 'application/json' //默认值
          },
          success: function (res) {
            console.log(res);
            if(res.data.code=="1"){
              //存在
              _this.showInfoJump("该账户已经存在，请直接登录", '../index/index');
            } else if (res.data.code == "2"){
              //成功
              _this.showInfoSucess("注册成功", '../index/index');
            }else{
              //异常
              _this.showInfo("系统注册异常");
              console.log("账号异常");
            }

           
          }
        })
      }
    })
  },


  showInfoError(msssage){
    wx.showToast({
      title: msssage,
      icon: 'none',
      duration: 2000//持续的时间
    })
  },

  showInfoJump(message,path) {
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

  showInfo(message){
    wx.showToast({
      title: message,
      icon: 'none',
      duration: 3000//持续的时间

    })
  },

  showInfoSucess(msssage,path){
    wx.showToast({
      title: msssage,
      icon: 'sucessful',
      duration: 2000 ,//持续的时间

      success(data) {
        setTimeout(function () {
          //要延时执行的代码
          wx.reLaunch({
            url: path
          })
        }, 1000) //延迟时间
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

  }
})