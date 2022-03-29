/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const projectRouter = {
  path: '/dormitory',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Dormitory',
  meta: {
    title: 'Dormitorys',
    icon: 'chart'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/dormitory/index'),
      name: 'DormitoryList',
      meta: { title: 'Dormitory List', noCache: true }
    }
  ]
}

export default projectRouter
