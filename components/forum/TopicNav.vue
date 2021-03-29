<template>
  <main>
      <div class="flex-col">
          <p class="topic-lead">Other discussions in</p>
          <h2>{{ topic.name }}</h2>
          <div class="line"></div>
          <template v-if="topic.threads.length > 0">
              <div class="topic-list" v-for="thread in topic.threads">
                  <NuxtLink :to="`/forums/thread/${thread.id}`"><p class="topic-list-p">{{thread.title}}</p></NuxtLink>
              </div>
          </template>
          <template v-else>
              <p>No Threads to display</p>
          </template>
      </div>
  </main>
</template>

<script>
    export default {
        name: "TopicNav",
        props: ['topic']
    }
</script>

<style scoped>
  .topic-lead {
    font-size: 12px;
    font-weight: 400;
    margin-top: .3rem;
  }

  h2 {
    margin-top: 0;
  }
</style>
