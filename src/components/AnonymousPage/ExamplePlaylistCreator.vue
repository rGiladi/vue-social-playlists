<template>
  <div class="example-playlist-creator">
    <div class="steps">
      <div class="s1" v-show="currentStep === 1">
        <h1> Create your first playlist </h1>
        <input type="text" placeholder="Enter playlist's name" v-model.trim="pTitle" />
        <input type="password" placeholder="Enter playlist's password" v-model="pPassword" />
      </div>
      <div class="s2" v-show="currentStep === 2">
        <div class="add-songs" v-show="playlistAddedSongs.length < 3">
          <h1> Add a few songs </h1>
          <label for="yt-url">Ex: https://www.youtube.com/watch?v=d_HlPboLRL8</label>
          <input type="text" placeholder="Song's URL" name="yt-url" v-model.trim="songUrl"/>
          <i class="material-icons add-icon" @click="addSong">add_circle_outline</i>
          <div class="yt-video-details" v-show="ytSongObject.title">
            <img :src="ytSongObject.thumbnail" />
            <p v-text="ytSongObject.title" />
          </div>
        </div>
        <div v-show="playlistAddedSongs.length === 3">
          <h1> Add more later... </h1>
        </div>
        <ul class="added-songs-list">
          <li v-for="song in playlistAddedSongs" v-text="song.title"></li>
        </ul>
      </div>
      <div class="s3" v-show="currentStep === 3">
        <h1> Create an account </h1>
        <router-link to="/new-account" tag="button" class="btn-newAccount">Click to create a new account!</router-link>
        <span> (Your playlist will be created and saved automatically) </span>
      </div>
    </div>
    <div class="arrows">
      <i class="material-icons left" @click="currentStep -= 1" v-show="currentStep > 1 && currentStep <= 3">arrow_back</i>
      <i class="material-icons right" @click="currentStep += 1" v-show="currentStep >= 1 && currentStep < 3">arrow_forward</i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'example-playlist-creator',
  data () {
    return {
      currentStep: 1,
      pTitle: '',
      pPassword: '',
      songUrl: '',
      ytSongObject: {
        title: '',
        thumbnail: '',
        time: ''
      },
      playlistAddedSongs: []
    }
  },
  methods: {
    addSong () {
      this.playlistAddedSongs.push(JSON.parse(JSON.stringify(this.ytSongObject)))
      this.clearSongObject()
    },
    clearSongObject () {
      for (let key in this.ytSongObject) {
        this.ytSongObject[key] = ''
      }
      this.songUrl = ''
    },
    getSongObjectFromYoutube (url) {
      let vm = this
      let vidId = vm.$youtube.getIdFromURL(url)
      if (vidId !== url) {
        return vm.axios({
          method: 'get',
          url: 'https://www.googleapis.com/youtube/v3/videos',
          params: {
            'id': vidId,
            'part': 'snippet,contentDetails',
            'key': 'AIzaSyAtwxH_RK0NDVhNYLcTERQ9tTvAkBc01cQ'
          }
        }).then(res => {
          vm.ytSongObject.title = res.data.items[0].snippet.title
          vm.ytSongObject.thumbnail = res.data.items[0].snippet.thumbnails.medium.url
          vm.ytSongObject.time = res.data.items[0].contentDetails.duration
        }).catch(() => {
          alert('Something went wrong, please refresh and try again')
        })
      } else {
        alert('Not a valid url!')
      }
    }
  },
  watch: {
    songUrl: function (url) {
      if (url === '') {
        this.clearSongObject()
      } else {
        this.getSongObjectFromYoutube(url)
      }
    }
  },
  beforeDestroy () {
    sessionStorage.setItem('epc-values', JSON.stringify({
      pTitle: this.pTitle,
      pPassword: this.pPassword,
      playlistAddedSongs: this.playlistAddedSongs
    })
    )
  }
}
</script>

<style>

  .example-playlist-creator {
    position: relative;
    width: 100%;
    height: calc(100% - 95px);
    margin: auto;
    text-align: center;
    color: #fff;
  }

  .example-playlist-creator h1 {
    margin-top: 0;
  }

  .steps {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }

  .steps input {
    display: block;
    width: 45%;
    margin: auto;
    margin-bottom: 15px;
    font-size: 1.4em;
  }

  /* Step 2 */

  .steps .s2 .add-icon {
    font-size: 52px;
  }

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

  .added-songs-list {
    font-size: 1.2em;
  }

  /* Step 3 */

  .steps .s3 {
    margin-bottom: 52px;
  }

  .btn-newAccount {
    display: block;
    width: 50%;
    font-size: 1.4em;
    margin: auto;
    margin-bottom: 15px;
  }

  .material-icons {
    font-size: 32px;
    cursor: pointer;
  }

  .arrows .material-icons {
    position: fixed;
    bottom: 15px;
  }

  .arrows .left {
    left: calc(100% - 97.5%);
  }

  .arrows .right {
    right: calc(100% - 97.5%);
  }

</style>
