
<template>
  <div class="all">
    <div class="table">
    <el-table :data="tableData" border>
      <el-table-column fixed="left" prop="sname" label="姓名" width="180"></el-table-column>
      <el-table-column prop="scollege" label="学院" width="200"></el-table-column>
      <el-table-column prop="sgender" label="性别" width="120"></el-table-column>
      <el-table-column prop="sphonenum" label="联系方式" width="120"></el-table-column>
      <el-table-column prop="sid" label="学号" width="120"></el-table-column>
      <el-table-column prop="scourses" label="课程" width="120"></el-table-column>
      
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="checkMsg(scope.row.sid)" type="primary" size="small">编辑</el-button>
          <el-button @click="chooseCourses(scope.row.sid) ;showCourses()" type="primary" size="small">选课</el-button>
        </template>
      </el-table-column>
    </el-table>
   </div>
    
    <el-dialog
      title="编辑您的信息"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <section class="update">
        <el-form ref="form" :model="form" label-width="80px">
          <!-- <el-form-item label="姓名">
            <el-input v-model="form.sname"></el-input>
          </el-form-item>
          <el-form-item label="学院">
            <el-input v-model="form.scollege"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="form.sgender"></el-input>
          </el-form-item> -->
          <el-form-item label="电话号码">
            <el-input v-model="form.sphonenum"></el-input>
          </el-form-item>
          <!-- <el-form-item label="学号">
            <el-input v-model="form.sid"></el-input>
          </el-form-item> -->
          <el-form-item label="密码">
            <el-input v-model="form.spassword"></el-input>
          </el-form-item>
         
         
        </el-form>
      </section>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </span>


    </el-dialog>
    <el-dialog
      title="更改选课"
      :visible.sync="dialogV"
      width="90%"
      :before-close="handleClose">
      <section class="update">
        <el-transfer
    v-model="value"
    :titles="['未选课程','已选课程']"
    :data="transferData">
  </el-transfer>
      </section>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitC()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false, //对话框
      dialogV:false,
      tableData:[
       
      ],
      form: {},//保存点击以后当前试卷的信息
      
      transferData:[],
      value:[]
    };
  },
  created() {
    this.getStudentInfo();
  },
  methods: {
    getStudentInfo() {
      let userId = this.$cookies.get("cid")
      console.log(userId)
      this.$axios({
        url: `/springboot/student/find_info`,
        method: 'post',
         data:JSON.stringify({
           id: userId
           }
         )}).then(res => {
        let resData = res.data;
        console.log(resData)
        
        this.tableData.push(resData)
        const arr = this.tableData[0].scourses.map((item) => {
          return item.cname
        })
       console.log(arr)
        this.tableData[0].scourses = arr.join(',')
        
      }).catch(error => {});
    },
  
  
    checkMsg(sid) { 
     
      this.dialogVisible = true
      this.$axios({
        url: `/springboot/student/find_info`,
        method: 'post',
        data: JSON.stringify({
          id:sid
        })
      }).then(res=>{
       
        this.form = res.data
         const arr = this.form.scourses.map((item) => {
          return item.cname
        })
        console.log(arr)
        this.form.scourses = arr.join(',')
      })
    },
   
    submit() { //提交更改
      let id_11 = this.form.sphonenum
      let id_22 = this.form.spassword
      let sid = this.$cookies.get('cid')
      this.dialogVisible = false
      this.$axios({
        url: '/springboot/student/find_info/update1',
        method: 'put',
        data: JSON.stringify({
          id_1 : id_11,
          id_2 : id_22,
          id_3 : sid
        })
      }).then(res => {
        console.log(res)
        if(res.data ==200) {
          this.$message({
            message: '更新成功，请刷新页面',
            type: 'success'
          })
        }
        this.getStudentInfo()
      })
    },
    chooseCourses(sid){
      
      this.$axios({
        url: `/springboot/student/find_info`,
        method: 'post',
        data: JSON.stringify({
          id:sid
        })
      }).then(res=>{
        let resData = res.data
         const arr = resData.scourses.map((item) => {
          return Number(item.cid)-1
        })
        
        this.value = arr
       

      })
      },
    showCourses() {
      this.dialogV = true
      this.$axios({
        url:'/springboot/student/find_cour',
        method:'get',
       }).then(res => {
        let resData = res.data
      let data = []
      
       resData.forEach((item,index)=> {
          data.push({
            label:item.cname,
            key:index
          })

        })
        this.transferData = data
      })},
     
     submitC(){
      let arr = this.value.map(function (index) {
        return index + 1
    })
    for(var i = 0;i<arr.length;i++){
    if(arr[i] == 0){
      arr.splice(i,1);
  }
}
      let ssid = this.$cookies.get('cid')
       this.dialogV = false
       console.log('11111111111111111111111111111111111',arr)
      this.$axios({
        url: '/springboot/student/find_info/update2',
        method: 'put',
        data: JSON.stringify({
          
          cid:arr,
          sid:ssid
        
      })
      }).then(res => {
        console.log(res)
        if(res.data == 200) {
          this.$message({
            message: '更新成功，请刷新页面',
            type: 'success'
          })
        }
        this.getStudentInfo()
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
  margin-top:200px;
  margin-bottom:200px;
  margin-left: 170px;
  .table  {
   width:90%; 
  }
}
.el-table .warning-row {
  background: #000 !important;
}

.el-table .success-row {
  background: #dd5862;
}

</style>




<!-- <script>
  export default {
    data() {
      const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            value: i,
            desc: `备选项 ${ i }`,
            disabled: i % 4 === 0
          });
        }
        return data;
      };
      return {
        data: generateData(),
        value: []
      };
    }
  };
</script> -->