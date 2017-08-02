<template>
  <div class="related-list">
    <div class="song" v-for="video in relatedSongs">
      <img :src="video.snippet.thumbnails.medium.url" />
      <p v-text="video.snippet.title" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'related-songs-list',
    props: ['currentSong'],
    data () {
      return {
        relatedSongs: {}
      }
    },
    watch: {
      currentSong: function (val) {
        this.axios.get('https://www.googleapis.com/youtube/v3/search',
          {
            params: {
              'relatedToVideoId': val.vidId,
              'part': 'snippet',
              'type': 'video',
              'maxResults': '3',
              'key': 'AIzaSyAtwxH_RK0NDVhNYLcTERQ9tTvAkBc01cQ'
            }
          }).then(res => {
            this.relatedSongs = res.data.items
          })
      }
    }
  }
</script>

<style>
  .related-list {
    display: flex;
    flex-flow: column;
    flex: 1;
    overflow: auto;
  }

  .related-list .song {
    cursor: pointer;
    display: flex;
    flex: 1;
    margin-top: 15px;
  }

  .song:first-child {
    margin-top: 5px;
  }

  .related-list .song img {
    width: 150px;
    margin-right: 5px;
    float: left;
  }

  .relatd-list .song p {
    float: left;
  }
</style>