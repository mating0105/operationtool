// router配置
import { router } from '@/router'
import store from '@/store' //用于控制角色显示菜单（暂未使用）
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message, Notification } from 'element-ui'

const hasPermission = (roles, permissionRoles) => {
    if (roles && roles.length > 0) return true
    if (!permissionRoles) return true
    return roles.some(role => permissionRoles.indexOf(role) !== -1)
}
const whiteList = [
    '/login',
]

router.beforeEach(async (to, from, next) => {
    if (whiteList.indexOf(to.path) !== -1) {
        next()
        return;
    }
    if (sessionStorage.getItem('userData') == null && to.path !== '/login') {//新开窗口 且 不是到登录页时
        Message({
            type:'error',
            message:'登录已失效，请重新登录！'
        })
        next({path: '/login'})
    }
    else if (sessionStorage.getItem('userData')) {
        if (to.path === '/login') {
            next({path: '/'})
            nprogress.done()
        } else {
            next()
            Notification.closeAll();
            nprogress.done()
        }
    }
    else {
        next()
        nprogress.done() // 如果当前页是 login 则路由不会触发 after 钩子函数，需要手动处理
    }
})

router.afterEach(() => {
    nprogress.done()
})
