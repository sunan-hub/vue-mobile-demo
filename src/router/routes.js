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
        props: true
      },
      {
        path: 'affairs',
        name: 'affairs',
        component: Affairs,
        props: true
      },
      {
        path: 'qrcode',
        name: 'qrcode',
        component: Qrcode,
        props: true
      },
      {
        path: 'life',
        name: 'life',
        component: Life,
        props: true
      },
      {
        path: 'center',
        name: 'center',
        component: Center,
        props: true
      }
    ]
  }
]
