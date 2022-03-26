/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const taskRouter = {
  path: '/task',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Task',
  meta: {
    title: 'Tasks',
    icon: 'chart'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/task/index'),
      name: 'TaskList',
      meta: { title: 'Task List', noCache: true }
    }
  ]
}

export default taskRouter
