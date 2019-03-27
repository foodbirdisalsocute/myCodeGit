Page({
  data: {
    showLogin: false, //显示授权框
    session_key: null,
    openid: null
  },
  getPhoneNumber: function (e) {
    wx.login({
      success: function (r) {
        wx.request({
          url: 'http://localhost:8080/maven-web-demo/demo/index', //这里就写上后台解析手机号的接口
          //这里的几个参数是获取授权后的加密数据，作为参数传递给后台就行了
          data: {
            encryptedData: e.detail.encryptedData,
            code: r.code,
            iv: e.detail.iv
          },
          method: 'GET',
                header: {
            'content-type': 'application/x-www-form-urlencoded' // POST请求
          },
          success(res) {
            console.log(res.data)
          }
        })
      }
    })
  },





onLoad(){
},


})
