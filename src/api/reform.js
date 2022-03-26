import request from '@/utils/request'
import serverUrl from '@/utils/server'

export function fetchList(query) {
  return request({
    url: '/reform/getList',
    method: 'get',
    params: query
  })
}

export function delReform(data) {
  return request({
    url: '/reform/del',
    method: 'post',
    data
  })
}
