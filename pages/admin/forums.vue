<template>
    <main>
        <div class="a-header">
            <h1>Forum Posts</h1>
        </div>
        <div class="blob-container">
            <div class="a-blob-flex">
                <div class="left-panel">
                    <div class="a-blob">
                        <template v-if="posts">
                            <p class="a-blob-header">All Posts</p>
                            <table class="a-table">
                                <thead>
                                <tr>
                                    <th>Message</th>
                                    <th>Created</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="post in posts">
                                    <td>{{ post.message }}</td>
                                    <td>{{$moment(post.created_at).format('DD/MM/Y')}}</td>
                                    <td><button class="my-btn my-btn-danger" @click="deletePost(post._id)">Delete</button></td>
                                </tr>
                                </tbody>
                            </table>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    name: "adminForum",
    layout: 'admin',
    methods: {
        async deletePost(id) {
            try {

            } catch(err) {
                console.log(err);
            }
        }
    },
    computed: {
        posts() {
            return this.$store.getters['admin/allPosts'];
        }
    },
    async asyncData({store, error}) {
        await store.dispatch('admin/getPosts', {error: error});
    }

}
</script>

<style scoped>

</style>
