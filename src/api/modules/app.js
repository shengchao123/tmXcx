import { urls } from '../urls'
import { getFullUrl } from '@/utils/tools.js'


// type: 2: 图片，3: 视频，4: 音频
export function uploadFile (params, url = urls.uploadFile) { // 上传图片
  const temConfig = {
    header: {
      'Content-Type': 'multipart/form-data',
      // authToken: getGlobalParams('token'),
      // masterOrgId: getGlobalParams('masterOrgId'),
      // moduleCode: getGlobalParams('moduleCode'),
      // appCode: getGlobalParams('appCode')
    }
  }
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: url, //仅为示例，非真实的接口地址
      name: 'files',
      filePath: params.file,
      fileType: params.fileType,
      ...temConfig,
      formData: {
        'loginName': uni.getStorageSync('thirdUserId'),
        'orgId': uni.getStorageSync('orgId'),
        'grant_type': 'password',
        'appid': 'mobileWCOA',
        'type': params.type
      },
      success: (response) => {
        const res = JSON.parse(response.data)
        if (res.code === 10000) {
          resolve(res.content)
        } else {
          resolve({
            isError: true,
            message: res.message,
            subCode: res.subCode
          })
        }
      }
    })
  })
}

// 上传头像
export function uploadAvatar (file, url = urls.uploadAvatar) { // 上传头像
  return new Promise((resolve, reject) => {
    const headers = {
      'ContentType': 'multipart/form-data',
    }
    uni.uploadFile({
      url: getFullUrl(urls.uploadAvatar),
      name: 'files',
      filePath: file,
      header:headers,
      fileType: 'image',
      success: (response) => {
        const res = JSON.parse(response.data)
        if (res.code === 10000) {
          resolve(res.content)
        } else {
          resolve({
            isError: true,
            message: res.message,
            subCode: res.subCode
          })
        }
      }
    })
  })
}

