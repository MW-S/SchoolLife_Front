/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const projectRouter = {
  path: '/project',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Project',
  meta: {
    title: 'Projects',
    icon: 'chart'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/project/index'),
      name: 'ProjectList',
      meta: { title: 'Project List', noCache: true }
    }
  ]
}

export default projectRouter
