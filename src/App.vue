<template>
  <div id="app">
    <router-view name="ano-navigation"></router-view>
    <keep-alive include="playlists-list, playlist">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>

  @import url('https://fonts.googleapis.com/css?family=Hammersmith+One');
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  @import './assets/css-reset.css';

  html, body {
    height: 100%;
    margin: 0;
  }

  #app {
    background: #DA22FF no-repeat;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #9733EE, #DA22FF) no-repeat; 
    background: linear-gradient(to bottom, #9733EE, #DA22FF) no-repeat;
    height: 100%;
    font-family: 'Hammersmith One', sans-serif;
    display: flex;
    flex-flow: column;
    min-width: 680px;
  }

  .et-wrapper {
    font-family: 'Hammersmith One', sans-serif;
    width: 50%;
    max-width: 50%;
    background: rgba(48,45,55,.9);
    left: 50% !important;
    transform: translateX(-50%);
    top: auto !important;
    bottom: 0 !important;
    right: auto !important;
  }
</style>
