<template>
    <div>
        <b-container style="width: 50%;">
            <b-form id="form">
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
                        v-model.trim="$v.firstName.$model"
                        :class="{'is-invalid':$v.firstName.$error, 'is-valid':!$v.firstName.$invalid }"
                        required
                        >
                    
                        </b-form-input>
                        <div class="valid-feedback">Your First Name is valid</div>
                        <div class="invalid-feedback">
                            <span v-if="!$v.firstName.required">First name is required</span>
                            <span v-if="!$v.firstName.minLength">First name must have at least {{ $v.firstName.$params.minLength.min }} letters.</span>
                            <span v-if="!$v.firstName.maxLength">First Name must have at most {{ $v.firstName.$params.maxLength.max }} letters.</span>
                        </div>

                        <!--<b-input-group-prepend is-text>
                            <b-icon class="icon" icon="check-circle" font-scale="1.5"></b-icon>
                            <b-icon class="icon" icon="exclamation-circle" font-scale="1.5"></b-icon>
                        </b-input-group-prepend>-->
                        
                    </b-input-group>
                </b-form-group>

                <b-form-group
                id="userInput2"
                label="Last Name: "
                label-for="lName"
                >
                    <b-input-group size="sm" class="mb-2">
                        <b-form-input
                        id="lName"
                        type="text"
                        placeholder="For eg. Smith"
                        v-model.trim="$v.lastName.$model"
                        :class="{'is-invalid':$v.lastName.$error, 'is-valid':!$v.lastName.$invalid }"
                        required
                        >
                        </b-form-input>
                        <div class="valid-feedback">Your Last Name is valid</div>
                        <div class="invalid-feedback">
                            <span v-if="!$v.lastName.required">Last name is required</span>
                            <span v-if="!$v.lastName.minLength">Last name must have at least {{ $v.lastName.$params.minLength.min }} letters.</span>
                            <span v-if="!$v.lastName.maxLength">Last Name must have at most {{ $v.lastName.$params.maxLength.max }} letters.</span>
                        </div>
                        <!--<b-input-group-prepend is-text>
                            <b-icon class="icon" icon="check-circle" font-scale="1.5"></b-icon>
                            <b-icon class="icon" icon="exclamation-circle" font-scale="1.5"></b-icon>
                        </b-input-group-prepend>-->
                    </b-input-group>
                </b-form-group>
                <b-form-group
                id="userInput3"
                label="Age: "
                label-for="age"
                >
                    <b-input-group size="sm" class="mb-2">
                        <b-form-input
                        id="age"
                        type="number"
                        v-model.number.lazy="$v.age.$model"
                        :class="{'is-invalid':$v.age.$error, 'is-valid':!$v.age.$invalid }"
                        required
                        >
                        </b-form-input>
                        <div class="valid-feedback">Your age is valid</div>
                        <div class="invalid-feedback">
                            <span v-if="!$v.age.between">Age must be between {{ $v.age.$params.between.min }} and {{$v.age.$params.between.max }}</span>
                            
                        </div>
                        <!--<b-input-group-prepend is-text>
                            <b-icon class="icon" icon="check-circle" font-scale="1.5"></b-icon>
                            <b-icon class="icon" icon="exclamation-circle" font-scale="1.5"></b-icon>
                        </b-input-group-prepend>-->
                    </b-input-group>
                </b-form-group>
                <b-form-group
                id="userInput4"
                label="Email Address: "
                label-for="email"
                >
                    <b-input-group size="sm" class="mb-2">
                        <b-form-input
                        id="email"
                        type="email"
                        placeholder="For eg. xyz@mail.com"
                        v-model.trim="$v.email.$model"
                        :class="{'is-invalid':$v.email.$error, 'is-valid':!$v.email.$invalid }"
                        required
                        >
                        </b-form-input>
                        <div class="valid-feedback">Your email is valid</div>
                        <div class="invalid-feedback">
                            <span v-if="!$v.email.required">Email is required</span>
                            <span v-if="!$v.email.isUnique">This email is not valid or is already registered</span>
                        </div>
                        <!--<b-input-group-prepend is-text>
                            <b-icon class="icon" icon="check-circle" font-scale="1.5"></b-icon>
                            <b-icon class="icon" icon="exclamation-circle" font-scale="1.5"></b-icon>
                        </b-input-group-prepend>-->
                    </b-input-group>
                </b-form-group>
                <b-form-group
                id="userInput5"
                label="Username: "
                label-for="username"
                >
                    <b-input-group size="sm" class="mb-2">
                        <b-form-input
                        id="username"
                        type="text"
                        placeholder="Enter your new username"
                        v-model.trim="$v.username.$model"
                        :class="{'is-invalid':$v.username.$error, 'is-valid':!$v.username.$invalid }"
                        required
                        >
                        </b-form-input>
                        <div class="valid-feedback">Your username is valid</div>
                        <div class="invalid-feedback">
                            <span v-if="!$v.username.required">username is required</span>
                            <span v-if="!$v.username.isUnique">username is already used by another user</span>
                            <span v-if="!$v.username.minLength">username must have at least {{ $v.username.$params.minLength.min }} letters.</span>
                        </div>
                        <!--<b-input-group-prepend is-text>
                            <b-icon class="icon" icon="check-circle" font-scale="1.5"></b-icon>
                            <b-icon class="icon" icon="exclamation-circle" font-scale="1.5"></b-icon>
                        </b-input-group-prepend>-->
                    </b-input-group>
                </b-form-group>
                <b-form-group
                id="userInput6"
                label="Password: "
                label-for="password"
                >
                    <b-input-group size="sm" class="mb-2">
                        <b-form-input
                        id="password"
                        type="password"
                        v-model.trim="$v.password.$model"
                        :class="{'is-invalid':$v.password.$error, 'is-valid':!$v.password.$invalid }"
                        required
                        >
                        </b-form-input>
                        <b-input-group-prepend is-text>
                            <b-button @click="togglePassword()" variant="light" size="sm"><b-icon id="toggle" :icon="this.icon1" font-scale="1"></b-icon></b-button>
                        </b-input-group-prepend>
                        
                        <div class="valid-feedback">Your password is valid</div>
                        <div class="invalid-feedback">
                            <span v-if="!$v.password.required">Password is required</span>
                            <span v-if="!$v.password.minLength">Password must have at least {{ $v.password.$params.minLength.min }} letters.</span>
                        </div>
                        <!--<b-input-group-prepend is-text>
                            <b-icon class="icon" icon="check-circle" font-scale="1.5"></b-icon>
                            <b-icon class="icon" icon="exclamation-circle" font-scale="1.5"></b-icon>
                        </b-input-group-prepend>-->
                    </b-input-group>
                </b-form-group>
                <b-form-group
                id="userInput7"
                label="Confirm your Password: "
                label-for="pwdCheck"
                >
                    <b-input-group size="sm" class="mb-2">
                        <b-form-input
                        id="pwdCheck"
                        type="password"
                        v-model.trim="$v.passwordCheck.$model"
                        :class="{'is-invalid':$v.passwordCheck.$error, 'is-valid': (password != '') ? !$v.passwordCheck.$invalid : '' }"
                        required
                        >
                        </b-form-input>
                        <b-input-group-prepend is-text>
                            <b-button @click="togglePwdCheck()" variant="light" size="sm"><b-icon id="toggle" :icon="this.icon2" font-scale="1"></b-icon></b-button>
                        </b-input-group-prepend>
                        <div class="valid-feedback">Your password is identical</div>
                        <div class="invalid-feedback">
                            <span v-if="!$v.passwordCheck.sameAsPassword">Password must be identical</span>
                        </div>
                        <!--<b-input-group-prepend is-text>
                            <b-icon class="icon" icon="check-circle" font-scale="1.5"></b-icon>
                            <b-icon class="icon" icon="exclamation-circle" font-scale="1.5"></b-icon>
                        </b-input-group-prepend>-->
                    </b-input-group>
                </b-form-group>
                <b-button type="submit" variant="success">Submit</b-button>
                <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>
        </b-container>
        
    </div>
