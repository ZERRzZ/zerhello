import VueRouter from 'vue-router'

import AboutPage from '../pages/AboutPage'
import HomePage from '../pages/HomePage'
import NewsPage from '../pages/NewsPage'
import MessagePage from '../pages/MessagePage'
import MessageDetail from '../pages/MessageDetail'

const routes = [
  {
    path: '/about',
    component: AboutPage,
    meta: {
      title: '关于'
    }
  },
  {
    path: '/home',
    component: HomePage,
    meta: {
      title: '主页'
    },
    children: [
      {
        path: 'news',
        component: NewsPage,
        meta: {
          isAuth: true,
          title: '新闻'
        }
      },
      {
        path: 'message',
        component: MessagePage,
        meta: {
          isAuth: true,
          title: '消息'
        },
        children: [
          {
            path: 'detail/:id/:title',
            component: MessageDetail,
            meta: {
              isAuth: true,
              title: '消息细节'
            },
            props: true
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({ routes })

// 全局放置路由守卫 - 初始化时被调用, 每次切换前被调用
router.beforeEach((to, from, next) => {
  console.log(to, from)
  // 当跳转到 news 或 message 时判断本地缓存中学校名字
  if (to.meta.isAuth) {
    if (localStorage.getItem('school') === 'xxx') {
      next()
    } else {
      alert('无权限!')
    }
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  console.log(to, from)
  document.title = to.meta.title || 'demo'
})

export default router