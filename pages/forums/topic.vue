<template>
    <main>
      <div class="f-header">
        <p class="lead">Currently browsing</p>
        <i class="far fa-arrow-right"></i>
        <p class="forum-header">General Discussion</p>
      </div>

      <hr>

      <div class="flex-row">
        <ForumNav/>
        <TopicList/>
      </div>

      <hr>

      <ForumStatistics/>
    </main>
</template>

<script>
    import ForumNav from "../../components/forum/ForumNav";
    import TopicList from "../../components/forum/TopicList";
    import ForumStatistics from "../../components/forum/ForumStatistics";
    export default {
        name: "topic",
      components: {ForumStatistics, TopicList, ForumNav}
    }
</script>

<style scoped>
  .forum-header {
    font-size: 24px;
    margin-left: .3rem;
  }

  .lead {
    font-size: 16px;
  }

  .f-header i {
    font-size: 20px;
    margin: 0 .2rem .1rem .4rem;
    color: #484848;
  }

  .f-header {
    align-items: center;
  }
</style>
