<template src="../template/sidebar.html"></template>
<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    getRadios() {
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
    },
    getRegions() {
      let tableInfo = {
        category: "regions",
        columns: [
          { title: "ID", field: "id", sortable: true },
          { title: "Name", field: "name", sortable: true },
          { title: "Country", field: "Country" },
          { title: "Created Date", field: "created_at", sortable: true },
          { title: "Updated Date", field: "updated_at" }
        ]
      };
      this.$store.dispatch("add_tableInfo", tableInfo);
    },
    getStreams() {
      let tableInfo = {
        category: "streams",
        columns: [
          { title: "RadioID", field: "radio_id", sortable: true },
          { title: "Url", field: "url" },
          { title: "Type", field: "type", sortable: true },
          { title: "Country", field: "Country" }
        ]
      };
      this.$store.dispatch("add_tableInfo", tableInfo);
    }
  }
};
</script>
