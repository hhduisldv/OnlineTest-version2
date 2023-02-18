//查询所有题库
<template>
  <div class="exam">
    <el-table :data="tableData" border :row-class-name="tableRowClassName">
      <el-table-column fixed="left" prop="cid" label="课程编号" width="90"></el-table-column>
      <el-table-column prop="testid" label="试卷编号" width="90"></el-table-column>
      <el-table-column prop="qid" label="题号" width="90"></el-table-column>
      <el-table-column prop="title" label="题目" width="150"></el-table-column>
      <el-table-column prop="optionA" label="A" width="150"></el-table-column>
      <el-table-column prop="optionB" label="B" width="150"></el-table-column>
      <el-table-column prop="optionC" label="C" width="150"></el-table-column>
      <el-table-column prop="optionD" label="D" width="150"></el-table-column>
      <el-table-column prop="answer" label="答案" width="150"></el-table-column>
      <el-table-column prop="score" label="分值" width="150"></el-table-column>
      
       <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="checkMsg(scope.row.qid)" type="primary" size="small">编辑</el-button>
          <el-button @click="deleteById(scope.row.qid)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
   
     <el-dialog
      title="编辑试题信息"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <section class="update">
        <el-form ref="form" :model="form" label-width="80px">
          <!-- <el-form-item label="课程编号">
            <el-input v-model="form.cid"></el-input>
          </el-form-item>
          <el-form-item label="试卷编号">
            <el-input v-model="form.testid"></el-input>
          </el-form-item>
          <el-form-item label="题号">
            <el-input v-model="form.qid"></el-input>
          </el-form-item> -->
          <el-form-item label="题目">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="A">
            <el-input v-model="form.optionA"></el-input>
          </el-form-item>
          <el-form-item label="B">
            <el-input v-model="form.optionB"></el-input>
          </el-form-item>
          <el-form-item label="C">
            <el-input v-model="form.optionC"></el-input>
          </el-form-item>
             <el-form-item label="D">
            <el-input v-model="form.optionD"></el-input>
          </el-form-item>
          <el-form-item label="答案">
            <el-input v-model="form.answer"></el-input>
          </el-form-item>
          <el-form-item label="分值">
            <el-input v-model="form.score"></el-input>
          </el-form-item>
        </el-form>
      </section>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible:false,
      form:{},
      tableData:[]
    };
  },
  created() {
    this.getAnswerInfo();
  },
  methods: {
    getAnswerInfo() {
      let id11 = this.$route.query.subject
      let id22 = this.$route.query.paperId
     console.log(id11,id22)
     let data = JSON.stringify({
      
            id_1:id11,
            id_2:id22
          
     })
     console.log(data)
       this.$axios({
        method: 'post',
        url: '/springboot/teacher/show/find_ques',
        data
      }).then(res => {
        console.log(res)
        let resData = res.data
        resData.forEach(item =>{
          this.tableData.push(item)
        })
        }).catch(error => {
      })
    },
   checkMsg(qid) { 
     let id11 = this.$route.query.subject
      let id22 = this.$route.query.paperId
      this.dialogVisible = true
      this.$axios({
        url: `/springboot/teacher/show/find_single_ques`,
        method: 'post',
        data:JSON.stringify({
          id_1:id11,
          id_2:id22,
          id_3:qid
          
        }) 
         }).then(res => {
         
        this.form = res.data
      })
    },
    deleteById(qid) { 
      let id11 = this.$route.query.subject
      let id22 = this.$route.query.paperId
      
     
      this.$confirm("确定删除吗？删除后无法恢复","Warning",{
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        type: 'danger'
      }).then(()=> { //确认删除
        this.$axios({
          url: `/springboot/teacher/show/delete_ques`,
          method: 'delete',
          data:{
            
              id_1:id11,
              id_2:id22,
              id_3:qid
            
          }
        }).then(res => {
          this.getAnswerInfo()
        })
      }).catch(() => {

      })
    },
    submit() { //提交更改
      this.dialogVisible = false
      console.log(this.form)
      this.$axios({
        url: '/springboot/teacher/show/change_ques',
        method: 'put',
        data: {
          ...this.form
        }
      }).then(res => {
        console.log(res)
        if(res.data.code ==200) {
          this.$message({
            message: '更新成功，请刷新页面',
            type: 'success'
          })
        }
        this.getAnswerInfo()
      })
    },
    handleClose(done) { //关闭提醒
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        }).catch(_ => {});
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return "warning-row";
      } else {
        return "success-row";
      }
    }
  }
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
  .edit {
    margin-left: 20px;
  }
  .el-table tr {
    background-color: #DD5862 !important;
  }
}
  .el-table .warning-row {
    background: #000 !important;
    
  }

  .el-table .success-row {
    background: #DD5862;
  }

</style>