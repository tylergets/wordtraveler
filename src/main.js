import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, {
  id: 'UA-80123537-3'
});

Vue.config.productionTip = false;

Vue.filter('title', (word) => {
  return word.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
