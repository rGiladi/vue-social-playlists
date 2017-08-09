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
          <get-songs-from-youtube mode="list" @addSong="addSong"></get-songs-from-youtube>
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
        <router-link to="/sign-up" tag="button" class="btn-newAccount">Click to create a new account!</router-link>
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
import GetSongsFromYoutube from './GetSongsFromYoutube'
export default {
  name: 'example-playlist-creator',
  components: {
    'get-songs-from-youtube': GetSongsFromYoutube
  },
  data () {
    return {
      currentStep: 1,
      pTitle: '',
      pPassword: '',
      playlistAddedSongs: []
    }
  },
  methods: {
    addSong (songObject) {
      this.playlistAddedSongs.push(JSON.parse(JSON.stringify(songObject)))
    }
  },
  beforeDestroy () {
    sessionStorage.setItem('epc-values', JSON.stringify({
      title: this.pTitle || 'Default Playlist',
      password: this.pPassword || '',
      songs: this.playlistAddedSongs || []
    })
    )
  }
}
</script>

<style>

  .example-playlist-creator {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: calc(100% - 60px);
    margin: auto;
    text-align: center;
    color: #fff;
    overflow-y: auto;
  }

  .example-playlist-creator h1 {
    margin-top: 0;
  }

  .steps {
    width: 100%;
    max-height: calc(100% - 60px);
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

  .example-playlist-creator .material-icons {
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
