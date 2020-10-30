<template>
    <v-flex class="tableBlock">
        <TitleBar
        v-bind:title="tableTitle"
        v-bind:type="'h2'"
        ></TitleBar>
        <v-data-table
            :headers="headers"
            :items="contentList"
            hide-default-footer
            class="elevation-1"
        ></v-data-table>
    </v-flex>
</template>

<script>
import TitleBar from './titleBar.vue'
export default {
  name: 'ValueTable',
  components: {
      TitleBar
  },
  props: {
      tableTitle: String,
      headers: Array,
      contentList: Array
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tableBlock {
    margin : 1%;
    box-shadow: 1px 2px 3px grey;
}
</style>
