<template>
  <div id="app">
    <TitleBar
    v-bind:title="'Leroy Merlin - Air Project'"
    ></TitleBar>
    
    <ValueTable
    v-bind:tableTitle="'Plans'"
    v-bind:headers="mockHeader"
    v-bind:contentList="mockList"
    ></ValueTable>
    <ValueTable
    v-bind:tableTitle="'Orders'"
    v-bind:headers="mockHeader"
    v-bind:contentList="mockList"
    ></ValueTable>
    <ValueTable
    v-bind:tableTitle="'Stocks'"
    v-bind:headers="mockHeader"
    v-bind:contentList="mockList"
    ></ValueTable>
    <ValueTable
    v-bind:tableTitle="'Drones'"
    v-bind:headers="mockHeader"
    v-bind:contentList="mockList"
    ></ValueTable>
  </div>
</template>

<script>
import TitleBar from './components/titleBar.vue'
import ValueTable from './components/valueTable.vue'

export default {
  name: 'App',
  components: {
    TitleBar,
    ValueTable
  },
  data: () => ({
    mockHeader: [
      { text: 'Header 1', value: 'value1'},
      { text: 'Header 2', value: 'value2'},
      { text: 'Header 3', value: 'value3'}
    ],
    mockList: [
      {
        value1: 'Alpha',
        value2: 59,
        value3: 'Lille'
      },
      {
        value1: 'Beta',
        value2: 59,
        value3: 'Douai'
      },
      {
        value1: 'Gamma',
        value2: 62,
        value3: 'Arras'
      }
    ]
  })
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
