<template>
  <div class="error-page">
      <h1 v-text="errorMessageByType" v-if="type"></h1>
      <router-link to="/" tag="div" class="btn-circle">
        <i class="material-icons home">home</i>
      </router-link>
  </div>
</template>

<script>
export default {
  name: 'error-handler',
  data () {
    return {
      type: 'default'
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      let error = vm.$store.getters.getError
      if (error) {
        vm.type = error.type
      }
    })
  },
  computed: {
    errorMessageByType () {
      let messages = {
        default: 'There was an error...',
        400: 'User doesn\'t exists',
        401: 'You don\'t have permission to view this page'
      }
      return messages[this.type]
    }
  }
}

</script>

<style>

  .error-page {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    text-align: center;
  }

  .error-page .btn-circle {
    height: 64px;
    width: 64px;
    line-height: 72px;
  }

  .error-page .material-icons.home {
    font-size: 2.6em;
    line-height: 63px;
  }

</style>