let app=getApp();
Page({
    data: {
        boundNoPasswdPayStat: app.globalData.boundNoPasswdPayStat,
        plate: "",
        bound:false,
        carNo:"",
        parkingIn:false
    },

  orderListButtonClick: function(){
    wx.navigateTo({
      url: '/pages/orderList/orderList',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  onLoad: function (options) { 
    let boundNoPasswdPayStat = app.globalData.boundNoPasswdPayStat;
    this.setData({
      boundNoPasswdPayStat: boundNoPasswdPayStat
    })

    var carNo = app.globalData.carNo;
    var parkingIn = app.globalData.parkingIn;
    this.setData({
      carNo: carNo,
      parkingIn: parkingIn
    })
  },


    deleButtonClick: function() {
        var e = this;
        wx.showModal({
            content: "该车将会停用无感支付，是否删除",
            confirmText: "删除",
            confirmColor: "#02BB00",
            success: function(a) {
              if (a.cancel) {
                //点击取消,默认隐藏弹框
              } else {
                //点击确定
                
                //保存全局变量
                app.globalData.carNo = '';
                app.globalData.boundCarNoStat = false;
                app.globalData.boundNoPasswdPayStat = false;
                //保存本地缓存
                wx.removeStorage({
                  key: 'carNo',
                  success: function(res) {},
                });
                wx.removeStorage({
                  key: 'boundCarNoStat',
                  success: function (res) { },
                });
                wx.removeStorage({
                  key: 'boundNoPasswdPayStat',
                  success: function (res) { },
                });
                console.log('同步保存成功')
                wx.showToast({
                  title: '解绑定成功',
                  icon: 'succes',
                  duration: 1500,
                  mask: true,
                  success: function () {
                    setTimeout(function () {
                      //要延时执行的代码
                      
                      wx.reLaunch({
                        url: '/pages/personal/personal',
                      })
                    }, 1500)
                  }
                })



               
              }
            }
        });
    },
  refresh(){
    app.globalData.parkingIn=true;
    this.onLoad();
  },
    signButtonClick: function() {

      if(this.data.bound==false){
        //跳转到开通无感支付
          wx.navigateTo({
            url: '/pages/noPasswordPay/noPasswordPay?carNo='+this.data.carNo,
          })
          return;
      }

        self = this;
        var o = this.data.code;
        "true" == wx.showModal({
            content: "停用无感支付后出场需要手动缴费",
            confirmText: "停用",
            confirmColor: "#02BB00",
            success: function(a) {
              if (a.cancel) {
                //点击取消,默认隐藏弹框
              } else {
                //停用
                self.setData({
                  bound:false
                })
              }
            },
            fail: function(o) {
                console.log(o);
            }
        }) ;
    },






  /**
   * 立即支付
   */
  payButtonClick: function () {
    wx.navigateTo({
      url: "../payment/payment",
    })
  },

  /*开通无感支付监听 */
  checkNoPasswdPay: function (e) {
    var _self = this;
    console.log(this.data.boundNoPasswdPayStat + "***" + app.globalData.boundNoPasswdPayStat);
    if (this.data.boundNoPasswdPayStat == true) {
      wx.showModal({
        content: "确认取消无感支付",
        confirmText: "确定取消",
        confirmColor: "#02BB00",
        success: function (a) {

          if (a.cancel) {
            //点击取消,默认隐藏弹框
            _self.setData({
              boundNoPasswdPayStat: app.globalData.boundNoPasswdPayStat
            })
          } else {
            //保存全局变量
            app.globalData.boundNoPasswdPayStat = false;
            _self.setData({
              boundNoPasswdPayStat: app.globalData.boundNoPasswdPayStat
            })
            //保存到缓存
            wx.setStorage({
              key: 'boundNoPasswdPayStat',
              data: false,
            }),
              console.log('同步保存无感支付状态成功' + app.globalData.boundNoPasswdPayStat + "::" + false);
            wx.showToast({
              title: '你已经成功取消无感支付',
              icon: 'succes',
              duration: 1500,
              mask: true
            })
          }
        }

      })
    } else if (this.data.boundNoPasswdPayStat == false) {
      wx.showModal({
        content: "开通无感支付需要阅读协议",
        confirmText: "同意开通",
        confirmColor: "#02BB00",
        success: function (a) {
          _self.setData({
            boundNoPasswdPayStat: app.globalData.boundNoPasswdPayStat
          })
          if (a.cancel) {
            //点击取消,默认隐藏弹框
            app.globalData.boundNoPasswdPayStat = false;
          } else {
            wx.navigateTo({
              url: '/pages/noPasswordPay/noPasswordPay',
            })

          }



        }

      })
    }
  }


});