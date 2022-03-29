/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const projectRouter = {
  path: '/vindicate',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Vindicate',
  meta: {
    title: 'Vindicate',
    icon: 'chart'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/vindicate/index'),
      name: 'VindicateList',
      meta: { title: 'Vindicate List', noCache: true }
    }
  ]
}

export default projectRouter
