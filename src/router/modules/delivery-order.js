/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const projectRouter = {
  path: '/deliveryOrder',
  component: Layout,
  redirect: 'noRedirect',
  name: 'DeliveryOrder',
  meta: {
    title: 'DeliveryOrders',
    icon: 'chart'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/delivery-order/index'),
      name: 'DeliveryOrderList',
      meta: { title: 'DeliveryOrder List', noCache: true }
    }
  ]
}

export default projectRouter
