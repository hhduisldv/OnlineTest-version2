import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)





const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login', //登录界面
      component: () => import('@/components/common/login')
    },
    {
      path: '/teacher',
      component: () => import('@/components/teacher/index'),//路由安装在index
      children: [
        {
          path: '/', //首页默认路由
          component: () => import('@/components/teacher/hello')
        },
        {
          path: '/teacherManage',
          component: () => import('@/components/teacher/teacherManage')
        },
        {
          path: '/addExam',
          component: () => import('@/components/teacher/addExam')
        },
       
        {
          path: '/addAnswerChildren', //点击试卷跳转到添加题库页面
          component: () => import('@/components/teacher/addAnswerChildren')
        },
        {
          path: '/selectExam', //查询所有考试
          component: () => import('@/components/teacher/selectExam')
        },
        {
          path: '/selectAnswer',
          component: () => import('@/components/teacher/selectAnswer') 
        },
        {
          path: '/allStudentsGrade',
          component: () => import('@/components/teacher/allStudentsGrade')
        },
        {
          path: '/grade',
          component: () => import('@/components/teacher/grade')
        }
      ]
    },
    {
      path: '/student',
      component: () => import('@/components/student/index'),//路由安装在index
      children: [
        {path:"/",component: ()=> import('@/components/student/myExam')},//myExam在首页
        
        {path: '/studentManage', component: () => import('@/components/student/studentManage')},
        {path: '/examMsg', component: () => import('@/components/student/examMsg')},
       
        {path: '/answerScore', component: () => import('@/components/student/answerScore')},
        
      ]
    },
   {path: '/answer', component: () => import('@/components/student/answer')},
  ]
  
})
router.beforeEach((to, from, next) => {
  // 如果访问的是登录界面则直接放行
  if (to.path === '/') return next()
  //获取用户页面token信息
  let token = window.localStorage.getItem('token')
  console.log(token)
  //如果token数据为null则跳转到指定路径
  if (!token) return next("/")
  next()
})

export default router
