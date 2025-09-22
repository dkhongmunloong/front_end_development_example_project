import { createSlice } from '@reduxjs/toolkit';

const cartMaxLimit = 9;

// this slice component handles the processing and manipulation of product, cart, product ID lists of the webpage
const cartSlice = createSlice({
    name: 'Cart Slice',
    initialState: {
        itemIdList: [],
        productList: [],
        cartList: [],
        orderList: []
    },
    reducers: {
        addSingle: function (state, action) 
        {
            state.itemIdList.push(action.payload.itemId);
            state.productList = [...action.payload.productList];
            // update cart list here after add
        },
        addMultiple: function (state, action)
        {
            state.itemIdList = [...state.itemIdList, ...action.payload.appendList];
            state.productList = [...action.payload.productList];
        },
        clearCart: function (state, action) 
        {
            state.itemIdList = [];
            state.productList = [];
            state.cartList = [];
        },
        generateCart: function (state, action)
        {
            let itemIdSet = new Set();
            let cartProductUser = [];

            state.itemIdList.forEach((itemId) => itemIdSet.add(itemId));
            const cartItemIdsUnique = Array.from(itemIdSet);

            cartItemIdsUnique.forEach((itemIdCode) => {
                let itemIdQty = 0;
                let itemName_temp = '',
                    brand_temp = '',
                    price_temp = '',
                    size_temp = '',
                    color_temp = '',
                    qty_temp = '',
                    itemId_temp = '';

                for (let i = 0; i < state.itemIdList.length; i++) 
                {
                    if (state.itemIdList[i] === itemIdCode) {
                        itemIdQty++;
                    }
                }
                qty_temp = itemIdQty.toString();

                for (let i = 0; i < state.productList.length; i++) 
                {
                    if (state.productList[i].itemId === itemIdCode) 
                    {
                        itemName_temp = state.productList[i].itemName;
                        brand_temp = state.productList[i].brand;
                        price_temp = state.productList[i].price;
                        size_temp = state.productList[i].size;
                        color_temp = state.productList[i].color;
                        itemId_temp = state.productList[i].itemId;
                    }
                }

                const cartProduct_temp = {
                    itemName: itemName_temp,
                    brand: brand_temp,
                    price: price_temp,
                    size: size_temp,
                    color: color_temp,
                    quantity: qty_temp,
                    itemId: itemId_temp
                };

                cartProductUser.push(cartProduct_temp);
            });
            
            state.cartList = [...cartProductUser];
            //console.log("Probe cartProductUser");
            //console.log(cartProductUser);
        },
        modifyCartQty: function (state, action)
        {
            console.log("modifyCartQty: type:", action.payload.type);
            console.log("modifyCartQty: id:", action.payload.id);

            for (let i = 0; i < state.cartList.length; i++) 
            {
                if (state.cartList[i].itemId === action.payload.id)
                {
                    let qty_int = parseInt(state.cartList[i].quantity);
                    //console.log("modifyCartQty: state.cartList quantity original type:", typeof state.cartList[i].quantity);

                    if (action.payload.type === "increase")
                    {
                        qty_int += 1;
                        if(qty_int > cartMaxLimit)
                        {
                            qty_int = cartMaxLimit;
                            //console.log("modifyCartQty: state.cartList quantity maxed out");
                        }
                        else
                        {
                            // did not exceed the cartMaxLimit, add one to item Id array
                            state.itemIdList.push(action.payload.id);
                        }
                    }
                    else if (action.payload.type === "decrease")
                    {
                        qty_int -= 1;
                        if(qty_int < 1)
                        {
                            qty_int = 1;
                            //console.log("modifyCartQty: state.cartList quantity lowest limit");
                        }
                        else
                        {
                            let first_index = 0;
                            for (let i = 0; i < state.itemIdList.length; i++)
                            {
                                if (state.itemIdList[i] === action.payload.id)
                                    first_index = i;
                            }
                            state.itemIdList.splice(first_index, 1);
                        }                 
                    }
                    
                    state.cartList[i].quantity = qty_int.toString();

                    console.log("modifyCartQty: state.cartList itemId:", state.cartList[i].itemId);
                    console.log("modifyCartQty: state.cartList new quantity:", state.cartList[i].quantity);
                    //console.log("modifyCartQty: state.cartList quantity type:", typeof state.cartList[i].quantity);
                }
            }          
        }
    },
});

// Dispatch these to update the state in your component
export const { addSingle, addMultiple, clearCart, generateCart, modifyCartQty } = cartSlice.actions;

// This part gets registered into the store.
export default cartSlice.reducer;