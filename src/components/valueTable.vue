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
            @click.stop="initDroneFilter"
            >
                <v-icon left>mdi-plus</v-icon>Add Plan
            </v-btn>

            <v-dialog
            v-model="dialog"
            max-width="60%"
            >
            <v-card v-if="outOfAutonomy === true">
                <v-card-title class="headline">
                Autonomy Issue
                </v-card-title>
                <v-card-text>
                    This drone ({{ this.droneResult }}) doesn't have enough autonomy for this plan : this plan is cancelled.  
                </v-card-text>
                <v-btn
                    color="green darken-1"
                    text
                    @click="cancelPlanTable()"
                >Close</v-btn>
            </v-card>
            <v-card v-else>
                <v-card-title class="headline">
                Add a new plan
                </v-card-title>

                <v-select
                    v-model="customersResult"
                    :items="customersLabelList"
                    label="Customers *"
                    dense
                    outlined
                    @change="filterSelectList(customersResult, 'customer')"
                ></v-select>

                <v-select
                    v-model="droneResult"
                    :items="droneLabelList"
                    label="Drones *"
                    dense
                    outlined
                    @change="filterSelectList(droneResult, 'drone')"
                ></v-select>

                <v-select
                    v-model="productResult"
                    :items="productLabelList"
                    label="Products *"
                    dense
                    outlined
                    @change="filterSelectList(productResult, 'product')"
                ></v-select>

                <v-select
                    v-model="storeResult"
                    :items="storesLabelList"
                    label="Stores *"
                    dense
                    outlined
                    @change="filterSelectList(storeResult, 'store')"
                ></v-select>

                <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color="green darken-1"
                    text
                    @click="cancelPlanTable()"
                >Cancel</v-btn>

                <v-btn
                    color="green darken-1"
                    text
                    :disabled="confirmPlanState"
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
import empty from 'is-empty'
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
      updatePlanValues: Function,
      calcDistance: Function
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
          storeResult: '',         
          productArray: this.$props.productList,
          storeArray: this.$props.storesList,
          confirmPlanState: true, 
          outOfAutonomy: false

      }
  },
  mounted() {
        if(this.$props.tableTitle === 'Plans') {
            this.labelListGeneration(this.$props.customersList, this.customersLabelList, 'customer');
            this.labelListGeneration(this.$props.droneList, this.droneLabelList, 'drone');
            this.labelListGeneration(this.$props.productList, this.productLabelList, 'product');
            this.labelListGeneration(this.$props.storesList, this.storesLabelList, 'store');
        }

      
  },
  methods: {
      /**
        * This function generates a list of labels respecting a base List.
        * @param {Array} baseList - Source List List Generation
        * @param {Array} targetList - Target List to feed
        * @param {String} itemType - Type of item of the list (used for the specific case of the product list)
        */
      labelListGeneration(baseList, targetList, itemType) {
          baseList.forEach(item => {
              if(itemType === 'product'){
                  targetList.push(item.productId);
              }
              else {
                  targetList.push(item.id);
              }
          })
      },

      /**
        * This function will reset all the variables, modified during a plan creation.
        */
      cancelPlanTable(){
          this.dialog = false;
          this.customersResult = '';
          this.droneResult = '';
          this.productResult = '';
          this.storeResult = '';

          this.productLabelList = [];
          this.labelListGeneration(this.$props.productList, this.productLabelList, 'product');
          this.storesLabelList = []
          this.labelListGeneration(this.$props.storesList, this.storesLabelList, 'store');

          this.confirmPlanState = true;
          this.outOfAutonomy = false;
      },

      /**
        * This function calculate the distance to do a plan and will feed the plan table
        * If the autonomy of the targeted drone is not enough, the plan will be cancelled
        */
      updatePlanTable(){
          let theoricAutonomy, customerInfo, droneInfo, storeInfo, totalDistance;
            this.$props.customersList.forEach(elt => {
                if (this.customersResult === elt.id){
                customerInfo = elt;
                }
            });
            this.$props.storesList.forEach(elt => {
                if (this.storeResult === elt.id){
                storeInfo = elt;
                }
            });
            this.$props.droneList.forEach(elt => {
                if (this.droneResult === elt.id){ 
                droneInfo = elt;
                totalDistance = this.calcDistance(storeInfo.x, storeInfo.y, droneInfo.x, droneInfo.y) + this.calcDistance(customerInfo.x, customerInfo.y ,storeInfo.x, storeInfo.y);
                theoricAutonomy = (elt.autonomy - totalDistance).toFixed(3);
                }
            });

            if(theoricAutonomy >= 0){ 
                this.$props.updatePlanValues(this.droneResult, this.storeResult, this.productResult, this.customersResult, theoricAutonomy); 
                this.cancelPlanTable(); 
            } 
            else { this.outOfAutonomy = true; }
      },

      /**
        * This function filters the list of the available drone
        * A drone already used for another plan, will not appear for the new plan creation
        */
      initDroneFilter(){
            if(!empty(this.$props.contentList)){
                this.$props.contentList.forEach(elt => {
                    this.droneLabelList = this.droneLabelList.filter(droneId => droneId !== elt.droneId);
                });
            }
            this.dialog = true;
      },

      /**
        * This function filters the product and the store selection for the plan creation, respecting the selected store/product
        * @param {String} val - Source List List Generation
        * @param {String} type - Target List to feed
        */
      filterSelectList(val, type){
            if(type === 'product'){
                this.storesLabelList = [];
                this.storeArray.forEach(store => {
                    store.stock.forEach(stock => {
                        if(stock.productId === val){
                            this.storesLabelList.push(store.id);
                        }
                    })
                })
            }
            if(type === 'store'){
                this.productLabelList = [];
                this.labelListGeneration(this.$props.productList, this.productLabelList, 'product');
                
                this.productArray.forEach(product => {
                    if(product.vaQuantity === 0 && val === 'Villeneuve' || product.roncqQuantity === 0 && val === 'Roncq' || product.lesquinQuantity === 0 && val === 'Lesquin') {
                        this.productLabelList = this.productLabelList.filter(productItem => productItem !== product.productId);
                    }
                })
            }
            if (this.customersResult !== '' && this.droneResult !== '' && this.productResult !== '' && this.storeResult !== '') { this.confirmPlanState = false; }
      }
  }
}
</script>

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
