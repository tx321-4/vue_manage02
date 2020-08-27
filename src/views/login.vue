<template>
  <div class="login-container">
    <el-form
      :model="loginForm"
      size="default"
      :rules="loginRules"
      ref="loginForm"
      class="card-box login-form"
    >
      <h3 class="title">{{title}}</h3>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
      },
      loading: false,
      pwdType: 'password'
    }
  },
  computed: {
    ...mapGetters([
      'title'
    ])
  }
}
</script>

<style lang="scss" scoped>
</style>
