<template>
    <div>
        <upload-profile v-if="showUpload"/>
        <nav-main />
        <div class="main-contain">
            <nav-side/>
            <div class="wrap" :class="{'my-container-navOut': !nav, 'my-container-navIn': nav}">
                <Nuxt keep-alive :keep-alive-props="{ max: 10, exclude: ['upload', 'user-settings', 'create', 'forum-editor'] }" />
                <!-- keep alive will store at max 10 components/pages data in memory so it doesn't have to reload them on each visit -->
            </div>
        </div>
    </div>
</template>

<script>
  import NavMain from "../components/nav/nav-main";
  import NavSide from "../components/nav/nav-side";
  import UploadProfile from "../components/main/upload-profile";
  export default {
    components: {UploadProfile, NavMain, NavSide},
    computed: {
      nav() {
        return this.$store.state.hideNav;
      },
      showUpload() {
        return this.$store.getters['account/getShowUpload'];
      }
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
      margin: 0 110px 35px 130px;
    }

    .my-container-navOut {
      margin: 0 110px 35px 330px;
    }
  }

  @media only screen and (max-width: 440px) {
      .my-container-navIn {
          margin: 0 25px 15px 25px;
      }

      .my-container-navOut {
          margin: 0 25px 15px 25px;
      }

      .wrap {
        padding-top: 64px;
      }
  }


</style>

