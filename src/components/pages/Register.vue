<template>
  <body id="paper">
  <el-form :model="registerForm" :rules="rules" class="login-container" label-position="left"
           label-width="0px" v-loading="loading">
    <h3 class="login_title">用户注册</h3>
    <el-row :gutter="20">
      <el-col :span="12"><el-form-item prop="name">
        <el-input type="text" v-model="registerForm.name"
                  auto-complete="off" placeholder="账号(用户名)"></el-input>
      </el-form-item></el-col>
      <el-col :span="12"> <el-form-item prop="password">
        <el-input type="password" v-model="registerForm.password"
                  auto-complete="off" placeholder="密码"></el-input>
      </el-form-item></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item prop="email">
          <el-input type="text" v-model="registerForm.email"
                  auto-complete="off" placeholder="邮箱"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="passwordConfirm">
          <el-input type="password" v-model="registerForm.passwordConfirm"
                    auto-complete="off" placeholder="确认密码"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item prop="phone">
          <el-input type="text" v-model="registerForm.phone"
                    auto-complete="off" placeholder="手机号"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="address">
          <el-input type="text" v-model="registerForm.address"
                    auto-complete="off" placeholder="住址"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item prop="sex">
<!--      <el-input type="text" v-model="registerForm.sex"-->
<!--                auto-complete="off" placeholder="性别"></el-input>-->
      <el-radio-group  v-model="registerForm.sex" size="medium">
        <el-radio border label="男">男</el-radio>
        <el-radio border label="女">女</el-radio>
      </el-radio-group>
    </el-form-item>


    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;border: none;" @click="register">立即注册</el-button>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;border: none;" v-on:click="tologin">返回</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>

<script>
    export default{
        name: 'Register',
        data () {
            return {
                rules: {
                    name: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
                    password: [{required: true, message: '密码不能为空', trigger: 'blur'}],
                    passwordConfirm: [{required: true, message: '密码不能为空', trigger: 'blur'}]
                },
                checked: true,
                registerForm: {
                    name: '',
                    password: '',
                    passwordConfirm: '',
                    email:'',
                    phone:'',
                    address:'',
                    sex:'',
                    authority:0
                },
                loading: false
            }
        },
        methods: {
            register () {
                var _this = this
                if (this.registerForm.password !== this.registerForm.passwordConfirm) {
                    this.$message({
                        message: '两次输入的密码不一致',
                        type: 'error'
                    })
                    return
                }
                // this.axios.post("/register",{
                //     username:this.registerForm.username,
                //     password:this.registerForm.password,
                // })
                let postData = this.qs.stringify({
                    email: this.registerForm.email,
                    password: this.registerForm.password,
                    phone: this.registerForm.phone,
                    address: this.registerForm.address,
                    sex: this.registerForm.sex,
                    name: this.registerForm.name,
                    authority: this.registerForm.authority
                });

                let selectName = this.qs.stringify({
                    name: this.registerForm.name
                });
                this.axios({
                    method: 'post',
                    url: '/ListByNameAdmin',
                    data: selectName
                }).then(response =>
                {
                    console.log(response.data)
                    if(response.data){
                        this.axios({
                            method: 'post',
                            url:'/insertAdmin',
                            data:postData
                        }).then(function (response) {
                                console.log(response.data)
                                if(response.data === 1){
                                      _this.$message({
                                        message: '恭喜你，注册成功',
                                        type: 'success'
                                    })
                                    _this.$router.replace('/login')
                                }
                            })
                            .catch(function (error) {
                                console.log(error)
                            })
                    }else {
                    _this.$message({
                        message: '该用户名已存在，请更换一个',
                        type: 'error'
                    })
                }
                }).catch(error =>
                {
                    console.log(error);
                });

                // this.axios({
                //     method: 'post',
                //     url:'/insertAdmin',
                //     data:postData
                // }).then(function (response) {
                //         console.log(response.data)
                //         if(response.data === 1){
                //             alert("恭喜你，注册成功")
                //             //   _this.$message({
                //             //   message: '恭喜你，注册成功',
                //             //   type: 'success'
                //             // })
                //             _this.$router.replace('/login')
                //         }
                //         else {
                //             _this.$message({
                //                 message: '该用户名已存在，请更换一个',
                //                 type: 'error'
                //             })
                //         }
                //     })
                //     .catch(function (error) {
                //         console.log(error)
                //     })
            },
            tologin () {
                this.$router.replace('/login')
            }
        }
    }
</script>

<style>
  #paper {
    /*background:url("../assets/img/bg/eva1.jpg") no-repeat;*/
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: -5px 0px;
  }
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 160px auto;
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
  .login_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
  }
</style>
<!-- i18n -->
<!--<template>-->
<!--  <div>-->
<!--    <span>{{$t('message.text')}}</span>-->
<!--    <el-select v-model="selectValue" @change="langChange" placeholder="请选择">-->
<!--      <el-option-->
<!--        v-for="item in options"-->
<!--        :key="item.value"-->
<!--        :label="item.label"-->
<!--        :value="item.value">-->
<!--      </el-option>-->
<!--    </el-select>-->
<!--    <el-button></el-button>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--    export default {-->
<!--        data () {-->
<!--            return {-->
<!--                selectValue:'',-->
<!--                options:[-->
<!--                    {-->
<!--                        value: 'cn',-->
<!--                        label: '中文'-->
<!--                    }, {-->
<!--                        value: 'en',-->
<!--                        label: 'English'-->
<!--                    }-->
<!--                ]-->
<!--            }-->
<!--        },-->
<!--        created() {-->
<!--            let that = this;-->
<!--            console.log(localStorage.lang)-->
<!--            that.selectValue = localStorage.lang == undefined?'cn':localStorage.lang-->
<!--        },-->
<!--        methods: {-->
<!--            //语言切换-->
<!--            langChange(e){-->
<!--                // console.log(e)-->
<!--                localStorage.setItem('lang',e);-->
<!--                this.$i18n.locale = e;-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--</script>-->

