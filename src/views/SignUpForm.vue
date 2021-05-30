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
                        @change="upload"
                        >
                        </b-form-file>
                        
                    </b-input-group>
                    <span v-if="profilePhoto === null"></span>
                    <span v-else-if="invalidFile" style="color: #dc3545;">Only Image Files Are Allowed(jpeg, jpg, png, gif)</span>
                    <span v-else style="color: #28a745;">File is Valid</span>
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
                        v-model.trim="$v.form.firstName.$model"
                        :class="{'is-invalid':$v.form.firstName.$error, 'is-valid':!$v.form.firstName.$invalid }"
                        required
                        >
                    
                        </b-form-input>
                        <div class="valid-feedback">Your First Name is valid</div>
                        <div class="invalid-feedback">
                            <span v-if="!$v.form.firstName.required">First name is required</span>
                            <span v-if="!$v.form.firstName.minLength">First name must have at least {{ $v.form.firstName.$params.minLength.min }} letters.</span>
                            <span v-if="!$v.form.firstName.maxLength">First Name must have at most {{ $v.form.firstName.$params.maxLength.max }} letters.</span>
                            <span v-if="!$v.form.firstName.nameValidator">First Name can only contain letter characters.</span>
                        </div>

                    </b-input-group>
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
                        v-model.trim="$v.form.lastName.$model"
                        :class="{'is-invalid':$v.form.lastName.$error, 'is-valid':!$v.form.lastName.$invalid }"
                        required
                        >
                        </b-form-input>
                        <div class="valid-feedback">Your Last Name is valid</div>
                        <div class="invalid-feedback">
                            <span v-if="!$v.form.lastName.required">Last name is required</span>
                            <span v-if="!$v.form.lastName.minLength">Last name must have at least {{ $v.form.lastName.$params.minLength.min }} letters.</span>
                            <span v-if="!$v.form.lastName.maxLength">Last Name must have at most {{ $v.form.lastName.$params.maxLength.max }} letters.</span>
                        </div>
                        
                    </b-input-group>
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
                        v-model.number.lazy="$v.form.age.$model"
                        :class="{'is-invalid':$v.form.age.$error, 'is-valid':!$v.form.age.$invalid }"
                        required
                        >
                        </b-form-input>
                        <div class="valid-feedback">Your age is valid</div>
                        <div class="invalid-feedback">
                            <span v-if="!$v.form.age.between">Age must be between {{ $v.form.age.$params.between.min }} and {{$v.form.age.$params.between.max }}</span>
                            
                        </div>
                        
                    </b-input-group>
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
                        v-model.trim="$v.form.email.$model"
                        :class="{'is-invalid':$v.form.email.$error, 'is-valid':!$v.form.email.$invalid }"
                        required
                        >
                        </b-form-input>
                        <div class="valid-feedback">Your email is valid</div>
                        <div class="invalid-feedback">
                            <span v-if="!$v.form.email.required">Email is required</span>
                            <span v-if="!$v.form.email.email">This is not the correct email format</span>
                            <span v-if="!$v.form.email.isUnique">This email is already used by another user</span>
                        </div>
                        
                    </b-input-group>
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
                        v-model.trim="$v.form.username.$model"
                        :class="{'is-invalid':$v.form.username.$error, 'is-valid':!$v.form.username.$invalid }"
                        required
                        >
                        </b-form-input>
                        <div class="valid-feedback">Your username is valid</div>
                        <div class="invalid-feedback">
                            <span v-if="!$v.form.username.required">username is required</span>
                            <span v-if="!$v.form.username.isUnique">username is already used by another user</span>
                            <span v-if="!$v.form.username.minLength">username must have at least {{ $v.form.username.$params.minLength.min }} letters.</span>
                        </div>
                       
                    </b-input-group>
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
                        v-model.trim="$v.form.password.$model"
                        :class="{'is-invalid':$v.form.password.$error, 'is-valid':!$v.form.password.$invalid }"
                        required
                        >
                        </b-form-input>
                        <b-input-group-prepend is-text>
                            <b-button @click="togglePassword()" variant="light" size="sm"><b-icon id="toggle" :icon="this.icon1" font-scale="1"></b-icon></b-button>
                        </b-input-group-prepend>
                        
                        <div class="valid-feedback">Your password is valid</div>
                        <div class="invalid-feedback">
                            <span v-if="!$v.form.password.required">Password is required</span>
                            <span v-if="!$v.form.password.minLength">Password must have at least {{ $v.form.password.$params.minLength.min }} letters.</span>
                        </div>
                        
                    </b-input-group>
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
                        v-model.trim="$v.form.passwordCheck.$model"
                        :class="{'is-invalid':$v.form.passwordCheck.$error, 'is-valid': (form.password != '') ? !$v.form.passwordCheck.$invalid : '' }"
                        required
                        >
                        </b-form-input>
                        <b-input-group-prepend is-text>
                            <b-button @click="togglePwdCheck()" variant="light" size="sm"><b-icon id="toggle" :icon="this.icon2" font-scale="1"></b-icon></b-button>
                        </b-input-group-prepend>
                        <div class="valid-feedback">Your password is identical</div>
                        <div class="invalid-feedback">
                            <span v-if="!$v.form.passwordCheck.sameAsPassword">Password must be identical</span>
                        </div>
                        
                    </b-input-group>
                </b-form-group>
                <b-button type="submit" variant="success">Submit</b-button>
                <b-button type="reset" variant="danger" @click="onReset()">Reset</b-button>
            </b-form>
        </b-container>
        
    </div>
