<template>
  <div>
    <body id="poster">
    <el-form class="login-container" label-position="left"
             label-width="0px">
      <h3 class="login_title">{{$t('message.loginTitle')}}</h3>
      <el-form-item>
        <el-input type="text" v-model="loginForm.username"
                  auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" v-model="loginForm.password"
                  auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 100%;background: #505458;border: none" @click="login">{{$t('message.loginBtn')}}</el-button>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="toregister">{{$t('message.loginText')}}</el-button>
      </el-form-item>
<!--      <el-form-item style="width: 100%">-->
<!--        <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="tohome">游客模式</el-button>-->
<!--      </el-form-item>-->
    </el-form>
    </body>
    <div></div>
  </div>
</template>
<script>
    export default {
        name: "Login",
        data() {
            return {
                loginForm:{
                    username:'赵四',
                    password:'123456'
                }
            }
        },
        methods: {
            login(){
                var _this = this
                let postData = this.qs.stringify({
                    passWord:this.loginForm.password,
                    adminName:this.loginForm.username
                });
                this.axios({
                    method: 'post',
                    url:'/login',
                    data:postData
                }).then(function (response) {
                        let list = response.data
                        // if(response.data.status === 200){
                    if(list.length){
                            _this.$message({
                                message: '登录成功',
                                type: 'success'
                            })
                            let userName = _this.loginForm.username
                            let authority = list[0].authority
                            _this.$store.dispatch('setUser', true)
                            localStorage.setItem('Flag', 'isLogin')
                            localStorage.setItem('username', userName)
                            localStorage.setItem('authority', authority)
                            _this.$router.replace('/index')
                        }
                        else {
                            // alert("账号或密码错误")
                            _this.$message({
                                message: '账号或密码错误',
                                type: 'error'
                            })
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            },
            toregister(){
                this.$router.replace('/register')
            },
            loginBack () {
                    let userName = this.loginForm.username
                    this.$store.dispatch('setUser', true)
                    localStorage.setItem('Flag', 'isLogin')
                    localStorage.setItem('username', userName)
                    this.$router.replace('/index')

            }
        }
    }
</script>


<style>
  #poster {
    /*background-image: url("../../static/homeMask.png");*/
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }

  body {
    margin: 0px;
  }

  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

</style>

