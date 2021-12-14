
const amapFile = require('./amap-wx.130 2');//如：..­/..­/libs/amap-wx.js
import config from '@/config.js'


// 地图中心
export const mapCenter = function () {
  return config.mapCenterPoints
}

export const myAmapFun = function () {
  return new amapFile.AMapWX({ key: 'd18f81e93fb83894b6820c769031c160' });
}
// 获取经纬度
export const beginGuide = function ({ lat, lng, name }) {
  console.log(lat, lng, name)
  uni.openLocation({
    // 传入你要去的纬度
    latitude: lat,
    // 传入你要去的经度
    longitude: lng,
    // 传入你要去的地址信息 不填则为空
    address: name,
    // 缩放大小
    scale: 18,
    success: function () {
      console.log('成功的回调success');
    }
  })
}
