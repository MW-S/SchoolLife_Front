/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const reformRouter = {
  path: '/reform',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Reform',
  meta: {
    title: 'Reforms',
    icon: 'table'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/reform/index'),
      name: 'ReformList',
      meta: { title: 'Reform List', noCache: true }
    }
  ]
}

export default reformRouter
