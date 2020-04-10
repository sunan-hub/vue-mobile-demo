// 动态路由表
const Main = () => import(/* webpackChunkName: 'main' */ '@/views/main')
const Home = () => import(/* webpackChunkName: 'home' */ '@/views/home')
const Affairs = () => import(/* webpackChunkName: 'affairs' */ '@/views/affairs')
const Qrcode = () => import(/* webpackChunkName: 'qrcode' */ '@/views/qrcode')
const Life = () => import(/* webpackChunkName: 'life' */ '@/views/life')
const Center = () => import(/* webpackChunkName: 'center' */ '@/views/center')

export default [
  {
    path: '/',
    component: Main,
    children: [
      {
        path: '',
        name: 'home',
        component: Home,
        props: true,
        meta: {
          title: '首页'
        }
      },
      {
        path: 'affairs',
        name: 'affairs',
        component: Affairs,
        props: true,
        meta: {
          title: '办事'
        }
      },
      {
        path: 'qrcode',
        name: 'qrcode',
        component: Qrcode,
        props: true,
        meta: {
          title: '扫码'
        }
      },
      {
        path: 'life',
        name: 'life',
        component: Life,
        props: true,
        meta: {
          title: '生活'
        }
      },
      {
        path: 'center',
        name: 'center',
        component: Center,
        props: true,
        meta: {
          title: '我的'
        }
      }
    ]
  }
]
