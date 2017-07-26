<template>
  <div class="authentication">
    <div class="authentication-form">
      <h1> Sign Up </h1>
      <ul>
        <li v-for="error in errors" v-text="error"/>
      </ul>
      <form>
        <input type="text" placeholder="Enter username" v-model.trim="userName" />
        <input type="text" placeholder="Enter Email" v-model.trim="userEmail" />
        <input type="password" placeholder="Enter password" v-model.trim="userPassword" />
        <input type="password" placeholder="Enter password again" v-model.trim="passwordMatch" />
        <button @click.prevent="signUp">Sign Up</button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength, maxLength, email, sameAs, alphaNum } from 'vuelidate/lib/validators'

export default {
  name: 'sign-up',
  data () {
    return {
      userName: '',
      userEmail: '',
      userPassword: '',
      passwordMatch: '',
      errors: []
    }
  },
  methods: {
    signUp () {
      if (this.validateFields()) {
        let vm = this
        return vm.axios({
          method: 'post',
          url: '/api/auth/sign-up',
          data: {
            username: vm.userName,
            email: vm.userEmail,
            password: vm.userPassword,
            passwordMatch: vm.passwordMatch
          }
        }).then(res => {
          localStorage.setItem('jwtToken', res.data)
          vm.$router.push('/' + vm.userName) // We will create user's routes later...
        }).catch((err) => {
          if (err.response.status === 409) {
            vm.errors.push('Username or email are already in use')
          } else {
            alert('problem occured, please refresh and try again')
          }
        })
      }
    },
    validateFields () {
      this.errors = []
      let errMsgs = {
        userName: 'Username must contain 4 to 22 alphanumeric characters',
        userEmail: 'Not a valid email address',
        userPassword: 'Password must contain 6 to 32 characters',
        passwordMatch: 'Passwords don`t match'
      }
      Object.keys(this.$v.$params).forEach((field) => {
        for (let validator in this.$v[field].$params) {
          if (!this.$v[field][validator]) {
            this.errors.push(errMsgs[field])
            return false
          }
        }
      })
      return this.errors.length === 0 || false
    }
  },
  validations: {
    userName: {
      required,
      alphaNum,
      minLength: minLength(4),
      maxLength: maxLength(22)
    },
    userEmail: {
      required,
      email
    },
    userPassword: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(32)
    },
    passwordMatch: {
      required,
      sameAsUserPassword: sameAs('userPassword')
    }
  }
}
</script>

<style>
@import url('./auth.css');

</style>