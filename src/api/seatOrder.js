import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/seat/getOrderList',
    method: 'get',
    params: query
  })
}

export function getById(id) {
  return request({
    url: '/car/getOrderById',
    method: 'get',
    params:  id 
  })
}

export function save(data) {
  return request({
    url: '/car/saveOrder',
    method: 'post',
    data
  })
}


export function delByIds(ids) {
  return request({
    url: '/car/delOrderByIds',
    method: 'post',
    ids
  })
}
