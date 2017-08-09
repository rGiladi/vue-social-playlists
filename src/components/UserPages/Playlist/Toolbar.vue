<template> 
  <div class="playlist-tools pt">
    <div class="tool" @click="toggleAddMode">
      <i class="material-icons">add</i>
    </div>
    <div class="tool" @click="toggleDeleteMode">
      <i class="material-icons">delete</i>
    </div>
    <div class="add-box" v-show="mode === 'add'">
      <get-songs-from-youtube mode="playlist" @addSong="addSong"></get-songs-from-youtube>
    </div>
  </div>
</template>

<script>
import GetSongsFromYoutube from '@/components/AnonymousPages/GetSongsFromYoutube'
export default {
  name: 'playlists-tools',
  props: ['author', 'pid'],
  components: {
    'get-songs-from-youtube': GetSongsFromYoutube
  },
  data () {
    return {
      mode: '',
      password: ''
    }
  },
  methods: {
    toggleDeleteMode () {
      this.mode = this.mode === 'delete' ? '' : 'delete'
      this.$emit('toggleDeleteMode')
    },
    toggleAddMode () {
      if (this.mode === 'delete') { this.toggleDeleteMode() }
      this.mode = this.mode === 'add' ? '' : 'add'
    },
    addSong (songObject) {
      this.axios.post('/api/playlists/' + this.author + '/' + this.pid,
        {
          song: songObject,
          password: this.$store.getters.getLoggedInUser === this.author ? '' : this.password || prompt("Enter playlist's password")
        },
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
          }
        }
      ).then(res => {
        this.toggleAddMode()
        this.$emit('addSong', songObject)
      }).catch(err => {
        alert(err.response.data)
      })
    }
  }
}
</script>

<style>
  .playlist-tools {
    display: inline-block;
    z-index: 99;
  }

  .pt .tool {
    display: inline-block;
    background: #fff;
    width: 44px;
    height: 44px;
    line-height: 52px;
    border-radius: 50%;
    text-align: center;
    cursor: pointer;
    box-shadow: 0 3px 3px 0 rgba(0,0,0,0.14), 0 1px 7px 0 rgba(0,0,0,0.12), 0 3px 1px -1px rgba(0,0,0,0.2);
    transition: color, background 0.2s;
    color: #000;
  }

  .pt .tool:hover {
    color: #fff;
    background: #000;
  }

  .pt .add-box {
    position: absolute;
    margin-top: 5px;
    z-index: 99;
    width: 30%;
  }

  .pt .yt-url {
    display: block;
    width: 100%;
    font-size: .6em;
    margin: 0;
  }

  .pt .add-box button {
    width: calc(100% + 2.4em);
    color: #000;
    font-size: .4em;
    transition: color, background 0.3s;
  }

  .pt .add-box button:hover {
    color: #fff;
    background: #000;
  }

  .pt .add-box button .material-icons {
    position: relative;
    top: 2px;
  }

  /* Get Songs From Youtube Component */

  .pt .yt-video-details {
    display: flex;
    width: 100%;
    position: relative;
    left: initial;
    transform: none;
    font-size: .6em;
  }

  .pt .yt-video-details p {
    font-size: .9em;
  }

  .pt .add-icon {
    position: absolute;
    font-size: 1.2em;
    left: 0;
    bottom: 0;
    z-index: 999;
    transition: font-size .1s
  }

  .pt .add-icon:hover {
    font-size: 1.4em;
  }

  .pt .yt-url {
    box-sizing: border-box;
  }

  .pt .yt-label {
    display: none;  
  }
</style>