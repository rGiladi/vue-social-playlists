<template> 
  <div class="playlists-list-tools">
    <div class="tool" @click="toggleAddMode">
      <i class="material-icons">add</i>
    </div>
    <div class="tool" @click="toggleDeleteMode">
      <i class="material-icons">delete</i>
    </div>
    <div class="add-box" v-show="mode === 'add'">
      <input v-model.trim="title" type="text" placeholder="Title" />
      <input v-model="password" type="password" placeholder="Password" />
      <button @click="addNewPlaylist"><i class="material-icons">check</i></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'playlists-list-tools',
  props: ['owner'],
  data () {
    return {
      mode: '',
      title: '',
      password: ''
    }
  },
  methods: {
    toggleDeleteMode () {
      this.mode = this.mode === 'delete' ? '' : 'delete'
      this.$emit('toggleDeleteMode')
    },
    toggleAddMode () {
      if (this.mode === 'delete') { this.toggleDeleteMode() }
      this.mode = this.mode === 'add' ? '' : 'add'
    },
    addNewPlaylist () {
      if (this.title && this.password) {
        this.axios.post('/api/playlists/' + this.owner,
          {
            title: this.title,
            password: this.password,
            songs: []
          },
          {
            params: {
              'auth-required': true
            },
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
            }
          }
        ).then(res => {
          this.$emit('addNewPlaylist', this.title)
          this.toggleAddMode()
          this.title = ''
          this.password = ''
        }).catch(err => {
          console.log(err.response.data.message)
        })
      } else {
        alert('You must enter a title and a password first')
      }
    }
  }
}
</script>

<style>
  .playlists-list-tools {
    display: inline-block;
    z-index: 99;
  }

  .tool {
    display: inline-block;
    background: #fff;
    width: 44px;
    height: 44px;
    line-height: 48px;
    border-radius: 50%;
    text-align: center;
    cursor: pointer;
    box-shadow: 0 3px 3px 0 rgba(0,0,0,0.14), 0 1px 7px 0 rgba(0,0,0,0.12), 0 3px 1px -1px rgba(0,0,0,0.2);
    transition: color, background 0.2s;
  }

  .tool:hover {
    color: #fff;
    background: #000;
  }

  .add-box {
    position: absolute;
    margin-top: 5px;
    z-index: 99;
  }

  .add-box input {
    display: block;
    width: 100%;
    font-size: .6em;
    margin-bottom: 5px;
  }

  .add-box button {
    width: calc(100% + 2.4em);
    color: #000;
    font-size: .4em;
    transition: color, background 0.3s;
  }

  .add-box button:hover {
    color: #fff;
    background: #000;
  }

  .add-box button .material-icons {
    position: relative;
    top: 2px;
  }
</style>