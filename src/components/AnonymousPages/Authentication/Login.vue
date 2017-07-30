<template>
  <div class="authentication">
    <div class="authentication-form">
      <h1> Login </h1>
      <form>
        <input type="text" placeholder="Enter username" v-model.trim="userName" />
        <input type="password" placeholder="Enter password" v-model.trim="userPassword" />
        <button @click.prevent="Login">Sign Up</button>
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
        localStorage.setItem('jwtToken', res.data)
        vm.$router.push(vm.userName + '/playlists') // We will create user's routes later...
      }).catch(() => {
        alert('problem occured, please refresh and try again')
      })
    }
  }
}
</script>

<style>
@import url('./auth.css');

</style>