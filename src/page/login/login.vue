<template>
  <div class="login-box">
    <div class="login-container">
        <h2>Eend商城后台管理系统</h2>
        <div class="input-container">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="demo-ruleForm form-container">
                <el-form-item class="input-box" label="用户账号：" prop="userName">
                    <el-input class="input-con" v-model="ruleForm2.userName"></el-input>
                </el-form-item>
                <el-form-item class="input-box" label="用户密码：" prop="pass">
                    <el-input class="input-con" type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="input-box" label="确认密码：" prop="checkPass">
                    <el-input class="input-con" type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="input-box">
                    <el-button class="login-btn" type="success" plain @click="submitForm('ruleForm2')">登录</el-button>
                    <el-button class="reset-btn" @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
    <video muted autoplay="autoplay" loop="loop" src="https://pic.ibaotu.com/17/86/70/29T888piCz7J.mp4"></video>
    <div class="mask"></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
      var checkuUserName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }else{
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          pass: '',
          checkPass: '',
          userName: '',
          adminName: '',//管理员用户名
          adminId: 0,//管理员id
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          userName: [
            { validator: checkuUserName, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post('api/admins/login', {
                    adminName : this.ruleForm2.userName,
                    adminPwd     : this.ruleForm2.pass,
                    confirmPwd: this.ruleForm2.checkPass
                }).then((response) => {
                let res = response.data;
                if (res.status == '0') {
                  console.log('成功')
                  this.adminName = res.result.adminName;
                  this.adminId = res.result.adminId;
                  //vuex 管理员用户名
                  this.$store.dispatch('recordAdminName',this.adminName)
                  //vuex 管理员id
                  this.$store.dispatch('recordAdminId',this.adminId)
                  //跳转到msite页面
                  this.$router.push({path:'/msite'});
                }else if(res.status == '10002'){
                  this.$notify.error({
                    title: '错误',
                    message: '用户名或密码错误！'
                  });
                }else {
                  console.log('失败' + res.msg)
                }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style lang="scss" scoped>
.login-box{
  width: 100%;
  height: 100%;
  .mask{
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.6);
  }
  video {
          position: fixed;
          left: 0px;
          right:0px;
          top: 0px;
          bottom: 0px;
          max-width: 100%;
          min-height: 100%;
          width: 100%;
          z-index: -1;
          opacity: .5;
      }
  .login-container{
      z-index: 2;
      position: relative;
      width: 40.5rem;
      height: 25rem;
      border: 0.0625rem solid #ccc;
      margin: 6.25rem auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      padding-bottom: 30px;
      h2{
          position: absolute;
          left: 0;
          top: 0.625rem;
          width: 100%;
          height: 3.125rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
      }
      .input-container:hover{
          box-shadow: 0rem 0rem 0.625rem 0.3125rem #aaa;
          -webkit-transform: scale(0.6.1);
          -moz-transform: scale(1.1);
          -ms-transform: scale(1.1);
          -o-transform: scale(1.1);
          transition: all .8s;
          margin-bottom: 0.25rem;
          z-index: 9999;
      }
      .input-container{
          padding: 1.25rem;
          // background: #fff;
          transition: bottom .8 linear 0s;
          margin-top: 1.25rem;
          .form-container{
              width: 31.25rem;
              .input-box{
                  display: flex;
                  justify-content: space-between;
                  .input-con{
                      width: 25.875rem;
                  }
                  &.input-buttom{
                      margin-bottom: 0;
                  }
              }
              .login-btn,.reset-btn{
                  width: 130px;
                  border-radius: 0;
              }
          }
      }
  }
}
</style>

<style lang="scss">
.el-form-item__label{
  color: #fff;
}
.el-input__inner{
   background: rgba(0,0,0,.0);
   color: #fff;
}
</style>

