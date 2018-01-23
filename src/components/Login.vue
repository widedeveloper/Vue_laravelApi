<template src="../template/login.html"></template>


<script>
import Vue from "vue";
import VeeValidate from "vee-validate";
import axios from "axios";

Vue.use(VeeValidate);

export default {
  name: "login",
  data: () => ({
    errorStatus: {
      state: false,
      content: ""
    },
    email: "",
    password: ""
  }),
  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          // eslint-disable-next-line
          this.sendData();
        }
      });
    },
    sendData() {
      this.email = this.$refs.email.value;
      this.password = this.$refs.password.value;
      var self = this;
      axios
        .post(
          "http://localhost:82/api/api_login",
          { email: self.email, password: self.password },

          {
            headers: {
              "Content-type": "application/json"
            }
          }
        )
        .then(response => {
          if (response.status == 200) {
            if (this.errorStatus.state) {
              this.errorStatus.state = false;
              this.errorStatus.content = "";
            }
            let token = response.data.success.token;
            console.log("old_token",this.$store.getters.accessToken)
            //Store Vuex this token
            this.registerToken(token);
            this.$router.push({path: '/'})
          }
        })
        .catch(error => {
          console.log(error);
          var errordata = error.response.data.error;
          if (errordata == "Unauthorised") {
            if (!this.errorStatus.state) {
              this.errorStatus.state = true;
              this.errorStatus.content = "Incorrect email or password.";
            }
          }
        });
    },
    registerToken(token) {
      this.$store.dispatch('add_token', token);
    }
  }
};
</script>

  

