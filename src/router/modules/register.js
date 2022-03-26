/** When your routing table is too long, you can split it into small modules**/

// import Layout from '@/layout'

const registerRouter = {
  path: '/register',
  // component: Layout,
  redirect: 'noRedirect',
  hidden: true,
  name: 'Register',
  meta: {
    title: 'Register',
    icon: 'table'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/register/index'),
      name: 'RegisterPage',
      meta: { title: 'Register Page', noCache: true }
    }
  ]
}

export default registerRouter
