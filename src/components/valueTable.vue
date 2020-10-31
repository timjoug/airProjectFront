<template>
    <v-flex class="tableBlock">
        <TitleBar
        v-bind:title="tableTitle"
        v-bind:type="'h2'"
        ></TitleBar>

        <v-flex v-if="tableTitle === 'Plans'">
            <v-btn
            tile 
            outlined 
            color="#66ab5a"
            @click.stop="dialog = true"
            >
                <v-icon left>mdi-plus</v-icon>Add Plan
            </v-btn>

            <v-dialog
            v-model="dialog"
            max-width="60%"
            >
            <v-card>
                <v-card-title class="headline">
                Add a new plan
                </v-card-title>

                <v-select
                    v-model="customersResult"
                    :items="customersLabelList"
                    label="Customers *"
                    dense
                    outlined
                ></v-select>

                <v-select
                    v-model="droneResult"
                    :items="droneLabelList"
                    label="Drones *"
                    dense
                    outlined
                ></v-select>

                <v-select
                    v-model="productResult"
                    :items="productLabelList"
                    label="Products *"
                    dense
                    outlined
                ></v-select>

                <v-select
                    v-model="storeResult"
                    :items="storesLabelList"
                    label="Stores *"
                    dense
                    outlined
                ></v-select>

                <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color="green darken-1"
                    text
                    @click="dialog = false"
                >Cancel</v-btn>

                <v-btn
                    color="green darken-1"
                    text
                    @click="updatePlanTable()"
                >Confirm</v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </v-flex>
        

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
      contentList: Array,
      droneList: Array,
      storesList: Array,
      productList: Array,
      customersList: Array,
      updatePlanValues: Function
  },
  data() {
      return{
          dialog: false,
          customersLabelList: [],
          droneLabelList: [],
          productLabelList: [],
          storesLabelList: [],
          customersResult: '',
          droneResult: '',
          productResult: '',
          storeResult: ''

      }
  },
  mounted() {
        if(this.$props.tableTitle === 'Plans') {
            this.$props.customersList.forEach(item => {
                this.customersLabelList.push(item.id)
            });
            this.$props.droneList.forEach(item => {
                this.droneLabelList.push(item.id)
            });
            this.$props.productList.forEach(item => {
                this.productLabelList.push(item.productId)
            });
            this.$props.storesList.forEach(item => {
                this.storesLabelList.push(item.id)
            });
        }

      
  },
  methods: {
      updatePlanTable(){
          this.dialog = false
          this.$props.updatePlanValues(this.droneResult, this.storeResult, this.productResult, this.customersResult)
          this.customersResult = '';
          this.droneResult = '';
          this.productResult = '';
          this.storeResult = '';
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-input {
    width: 90%;
    margin: auto !important;
}
.tableBlock {
    margin : 1%;
    box-shadow: 1px 2px 3px grey;
}
.tableBlock button {
    margin: 0.5% 1% 0.5%
}
</style>
