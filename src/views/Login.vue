<template>
  <div>
    
    <b-container style="margin-top: 50px;max-width: 720px;">
      <b-row align-h="center">
        <b-col fluid="sm" col sm="8">
          <b-img fluid center :src="require('../assets/icon-left-font-modified.png')" alt="Grouporama Logo"></b-img>
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
                placeholder="Password"
                v-on:blur="passValidation()"
                required
                >
                </b-form-input>
                <p v-if="validPass" style="color:red">Please enter a valid Password</p>
                <b-button type="submit" variant="primary" style="margin-top: 15px;">Submit</b-button>
              </b-form-group>
            </b-form>
            <p id="message"></p>
          </b-jumbotron>
          <p style="text-align: center;">Don't have an Account.<span id="signUp"><router-link to="/signup">Sign Up</router-link></span></p>
        </b-col>
      </b-row>
    </b-container>

  </div>
</template>

<script>
import axios from 'axios';

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
  validations: {
    
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
          
          
          token = response.data.token;
          
          localStorage.setItem("token", token);
          window.location.href = '#/posts';

        })
        .catch(function(err) {

          console.log(err);
          document.getElementById('message').style.color = 'red';
          document.getElementById('message').textContent = 'Username or Password is invalid. Please Try again!';

          });

        
        this.username = '';
        this.password = '';
        
        document.getElementById('username').value = null;
        document.getElementById('password').value = null;
        
    }
  }
}
</script>

<style scoped>
img {
  width: 300px;
  margin-bottom: 10px;
}
</style>
