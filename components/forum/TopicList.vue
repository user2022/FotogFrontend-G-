<template>
    <main>
      <button class="btn btn-primary">pagination goes here</button>

      <table>
        <tr>
          <th>Topic</th>
          <th>Latest</th>
          <th class="text-center">Posts</th>
          <th class="text-center">Views</th>
        </tr>
        <tr>
          <td>
            <p><span class="url"><NuxtLink to="/forums/thread">The Beautiful Fjords of Norway</NuxtLink></span></p>
            <p class="smaller"><span class="url">User</span> 30 minutes ago in <span class="url">General Discussion</span></p>
          </td>
          <td>
            <div class="user-flex">
              <div class="avatar-x-small"></div>
              <div>
                <p><span class="url">User</span></p>
                <p class="smaller">3 minutes ago</p>
              </div>
            </div>
          </td>
          <td class="text-center bold">45</td>
          <td class="text-center bold">210</td>
        </tr>
      </table>
    </main>
</template>

<script>
    export default {
        name: "TopicList"
    }
</script>

<style scoped>
  main {
    margin-left: 1rem;
    width: 100%;
  }

  /* Table */



  /*  forum-lists.css */

</style>
