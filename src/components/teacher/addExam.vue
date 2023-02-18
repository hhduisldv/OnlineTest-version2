<template>
  <section class="add">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="课程名称">
        <el-input v-model="form.cname"></el-input>
      </el-form-item>
      <el-form-item label="课程编号">
        <el-input v-model="form.cid"></el-input>
      </el-form-item>
      <el-form-item label="介绍">
        <el-input v-model="form.introduction"></el-input>
      </el-form-item>
      <el-form-item label="试卷编号">
        <el-input v-model="form.testid"></el-input>
      </el-form-item>
      <el-form-item label="年级">
        <el-input v-model="form.grade"></el-input>
      </el-form-item>
      <el-form-item label="考试日期">
        <el-col :span="11">
          <el-date-picker placeholder="选择日期" v-model="form.startDate" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="持续时间">
        <el-input v-model="form.duration"></el-input>
      </el-form-item>
      <el-form-item label="总分">
        <el-input v-model="form.totalScore"></el-input>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">立即创建</el-button>
        <el-button type="text" @click="cancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      form: { //表单数据初始化
        
       
      }
    };
  },
  methods: {
    formatTime(date) { //日期格式化
    var date = new Date(date);

      let year = date.getFullYear()
      let month= date.getMonth()+ 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      let day=date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let hours=date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let minutes=date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let seconds=date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      // 拼接
      return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
    },
    onSubmit() {
      //let examDate = this.formatTime(this.form.examDate)
      //this.form.examDate = examDate.substr(0,10)
      console.log(this.form)
      this.$axios({
          url: '/springboot/teacher/add',
          method: 'post',
          data: JSON.stringify({
            ...this.form
          })
        }).then(res => {
          let resData = res.data
          if(resData == 200) {
            this.$message({
              message: '数据添加成功',
              type: 'success'
            })
            this.$router.push({path: '/selectExam'})
          }
        })
      
    },
    cancel() { //取消按钮
      this.form = {}
    },
    
  }
};
</script>
<style lang="less" scoped>
.add {
  padding: 0px 40px;
  width: 400px;
}
</style>
 