<template>
    <div>
        <b-container>
            <div class="profilePicture">
                <b-row>
                    <b-col class="username">
                        <b-img thumbnail rounded :src="this.userDetails[0].profile_image/*require('../assets/default-user-image.png')*/" alt="User Profile Picture"></b-img>
                        <br/>
                        <span style="margin-left: 20px;">{{ this.userDetails[0].username }}</span>
                    </b-col>
                </b-row>
                
            </div>
            <b-container>
                    <b-row class="userInfo">
                        <b-col class="label">First Name</b-col>
                        <b-col>{{ this.userDetails[0].first_name }}</b-col>
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
                            <b-button variant="success" @click="inputFieldHidden">Save</b-button>
                            <b-button variant="danger" @click="hideFirstName">Cancel</b-button>
                        </b-form>
                    </div>
                    <b-row class="userInfo">
                        <b-col class="label">Last Name</b-col>
                        <b-col>{{ this.userDetails[0].last_name }}</b-col>
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
                            <b-button variant="success" @click="inputFieldHidden">Save</b-button>
                            <b-button variant="danger" @click="hideLastName">Cancel</b-button>
                        </b-form>
                    </div>
                    <b-row class="userInfo">
                        <b-col class="label">Age</b-col>
                        <b-col>{{ this.userDetails[0].age }}</b-col>
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
                            <b-button variant="success" @click="inputFieldHidden">Save</b-button>
                            <b-button variant="danger" @click="hideAge">Cancel</b-button>
                        </b-form>
                    </div>
                    <b-row class="userInfo">
                        <b-col class="label">Email</b-col>
                        <b-col>{{ this.userDetails[0].email }}</b-col>
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
                            <b-button variant="success" @click="inputFieldHidden">Save</b-button>
                            <b-button variant="danger" @click="hideEmail">Cancel</b-button>
                        </b-form>
                    </div>
                    <b-row class="userInfo">
                        <b-col class="label">Username</b-col>
                        <b-col>{{ this.userDetails[0].username }}</b-col>
                        <b-col class="edit"><b-button @click="changeUsername" variant="danger">Edit<b-icon icon="pencil"></b-icon></b-button></b-col>
                    </b-row>
                    <div v-show="this.editUsername" class="modificationForm">
                        <h5>Please Enter your new Username:</h5><br/>

                        <b-form inline>
                            <label class="sr-only" for="newUsername">Username:</label>
                            <b-form-input
                            id="newUsername"
                            class="mb-2 mr-sm-2 mb-sm-0"
                            placeholder="New Username"
                            ></b-form-input>
                            <b-button variant="success" @click="inputFieldHidden">Save</b-button>
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
                            <b-button variant="success" @click="inputFieldHidden">Save</b-button>
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
export default {
    data () {
        return {
            userDetails: [],
            editUsername: false,
            editFirstName: false,
            editLastName: false,
            editAge: false,
            editEmail: false,
            editPassword: false
        }
    },
    //Use Axios
    async created() {
            try {
                const response = await axios.get('http://localhost:3000/user/7');

                this.userDetails = response.data;
                console.log(this.userDetails);
            } catch(err) {
                console.error(err);
            }
        },
        methods: {
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
            }

        }
    }
    /****Use Fetch
    //mounted () {
    async created() {
            
           let userDetails = "http://localhost:3000/user/1";
            
            fetch(userDetails)
                .b-colen(function(data) {
                    return data.json();
                })
                .b-colen(function(data) {
                    console.log(data);
                }) 
        }*/
    //}
</script>

<style scoped>
button {
    margin: 0 5px;
}

.profilePicture {
    margin: 0px auto 50px auto;
}

img {
    width: 150px;
}

.username {
    font-size: 2rem;
    font-weight: bolder;
    text-align: left;
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

.b-icon {
    margin-left: 10px;
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