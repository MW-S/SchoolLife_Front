/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const projectRouter = {
  path: '/car',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Car',
  meta: {
    title: 'Cars',
    icon: 'chart'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/car/index'),
      name: 'CarList',
      meta: { title: 'Car List', noCache: true }
    }
  ]
}

export default projectRouter
