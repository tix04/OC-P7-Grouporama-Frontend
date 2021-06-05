import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {

    defaultUserImage: require('@/assets/default-user-image.png'),
    userID: 0,
    userName: '',
    userProfilePicture: null,
    online: false,
    postsData: [],
    userDetail: []

  },
  getters: {
  },
  mutations: {

    retrieveNewsFeedData (state, data) {
      state.postsData = data[0];
      state.userID = data[1];
      state.userProfilePicture = data[2];
      state.userName = data[3];
      state.online = true;

    },
    updateComments(state, {response, postID}) {
      
      for (var i = 0; i < state.postsData.length; i++) {
        if(state.postsData[i].post_id === postID) {
          state.postsData[i].linked_comments = response.data;
          
        }
      }
    },
    updateUser(state, data) {

      state.userDetail = data;
      state.userID = data.user_id;
      state.userProfilePicture = data.profile_image;
      
    },
    logOut(state) {

      state.userID = 0;
      state.userProfilePicture = null;
      state.online = false;
      state.postsData = [];
      state.userDetail = [];

    }
  },
  actions: {
    
    async updateComments ({commit}, postID) {

      const token = localStorage.getItem("token");
      let headers = 'Bearer ' + token;

      let url = `http://localhost:3000/comments/${postID}`;

      await axios.get(url, {
        headers: {
        "Authorization": headers
      }
      }).then(function (response) {

        commit('updateComments', {response, postID});

      }).catch(function(error) {

        console.log(error);

      });
    },
    async updateUser({commit}) {
      
      const token = localStorage.getItem("token");
      let headers = 'Bearer ' + token;

      await axios.get('http://localhost:3000/user/userProfile', {
        headers: {
          "Authorization": headers
        }
      }).then(function (response) {

        let data = response.data[0];
        commit('updateUser', data);

      }).catch(function(error) {

        console.log(error);

      });
    },
    logOut({commit}) {
      commit('logOut');
    }
  
  },
  modules: {
  }
});
