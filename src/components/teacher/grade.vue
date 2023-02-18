<template>
  <div class="grade">
    <div ref="box" class="box"></div>
    
   
    <el-table :data="tableData" border>
        <el-table-column fixed="left" prop="sname" label="姓名" width="180"></el-table-column>
      <el-table-column prop="scollege" label="学院" width="180"></el-table-column>
      <el-table-column prop="sid" label="学号" width="180"></el-table-column>
      <el-table-column prop="cid" label="课程编号" width="180"></el-table-column>
      <el-table-column prop="cname" label="课程" width="180"></el-table-column>
      <el-table-column prop="examDate" label="答题日期" width="180"></el-table-column>
      <el-table-column prop="score" label="成绩" width="180"></el-table-column>
      <el-table-column prop="totalscore" label="试卷总分" width="180"></el-table-column>
     
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
      let studentId = this.$route.query.studentId
      let cid = this.$route.query.cid
     console.log(cid)
      this.$axios({
        url: `/springboot/teacher/find_situ/specific`,
        method: 'post',
         data:JSON.stringify({
           id_1: studentId,
           id_2:cid
           }
         )}).then(res => {
        console.log(res)
        let resData = res.data
        resData.forEach(item =>{
          this.tableData.push(item)
        })
        }).catch(error => {});
    },
 
  }
};
</script>
<style lang="less" scoped>
.grade {
  padding: 0px 40px;
  
}
.el-table .warning-row {
  background: #000 !important;
}

.el-table .success-row {
  background: #dd5862;
}
</style>