</template>

<script>
import axios from 'axios'
import { required, helpers,minLength, maxLength, between, sameAs } from 'vuelidate/lib/validators';
const nameValidator = helpers.regex('onlyText', /^[a-z]*$/i);
const email = helpers.regex('emailFormat', /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i);
export default {
    data() {
        return {
            icon1: 'eye',
            icon2: 'eye',
            form: {
                firstName: '',
                lastName: '',
                age: 0,
                email: '',
                username: '',
                password: '',
                passwordCheck: '',
                
            },
           profilePhoto: null,
           invalidFile: false
        }
    },
    validations: {
        form:{
            firstName: {
            required,
            nameValidator,
            minLength: minLength(3),
            maxLength: maxLength(20)
            },
            lastName: {
                required,
                nameValidator,
                minLength: minLength(3),
                maxLength: maxLength(20)
            },
            email: {
                required,
                email,
                async isUnique() {
                    const validator = await axios.get('http://localhost:3000/auth/verifyEmail');
                    let emailList = validator.data;

                    if(emailList.includes(this.form.email)) {
                        return false;
                    }else {
                        return true;
                    }

                }
                   
            },
            age: {
                between: between(18, 60)
            },
            username: {
                required,
                async isUnique() {
                    const validator = await axios.get('http://localhost:3000/auth/verifyUsername');
                    let usernameList = validator.data;

                    if(usernameList.includes(this.form.username)) {
                        return false;
                    }else {
                        return true;
                    }

                },
                minLength: minLength(5)
            },
            password: {
                required,
                minLength: minLength(6)
            },
            passwordCheck: {
                sameAsPassword: sameAs('password')
            }
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
        upload(event) {
            
            this.profilePhoto = event.target.files[0];
           
            let regex = /image\/jpeg|image\/jpg|image\/png|image\/gif/;

            if (!regex.test(this.profilePhoto.type)) {
                this.invalidFile = true;
                document.getElementById('profilePhoto').value = null;
                document.getElementById('profilePhoto').style.borderColor = "#dc3545";
            }else {
                this.invalidFile = false;
                document.getElementById('profilePhoto').style.border = "2px solid green";
            }

        },            
        async onSubmit() {
            const fd = new FormData();
            fd.append('image', this.profilePhoto);
            fd.append('first_name', this.form.firstName);
            fd.append('last_name', this.form.lastName);
            fd.append('age', this.form.age);
            fd.append('email', this.form.email);
            fd.append('username', this.form.username);
            fd.append('password', this.form.password);
            console.log(fd);
            try {
                const newUser = await axios.post('http://localhost:3000/user/newUser', fd);
                this.form.firstName = '';
                this.form.lastName = '';
                this.form.age = 0;
                this.form.email = '';
                this.form.username = '';
                this.form.password = '';
                this.form.passwordCheck = '';
                this.profilePhoto = null;
                this.invalidFile = false;
                document.getElementById('profilePhoto').value = null;
                document.getElementById('form').reset();
                
                
                localStorage.setItem("token", newUser.data.token);
                window.location.href = '#/posts';

            } catch (err) {
                console.log(err);
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
</style>