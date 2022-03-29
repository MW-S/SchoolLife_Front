/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const projectRouter = {
  path: '/food',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Food',
  meta: {
    title: 'Foods',
    icon: 'chart'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/food/index'),
      name: 'FoodList',
      meta: { title: 'Food List', noCache: true }
    }
  ]
}

export default projectRouter
