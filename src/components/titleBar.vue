<template>
    <h1>{{ title }}</h1>
</template>

<script>
export default {
  name: 'TitleBar',
  props: {
      title: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    width: 100%;
    background-color: #66ab5a;
    color: #ffffff;
    text-align: left;
    margin: 0 auto;
    box-shadow: 1px 2px 3px grey;
}
</style>
