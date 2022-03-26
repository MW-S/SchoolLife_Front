/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const userRouter = {
  path: '/user',
  component: Layout,
  redirect: 'noRedirect',
  name: 'User',
  meta: {
    title: 'User',
    icon: 'chart'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/user/index'),
      name: 'UserList',
      meta: { title: 'User List', noCache: true }
    }
  ]
}

export default userRouter
