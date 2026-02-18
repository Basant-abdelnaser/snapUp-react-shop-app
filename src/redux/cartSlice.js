import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCartItems} from "../services/cartService";
import { addToCart } from "../services/cartService";

// Fetch Cart
export const fetchCartThunk = createAsyncThunk("cart/fetchCart", async () => {
  const response = await getCartItems(1);
  return response.carts[0].products;
});

//updateCart
export const deleteItemThunk = createAsyncThunk(
  "cart/deleteItem",
  async (id, { getState }) => {
    // get current state from Redux
    const state = getState();
    const currentItems = state.cart.items;

    // Remove the item locally
    const newItems = currentItems.filter((item) => item.id !== id);

    // Send updated cart to API (dummyjson expects full cart object)
    // await updateCart(1, {
    //   userId: 1, // hardcoded for dummyjson
    //   products: newItems.map((item) => ({
    //     id: item.id,
    //     quantity: item.quantity,
    //   })),
    // });
    console.log(newItems);
    return newItems; // return updated cart to reducer
  },
);

//Add to cart
export const addToCartThunk = createAsyncThunk(
  "cart/addToCart",
  async ({ product, quantity }) => {
    const response = await addToCart({
      userId: 1,
      products: [
        {
          id: Number(product.id),
          quantity: Number(quantity),
        },
      ],
    });

    return response;
  },
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // addToCart:(state, action) => {
    //   const { product, quantity } = action.payload;
    //   console.log("product", product);
    //   //   const existingItem = state.items.find((item) => item.id === product.id);
    //   state.items.push({
    //     ...product,
    //     quantity: quantity,
    //   });
    // },
    // isInCart: (state, action) => {
    //   const isInCart = state.items.some(
    //     (item) => item.id === action.payload.id,
    //   );
    //   return isInCart;
    // },
    // removeFromCart: (state, action) => {
    //   state.items = state.items.filter((item) => item.id !== action.payload);
    // },
    // updateCart: (state, action) => {
    //   const { id, quantity } = action.payload;
    //   const item = state.items.find((item) => item.id === id);
    //   if (item) {
    //     item.quantity = quantity;
    //   }
    // },
    clearCart: (state) => {
      console.log("clear cart");
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        state.loading = false;

        action.payload.products.forEach((newItem) => {
          const existing = state.items.find((item) => item.id === newItem.id);

          if (existing) {
            existing.quantity += newItem.quantity;
          } else {
            state.items.push(newItem);
          }
        });
      })

      .addCase(addToCartThunk.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchCartThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteItemThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
