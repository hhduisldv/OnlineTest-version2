import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state : {
 
  flag: false, 
  userInfo: null,
  menu: [{
    index: '1',
    title: '考试管理',
    icon: 'icon-kechengbiao',
    content:[{item1:'考试查询',path:'/selectExam'},{item2:'添加考试',path:'/addExam'},{path:'/selectAnswer'},{path:'/addAnswerChildren'}],
  },
 
  
  {
    index: '2',
    title: '成绩查询',
    icon: 'icon-performance',
    content:[{item1:'学生成绩查询',path:'/allStudentsGrade'},{path: '/grade'}],
  },
 
  
      
],
},
  mutations : {
  practice(state,status) {
    state.isPractice = status
  },
  toggle(state) {
    state.flag = !state.flag
   },
  changeUserInfo(state,info) {
    state.userInfo = info
  }
},
  getters : {
 
},
  actions : {
  getUserInfo(context,info) {
    context.commit('changeUserInfo',info)
  },
  getPractice(context,status) {
    context.commit('practice',status)
  }
},
})
export default store