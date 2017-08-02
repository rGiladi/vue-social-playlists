<template>
  <div class="user-playlists">
    <h1> {{ owner }}'s Playlists</h1>
    <div class="playlists-wrapper">
      <div v-for="playlist, $index in playlists" class="playlist-box" @click="openPlaylist(playlist, $index)">
        <img :src="playlist.songs[0].thumbnail" v-if="playlist.songs[0]" />
        <div v-text="playlist.title" class="p-title"></div>
        <span v-text="playlist.songs.length + ' Videos'" class="p-size"></span>
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
      let username = to.params.username
      vm.axios.get('/api/playlists/' + username)
      .then(res => {
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
    padding: 30px;
    position: fixed;
    top: 0;bottom: 0;
    overflow: auto;
  }

  .user-playlists h1 {
    font-size: 2.3em;
    margin: 0 0 15px 0;
  }

  .playlists-wrapper {
    display: flex;
    justify-content: space-between;
    flex-flow: row wrap;
  }

  .playlist-box {
    position: relative;
    display: flex;
    flex-flow: column;
    width: 22%;
    padding: 10px;
    margin-bottom: 15px;
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
    font-size: 1.2em;
    margin: 5px 0;
  }

  .playlist-box .p-size {
    position: absolute;
    bottom: 10px;
    font-size: 1em;
    opacity: .8;
  }

  .nothing-here {
    display: block;
  }

</style>
