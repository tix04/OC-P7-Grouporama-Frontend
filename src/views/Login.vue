<template>
  <div>
    <b-container class="bv-example-row">
      {{$store.state.test}}
      <b-row>
        <b-col md="6"  style="text-align: center;align-self: center;">
          <img src="../assets/icon.png" alt="Grouporama Logo">
        </b-col>
        <b-col md="6">
          <b-container style="margin-top: 22%;">
            <b-jumbotron>
          
              <b-form @submit.prevent="onSubmit">
                <b-form-group
                id="userInput1"
                label="Username"
                label-for="username"
                >
                  <b-form-input
                  id="username"
                  type="text"
                  placeholder="Username"
                  v-on:blur="userValidation('username', 'userInput1', 'Please enter a valid Username')"
                  required
                  >
                  </b-form-input>
                  <p v-if="validUser" style="color:red;">Please enter valid Username</p>
                </b-form-group>
                <b-form-group
                id="userInput2"
                label="Password"
                label-for="password"
                >
                  <b-form-input
                  id="password"
                  type="password"
                  v-on:blur="passValidation()"
                  required
                  >
                  </b-form-input>
                  <p v-if="validPass" style="color:red">Please enter a valid Password</p>
                  <b-button type="submit" variant="primary" style="margin-top: 15px;">Submit</b-button>
                </b-form-group>
              </b-form>
            </b-jumbotron>
            <p style="text-align: center;">Don't have an Account.<span id="signUp"><a href="#">Sign Up</a></span></p>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios';
//import store from '../store/index';
export default {
  name: "Login",
  data () {
    return {
      username: '',
      password: '',
      validUser: null,
      validPass: null
    }
  },
  methods: 
  {
    userValidation () {
      let userName = document.getElementById('username');
      
      
      if(userName.value === '') {
        this.validUser = true;
      }else{
        this.validUser = false;
      }

    },
    passValidation () {
      let pwd = document.getElementById('password');

      if(pwd.value === '') {
        this.validPass = true;
      }else{
        this.validPass = false;
      }
    },
    async onSubmit () {
      let token;
      
      this.username = document.getElementById('username').value;
      this.password = document.getElementById('password').value;
      let dataAuth = {username: this.username, password: this.password};
      
      await axios.post('http://localhost:3000/auth/login', dataAuth)
        .then( function (response) {
          console.log(response)
          token = response.data.token;
          console.log(token);

        })
        .catch(err => console.log(err));

        localStorage.setItem("token", token);
       
        this.username = '';
        this.password = '';
        
        document.getElementById('username').value = null;
        document.getElementById('password').value = null;
        
        this.$router.push({name: 'Posts'});
        
     
    }
  }
}
</script>

<style scoped>
img {
  width: 70%;
}
</style>
