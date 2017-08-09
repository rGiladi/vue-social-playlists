<template>
  <div class="songs-from-youtube-box">
    <label for="yt-url" class="yt-label">Ex: https://www.youtube.com/watch?v=d_HlPboLRL8</label>
    <input type="text" placeholder="Song's URL" class="yt-url" name="yt-url" v-model.trim="songUrl"/>
    <i class="material-icons add-icon" @click="addSong" v-show="showOrHideAddButton">add_circle_outline</i>
    <div class="yt-video-details" v-show="ytSongObject.title">
      <img :src="ytSongObject.thumbnail" />
      <p v-text="ytSongObject.title" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'get-songs-from-youtube',
  props: ['mode'],
  data () {
    return {
      songUrl: '',
      ytSongObject: {
        title: '',
        thumbnail: '',
        time: '',
        vidId: ''
      },
      showOrHideAddButton: true
    }
  },
  mounted () {
    if (this.mode === 'playlist') {
      this.showOrHideAddButton = false
    }
  },
  methods: {
    getSongObjectFromYoutube (url) {
      let vidId = this.$youtube.getIdFromURL(url)
      if (vidId !== url) {
        return this.axios.get('https://www.googleapis.com/youtube/v3/videos', {
          params: {
            id: vidId,
            part: 'snippet,contentDetails',
            key: 'AIzaSyAtwxH_RK0NDVhNYLcTERQ9tTvAkBc01cQ'
          }
        }).then(res => {
          console.log(res.data.items[0].contentDetails.duration)
          this.ytSongObject.title = res.data.items[0].snippet.title
          this.ytSongObject.thumbnail = res.data.items[0].snippet.thumbnails.medium.url
          this.ytSongObject.time = this.convertYoutubeTime(res.data.items[0].contentDetails.duration)
          this.ytSongObject.vidId = vidId
          this.showOrHideAddButton = true
        }).catch(() => {
          this.showOrHideAddButton = false
          alert('Something went wrong, please refresh and try again')
        })
      } else {
        this.ytSongObject.songUrl = ''
        this.showOrHideAddButton = false
        alert('Not a valid url!')
      }
    },
    convertYoutubeTime (duration) {
      let match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)
      let h = (parseInt(match[1]) || 0) * 3600
      let m = (parseInt(match[2]) || 0) * 60
      let s = (parseInt(match[3]) || 0)
      let time = new Date((h + m + s) * 1000).toISOString().substr(11, 8)

      /* eslint-disable space-in-parens */
      return h === 0 ? time.substr(3, ) : time
    },
    addSong () {
      this.$emit('addSong', JSON.parse(JSON.stringify(this.ytSongObject)))
      this.songUrl = ''
    }
  },
  watch: {
    songUrl: function (url) {
      if (url !== '') {
        this.getSongObjectFromYoutube(url)
      } else {
        this.showOrHideAddButton = false
        this.ytSongObject.title = ''
      }
    }
  }
}
</script>

<style>

.yt-video-details {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  width: calc(45% + 1.5em);
  height: 124px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 1.4em;
}

.yt-video-details img {
  float: left;
  height: 100%;
}

.yt-video-details p {
  height: 100%;
  text-align: left;
  padding: 0 0.2em;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>