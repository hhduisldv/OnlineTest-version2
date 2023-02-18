<!--考生答题界面-->
<template>
  <div id="answer">
    <!--顶部信息栏-->
     <div class="top">
       <ul class="item">
         <li><i class="iconfont icon-menufold " ref="toggle" @click="slider_flag = !slider_flag"></i></li>
         <li>{{examData.cname}}-{{examData.testid}}</li>
         <li @click="flag = !flag">
           <i class="iconfont icon-user "></i>
           <div class="msg"  v-if="flag" @click="flag = !flag">
             <p>姓名：{{userInfo.name}}</p >
             <p>准考证号:  {{userInfo.id}}</p >
           </div>
         </li>
         <li><i class="iconfont icon-arrLeft icon20"></i></li>
       </ul>
     </div>
     <div class="flexarea">
        <!--左边题目编号区-->
        <transition name="slider-fade">
          <div class="left" v-if="slider_flag">
            <!--<ul class="l-top">
              <li>
                <a href=" "></a>
                <span>当前</span>
              </li>
              <li>
                <a href="javascript:;"></a>
                <span>未答</span>
              </li>
              <li>
                <a href="javascript:;"></a>
                <span>已答</span>
              </li>
              <li>
                <a href="javascript:;"></a>
                <span>标记</span>
              </li>
            </ul>
            <div class="l-bottom">
              <div class="item">
                <p>题目</p >-->
                <!--<ul>
                  <li v-for="(item, index1) in topic[1]" :key="index1">
                    <a href="javascript:;" 
                      @click="change(index1)"
                      :class="{'border': index == index1 && currentType == 1,'bg': bg_flag && topic[index1].isClick == true}">
                      <span :class="{'mark': topic[1][index1].isMark == true}"></span>
                      {{index1+1}}
                    </a>
                  </li>
                </ul>
              </div>-->
            <div class="notice" ><span>考生须知：</span>
            <p>1.全部考题均为单选题</p>
            <p>2.可以多次进行考试</p>
            <p>3.每次提交试卷的分数会被保留</p>
            <p>4.可以在首页点击历史成绩查看该门考试历史最高分</p>
            <p>5.考试时间已到，若未完成作答，将强制交卷</p>
            </div>
             
            
          </div>
        </transition> 
        <!--右边选择答题区-->
        <transition name="slider-fade">
        <div class="right">
          <div class="title">
            <p>{{title}}</p >
            <i class="iconfont icon-right auto-right"></i>
            <span>全卷共{{topicCount}}题  <i class="iconfont icon-time"></i>倒计时：<b>{{time}}</b>分钟</span>
          </div>
        
          <div class="content">
            <p class="topic"><span class="number">{{number}}</span>{{showQuestion}}</p >
            <div v-if="currentType == 1">
              <el-radio-group v-model="radio[index]" @change="getChangeLabel" >
                <el-radio :label="1">{{showAnswer.optionA}}</el-radio>
                <el-radio :label="2">{{showAnswer.optionB}}</el-radio>
                <el-radio :label="3">{{showAnswer.optionC}}</el-radio>
                <el-radio :label="4">{{showAnswer.optionD}}</el-radio>
              </el-radio-group>
             
            </div>
            
          <div class="operation">
            <ul class="end">
              <li @click="previous()"><i class="iconfont icon-previous"></i><span>上一题</span></li>
              <li @click="commit()"><i class="final" @click="commit()"></i><span>交卷</span></li>
              <li @click="next()"><span>下一题</span><i class="iconfont icon-next"></i></li>
            </ul>
          </div>
        </div>
        </div>

        </transition>
     </div> 
  </div>
</template>

