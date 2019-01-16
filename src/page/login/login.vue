<template>
    <div class="login-container">
        <h2>Eend商城后台管理系统</h2>
        <div class="input-container">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="demo-ruleForm form-container">
                <el-form-item class="input-box" label="用户账号：" prop="userName">
                    <el-input class="input-con" v-model.number="ruleForm2.userName"></el-input>
                </el-form-item>
                <el-form-item class="input-box" label="用户密码：" prop="pass">
                    <el-input class="input-con" type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="input-box" label="确认密码：" prop="checkPass">
                    <el-input class="input-con" type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="input-box">
                    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                    <el-button @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
      var checkuUserName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
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
          userName: ''
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
            alert('submit!');
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
.login-container{
    position: relative;
    width: 40.5rem;
    height: 25rem;
    border: 0.0625rem solid #ccc;
    margin: 100px auto;
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
        width: 500px;
        padding: 1.25rem;
        background: #fff;
        transition: bottom .8 linear 0s;
        margin-top: 20px;
        .form-container{
            width: 500px;
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
                width: 12.5rem;
            }
        }
    }
}
</style>
