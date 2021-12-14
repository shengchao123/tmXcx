import { fileHost, imgHost } from '@/api/urls'
import config from '@/config'

export const getOffHeight = function (select, that) {
  uni.createSelectorQuery() //是在mounted() 之后使用的吗？ 我在mounted中 加了定时器，延时1秒 拿到了
  return new Promise((resolve, reject) => {
    var query = uni.createSelectorQuery().in(that)
    query.select(select).boundingClientRect(data => {
      console.log(data.height)
      resolve(data)
    })
  })
}

export const getCurrentRoute = function () {
  let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
  const { $page, route, options } = routes[routes.length - 1]
  return {
    route,
    options,
    fullPath: $page ? $page.fullPath : ''
  }
}

// 跳转h5页面
export const jumpWebview = function (title, url) {
  uni.navigateTo({ url: `/pages/webView?title=${title}&url=${url}` })
}

// 跳转h5页面
export const openDocument = function (url) {
  uni.downloadFile({
    url: fileHost + url,
    success: function (res) {
      var filePath = res.tempFilePath;
      uni.openDocument({
        filePath: filePath,
        success: function (res) {
          console.log('打开文档成功');
        }
      });
    }
  });
}
// 跳转h5页面
export const aliImg = function (url) {
  return imgHost + url
}

export const getAppid = function (res) {
  // #ifdef MP-WEIXIN
  return config.wxAppid
  // #endif
  // #ifdef MP-ALIPAY
  return config.aliAppid
  // #endif
  /* #ifdef MP-TOUTIAO */
  return config.ttAppid
  /* #endif */
}

export const getAdvChannelType = function () {
  // #ifdef H5
  return '01'
  // #endif
  // #ifdef MP-WEIXIN
  return '02'
  // #endif
  // #ifdef MP-ALIPAY
  return '03'
  // #endif
  /* #ifdef MP-TOUTIAO */
  return ''
  /* #endif */
}


export const getFullUrl = function (url) {
  let host = process.env.NODE_ENV === 'development' ? config.apiDevHost : config.apiProdHost
  /* #ifdef H5 */
  host = '/cb-api'
  /* #endif */
  return host + url

}


export const prePage = () => {
  let pages = getCurrentPages()
  let prePage = pages[pages.length - 2]
  // #ifdef H5
  return prePage
  // #endif
  return prePage.$vm
}


// 处理地址补全
export function dataComplete (prop, length) {
  return dataRightCompleting(length - prop.length, '0', prop)
}
export function dataRightCompleting (bits, identifier, value) {
  value = value + Array(bits + 1).join(identifier)
  return value
}

// 等级过多时,背景色显示最后一个
export function levelListData (listLength, sourceData, itemData) {
  if (listLength > sourceData.length) {
    const num = listLength - sourceData.length
    for (var i = 0; i < num; i++) {
      sourceData.push(itemData)
    }
  } else {
    sourceData.slice(0, listLength)
  }
  return sourceData
}


export function avatarUrl (url) {
  if (!url) return imgHost + 'user/img_avatar.png'
  return imgUrlDeal(url)
}

// 网络图片和阿里云素材库判断
export function imgUrlDeal (url) {
  if (!url) return imgHost + 'home/img_placeholder.png'
  return url.includes('http://') || url.includes('https://') ? url : fileHost + url
}

//减法
export function Subtr (arg1, arg2) {
  var r1, r2, m, n;
  try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2));
  n = (r1 >= r2) ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

export const calcRpx2px = function (size) {
  const info = uni.getSystemInfoSync()
  const scale = 750 / info.windowWidth;
  let s = Number.isNaN(parseFloat(size)) ? 0 : parseFloat(size)
  let u = size.toString().replace(/[0-9]/g, '').replace('-', '')
  if (u == 'rpx') {
    s /= scale
    u = 'px'
  } else if (u == '') {
    u = 'px'
  } else if (u == 'vw') {
    u = 'px'
    s = s / 100 * 750 / scale
  }
  return s + u
}

export const calcPx2Vh = function (num) {
  return num / uni.getSystemInfoSync().screenHeight * 100
}

// 按照字节长截取字符串
export function substringWithL (str, L) {
  var result = ''
  var strlen = str.length // 字符串长度
  if (strlen <= L) {
    return str
  } else {
    return str.substring(0, L) + '...'
  }
}


