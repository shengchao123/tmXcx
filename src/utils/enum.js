export const playTimeOptions = Object.freeze([
  { id: '01', name: '半天' },
  { id: '02', name: '1天' },
  { id: '03', name: '2天' },
  { id: '04', name: '3天' }
])

export const activityTypeOptions = Object.freeze([
  { id: '01', name: '党员活动' },
  { id: '02', name: '学习教育' },
  { id: '03', name: '观光游览' },
  { id: '04', name: '其他' }
])

export const needLifeDocumentaryOptions = Object.freeze([
  { id: true, name: '需要' },
  { id: false, name: '不需要' },
])

export const transportationOptions = Object.freeze([
  { id: '07', name: '初心之旅·共富巴士', hasIcon: true, singleLine: true },
  { id: '01', name: '包车' },
  { id: '04', name: '自驾' },
  { id: '02', name: '公共交通', hasIcon: true },
  { id: '03', name: '自行前往' },
  { id: '05', name: '骑行' },
  { id: '06', name: '步行' },
])
// 适宜人群
export const appropriateCrowdOptions = [
  { id: '01', name: '研学团队', isSelected: false },
  { id: '02', name: '散客', isSelected: false }
]
// 服务内容
export const serviceContentOptions = [
  { id: '01', name: '摄影摄像', isSelected: false },
  { id: '02', name: '酒店服务', isSelected: false },
  { id: '03', name: '游乐设施', isSelected: false },
  { id: '04', name: '研学', isSelected: false },
  { id: '05', name: '森林疗愈', isSelected: false },
  { id: '06', name: '手工坊', isSelected: false },
  { id: '07', name: '酒吧', isSelected: false },
  { id: '08', name: '观影', isSelected: false },
  { id: '09', name: '草坪活动', isSelected: false },
  { id: '09', name: '体验', isSelected: false },
  { id: '09', name: '参观', isSelected: false },
]

export const playTimeNameMap = new Map([
  ['01', '半天'],
  ['02', '1天'],
  ['03', '2天'],
  ['04', '3天'],
])

export const activityNameMap = new Map([
  ['01', '党员活动'],
  ['02', '学习教育'],
  ['03', '观光游览'],
  ['04', '其他'],
])

export const transportationNameMap = new Map([
  ['01', '包车'],
  ['02', '公共交通'],
  ['03', '自行前往'],
  ['04', '自驾'],
  ['05', '骑行'],
  ['06', '步行'],
])

// 状态 (01:报名中; 02:进行中; 03:已结束)
export const statusMap = Object.freeze(new Map([
  ['01', { text: '报名中', color: '#F54000' }],
  ['02', { text: '进行中', color: '#FFB319' }],
  ['03', { text: '已结束', color: '#999999' }],
]))

export const resourceSubTabs = Object.freeze([
  {
    status: '01',
    text: '房产商铺'
  },
  {
    status: '02',
    text: '土地林地'
  },
  {
    status: '03',
    text: '农产品'
  },
  {
    status: '04',
    text: '其它'
  }
])
