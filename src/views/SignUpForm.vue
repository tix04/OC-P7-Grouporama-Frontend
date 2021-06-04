<template>
    <div>
        <b-container id="signUp">
            <b-form @submit.prevent="onSubmit" enctype="multipart/form-data" id="form">
                <b-form-group
                id=userInput2
                label="Upload your Profile Picture(Optional)"
                label-for="profilePhoto">
                    <b-input-group size="sm" class="mb-2">
                        <b-form-file
                        id="profilePhoto"
                        ref="profilePicture"
                        placeholder="Select file"
                        accept=".jpeg, .jpg, .png, .gif"
                        @change="validateImage"
                        >
                        </b-form-file>
                        
                    </b-input-group>
                    <span v-if="form.profilePhoto.content === null"></span>
                    <span v-else-if="form.profilePhoto.type" style="color: #dc3545;">Only Image Files Are Allowed(jpeg, jpg, png, gif)</span>
                    <span v-else-if="form.profilePhoto.valid" style="color: #28a745;">File is Valid</span>
                </b-form-group>
                <b-form-group
                id="userInput1"
                label="First Name: "
                label-for="fName"
                >
                    <b-input-group size="sm" class="mb-2">
                        <b-form-input
                        id="fName"
                        type="text"
                        placeholder="For eg. John"
                        v-model = form.firstName.content
                        @input="validateFirstName"
                        required
                        >
                    
                        </b-form-input>
                        
                    </b-input-group>
                    <span v-if="form.firstName.valid" style="color: #28a745;">Your First Name is valid</span>
                    <span v-if="form.firstName.invalid" style="color: #dc3545;">{{form.firstName.message}}</span>
                </b-form-group>

                <b-form-group
                id="userInput3"
                label="Last Name: "
                label-for="lName"
                >
                    <b-input-group size="sm" class="mb-2">
                        <b-form-input
                        id="lName"
                        type="text"
                        placeholder="For eg. Smith"
                        v-model = form.lastName.content
                        @input="validateLastName"
                        required
                        >
                        </b-form-input>
                        
                    </b-input-group>
                    <span v-if="form.lastName.valid" style="color: #28a745;">Your Last Name is valid</span>
                    <span v-if="form.lastName.invalid" style="color: #dc3545;">{{form.lastName.message}}</span>

                </b-form-group>
                <b-form-group
                id="userInput4"
                label="Age: "
                label-for="age"
                >
                    <b-input-group size="sm" class="mb-2">
                        <b-form-input
                        id="age"
                        type="number"
                        v-model= form.age.value
                        @change="validateAge"
                        required
                        >
                        </b-form-input>
                         
                    </b-input-group>
                    <span v-if="form.age.valid" style="color: #28a745;">Your age is valid</span>
                    <span v-if="form.age.invalid" style="color: #dc3545;">{{form.age.message}}</span>
                </b-form-group>
                <b-form-group
                id="userInput5"
                label="Email Address: "
                label-for="email"
                >
                    <b-input-group size="sm" class="mb-2">
                        <b-form-input
                        id="email"
                        type="email"
                        placeholder="For eg. xyz@mail.com"
                        v-model="form.email.content"
                        @input="validateEmail"
                        required
                        >
                        </b-form-input>
                        
                    </b-input-group>
                    <span v-if="form.email.valid" style="color: #28a745;">Your email is valid</span>
                    <span v-if="form.email.invalid" style="color: #dc3545;">{{ form.email.message }}</span>

                </b-form-group>
                <b-form-group
                id="userInput6"
                label="Username: "
                label-for="username"
                >
                    <b-input-group size="sm" class="mb-2">
                        <b-form-input
                        id="username"
                        type="text"
                        placeholder="Enter your new username"
                        v-model="form.username.content"
                        @input="validateUsername"
                        required
                        >
                        </b-form-input>
                        
                    </b-input-group>
                    <span v-if="form.username.valid" style="color: #28a745;">Your username is valid</span>
                    <span v-if="form.username.invalid" style="color: #dc3545;">{{form.username.message}}</span>

                </b-form-group>
                <b-form-group
                id="userInput7"
                label="Password: "
                label-for="password"
                >
                    <b-input-group size="sm" class="mb-2">
                        <b-form-input
                        id="password"
                        type="password"
                        placeholder="Password"
                        v-model="form.password.content"
                        @input="validatePassword"
                        required
                        >
                        </b-form-input>
                        <b-input-group-prepend is-text>
                            <b-button @click="togglePassword()" variant="light" size="sm"><b-icon id="toggle" :icon="this.icon1" font-scale="1"></b-icon></b-button>
                        </b-input-group-prepend>
                        
                    </b-input-group>
                    <span v-if="form.password.valid" style="color: #28a745;">Your password is valid</span>
                    <span v-if="form.password.invalid" style="color: #dc3545;">{{form.password.message}}</span>

                </b-form-group>
                <b-form-group
                id="userInput8"
                label="Confirm your Password: "
                label-for="pwdCheck"
                >
                    <b-input-group size="sm" class="mb-2">
                        <b-form-input
                        id="pwdCheck"
                        type="password"
                        placeholder="Confirm Password"
                        v-model="form.pwdCheck.content"
                        @input="validatePwdCheck"
                        required
                        >
                        </b-form-input>
                        <b-input-group-prepend is-text>
                            <b-button @click="togglePwdCheck()" variant="light" size="sm"><b-icon id="toggle" :icon="this.icon2" font-scale="1"></b-icon></b-button>
                        </b-input-group-prepend>

                    </b-input-group>
                    <span v-if="form.pwdCheck.valid" style="color: #28a745;">Your password is valid</span>
                    <span v-if="form.pwdCheck.invalid" style="color: #dc3545;">{{form.pwdCheck.message}}</span>

                </b-form-group>
                <b-button type="submit" variant="success">Submit</b-button>
                <b-button type="reset" variant="danger" @click="onReset()">Reset</b-button>
                <router-link to="/"><b-button variant="light"><b-icon icon="house-door-fill" variant="dark" font-scale="2.5"></b-icon></b-button></router-link>
            </b-form>
            <div id="validationError">
                Errors have been detected. Please Verify the information you have entered!!
            </div>
        </b-container>
        
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            icon1: 'eye',
            icon2: 'eye',
            form: {
                profilePhoto: {
                    content: '',
                    type: false,
                    valid: false
                },
                firstName: {
                    content: '',
                    message: '',
                    invalid: false,
                    valid: false
                },
                lastName: {
                    content: '',
                    message: '',
                    invalid: false,
                    valid: false 
                },
                age: {
                    value: 0,
                    message: '',
                    invalid: false,
                    valid: false
                },
                email: {
                    content: '',
                    message: '',
                   invalid: false,
                    valid: false 
                },
                username: {
                    content: '',
                    message: '',
                   invalid: false,
                    valid: false 
                },
                password: {
                    content: '',
                    message: '',
                    invalid: false,
                    valid: false 
                },
                pwdCheck: {
                    content: '',
                    message: '',
                    invalid: false,
                    valid: false 
                }
                
            },
           defaultProfilePhoto: require('@/assets/default-user-image.png')
           
        }
    },
    methods:{
        togglePassword() {
            var show = document.getElementById('password');
            
            if(show.type === 'password') {
                show.type = 'text';
                this.icon1 = 'eye-slash';
               
            }else {
                show.type = 'password';
                this.icon1 = 'eye';
                
            }
        },
        togglePwdCheck() {
            var show = document.getElementById('pwdCheck');
            
            if(show.type === 'password') {
                show.type = 'text';
                this.icon2 = 'eye-slash';
            }else {
                show.type = 'password';
                this.icon2 = 'eye';
            }
        },
        validateImage(event) {
            
            this.form.profilePhoto.content = event.target.files[0];
           
            let regex = /image\/jpeg|image\/jpg|image\/png|image\/gif/;

            if (!regex.test(this.form.profilePhoto.content.type)) {
                this.form.profilePhoto.type = true;
                document.getElementById('profilePhoto').value = null;
                document.getElementById('profilePhoto').style.borderColor = "#dc3545";
            }else {
                this.form.profilePhoto.type = false;
                this.form.profilePhoto.valid = true;
                document.getElementById('profilePhoto').style.border = "2px solid green";
            }

        },
        validateFirstName() {
            let regex = /^[a-zA-Z]+$/i;
            let firstName = this.form.firstName.content;
            
            if(firstName === '' || firstName === null) {

                this.form.firstName.invalid = true;
                this.form.firstName.message = 'Your first name is Required!!'
                this.form.firstName.valid = false;

            }else if(firstName.length < 2) {

                this.form.firstName.invalid = true;
                this.form.firstName.message = 'Your first name must have at least 2 characters';
                this.form.firstName.valid = false;

            }else if(!regex.test(firstName)) {

                this.form.firstName.invalid = true;
                this.form.firstName.message = 'Your first name can only contain letter characters';
                this.form.firstName.valid = false;

            }else {

                this.form.firstName.valid = true;
                this.form.firstName.invalid = false;
                this.form.firstName.message = '';

            }
        },
        validateLastName() {
            let regex = /^[a-zA-Z]+$/i;
            let lastName = this.form.lastName.content;
            
            if(lastName === '' || lastName === null) {

                this.form.lastName.invalid = true;
                this.form.lastName.message = 'Your last name is Required!!'
                this.form.lastName.valid = false;

            }else if(lastName.length < 2) {

                this.form.lastName.invalid = true;
                this.form.lastName.message = 'Your last name must have at least 2 characters';
                this.form.lastName.valid = false;

            }else if(!regex.test(lastName)) {

                this.form.lastName.invalid = true;
                this.form.lastName.message = 'Your last name can only contain letter characters';
                this.form.lastName.valid = false;

            }else {

                this.form.lastName.valid = true;
                this.form.lastName.invalid = false;
                this.form.lastName.message = '';

            }
        },
        validateAge() {
            let age = this.form.age.value;
            
            if(age < 18) {

                this.form.age.invalid = true;
                this.form.age.message = 'You must be 18 or older!!'
                this.form.age.valid = false;

            }else {

                this.form.age.valid = true;
                this.form.age.invalid = false;
                this.form.lastName.message = '';

            }
        },
        async validateEmail() {
            let regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
            let email = this.form.email.content;
            
            const emailValidator = await axios.get('http://localhost:3000/auth/verifyEmail');
            let emailList = emailValidator.data;

            if(email === '' || email === null) {

                this.form.email.invalid = true;
                this.form.email.message = 'Your email is Required!!'
                this.form.email.valid = false;

            }else if(!regex.test(email)) {

                this.form.email.invalid = true;
                this.form.email.message = 'This is not a correct email format';
                this.form.email.valid = false;

            }else if (emailList.includes(email)) {

                this.form.email.invalid = true;
                this.form.email.message = 'This email is already used another User!!';
                this.form.email.valid = false;

            }else {
                
                this.form.email.valid = true;
                this.form.email.invalid = false;
                this.form.email.message = '';
            }

        },
        async validateUsername() {
            let regex = /^\S*$/;
            let username = this.form.username.content;
            
            const usernameValidator = await axios.get('http://localhost:3000/auth/verifyUsername');
            let usernameList = usernameValidator.data;

            if(username === '' || username === null) {

                this.form.username.invalid = true;
                this.form.username.message = 'Your username is Required!!'
                this.form.username.valid = false;

            }else if(username.length < 6) {

                this.form.username.invalid = true;
                this.form.username.message = 'Your username must be at least 6 characters';
                this.form.username.valid = false;

            }else if(!regex.test(username)) {

                this.form.username.invalid = true;
                this.form.username.message = 'Your username should not contain any spaces';
                this.form.username.valid = false;

            }else if (usernameList.includes(username)) {

                this.form.username.invalid = true;
                this.form.username.message = 'This username is already used another User!!';
                this.form.username.valid = false;

            }else {
                
                this.form.username.valid = true;
                this.form.username.invalid = false;
                this.form.username.message = '';
            }

        },
        validatePassword() {
            
            let password = this.form.password.content;
            
            if(password === '' || password === null) {

                this.form.password.invalid = true;
                this.form.password.message = 'Your new Password is Required!!'
                this.form.password.valid = false;

            }else if(password.length < 6) {

                this.form.password.invalid = true;
                this.form.password.message = 'Your password must be at least 6 characters';
                this.form.password.valid = false;

            }else {
                
                this.form.password.valid = true;
                this.form.password.invalid = false;
                this.form.password.message = '';
            }

        },
        validatePwdCheck() {
            
            let pwdCheck = this.form.pwdCheck.content;
            
            if(pwdCheck === '' || pwdCheck === null) {

                this.form.pwdCheck.invalid = true;
                this.form.pwdCheck.message = 'Please Confirm your Password!!'
                this.form.pwdCheck.valid = false;

            }else if(pwdCheck !== this.form.password.content) {

                this.form.pwdCheck.invalid = true;
                this.form.pwdCheck.message = 'The passwords do not Match!!';
                this.form.pwdCheck.valid = false;

            }else {
                
                this.form.pwdCheck.valid = true;
                this.form.pwdCheck.invalid = false;
                this.form.pwdCheck.message = '';
            }

        },        
        async onSubmit() {


            if(
                this.form.firstName.valid && this.form.lastName.valid && this.form.age.valid
                && this.form.email.valid && this.form.username.valid && this.form.password.valid
                && this.form.pwdCheck.valid
            ) {

                document.getElementById('validationError').style.display = 'none';
                const fd = new FormData();
                fd.append('image', this.form.profilePhoto.content);
                fd.append('first_name', this.form.firstName.content);
                fd.append('last_name', this.form.lastName.content);
                fd.append('age', this.form.age.value);
                fd.append('email', this.form.email.content);
                fd.append('username', this.form.username.content);
                fd.append('password', this.form.password.content);
           
                try {
                    const newUser = await axios.post('http://localhost:3000/user/newUser', fd);
                    this.form.firstName.content = '';
                    this.form.lastName.content = '';
                    this.form.age.value = 0;
                    this.form.email.content = '';
                    this.form.username.content = '';
                    this.form.password.content = '';
                    this.form.pwdCheck.content = '';
                    document.getElementById('profilePhoto').value = null;
                    document.getElementById('form').reset();
                    
                    
                    localStorage.setItem("token", newUser.data.token);
                    window.location.href = '#/posts';

                } catch (err) {
                    console.log(err);
                }
            }else {
                document.getElementById('validationError').style.display = 'block';

            }
            
        },
        onReset() {
            this.$router.go();
        }

    }
}

</script>
<style>

#signUp {
    padding: 15px;
}

label {
    text-align: left;
    font-weight: bold;
}

.form-control {
    border: 1px solid #bbb;
}

.btn {
    margin: 0 1rem 0 1rem;
}

small {
    display: block;
    text-align: left;
}

</style>
<style scoped>
input {
    height: 50px;
}

.input-group-text {
    background-color: transparent;
    border: none;
}

#validationError {
    background-color: #ffb6c1;
    border: 1px solid pink; 
    border-radius: 5px;
    padding: 25px;
    width: 75%;
    margin: 25px auto;
    text-align: center;
    font-weight: bold;
    display: none;
}

</style>