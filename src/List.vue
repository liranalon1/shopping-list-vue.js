<template>
    <div id="list" :class="{'stopScrolling': addItemScreenIsActive}">
        <div class="wrapper">
            <h1 class="title">Shopping List</h1>
            
            <!-- Shopping list -->
            <ul class="list-wrap flex">
                <li v-for="(item, index) in itemsList" :key="index" :class="['item flex',{'complete': item.isComplete}]" @click="handleItemPage(item)">
                    <div class="product-index box1 flex flex-center"><span class="flex flex-center">{{index+1}}</span></div>
                    <div class="product-wrap box2 flex">
                        <div class="product">{{item.itemName}}</div>
                        <div class="price">{{item.price}} {{currency}}</div>
                    </div>
                    <div class="edit-options box3 flex">
                        <div class="complete btn" @click.stop="handleComplete(item, index)">
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 15.25V19H3.75L14.81 7.94L11.06 4.19L0 15.25ZM17.71 5.04C18.1 4.65 18.1 4.02 17.71 3.63L15.37 1.29C14.98 0.899998 14.35 0.899998 13.96 1.29L12.13 3.12L15.88 6.87L17.71 5.04Z"/></svg>
                        </div>
                        <div class="sep"></div>
                        <div class="delete btn" @click.stop="deleteItem(index)">
                            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z"/></svg>
                        </div>
                    </div>
                </li>
            </ul>
            
            <!-- Total -->
            <div class="item flex" v-if="itemsList.length > 0">
                <div class="box1"><span class="flex flex-center"></span></div>
                <div class="box2 flex">
                    <div class="product">Total :</div>
                    <div class="price">{{numberWithCommas(totalprice)}} {{currency}}</div>
                </div>
            </div>
            
            <!-- Add product -->
            <div class="item flex add-product">
                <div class="box1"><span class="flex flex-center btn" @click="showAddItemScreen">+</span></div>
                <div class="box2 flex">
                    <div class="product btn" @click="showAddItemScreen">Add  Product</div>
                </div>
            </div>
        </div>

        <!-- add item component -->
        <app-add-item 
            v-show="addItemScreenIsActive"
            :itemsList="itemsList"
            @update:AddItemPageClose="closeAddItemScreen">
        </app-add-item>
    </div>
</template>

<script>
import AddItem from './AddItem.vue';

export default {
    components: {
        'app-add-item': AddItem
    },
    props: ['itemsList','currency','selectedItem'],
    data () {
        return {
          addItemScreenIsActive: false,
        }
    },
    methods: {
        handleComplete: function(item, index){
            for(let i in this.itemsList){
                if(this.itemsList[i] === item){
                    this.itemsList[index].isComplete = !this.itemsList[index].isComplete;
                }
            }
        },
        handleItemPage: function(item){
            this.$emit('update:ItemPageOpen', item);
            this.$router.push(`/${item.itemName}`);
        },
        showAddItemScreen: function(){
           this.addItemScreenIsActive = true; 
        },
        closeAddItemScreen: function(){
           this.addItemScreenIsActive = false; 
        },        
        deleteItem: function(index){
            this.itemsList.splice(index,1)
        },
        numberWithCommas: function(num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");        
        },
    },
    computed: {
        totalprice: function(){
            let total = 0;
            this.itemsList.forEach((item) =>{
                total += item.price;
            });

            return total;
        }
    },
}
</script>

<style lang="scss" scoped>
@import "./styles/variables.scss";

#list{
    &.stopScrolling{
        overflow: hidden;
        height: 100vh;
    }
    .wrapper{
        padding: 0 24px;
    }

    .item{
        height:48px;
        margin-bottom: 16px;

        .box1{
            color: $secondary-color;
            font-size: 24px;
            font-weight: 700;
            padding: 10px;
            border-right: 1px solid transparent;
            span{
                width: 40px;
            }
        }

        .box2{
            align-items: center;
            padding: 0 10px 0 15px;
            .product{
                width: 118px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                padding-right: 5px;                
            }
        }

        .box3{
            margin-left: auto;
            padding: 0 10px;
        }
    }

    ul.list-wrap{
        flex-direction: column;
        li{
            border-bottom: 1px solid #E3E3E6;
            .product-index{
                border-right: 1px solid #E3E3E6;
            }
            .product-wrap{
                position: relative;

                &::before{
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 0;
                    transform: translate(10px, -50%);
                    width: 0;
                    height: 1px;
                    background: #E3E3E6;
                    transition: width .5s;
                }
            }
            .edit-options{
                display: none;
                align-items: center;
                transition: 0.2s;

                .btn{
                    svg{
                        fill: $primary-color3;
                        transition: 0.2s;
                    }

                    &:hover{
                        svg{
                            fill: $secondary-color;
                        }   
                    }
                }
                .sep{
                    width: 1px;
                    height: 24px;
                    background: #E3E3E6;
                    margin: 0 10px;
                }
            }

            &.complete{
                .product-wrap{
                    color: $primary-color2;
                    .product{
                        text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
                    }

                    &::before{
                        width: calc(100% - 20px);
                    }
                }
            }

            &:hover{
                .edit-options{
                    display: flex;
                }
            }
        }
    }

    .add-product{
        position: sticky;
        bottom: 0;
        background: #fff;        
        .product{
            color: $secondary-color; 
        }
    }
}


@media (max-width: 375px) {
    #list{
        ul.list-wrap{
            li{
                .edit-options{
                    display: flex;
                }
            }
        }
    }
}
</style>