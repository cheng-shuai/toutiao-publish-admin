<template>
  <div class="login_container">
    <div class="login_box">
      <!--      logo区域-->
      <div class="login_logo">
      </div>
      <!--登录表单区域-->
      <el-form :model="user" :rules="formRules" ref="formRef">
        <!--用户名-->
        <el-form-item prop="mobile">
          <el-input v-model="user.mobile" prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
          <!--验证码-->
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="user.code" prefix-icon="el-icon-lock" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <!--        是否同意协议-->
        <el-form-item prop="agree">
          <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <!--        按钮-->
        <el-form-item>
          <el-button type="primary" round @click="onLogin" :loading="isLoading">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'

export default {
  name: 'Login',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810',
        agree: false
      },
      isLoading: false,
      formRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空',
            trigger: 'blur'
          },
          {
            pattern: /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/,
            message: '请输入正确的手机号格式',
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空',
            trigger: 'blur'
          },
          {
            pattern: /^\d{6}$/,
            message: '请输入正确的验证码格式'
          }
        ],
        agree: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('请勾选同意用户协议'))
              } else {
                callback()
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    onLogin () {
      // 表单验证
      this.$refs.formRef.validate((valid) => {
        // 如果表单验证失败，停止请求提交
        if (!valid) {
          return
        }
        // 验证通过,提交登录
        this.login()
      })
    },
    login () {
      // 获取表单数据
      // const user = this.user

      // 打开loading
      this.isLoading = true
      login(this.user).then(res => {
        console.log(res)
        this.$message.success('登录成功')
        // 成功后关闭loading
        this.isLoading = false
        // 跳转到首页
        this.$router.push('/')
      }).catch(res => {
        this.$message.error('用户名或者验证码错误')
        console.log(res)
        // 失败后关闭loading
        this.isLoading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background: url("./login_bg.jpg");
  background-size: cover;
  height: 100%;

  .login_logo {
    height: 57px;
    background: url("./logo_index.png") no-repeat center center;
    margin-bottom: 15px;
  }

  .login_box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 50px;
    min-width: 400px;
    border-radius: 10px;
    box-shadow: 1px 0 0 rgba(0, 0, 0, .3);

    .el-button {
      width: 100%;
    }

  }
}
</style>