<script>
    
    import {mapState} from 'vuex'
    export default {
      
      data() {
        return {
          startTime: null, //考试开始时间
          endTime: null, //考试结束时间
          time: null, //考试持续时间
          reduceAnswer:[],  //vue官方不支持3层以上数据嵌套,如嵌套则会数据渲染出现问题,此变量直接接收3层嵌套时的数据。
          answerScore: 0, //答题总分数
          
          
          slider_flag: true, //左侧显示隐藏标识符
          flag: false, //个人信息显示隐藏标识符
          currentType: 1, //当前题型类型 
          radio: [], //保存考生所有选择题的选项
          title: "请选择正确的选项",
          index: 0, //全局index
          userInfo: { //用户信息
            name: null,
            id: null,
            college: null
          },
          topicCount: [],//每种类型题目的总数
          score: [],  //每种类型分数的总数
          examData: { //考试信息
            // source: null,
            // totalScore: null,
          },
          topic: {  //试卷信息
    
          },
          showQuestion: [], //当前显示题目信息
          showAnswer: {}, //当前题目对应的答案选项
          number: 1, //题号
          part: null, //填空题的空格数量
         
          topic1Answer: [],  //学生选择题作答编号,
          rightAnswer: ''
        }
      },
      created() {
        this.getCookies()
        this.getExamData()
        this.showTime()
        this.mounted()
      },
      methods: {
        getTime(date) { //日期格式化
          var date = new Date(date)
          let year = date.getFullYear()
          let month= date.getMonth()+ 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
          let day=date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
          let hours=date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
          let minutes=date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
          let seconds=date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
          // 拼接
          return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
        },
        getCookies() {  //获取cookie
          this.userInfo.name = this.$cookies.get("cname")
          this.userInfo.id = this.$cookies.get("cid")
          this.userInfo.college = this.$cookies.get("ccollege")
        },
        calcuScore() { //计算答题分数
          
        },
        getExamData() { //获取当前试卷所有信息
          let date = new Date()
          this.startTime = this.getTime(date)
          let examCode = this.$route.query.testid 
          let courseCode = this.$route.query.cid
          this.$axios({
            url:'/springboot/student/exam1',
            method:'post',
            data:JSON.stringify({
              id_1:courseCode,
              id_2:examCode
            })
          }).then(res => { 
            let resData = res.data 
            this.examData = resData//获取考试详情
            this.index = 0
            this.time = this.examData.duration 
            
            let cid = this.examData.cid
            let testid = this.examData.testid
            this.$axios({
              url:'/springboot/student/exam2',
              method:'post',
              data:JSON.stringify({
                id_1:cid,
                id_2:testid,
                
              })
            }).then(res1 => {  
              let resData_1 = res1.data
             
              this.topic = resData_1
             let reduceAnswer = this.topic[this.index]
              this.reduceAnswer = reduceAnswer
              let keys = Object.keys(this.topic) //对象转数组
              let dataInit = this.topic[0]
              console.log(this.topic[0])
              this.number = 1
              this.showQuestion = dataInit.title
              this.showAnswer = dataInit
              this.topicCount = this.topic.length
              console.log(this.showQuestion)
            })
          })
        },
        change(index) { //选择题
          this.index = index
          let reduceAnswer = this.topic[this.index]
          this.reduceAnswer = reduceAnswer
          this.isFillClick = true
          this.currentType = 1
          let len = this.topic.length
          if(this.index < len) {
            if(this.index <= 0){
              this.index = 0
            }
            console.log(`总长度${len}`)
            console.log(`当前index:${index}`)
            this.title = "请选择正确的选项"
            let Data = this.topic
            // console.log(Data)
            this.showQuestion = Data[this.index].title //获取题目信息
            this.showAnswer = Data[this.index]
            this.number = this.index + 1
          }else if(this.index >= len) {
            this.index = 0
            this.fill(this.index)
          }
        },
        
        getChangeLabel(val) { //获取选择题作答选项
          this.radio[this.index] = val //当前选择的序号
         
          this.topic1Answer[this.index] = val 
        },
       
        previous() { //上一题
          this.index --
          this.change(this.index)
              
        },
        next() { //下一题
          this.index ++
          this.change(this.index)
             
          
        },
        
        commit() { //答案提交计算分数
          /* 计算选择题总分 */
          let topic1Answer = this.topic1Answer
          let finalScore = 0
          topic1Answer.forEach((element,index) => { //循环每道选择题根据选项计算分数
            let right = null
            if(element != null) {
              switch(element) { //选项1,2,3,4 转换为 "A","B","C","D"
                case 1:
                  right = "A"
                  break
                case 2:
                  right = "B"
                  break
                case 3:
                  right = "C"
                  break
                case 4:
                  right = "D"
              }
              console.log(right)
              if(right == this.topic[index].answer) { // 当前选项与正确答案对比
                finalScore += this.topic[index].score // 计算总分数
              }
              
            }
            // console.log(topic1Answer)
          })
          
         
          console.log(`目前总分${finalScore}`)
          if(this.time != 0) {
            this.$confirm("考试结束时间未到,是否提前交卷","友情提示",{
              confirmButtonText: '立即交卷',
              cancelButtonText: '再检查一下',
              type: 'warning'
            }).then(() => {
              console.log("交卷")
              let date = new Date()
              this.endTime = this.getTime(date)
              let answerDate = this.endTime.substr(0,10)
              let snamee = this.userInfo.name
              let scollegee = this.userInfo.college
              //提交成绩信息
              console.log(this.examData.totalScore)
              this.$axios({
                url: '/springboot/student/submit',
                method: 'post',
                data:JSON.stringify ({
                  sname:snamee,
                  scollege:scollegee,
                  testid: this.examData.testid, //考试编号
                  sid: this.userInfo.id, //学号
                  cname: this.examData.cname, //课程名称
                  cid:this.examData.cid,
                  score: finalScore, //答题成绩
                  examDate: answerDate, //答题日期
                  totalscore:this.examData.totalScore
                })
              }).then(res => {
                let resData = res.data
                if(resData == 200) {
                  this.$router.push({path:'/answerScore',query: {
                    score: finalScore, 
                    startTime: this.startTime,
                    endTime: this.endTime,
                    scoreData:this.examData.cname,
                    totalScore:this.examData.totalScore
                  }})
                }  
              })
            }).catch(() => {
              console.log("继续答题")
            })
          }
        },
         mounted(){ //防止页面后退
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
    history.pushState(null, null, document.URL);
 });
},
        showTime() { //倒计时
          setInterval(() => {
            this.time -= 1
            if(this.time == 10) {
              this.$message({
                showClose: true,
                type: 'error',
                message: '考生注意,考试时间还剩10分钟！！！'
              })
              if(this.time == 0) {
                console.log("考试时间已到,强制交卷。")
              }
            }
          },1000 * 60)
        }
      },
      computed:mapState(["isPractice"])
    }
    </script>

