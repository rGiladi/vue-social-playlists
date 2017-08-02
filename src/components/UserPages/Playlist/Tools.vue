<template>
  <div class="playlist-tools">
    <div class="tools">
      <router-link :to="'/'"><i class="fa fa-home sp-option" aria-hidden="true"></i></router-link>
      <i class="material-icons">add_circle</i>
      <i class="material-icons">delete</i>
      <i class="fa fa-trash-o option" aria-hidden="true"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'playlist-tools'
}
</script>

<style>

.tools .option {
  display: block;
  position: relative;
  top: 0;
  margin-bottom: 10px;
  font-size: 3em;
  cursor: pointer;
  color: #fff;
  transition: top 0.2s;
}


</style>
