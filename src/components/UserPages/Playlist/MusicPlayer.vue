<template>
  <div class="music-player">
  <youtube :player-width="400" :player-height="250" :video-id="currentSong.vidId"></youtube>
  <div class="recommendation" v-for="video in recommendations">
    <img :src="video.snippet.thumbnails.default.url" />
    <p v-text="video.snippet.title" />
  </div>
  </div>
</template>

<script>
  export default {
    name: 'music-player',
    props: ['currentSong'],
    data () {
      return {
        recommendations: {}
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
              'maxResults': '4',
              'key': 'AIzaSyAtwxH_RK0NDVhNYLcTERQ9tTvAkBc01cQ'
            }
          }).then(res => {
            console.log(res.data)
            this.recommendations = res.data.items
          }).catch(err => {
            console.log(err)
          })
      }
    }
  }
</script>

<style>
  .music-player .details span {
    display: block;
    font-size: 1.2em;
  }

  .recommendation {
    display: flex;
    margin: 5px 0;
  }

  .recommendation img {
    margin-right: 5px;
    float: left;
  }

  .recommendation p {
    float: left;
  }
</style>