<template>
  <div class="playlist-page">
    <div class="playlist-details-and-list">
      <h1 v-text="title"></h1>
      <h2 v-text="author"></h2>
      <songs-list :songs="songsList" @changeSong="changeSong"></songs-list>
    </div>
    <div class="player">
      <music-player :current-song="currentSong"></music-player>
    </div>
  </div>
</template>

<script>
import SongsList from './SongsList'
import MusicPlayer from './MusicPlayer'
export default {
  name: 'playlist',
  components: {
    'songs-list': SongsList,
    'music-player': MusicPlayer
  },
  data () {
    return {
      songsList: null,
      currentSong: [],
      author: this.$route.params.username,
      title: null
    }
  },
  created () {
    let playlist = sessionStorage.getItem(this.$route.path)
    if (playlist && 1 === 3) {
      this.fillPlaylistData(JSON.parse(playlist))
    } else {
      this.axios.get('/api' + this.$route.path)
      .then(res => {
        this.fillPlaylistData(res.data)
      }).catch(err => {
        alert(err.response.data)
        this.$router.push('/error')
      })
    }
  },
  methods: {
    fillPlaylistData (playlist) {
      this.songsList = playlist.songs
      this.currentSong = playlist.songs[0]
      this.title = playlist.title
    },
    changeSong (song) {
      this.currentSong = song
    }
  }
}
</script>

<style>

  .playlist-page {
    padding: 15px;
    color: #fff;
    font-weight: bold;
  }

  .playlist-details-and-list {
    margin: auto;
    width: 50%;
    float: left;
  }

  .player {
    width: 400px;
    float: left;
  }
  .playlist-page h1 {
    margin: 0;
    font-size: 2.7em;
  }
</style>
