       m<template>
  <div id="msg">
    <div class="title">
      <span>考试课程：</span>
      <span> {{examData.cname}}</span>
    </div>
    <div class="wrapper">
      <ul class="top">
        <li class="example">{{examData.cname}}</li>
        <li><i class="iconfont icon-pen"></i></li>
        <li><i class="iconfont icon-share"></i></li>
        <li class="right">
          <div>
            <span class="count">总分</span>
            <span class="score">{{examData.totalScore}}</span>
          </div>
        </li>
      </ul>
      <ul class="bottom">
        <li>更新于{{examData.startDate}}</li>
        <li>简介：{{examData.introduction}}</li>
        
        <li class="right"><el-button @click="toAnswer(examData.testid,examData.cid)">开始答题</el-button></li>
      </ul>
      
    </div>
    <div class="content">
      <el-collapse v-model="activeName" >
        <el-collapse-item class="header" name="0">
          <template slot="title" class="stitle" >
            <div class="title">
              <span>{{examData.cid}}</span><i class="header-icon el-icon-info"></i>
              <span class="time">{{examData.totalScore}}分 / {{examData.duration}}分钟</span>
              
            </div>
          </template>
         
        </el-collapse-item>
        
      </el-collapse>
    </div>
   
  </div>
</template>

<script>
export default {
  data() {
    return {
     
      activeName: '0',  //默认打开序号
      
      score: [],  //每种类型分数的总数
      examData: { //考试信息
        // source: null,
        // totalScore: null,
      },
      topic: {  //试卷信息

      },
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    //初始化页面数据
    init() {
      let testid = this.$route.query.testid //获取路由传递过来的试卷编号
      let cid = this.$route.query.cid
      this.$axios({
        url:`/springboot/student/exam1`,
        method:"post",
        data:JSON.stringify({
          id_1:cid,
          id_2:testid
        })
        }).then(res => { 
         let resData = res.data //通过testid请求试卷详细信息
          console.log(resData)
       // resData.startDate = res.data.startDate.substr(0,10)
        this.examData = resData
       
      })
    },
    toAnswer(testid,cid) {
      this.$router.push({path:"/answer",query:{testid: testid,cid:cid}})
    },
  }
}
</script>

<style lang="less" scoped>
.bottom {
  .right{
    .el-button{
      color: #409EFF;
      border-color: #c6e2ff;
      background-color: #ecf5ff;
    }
  }
}
.right {
  margin-left: auto;
}
.inner .contenti .question {
  margin-left: 40px;
  color: #9a9a9a;
  font-size: 14px;
}
.content .inner .titlei {
  margin-left: 20px;
  font-size: 16px;
  color: #88949b;
  font-weight: bold;
}
.content .title .time {
  font-size: 16px;
  margin-left: 420px;
  color: #999;
}
.content .stitle {
  background-color: #0195ff;
}
.content .title span {
  margin-right: 10px;
}
#msg .content .title {
  font-size: 20px;
  margin: 0px;
  display: flex;
  align-items: center;
}
.content {
  margin-top: 20px;
  background-color: #fff;
}
.content .header {
  padding: 10px 30px;
}
.wrapper .info {
  margin: 20px 0px 0px 20px;
  border-top: 1px solid #eee;
  padding: 20px 0px 10px 0px;
}
.wrapper .info a {
  color: #88949b;
  font-size: 14px;
}
.wrapper .info a:hover {
  color: #0195ff;
}
.wrapper .bottom .btn {
  cursor: pointer;
  padding: 5px 10px;
  border: 1px solid #88949b;
  border-radius: 4px;
} 
.wrapper .bottom {
  display: flex;
  margin-left: 20px;
  color: #999;
  font-size: 14px;
  align-items: center;
}
.wrapper .bottom li {
  margin-right: 14px;
}
#msg {
  background-color: #eee;
  width: 980px;
  margin: 0 auto;
  margin-bottom:400px;
}
#msg .title {
  margin: 20px;
}
#msg .wrapper {
  background-color: #fff;
  padding: 10px;
}
.wrapper .top {
  display: flex;
  margin: 20px;
  align-items: center;
}
.wrapper .top .right {
  margin-left: auto;
}
.wrapper .top .example {
  color: #333;
  font-size: 22px;
  font-weight: 700;
}
.wrapper .top li i {
  margin-left: 20px;
  color: #88949b;
}
.wrapper .right .count {
  margin-right: 60px;
  color: #fff;
  padding: 4px 10px;
  background-color: #88949b;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border: 1px solid #88949b;
}
.wrapper .right .score {
  position: absolute;
  left: 53px;
  top: -5px;
  padding: 1px 12px;
  font-size: 20px;
  color: #88949b;
  border: 1px dashed #88949b;
  border-left: none;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  font-weight: bold;
}
.wrapper .right div {
  position: relative;
}
</style>