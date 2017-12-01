import Vue from 'vue'
import Router from 'vue-router'
import Continer from '@/views/Continer'
import Login from '@/views/Login'
import Markdown from '@/views/Markdown'
import ArticleList from '@/views/ArticleList'
import UserList from '@/views/UserList'
import UserForm from '@/views/UserForm'
import Home from '@/views/Home/Page'

Vue.use(Router)
export const menuRoutes = [
  {
    path: '/',
    component: Continer,
    name: 'Home',
    meta: {
      name: '首页'
    }
  },
  {
    path: '/article',
    component: Continer,
    name: 'Article',
    meta: {
      name: '文章管理'
    },
    children: [
      {
        path: 'list',
        component: ArticleList,
        name: 'ArticleList',
        meta: {
          name: '文章列表'
        }
      },
      {
        path: 'add',
        component: Markdown,
        name: 'Markdown',
        meta: {
          name: '发布文章'
        }
      }
    ]
  },
  {
    path: '/user',
    component: Continer,
    name: 'User',
    meta: {
      name: '用户管理'
    },
    children: [{
      path: 'list',
      component: UserList,
      name: 'UserList',
      meta: {
        name: '用户列表'
      }
    },
    {
      path: 'add',
      component: UserForm,
      name: 'UserForm',

      meta: {
        name: '添加用户'
      }
    }

    ]
  }
]
const loginRoute = {
  path: '/login',
  component: Login,
  name: 'Login',
  meta: {
    name: '登录'
  }
}

const homeRoute = {
  path: '/home',
  component: Home,
  name: 'Home',
  meta: {
    name: '首页'
  }
}
const routes = [loginRoute, homeRoute, ...menuRoutes]
export default new Router({
  routes
})