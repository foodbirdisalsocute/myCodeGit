//logs.js
let util = require('../../utils/util.js');
let amap = require("../../utils/amap");
Page({
  data: {
    lonlat: "",
    city: "",
    tips: [],
    parkArray: [
      {  
        parkName:'交通银行大厦-停车场',
        address: '福田区华强路交通银行大厦地下2层',
        distance:'12m',
        imgPath:'../../image/park_img1.png',
        pay:'5',
        vacancy:'9',
      },
      { 
        parkName: '坂田万科-停车场',
        address: '龙岗区华强路万科第五园三期',
        distance: '2.4km',
        imgPath: '../../image/park_img2.png',
        pay: '8',
        vacancy: '13',  
      }, 
      {
        parkName: '九方-停车场',
        address: '龙华区福华路九方商城地下1层',
        distance: '2.6km',
        imgPath: '../../image/park_img3.png',
        pay: '5',
        vacancy: '24',
      }]
  },
  onLoad(e) {
    let { lonlat, city } = e;
    this.setData({
      lonlat, city
    })
  },
  bindInput(e) {
    // console.log(e);
    let { value } = e.detail;
    let { lonlat, city } = this.data;
    amap.getInputtips(city, lonlat, value)
      .then(d => {
        // console.log(d);
        if (d && d.tips) {
          this.setData({
            tips: d.tips
          });
        }
      })
      .catch(e => {
        console.log(e);
      })
  },
  bindSearch(e) {
    console.log("!!");
    console.log(e);

    
    let { keywords } = e.target.dataset;
    console.log(keywords+"---");
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    console.log(prevPage);
    
    if (keywords) {
      prevPage.setData({ keywords });
      amap.getPoiAround(keywords)
        .then(d => {
          // console.log(d);
          let { markers } = d;
          markers.forEach(item => {
            item.iconPath = "/images/marker.png";
          })
          prevPage.setData({ markers });
          console.log(markers+"===");
          prevPage.showMarkerInfo(markers[0]);
          prevPage.changeMarkerColor(0);
        })
        .catch(e => {
          console.log(e);
        })
    }
    
    let url = `/pages/index/index`;
    //wx.switchTab({ url });
    //wx.navigateTo({url:url});
    wx.navigateBack({
      url: url,
    })
  }
});
