<template>
  <div class="user-playlists">
    <h1> {{ owner }}'s Playlists</h1>
    <div class="playlists-wrapper">
      <div v-for="playlist, $index in playlists" class="playlist-box" @click="openPlaylist(playlist, $index)">
        <img :src="playlist.songs[0].thumbnail" v-if="playlist.songs[0]" />
        <div v-text="playlist.title" class="p-title"></div>
        <span v-text="playlist.songs.length + ' Videos'" class="p-size"></span>
        <br />
        <i class="fa fa-trash delete-playlist-btn" aria-hidden="true"></i>
      </div>
    </div>
    <p v-if="!playlists" class="nothing-here"> Nothing here yet.. </p>
  </div>
</template>

<script>
export default {
  name: 'PlaylistsList',
  data () {
    return {
      owner: null,
      playlists: null
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.axios.get('/api/' + to.params.username + '/playlists', {
      }).then(res => {
        vm.playlists = res.data
        vm.owner = to.params.username
      }).catch(() => {
        vm.$router.push('/error')
      })
    })
  },
  methods: {
    openPlaylist (playlist, indx) {
      let playlistRoute = this.$route.path + '/' + indx
      this.$router.push(playlistRoute)
      sessionStorage.setItem(playlistRoute, JSON.stringify(playlist))
    }
  }
}
</script>

<style>

  .user-playlists {
    padding: 45px;
  }

  .user-playlists h1 {
    font-size: 2.3em;
    margin: 0 0 10px 0;
  }

  .playlists-wrapper {
    display: flex;
    justify-content: space-between;
    flex-flow: row wrap;
  }

  .user-playlists .playlist-box {
    width: 20%;
    padding: 10px;
    margin-bottom: 5px;
    color: #ebebeb;
    font-weight: bold;
    background: rgba(0,0,0,0.1);
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    cursor: pointer;
  }

  .playlist-box img {
    width: 100%;
    height: 140px;
  }

  .playlist-box .p-title {
    font-size: 1.4em;
    margin: 5px 0;
  }

  .playlist-box .p-size {
    font-size: 1.2em;
    opacity: .8;
  }

  /* Add Playlist */

  .add-playlist-details {
    position: absolute;
    bottom: 3.2em;
    right: 20px;
    width: 360px;
  }

  .add-playlist-details>input {
    display: block;
    width: 100%;
    padding: 0.4em;
    margin-bottom: 10px;
  }
  
  .add-playlist-btn {
    margin: 0;
    padding: 0;
    border: 0;
    box-shadow: none;
    height: 47.41px;
    width: calc(100% + 1em);
    background: #9733EE;
    line-height: 47.41px;
    color: #fff;
    transition: color 0.2s;
  }

  .add-playlist-btn:hover {
    color: #000;
  }
  
  .fa-check {
    font-size: 2.4em;
  } 

  .nothing-here {
    display: block;
  }

</style>
