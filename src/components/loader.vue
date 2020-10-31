<template>
    <v-container fluid>
        <v-flex class="text-xs-center">
            <h2>Loading Data</h2>
            <v-progress-circular
                :size="70"
                :width="7"
                color="red"
                indeterminate
            ></v-progress-circular>
        </v-flex>
    </v-container>
</template>

<script>
export default {
  name: 'Loader'
}
</script>

<style scoped>
</style>
	
	
	
