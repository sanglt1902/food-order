// =========================================================
// * Vue Material Kit - v1.2.2
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vue-material-kit
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/vue-material-kit/blob/master/LICENSE.md)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

import Vue from "vue";
import { InMemoryCache } from "apollo-cache-inmemory";
import VueApollo from "vue-apollo";
import ApolloClient from "apollo-client";
import { ApolloLink } from "apollo-link";
import { createUploadLink } from "apollo-upload-client";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import MaterialKit from "./plugins/material-kit";
import Notify from "vue-notifyjs";
import "vue-notifyjs/themes/material.scss";
Vue.config.productionTip = false;

Vue.use(MaterialKit);
Vue.use(Notify);

// Create the apollo client
const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    // ...
    createUploadLink({
      uri: "http://localhost:3000/graphql"
    })
  ]),
  cache: new InMemoryCache()
});

// Install the vue plugin
Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

const NavbarStore = {
  showNavbar: false
};

Vue.mixin({
  data() {
    return {
      NavbarStore
    };
  }
});

new Vue({
  router,
  apolloProvider,
  store,
  render: h => h(App)
}).$mount("#app");
