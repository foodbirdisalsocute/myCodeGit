//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    logining:false,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    /*证件*/
    backClass: ["houseMoneyLogin", "hrPowerLogin", "trificLogin", "more"],
    /*最近使用 */
    lastUseProject: ["falv", "gongjijin", "hunyin", "huzhao", "shebao", "xingshi"],
    /*常用服务 */
    normalProject: ["shebao", "huzhao", "xingshi", "suiwu", "huzhen", "jiaotongchuxing"],
    normalProjectName: ["社保", "护照通行证", "行驶驾驶", "税务", "户政", "交通出行"],
    normalProjectDetail: ["五险缴纳情况、对应待遇机服务", "护照通行证签注", "违章缴发查询、车辆及证件", "个人税务查询、电子税票开具", "户籍、身份证、居住登记", "为市民提供汽运出行便利"],
    currentItemId: 2
  },

  /*改变最近使用图标顺序 */
  changeList(e){
    var clickIcon = e.currentTarget.id;

    let lastUseProject = this.data.lastUseProject;
    var flagNoExit=true;
    for (var x = 0; x < lastUseProject.length;x++)
    {
      if (lastUseProject[x] == clickIcon) { 
        flagNoExit=false;
        console.log(x);
        lastUseProject.splice(x, 1);
        console.log(lastUseProject);
        var clickIconTmp=[];
        clickIconTmp.push(clickIcon);
        console.log("lastUseProject:::" + clickIconTmp);
        //lastUseProject=clickIcon.push(lastUseProject);
        lastUseProject = clickIconTmp.concat(lastUseProject);
        console.log("lastUseProject==========");
        console.log(lastUseProject);
        this.setData({
          lastUseProject: lastUseProject
        })
      }
    }

    if (flagNoExit==true){
      console.log("???");
      lastUseProject.splice(lastUseProject.length - 1, 1);
      var clickIconTmp = [];
      clickIconTmp.push(clickIcon);
      lastUseProject = clickIconTmp.concat(lastUseProject);
      console.log(lastUseProject);
      this.setData({
        lastUseProject: lastUseProject
      })
  }


  },

  swiperChange: function (e) {
    var currentItemId = e.detail.currentItemId;
    this.setData({
      currentItemId: currentItemId
    })
  },
  goLogin(){
    wx.navigateTo({
      url: '../checkId/checkId',
    })
  },

  onLoad: function () {

    var logining = app.globalData.logining;
    console.log("show~~~~~" + logining);
    this.setData({
      logining: logining
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  toHouseMoney() {
      wx.navigateTo({
        url: '../houseMoney/houseMoney',
      })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShow: function () {
    this.onLoad();
  }
})
