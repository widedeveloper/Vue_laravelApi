<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        {{tableInfo.category}}
      </h1>
      
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="row">
        <div class="col-xs-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">{{tableInfo.category}}</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
             <!-- table -->
                <input name="date" type="date"/>
                <datatable v-bind="$data" />
            </div>
            <!-- /.box-body -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from "vue";
import Datatable from "vue2-datatable-component";

import Service from "../api/service";
import mockData from "../mockData";
Vue.use(Datatable);
export default {
  data() {
    return {
      columns: [],
      data: [],
      total: 0,
      query: {},
      category: ""
    };
  },
  computed: {
    tableInfo() {
      let storTableInfo = this.$store.getters.getTableInfo;
      this.columns = storTableInfo.columns;
      this.category = storTableInfo.category;
      return storTableInfo;
    }
  },

  watch: {
    query: {
      handler(query) {
        mockData(query, this.category).then(({ rows, total }) => {
          this.data = rows;
          this.total = total;
        });
      },
      deep: true
    },
    category: {
      handler() {
        mockData(this.query, this.category).then(({ rows, total }) => {
          this.data = rows;
          this.total = total;
        });
      }
    }
  }
};
</script>
<style>
ul.pagination .fa {
  padding: 3px 0 !important;
}
.table {
  font-size: 14px;
}
</style>


