 <template>
  <section class="index">
    <div class="hello">
      <i class="iconfont icon-xihuan"></i><span>欢迎登录在线考试系统,{{user.userName}}老师。</span>
    </div>
    <div class="msg">
      <p class="title">功能说明：</p >
      <ul>
        <li ><i class="iconfont icon-flag"></i>编辑个人信息</li>
        <li ><i class="iconfont icon-flag"></i>增删改查试卷试题</li>
        <li ><i class="iconfont icon-flag"></i>查询学生考试情况</li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      user: { //用户信息
        userName: null,
        userId: null
      } 
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() { //获取用户信息
      let userName = this.$cookies.get("cname")
      let userId = this.$cookies.get("cid")
      this.user.userName = userName
      this.user.userId = userId
    }
  }
}
</script>


<style lang="less" scoped>
.index {
  margin-left: 70px;
  .hello {
    font-size: 20px;
    color: #726f70;
    .icon-xihuan {
      font-size: 30px;
      color: #dd6572;
    }
  }
  .msg {
    .title {
      font-size: 16px;
      color: #000;
      margin-top: 20px;
      margin-left: 10px;
    }
    ul {
      display: flex;
      flex-direction: column;
      width: 200px;
      overflow: hidden;
    }
    li {
      margin-top: 10px;
      font-size: 14px;
      color: lightcoral;
      cursor: pointer;
      display: inline-block;
    }
  }
}
</style>