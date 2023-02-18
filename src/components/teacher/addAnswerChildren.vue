// 添加题库
<template>
  <div class="add">
    <el-tabs v-model="activeName">
    <el-tab-pane name="first">
      <span slot="label"><i class="el-icon-circle-plus"></i>添加试题</span>
      <section class="append">
        <ul>
          <li>
            <span>题目类型:</span>
            <el-select v-model="optionValue" placeholder="选择题" class="w150">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                >
              </el-option>
            </el-select>
          </li>
          <li v-if="optionValue == '选择题'">
          <span>试题编号：</span>
          <el-input
          placeholder="请输入试题编号"
          v-model="postChange.qid"
          class="w150"
          clearable></el-input>
          </li>
          <li v-if="optionValue == '选择题'">
          <span>题目分值：</span>
          <el-input
          placeholder="请输入题目分值"
          v-model="postChange.score"
          class="w150"
          clearable></el-input>
          </li>
         
          <li v-if="optionValue == '选择题'">
            <span>正确选项:</span>
            <el-select v-model="postChange.answer"  placeholder="选择正确答案" class="w150">
              <el-option
                v-for="item in rights"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
        </ul>
        <!-- 选择题部分 -->
        <div class="change" v-if="optionValue == '选择题'">
          <div class="title">
            <el-tag>题目:</el-tag><span>在下面的输入框中输入题目,形如--DNS 服务器和DHCP服务器的作用是（）</span>
            <el-input
              type="textarea"
              rows="4"
              v-model="postChange.title"
              placeholder="请输入题目内容"
              resize="none"
              class="answer">
            </el-input>
          </div>
          <div class="options">
            <ul>
              <li>
                <el-tag type="success">A</el-tag>
                <el-input
                  placeholder="请输入选项A的内容"
                  v-model="postChange.optionA"
                  clearable="">
                </el-input>
              </li>
              <li>
                <el-tag type="success">B</el-tag>
                <el-input
                  placeholder="请输入选项B的内容"
                  v-model="postChange.optionB"
                  clearable="">
                </el-input>
              </li>
              <li>
                <el-tag type="success">C</el-tag>
                <el-input
                  placeholder="请输入选项C的内容"
                  v-model="postChange.optionC"
                  clearable="">
                </el-input>
              </li>
              <li>
                <el-tag type="success">D</el-tag>
                <el-input
                  placeholder="请输入选项D的内容"
                  v-model="postChange.optionD"
                  clearable="">
                </el-input>
              </li>
            </ul>
          </div>
          <!--
          <div class="title">
            <el-tag>解析:</el-tag><span>在下面的输入框中输入题目解析</span>
            <el-input
              type="textarea"
              rows="4"
              v-model="postChange.analysis"
              placeholder="请输入答案解析"
              resize="none"
              class="answer">
            </el-input>
          </div>-->
          <div class="submit">
            <el-button type="primary" @click="changeSubmit()">立即添加</el-button>
          </div>
        </div>
       </section>
    </el-tab-pane>
    </el-tabs>
      </div>
    
</template>

<script>
export default {
  data() {
    return {
      changeNumber: null, //选择题出题数量
      
      activeName: 'first',  //活动选项卡
      options: [ //题库类型
        {
          value: '选择题',
          label: '选择题'
        },
       
      ],
      rights: [{
        value: 'A',
        label: 'A'
        
        },{
        value: 'B',
        label: 'B'
        
        },{
        value: 'C',
        label: 'C'
        
        },{
        value: 'D',
        label: 'D'
        
        }
      ],
      
      qid: null,
      optionValue: '选择题', //题型选中值
      
      postChange: { //选择题提交内容
        cid: '', //课名
        answer: '', //正确答案选中值
        testid: '',//测试名
         qid: '',//题号
        title: '', //题目
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        score:0
      },
      
    
    };
  },
  created() {
    this.getParams()
  },
  methods: {
    // handleClick(tab, event) {
    //   console.log(tab, event);
    // },
    /*create() {
      this.$axios({
        url: '/springboot/teacher/add_ques',
        method: 'post',
        data:JSON.stringify( {
          ...this.postChange
        })
      }).then(res => {
        console.log(res)
        let data = res.data
        if(data.code==200){
          setTimeout(() => {
            this.$router.push({path: '/selectAnswer'})
          },1000)
           this.$message({
            message: data.message,
            type: 'success'
          })
        }else if(data.code==400){
            this.$message({
            message: data.message,
            type: 'error'
          })
        }

      })
    },*/
    getParams() {
      console.log(this.$route.query.subject)
      let subject = this.$route.query.subject //获取试卷名称
      let paperId = this.$route.query.paperId //获取paperId
      
      this.postChange.testid = paperId
      this.postChange.cid = subject
    },
    changeSubmit() { //选择题题库提交
    //  this.postChange.answer = 
      console.log(this.postChange)
      this.$axios({ //提交数据到选择题题库表
      
        url: '/springboot/teacher/show/add_ques',
        method: 'post',
        data:JSON.stringify( {
          ...this.postChange          
        })
      }).then(res => { //添加成功显示提示
        let status = res.data
        if(status == 200) {
          this.$message({
            message: '已添加到题库',
            type: 'success'
          })
          this.postChange = {}
        }
      })/*.then(() => {
        this.$axios(`/api/multiQuestionId`).then(res => { //获取当前题目的questionId
          let questionId = res.data.data.questionId
          this.postPaper.questionId = questionId
          this.postPaper.questionType = 1
          this.$axios({
            url: '/api/paperManage',
            method: 'Post',
            data: {
              ...this.postPaper
            }
          })
        })
      })*/
    },
   
          
        
      
    }
  };

</script>

<style lang="less" scoped>
.add {
  margin: 0px 40px;
  .box {
    padding: 0px 20px;
    ul li {
      margin: 10px 0px;
      display: flex;
      align-items: center;
      .el-input {
        width: 6%;
      }
      .w150 {
        margin-left: 20px;
        width: 7%;
      }
    }
  }
  .el-icon-circle-plus {
    margin-right: 10px;
  }
  .icon-daoru-tianchong {
    margin-right: 10px;
  }
  .append {
    margin: 0px 20px;
    ul {
      display: flex;
      align-items: center;
      li {
        margin-right: 20px;
      }
    }
    .change {
      margin-top: 20px;
      padding: 20px 16px;
      background-color: #E7F6F6;
      border-radius: 4px;
      .title {
        padding-left: 6px;
        color: #2f4f4f;
        span:nth-child(1) {
          margin-right: 6px;
        }
        .answer {
          margin: 20px 0px 20px 8px;
        }
        .el-textarea {
          width: 98% !important;
        }
      }
      .options {
        ul {
          display: flex;
          flex-direction: column;
        }
        ul li {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 98%;
          margin: 10px 0px;
          span {
            margin-right: 20px;
          }
        }
      }
      .submit {
        display: flex;
        justify-content: center;
        align-items: center;
      }        
    }
    .fill {
      .fillAnswer {
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          margin-right: 6px;
        }
        .el-input {
          width: 91% !important;
        }
      }
      .analysis {
        margin-top: 20px;
        margin-left: 5px;
      }
    }
    .judge {
      .judgeAnswer {
        margin-left: 20px;
        margin-bottom: 20px;
      }
    }
    .w150 {
      width: 150px;
    }
    li:nth-child(2) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>

