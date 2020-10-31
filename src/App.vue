<template>
  <div id="app">
    <v-container>
      <TitleBar
      v-bind:title="'Leroy Merlin - Air Project'"
      v-bind:type="'h1'"
      ></TitleBar>
      
      <ValueTable
      v-bind:tableTitle="'Plans'"
      v-bind:headers="plansHeader"
      v-bind:contentList="plansList"
      ></ValueTable>
      <ValueTable
      v-bind:tableTitle="'Orders'"
      v-bind:headers="ordersHeader"
      v-bind:contentList="ordersList"
      ></ValueTable>
      <ValueTable
      v-bind:tableTitle="'Stocks'"
      v-bind:headers="stocksHeader"
      v-bind:contentList="stocksList"
      ></ValueTable>
      <ValueTable
      v-bind:tableTitle="'Drones'"
      v-bind:headers="droneHeader"
      v-bind:contentList="droneList"
      ></ValueTable>
    </v-container>
  </div>
</template>

<script>

import TitleBar from './components/titleBar.vue'
import ValueTable from './components/valueTable.vue'

import listGeneration from './script/listGeneration'

const droneJson = require('./input/drone.json');
const storesJson = require('./input/stores.json');
const ordersJson = require('./input/orders.json')

export default {
  name: 'App',
  components: {
    TitleBar,
    ValueTable
  },
  mixins: [ listGeneration ],
  data: () => ({
    droneHeader: [
      { text: 'Drones', align: 'start', value: 'id'},
      { text: 'Autonomy', value: 'autonomy'},
      { text: 'X', value: 'x'},
      { text: 'Y', value: 'y'}
    ],
    ordersHeader: [
      { text: '#', align: 'start', value: 'id'},
      { text: 'Customers', value: 'customerId'},
      { text: 'Products', value: 'products'}
    ],
    plansHeader: [
      { text: 'Drones', align: 'start', value: 'droneId'}, //ex : drone.id
      { text: 'Stores', value: 'storeId'}, //ex : stores.id
      { text: 'Products', value: 'productId'},
      { text: 'Customers', value: 'customerId'}
    ],
    stocksHeader: [
      { text: 'Products', align: 'start', value: 'productId'},//ex : stores.stock.productId
      { text: 'Villeneuve', value: 'vaQuantity'},
      { text: 'Roncq', value: 'roncqQuantity'},
      { text: 'Lesquin', value: 'lesquinQuantity'}// valeur id de stores.json
    ],
    droneList: droneJson,
    ordersList: [],
    stocksList: [],
    plansList: []
  }),
  mounted() {
    this.stocksList = this.generateStocksTable(storesJson);
    this.ordersList = this.generateOrdersTable(ordersJson);
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.container {
  max-width: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
}
</style>
