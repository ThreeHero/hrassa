// 公司设置的路由规则
import Layout from '@/layout'

export default {
  // 路由规则
  path: '/setting', // 路径
  name: 'settings', // 给路由规则加一个name
  component: Layout, // 组件
  children: [{
    path: '',
    name: 'settings',
    component: () => import('@/views/setting'),
    meta: {
      title: '公司设置',
      icon: 'setting'
    }
  }]
}
