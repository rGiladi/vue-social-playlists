<template>
  <div class="playlist-page">
    <div class="col left">
      <div class="playlist-details">
        <router-link :to="'/' + author + '/playlists'" tag="div" class="author-wrapper">
          {{ author }}
          <i class="material-icons home">home</i>
        </router-link>
        <toolbar :author="author" :pid="pid" @addSong="addSong" @toggleDeleteMode="toggleDeleteMode"></toolbar>
        <span class="title">{{ title }}</span>
      </div>
      <songs-list :songs="songsList" :current-song="currentSong" :author="author" :pid="pid" :deleteMode="isDeleteMode" @changeSong="changeSong"></songs-list>
    </div>
    <div class="col right">
      <music-player :songs="songsList" :current-song="currentSong" :current-song-indx="currentSongIndx" @nextSong="playNext"></music-player>
      <related-songs-list :current-song="currentSong" @changeSong="changeSong"></related-songs-list>
    </div>
  </div>
</template>

<script>
import MusicPlayer from './MusicPlayer'
import SongsList from './SongsList'
import RelatedSongsList from './RelatedSongsList'
import Toolbar from './Toolbar'

export default {
  name: 'playlist',
  components: {
    'music-player': MusicPlayer,
    'songs-list': SongsList,
    'related-songs-list': RelatedSongsList,
    'toolbar': Toolbar
  },
  data () {
    return {
      songsList: null,
      currentSong: {},
      currentSongIndx: 0,
      author: this.$route.params.username,
      title: null,
      pid: this.$route.params.playlist_id,
      isDeleteMode: false
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.loadPlaylist(sessionStorage.getItem(to.path))
    })
  },
  methods: {
    changeSong (songObj) {
      this.currentSongIndx = songObj.indx
      this.currentSong = songObj.song
    },
    playNext (songObj) {
      this.changeSong(songObj)
    },
    loadPlaylist (playlist) {
      if (playlist) {
        this.fillPlaylistData(JSON.parse(playlist))
        sessionStorage.removeItem(this.$route.path)
      } else {
        this.axios.get('/api/playlists/' + this.author + '/' + this.pid, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
          }
        })
        .then(res => {
          this.fillPlaylistData(res.data.playlist)
          this.$store.commit('logUserIn', res.data.authenticatedUser)
        }).catch(err => {
          alert(err.response.data)
          this.$router.push('/error')
        })
      }
    },
    fillPlaylistData (playlist) {
      this.songsList = playlist.songs
      this.currentSong = playlist.songs[0] || {}
      this.title = playlist.title
    },
    addSong (songObject) {
      this.songsList.push(songObject)
      this.$toast(songObject.title + ' was added to your playlist!', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 3000
      })
    },
    toggleDeleteMode () {
      this.isDeleteMode = !this.isDeleteMode
    }
  }
}
</script>

<style>

  .playlist-page {
    padding: 30px 30px;
    color: #fff;
    font-weight: bold;
    display: flex;
    width: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    overflow: auto;
  }

  .col {
    display: flex;
    flex-flow: column;
    margin: 0 15px;
  }

  .col.left {
    flex: none;
    width: calc(100% - 520px);
  }

  .col.right {
    flex: none;
  }

  .playlist-details {
    font-size: 1.8em;
    margin-bottom: 10px;
  }

  .author-wrapper {
    display: inline-flex;
    margin-bottom: 5px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    cursor: pointer;
  }

  .playlist-details .title {
    display: block;
    font-size: 1.3em;
  }

  .author-wrapper:hover {
    color: #000;
  }

  .material-icons.home {
    position: relative;
    bottom: 1px;
    left: 5px;
    font-size: 1.15em;
    transition: bottom 0.1s;
  }

  .author-wrapper:hover .home {
    color: #000;
    bottom: 5px;
  }

</style>
