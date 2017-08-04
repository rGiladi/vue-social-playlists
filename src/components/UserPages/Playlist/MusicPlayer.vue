<template>
  <div class="music-player">
    <youtube :video-id="currentSong.vidId" @ended="playNext" :mute="true" :player-vars="{autoplay: 1}" :player-width="400" :player-height="250"></youtube>
  </div>
</template>


<script>
export default {
  name: 'music-player',
  props: ['songs', 'currentSong', 'currentSongIndx'],
  methods: {
    playNext () {
      let nextSong = this.songs[this.currentSongIndx + 1]
      if (nextSong) {
        nextSong = {
          song: nextSong,
          indx: this.currentSongIndx + 1
        }
      } else {
        nextSong = {
          song: this.songs[0],
          indx: 0
        }
      }
      this.$emit('nextSong', nextSong)
    }
  }
}
</script>

