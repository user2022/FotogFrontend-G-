<template>
  <main>
    <div class="main">
      <div class="logo">
        <i class="fas fa-bars sIcon" @click="hideNav" v-if="$route.path !== '/'"></i>
        <p class="logo-text">fotog.</p>
      </div>

      <div class="search searchBarTemp">
        <input type="text" class="inputBox" placeholder="Search Images">
        <i class="far fa-search"></i>
      </div>

      <template v-if="!$auth.loggedIn">
        <NuxtLink to="/register" class="my-btn my-btn-secondary">Create Account</NuxtLink>
        <NuxtLink to="/login" class="my-btn my-btn-secondary">Sign In</NuxtLink>
      </template>
      <template v-else>
        <NuxtLink to="/"><img class="avatar-x-small" :src="$auth.user.profileImg"/></NuxtLink>
        <div class="flex-row">
          <div class="nav-icons">
            <NuxtLink :to="`/profile/${$auth.user.username}`">
                <div class="n-icon" v-b-tooltip.bottom="'Profile'">
                    <i class="fas fa-user"></i>
                </div>
            </NuxtLink>
            <NuxtLink to="/account/settings">
              <div class="n-icon" v-b-tooltip.bottom="'Settings'">
                <i class="fas fa-cog"></i>
              </div>
            </NuxtLink>
              <NuxtLink to="/admin" v-if="$auth.user.role.power >= 10">
                  <div class="n-icon" v-b-tooltip.bottom="'Admin Panel'">
                      <i class="fad fa-shield"></i>
                  </div>
              </NuxtLink>
            <div class="n-icon" @click="onLogout" v-b-tooltip.bottom="'Logout'">
              <i class="fas fa-sign-out-alt"></i>
            </div>

          </div>
        </div>

      </template>

    </div>
  </main>
</template>

<script>
    export default {
      name: "nav-main",
      methods: {
        hideNav() {
          this.$store.dispatch('hideSideNav', !this.$store.getters['getNav']);
        },
        async onLogout() {
          await this.$auth.logout();
        },
      },
    }
</script>

<style scoped>
  .main {
    background: rgb(17,33,60);
    background: radial-gradient(circle, rgba(17,33,60,1) 0%, rgba(31,57,91,1) 100%);
    display: flex;
    flex-direction: row;
    height: auto;
    border-bottom: 1px solid #36455C;
    position: fixed;
    width: 100%;

    align-items: center;

    z-index: 999;
  }

  .main h3 {
    margin: 0;
  }

  .main button {
    margin-right: 1.2rem;
  }

  .logo {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 40px 0 20px;
    background-color: #1B3151;
    color: white;
    width: 240px;
    border-right: 1px solid #36455C;
  }

  .logo p {
    margin: 0 5px;
    color: white;
  }

  .logo-text {
    font-family: "Raleway", sans-serif;
    font-size: 40px;
    font-weight: 700;
  }

  .searchBarTemp {
    padding: 10px 17px;
    background-color: #F5F5F5;
    border-radius: 3px;
    align-self: center;
    max-height: 40px;
    width: 500px;
    margin: 0 17rem;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .sIcon {
    align-self: center;
    color: white;
    margin-right: 15px;
    cursor: pointer;
  }

  .inputBox {
    /*  base styles*/
    border:none;
    background-image:none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    background-color: transparent;

    width: 80%;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    font-weight: 600;

    color: #47494E;
  }

  .inputBox:active {
    border:none;
    background-image:none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    background-color: transparent;
  }

  .inputBox:focus {
    outline: none;
  }

  .searchBarTemp p {
    margin: 0;
  }

  .search {
    align-self: center;
  }

  button {
    white-space: nowrap;
  }

  .username {
    margin-right: .3rem;
    color: white;
    font-weight: 600;
  }

  .dropdown-btn {
    color: white;
    font-size: 10px;
    margin-top: .1rem;
  }

  .flex-row {
    align-items: center;
    margin-left: .2rem;
  }

  .nav-icons {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .n-icon {
    color: white;
    margin-left: .5rem;
    padding: .1rem .3rem;
    font-size: 13px;
    cursor: pointer;
  }

  .tooltip {
    margin-top: .5rem;
  }

  .tooltip-inner {

  }

  @media only screen and (max-width: 1440px) {
      .searchBarTemp {
         margin: 0 7rem;
      }
  }

  @media only screen and (max-width: 440px) {
      .logo-text {
          display: none;
      }

      .logo {
          padding: 12px 10px 12px 10px;
          height: 100%;
          width: auto;
      }

      .sIcon {
          margin-right: 0;
          font-size: 22px;
      }

      .searchBarTemp {
          margin: 6px .4rem;
          padding: 5px 12px;
          width: auto;
      }

      .avatar-x-small {
          display: none;
      }

      .n-icon {
          margin-left: .2rem;
      }

      .nav-icons a:last-child {
          margin-right: .3rem;
      }
  }

</style>
