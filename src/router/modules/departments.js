// 组织架构的路由规则
import Layout from '@/layout'

export default {
  // 路由规则
  path: '/departments', // 路径
  name: 'departments', // 给路由规则加一个name
  component: Layout, // 组件
  children: [{
    path: '',
    name: 'departments',
    component: () => import('@/views/departments'),
    meta: {
      title: '组织架构',
      icon: 'tree'
    }
  }]
}
