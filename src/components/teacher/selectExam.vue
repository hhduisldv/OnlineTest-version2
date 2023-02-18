<template>
  <div class="exam">
    <el-table :data="tableData" border>
      
      <el-table-column fixed="left" prop="cname" label="课程名称" width="180"></el-table-column>
      <el-table-column prop="cid" label="课程编号" width="180"></el-table-column>
      <el-table-column prop="testid" label="试卷编号" width="180"></el-table-column>
      <el-table-column prop="introduction" label="介绍" width="200"></el-table-column>
      <el-table-column prop="grade" label="年级" width="100"></el-table-column>
      <el-table-column prop="startDate" label="考试日期" width="120"></el-table-column>
      <el-table-column prop="duration" label="持续时间" width="120"></el-table-column>
      <el-table-column prop="totalScore" label="总分" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="220">
        <template slot-scope="scope">
          <el-button @click="timu(scope.row.testid,scope.row.cid)" type="primary" size="mini">查看题目</el-button>
          <el-button @click="add(scope.row.testid,scope.row.cid)" type="primary" size="mini">增加题目</el-button>
        
        </template>
      </el-table-column>
    </el-table>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {}, //保存点击以后当前试卷的信息
      tableData:[],
    }
  },
  created() {
    this.getExamInfo()
  },
  methods: {
    getExamInfo() { 
      let id1 = this.$cookies.get("cid")
      this.$axios({
        method: 'post',
        url: '/springboot/teacher/show',
        data: JSON.stringify({
          id:id1
        })
      }).then(res => {
        console.log(res)
        let resData = res.data
        resData.forEach(item =>{
          this.tableData.push(item)
        })
         
      }).catch(error => {
      })
    },
    timu(testid,cid){
      this.$router.push({path:'/selectAnswer',query: {paperId: testid,subject:cid}})
    },
    add(testid,cid) { //增加题库
   
      this.$router.push({
        path:'/addAnswerChildren',
        query: {paperId: testid,subject:cid}
        })
      
    }
  },
};
</script>
<style lang="less" scoped>
.exam {
  padding: 0px 40px;
  .page {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .edit{
    margin-left: 20px;
  }
}
</style>