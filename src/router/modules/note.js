/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const projectRouter = {
  path: '/note',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Note',
  meta: {
    title: 'Notes',
    icon: 'chart'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/note/index'),
      name: 'NoteList',
      meta: { title: 'Note List', noCache: true }
    }
  ]
}

export default projectRouter
