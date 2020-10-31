<template>
  <div id="app">
    <div v-if="emptyList">
      <Loader></Loader>
    </div>
    <div v-else>
      <v-container data-app>
        <TitleBar
        v-bind:title="'Leroy Merlin - Air Project'"
        v-bind:type="'h1'"
        ></TitleBar>
        
        <ValueTable
        v-bind:tableTitle="'Plans'"
        v-bind:headers="plansHeader"
        v-bind:contentList="plansList"
        v-bind:droneList="droneList"
        v-bind:storesList="storesList"
        v-bind:productList="stocksList"
        v-bind:customersList="customersList"
        v-bind:updatePlanValues="updatePlanValues"
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
    
  </div>
</template>

<script>
import empty from 'is-empty'

import TitleBar from './components/titleBar.vue'
import ValueTable from './components/valueTable.vue'
import Loader from './components/loader.vue'

import listGeneration from './script/listGeneration'

const customersJson = require('./input/customers.json');
const droneJson = require('./input/drone.json');
const storesJson = require('./input/stores.json');
const ordersJson = require('./input/orders.json')

export default {
  name: 'App',
  components: {
    Loader,
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
      { text: 'Drones', align: 'start', value: 'droneId'},
      { text: 'Stores', value: 'storeId'},
      { text: 'Products', value: 'productId'},
      { text: 'Customers', value: 'customerId'}
    ],
    stocksHeader: [
      { text: 'Products', align: 'start', value: 'productId'},
      { text: 'Villeneuve', value: 'vaQuantity'},
      { text: 'Roncq', value: 'roncqQuantity'},
      { text: 'Lesquin', value: 'lesquinQuantity'}
    ],
    emptyList: null,
    customersList: customersJson,
    droneList: droneJson,
    ordersList: [],
    stocksList: [],
    storesList: storesJson,
    plansList: []
  }),
  async mounted() {
    this.emptyList = empty(this.ordersList) || empty(this.stocksList)
    this.ordersList = await this.generateOrdersTable(ordersJson);
    this.stocksList = await this.generateStocksTable(this.storesList);
    this.emptyList = empty(this.ordersList) || empty(this.stocksList)
  },
  methods: {
    calcDistance(xDestination, yDestination, xStart, yStart){
      return Math.sqrt( Math.pow((xDestination - xStart), 2) +  Math.pow((yDestination - yStart), 2) );
    },
    updatePlanValues(droneId, storeId, productId, customerId){
      let customerInfo, droneInfo, storeInfo, totalDistance;
      this.stocksList.forEach(elt => {
        if(productId === elt.productId){
          if(storeId === 'Villeneuve') {elt.vaQuantity -= 1;}
          else if(storeId === 'Roncq') {elt.roncqQuantity -= 1;}
          else if(storeId === 'Lesquin') {elt.lesquinQuantity -= 1;}
        }
      });
      this.customersList.forEach(elt => {
        if (customerId === elt.id){
          customerInfo = elt
        }
      });
      this.storesList.forEach(elt => {
        if (storeId === elt.id){
          storeInfo = elt
        }
      });
      this.droneList.forEach(elt => {
        if (droneId === elt.id){ 
          droneInfo = elt
          totalDistance = this.calcDistance(storeInfo.x, storeInfo.y, droneInfo.x, droneInfo.y) + this.calcDistance(customerInfo.x, customerInfo.y ,storeInfo.x, storeInfo.y)
          elt.autonomy = (elt.autonomy - totalDistance).toFixed(3)
        }
      });
      this.plansList.push({"droneId": droneId, "storeId": storeId, "productId": productId, "customerId": customerId})
    }
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
