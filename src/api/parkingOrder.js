import request from '@/utils/request'
import qs from 'qs'

export function getList(query) {
  return request({
    url: '/parking/getOrderList',
    method: 'get',
    params: query
  })
}

export function getById(id) {
  return request({
    url: '/parking/getOrderById',
    method: 'get',
    params:  id 
  })
}

export function save(data) {
  return request({
    url: '/parking/saveOrder',
    method: 'post',
    data
  })
}


export function delByIds(ids) {
  return request({
    url: '/parking/delOrderByIds',
    method: 'post',
    params: ids,
    paramsSerializer: params => {
      return qs.stringify(params, {
        indices: false
      })
    }
  })
}
