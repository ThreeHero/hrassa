// 权限管理的路由规则
import Layout from '@/layout'

export default {
  // 路由规则
  path: '/permission', // 路径
  name: 'permissions', // 给路由规则加一个name
  component: Layout, // 组件
  children: [{
    path: '',
    name: 'permissions',
    component: () => import('@/views/permission'),
    meta: {
      title: '权限管理',
      icon: 'lock'
    }
  }]
}
