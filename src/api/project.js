import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/project/getList',
    method: 'get',
    params: data
  })
}

export function fetchProject(id) {
  return request({
    url: '/project/getById',
    method: 'get',
    params: { id }
  })
}

export function fetchUsers(id) {
  return request({
    url: '/task/getUserListByProjectId',
    method: 'get',
    params: { id }
  })
}

export function updateProject(data) {
  return request({
    url: '/project/update',
    method: 'post',
    data
  })
}

export function joinProject(data) {
  return request({
    url: '/project/join',
    method: 'post',
    data
  })
}

export function createProject(data) {
  return request({
    url: '/project/add',
    method: 'post',
    data
  })
}

export function delProject(data) {
  return request({
    url: '/project/del',
    method: 'post',
    data
  })
}
