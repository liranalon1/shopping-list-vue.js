<template>
    <div id="item-page">
      <div class="back btn" @click="closeItemPage">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.828 7L16 7V9L3.828 9L9.192 14.364L7.778 15.778L0 8L7.778 0.222L9.192 1.636L3.828 7Z"/></svg>
      </div>
      <div class="wrapper">
          <h2 class="title">{{selectedItem.itemName}}</h2>
          <p class="description" v-if="selectedItem.description !==''">{{selectedItem.description}}</p>
          <p class="description center" v-else>There is no description</p>
      </div>
    </div>
</template>

<script>
export default {
  props: ['selectedItem'],
  data () {
    return {
         
    }
  },
  methods:{
    closeItemPage: function(){
      this.$emit('update:ItemPageClose');
      this.$router.push(`/`);
    },
  }
}
</script>

<style lang="scss" scoped>
@import "./styles/variables.scss";

#item-page{
  .btn{
    position: absolute;
    z-index: 999;
    top: 50px;
    left: 24px;
    svg{
      fill: $primary-color2;
    }
  }
  .wrapper{
    padding: 0 40px;
  }
  .description{
    width: 100%;
    word-break: break-all;
    &.center{
      text-align: center;
    }
  }
}
</style>