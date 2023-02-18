// 我的试卷页面
<template>
  <div id="myExam">
    <div class="title">点击历史成绩可查看数据</div>
    <div class="wrapper">
      <ul class="top">
        <li class="order">我的试卷</li>
        
      </ul>
      <ul class="paper" v-loading="loading">
        <li class="item" v-for="(item,index) in allExam" :key="index">
          <h4 @click="toExamMsg(item.testid,item.cid)">{{item.cname}}</h4>
          <p class="name">{{item.cname}}-{{item.introduction}}</p >
          <div class="info">
            <i class="el-icon-loading"></i><span>{{item.startDate.substr(0,10)}}</span>
            <i class="iconfont icon-time"></i><span v-if="item.duration != null">限时{{item.duration}}分钟</span>
            <i class="iconfont icon-fenshu"></i><span>满分{{item.totalScore}}分</span>
            <i class="history"  @click="getScoreInfo(item.cid)"><span>历史成绩</span>
           
            </i>
          </div>
        </li>
      </ul>
      <el-dialog
      title="历史最高分"
      :visible.sync="dialogVisible"
      width="30%"
      >
      <span>您该门课程的历史最高成绩为：{{history.score}}分</span>
      <span><el-button @click="dialogVisible = false">关 闭</el-button></span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  // name: 'myExam'
  data() {
    return {
      loading: false,
      key: null, //搜索关键字
      allExam: null, //所有考试信息
      dialogVisible:false,
      history:{
        score:0
      }
    }
  },
  created() {
    this.getExamInfo()
    
    this.loading = true
  },
  methods:{
    //获取当前所有考试信息
    getExamInfo() {
      let userId = this.$cookies.get("cid")
      this.$axios({
        url:'/springboot/student/find_test',
        method:'post',
        data:JSON.stringify({
          id:userId
        })
      }).then(res => {
        let resData = res.data
        
        this.loading = false
        this.allExam = resData
      }).catch(error => {
        console.log(error)
      })
    },
    getScoreInfo(cid) {
      let userId = this.$cookies.get("cid")
      this.dialogVisible = true
      this.$axios({
        url:'/springboot/student/find_score',
        method:'post',
        data:JSON.stringify({
          id_1:userId,
          id_2:cid
          
        })
      }).then(res => {
        let resData = res.data
        console.log(resData)
        this.history.score = resData
        
      }).catch(error => {
        console.log(error)
      })
    },
    //跳转到试卷详情页
    toExamMsg(testid,cid) {
      this.$router.push({path: '/examMsg', query: {testid: testid,cid: cid}})
      console.log(testid)
    }
  }
}
</script>

<style lang="less" scoped>

.paper {
  h4 {
    cursor: pointer;
  }
}
.paper .item a {
  color: #000;
}
.wrapper .top .order {
  cursor: pointer;
}
.wrapper .top .order:hover {
  color: #0195ff;
  border-bottom: 2px solid #0195ff;
}
.wrapper .top .order:visited {
  color: #0195ff;
  border-bottom: 2px solid #0195ff;
}
.item .info i {
  margin-right: 5px;
  color: #0195ff;
}
.item .info span {
  margin-right: 14px;
}
.paper .item {
  width: 380px;
  border-radius: 4px;
  padding: 20px 30px;
  border: 1px solid #eee;
  box-shadow: 0 0 4px 2px rgba(217,222,234,0.3);
  transition: all 0.6s ease;
}
.paper .item:hover {
  box-shadow: 0 0 4px 2px rgba(140, 193, 248, 0.45);
  transform: scale(1.03);
}
.paper .item .info {
  font-size: 14px;
  color: #88949b;
}
.paper .item .name {
  font-size: 14px;
  color: #88949b;
}
.paper * {
  margin: 20px 0;
}
.wrapper .paper {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.top .el-icon-search {
  position: absolute;
  right: 10px;
  top: 10px;
}
.history {
  cursor:pointer;
}
.top .icon {
  position: relative;
}
.wrapper .top {
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
}
#myExam .search-li {
  margin-left: auto;
}
.top .search-li {
  margin-left: auto;
}
.top li {
  display: flex;
  align-items: center;
}
.top .search {
  margin-left: auto;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #eee;
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
}
.top .search:hover {
  color: #0195ff;
  border-color: #0195ff;
}
.wrapper .top {
  display: flex;
}
.wrapper .top li {
  margin: 20px;
}
#myExam {
  width: 980px;
  margin: 0 auto;
}
#myExam .title {
  margin: 20px;
}
#myExam .wrapper {
  background-color: #fff;
}
</style>