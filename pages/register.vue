<template>
    <main>
        <div class="page-contain-center">
            <div class="form-contain">
                <div class="form-head">
                    <h3>Create Account</h3>
                </div>
                <div class="form-main">
                    <div class="input-container">

                        <input
                                type="text"
                                @input="delayTouch($v.username)"
                                placeholder="Username"
                                class="my-input"
                                v-model.trim="username"
                                :class="{'form-danger': $v.username.$invalid && $v.username.$dirty, 'form-success': !$v.username.$invalid}"
                        />

                        <div class="form-error">
                            <p v-if="!$v.username.minLength && $v.username.$dirty" class="error-text">Your username must be atleast 6 characters long!</p>
                            <p v-if="!$v.username.required && $v.username.$dirty" class="error-text">This field is required</p>
                            <p v-if="!$v.username.maxLength && $v.username.$dirty" class="error-text">Your username can't be longer than 14 characters</p>
                        </div>
                    </div>

                    <div class="input-container">
                        <input
                                type="text"
                                placeholder="Email Address"
                                class="my-input"
                                v-model.trim="email"
                                @input="delayTouch($v.email)"
                                :class="{'form-danger': $v.email.$invalid && $v.email.$dirty, 'form-success': !$v.email.$invalid}"
                        />
                        <div class="form-error">
                            <p v-if="!$v.email.email && $v.email.$dirty" class="error-text">You have not entered an email address</p>
                            <p v-if="!$v.email.required && $v.email.$dirty" class="error-text">This field is required</p>
                        </div>
                    </div>

                    <div class="input-container">
                        <input
                                type="text"
                                placeholder="First Name"
                                class="my-input"
                                v-model.trim="firstName"
                                @input="delayTouch($v.firstName)"
                                :class="{'form-danger': $v.firstName.$invalid && $v.firstName.$dirty, 'form-success': !$v.firstName.$invalid}"
                        />
                        <div class="form-error">
                            <p v-if="!$v.firstName.required && $v.firstName.$dirty" class="error-text">This field is required</p>
                            <p v-if="!$v.firstName.minLength && $v.firstName.$dirty" class="error-text">Your first name must be at least 2 characters long!</p>
                            <p v-if="!$v.firstName.maxLength && $v.firstName.$dirty" class="error-text">
                                Your first name can't be longer than 20 characters, try using a nickname
                            </p>
                        </div>
                    </div>

                    <div class="input-container">
                        <input
                                type="text"
                                placeholder="Last Name"
                                class="my-input"
                                v-model.trim="lastName"
                                @input="delayTouch($v.lastName)"
                                :class="{'form-danger': $v.lastName.$invalid && $v.lastName.$dirty, 'form-success': !$v.lastName.$invalid}"
                        />
                        <div class="form-error">
                            <p v-if="!$v.lastName.required && $v.lastName.$dirty" class="error-text">This field is required</p>
                            <p v-if="!$v.lastName.minLength && $v.lastName.$dirty" class="error-text">Your last name must be at least 2 characters long!</p>
                            <p v-if="!$v.lastName.maxLength && $v.lastName.$dirty" class="error-text">
                                Your last name can't be longer than 20 characters, try using a shorter version
                            </p>
                        </div>
                    </div>

                    <hr>

                    <div class="input-container">
                        <input
                                type="password"
                                placeholder="Password"
                                class="my-input"
                                v-model.trim="password1"
                                @input="delayTouch($v.password1)"
                                :class="{'form-danger': $v.password1.$invalid && $v.password1.$dirty, 'form-success': !$v.password1.$invalid}"
                        />

                        <div class="form-error">
                            <p v-if="!$v.password1.strongPassword && $v.password1.$dirty" class="error-text">
                                Your password needs to contain a letter, a number, and special character
                            </p>
                            <p v-if="!$v.password1.required && $v.password1.$dirty" class="error-text">
                                This field is required
                            </p>
                            <p v-if="!$v.password1.minLength && $v.password1.$dirty" class="error-text">
                                Your password needs to be at least 8 characters long
                            </p>
                            <p v-if="!$v.password1.maxLength && $v.password1.$dirty" class="error-text">
                                Your password can't be above 30 characters
                            </p>
                        </div>
                    </div>

                    <div class="input-container">
                        <input
                                type="password"
                                placeholder="Confirm Password"
                                class="my-input"
                                v-model.trim="password2"
                                @input="delayTouch($v.password2)"
                                :class="{'form-danger': $v.password2.$invalid && $v.password2.$dirty, 'form-success': !$v.password2.$invalid}"
                        />
                        <div class="form-error">
                            <p v-if="!$v.password2.sameAsPassword && $v.password2.$dirty" class="error-text">
                                Passwords do not match
                            </p>
                            <p v-if="!$v.password2.required && $v.password2.$dirty" class="error-text">
                                This field is required
                            </p>
                        </div>
                    </div>

                </div>
                <div class="form-footer">
                    <hr>
                    <div class="input-container input-checkbox-cont">
                        <input type="checkbox" value="terms" class="my-checkbox">
                        <p class="checkbox-label">I agree to the terms of service</p>
                    </div>
                    <button class="my-btn my-btn-primary my-btn-fill" @click="onRegister">SIGN UP</button>
                    <p style="margin-top: .3rem" class="error-text" v-if="err" v-text="errTxt"></p>
                    <div class="bottom-info">
                        <p class="form-info-text">Have an account already? <NuxtLink to="/login">Login here</NuxtLink></p>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
    // https://css-tricks.com/form-validation-in-under-an-hour-with-vuelidate/
   import {required, minLength, maxLength, email, sameAs} from 'vuelidate/lib/validators'

   const touchMap = new WeakMap() // for delayTouch method

    export default {
        name: "register-page",
        middleware: 'auth',
        auth: 'guest', // guest = only loggedIn: false, can access this page
        data() {
          return {
              username: '',
              email: '',
              firstName: '',
              lastName: '',
              password1: '',
              password2: '',

              errTxt: '',
              err: false,
          }
        },
        methods: {
            // Lazy sync for validation
            delayTouch($v) {
                $v.$reset()
                if (touchMap.has($v)) {
                    clearTimeout(touchMap.get($v))
                }
                touchMap.set($v, setTimeout($v.$touch, 500))
            },
            // Sign up
            async onRegister() {
                try {
                    // anyError will check for any errors in the inputs // anyDirty will check if the form has been touched
                    if (this.$v.$anyError || !this.$v.$anyDirty) { // If the form has any errors or hasn't been touched set error to true
                        console.log('error: ' + this.$v.$anyError);
                        console.log('dirty:' + this.$v.$anyDirty);

                        this.errTxt = 'You have not filled out the form correctly.';
                        this.err = true;
                    } else {
                        this.err = false;

                        let data = {
                            username: this.username,
                            email: this.email,
                            firstName: this.firstName,
                            lastName: this.lastName,
                            password: this.password1
                        }


                        await this.$axios.$post('/api/auth/signup', data);

                        await this.$auth.loginWith("local", {
                            data: {
                                email: this.email,
                                password: this.password1
                            }
                        });

                        await this.$router.push("/");
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        },
        validations: {
            username: {
                required,
                minLength: minLength(6),
                maxLength: maxLength(14)
            },
            email: {
                required,
                email
            },
            firstName: {
                required,
                minLength: minLength(2),
                maxLength: maxLength(20)
            },
            lastName: {
                required,
                minLength: minLength(2),
                maxLength: maxLength(20)
            },
            password1: {
                required,
                strongPassword(password1) {
                    return (
                        /[a-z]/.test(password1) && // checks for a-z
                        /[0-9]/.test(password1) && // checks for 0-9
                        /\W|_/.test(password1) && // checks for special char
                        password1.length >= 6
                    )
                },
                minLength: minLength(6),
                maxLength: maxLength(30)
            },
            password2: {
                required,
                sameAsPassword: sameAs("password1")
            }
        }
    }
</script>

<style scoped>
    main {
        width: 100%;
    }

</style>