</template>

<script>
import { required, minLength, maxLength, between, email, sameAs } from 'vuelidate/lib/validators'
export default {
    data() {
        return {
            firstName: '',
            lastName: '',
            age: 0,
            email: '',
            username: '',
            password: '',
            passwordCheck: '',
            icon1: 'eye',
            icon2: 'eye'
        }
    },
    validations: {
        firstName: {
            required,
            minLength: minLength(3),
            maxLength: maxLength(10)
        },
        lastName: {
            required,
            minLength: minLength(3),
            maxLength: maxLength(20)
        },
        email: {
            required,
            email,
            isUnique(value) {
                if(value === '') {
                    return true
                }

                var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(regex.test(value))
                    }, 350 + Math.random() * 300)
                })
                
            }
        },
        age: {
            between: between(18, 60)
        },
        username: {
            required,
            isUnique(value) {
                if(value === '') {
                    return true
                }

                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(typeof value === 'string' && value.length % 2 !==0)
                    }, 350 + Math.random() * 300)
                })
                
            },
            minLength: minLength(5)
        },
        password: {
            required,
            minLength: minLength(8)
        },
        passwordCheck: {
            sameAsPassword: sameAs('password')
        }

    },
    methods: {
        togglePassword() {
            var show = document.getElementById('password');
            
            if(show.type === 'password') {
                show.type = 'text';
                this.icon1 = 'eye-slash';
                //toggleButton.setAttribute('icon', 'eye-slash') = 'Hide Password'
            }else {
                show.type = 'password';
                this.icon1 = 'eye';
                //toggleButton.setAttribute('icon', 'eye') = 'Show Password'
            }
        },
        togglePwdCheck() {
            var show = document.getElementById('pwdCheck');
            
            if(show.type === 'password') {
                show.type = 'text';
                this.icon2 = 'eye-slash';
                //toggleButton.setAttribute('icon', 'eye-slash') = 'Hide Password'
            }else {
                show.type = 'password';
                this.icon2 = 'eye';
                //toggleButton.setAttribute('icon', 'eye') = 'Show Password'
            }
        }

    }
}

</script>
<style>
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