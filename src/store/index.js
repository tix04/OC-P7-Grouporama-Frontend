import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userID: 0,
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
    },
    updateUser(state, data) {
      state.userDetail = data;
      state.userID = data.user_id;
      state.userProfilePicture = data.profile_image;
      console.log(data);
      console.log(state.userDetail);
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
