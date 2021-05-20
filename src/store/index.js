import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userID: 0,
    userProfilePicture: null,
    online: false,
    postsData: []
  },
  getters: {
  },
  mutations: {
    retrieveNewsFeedData (state, data) {
      state.postsData = data[0];
      state.userID = data[1];
      state.userProfilePicture = data[2];
      state.online = true;

      console.log(state.postsData);
      console.log(state.userID);
      console.log(state.userProfilePicture);
    }
  },
  actions: {
  },
  modules: {
  }
});