// 按照字节长截取字符串
export function subStringWithStrlen (str, L) {
  var result = ''
  var strlen = str.length // 字符串长度
  var chrlen = str.replace(/[^x00-\xff]/g, '**').length // 字节长度

  if (chrlen <= L) { return str }

  for (var i = 0, j = 0; i < strlen; i++) {
    var chr = str.charAt(i)
    if (/[x00-\xff]/.test(chr)) {
      j++ // ascii码为0-255，一个字符就是一个字节的长度
    } else {
      j += 2 // ascii码为0-255以外，一个字符就是两个字节的长度
    }
    if (j <= L) { // 当加上当前字符以后，如果总字节长度小于等于L，则将当前字符真实的+在result后
      result += chr
    } else { // 反之则说明result已经是不拆分字符的情况下最接近L的值了，直接返回
      return result + '...'
    }
  }
}
export function debounce (fn, delay) {
  let timer = null //借助闭包
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(fn, delay) // 简化写法
  }
}

export function throttle (fn, delay) {
  let valid = true
  return function () {
    if (!valid) {
      //休息时间 暂不接客
      return false
    }
    // 工作时间，执行函数并且在间隔期内把状态位设为无效
    valid = false
    setTimeout(() => {
      fn()
      valid = true;
    }, delay)
  }
}

export const msg = (title, icon = 'none', duration = 1500, mask = false) => {
  //统一提示方便全局修改
  if (Boolean(title) === false) {
    return
  }
  uni.showToast({
    title,
    duration,
    mask,
    icon
  })
}

export function getUrlParam (url, name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') //构造一个含有目标参数的正则表达式对象
  var r = url.match(reg) //匹配目标参数
  if (r != null) {
    return decodeURIComponent(r[2])
  }
  return null //返回参数值
}

//保留小数位，不进行四舍五入操作  取固定小数位  num 数字  decimal  固定小数位
export function formatDecimal (num, decimal) {
  num = num.toString()
  let index = num.indexOf('.')
  if (index !== -1) {
    num = num.substring(0, decimal + index + 1)
  } else {
    num = num.substring(0)
  }
  return parseFloat(num).toFixed(decimal)
}

export function replaceString (any, keyValues) {
  let _any = JSON.stringify(any)
  keyValues.forEach(item => {
    let rex = new RegExp(item.key, 'g')
    _any = _any.replace(rex, item.value)
  })
  return JSON.parse(_any)
}

export function swapArr (arr, index1, index2) {
  const _arr = JSON.parse(JSON.stringify(arr))
  _arr[index1] = _arr.splice(index2, 1, _arr[index1])[0];
  return _arr;
}
export function dateTimeOptions () {
  const nowDate = new Date()
  const nowYear = nowDate.getFullYear()
  const nowMonth = nowDate.getMonth() + 1
  const nowDay = nowDate.getDay()

  const bigMonth = [1, 3, 5, 7, 8, 10, 12]
  const smallMonth = [4, 6, 9, 11]
  const specialMonth = 2

  const renderItem = (value, unit, children) => {
    let label = value + unit
    if (value < 10) {
      label = '0' + label
    }
    return {
      value,
      label,
      children,
    }
  }

  const minutes = Array.from(Array(60), (v, k) => renderItem(k, '分'))

  const hours = Array.from(Array(23), (v, k) => renderItem(k, '时'))

  const times = hours.map(hour => {
    hour.children = minutes
    return hour
  })

  const day28 = Array.from(Array(28), (v, k) => renderItem(k + 1, '日', times))

  const day30 = Array.from(Array(30), (v, k) => renderItem(k + 1, '日', times))

  const day31 = Array.from(Array(31), (v, k) => renderItem(k + 1, '日', times))

  const months = Array.from(Array(12), (v, k) => renderItem(k + 1, '月'))

  const years = Array.from(Array(5), (v, k) => k + nowYear)

  const monthOption = months.map(month => {
    const { value } = month
    if (bigMonth.includes(value)) {
      month.children = JSON.parse(JSON.stringify(day31))
    }
    if (smallMonth.includes(value)) {
      month.children = JSON.parse(JSON.stringify(day30))
    }
    if (value === specialMonth) {
      month.children = JSON.parse(JSON.stringify(day28))
    }
    return month
  })
  return years.map(year => {
    // TODO: 月份处理 不能选以前的时间
    const children = JSON.parse(JSON.stringify(monthOption))
    // if (year === nowYear) {

    // }
    return {
      value: year,
      label: year + '年',
      children: children,
    }
  })
}

// 网络图片和阿里云素材库判断
export function sourceUrl (url) {
  if (!url) return
  return url.includes('http://') || url.includes('https://') ? url : fileHost + url
}
