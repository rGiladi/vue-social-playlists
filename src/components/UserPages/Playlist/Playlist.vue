<template>
  <div class="playlist-page">
    <div class="playlist-details-and-songs-list">
      <div class="details">
        <h1 v-text="title"></h1>
        <router-link :to="'/' + author + '/playlists'" tag="div" class="author-wrapper">
        <p v-text="author"></p>
        <i class="material-icons home">home</i>
        </router-link>
      </div>
      <!-- <tools></tools> -->
      <songs-list :songs="songsList" :current-song="currentSong" @changeSong="changeSong"></songs-list>
    </div>
    <div class="player-and-related-list">
      <youtube :video-id="currentSong.vidId" :player-width="400" :player-height="250"></youtube>
      <related-songs-list :current-song="currentSong"></related-songs-list>
    </div>
  </div>
</template>

<script>
import SongsList from './SongsList'
import RelatedSongsList from './RelatedSongsList'
import Tools from './Tools'
export default {
  name: 'playlist',
  components: {
    'songs-list': SongsList,
    'related-songs-list': RelatedSongsList,
    'tools': Tools
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
      let username = this.$route.params.username
      let pid = this.$route.params.playlist_id
      this.axios.get('/api/playlists/' + username + '/' + pid)
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
    padding: 30px 60px;
    color: #fff;
    font-weight: bold;
    display: flex;
    position: fixed;
    top: 0;
    bottom: 0;
  }

  .playlist-details-and-songs-list {
    display: flex;
    flex-flow: column;
    margin-right: 15px;
  }

  .player-and-related-list {
    width: 400px;
    display: flex;
    flex-flow: column;
    flex: 1;  
  }
  .playlist-page h1 {
    margin: 0;
    font-size: 2.4em;
  }

  .author-wrapper {
    display: flex;
    cursor: pointer;
  }

  .author-wrapper p {
    font-size: 1.8em;
    margin-right: 5px;
    margin-bottom: 15px;
    color: #000;
  }

  .material-icons.home {
    position: relative;
    bottom: 1px;
    font-size: 2em;
    color: #000;
  }

</style>
