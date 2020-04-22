// 动态路由表

// isHideHeader 是否隐藏头部
// isShowTitleBorder 是否显示头部下边框

const Main = () => import(/* webpackChunkName: 'not-found' */ '@/views/main')
const NotFound = () => import(/* webpackChunkName: 'not-found' */ '@/views/not-found')
const NoLogin = () => import(/* webpackChunkName: 'no-login' */ '@/views/no-login')
const Home = () => import(/* webpackChunkName: 'home' */ '@/views/home')

export default [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/',
    component: Main,
    children: [
      {
        path: 'home',
        name: 'home',
        component: Home,
        props: true,
        meta: {
          title: '首页',
          isHideHeader: false
        }
      }
    ]
  },
  {
    path: '*',
    component: NotFound,
    meta: {
      title: 'not found'
    }
  },
  {
    path: '/no-login',
    component: NoLogin,
    meta: {
      title: 'not login'
    }
  }
]
