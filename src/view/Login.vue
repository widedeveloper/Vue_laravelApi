<template src="../template/login.html"></template>

<script>
import Vue from "vue";
import VeeValidate from "vee-validate";
import axios from "axios";
import { Account } from "../api/service";
import {hasClass, addClass, removeClass} from '../libraries/lib'

Vue.use(VeeValidate);

export default {
  name: "login",
  data: () => ({
    errorStatus: {
      state: false,
      content: ""
    },
    email: "",
    password: "",
    account: new Account()
  }),
  created() {
    if (this.account.isLoggedIn) {
      this.$router.push({ path: "/home" });
    }
    
    removeClass(document.getElementsByTagName("body")[0], "skin-blue");
    removeClass(document.getElementsByTagName("body")[0], "sidebar-mini");
    addClass(document.getElementsByTagName("body")[0], 'login-page');
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.login();
        }
      });
    },

    login() {
      this.email = this.$refs.email.value;
      this.password = this.$refs.password.value;
      var self = this;
      this.account.login(this.email, this.password, this.registerToken);
    },
    registerToken(json) {
      if (json.isLoggedIn) {
        this.$store.dispatch("add_token", json);
        this.$router.push({ path: "/home" });
      } else {
        if (!this.errorStatus.state) {
          this.errorStatus.state = true;
          this.errorStatus.content = "Incorrect email or password.";
        }
      }
    }
  }
};
</script>

  

