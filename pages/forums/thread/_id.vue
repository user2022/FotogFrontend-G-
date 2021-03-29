<template>
    <main>
        <div class="thread-header">
            <button class="my-btn my-btn-primary back-btn" @click="$router.go(-1)"><i class="fas fa-long-arrow-alt-left"></i> Go Back</button>
            <NuxtLink :to="`/profile/${thread.user.username}`"><img class="avatar-x-medium" :src="thread.user.profileImg" :alt="thread.user.user"></NuxtLink>
            <div class="thread-desc">
                <h2>{{thread.title}}</h2>
                <p class="lead">By <NuxtLink :to="`/profile/${thread.user.username}`" class="my-url">{{thread.user.username}}</NuxtLink> <span class="smaller">{{ $moment(thread.created_at).fromNow() }}</span></p>
            </div>
        </div>

        <hr>

        <div class="forum-row">
            <TopicNav :topic="thread.topic"/>
            <div style="width: 100%">
                <div class="post-box">
                    <div class="message" v-html="thread.message"></div>
                </div>
                <template v-if="thread.posts.length > 0">
                    <div v-for="post in thread.posts">
                        <ForumPost :post="post"/>
                    </div>
                </template>
                <template v-else>
                    <p class="no-posts">No posts to display <i class="far fa-frown"></i></p>
                </template>
                <div class="create-post-sec">
                    <div class="post-row">
                        <img :src="$auth.user.profileImg" :alt="$auth.user.username" class="avatar-large">
                        <div class="post-form-cont">
                            <ForumEditor @get-data="keyListen"/>
                            <div class="btn-send">
                                <div>
                                    <p class="error-text">{{ errText }}</p>
                                </div>
                                <button class="my-btn my-btn-primary" @click="submitPost">Submit</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>


    </main>
</template>

<script>
import TopicNav from "../../../components/forum/TopicNav";
import ForumPost from "../../../components/forum/ForumPost";
import ForumEditor from "../../../components/forum-editor";

export default {
    name: "thread",
    components: {ForumEditor, ForumPost, TopicNav},
    data() {
        return {
            message: '',

            errText: ''
        }
    },
    methods: {
        async submitPost() {
            try {
                if (this.$auth.loggedIn) {
                    if (this.message === '' || this.message === null) return this.errText = 'Please enter a message to be posted'; // Making sure user has entered a message
                    let data = {
                        message: this.message,
                        thread: this.thread._id,
                        user: this.$auth.user._id
                    }

                    await this.$store.dispatch('forum/createPost', {data: data, user: this.$auth.user});

                } else {
                    // user not logged in
                    this.errText = 'Problem submitting post, you are not logged in'
                }
            } catch(err) {

            }
        },
        keyListen(value) { // Sets the value from text editor to this.message
            this.message = value;
        }
    },
    computed: {
        thread() {
            return this.$store.getters['forum/getThread'];
        }
    },
    async asyncData({store, route, error}) {
        await store.dispatch('forum/getThread', {id: route.params.id, error: error});
    }
}
</script>

<style scoped>
.back-btn {
    align-self: flex-end;
    margin-right: 11rem;
}

.back-btn i {
    margin-right: .5rem;
}

.no-posts {
    text-align: center;
    font-size: 18px;
    margin-top: .8rem;
}

.post-row {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin-bottom: .4rem;
}

.post-row img {
    margin-right: 1rem;
}

.post-form-cont {
    padding: 18px 18px 10px 18px;
    background-color: #e7edf3;
    position: relative;
}

.post-form-cont::after {
    content: "";
    position: absolute;
    top: 30px;


    border-width: 12px;
    border-style: solid;
    border-color: transparent #e7edf3 transparent transparent;
    left: -24px;
}

.btn-send {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: .3rem;
}

.btn-send .my-btn {
    margin-right: 0;
}


.create-post-sec {
    margin-top: 1.5rem;
}

.create-post-sec h3 {
    font-size: 24px;
    margin-bottom: .4rem;
}

.message {
    padding: 0 .3rem;
}

.post-box {
    padding: .5rem .3rem 2rem .3rem;
    margin-left: 1.7rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    width: 100%;
}


.thread-header {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.thread-desc {
    margin-left: .3rem;
}

.thread-desc p {
    font-size: 16px;
}


h2 {
    font-size: 24px;
}

@media only screen and (max-width: 440px) {
    .back-btn {
        margin-right: .5rem;
    }

    .thread-header {
        flex-direction: column;
    }

    .post-row {
        flex-direction: column;
    }

    .post-row img {
        margin-bottom: 1rem;
    }
}



</style>
