<template>
    <div id="add-item">
        <div class="wrapper">
            <div class="close btn" @click="closeScreen">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.59 6L10 8.59L7.41 6L6 7.41L8.59 10L6 12.59L7.41 14L10 11.41L12.59 14L14 12.59L11.41 10L14 7.41L12.59 6ZM10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z"/></svg>
            </div>

            <form>
                <div class="inputs-wrap">
                    <div class="input-wrap">
                        <label for="Name">Name</label>
                        <input type="text" name="Name" v-model="newItem.itemName">               
                    </div>
                    <div class="input-wrap price">
                        <label for="Price">Price</label>
                        <input type="number" name="Price" min="1" max="100" v-model="newItem.price">
                    </div>
                </div>
                <div class="input-wrap">
                    <label for="Description">Description</label>
                    <textarea name="Description" rows="50" cols="50" v-model="newItem.description"></textarea>
                </div>
                <button class="add-new-item btn" @click="addNewItem">
                    <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.00999999 18L21 9L0.00999999 0L0 7L15 9L0 11L0.00999999 18Z" fill="#FF941A"/></svg>
                </button>
            </form>        
        </div>
    </div>
</template>

<script>
export default {
    props: ['itemsList'],
    data () {
        return {
            newItem: {
                itemName: '',
                description: '',                
                price: '',
                isComplete: false,
            }
        }
    },
    computed: {
        
    },    
    methods: {
        closeScreen: function(){
            this.$emit('update:AddItemPageClose');
        },
        addNewItem: function(e){
            e.preventDefault();
            if(this.newItem.itemName === '' || this.newItem.price === '') return
            this.itemsList.push(this.newItem);
            this.clearList();
            this.closeScreen();
        },
        clearList: function(){
            this.newItem = {
                itemName: '',
                description: '',
                price: ''
            }
        },
    }
}
</script>

<style lang="scss" scoped>
@import "./styles/variables.scss";

#add-item{
    position: fixed;
    z-index: 1;
    background: #fff;
    width: 100%;
    height: 100%;
    top: 94px;
    padding-top: 37px;
    box-shadow: 0 -4px 4px rgba(0, 0, 0, 0.25);

    .close{
        position: absolute;
        top:18px;
        right: 18px;
        svg{
            fill: $primary-color3;
        }        
    }

    form{
        position: relative;
        height: 333px;

        .inputs-wrap{
            display: flex;
        }

        .input-wrap{
            margin-bottom: 30px;

            label{
                display: block;
                color: $primary-color2;
                
                &[for=Name], &[for=Description]{
                    padding: 0 20px;
                }
            }
            input{
                border-bottom: 1px solid #E3E3E6; 
                padding: 5px 0;

                &[name=Name]{
                    padding: 5px 20px;
                }

                &[name=Name], &[name=Price]{
                    width: 157px;
                }
            }
            textarea{
                width: 100%;
                max-height: 200px;
                padding: 5px 20px;
                word-break: break-word;
            }

            &.price{
                margin-left: 20px;
            }
        }        
    }
    
    .add-new-item{
        position: absolute;
        bottom: 0;
        right: 13px;
        svg{
            fill: $secondary-color;
        }       
    }
}
</style>