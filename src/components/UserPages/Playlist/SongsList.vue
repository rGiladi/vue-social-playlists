<template>
  <transition-group name="song-list" tag="div" id="playlist-list">
    <div class="song-item" v-for="song, $indx in songs" @click="playSong(song, $indx)" :class="currentSong === song ? 'active' : ''" :key="$indx">
      <div class="song-title">
        <i class="material-icons" v-show="deleteMode" @click.stop="deleteSong($indx)">delete</i>
        <span v-text="song.title"></span>
      </div>
      <span class="song-time" v-text="song.time"></span>
    </div>
  </transition-group>
</template>

<script>
export default {
  name: 'songs-list',
  props: ['songs', 'currentSong', 'author', 'pid', 'deleteMode'],
  data () {
    return {
      password: ''
    }
  },
  methods: {
    playSong (song, indx) {
      this.$emit('changeSong', {
        song: song,
        indx: indx
      })
    },
    deleteSong (indx) {
      this.axios.delete('/api/playlists/' + this.author + '/' + this.pid,
        {
          params: {
            songIndx: indx,
            password: this.$store.getters.getLoggedInUser === this.author ? '' : this.password || prompt("Enter playlist's password")
          },
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
          }
        }
      ).then(res => {
        console.log(res)
        this.$emit('toggleDeleteMode')
      }).catch(err => {
        console.log(err.response)
        alert(err.response.data)
        switch (err.response.data) {
          case 'Please login again or refresh the page':
            this.$store.commit('logUserOut') // remove cradentials
        }
      })
    }
  }
}
</script>

<style>

  #playlist-list {
    color: #fff;
    display: flex;
    flex: 1;
    flex-flow: column;
    overflow: auto;
  }

  .song-item {
    display: flex;
    flex: none;
    justify-content: space-between;
    width: 90%;
    height: 22px;
    line-height: 22px;
    background-color: rgba(0,0,0,0.4);
    margin-bottom: 8px;
    border-radius: 20px;
    padding: 5px 10px;
    cursor: pointer;
    transition: width 0.3s;
  }

  .song-item:hover {
    width: 95%;
  }

  .song-item.active {
    width: 95%;
  }

  .song-title {
    display: flex;
    width: 80%;
  }

  .song-title span {
    max-width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .song-title .material-icons {
    position: relative;
    bottom: 1.5px;
    margin-right: 5px;
    transition: color .2s;
    color: #FF4136;
  }

  .song-title .material-icons:hover {
    color: #000;
  }

  .song-list-enter-active, .song-list-leave-active {
    transition: all 0.4s;
  }
  .song-list-enter, .song-list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
</style>