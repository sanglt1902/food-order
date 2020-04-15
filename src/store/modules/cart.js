import Vue from "vue";

const state = {
  cart: [],
  cartCount: 0
};

const mutations = {
  ADD_ITEM_CART: (state, item) => {
    const found = state.cart.find(product => product.id === item.id);
    if (found) {
      found.quantity++;
      found.totalPrice = found.quantity * found.price;
    } else {
      state.cart.push(item);

      Vue.set(item, "quantity", 1);
      Vue.set(item, "totalPrice", item.price);
    }
    state.cartCount++;
  },
  SUBTRACT_ITEM_CART: (state, item) => {
    item.quantity--;
    item.totalPrice = item.quantity * item.price;
  },
  REMOVE_ITEM_CART: (state, item) => {
    const index = state.cart.indexOf(item);

    if (index > -1) {
      const product = state.cart[index];
      state.cartCount -= product.quantity;

      state.cart.splice(index, 1);
    }
  }
};
const actions = {
  addItemToCart({ commit }, item) {
    commit("ADD_ITEM_CART", item);
  },
  subtractItemFromCart({ commit }, item) {
    const found = state.cart.find(product => product.id === item.id);
    found.quantity === 1 && commit("REMOVE_ITEM_CART", item);

    commit("SUBTRACT_ITEM_CART", found);
  },
  removeItemFromCart({ commit }, item) {
    commit("REMOVE_ITEM_CART", item);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
