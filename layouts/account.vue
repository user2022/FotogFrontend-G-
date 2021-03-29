<template>
    <div>
        <nav-main />
        <div class="main-contain">
            <div class="wrap my-container-navIn">
                <Nuxt/>
            </div>
        </div>
    </div>
</template>

<script>
    import NavMain from "../components/nav/nav-main";
    export default {
        components: {NavMain},
        computed: {
            nav() {
                return this.$store.state.hideNav;
            },
        },
    }
</script>

<style>
    @import "https://kit-pro.fontawesome.com/releases/v5.15.1/css/pro.min.css";

    html, body {
        background-color: #F3F5F6;
        font-family: "Roboto", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
    }

    .main-contain {
        display: flex;
        flex-direction: row;
    }

    .wrap {
        padding-top: 100px;
        width: 100%;
    }

    hr {
        margin: 12px 0;
    }

    p, h1, h2, h3, h4 {
        margin-bottom: 0;
        color: #47494E;
    }

    .url:hover {
        text-decoration: underline;
    }

    .smaller {
        font-size: 12px;
    }

    .bold {
        font-weight: 700;
    }



    .my-container-navIn {
        margin: 0 180px 35px 200px;
    }

    .my-container-navOut {
        margin: 0 180px 35px 380px;
    }

    /* 1440px */

    @media only screen and (max-width: 1440px) {
        .my-container-navIn {
            margin: 0 110px 35px 110px;
        }

        .my-container-navOut {
            margin: 0 110px 35px 330px;
        }
    }


</style>

