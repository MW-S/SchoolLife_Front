/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const projectRouter = {
  path: '/parking',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Parking',
  meta: {
    title: 'Parkings',
    icon: 'chart'
  },
  children: [
    {
      path: 'order',
      component: () => import('@/views/parking/order'),
      name: 'ParkingOrderList',
      meta: { title: 'ParkingOrder List', noCache: true }
    },
    {
      path: 'index',
      component: () => import('@/views/parking/index'),
      name: 'ParkingList',
      meta: { title: 'Parking List', noCache: true }
    },
    {
      path: 'car',
      component: () => import('@/views/car/index'),
      name: 'CarList',
      meta: { title: 'Car List', noCache: true }
    }
  ]
}

export default projectRouter
