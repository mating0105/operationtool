import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login/index.vue'
import personChangeManage from '@/pages/vehicleLoan/personChangeManage'
import personChangeManage2 from '@/pages/vehicleLoan/personChangeManage2'
import homePage from '@/pages/homePage/index.vue'
import layout from '@/layout/Layout.vue'

Vue.use(Router)

export const constantRouterMap = [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    //首页
    {
        path: '/',
        component: layout,
        name: 'dashboard',
        redirect:'/dashboard',
        children:[
            {
                path: 'dashboard',
                name: 'homePage',
                component: homePage,
                meta:{title:'首页'},
            },
        ]
    },
    //车贷系统
    {
        path: '/',
        name: 'vehicleLoan',
        component: layout,
        meta:{title:'车贷系统'},
        children:[
            {
                path: 'personChangeManage',
                name: 'personChangeManage',
                component: personChangeManage,
                meta:{title:'人员异动管理'},
            },
            {
                path: 'personChangeManage2',
                name: 'personChangeManage2',
                component: personChangeManage2,
                meta:{title:'人员异动管理'},
            },
        ]
    },
    //personChangeManage2
  ]
export const router = new Router({
    routes: constantRouterMap,
    scrollBehavior: () => ({y: 0})
})
