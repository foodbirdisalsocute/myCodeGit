// pages/checkId/checkId.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idCard:"",
    idCardShow:"",
    name:"",
    nameShow:"",
    checkAliveType :"2",
    useAble: false,
    viewBg:'#CCDDF8',
    fistInputName:true,
    fistInputIdCard: true,
    selected:false
  },
  checkboxChange(e){
   
    if(this.data.selected==true){
      this.setData({
        selected: false
      })
    }else{
      this.setData({
        selected: true
      })
    }
    console.log(this.data.selected);
    
    if (this.data.selected == true && this.data.name != "" && this.data.idCard!=""){
      console.log("aaa");
      this.setData({
        viewBg: "#446DFE"
      })
    }else{
      console.log("bbb");
      this.setData({
        viewBg: "#CCDDF8"
      })
    }
  },

  changeToXin(idCard,name){

    if (idCard != "" && name != "") {
    //  var idCard = "445121199507103418";//
      var first = idCard.substring(0, 3);
      var last = idCard.substring(16, 18);
      var any = "*************";
      idCard = first + any + last;
   //   var name = "许辛源";//
      name = name.substr(0, name.length - 1);;
      name = name + "*"
      console.log(name); 
    } else {
      idCard = "110**********110";
      name = "交**"
    }
    this.setData({
      idCardShow: idCard,
      nameShow: name
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var idCard = wx.getStorageSync('idCardNumber');
    var name = wx.getStorageSync('name');
    console.log("#############");
    console.log(idCard);
    console.log(name);
    this.setData({
      idCard: idCard,
      name: name
    })
    this.changeToXin(idCard,name);
    
  },
  focusIdCard(){
    
    if (this.data.fistInputIdCard == true) {
      this.setData({
        idCard: "",
        fistInputIdCard:false,
        viewBg: "#CCDDF8"
      })
    }

  },
  getInputIdCard(e){
    this.setData({
      idCard: e.detail.value
    })
     if (this.data.selected == true && this.data.name != "" && this.data.idCard != "") {
      this.setData({
        viewBg: "#446DFE"
      })
    }
  },

  focusName() {
    if (this.data.fistInputName == true) {
      this.setData({
        name: "",
        fistInputName: false,
        viewBg: "#CCDDF8"
      })
    }
  },
  getInputName(e){
    this.setData({
      name: e.detail.value
    })
     if (this.data.selected == true && this.data.name != "" && this.data.idCard != "") {
      this.setData({
        viewBg: "#446DFE"
      })
    }
  },
  beginToCheck(){
    

  },

  /*身份验证接口*/
  checkId() {
    console.log(this.data.idCard);
    if (this.data.viewBg == "#446DFE") {
      this.setData({
        useAble: true
      })
    }

    console.log("？？？？");
    if (this.data.useAble != true) {
      return;
    }
    console.log("true！！！");

    var that = this;
    console.log("111");
    wx.startFacialRecognitionVerifyAndUploadVideo({
      name: this.data.name,
      idCardNumber: this.data.idCard,
      checkAliveType: this.data.checkAliveType,
      complete: res => {
        console.log("返回结果：：：："+res);
        if (res.errCode == 0) {
          app.globalData.logining=true;
          //存入缓存
          /*将parkNo保存到本地缓存 */
          console.log(that.data.idCard + that.data.name);
          wx.setStorageSync('idCardNumber', that.data.idCard);
          wx.setStorageSync('name', that.data.name);
          console.log("保存成功！");
          app.globalData.logining = true;
          console.log("::::::::" + app.globalData.logining);
          wx.redirectTo({
            url: '../houseMoney/houseMoney',
          })
        } else {
          wx.redirectTo({
            url: '../verifyFail/verifyFail',
          })
        }
      }
    })
  },

  radioChange(e){
    console.log(e.detail.value);
    var checkAliveType  = e.detail.value;
    if (checkAliveType =="dsVerify"){
      this.setData({
        checkAliveType :"1"
      })
    } else if (checkAliveType  == "fgVerify"){
      checkAliveType :"0"
    }
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