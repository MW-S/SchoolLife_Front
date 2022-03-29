/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const projectRouter = {
  path: '/goods',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Goods',
  meta: {
    title: 'Goods',
    icon: 'chart'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/goods/index'),
      name: 'Goods',
      meta: { title: 'Goods List', noCache: true }
    }
  ]
}

export default projectRouter
