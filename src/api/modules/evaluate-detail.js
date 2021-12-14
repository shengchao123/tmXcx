import request from '../request'
import { urls } from '../urls'

export function getItineraryEvaluationInfoById (params) {
  return request({
    url: urls.getItineraryEvaluationInfoById,
    needlessToken: true,
    data: {
      ...params
    }
  })
}

export function getItineraryEvaluationPage (params) {
  return request({
    url: urls.getItineraryEvaluationPage,
    needlessToken: true,
    data: {
      ...params
    }
  })
}

