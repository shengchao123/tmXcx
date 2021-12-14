// import AMap from 'AMap'
// const map = {
//   data () {
//     return {
//       $amap: null,
//     }
//   },
//   methods: {
//     // 绘制主要区域以外覆盖
//     drawDistrict () {
//       const that = this
//       AMap.plugin('AMap.DistrictSearch', function () {
//         new AMap.DistrictSearch({
//           extensions: 'all',
//           subdistrict: 0
//         }).search('临安区', function (status, result) {
//           // 外多边形坐标数组和内多边形坐标数组
//           var outer = [
//             new AMap.LngLat(-360, 90, true),
//             new AMap.LngLat(-360, -90, true),
//             new AMap.LngLat(360, -90, true),
//             new AMap.LngLat(360, 90, true)
//           ]
//           var holes = result.districtList[0].boundaries
//           var pathArray = [
//             outer
//           ]
//           pathArray.push.apply(pathArray, holes)
//           var polygon = new AMap.Polygon({
//             pathL: pathArray,
//             strokeColor: '#FD9124',
//             strokeWeight: 1.5,
//             fillColor: 'rgba(10,133,238,0.28)'
//           })
//           polygon.setPath(pathArray)
//           that.$amap.add(polygon)
//         })
//       })
//     }
//   },
//   mounted () {
//     this.$amap = new AMap.Map('map', this.mapInitObj)
//   }
// }

// export default map
