<template>
  <div id="app">
    <router-view></router-view>
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
    background: #DA22FF no-repeat;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #9733EE, #DA22FF) no-repeat; 
    background: linear-gradient(to bottom, #9733EE, #DA22FF) no-repeat;
  }

  #app {
    background: #DA22FF no-repeat;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #9733EE, #DA22FF) no-repeat; 
    background: linear-gradient(to bottom, #9733EE, #DA22FF) no-repeat;
    height: 100%;
    font-family: 'Hammersmith One', sans-serif;
  }

</style>
