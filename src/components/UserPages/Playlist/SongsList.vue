<template>
  <div id="playlist-list">
    <div class="song-item" v-for="song in songs" @click="playSong(song)">
      <i class="fa fa-times delete-btn" aria-hidden="true"></i>
      <div class="song-title" v-text="song.title"></div>
      <span class="song-time" v-text="song.time"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'songs-list',
  props: ['songs'],
  methods: {
    playSong (song) {
      this.$emit('changeSong', song)
    }
  }
}
</script>

<style>

#playlist-list {
    position: relative;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    color: #fff;
  }

  .song-item {
    width: 90%;
    height: 22px;
    line-height: 22px;
    font-weight: bold;
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
    display: inline-block;
    max-width: 80%;
    white-space: nowrap;
    text-overflow: ellipsis;
    float: left;
    overflow: hidden;
  }

  .song-time {
    float: right;
  }
</style>