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
              <div class="col-md-2 pull-left">
                <datepicker format="yyyy-MM-dd" input-class="form-control" :clear-button='true' clear-button-icon='fa fa-close' v-on:selected="select_date"></datepicker>
              </div>                
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
import Datepicker from "vuejs-datepicker";

Vue.use(Datatable);

export default {
  data() {
    return {
      columns: [],
      data: [],
      total: 0,
      query: {},
      category: "",
      string_date: ""
    };
  },
  components: {
    Datepicker: Datepicker
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
        mockData(query, this.category, this.string_date).then(
          ({ rows, total }) => {
            this.data = rows;
            this.total = total;
          }
        );
      },
      deep: true
    },
    category: {
      handler() {
        mockData(this.query, this.category, this.string_date).then(
          ({ rows, total }) => {
            this.data = rows;
            this.total = total;
          }
        );
      }
    }
  },
  methods: {
    select_date(val) {
      if (val == null) {
        this.string_date = "";
      } else {
        this.string_date = this.get_string_date(val);
      }
      mockData(this.query, this.category, this.string_date).then(
        ({ rows, total }) => {
          this.data = rows;
          this.total = total;
        }
      );
    },

    get_string_date(val) {
      return (
        val.getFullYear() +
        "-" +
        (val.getMonth() + 1 < 10 ? "0" : "") +
        (val.getMonth() + 1) +
        "-" +
        (val.getDate() < 10 ? "0" : "") +
        val.getDate()
      );
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
.vdp-datepicker__clear-button {
  position: absolute;
  right: 8px;
  top: 9px;
}
</style>


