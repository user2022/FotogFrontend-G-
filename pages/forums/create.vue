<template>
    <main>
        <div class="f-header">
            <p class="forum-header">Create Thread</p>
            <p class="lead">Share your thoughts</p>
        </div>
        <hr>
        <div class="create-thread">
            <div class="input-container">
                <select class="my-select" name="topics" id="topics" v-model="topic">
                    <option :value="null" disabled>Select a topic</option>
                    <optgroup :label="category.name" v-for="category in nav">
                        <option v-for="topic in category.topics" :value="topic._id">{{topic.name}}</option>
                    </optgroup>
                </select>
            </div>

            <div class="input-container">
                <input type="text" v-model="title" placeholder="Enter a title..." class="my-input my-input-large i-background i-normal">
            </div>

            <forum-editor @get-data="keyListen" />

            <button class="my-btn my-btn-primary" @click="createThread">{{btnTxt}}</button>
            <p class="error-text">{{ errTxt }}</p>
        </div>
    </main>
</template>

<script>
import ForumEditor from "../../components/forum-editor";
export default {
    name: "create",
    middleware: 'auth',
    components: {ForumEditor},
    data() {
        return {
            title: '',
            message: '',
            topic: null,

            errTxt: '',
            btnTxt: 'Submit'
        }
    },
    methods: {
        async createThread() {
            try {
                if (this.$auth.loggedIn) {
                   if (this.topic !== null) {
                       if (this.message === '' || this.message === null) return this.errTxt = 'Please enter a message';
                       this.btnTxt = 'Submitting...'; // Showing the user the thread is being submitted
                       let data = {
                           title: this.title,
                           message: this.message,
                           user: this.$auth.user._id,
                           topic: this.topic
                       }

                       let response = await this.$axios.$post('/api/thread', data);

                       this.btnTxt = 'Redirecting';
                       await this.$router.push(`/forums/thread/${response.url_id}`);
                   } else {
                        this.errTxt = 'You have not selected a topic'
                   }
                } else {
                    this.errTxt = 'It appears you are not logged in'
                }
            } catch(err) {
                this.errTxt = err.message;
            }
        },
        keyListen(value) { // Sets the value from text editor to this.message
            this.message = value;
        }
    },
    computed: {
        nav() {
            return this.$store.getters['forum/allCategories'];
        }
    },
    async asyncData({store, error}) {
        await store.dispatch('forum/getNav', {error: error});
    }
}
</script>

<style scoped>
    .error-text {
        margin-left: 32px;
        font-size: 14px;
    }

    .my-btn {
        margin-top: .4rem;
    }
</style>
