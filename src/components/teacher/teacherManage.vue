
<template>
  <div class="all">
    <el-table :data="tableData" border>
      <el-table-column fixed="left" prop="tname" label="姓名" width="180"></el-table-column>
      <el-table-column prop="tcollege" label="学院" width="200"></el-table-column>
      <el-table-column prop="tgender" label="性别" width="120"></el-table-column>
      <el-table-column prop="tphonenum" label="联系方式" width="120"></el-table-column>
      <el-table-column prop="tid" label="工号" width="120"></el-table-column>
      <el-table-column prop="tcourses" label="教授课程" width="120"></el-table-column>
      
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="checkMsg(scope.row.tid)" type="primary" size="small">编辑</el-button>
          
        </template>
      </el-table-column>
    </el-table>
   
    
    <el-dialog
      title="编辑您的信息"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <section class="update">
        <el-form ref="form" :model="form" label-width="80px">
          <!-- <el-form-item label="姓名">
            <el-input v-model="form.tname"></el-input>
          </el-form-item>
          <el-form-item label="学院">
            <el-input v-model="form.tcollege"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="form.tgender"></el-input>
          </el-form-item> -->
          <el-form-item label="电话号码">
            <el-input v-model="form.tphonenum"></el-input>
          </el-form-item><!-- 
          <el-form-item label="工号">
            <el-input v-model="form.tid"></el-input>
          </el-form-item>
          <el-form-item label="教授课程">
            <el-input v-model="form.tcourses"></el-input>
          </el-form-item> -->
          <el-form-item label="密码">
            <el-input v-model="form.tpassword"></el-input>
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
      dialogVisible: false, //对话框
      tableData:[
      ],
      form: {},//保存点击以后当前试卷的信息
      
      
        
    };
  },
  created() {
    
    this.getTeacherInfo();

  },
  methods: {
   
    getTeacherInfo() {
      let userId = this.$cookies.get("cid")
      console.log(userId)
      this.$axios({
        url: `/springboot/teacher/find_info`,
        method: 'post',
         data:JSON.stringify({
           id: userId
           }
         )}).then(res => {
        let resData = res.data;
        console.log(resData)
        this.tableData.push(resData)
         const arr = this.tableData[0].tcourses.map((item) => {
          return item.cname
        })
        console.log(arr)
        this.tableData[0].tcourses = arr.join(',')
       console.log('@',this.tableData)
      }).catch(error => {});
    },
  
    checkMsg(tid) { //修改教师信息
      this.dialogVisible = true
      this.$axios({
        url: `/springboot/teacher/find_info`,
        method: 'post',
         data:JSON.stringify({
          id:tid
         })
         }).then(res => {
        this.form = res.data
         const arr = this.form.tcourses.map((item) => {
          return item.cname
        })
        console.log(arr)
        this.form.tcourses = arr.join(',')
      })
    },
   
    submit() { //提交更改
    let id_11 = this.form.tphonenum
      let id_22 = this.form.tpassword
      let tid = this.$cookies.get('cid')
      this.dialogVisible = false
      this.$axios({
        url: `/springboot/teacher/find_info/update`,
        method: 'put',
        data:JSON.stringify ({
           id_1 : id_11,
          id_2 : id_22,
          id_3 : tid
        })
      }).then(res => {
        console.log(res)
        if(res.data ==200) {
          this.$message({
            message: '更新成功，请刷新页面',
            type: 'success'
          })
        }
        this.getTeacherInfo()
      })
    },
    handleClose(done) { //关闭提醒
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        }).catch(_ => {});
    },
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