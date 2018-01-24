<template src="../template/header.html"></template>
<script>
import { Account } from "../api/service";
export default {
  data() {
      return {
        account: new Account()
      }
  },
  computed:{
    user() {
      return this.$store.getters.getUser
    }
  },
  methods: {
    logout() {
      this.account.logout()
      this.$router.push({ path: "/" });
    }
  }
}
</script>

