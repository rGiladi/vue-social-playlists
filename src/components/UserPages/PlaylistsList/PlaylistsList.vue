<template>
  <div class="user-playlists">
    <div class="header">
      <span class="title"> {{ owner }}'s Playlists</span>
      <toolbar :owner="owner" @addNewPlaylist="addNewPlaylist" @toggleDeleteMode="toggleDeleteMode"></toolbar>
      <span @click="logout" class="btn-logout">Logout</span>
    </div>
    <div class="playlists-wrapper">
      <div v-for="playlist, $indx in playlists" class="playlist-box" @click="openPlaylist(playlist, $indx)">
        <img :src="playlist.songs[0].thumbnail" v-if="playlist.songs[0]" />
        <span v-text="playlist.songs.length + ' Videos'" class="p-size"></span>
        <span v-text="playlist.title" class="p-title"></span>
        <i class="material-icons btn-delete" @click.stop="deletePlaylist($indx)" v-show="deleteMode">delete</i>
      </div>
    </div>
    <p v-if="!playlists" class="nothing-here"> Nothing here yet.. </p>
  </div>
</template>

<script>
import Toolbar from './Toolbar'
import axios from 'axios'

export default {
  name: 'playlists-list',
  components: {
    toolbar: Toolbar
  },
  data () {
    return {
      owner: null,
      playlists: null,
      deleteMode: false
    }
  },
  beforeRouteEnter (to, from, next) {
    let username = to.params.username
    axios.get('/api/playlists/' + username, {
      params: {
        'auth-required': true
      },
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
      }
    }).then(res => {
      next(vm => {
        vm.playlists = res.data
        vm.owner = username
        vm.$store.commit('logUserIn', username)
      })
    }).catch(err => {
      switch (err.response.status) {
        case 401:
          if (typeof err.response.data === 'string') {
            next('/' + err.response.data + '/playlists?re')
          } else {
            next('/login')
            localStorage.clear()
          }
          break
        case 400:
          next('/error')
          console.log(err.response)
      }
    })
  },
  methods: {
    openPlaylist (playlist, indx) {
      let playlistRoute = this.$route.path + '/' + indx
      this.$router.push(playlistRoute)
      sessionStorage.setItem(playlistRoute, JSON.stringify(playlist))
    },
    logout () {
      this.$store.commit('logUserOut')
      this.$router.push('/')
      this.$destroy()
    },
    addNewPlaylist (title) {
      this.playlists.push({
        title: title,
        password: '',
        songs: []
      })
    },
    toggleDeleteMode () {
      this.deleteMode = !this.deleteMode
    },
    deletePlaylist (indx) {
      if (confirm('Are you sure you want to delete this playlist?')) {
        this.axios.delete('/api/playlists/' + this.owner,
          {
            params: {
              'pid': indx,
              'auth-required': true
            },
            headers: {
              'Authorization': 'Bearer ' + (localStorage.getItem('jwtToken') || '')
            }
          }).then(() => {
            this.playlists.splice(indx, 1)
          }).catch(err => {
            console.log(err.response.data.message)
          })
      }
    }
  }
}
</script>

<style>

  .user-playlists {
    padding: 30px 45px;
    overflow: auto;
  }

  .user-playlists .header {
    font-size: 2.2em;
    font-weight: bold;
    margin-bottom: 15px;
  }

  .user-playlists .title {
    display: inline-block;
    margin: 0 0 15px 0;
  }

  .btn-logout {
    position: relative;
    bottom: 0;
    float: right;
    color: #fff;
    cursor: pointer;
    transition: bottom 0.1s;
  }

  .btn-logout:hover {
    bottom: 5px;
  }

  .playlists-wrapper {
    display: flex;
    padding-left: 25px;
    flex-flow: row wrap;
  }

  .playlist-box {
    position: relative;
    bottom: 0;
    display: flex;
    flex-flow: column;
    margin: 0 5px;
    width: 22%;
    padding: 10px;
    margin-bottom: 15px;
    color: #ebebeb;
    font-weight: bold;
    font-size: 1em;
    background: rgba(0,0,0,0.1);
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    cursor: pointer;
    transition: bottom 0.1s;
  }

  .playlist-box:hover {
    bottom: 5px;
  }

  .playlist-box img {
    width: 100%;
    height: 140px;
    margin-bottom: 15px;
  }

  .playlist-box .p-size {
    font-size: .8em;
    opacity: .8;
    margin-bottom: 7.5px;
  }

  .btn-delete {
    position: absolute;
    right: 15px;
    font-size: 2em;
    color: #FF5964;
    margin-top: 2px;
    margin-left: 2px;
    transition: font-size 0.1s;
  }

  .btn-delete:hover {
    font-size: 2.4em;
  }

  .nothing-here {
    display: block;
  }

</style>
