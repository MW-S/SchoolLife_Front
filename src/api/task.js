import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/task/getList',
    method: 'get',
    params: query
  })
}

export function fetchTask(id) {
  return request({
    url: '/task/getById',
    method: 'get',
    params: { id }
  })
}

export function updateTask(data) {
  return request({
    url: '/task/update',
    method: 'post',
    data
  })
}

export function createTask(data) {
  return request({
    url: '/task/add',
    method: 'post',
    data
  })
}

export function delTask(data) {
  return request({
    url: '/task/del',
    method: 'post',
    data
  })
}

export function Upload(data) {
  return request({
    url: '/upload',
    method: 'post',
    ContentType: 'multipart/form-data',
    data
  })
}
