<template>
    <main>
        <div class="a-header">
            <h1>Photos</h1>
        </div>
        <div class="blob-container">
            <div class="a-blob-flex">
                <div class="left-panel">
                    <div class="a-blob">
                        <template v-if="photos">
                            <p class="a-blob-header">All Photos</p>
                            <table class="a-table">
                                <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Created</th>
                                    <th>Views</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="photo in photos">
                                    <td>{{ photo.title }}</td>
                                    <td>{{$moment(photo.created_at).format('DD/MM/Y')}}</td>
                                    <td>{{ photo.views }}</td>
                                    <td><button class="my-btn my-btn-secondary" @click="selectPhoto(photo)">View</button></td>
                                    <td><button class="my-btn my-btn-danger" @click="deletePhoto(photo._id)">Delete</button></td>
                                </tr>
                                </tbody>
                            </table>
                        </template>
                    </div>
                </div>
                <div class="right-panel">
                    <div class="a-blob">
                        <template v-if="selectedPhoto">
                            <p class="a-blob-header">Photo Preview</p>
                            <div>
                                <img :src="selectedPhoto.compressed_img" :alt="selectedPhoto.title">
                            </div>
                        </template>
                        <template v-else>
                            <div class="a-skeleton">
                                <p>No photo currently selected</p>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    name: "adminPhotos",
    layout: 'admin',
    data() {
        return {
            selectedPhoto: null
        }
    },
    methods: {
        selectPhoto(photo) {
            this.selectedPhoto = photo;
        },
        async deletePhoto(id) {
            try {
                await this.$store.dispatch('photos/deletePhoto', {id: id});
            } catch(err) {
                console.log(err);
            }
        }
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

</style>
