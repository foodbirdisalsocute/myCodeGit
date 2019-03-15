//index.js
//获取应用实例
let app = getApp();
let amap = require("../../utils/amap");
var amapFile = require('../../utils/amap-wx.js');
let markersData = [];
Page({
  data: {
    hiddenParkInfo: true,
    markers: [],
    polyline: [],
    latitude: '',
    longitude: '',
    textData: {},
    city: '',
    distance: '1.2km',
    markerId: 0,
    clickMark:true,
    // controls: [
    //   {
    //     id: 0,
    //     position: {
    //       left: 300,
    //       top: 24,
    //       width: 88,
    //       height: 88
    //     },
    //     iconPath: "../../image/map_pay_fee_icon.png",
    //     clickable: true
    //   }
    // ]
  },
  onLoad(e) {
    amap.getRegeo()
      .then(d => {

        let { name, desc, latitude, longitude } = d[0];
        let { city } = d[0].regeocodeData.addressComponent;
        this.setData({
          city,
          latitude,
          longitude,
          textData: { name, desc }
        })
        console.log("######");
        console.log(d);
        console.log("######");
      })

    amap.getPoiAround("停车场")
      .then(d => {
        console.log("%%%%%%%%%%");
        console.log(d);
        let { markers } = d;
        markers.forEach(item => {
          item.iconPath = "../../image/map_park_icon.png";

        })
        this.setData({ markers });
        console.log(markers + "===");
        //  this.showMarkerInfo(markers[0]);
        //  this.changeMarkerColor(0);
      })

      .catch(e => {
        console.log(e);
      })
  },
  orderNow() {
    wx.navigateTo({
      url: '/pages/parkingDetail/parkingDetail',
    })
  },
  bindInput() {
    let { latitude, longitude, city } = this.data;
    let url = `/pages/inputtip/inputtip?city=${city}&lonlat=${longitude},${latitude}`;
    wx.navigateTo({ url });
  },
  makertap(e) {
    this.setData({
      clickMark:false
    })
    this.setData({ hiddenParkInfo: false });
    // console.log(e);
    let { markerId } = e;
    let { markers } = this.data;
    let marker = markers[markerId];
    // console.log(marker);
    this.showMarkerInfo(marker);
    this.changeMarkerColor(markerId);
  },
  showMarkerInfo(data) {

    console.log("AAAA");
    this.getDistance();

    let { name, address: desc } = data;
    this.setData({
      textData: { name, desc }
    })
  },
  changeMarkerColor(markerId) {
    let { markers } = this.data;
    markers.forEach((item, index) => {
      item.iconPath = "../../image/map_park_icon.png";
      if (index == markerId) item.iconPath = "../../image/map_park_destination_icon.png";
    })
    this.setData({ markers, markerId });
  },
  getRoute() {
    // 起点
    let { latitude, longitude, markers, markerId, city, textData } = this.data;
    let { name, desc } = textData;
    if (!markers.length) return;
    // 终点
    let { latitude: latitude2, longitude: longitude2 } = markers[markerId];
    let url = `/pages/routes/routes?longitude=${longitude}&latitude=${latitude}&longitude2=${longitude2}&latitude2=${latitude2}&city=${city}&name=${name}&desc=${desc}`;
    console.log(this.data);
    console.log("22222222222");
    wx.navigateTo({ url });
  },


  getDistance() {
    // 起点
    let { latitude, longitude, markers, markerId, city, textData } = this.data;
    let { name, desc } = textData;
    if (!markers.length) return;
    // 终点
    let { latitude: latitude2, longitude: longitude2 } = markers[markerId];

    console.log("$$$$$");

    console.log("$$$$$");

    let origin = `${longitude},${latitude}`;
    let destination = `${longitude2},${latitude2}`;
    amap.getRoute(origin, destination, "getDrivingRoute", city)
      .then(d => {

        this.setRouteData(d, "getDrivingRoute");
        // var myAMapWX = new amapFile.AMapWX({ key:'b73e03fb764559299e635c02af5cd566'});
        // var _this = this;
        // console.log(">>>>>>>>>>>>>");
        // myAMapWX.getDrivingRoute({
        //   origin: {longitude} + ',' + {latitude},
        //   destination: {longitude2} + ',' + {latitude2},
        //   success: function (d) {
        //     console.log("oooooooooooo");
        //     console.log({ longitude } + ',' + { latitude });
        //     console.log({ longitude2 } + ',' + { latitude2 });
        //     var points = [];
        //     if (d.paths && d.paths[0] && d.paths[0].steps) {
        //       var steps = d.paths[0].steps;
        //       for (var i = 0; i < steps.length; i++) {
        //         var poLen = steps[i].polyline.split(';');
        //         for (var j = 0; j < poLen.length; j++) {
        //           points.push({
        //             longitude: parseFloat(poLen[j].split(',')[0]),
        //             latitude: parseFloat(poLen[j].split(',')[1])
        //           })
        //         }
        //       }
        //     }
        //     _this.setData({
        //       polyline: [{
        //         points: points,
        //         color: "#0091ff",
        //         width: 6
        //       }]
        //     });






        //   },
        //   fail: function (info) {

        //   }

        // })
        // console.log(">>>>>>>>>>>>>");

      })

      .catch(e => {
        console.log(e);
      })
  },
  // drawPolyline(d){
  //   console.log("#?##?#?ASDASDA#");

  //   success(d) {
  //     console.log("#?##?#?#");
  //     let points = [];
  //     if (d.paths && d.paths[0] && d.paths[0].steps) {
  //       let steps = d.paths[0].steps;
  //       wx.setStorageSync("steps", steps);
  //       steps.forEach(item1 => {
  //         let poLen = item1.polyline.split(';');
  //         poLen.forEach(item2 => {
  //           let obj = {
  //             longitude: parseFloat(item2.split(',')[0]),
  //             latitude: parseFloat(item2.split(',')[1])
  //           }
  //           points.push(obj);

  //         })
  //       })
  //     }
  //     this.setData({
  //       polyline: [{
  //         points: points,
  //         color: "#0091ff",
  //         width: 6,
  //         arrowLine: true
  //       }]
  //     });
  //   }

  // },
  setRouteData(d, type) {



    console.log(this.data.polyline);

    if (type == "getDrivingRoute") {
      if (d.paths[0] && d.paths[0].distance) {
        console.log(d.paths[0].distance + 'm');
        this.setData({
          distance: d.paths[0].distance + 'm'
        });
      }
    }
    // console.log({distance});
  },





















  clickcontrol(e) {
    console.log("缴费");
    // let { controlId } = e;
    // let mpCtx = wx.createMapContext("map");
    // mpCtx.moveToLocation();
    wx.navigateTo({
      url: '/pages/park/park',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  mapchange() {
    // console.log("改变视野");
  }
})
