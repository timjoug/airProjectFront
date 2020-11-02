<template>
    <div>
        <h1 v-if="type === 'h1'">{{ title }}</h1>
        <h2 v-if="type === 'h2'">{{ title }}</h2>
    </div>
</template>

<script>
export default {
  name: 'TitleBar',
  props: {
      title: String,
      type: String
  },
}
</script>

<style scoped>
div {
    width: 100%;
    background-color: #66ab5a;
    color: #ffffff;
    text-align: left;
    margin: 0 auto;
}
h1 {
    box-shadow: 1px 2px 3px grey;
}
h1, h2{
    padding: 0.25% 0.5% !important;
}
</style>
