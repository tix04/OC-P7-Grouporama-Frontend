<template>
    <div>
        <b-container>

            <div class="profilePicture">
                    <div class="image">
                        <b-img class="image__img" thumbnail rounded :src="$store.state.userDetail.profile_image" alt="User Profile Picture"></b-img>
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
            </div>

            <b-container>
                    <b-row class="userInfo">
                        <b-col class="label">First Name</b-col>
                        <b-col>{{ $store.state.userDetail.first_name }}</b-col>
                        <b-col class="edit"><b-button @click="changeFirstName" variant="danger">Edit<b-icon icon="pencil"></b-icon></b-button></b-col>
                    </b-row>
                    <div v-show="this.editFirstName" class="modificationForm">
                        <h5>Please Enter your first name:</h5><br/>

                        <b-form inline>
                            <label class="sr-only" for="newFirstName">First Name:</label>
                            <b-form-input
                            id="newFirstName"
                            class="mb-2 mr-sm-2 mb-sm-0"
                            placeholder="New First Name"
                            ></b-form-input>
                            <b-button variant="success" @click="updateFirstName">Save</b-button>
                            <b-button variant="danger" @click="hideFirstName">Cancel</b-button>
                        </b-form>
                    </div>
                    <b-row class="userInfo">
                        <b-col class="label">Last Name</b-col>
                        <b-col>{{ $store.state.userDetail.last_name }}</b-col>
                        <b-col class="edit"><b-button @click="changeLastName" variant="danger">Edit<b-icon icon="pencil"></b-icon></b-button></b-col>
                    </b-row>
                    <div v-show="this.editLastName" class="modificationForm">
                        <h5>Please Enter your last name:</h5><br/>

                        <b-form inline>
                            <label class="sr-only" for="newLastNAme">Last Name:</label>
                            <b-form-input
                            id="newLastName"
                            class="mb-2 mr-sm-2 mb-sm-0"
                            placeholder="New Last Name"
                            ></b-form-input>
                            <b-button variant="success" @click="updateLastName">Save</b-button>
                            <b-button variant="danger" @click="hideLastName">Cancel</b-button>
                        </b-form>
                    </div>
                    <b-row class="userInfo">
                        <b-col class="label">Age</b-col>
                        <b-col>{{ $store.state.userDetail.age }}</b-col>
                        <b-col class="edit"><b-button @click="changeAge" variant="danger">Edit<b-icon icon="pencil"></b-icon></b-button></b-col>
                    </b-row>
                    <div v-show="this.editAge" class="modificationForm">
                        <h5>Please Enter your age:</h5><br/>

                        <b-form inline>
                            <label class="sr-only" for="newAge">Age:</label>
                            <b-form-input
                            id="newAge"
                            type="number"
                            class="mb-2 mr-sm-2 mb-sm-0"
                            ></b-form-input>
                            <b-button variant="success" @click="updateAge">Save</b-button>
                            <b-button variant="danger" @click="hideAge">Cancel</b-button>
                        </b-form>
                    </div>
                    <b-row class="userInfo">
                        <b-col class="label">Email</b-col>
                        <b-col>{{ $store.state.userDetail.email }}</b-col>
                        <b-col class="edit"><b-button @click="changeEmail" variant="danger">Edit<b-icon icon="pencil"></b-icon></b-button></b-col>
                    </b-row>
                    <div v-show="this.editEmail" class="modificationForm">
                        <h5>Please Enter your new email address:</h5><br/>

                        <b-form inline>
                            <label class="sr-only" for="newEmail">email:</label>
                            <b-form-input
                            id="newEmail"
                            type="email"
                            class="mb-2 mr-sm-2 mb-sm-0"
                            placeholder="xyz@mail.com"
                            ></b-form-input>
                            <b-button variant="success" @click="updateEmail">Save</b-button>
                            <b-button variant="danger" @click="hideEmail">Cancel</b-button>
                        </b-form>
                    </div>
                    <b-row class="userInfo">
                        <b-col class="label">Username</b-col>
                        <b-col>{{ $store.state.userDetail.username }}</b-col>
                        <b-col class="edit"><b-button @click="changeUsername" variant="danger">Edit<b-icon icon="pencil"></b-icon></b-button></b-col>
                    </b-row>
                    <div v-show="this.editUsername" class="modificationForm">
                        <h5>Please Enter your new Username:</h5><br/>
                        <p id="usernameValidation"></p>
                        <b-form inline>
                            <label class="sr-only" for="newUsername">Username:</label>
                            <b-form-input
                            id="newUsername"
                            class="mb-2 mr-sm-2 mb-sm-0"
                            placeholder="New Username"
                            ></b-form-input>
                            <b-button variant="success" @click="updateUsername">Save</b-button>
                            <b-button variant="danger" @click="hideUsername">Cancel</b-button>
                        </b-form>
                    </div>
                    <b-row class="userInfo">
                        <b-col class="label">Modify your Password</b-col>
                        <b-col class="edit"><b-button @click="changePassword" variant="danger">Edit<b-icon icon="pencil"></b-icon></b-button></b-col>
                    </b-row>
                    <div v-show="this.editPassword" class="modificationForm">
                        <h5>Please Enter your new Password:</h5><br/>

                        <b-form inline>
                            <label class="sr-only" for="newPassword">Password:</label>
                            <b-form-input
                            id="newPassword"
                            type="password"
                            class="mb-2 mr-sm-2 mb-sm-0"
                            ></b-form-input>
                            <label class="sr-only" for="confirmPassword">Confirm Password:</label>
                            <b-form-input
                            id="confirmPassword"
                            type="password"
                            class="mb-2 mr-sm-2 mb-sm-0"
                            ></b-form-input>
                            <b-button variant="success" @click="updatePassword">Save</b-button>
                            <b-button variant="danger" @click="hidePassword">Cancel</b-button>
                        </b-form>
                    </div>
                    <b-row class="userInfo">
                        <b-col class="label">Delete your account</b-col>
                        <b-col class="edit">
                            <b-button variant="danger">
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
            userDetails: [],
            newProfilePhoto: null,
            editProfilePicture: false,
            editUsername: false,
            editFirstName: false,
            editLastName: false,
            editAge: false,
            editEmail: false,
            editPassword: false,
            userID: ''
        }
    },
    //Use Axios
    async created() {
        //Set userID get it from token authentication
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
                console.log(data);
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
                this.editProfilePicture = false;
                this.newProfilePhoto = null;
                document.getElementById('form').reset();
            },
            hideFirstName() {
                this.editFirstName = false;
            },
             hideLastName() {
                this.editLastName = false;
            },
             hideAge() {
                this.editAge = false;
            },
             hideEmail() {
                this.editEmail = false;
            },
            hideUsername() {
                this.editUsername = false;
            },
             hidePassword() {
                this.editPassword = false;
            },
            /*async validateUsername() {
                let userName = document.getElementById('newUsername').value;
                console.log(userName);
                
                await axios.get('http://localhost:3000/auth/verifyUsername')
                .then(function(response) {
                    console.log(response);

                    for(let i = 0; i < response.length; i++) {
                        
                        if(response.data[i].username == document.getElementByID('newUsername').value) {
                            console.log('Username already exists. Please try again')
                        }else {
                            console.log('Username can be used')
                        }
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
            },*/
            saveImage(event) {
                this.newProfilePhoto = event.target.files[0];
                console.log(this.newProfilePhoto);
            },
            async updateProfilePhoto() {

                const token = localStorage.getItem("token");
                let headers = 'Bearer ' + token;

                const fd = new FormData();
                fd.append('userId', store.state.userID);
                fd.append('image', this.newProfilePhoto);
                console.log(fd);
                

                await axios.put('http://localhost:3000/user/profilePhoto', fd, {
                    headers: {
                        "Authorization": headers
                    }
                })
                .then(function(response) {
                    console.log(response);
                    store.dispatch('updateUser');

                }).catch(function(err) {
                    console.log(err);
                });

                this.editProfilePicture = false;
                this.newProfilePhoto = null;
                document.getElementById('form').reset();
            },
            async updateFirstName() {
                let newData = document.getElementById('newFirstName').value;
                console.log(newData);

                const token = localStorage.getItem("token");
                let headers = 'Bearer ' + token;

                await axios.put('http://localhost:3000/user/firstName', {firstName: newData} , {
                     headers: {
                        "Authorization": headers
                    }
                }).then(function () {

                    store.dispatch('updateUser');

                }).catch (function (err) {
                    console.log(err);
                })

                document.getElementById('newFirstName').value = '';
                this.editFirstName = false;
            },
            async updateLastName() {
                
                let newData = document.getElementById('newLastName').value;
                console.log(newData);
                
                const token = localStorage.getItem("token");
                let headers = 'Bearer ' + token;

                await axios.put('http://localhost:3000/user/lastName', {lastName: newData} , {
                     headers: {
                        "Authorization": headers
                    }
                }).then(function () {

                    store.dispatch('updateUser');

                }).catch (function (err) {
                    console.log(err);
                })

                document.getElementById('newLastName').value = '';
                this.editLastName = false;
            },
            async updateAge() {
                let newData = document.getElementById('newAge').value;
                console.log(newData);
                
                const token = localStorage.getItem("token");
                let headers = 'Bearer ' + token;

                await axios.put('http://localhost:3000/user/age', {age: newData} , {
                     headers: {
                        "Authorization": headers
                    }
                }).then(function () {

                    store.dispatch('updateUser');

                }).catch (function (err) {
                    console.log(err);
                });

                document.getElementById('newAge').value = null;
                this.editAge = false;
            },
            async updateEmail() {
                let newData = document.getElementById('newEmail').value;
                console.log(newData);
                
                const token = localStorage.getItem("token");
                let headers = 'Bearer ' + token;

                await axios.put('http://localhost:3000/user/email', {email: newData} , {
                     headers: {
                        "Authorization": headers
                    }
                }).then(function () {

                    store.dispatch('updateUser');

                }).catch (function (err) {
                    console.log(err);
                });

                document.getElementById('newEmail').value = '';
                this.editEmail = false;
            },
            async updateUsername() {
                let newData = document.getElementById('newUsername').value;
                console.log(newData);
                
                const token = localStorage.getItem("token");
                let headers = 'Bearer ' + token;

                await axios.put('http://localhost:3000/user/username', {username: newData} , {
                     headers: {
                        "Authorization": headers
                    }
                }).then(function () {

                    store.dispatch('updateUser');

                }).catch (function (err) {
                    console.log(err);
                });

                document.getElementById('newUsername').value = '';
                this.editAge = false;
            },
            async updatePassword () {

                const token = localStorage.getItem("token");
                let headers = 'Bearer ' + token;

                let password = document.getElementById('newPassword').value;
                let confirmPassword = document.getElementById('confirmPassword').value;
                let newData;

                console.log(password, confirmPassword);

                if(password === confirmPassword) {
                    newData = password;

                    await axios.put('http://localhost:3000/user/password', {newPassword: newData}, {
                    headers: {
                        "Authorization": headers
                    }
                    }).then(function (response) {
                        console.log(response);
                        store.dispatch('updateUser');

                    }).catch (function (err) {
                        console.log(err);
                    });

                    document.getElementById('newPassword').value = '';
                    document.getElementById('confirmPassword').value = '';
                    this.editPassword = false;
                }else {
                    window.alert("Password does not match");
                }

            }
            /*TODO: 
            1 - Add update for password
            2 - Validation for frontend for each input
            3 -brcrypt password
            4 -Logout(Delete Token and reset State Data) ***FINISHED***
            5 -Adjust validation frontend
            6 -Validation back end
            7 -Add visual text for Comments Posted, Deleted, User Data Updated
            8 -Modfiy CSS based on yahya recommendations: create post inline not block, Grouporama welcome erase, Color for unseen posts and block hidden if no new posts
            9 -Add edit for profile photo *****FINISHED*****
            10 -Create User check if username and email already exist. Need to be unique(Check backend on blur if email and username already exist)
            11 - Delete Post(Delete comments with post ID, then delete specific post). Delete user (Delete comments with userID and POST ID, delete Post with user ID, Delete Specific User and Log out)
            */
        }
    }
    
</script>

<style scoped>
button {
    margin: 0 5px;
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

.edit__icon .b-icon {
    margin-left: 0;
}

.modificationForm {
    text-align: left;
    margin-bottom: 15px;
    border: 1px solid black;
    border-radius: 10px;
    padding: 15px;
}

.setting {
    text-align: left;
    font-weight:  bold;
    border: 1px solid #eee;
    margin: 10px;
    padding: 15px;
    background-color: rgb(250, 250, 250);
    border-radius: 10px;
}

.delete {
    color: red;
}
</style>