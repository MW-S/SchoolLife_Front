/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const projectRouter = {
  path: '/seat',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Seat',
  meta: {
    title: 'Seats',
    icon: 'chart'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/seat/index'),
      name: 'SeatList',
      meta: { title: 'Seat List', noCache: true }
    },
    {
      path: 'order',
      component: () => import('@/views/seat/order'),
      name: 'SeatOrderList',
      meta: { title: 'SeatOrder List', noCache: true }
    }
  ]
}

export default projectRouter
