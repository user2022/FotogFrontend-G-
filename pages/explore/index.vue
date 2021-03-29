<template>
    <main>
        <div class="f-header">
            <p class="forum-header">Explore</p>
            <p class="lead">View Photos from the Community</p>
        </div>
        <hr>
        <div class="img-layout">
            <div class="img" v-for="photo in photos">
                <photo :photo="photo"/> <!-- Passing the photo object into the photo component -->

            </div>
        </div>
        <NuxtLink to="/explore/123"><button class="my-btn my-btn-danger">test</button></NuxtLink>
    </main>
</template>

<script>
    import Photo from "../../components/main/photo";
    export default {
        name: "explore",
        components: {Photo},
        methods: {

        },
        computed: {
            photos() {
                return this.$store.getters['photos/allPhotos'];
            }
        },
        async asyncData({store, error}) {
            await store.dispatch('photos/getPhotos', error);
        }

    }
</script>

<style scoped>
    .img-layout {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }

    @media only screen and (max-width: 440px) {
        .lead {
            font-size: .9rem;
        }
    }


</style>
