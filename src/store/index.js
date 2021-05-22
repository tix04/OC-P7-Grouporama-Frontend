import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

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
    },
    updateComments(state, {response, postID}) {
      console.log(response, postID);

      for (var i = 0; i < state.postsData.length; i++) {
        if(state.postsData[i].post_id === postID) {
          state.postsData[i].linked_comments = response.data;
        }
      }
    }
  },
  actions: {
    async updateComments ({commit}, postID) {
      console.log(postID);
      let url = `http://localhost:3000/comments/${postID}`;

      await axios.get(url/*, {
        headers: {
        "Authorization": headers
      }
      }*/).then(function (response) {
        console.log(response);
          commit('updateComments', {response, postID});
      }).catch(function(error) {
        console.log(error);
      });
    }
  
  },
  modules: {
  }
});
