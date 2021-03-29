<template>
  <main>
    <div class="f-header">
        <p class="forum-header">Forums</p>
        <p class="lead">Socialize with like-minded people</p>
    </div>
    <hr>

      <div>
          <div class="cur-browse">
              <p style="font-weight: bold">Currently browsing</p>
              <i class="fas fa-long-arrow-alt-right"></i>
              <p v-if="loading">...</p>
              <p v-if="!$route.query.topic && !this.loading">Latest Submissions</p>
              <p v-else-if="$route.query.topic && !this.loading">{{details.name}}</p>
          </div>
      </div>

    <div class="forum-row">
      <div>
          <p class="topic-list-p" :class="{'topic-list-active': !$route.query.topic}" @click="whatsNew">What's New</p>
          <ForumNav :nav="nav" @topic-change="changeTopic"/>
      </div>
        <div style="width: 100%" v-if="!loading">
            <ThreadList :threads="threads" />
            <div class="sep-button-flex">
                <div></div>
                <NuxtLink to="/forums/create"><button class="my-btn my-btn-primary">Create Thread</button></NuxtLink>
            </div>
        </div>
        <div v-else style="width: 100%">
            <loader/>
        </div>
    </div>

  </main>
</template>

<script>
  // https://i.imgur.com/MKKunCx.png https://i.imgur.com/5YNSyfm.png
  import ForumNav from "../../components/forum/ForumNav";
  import ThreadList from "../../components/forum/ThreadList";
  export default {
      name: "Forums",
      components: {ThreadList, ForumNav},
      data() {
          return {
              topic: [],
              loading: false,
          }
      },
      methods: {
          // Selecting a new topic and displays the list of threads for that topic
          async changeTopic(value) {
              try {
                  this.loading = true;
                  await this.$store.dispatch('forum/getTopic', {id: value});
                  this.loading = false;
              } catch(err) {
                  console.log(err);
              }
          },
          // Shows all threads sorted by most recent - default topic
          async whatsNew() {
              try {
                  this.loading = true;
                  await this.$store.dispatch('forum/getNewThreads');
                  await this.$router.push({query: {}});
                  this.loading = false;
              } catch(err) {
                  console.log(err);
              }
          }
      },
      computed: {
          nav() {
              return this.$store.getters['forum/allCategories'];
          },
          threads() {
              return this.$store.getters['forum/getThreads'];
          },
          details() {
              return this.$store.getters['forum/getTopicDetails'];
          }
      },
      async asyncData({store, error, route}) {
          await store.dispatch('forum/getNav', {error: error});
          if (route.query.topic) {
              await store.dispatch('forum/getTopic', {id: route.query.topic})
          } else {
              await store.dispatch('forum/getNewThreads');
          }
      }
  }
</script>

<style scoped>
    .my-btn {
        margin-top: .5rem;
        margin-left: .9rem;
    }

    .cur-browse {
        align-items: center;
        display: flex;
        flex-direction: row;
    }



    .cur-browse p, i {
        margin-right: .4rem;
    }

    .topic-list-p {
        margin-left: .8rem;
    }

    .sep-button-flex {
        margin-top: .3rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .sep-button-flex .my-btn {
        margin-right: -10px;
    }
</style>
