<template>
    <div>
        <b-container>

            <div class="profilePicture">
                    <div class="image">
                        <b-img 
                        v-if="$store.state.userProfilePicture === null || $store.state.userProfilePicture === undefined || $store.state.userProfilePicture === ''" 
                        :src="$store.state.defaultUserImage"
                        class="image__img"
                        thumbnail
                        rounded
                        alt="User Profile Picture"
                        >
                        </b-img>
                        <b-img v-else class="image__img" thumbnail rounded :src="$store.state.userDetail.profile_image" alt="User Profile Picture"></b-img>
                        <div class="image__overlay">
                            <div class="edit__container">
                                <b-button @click="changeProfilePicture" class="edit__button"><b-icon icon="camera"></b-icon></b-button>
                            </div>
                        </div>
                    </div>
                    <span>{{ $store.state.userDetail.username }}</span>
            </div>
            <div v-show="this.editProfilePicture" class="modificationForm">

                <h5>Please Select a New photo:</h5>
                <br/>
                
                <b-form inline @submit.prevent="updateProfilePhoto" enctype="multipart/form-data" id="form">
                    <label class="sr-only" for="newProfilePicture">Select Photo:</label>
                    <b-form-file
                    id="newProfilePicture"
                    ref="profilePicture"
                    placeholder="Select Photo"
                    accept="image/*"
                    @change="saveImage"
                    class="mb-2 mr-sm-2 mb-sm-0"
                    ></b-form-file>
                    <div style="margin-top: 10px;">
                        <b-button type="submit" variant="success">Save</b-button>
                        <b-button variant="danger" @click="hideProfilePicture">Cancel</b-button>
                    </div>
                </b-form>
                <span class="invalid" id="invalidImage" style="display: none;"></span>
            </div>

            <b-container>
                    <b-row class="userInfo">
                        <b-col sm class="label">First Name</b-col>
                        <b-col sm>{{ $store.state.userDetail.first_name }}</b-col>
                        <b-col sm class="edit"><b-button @click="changeFirstName" variant="danger">Edit<b-icon icon="pencil"></b-icon></b-button></b-col>
                    </b-row>
                   
                    <div v-show="this.editFirstName" class="modificationForm">
                        <h5>Please Enter your first name:</h5><br/>
                        <span class="invalid" id="invalidFirstName" style="display: none;"></span>
                        <b-form inline @submit.prevent="updateFirstName" id="form1">
                            <label class="sr-only" for="newFirstName">First Name:</label>
                            <b-form-input
                            id="newFirstName"
                            type="text"
                            class="mb-2 mr-sm-2 mb-sm-0"
                            required
                            @input="firstNameValidator"
                            placeholder="New First Name"
                            ></b-form-input>
                            <b-button variant="success" type="submit">Save</b-button>
                            <b-button variant="danger" @click="hideFirstName">Cancel</b-button>
                        </b-form>
                    </div>
                    <b-row class="userInfo">
                        <b-col sm class="label">Last Name</b-col>
                        <b-col sm>{{ $store.state.userDetail.last_name }}</b-col>
                        <b-col sm class="edit"><b-button @click="changeLastName" variant="danger">Edit<b-icon icon="pencil"></b-icon></b-button></b-col>
                    </b-row>
                    <div v-show="this.editLastName" class="modificationForm">
                        <h5>Please Enter your last name:</h5><br/>
                        <span class="invalid" id="invalidLastName" style="display: none;"></span>
                        <b-form inline @submit.prevent="updateLastName" id="form2">
                            <label class="sr-only" for="newLastNAme">Last Name:</label>
                            <b-form-input
                            id="newLastName"
                            type="text"
                            class="mb-2 mr-sm-2 mb-sm-0"
                            required
                            @input="lastNameValidator"
                            placeholder="New Last Name"
                            ></b-form-input>
                            <b-button variant="success" type="submit">Save</b-button>
                            <b-button variant="danger" @click="hideLastName">Cancel</b-button>
                        </b-form>
                    </div>
                    <b-row class="userInfo">
                        <b-col sm class="label">Age</b-col>
                        <b-col sm>{{ $store.state.userDetail.age }}</b-col>
                        <b-col sm class="edit"><b-button @click="changeAge" variant="danger">Edit<b-icon icon="pencil"></b-icon></b-button></b-col>
                    </b-row>
                    <div v-show="this.editAge" class="modificationForm">
                        <h5>Please Enter your age:</h5><br/>
                        <span class="invalid" id="invalidAge" style="display: none;"></span>
                        <b-form inline @submit.prevent="updateAge" id="form3">
                            <label class="sr-only" for="newAge">Age:</label>
                            <b-form-input
                            id="newAge"
                            type="number"
                            class="mb-2 mr-sm-2 mb-sm-0"
                            required
                            @change="ageValidator"
                            ></b-form-input>
                            <b-button variant="success" type="submit">Save</b-button>
                            <b-button variant="danger" @click="hideAge">Cancel</b-button>
                        </b-form>
                    </div>
                    <b-row class="userInfo">
                        <b-col sm class="label">Email</b-col>
                        <b-col sm>{{ $store.state.userDetail.email }}</b-col>
                        <b-col sm class="edit"><b-button @click="changeEmail" variant="danger">Edit<b-icon icon="pencil"></b-icon></b-button></b-col>
                    </b-row>
                    <div v-show="this.editEmail" class="modificationForm">
                        <h5>Please Enter your new email address:</h5><br/>
                        <span class="invalid" id="invalidEmail" style="display: none;"></span>
                        <b-form inline @submit.prevent="updateEmail" id="form4">
                            <label class="sr-only" for="newEmail">email:</label>
                            <b-form-input
                            id="newEmail"
                            type="email"
                            class="mb-2 mr-sm-2 mb-sm-0"
                            required
                            @input="emailValidator"
                            placeholder="xyz@mail.com"
                            ></b-form-input>
                            <b-button variant="success" type="submit">Save</b-button>
                            <b-button variant="danger" @click="hideEmail">Cancel</b-button>
                        </b-form>
                    </div>
                    <b-row class="userInfo">
                        <b-col sm class="label">Username</b-col>
                        <b-col sm>{{ $store.state.userDetail.username }}</b-col>
                        <b-col sm class="edit"><b-button @click="changeUsername" variant="danger">Edit<b-icon icon="pencil"></b-icon></b-button></b-col>
                    </b-row>
                    <div v-show="this.editUsername" class="modificationForm">
                        <h5>Please Enter your new Username:</h5><br/>
                        <span class="invalid" id="invalidUsername" style="display: none;"></span>
                        <b-form inline @submit.prevent="updateUsername" id="form5">
                            <label class="sr-only" for="newUsername">Username:</label>
                            <b-form-input
                            id="newUsername"
                            type="text"
                            class="mb-2 mr-sm-2 mb-sm-0"
                            required
                            @input="usernameValidator"
                            placeholder="New Username"
                            ></b-form-input>
                            <b-button variant="success" type="submit">Save</b-button>
                            <b-button variant="danger" @click="hideUsername">Cancel</b-button>
                        </b-form>
                    </div>
                    <b-row class="userInfo">
                        <b-col sm class="label">Modify your Password</b-col>
                        <b-col sm class="edit"><b-button @click="changePassword" variant="danger">Edit<b-icon icon="pencil"></b-icon></b-button></b-col>
                    </b-row>
                    <div v-show="this.editPassword" class="modificationForm">
                        <h5>Please Enter your new Password:</h5><br/>
                        <span class="invalid" id="invalidPassword" style="display: none;"></span>
                        <b-form @submit.prevent="updatePassword" id="form6">
                            
                            <label class="sr-only" for="newPassword">Password:</label>
                            <b-form-input
                            id="newPassword"
                            type="password"
                            class="mb-2 mb-sm-0 passInput"
                            placeholder="Enter new Password"
                            required
                            @input="passwordValidator"
                            >
                            </b-form-input>
                            
                            <b-button class="eyeIcon" @click="togglePassword()" variant="light"><b-icon id="toggle" :icon="this.icon1" font-scale="1"></b-icon></b-button>
                            
                        
                            <label class="sr-only" for="confirmPassword">Confirm Password:</label>
                            <b-form-input
                            id="confirmPassword"
                            type="password"
                            class="mb-2 mb-sm-0 passInput"
                            placeholder="Confirm new Password"
                            required
                            @input="pwdCheckValidator"
                            >
                            </b-form-input>
                            
                            <b-button class="eyeIcon" @click="togglePwdCheck()" variant="light"><b-icon id="toggle" :icon="this.icon2" font-scale="1"></b-icon></b-button>
                            
                            <div>
                                <b-button variant="success" type="submit">Save</b-button>
                                <b-button variant="danger" @click="hidePassword">Cancel</b-button>
                            </div>
                            
                               
                        </b-form>
                    </div>
                    <b-row class="userInfo">
                        <b-col sm class="label">Delete your account</b-col>
                        <b-col sm class="edit">
                            <b-button variant="danger" @click="deleteUser">
                                Delete<b-icon icon="pencil"></b-icon>
                            </b-button>
                        </b-col>
                        
                    </b-row>
            </b-container>
        </b-container>
    </div>
