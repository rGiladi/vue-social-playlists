<template>
  <div class="authentication">
    <div class="authentication-form">
      <h1> Login </h1>
      <form>
        <input type="text" placeholder="Enter username" v-model.trim="userName" />
        <input type="password" placeholder="Enter password" v-model="userPassword" />
        <button @click.prevent="Login">Log In</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      userName: '',
      userPassword: ''
    }
  },
  methods: {
    Login () {
      let vm = this
      return vm.axios({
        method: 'post',
        url: '/api/auth/login',
        data: {
          username: vm.userName,
          password: vm.userPassword
        }
      }).then(res => {
        localStorage.setItem('user', res.data.username)
        localStorage.setItem('jwtToken', res.data.jwt)
        vm.$router.push(vm.userName + '/playlists') // We will create user's routes later...
      }).catch(() => {
        alert('Incorrect username/password')
      })
    }
  }
}
</script>

<style>
@import url('./auth.css');

</style>