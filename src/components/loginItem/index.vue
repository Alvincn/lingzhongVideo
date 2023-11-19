<template>
  <div>
    <div class="loginDialog">
      <div class="left">
        <img src="../../assets/images/logo.png" alt="">
        <div class="left-text">
          <p>凌 众 短 视 频</p>
          <span class="oneWord">--发现你的热爱--</span>
        </div>
      </div>
      <div class="right">
        <div class="right-login-container">
          <div class="right-text">
            用 户 登 录
          </div>
          <!-- 邮箱密码登录 -->
          <el-form :model="loginForm" status-icon :rules="rules" ref="ruleFormRef">
            <el-form-item label="邮&nbsp;&nbsp;&nbsp;&nbsp;箱" prop="email" style="margin: 5px 0 40px 0;">
              <el-input v-model="loginForm.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
              <el-input v-model="loginForm.code" :maxlength="6" placeholder="请输入邮箱验证码" type="number"></el-input>
              <el-button id="codeButton" :disabled="codeButtonDisabled"
                style="position: absolute;right: 0;background-color: black;color: white;"
                @click="getEmailCode">获取验证码</el-button>
            </el-form-item>
            <p style="color: gray; text-align: center;">未注册的邮箱将会自动注册</p>
            <div class="loginFormButton">
              <LoginButton @click.prevent="checkPasswordEvent(ruleFormRef)" style="margin-right: 20px;">登录</LoginButton>
            </div>
          </el-form>
        </div>
      </div>
    </div>

    <div class="mark" @click="loginHidden">

    </div>

  </div>
</template>

<script setup>
// 引入axios
import request from '@/utils/request'
import { ElMessage } from 'element-plus';
import { ref, reactive } from 'vue'
// 引入好看的按钮
import LoginButton from './loginButton/index.vue'
// 引入用户store
import useUserStore from '@/store/user'
// 使用
const userStore = useUserStore()
const ruleFormRef = ref()
// 用户登录信息收集
const loginForm = reactive({
  email: '',
  code: ''
})
// 获取验证码按钮事件
const codeButtonDisabled = ref(false)
// 事件
const emits = defineEmits(['maskHidden'])
// 验证邮箱
const checkEmail = (rule, value, callback) => {
  if (value === '') {
    // ElMessage.warning('请输入邮箱')
    callback(new Error('请输入邮箱'))
  } else {
    // 验证邮箱正则表达式
    const regEmail = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
    if (!regEmail.test(value)) {
      ElMessage.warning('请输入正确格式的邮箱')
      callback(new Error('请输入正确邮箱'))
    }
    callback()
  }
}
// 表单验证
const rules = reactive({
  email: [
    { validator: checkEmail, trigger: "blur" },
  ]
})

// 账号密码登录判断
const checkPasswordEvent = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      if (loginForm.code === '' || loginForm.code.length !== 6) {
        return ElMessage.warning('请输入正确的验证码')
      }
      emailCodeLogin()
    } else {
      return false
    }
  })
}
// 账号密码登录
const emailCodeLogin = async () => {
  try {
    await userStore.emailCodeLogin(loginForm.email, loginForm.code)
    ElMessage.success('登录成功')
    loginHidden()
    await userStore.getUserInfo()
  } catch (error) {
    ElMessage.error('登录失败')
  }
}
// 获取邮箱验证码
const getEmailCode = async () => {
  if (loginForm.email === '') {
    return ElMessage.warning('请输入邮箱')
  } else {
    const regEmail = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
    if (!regEmail.test(loginForm.email)) {
      return ElMessage.warning('请输入正确格式的邮箱')
    }
    await userStore.getEmailCode(loginForm.email)
    ElMessage.success('验证码已发送')
    let time = 60
    const codeButton = document.getElementById("codeButton")
    codeButtonDisabled.value = true
    const timer = setInterval(() => {
      if (time === 0) {
        codeButtonDisabled.value = false
        codeButton.style.color = 'white'
        clearInterval(timer)
        return codeButton.innerText = '重新获取'
      }
      codeButton.innerText = time + '秒后重新获取'
      codeButton.style.color = 'gray'
      time -= 1
    }, 1000);
  }

}
// 点击蒙层登录消失
const loginHidden = () => {
  emits('maskHidden')
}

</script>

<style scoped lang='scss'>
.loginDialog {
  position: absolute;
  width: 60%;
  min-height: 370px;
  height: 50%;
  background-color: black;
  top: 50%;
  left: 50%;
  z-index: 100;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  display: flex;

  .left {
    width: 50%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      width: 90%;
      transform: translateY(-50px);
    }

    .left-text {
      font-size: 30px;
      font-family: '宋体';
      text-align: center;
      transform: translateY(-35px);

      .oneWord {
        font-size: 15px;
      }
    }
  }

  .right {
    width: 50%;
    padding: 20px;
    padding-top: 50px;

    .right-text {
      text-align: center;
      font-size: 25px;
      margin-bottom: 30px;
    }

    :deep(.el-input) {
      border: none;
    }

    :deep(.el-input__wrapper) {
      background-color: black !important;

      box-shadow: none;
      border-bottom: solid white 1px;
    }

    .loginFormButton {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
  }
}

.mark {
  width: 100vw;
  height: 100vh;
  z-index: 99;
  background-color: rgba(0, 0, 0, .5);
  position: absolute;
  top: 0;
  left: 0;
}
</style>