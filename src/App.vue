<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style src="../assets/bootstrap/css/bootstrap.min.css"></style>
<style src="../assets/dist/css/AdminLTE.min.css"></style>
<style src="../assets/dist/css/skins/_all-skins.min.css"></style>

<script>
export default {
  name: 'App',

  created () {   

    // let loginToken = this.$store.getters.getUser
    // if(!loginToken.loginStatus){
    //   this.$router.push({path: '/'})
    // } else {
    //   console.log('loginToken',loginToken)
    //   this.$router.push({path: '/home'})
    // }
  }
}
</script>

<style>

</style>
