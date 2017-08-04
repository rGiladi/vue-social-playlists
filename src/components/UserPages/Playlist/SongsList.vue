<template>
  <div id="playlist-list">
    <div class="song-item" v-for="song, $indx in songs" @click="playSong(song, $indx)" :class="currentSong === song ? 'active' : ''">
      <div class="song-title" v-text="song.title"></div>
      <span class="song-time" v-text="song.time"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'songs-list',
  props: ['songs', 'currentSong'],
  methods: {
    playSong (song, indx) {
      this.$emit('changeSong', {
        song: song,
        indx: indx
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
    max-width: 80%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>