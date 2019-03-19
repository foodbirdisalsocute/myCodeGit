// camera.js
Page({
  data: {
    base64: "",
    token: "",
    msg: null
  },
  //拍照并编码
  takePhoto() {
    //拍照
    var that=this;
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })
        that.readImg();
      }
    })

   
    wx.showToast({
      title: '请重试',
      icon: 'loading',
      duration: 500
    })
  },
  readImg(){
    var that = this;
    //图片base64编码
    var filePath = '';
    wx.getFileSystemManager().readFile({
      filePath: this.data.src, //选择图片返回的相对路径
      encoding: 'base64', //编码格式
      success: res => { //成功的回调
        //   console.log(this.data.src);
        //   console.log("&&&&&");
        //   console.log(this.data.src);
        //    console.log(res.data);
        that.setData({
          base64: res.data
          // base64:''
        }),
          that.getToken();
      }
    })
  },

  compareFace:function() {

    console.log("************");
    var that = this;
    //上传人脸进行比对
    wx.request({
      url: 'https://aip.baidubce.com/rest/2.0/face/v3/search?access_token=' + that.data.token,
      method: 'POST',
      data: {
        image: this.data.base64,
        image_type: 'BASE64',

        //group_id: 'faces',//自己建的用户组id
        group_id_list: 'faces'
      },
      header: {
        'Content-Type': 'application/json' // 默认值
      },
      success(res) {

        console.log("$$$$");
        console.log(res.data);
if (typeof (res.data.result.user_list[0]) != "undefined"){
          
        that.setData({
          msg: res.data.result.user_list[0].score
        })
        if (that.data.msg > 80) {
          wx.showToast({
            title: '验证通过',
            icon: 'success',
            duration: 1000
          })
          //验证通过，跳转至UI页面
          wx.switchTab({
            url: '../UI/ui',
          })
        }
}
      }
    });
  },
getToken(){
  var that=this;
    //acess_token获取
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token', //真实的接口地址
      data: {
        grant_type: 'client_credentials',
        client_id: 'S3xBcgdyAKBnBlGFffCMsPoF',//用你创建的应用的API Key
        client_secret: 'cQF3nGYrjYFGDvKqQBRAG5yimowW1s3Q'//用你创建的应用的Secret Key
      },
      header: {
        'Content-Type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.access_token);
        that.setData({
          token: res.data.access_token//获取到token
        });
          that.compareFace();
      }
    })
},
  error(e) {
    console.log(e.detail)
  }
})