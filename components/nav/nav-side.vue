<template>
  <main :class="{'mobileNav': nav}">
    <div class="side" :class="{'sideWid': nav}">
      <div class="nav-bar">
        <div class="filler-block"></div>

          <div class="block mobile-block">
              <p class="logo-text">fotog.</p>
          </div>

        <div class="block">
          <div class="inner-block">
            <i class="fad fa-chevron-double-up iSpecial"></i>
            <p v-if="!nav">Upgrade</p>
          </div>
        </div>

        <div class="block">
          <NuxtLink to="/">
            <div class="inner-block">
              <i class="far fa-home-lg-alt"></i>
              <p v-if="!nav">Home</p>
            </div>
          </NuxtLink>
            <NuxtLink to="/explore" active-class="active">
                <div class="inner-block">
                    <i class="far fa-map-marked-alt"></i>
                    <p v-if="!nav">Explore</p>
                </div>
            </NuxtLink>
          <NuxtLink to="/forums" class="wrapper-link" active-class="active">
            <div class="inner-block">
              <i class="far fa-comments-alt"></i>
              <p v-if="!nav">Forums</p>
            </div>
          </NuxtLink>
          <NuxtLink to="/upload">
            <div class="inner-block">
              <i class="far fa-upload"></i>
              <p v-if="!nav">Upload</p>
            </div>
          </NuxtLink>
        </div>

        <div class="block" v-if="$auth.loggedIn">
          <NuxtLink :to="`/profile/${$auth.user.username}`"  active-class="active">
            <div class="inner-block">
              <i class="far fa-user-circle"></i>
              <p v-if="!nav">Profile</p>
            </div>
          </NuxtLink>
        </div>

          <div class="footer-block" v-if="!nav">
              <div class="f-inner-block">
                  <div class="urls">
                      <span>Terms of Service</span>, <span>Contact Us</span>
                  </div>
                  <div class="nav-socials">
                      <i class="fab fa-facebook-square"></i>
                      <i class="fab fa-twitter"></i>
                  </div>
              </div>
          </div>

      </div>

    </div>
  </main>
</template>

<script>
  export default {
    name: "navbar",
    computed: {
      nav() {
        return this.$store.state.hideNav;
      }
    }
  }
</script>

<style scoped>

    .footer-block {
        margin-top: 2rem;

    }

    .f-inner-block {
        padding: 8px 25px 8px 25px;
        color: #cad1e7;
        width: 100%;
        text-align: center;
    }



    .urls {
        color: #a7afc8;
        font-size: 12px;
    }

    .nav-socials {
        margin-top: .7rem;
        text-align: center;
    }

    .nav-socials i {
        font-size: 16px;
        margin-right: .6rem;
    }

  a.nuxt-link-exact-active .inner-block p {
    color: white;
  }

  a.nuxt-link-exact-active .inner-block i {
    color: #2D7EB6;
  }

  .active .inner-block p {
    color: white;
  }

  .active .inner-block i {
    color: #2D7EB6;
  }

  .side {
    background-color: #1B3151;
    border-right: 1px solid #36455C;
    height: 100%;
    position: fixed;

    z-index: 998;
  }

  .sideWid {
    width: 70px;
  }

  .filler-block {
    height: 60px;
    width: 240px;
  }

  .block {
    height: auto;
    color: white;
    border-bottom: 1px solid #36455C;
    padding-top: 8px;
    padding-bottom: 8px;
  }

  .inner-block {
    padding: 8px 25px 8px 25px;
    display: flex;
    flex-direction: row;
    align-items: center;

    cursor: pointer;
  }


  .inner-block i {
    font-size: 12px;
    margin-right: 1.8rem;
    color: #a7afc8;
    padding: 5px 0;
  }

  .inner-block p {
    font-family: "Roboto", sans-serif;
    font-size: 15px;
    color: #a7afc8;
    font-weight: 600;
  }

  .inner-block:hover p {
    color: white;
  }

  .inner-block:hover i {
    color: #2D7EB6;
  }

  .iSpecial {
    color: #F2C961 !important;
  }

  .mobile-block {
      display: none;
  }

  /* 1440px res */
  @media only screen and (max-width: 1440px) {
      .filler-block {
          width: 222px;
      }
  }

  /* 440px res  */
  @media only screen and (max-width: 440px) {
      .mobileNav {
          display: none;
      }

      .inner-block i {
          font-size: 16px;
          padding: 8px 0;
      }

      .inner-block p {
          font-size: 20px;
      }

      .filler-block {
          height: 40px;

      }

      .mobile-block {
          display: block;
      }

      .logo-text {
          font-family: "Raleway", sans-serif;
          font-size: 32px;
          font-weight: 700;
          color: white;
          margin-left: 2rem;
      }
  }
</style>
