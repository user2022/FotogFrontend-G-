<template>
    <main>
        <div class="page-contain-center">
            <div class="form-contain">
                <div class="form-head">
                    <h3>Login</h3>
                </div>
                <div class="form-main">
                    <div class="input-container">
                        <input type="text" placeholder="Username" class="my-input" v-model.trim="username">
                    </div>
                    <div class="input-container">
                        <input type="password" placeholder="Password" class="my-input" v-model.trim="password">
                    </div>
                </div>
                <div class="form-footer">
                    <hr>
                    <div class="input-container input-checkbox-cont">
                        <input type="checkbox" value="terms" class="my-checkbox">
                        <p class="checkbox-label">Remember me</p>
                    </div>
                    <button class="my-btn my-btn-primary my-btn-fill" @click="onLogin">LOG IN</button>
                    <div class="bottom-info">
                        <p class="form-info-text">Forgot Password? <NuxtLink to="/">Click here</NuxtLink></p>
                        <p class="form-info-text">Click <NuxtLink to="/register">here</NuxtLink> to register</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
    export default {
        name: "login",
        middleware: 'auth',
        auth: 'guest', // guest = only loggedIn: false, can access this page
        data() {
          return {
              username: '',
              password: ''
          }
        },
        methods: {
            async onLogin() {
                try {
                    let response = await this.$auth.loginWith("local", {
                        data: {
                            email: this.username,
                            password: this.password
                        }
                    });

                    console.log(response);

                    await this.$router.push("/");
                } catch(err) {
                    console.log(err);
                }
            }
        }
    }
</script>

<style scoped>

</style>
