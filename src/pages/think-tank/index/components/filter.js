 /**
    * js如何判断一组数字是否连续
    * 示例
    * arr = [3, 4, 13 ,14, 15, 17, 20, 22];
    * 判断一组数字是否连续,得到一个临时数组
    * [[3,4],[13,14,15],[17],[20],[22]];
    */
export function filterWeek (arr) {
  const weekStrList = ['-', '周一', '周二', '周三', '周四', '周五', '周六', '周日']
  const result = []
  let tmp
  // eslint-disable-next-line no-cond-assign
  while (tmp = arr.shift()) {
    if (result.length === 0) {
      result.push([tmp]); continue
    }
    const e = result[result.length - 1]
    if (tmp === e[e.length - 1] + 1) {
      e.push(tmp)
    } else {
      result.push([tmp])
    }
  }
  const newArr = []
  result.forEach((el2) => {
    if (el2.length > 2) {
      newArr.push(weekStrList[el2[0]] + '至' + weekStrList[el2[el2.length - 1]])
    } else if (el2.length === 2) {
      newArr.push(...[weekStrList[el2[0]], weekStrList[el2[1]]])
    } else {
      newArr.push(weekStrList[el2])
    }
  })
  return newArr.join('、')
}