</template>
<script>
import axios from 'axios';
import store from '../store/index';
export default {
    data () {
        return {
            imageUrl: "../assets/default-user-image.png",
            icon1: 'eye',
            icon2: 'eye',
            userDetails: [],
            newProfilePhoto: null,
            editProfilePicture: false,
            editUsername: false,
            editFirstName: false,
            editLastName: false,
            editAge: false,
            editEmail: false,
            editPassword: false,
            validProfilePhoto: false,
            validFirstName: false,
            validLastName: false,
            validAge: false,
            validEmail: false,
            validUsername: false,
            validPassword: false,
            validPwdCheck: false
        }
    },
    async created() {
        
            try {
                
                const token = localStorage.getItem("token");
                let headers = 'Bearer ' + token;

                const response = await axios.get('http://localhost:3000/user/userProfile', {
                    headers: {
                        "Authorization": headers
                    }
                });
                
                let data = response.data[0];
                store.commit('updateUser', data);
                
            } catch(err) {
                console.error(err);
            }
        },
        methods: {
            changeProfilePicture() {
                this.editProfilePicture = true;
            },
            changeFirstName() {
                this.editFirstName = true;
            },
             changeLastName() {
                this.editLastName = true;
            },
             changeAge() {
                this.editAge = true;
            },
             changeEmail() {
                this.editEmail = true;
            },
            changeUsername() {
                this.editUsername = true;
            },
             changePassword() {
                this.editPassword = true;
            },
            hideProfilePicture() {

                this.validProfilePhoto = false;
                this.editProfilePicture = false;
                this.newProfilePhoto = null;
                document.getElementById('invalidImage').style.display = 'none';
                document.getElementById('invalidImage').textContent = '';
                document.getElementById('form').reset();

            },
            hideFirstName() {

                this.validFirstName = false;
                this.editFirstName = false;
                document.getElementById('invalidFirstName').style.display = "none";
                document.getElementById('newFirstName').style.border = "1px solid #ced4da";
                document.getElementById('form1').reset();

            },
             hideLastName() {

                 this.validLastName = false;
                this.editLastName = false;
                document.getElementById('invalidLastName').style.display = "none";
                document.getElementById('newLastName').style.border = "1px solid #ced4da";
                document.getElementById('form2').reset();

            },
             hideAge() {

                this.validAge = false;
                this.editAge = false;
                document.getElementById('invalidAge').style.display = "none";
                document.getElementById('newAge').style.border = "1px solid #ced4da";
                document.getElementById('form3').reset();

            },
             hideEmail() {

                this.validEmail = false;
                this.editEmail = false;
                document.getElementById('invalidEmail').style.display = "none";
                document.getElementById('newEmail').style.border = "1px solid #ced4da";
                document.getElementById('form4').reset();

            },
            hideUsername() {

                this.validUsername = false;
                this.editUsername = false;
                document.getElementById('invalidUsername').style.display = "none";
                document.getElementById('newUsername').style.border = "1px solid #ced4da";
                document.getElementById('form5').reset();

            },
             hidePassword() {

                this.validPassword = false;
                this.validPwdCheck = false;
                this.editPassword = false;
                document.getElementById('invalidPassword').style.display = "none";
                document.getElementById('newPassword').style.border = "1px solid #ced4da";
                document.getElementById('confirmPassword').style.border = "1px solid #ced4da";
                document.getElementById('form6').reset();

            },
            firstNameValidator() {
                let input = document.getElementById('newFirstName').value;


                let regex = /^[a-zA-Z]+$/i;
                if(input === '' || input === null) {

                    this.validFirstName = false;
                    document.getElementById('invalidFirstName').style.display = "inline";
                    document.getElementById('invalidFirstName').textContent = "Your first name is required";
                    document.getElementById('newFirstName').style.border = "2px solid red";

                }else if(input.length < 2) {

                    this.validFirstName = false;
                    document.getElementById('invalidFirstName').style.display = "inline";
                    document.getElementById('invalidFirstName').textContent = "Your first name must have at least 2 characters";
                    document.getElementById('newFirstName').style.border = "2px solid red";

                }else if(!regex.test(input)) {

                    this.validFirstName = false;
                    document.getElementById('invalidFirstName').style.display = "inline";
                    document.getElementById('invalidFirstName').textContent = "Your first name can only contain letter characters";
                    document.getElementById('newFirstName').style.border = "2px solid red";

                }else {

                    document.getElementById('invalidFirstName').style.display = "none";
                    document.getElementById('newFirstName').style.border = "2px solid green";
                    this.validFirstName = true;
                }
            },
            lastNameValidator() {

                let input = document.getElementById('newLastName').value;
                

                let regex = /^[a-z]*$/i;
                if(input === '' || input === null) {

                    this.validLastName = false;
                    document.getElementById('invalidLastName').style.display = "inline";
                    document.getElementById('invalidLastName').textContent = "Your last name is required";
                    document.getElementById('newLastName').style.border = "2px solid red";

                }else if(input.length < 2) {

                    this.validLastName = false;
                    document.getElementById('invalidLastName').style.display = "inline";
                    document.getElementById('invalidLastName').textContent = "Your last name must have at least 2 characters";
                    document.getElementById('newLastName').style.border = "2px solid red";

                }else if(!regex.test(input)) {

                    this.validLastName = false;
                    document.getElementById('invalidLastName').style.display = "inline";
                    document.getElementById('invalidLastName').textContent = "Your last name can only contain letter characters";
                    document.getElementById('newLastName').style.border = "2px solid red";

                }else {

                    document.getElementById('invalidLastName').style.display = "none";
                    document.getElementById('newLastName').style.border = "2px solid green";
                    this.validLastName = true;
                }
            },
            ageValidator() {

                let age = document.getElementById('newAge').value;
                
                if(age < 18) {

                    this.validAge = false;
                    document.getElementById('invalidAge').style.display = "inline";
                    document.getElementById('invalidAge').textContent = "User must be at least 18 Years Old";
                    document.getElementById('newAge').style.border = "2px solid red";

                }else {

                    document.getElementById('invalidAge').style.display = 'none';
                    document.getElementById('newAge').style.border = "2px solid green";
                    this.validAge = true;

                }
            },
            async emailValidator() {

                let validator = await axios.get('http://localhost:3000/auth/verifyEmail');
                let emailList = validator.data;
                let regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;

                let input = document.getElementById('newEmail').value;
                

                if(input === '' || input === null) {

                    this.validEmail = false;
                    document.getElementById('invalidEmail').style.display = 'inline';
                    document.getElementById('invalidEmail').textContent = "Your email is required";
                    document.getElementById('newEmail').style.border = "2px solid red";

                }else if(!regex.test(input)) {

                    this.validEmail = false;
                    document.getElementById('invalidEmail').style.display = 'inline';
                    document.getElementById('invalidEmail').textContent = "This is not a valid email";
                    document.getElementById('newEmail').style.border = "2px solid red";

                }else if(emailList.includes(input)) {

                    this.validEmail = false;
                    document.getElementById('invalidEmail').style.display = 'inline';
                    document.getElementById('invalidEmail').textContent = "This email is already used by another user";
                    document.getElementById('newEmail').style.border = "2px solid red";

                }else {

                    document.getElementById('invalidEmail').style.display = "none";
                    document.getElementById('newEmail').style.border = "2px solid green";
                    this.validEmail = true;
                }
            },
            async usernameValidator() {

                let validator = await axios.get('http://localhost:3000/auth/verifyUsername');
                let usernameList = validator.data;
                
                let input = document.getElementById('newUsername').value;
                

                if(input === '' || input === null) {

                    this.validUsername = false;
                    document.getElementById('invalidUsername').style.display = 'inline';
                    document.getElementById('invalidUsername').textContent = "Your Username is required";
                    document.getElementById('newUsername').style.border = "2px solid red";

                }else if(input.length < 6) {

                    this.validUsername = false;
                    document.getElementById('invalidUsername').style.display = 'inline';
                    document.getElementById('invalidUsername').textContent = "Your username must be at least 6 characters";
                    document.getElementById('newUsername').style.border = "2px solid red";

                }else if(usernameList.includes(input)) {

                    this.validUsername = false;
                    document.getElementById('invalidUsername').style.display = 'inline';
                    document.getElementById('invalidUsername').textContent = "This username is already used by another user";
                    document.getElementById('newUsername').style.border = "2px solid red";

                }else {

                    document.getElementById('invalidUsername').style.display = "none";
                    document.getElementById('newUsername').style.border = "2px solid green";
                    this.validUsername = true;

                }
            },
            togglePassword() {

            var show = document.getElementById('newPassword');
            
                if(show.type === 'password') {
                    show.type = 'text';
                    this.icon1 = 'eye-slash';
                
                }else {
                    show.type = 'password';
                    this.icon1 = 'eye';
                    
                }
            },
            togglePwdCheck() {
                var show = document.getElementById('confirmPassword');
                
                if(show.type === 'password') {
                    show.type = 'text';
                    this.icon2 = 'eye-slash';
                }else {
                    show.type = 'password';
                    this.icon2 = 'eye';
                }
            },
            passwordValidator() {
                let input = document.getElementById('newPassword').value;
                
                if (input === '' || input === null) {

                    this.validPassword = false;
                    document.getElementById('invalidPassword').style.display = "inline";
                    document.getElementById('invalidPassword').textContent = "Your Password is Required!!";
                    document.getElementById('newPassword').style.border = "2px solid red";

                }else if(input.length < 6) {

                    this.validPassword = false;
                    document.getElementById('invalidPassword').style.display = "inline";
                    document.getElementById('invalidPassword').textContent = "Your Password must have at least 6 characters";
                    document.getElementById('newPassword').style.border = "2px solid red";

                }else {

                    document.getElementById('invalidPassword').style.display = "none";
                    document.getElementById('newPassword').style.border = "2px solid green";
                    this.validPassword = true;
                    
                }
                
            },
            pwdCheckValidator() {

                let input = document.getElementById('confirmPassword').value;
                
                if(input === '' || input === null) {

                    this.validPwdCheck = false;
                    document.getElementById('invalidPassword').style.display = "inline";
                    document.getElementById('invalidPassword').textContent = "Please Confirm your Password!!";
                    document.getElementById('confirmPassword').style.border = "2px solid red";

                }
                else if(input !== document.getElementById('newPassword').value) {

                    this.validPwdCheck = false;
                    document.getElementById('invalidPassword').style.display = "inline";
                    document.getElementById('invalidPassword').textContent = "Your password must be identical";
                    document.getElementById('confirmPassword').style.border = "2px solid red";

                }else {

                    document.getElementById('invalidPassword').style.display = "none";
                    document.getElementById('confirmPassword').style.border = "2px solid green";
                    this.validPwdCheck = true;

                }


            },
            saveImage(event) {

                this.newProfilePhoto = event.target.files[0];

                let regex = /image\/jpeg|image\/jpg|image\/png|image\/gif/;

                if (!regex.test(this.newProfilePhoto.type)) {
                    
                    this.validProfilePhoto = false;
                    document.getElementById('newProfilePicture').value = null;
                    document.getElementById('invalidImage').style.display = 'inline';
                    document.getElementById('invalidImage').textContent = 'Only Image Files are allowed. jpeg, jpg, png, gif!!';
                    document.getElementById('newProfilePicture').style.border = '2px solid red';

                }else {

                    this.validProfilePhoto = true;
                    document.getElementById('invalidImage').style.display = 'none';
                    document.getElementById('newProfilePicture').style.border = '2px solid green'

                }
                
            },
            async updateProfilePhoto() {

                const token = localStorage.getItem("token");
                let headers = 'Bearer ' + token;

                const fd = new FormData();
                fd.append('userId', store.state.userID);
                fd.append('image', this.newProfilePhoto);

                if(this.newProfilePhoto === null) {
                    
                    document.getElementById('invalidImage').style.display = 'inline';
                    document.getElementById('invalidImage').textContent = 'Please Select a Profile Picture';
                    document.getElementById('newProfilePicture').style.border = '2px solid red';

                }else if(this.validProfilePhoto) {

                    await axios.put('http://localhost:3000/user/profilePhoto', fd, {
                        headers: {
                            "Authorization": headers
                        }
                    })
                    .then(function() {
                        
                        store.dispatch('updateUser');

                    }).catch(function(err) {
                        console.log(err);
                    });

                    this.validProfilePhoto = false;
                    this.editProfilePicture = false;
                    this.newProfilePhoto = null;
                    document.getElementById('form').reset();
                }
            },
            async updateFirstName() {

                let newData = document.getElementById('newFirstName').value;
                

                const token = localStorage.getItem("token");
                let headers = 'Bearer ' + token;

                if(this.validFirstName) {
                    await axios.put('http://localhost:3000/user/firstName', {firstName: newData} , {
                        headers: {
                            "Authorization": headers
                        }
                    }).then(function () {

                        store.dispatch('updateUser');

                    }).catch (function (err) {
                        console.log(err);
                    })

                    this.validFirstName = false;
                    document.getElementById('form1').reset();
                    document.getElementById('invalidFirstName').style.display = "none";
                    document.getElementById('newFirstName').style.border = "1px solid #ced4da";
                    this.editFirstName = false;

                }
            },
            async updateLastName() {
                
                let newData = document.getElementById('newLastName').value;
                
                const token = localStorage.getItem("token");
                let headers = 'Bearer ' + token;

                if(this.validLastName) {
                    await axios.put('http://localhost:3000/user/lastName', {lastName: newData} , {
                        headers: {
                            "Authorization": headers
                        }
                    }).then(function () {

                        store.dispatch('updateUser');

                    }).catch (function (err) {
                        console.log(err);
                    })

                    this.validLastName = false;
                    document.getElementById('form2').reset();
                    document.getElementById('invalidLastName').style.display = "none";
                    document.getElementById('newLastName').style.border = "1px solid #ced4da";
                    this.editLastName = false;

                }
            },
            async updateAge() {

                let newData = document.getElementById('newAge').value;
                
                const token = localStorage.getItem("token");
                let headers = 'Bearer ' + token;
                
                if(this.validAge) {

                    await axios.put('http://localhost:3000/user/age', {age: newData} , {
                        headers: {
                            "Authorization": headers
                        }
                    }).then(function () {

                        store.dispatch('updateUser');

                    }).catch (function (err) {

                        console.log(err);
                    });

                    this.validAge = false;
                    document.getElementById('form3').reset();
                    document.getElementById('invalidAge').style.display = "none";
                    document.getElementById('newAge').style.border = "1px solid #ced4da";
                    this.editAge = false;

                }
            },
            async updateEmail() {

                let newData = document.getElementById('newEmail').value;
                
                const token = localStorage.getItem("token");
                let headers = 'Bearer ' + token;

                if(this.validEmail) {

                    await axios.put('http://localhost:3000/user/email', {email: newData} , {
                        headers: {
                            "Authorization": headers
                        }
                    }).then(function () {

                        store.dispatch('updateUser');

                    }).catch (function (err) {

                        console.log(err);
                    });

                    this.validEmail = false;
                    document.getElementById('invalidEmail').style.display = "none";
                    document.getElementById('newEmail').style.border = "1px solid #ced4da";
                    document.getElementById('form4').reset();
                    this.editEmail = false;

                }
            },
            async updateUsername() {

                let newData = document.getElementById('newUsername').value;
                
                const token = localStorage.getItem("token");
                let headers = 'Bearer ' + token;

                if(this.validUsername) {

                    await axios.put('http://localhost:3000/user/username', {username: newData} , {
                        headers: {
                            "Authorization": headers
                        }
                    }).then(function () {

                        store.dispatch('updateUser');

                    }).catch (function (err) {

                        console.log(err);
                    });

                    this.validUsername = false;
                    document.getElementById('invalidUsername').style.display = "none";
                    document.getElementById('newUsername').style.border = "1px solid #ced4da";
                    document.getElementById('form5').reset();
                    this.editUsername = false;

                }
            },
            async updatePassword () {

                const token = localStorage.getItem("token");
                let headers = 'Bearer ' + token;

                let password = document.getElementById('newPassword').value;
                let confirmPassword = document.getElementById('confirmPassword').value;
                let newData;

                
                if(password !== confirmPassword) {

                    this.validPwdCheck = false;
                    document.getElementById('invalidPassword').style.display = "inline";
                    document.getElementById('invalidPassword').textContent = "Your password must be identical";
                    document.getElementById('confirmPassword').style.border = "2px solid red";

                }else if(password === confirmPassword && this.validPassword === true && this.validPwdCheck === true) {

                    newData = password;

                    await axios.put('http://localhost:3000/user/password', {newPassword: newData}, {
                    headers: {
                        "Authorization": headers
                    }
                    }).then(function () {
                        
                        store.dispatch('updateUser');

                    }).catch (function (err) {

                        console.log(err);
                    });

                    this.validPassword = false;
                    this.validPwdCheck = false;
                    document.getElementById('form6').reset();
                    document.getElementById('invalidPassword').style.display = "none";
                    document.getElementById('newPassword').style.border = "1px solid #ced4da";
                    document.getElementById('confirmPassword').style.border = "1px solid #ced4da";
                    this.editPassword = false;
                }

            },
            async deleteUser() {

                let userChoice = window.confirm('Are you sure you want to delete your account? This action is IRREVERSIBLE!!!');

                const token = localStorage.getItem("token");
                let headers = 'Bearer ' + token;

                let postsCount = await axios.get('http://localhost:3000/auth/verifyPostsCount',
                    {
                         headers: {
                            "Authorization": headers
                        }
                    });
                    
                    
                if (userChoice === true) {
                    axios.delete('http://localhost:3000/user/deleteAccount',
                    {
                        data: {
                            totalPosts: postsCount.data[0].postsCount
                        },
                        headers: {
                            "Authorization": headers
                        }
                    })
                    .then(function() {
                        
                        store.dispatch('logOut');
                        localStorage.removeItem('token');
                        
                    })
                    .catch(function(err) {

                        console.log(err);
                    })

                    this.$router.push('/');
                }
            }
            
        }
    }
    
