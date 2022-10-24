// 员工的路由规则
import Layout from '@/layout'

export default {
  // 路由规则
  path: '/employees', // 路径
  name: 'employees', // 给路由规则加一个name
  component: Layout, // 组件
  children: [{
    path: '',
    name: 'employees',
    component: () => import('@/views/employees'),
    meta: {
      title: '员工管理',
      icon: 'people'
    }
  },
  {
    path: 'detail/:id',
    component: () => import('@/views/employees/detail.vue'),
    hidden: true, // 不在左侧菜单显示
    meta: {
      title: '员工详情' // 标记当前路由规则的中文名称 后续在做左侧菜单时 使用
    }
  },
  {
    path: 'print/:id', // 二级默认路由
    component: () => import('@/views/employees/print.vue'), // 按需加载
    hidden: true,
    meta: {
      title: '打印', // 标记当前路由规则的中文名称 后续在做左侧菜单时 使用
      icon: 'people'
    }
  }]
}
