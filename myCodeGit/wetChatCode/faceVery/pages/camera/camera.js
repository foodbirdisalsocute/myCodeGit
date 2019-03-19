// camera.js
const app = getApp()
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    nickName: "",
    src: "",//图片的链接
    token: "",
    base64: "",
    msg: ""
  },

  //拍照
  takePhoto() {
    var that = this;
    //拍照
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath//获取图片
        })

        //图片base64编码
        wx.getFileSystemManager().readFile({
          filePath: this.data.src, //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            this.setData({
              base64: res.data
            })
            this.getToken();
          }
        })
      }//拍照成功结束

    })//调用相机结束

    
      //失败尝试
      wx.showToast({
        title: '请重试',
        icon: 'loading',
        duration: 500
      })
  },
  // //acess_token获取,qs:需要多次尝试
  //   wx.request({
  //     url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=S3xBcgdyAKBnBlGFffCMsPoF&client_secret=cQF3nGYrjYFGDvKqQBRAG5yimowW1s3Q', //是真实的接口地址
  //     // data: {
  //     //   grant_type: 'client_credentials',
  //     //   client_id: 'S3xBcgdyAKBnBlGFffCMsPoF',//用你创建的应用的API Key
  //     //   client_secret: 'cQF3nGYrjYFGDvKqQBRAG5yimowW1s3Q'//用你创建的应用的Secret Key
  //     // },
  //     header: {
  //       'Content-Type': 'application/json; charset=UTF-8' // 默认值
  //     },
  //     success(res) {
  //       console.log("????!!!" + res.data.access_token);
  //       that.setData({
  //         token: res.data.access_token//获取到token
  //       }),
  //       that.register();
  //     }
  //   }),
  error(e) {
    console.log(e.detail)
  },
  //获取token
  getToken() {
    var that=this;
    //acess_token获取,qs:需要多次尝试
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=S3xBcgdyAKBnBlGFffCMsPoF&client_secret=cQF3nGYrjYFGDvKqQBRAG5yimowW1s3Q', //是真实的接口地址
      // data: {
      //   grant_type: 'client_credentials',
      //   client_id: 'S3xBcgdyAKBnBlGFffCMsPoF',//用你创建的应用的API Key
      //   client_secret: 'cQF3nGYrjYFGDvKqQBRAG5yimowW1s3Q'//用你创建的应用的Secret Key
      // },
      header: {
        'Content-Type': 'application/json; charset=UTF-8' // 默认值
      },
      success(res) {
        console.log("????!!!" + res.data.access_token);
        that.setData({
          token: res.data.access_token//获取到token
        }),
          that.register();
      }
    })
  },

  //获取用户信息
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo.nickName);
    this.setData({
      nickName: e.detail.userInfo.nickName
    })
    wx.showToast({
      title: '授权成功',
      icon: 'success',
      duration: 1000
    })
  },

  //先授权登陆，再拍照注册
  btnreg: function () {
    wx.showModal({
      title: '注册须知',
      content: '先授权登陆，再拍照注册哦！网络可能故障，如果不成功，请再试一下！',
    })
  },

  //注册用户
  register:function(){
    var that = this;
    //上传人脸进行注册-----test
    wx.request({
      url: 'https://aip.baidubce.com/rest/2.0/face/v3/faceset/user/add?access_token=' + this.data.token,
      method: 'POST',
      data: {
        image: this.data.base64,
        image_type: 'BASE64',
        group_id: 'faces',//自己建的用户组id
        user_id: 'face1',
        //user_id: this.data.nickName//这里获取用户昵称
      },
      header: {
        'Content-Type': 'application/json' // 默认值
      },
      success(res) {
        console.log("====");
        console.log(res.data.error_msg);
        that.setData({
          msg: res.data.error_msg
        })
        console.log(that.data.msg)
        //做成功判断
        if (that.data.msg == 'SUCCESS') {//微信js字符串请使用单引号
          wx.showToast({
            title: '注册成功',
            icon: 'success',
            duration: 2000
          })
          wx.switchTab({
            url: '../UI/ui',
          })

        }

      }
    })
  }

})