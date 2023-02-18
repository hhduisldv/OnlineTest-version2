// 所有学生
<template>
  <div class="all">
    <el-table :data="tableData" border>
      <el-table-column fixed="left" prop="sname" label="姓名" width="180"></el-table-column>
      <el-table-column prop="scollege" label="学院" width="180"></el-table-column>
      
      <el-table-column prop="sid" label="学号" width="180"></el-table-column>
      <el-table-column prop="cid" label="课程编号" width="180"></el-table-column>
      <el-table-column prop="cname" label="课程" width="180"></el-table-column>
      <el-table-column prop="score" label="成绩" width="180"></el-table-column>
      <el-table-column prop="totalscore" label="试卷总分" width="180"></el-table-column>
      <el-table-column fixed="right" label="查看成绩" width="150">
        <template slot-scope="scope">
          <el-button @click="checkGrade(scope.row.sid,scope.row.cid)" type="primary" size="small">历史成绩</el-button>
        </template>
      </el-table-column>
    </el-table>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData:[]
    };
  },
  created() {
    this.getScoreInfo();
  },
  methods: {
    getScoreInfo() { 
      this.$axios({
        method: 'get',
        url: '/springboot/teacher/find_situ'
      }).then(res => {
        console.log(res)
        let resData = res.data
        resData.forEach(item =>{
          this.tableData.push(item)
        })
        }).catch(error => {
      })
    },
   
    checkGrade(sid,cid) {
      this.$router.push({ path: "/grade", query: { studentId: sid,cid:cid } });
    }
  }
};
</script>
<style lang="less" scoped>
.all {
  padding: 0px 40px;
  .page {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .edit {
    margin-left: 20px;
  }
  .el-table tr {
    background-color: #dd5862 !important;
  }
}
.el-table .warning-row {
  background: #000 !important;
}

.el-table .success-row {
  background: #dd5862;
}
</style>