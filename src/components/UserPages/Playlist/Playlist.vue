<template>
  <div class="playlist-page">
    <div class="col left">
      <div class="playlist-details">
        <div class="author-wrapper" @click="returnHome">
          {{ author }}
          <i class="material-icons home">home</i>
        </div>
        <toolbar :author="author" :pid="pid" @addSong="addSong" @toggleDeleteMode="toggleDeleteMode"></toolbar>
        <span class="title">{{ title }}</span>
      </div>
      <songs-list :songs="songsList" :current-song="currentSong" :author="author" :pid="pid" :deleteMode="isDeleteMode" @deleteSong="deleteSong" @changeSong="changeSong"></songs-list>
    </div>
    <div class="col right">
      <music-player :songs="songsList" :current-song="currentSong" :current-song-indx="currentSongIndx" @nextSong="playNext"></music-player>
      <related-songs-list :current-song="currentSong" @changeSong="changeSong"></related-songs-list>
    </div>
    <div class="slider-cover" :class="{ active: slide }"></div>
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
      isDeleteMode: false,
      slide: false
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      let playlist = vm.$store.getters.getLoadedPlaylist
      if (playlist) { // If playlist has already been loaded
        vm.fillPlaylistData(playlist)
      } else {
        vm.loadPlaylist()
      }
    })
  },
  methods: {
    loadPlaylist (playlist) {
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
        this.$router.push('/')
      })
    },
    fillPlaylistData (playlist) {
      this.songsList = playlist.songs
      this.currentSong = playlist.songs[0] || {}
      this.title = playlist.title
    },
    changeSong (songObj) {
      this.currentSongIndx = songObj.indx
      this.currentSong = songObj.song
    },
    playNext (songObj) {
      this.changeSong(songObj)
    },
    addSong (songObject) {
      this.songsList.push(songObject)
      this.$toast(songObject.title + ' was added to your playlist!', {duration: 4500})
    },
    deleteSong (obj) {
      this.songsList.splice(obj.indx, 1)
      this.$toast(obj.song.title + ' was deleted from your playlist!', {duration: 4500})
    },
    toggleDeleteMode () {
      this.isDeleteMode = !this.isDeleteMode
    },
    returnHome () {
      this.slide = true
      setTimeout(() => {
        this.$router.push('/' + this.author + '/playlists')
        this.slide = false
      }, 500)
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

  .playlist-page .material-icons.home {
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

  .playlist-page .slider-cover {
    position: fixed;
    top: 100vh;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    background: linear-gradient(to bottom, #9733EE, #DA22FF) no-repeat;
    transition: top .5s;
  }

  .slider-cover.active {
    top: 0;
    opacity: 1;
    z-index: 999;
  }

  @media only screen and (max-width: 913px) {
    .playlist-page {
      min-width: 913px;
      flex-basis: auto;
      flex: 0;
      flex-grow: 1;
    }

    body {
      overflow: hidden;
    }
  }
</style>