<style lang="less">
    .iconfont.icon-time {
      color: #2776df;
      margin: 0px 6px 0px 20px;
    }
    .analysis {
      margin-top: 20px;
      .right {
        color: #2776df;
        font-size: 18px;
        border: 1px solid #2776df;
        padding: 0px 6px;
        border-radius: 4px;
        margin-left: 20px;
      }
      ul li:nth-child(2) {
        margin: 20px 0px;
      }
      ul li:nth-child(3) {
        padding: 10px;
        background-color: #d3c6c9;
        border-radius: 4px;
      }
    }
    .analysis span:nth-child(1) {
      font-size: 18px;
    }
    .mark {
      position: absolute;
      width: 4px;
      height: 4px;
      content: "";
      background-color: red;
      border-radius: 50%;
      top: 0px;
      left: 22px;
    }
    .border {
      position: relative;
      border: 1px solid #FF90AA !important;
    }
    .bg {
      background-color: #5188b8 !important;
    }
    .fill .el-input {
      display: inline-flex;
      width: 150px;
      margin-left: 20px;
      .el-input__inner {
        border: 1px solid transparent;
        border-bottom: 1px solid #eee;
        padding-left: 20px;
      }
    }
    /* slider过渡效果 */
    .slider-fade-enter-active {
      transition: all .3s ease;
    }
    .slider-fade-leave-active {
      transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slider-fade-enter, .slider-fade-leave-to {
      transform: translateX(-100px);
      opacity: 0;
    }
    
    .operation .end li:nth-child(2) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: rgb(39, 118, 223);
      border-radius: 50%;
      width: 50px;
      height: 50px;
      color: #fff;
    }
    .operation .end li {
      cursor: pointer;
      margin: 0 100px;
    }
    .operation {
      background-color: #fff;
      border-radius: 4px;
      padding: 10px 0px;
      margin-right: 10px;
    }
    .operation .end {
      display: flex;
      justify-content: center;
      align-items: center;
      color: rgb(39, 118, 223);
    }
    .content .number {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 20px;
      height: 20px;
      background-color: rgb(39, 118, 223);
      border-radius: 4px;
      margin-right: 4px;
    }
    .content {
      padding: 0px 20px;
    }
    .content .topic {
      padding: 20px 0px;
      padding-top: 30px; 
    }
    .right .content {
      background-color: #fff;
      margin: 10px;
      margin-left: 0px;
      height: 470px;
    }
    .content .el-radio-group label {
      color: #000;
      margin: 5px 0px;
    }
    .content .el-radio-group {
      display: flex;
      flex-direction:column;
    }
    .right .title p {
      margin-left: 20px;
    }
    .flexarea {
      display: flex;
    }
    .flexarea .right {
      flex: 1;
    }
    .auto-right {
      margin-left: auto;
      color: #2776df;
      margin-right: 10px;
    }
    .right .title {
      margin-right: 10px;
      padding-right: 30px;
      display: flex;
      margin-top: 10px;
      background-color: #fff;
      height: 50px;
      line-height: 50px;
    }
    .clearfix {
      clear: both;
    }
    .l-bottom .final {
      cursor: pointer;
      display: inline-block;
      text-align: center;
     background-color: rgb(39, 118, 223);
      width: 240px;
      margin: 20px 0px 20px 10px;
      border-radius: 4px;
      height: 30px;
      line-height: 30px;
      color: #fff;
      margin-top: 22px;
      border-style:solid;
    }
    #answer .left .item {
      padding: 0px;
      font-size: 16px;
    }
    .l-bottom {
      border-radius: 4px;
      background-color: #fff;
    }
    .l-bottom .item p {
      margin-bottom: 15px;
      margin-top: 10px;
      color: #000;
      margin-left: 10px;
      letter-spacing: 2px;
    }
    .l-bottom .item li {
      width: 15%;
      margin-left: 5px;
      margin-bottom: 10px;
    }
    .l-bottom .item {
      display: flex;
      flex-direction: column;
    }
    .l-bottom .item ul {
      width: 100%;
      margin-bottom: -8px;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
    }
    .l-bottom .item ul li a { 
      position: relative;
      justify-content: center;
      display: inline-flex;
      align-items: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #fff;
      border: 1px solid #eee;
      text-align: center;
      color: #000;
      font-size: 16px;
    }
    .left .l-top {
      display: flex;
      justify-content: space-around;
      padding: 16px 0px;
      border: 1px solid #eee;
      border-radius: 4px;
      margin-bottom: 10px;
      background-color: #fff;
    }
    .left {
      width: 260px;
      height: 100%;
      margin: 10px 10px 0px 10px;
    }
    .left .l-top li:nth-child(2) a {
      border: 1px solid #eee;
    }
    .left .l-top li:nth-child(3) a {
      background-color: #5188b8;
      border: none;
    }
    .left .l-top li:nth-child(4) a {
      position: relative;
      border: 1px solid #eee;
    }
    .left .l-top li:nth-child(4) a::before {
      width: 4px;
      height: 4px;
      content: " ";
      position: absolute;
      background-color: red;
      border-radius: 50%;
      top: 0px;
      left: 16px;
    }
    .left .l-top li {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    .left .l-top li a {
      display: inline-block;
      padding: 10px;
      border-radius: 50%;
      background-color: #fff;
      border: 1px solid #FF90AA;
    }
    #answer .top {
      background-color: rgb(39, 118, 223);
    }
    #answer .item {
      color: #fff;
      display: flex;
      padding: 20px;
      font-size: 20px;
    }
    #answer .top .item li:nth-child(1) {
      margin-right: 10px;
    }
    #answer .top .item li:nth-child(3) {
      position: relative;
      margin-left: auto;
    }
    #answer {
      padding-bottom: 30px;
    }
    .icon20 {
      font-size: 20px;
      font-weight: bold;
    }
    .item .msg {
      padding: 10px 15px;
      border-radius: 4px;
      top: 47px;
      right: -30px;
      color: #6c757d;
      position: absolute;
      border: 1px solid rgba(0,0,0,.15);
      background-color: #fff;
    }
    .item .msg p {
      font-size: 16px;
      width: 200px;
      text-align: left;
    }
    </style>