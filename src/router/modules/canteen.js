/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const projectRouter = {
  path: '/canteen',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Canteen',
  meta: {
    title: 'Canteens',
    icon: 'chart'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/canteen/index'),
      name: 'CanteenList',
      meta: { title: 'Canteen List', noCache: true }
    }
  ]
}

export default projectRouter