</script>

<style scoped>
button {
    margin: 0 5px;
}

.eyeIcon {
    margin: 0 5px 0 0;
    background: none;
    border: none;
}

.passInput {
    max-width: 225px;
}

.eyeIcon:hover, .eyeIcon:focus, .eyeIcon:active {
    background: none;
    border: none;
    box-shadow: none;
}

.profilePicture {
    margin: 10px auto 50px auto;
    font-size: 1.5rem;
    font-weight: bolder;
    text-align: left;
}

.image {
    position: relative;
    width: 200px;
}

.image__img {
    width: 100%;
    display: block;
}

.image__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width : 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity .25s;
}

.image__overlay > * {
    transform: translateY(20px);
    transition: transform .25s;
}

.image__overlay:hover {
    opacity: 1;
}

.image__overlay:hover > * {
    transform: translateY(0);
}

.edit__container {
    font-size: 2em;
}

.edit__button {
    font-size: 1.35rem;
    margin-top: .25em;
    background: transparent;
    border: none;
    
}

.edit__button:hover, .edit__button:focus {
    background: transparent;
}

.userInfo {
    padding: 15px;
    background-color: #eee;
    border: 1px solid #dedede;
    text-align: left;
    margin-bottom: 10px;
}

.label {
    font-weight: bold;
}

.edit {
    text-align: right;
}

.modificationForm {
    text-align: left;
    margin-bottom: 15px;
    border: 1px solid black;
    border-radius: 10px;
    padding: 15px;
}

.delete, .invalid {
    color: red;
}
</style>