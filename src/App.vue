<template>
  <div id="app">
    <app-list 
      v-show="!itemPageIsActive"
      :itemsList="itemsList"
      :currency="currency"
      @update:ItemPageOpen="showItemPage">
    </app-list>
    <app-item-page
      :selectedItem="selectedItem"
      v-show="itemPageIsActive"
      @update:ItemPageClose="closeItemPage">
    </app-item-page>
  </div>
</template>

<script>
export default {
  data () {
    return {
      itemsList: [ 
        {
          itemName: "Tomatos",
          description: 'The tomato is the edible berry of the plant Solanum lycopersicum,[1][2] commonly known as a tomato plant. The species originated in western South America and Central America.[2][3] The Nahuatl (the language used by the Aztecs) word tomatl gave rise to the Spanish word tomate, from which the English word tomato derived.[3][4] Its domestication and use as a cultivated food may have originated with the indigenous peoples of Mexico.[2][5] The Aztecs used tomatoes in their cooking at the time of the Spanish conquest of the Aztec Empire, and after the Spanish encountered the tomato for the first time after their contact with the Aztecs, they brought the plant to Europe. From there, the tomato was introduced to other parts of the European-colonized world during the 16th century.[2]',
          price: 5,
          isComplete: false,
        },
        {
          itemName: "Cucumbers",
          description: 'Cucumber (Cucumis sativus) is a widely-cultivated creeping vine plant in the Cucurbitaceae gourd family that bears usually cylindrical fruits, which are used as vegetables.[1] Considered an annual plant,[2] there are three main varieties of cucumber — slicing, pickling, and burpless/seedless — within which several cultivars have been created. The cucumber originates from South Asia, but now grows on most continents, as many different types of cucumber are traded on the global market. In North America, the term wild cucumber refers to plants in the genera Echinocystis and Marah, though the two are not closely related.',
          price: 3,
          isComplete: false,
        },
        {
          itemName: "Bread",
          description: 'Bread is a staple food prepared from a dough of flour (usually wheat) and water, usually by baking. Throughout recorded history, it has been a prominent food in large parts of the world. It is one of the oldest human-made foods, having been of significant importance since the dawn of agriculture, and plays an essential role in both religious rituals and secular culture.',
          price: 10,
          isComplete: false,
        },
        {
          itemName: "Grapes",
          description: 'A grape is a fruit, botanically a berry, of the deciduous woody vines of the flowering plant genus Vitis. Grapes can be eaten fresh as table grapes, used for making wine, jam, grape juice, jelly, grape seed extract, vinegar, and grape seed oil, or dried as raisins, currants and sultanas. Grapes are a non-climacteric type of fruit, generally',
          price: 4,
          isComplete: false,
        },

      ],
      currency: 'NIS',
      itemPageIsActive:false,
      selectedItem: {},
    }
  },
  methods:{
    showItemPage:function(item){
      this.selectedItem = item;
      this.itemPageIsActive = true;
      this.$router.push(this.handleURL(item.itemName));
    },
    handleURL:function(urlPath){
      let newPath = urlPath.replace(/\s/g, '-');
      return `/${newPath}`;
    },
    closeItemPage(){
      this.itemPageIsActive = false;
    },
  }
}
</script>

<style lang="scss">
  @import "./styles/variables.scss";
  
  body{
    font-family: $primary-font-family;
    font-size: 15px;
    color: $primary-color;
  }

  .title {
      position: sticky;
      z-index: 1;
      top: 0px;
      background: #fff;
      padding: 20px 0;
      color: $primary-color;
      font-weight: 700;
      font-size: 20px;
      margin: 60px auto 30px;
      text-align: center;
      word-break: break-word;
  }
</style>
