<template >
 <div>
   <Headeview></Headeview>
   <Sidebar></Sidebar>
   <TableView></TableView>
   <Footer></Footer>
 </div>
</template>
<script src="../assets/dist/js/app.min.js"></script>

<script>
import Vue from "vue";
import Headeview from "../components/Header.vue";
import Sidebar from "../components/Sidebar";
import TableView from "./TableView";
import Footer from "../components/Footer";
import { Account } from "../api/service";
import { addClass, removeClass } from "../libraries/lib";
export default {
  name: "Home",
  data: () => ({
    account: new Account()
  }),

  components: {
    Headeview: Headeview,
    Sidebar: Sidebar,
    TableView: TableView,
    Footer: Footer
  },
  created() {
    if (!this.account.isLoggedIn) {
      this.$router.push({ path: "/" });
    }
    let tableInfo = {
      category: "radios",
      columns: [
        { title: "Name", field: "name", sortable: true },
        { title: "Dial", field: "dial" },
        { title: "Type", field: "type", sortable: true },
        { title: "LogoUrl", field: "logo" },
        { title: "Country", field: "Country" }
      ]
    };
    this.$store.dispatch("add_tableInfo", tableInfo);

    removeClass(document.getElementsByTagName("body")[0], "login-page");
    addClass(document.getElementsByTagName("body")[0], "skin-blue");
    addClass(document.getElementsByTagName("body")[0], "sidebar-mini");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content-wrapper {
  min-height: 100vh;
}
</style>
