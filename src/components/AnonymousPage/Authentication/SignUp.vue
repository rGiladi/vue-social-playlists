<template>
  <div class="sign-up">
    <div class="sign-up-form">
      <h1> Sign Up </h1>
      <ul>
        <li v-for="error in errors" v-text="error"/>
      </ul>
      <form>
        <input type="text" placeholder="Enter username" v-model.trim="userName" />
        <input type="text" placeholder="Enter Email" v-model.trim="userEmail" />
        <input type="password" placeholder="Enter password" v-model.trim="userPassword" />
        <input type="password" placeholder="Enter password again" v-model.trim="passwordMatch" />
        <button class="signup-btn" @click.prevent="signUp">Sign Up</button>
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
        vm.axios({
          method: 'post',
          url: '/api/sign-up',
          data: {
            username: vm.userName,
            email: vm.userEmail,
            password: vm.userPassword,
            passwordMatch: vm.passwordMatch
          }
        }).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
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

.sign-up {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: calc(100% - 60px);
  width: 100%;
  overflow-y: auto;
}

.sign-up-form {
  width: 100%;
  max-height: calc(100% - 60px);
}

.sign-up h1 {
  margin-top: 0;
  color: #fff;
}

.sign-up input {
  display: block;
  width: 45%;
  margin: auto;
  margin-bottom: 15px;
  font-size: 1.4em;
}

.sign-up ul {
  margin-bottom: 21px;
}

.signup-btn {
  margin-bottom: 8px;
}

</style>