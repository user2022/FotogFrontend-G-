<template>
    <div class="html">
        <div class="admin-layout">
            <admin-nav/>
            <div class="main-cont">
                <Nuxt/>
            </div>
        </div>
    </div>
</template>

<script>
import AdminNav from "../components/admin/admin-nav";
export default {
    name: "admin-layout",
    middleware: 'isAdmin', // Checks if the user is an admin
    components: {AdminNav},
}
</script>

<style scoped>
@import "https://kit-pro.fontawesome.com/releases/v5.15.1/css/pro.min.css";

html, body, main {
    background-color: #e2e2e2;
    font-family: "Roboto", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
}

.html {
    background-color: #e2e2e2;
    height: 100vh;
}

hr {
    margin: 12px 0;
}

p, h1, h2, h3, h4 {
    margin-bottom: 0;
    /*color: #47494E;*/
}

.smaller {
    font-size: 12px;
}

.bold {
    font-weight: 700;
}

.admin-layout {
    display: flex;
    flex-direction: row;
    background-color: #e2e2e2;
}

.main-cont {
    margin: 2rem 340px;
    background-color: #e2e2e2;
}

.a-header h1 {
    text-transform: uppercase;
    letter-spacing: 2px;
}


</style>
