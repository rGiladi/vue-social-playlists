<template>
  <div class="ano-home">
    <ano-navigation></ano-navigation>
    <example-playlist-creator></example-playlist-creator>
  </div>
</template>

<script>
import Navigation from './Navigation'
import ExamplePlaylistCreator from './ExamplePlaylistCreator'

export default {
  name: 'ano-home',
  components: {
    'ano-navigation': Navigation,
    'example-playlist-creator': ExamplePlaylistCreator
  }
}
</script>

<style>

.ano-home {
  height: 100%;
}

</style>
