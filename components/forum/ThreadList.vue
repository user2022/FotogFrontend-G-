<template>
    <main>
        <template v-if="threads && threads.length > 0">
            <table class="my-table">
                <tr>
                    <th>Topic</th>
                    <th>Latest</th>
                    <th class="text-center">Posts</th>
                    <th class="text-center">Views</th>
                </tr>
                <tr v-for="thread in threads">
                    <td>
                        <div class="user-flex">
                            <div>
                                <img class="avatar-x-small" :src="thread.user.profileImg" :alt="thread.user.username">
                            </div>
                            <div>
                                <p><span class="my-url"><NuxtLink :to="`/forums/thread/${thread.id}`">{{ thread.title }}</NuxtLink></span></p>
                                <p class="smaller">
                                    <NuxtLink :to="`/profile/${thread.user.username}`" class="my-url">{{thread.user.username}}</NuxtLink>
                                    <span class="date date-small">{{ $moment(thread.created_at).fromNow() }} in
                                        <span style="font-style: normal">{{thread.topic.name}}</span>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="user-flex" v-if="thread.latest_post">
                            <img class="avatar-x-small" :src="thread.latest_post.user.profileImg" :alt="thread.latest_post.user.username">
                            <div>
                                <p><NuxtLink :to="`/profile/${thread.latest_post.user.username}`" class="my-url">{{thread.latest_post.user.username}}</NuxtLink></p>
                                <p class="smaller"><span class="date date-small">{{ $moment(thread.latest_post.created_at).fromNow() }} </span></p>
                            </div>
                        </div>
                        <div v-else>
                            <p class="no-submit">No posts submitted yet!</p>
                        </div>
                    </td>
                    <td class="text-center bold">{{thread.posts.length}}</td>
                    <td class="text-center bold">{{thread.views}}</td>
                </tr>
            </table>
        </template>
        <template v-else-if="threads === null || threads === undefined || threads.length === 0">
            <p class="text-center">Be the first to create a thread in this section by clicking <NuxtLink class="my-url" to="/forums/create"><span>here</span></NuxtLink></p>
        </template>

    </main>
</template>

<script>
    export default {
        name: "ThreadList",
        props: ['threads']
    }
</script>

<style scoped>
  main {
    margin-left: 1rem;
    width: 100%;
  }

  .my-btn {
      margin-top: .5rem;
      margin-left: .9rem;
  }

  /* Table */

  @media only screen and (max-width: 440px) {
      main {
          margin-left: 0;
      }
  }


  /*  forum-lists.css */
</style>
