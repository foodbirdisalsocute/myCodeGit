var app=getApp();

Page({
  data: {
    plates: "",
    hdimg: [{
      img: "../../image/advertising_banner.png",
      id: 1,
      url: "..."
    }],
    toPay:false,
    interval: 5e3,
    circular: !0,
    indicatorDots: !1,
    indicatorcolor: "#000",
    vertical: !1,
    autoplay: !1,
    duration: 1e3,
    imgheights: [],
    imgwidth: 750,
    current: 0,
    isKeyboard: !1,
    isNumberKB: !1,
    tapNum: !1,
    phoneNumber: "4006262660",
    disableKey: "1234567890港澳学",
    keyboardNumber: "1234567890ABCDEFGHJKLMNPQRSTUVWXYZ港澳学",
    keyboard1: "京沪粤津冀晋蒙辽吉黑苏浙皖闽赣鲁豫鄂湘桂琼渝川贵云藏陕甘青宁新",
    textArr: [],
    inputPlates: {
      index0: "粤",
      index1: "B",
      index2: "",
      index3: "",
      index4: "",
      index5: "",
      index6: "",
      index7: ""
    },
    inputOnFocusIndex: "",
    submitButtonEnabled: !1,
    automaticPayment: {}
  },
  onLoad: function (options) {
    
    if (options.toPay=="true"){
      console.log("####");
      this.setData({
        toPay:true
      })
    }
    console.log(options.toPay);
    console.log(this.data.toPay);
  },
  swiperClicked: function (t) {
    wx.navigateTo({
      url: "../out/bankcomm",
    })
  },

  submitButtonClick: function () {
    console.log(this.data.inputPlates);
    var temp = this.data.inputPlates;
    var carNo="";
    //遍历车牌号并拼接字符串
    for (var val in temp) {
      carNo += temp[val];
      console.log(val + " " + temp[val]);//输出如:name 
    }
    console.log(carNo);

    var boundCarNoStat=true;
    /*将parkNo保存到本地缓存 */
    wx.setStorageSync('carNo', carNo);
    wx.setStorageSync('boundCarNoStat', boundCarNoStat);

    //保存全局变量
    app.globalData.carNo = carNo;
    app.globalData.boundCarNoStat = boundCarNoStat;
    
    console.log('同步保存成功');
    var _self=this;
    wx.showToast({
      title: '保存成功',
      icon: 'succes',
      duration: 1500,
      mask: true,
      success:function(){
        setTimeout(function () {
          //要延时执行的代码
          if (_self.data.toPay==true){
            wx.redirectTo({
              url: '../appointment/appointment',
            })
          }else{
            wx.redirectTo({
              url: '../plateDetail/plateDetail',
            })
          }
        }, 1500) 
      }
    })

    // wx.navigateTo({
    //   url: '../plateDetail/plateDetail?carNo=' + carNo,
    // })
  },
  inputClick: function (t) {
    console.log(t), console.log(t.target.dataset.id), this.setData({
      inputOnFocusIndex: t.target.dataset.id,
      isKeyboard: !0
    });
    var a = this;
    "0" == this.data.inputOnFocusIndex ? a.setData({
      tapNum: !1,
      isNumberKB: !1
    }) : "1" == this.data.inputOnFocusIndex ? a.setData({
      tapNum: !1,
      isNumberKB: !0
    }) : a.setData({
      tapNum: !0,
      isNumberKB: !0
    });
  },
  tapKeyboard: function (t) {
    t.target.dataset.index;
    var a = t.target.dataset.val;
    switch (this.data.inputOnFocusIndex) {
      case "0":
        this.setData({
          "inputPlates.index0": a,
          inputOnFocusIndex: "1"
        });
        break;

      case "1":
        this.setData({
          "inputPlates.index1": a,
          inputOnFocusIndex: "2"
        });
        break;

      case "2":
        this.setData({
          "inputPlates.index2": a,
          inputOnFocusIndex: "3"
        });
        break;

      case "3":
        this.setData({
          "inputPlates.index3": a,
          inputOnFocusIndex: "4"
        });
        break;

      case "4":
        this.setData({
          "inputPlates.index4": a,
          inputOnFocusIndex: "5"
        });
        break;

      case "5":
        this.setData({
          "inputPlates.index5": a,
          inputOnFocusIndex: "6"
        });
        break;

      case "6":
        this.setData({
          "inputPlates.index6": a,
          inputOnFocusIndex: "7"
        });
        break;

      case "7":
        this.setData({
          "inputPlates.index7": a,
          inputOnFocusIndex: "7"
        });
    }
    this.checkedSubmitButtonEnabled();
  },
  tapSpecBtn: function (t) {
    console.log("!!");
    var a = this, e = t.target.dataset.index;
    if (0 == e) {
      switch (parseInt(this.data.inputOnFocusIndex)) {
        case 0:
          this.setData({
            "inputPlates.index0": "",
            inputOnFocusIndex: "0"
          });
          break;

        case 1:
          this.setData({
            "inputPlates.index1": "",
            inputOnFocusIndex: "0"
          });
          break;

        case 2:
          this.setData({
            "inputPlates.index2": "",
            inputOnFocusIndex: "1"
          });
          break;

        case 3:
          this.setData({
            "inputPlates.index3": "",
            inputOnFocusIndex: "2"
          });
          break;

        case 4:
          this.setData({
            "inputPlates.index4": "",
            inputOnFocusIndex: "3"
          });
          break;

        case 5:
          this.setData({
            "inputPlates.index5": "",
            inputOnFocusIndex: "4"
          });
          break;

        case 6:
          this.setData({
            "inputPlates.index6": "",
            inputOnFocusIndex: "5"
          });
          break;

        case 7:
          this.setData({
            "inputPlates.index7": "",
            inputOnFocusIndex: "6"
          });
      }
      this.checkedSubmitButtonEnabled();
    } else 1 == e && a.setData({
      isKeyboard: !1,
      isNumberKB: !1,
      inputOnFocusIndex: ""
    });
  },
  checkedKeyboard: function () {
    var t = this;
    "0" == this.data.inputOnFocusIndex ? t.setData({
      tapNum: !1,
      isNumberKB: !1
    }) : "1" == this.data.inputOnFocusIndex ? t.setData({
      tapNum: !1,
      isNumberKB: !0
    }) : this.data.inputOnFocusIndex.length > 0 && t.setData({
      tapNum: !0,
      isNumberKB: !0
    });
  },
  checkedSubmitButtonEnabled: function () {
    this.checkedKeyboard();
    var t = !0;
    for (var a in this.data.inputPlates) if ("index7" != a && this.data.inputPlates[a].length < 1) {
      t = !1;
      break;
    }
    this.setData({
      submitButtonEnabled: t
    });
  },
  imageLoad: function (t) {
    var a = 750 / (t.detail.width / (a = t.detail.height)), e = this.data.imgheights;
    e.push(a), this.setData({
      imgheights: e
    });
  },
  bindchange: function (t) {
    this.setData({
      current: t.detail.current
    });
  }
});