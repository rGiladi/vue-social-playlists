<template>
  <div class="user-playlists" v-show="owner">
    <div class="header">
      <div class="title"> {{ owner }}'s Playlists</div>
      <span @click="logout" class="btn-logout">Logout</span>
    </div>
    <toolbar :owner="owner" @addNewPlaylist="addNewPlaylist" @toggleDeleteMode="toggleDeleteMode"></toolbar>
    <transition-group name="playlists-list" tag="div" class="playlists-wrapper">
      <div v-for="playlist, $indx in playlists" class="playlist-box" @click="openPlaylist(playlist, $indx)" :key="$indx">
        <img :src="playlist.songs[0].thumbnail" v-if="playlist.songs[0]" />
        <span v-text="playlist.songs.length + ' Videos'" class="p-size"></span>
        <span v-text="playlist.title" class="p-title"></span>
        <i class="material-icons btn-delete" @click.stop="deletePlaylist($indx)" v-show="deleteMode">delete</i>
      </div>
    </transition-group>
    <p v-if="playlists && playlists.length === 0" class="nothing-here"> Nothing here yet.. </p>
    <div class="slider-cover" :class="{ active: slide }"></div>
    <div class="logout-cover" :class="{ active: onLogout }"></div>
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
      deleteMode: false,
      slide: false,
      onLogout: false
    }
  },
  created () {
    this.owner = this.$route.params.username
    if (localStorage.getItem('user')) {
      axios.get('/api/playlists/' + this.owner, {
        params: {
          'auth-required': true
        },
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
        }
      }).then(res => {
        this.playlists = res.data.length === 0 ? [] : res.data
        this.$store.commit('logUserIn', this.owner)
      }).catch(err => {
        switch (err.response.status) {
          case 401:
            if (typeof err.response.data === 'object' && err.response.data.userFromToken) {
              this.$store.commit('setError', {
                type: 401
              })
              this.$router.push('/error')
            } else {
              localStorage.clear()
              this.$router.push('/login')
            }
            break
          case 400:
            this.$store.commit('setError', {
              type: 400
            })
            this.$router.push('/error')
        }
        this.$destroy()
      })
    } else {
      this.$store.commit('setError', {
        type: 401
      })
      this.$router.push('/error')
      this.$destroy()
    }
  },
  methods: {
    openPlaylist (playlist, indx) {
      this.slide = true
      setTimeout(() => {
        this.$router.push(this.$route.path + '/' + indx)
        this.$store.commit('setLoadedPlaylist', playlist)
        this.slide = false
      }, 500)
    },
    logout () {
      this.onLogout = true
      setTimeout(() => {
        this.$store.commit('logUserOut')
        this.$router.push('/')
        this.$destroy()
      }, 550)
    },
    addNewPlaylist (title) {
      this.playlists.push({
        title: title,
        password: '',
        songs: []
      })
      this.$toast('New playlist "' + title + '" has been added!', {duration: 4500})
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
            this.$toast('"' + this.playlists[indx].title + '" was deleted from your list', {duration: 4500})
            this.playlists.splice(indx, 1)
          }).catch(err => {
            alert(err.response.data)
          })
      }
    }
  }
}
</script>

<style>

  .user-playlists {
    height: 100%;
    padding: 20px 45px;
    overflow: auto;
  }

  .user-playlists .header {
    font-size: 2.2em;
    font-weight: bold;
    margin-bottom: 5px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .user-playlists .title {
    display: flex;
    flex-flow: column;
    margin: 0 15px 0px 0;
    overflow-wrap: break-word;
    max-width: 100%;
  }

  .btn-logout {
    color: #fff;
    cursor: pointer;
    transition: bottom 0.1s;
  }

  .btn-logout:hover {
    bottom: 5px;
  }

  .playlists-wrapper {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    margin: 0 -10px;
  }

  .playlist-box {
    position: relative;
    bottom: 0;
    display: flex;
    flex-flow: column;
    flex: 1;
    flex-basis: 250px;
    flex-grow: 0;
    flex-shrink: 0;
    margin: 0 10px;
    padding: 10px;
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 1em;
    background: rgba(0,0,0,0.1);
    color: #ebebeb;
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
  
  .playlist-box .p-title {
    font-size: 1.2em;
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

  .playlists-list-enter-active, .song-list-leave-active {
    transition: all 0.4s;
  }
  .playlists-list-enter, .song-list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  .user-playlists .slider-cover {
    position: fixed;
    top: -100vh;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    background: linear-gradient(to bottom, #9733EE, #DA22FF) no-repeat;
    transition: top .5s;
  }

  .user-playlists .slider-cover.active {
    top: 0;
    opacity: 1;
    z-index: 999;
  }

  .user-playlists .logout-cover {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.6);
    opacity: 0;
    z-index: -10;
    transition: opacity .1s;
  }

  .user-playlists .logout-cover.active {
    z-index: 999;
    opacity: 1;
  }

  @media only screen and (max-width: 656px) {
    .user-playlists {
      padding: 20px 25px;
    }
    .user-playlists .header {
      flex-flow: column;
    }

    .btn-logout {
      right: 40px;
    }
  }

  @media only screen and (max-width: 482px) {
    .user-playlists .header {
      font-size: 1.8em;
    }
    .playlist-box {
      flex-basis: 225px;
    }
  }

</style>
