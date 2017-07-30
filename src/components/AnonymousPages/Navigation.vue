<template>
  <div class="ano-nav">
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><span class="divider"></span></li>
      <li><router-link to="/login">Login</router-link></li>
      <li><router-link to="/sign-up">Sign Up</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ano-navigation'
}
</script>

<style>

.ano-nav {
  height: 60px;
  padding: 0 22px;
  background: #fff;
  margin: 0;
  height: 60px;
  z-index: 1;
}

.ano-nav>ul>li {
  float: left;
  height: 60px;
}

.ano-nav>ul>li>a {
  line-height: 60px;
  font-size: 18px;
  font-weight: 800;
  cursor: pointer;
  text-decoration: none;
  letter-spacing: 0.5px;
  color: #9facbd;
  padding: 0 8px;
  transition: color 0.3s;
}

.ano-nav>ul>li>a:hover {
  color: #48435C;
}

.divider {
  position: relative;
  top: 18px;
  margin: 0 10px;
  border-right: 3px solid #E8EDF2;
  font-size: 1.2em;
}

.router-link-exact-active {
  color: #48435C !important;
}

</style>
