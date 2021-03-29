<template>
    <main>
        <!-- Main profile info -->
        <div class="profile-top">
            <div class="user-p-flex">
                <img :src="profile.profileImg" :alt="profile.username" class="avatar-huge">
                <div class="user-info">
                    <div class="user-rank-row">
                        <h1>{{profile.username}}</h1>
                        <div class="rank" :style="`background-color: ${profile.role.bgCol}; color: ${profile.role.textCol}`">{{profile.role.roleName}}</div>
                    </div>
                    <h2>{{profile.firstName}} {{profile.lastName}}</h2>
                    <p class="about">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat.</p>
                </div>

            </div>
        </div>
        <!-- Tabs navigation -->
        <div class="profile-tabs">
            <div class="tabs">
                <div class="tab">
                    <!-- <NuxtLink :to="`${this.$route.path}?d=photos`"> -->
                    <NuxtLink :to="{query: {d: 'photos'}}">
                        <p class="tab-option" :class="{'tab-selected': $route.query.d === 'photos' || !$route.query.d}">
                            <i class="fas fa-image"></i> Photos
                        </p>
                    </NuxtLink>
                    <div class="border-line"></div>
                    <div class="border-line-2" v-if="$route.query.d === 'photos' || !$route.query.d"></div>
                </div>
                <div class="tab">
                    <NuxtLink :to="{query: {d: 'comments'}}">
                        <p class="tab-option" :class="{'tab-selected': $route.query.d === 'comments'}">
                            <i class="fas fa-comment-alt-dots"></i> Comments
                        </p>
                    </NuxtLink>
                    <div class="border-line"></div>
                    <div class="border-line-2" v-if="$route.query.d === 'comments'"></div>
                </div>
                <div class="tab">
                    <NuxtLink :to="{query: {d: 'posts'}}">
                        <p class="tab-option" :class="{'tab-selected': $route.query.d === 'posts'}">
                            <i class="fas fa-comments"></i> Forum Posts
                        </p>
                    </NuxtLink>
                    <div class="border-line"></div>
                    <div class="border-line-2" v-if="$route.query.d === 'posts'"></div>
                </div>
            </div>
        </div>
        <!-- Content to be displayed inside tabs -->
        <div class="profile-content">
            <div class="post-content" v-if="$route.query.d === 'posts'">
                <template v-if="profile.posts.length > 0">
                    <div v-for="post in profile.posts">
                        <div class="p-post-cont">
                            <div class="p-p-top">
                                <p>Posted at {{$moment(post.created_at).calendar()}}, in <NuxtLink :to="`/forums/thread/${post.thread.id}`" class="my-url">{{post.thread.title}}</NuxtLink></p>
                            </div>
                            <div class="p-p-main">
                                <div v-html="post.message"></div>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <p class="no-display">No posts to display <i class="far fa-frown"></i></p>
                </template>
            </div>
            <div class="comment-content" v-else-if="$route.query.d ==='comments'">
                <template v-if="profile.comments.length > 0">
                    <div class="comment-container">
<!--                        <div v-for="comment in profile.comments">-->
<!--                            <comment-view :comment="comment"/>-->
<!--                        </div>-->
                        <my-paginate :per-page="7" :data-length="profile.comments.length" :data="profile.comments" >
                            <template slot-scope="{item}"> <!-- item is = to an iterated comment (see my-paginate) -->
                                <comment-view :comment="item" /> <!-- Passing the iterated comment into the comment view component -->
                            </template>
                        </my-paginate>
                    </div>
                </template>
                <template v-else>
                    <p class="no-display">No comments to display <i class="far fa-frown"></i></p>
                </template>
            </div>
            <div class="photo-post-content" v-else>
                <template v-if="profile.photos.length > 0">
                    <div class="photo-container">
                        <div v-for="photo in profile.photos">
                            <profile-photo :photo="photo"/>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <p class="no-display">No photos to display <i class="far fa-frown"></i></p>
                </template>
            </div>
        </div>
    </main>
</template>

<script>
import ProfilePhoto from "../../components/main/profile-photo";
import CommentView from "../../components/main/comment-view";
import myPaginate from "../../components/my-paginate";

export default {
    name: "UserProfile",
    components: {myPaginate, CommentView, ProfilePhoto},
    computed: {
        profile() {
            return this.$store.getters['account/getProfile'];
        }
    },
    async asyncData({store, route, error}) {
        await store.dispatch('account/getProfile', {username: route.params.id, error: error});
    }
}
</script>

<style scoped>
    .p-post-cont {
        padding: 10px 16px;
        background-color: #e2e2ee;
        margin-top: 1rem;
    }

    .p-p-top p {
        font-style: italic;
        font-size: 12px;
    }

    .p-p-top {
        border-bottom: 1px solid #bababa;
        padding-bottom: 5px;
    }

    .p-p-main {
        margin-top: .6rem;
    }

    .avatar-huge {
        margin-right: 1rem;
    }

    .profile-top {
        margin: 2rem 10rem;
    }

    .user-flex {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .user-info h1 {
        font-size: 38px;
    }

    .user-info h2 {
        margin-top: .2rem;
    }

    .about {
        max-width: 580px;
        margin-top: .3rem;
    }

    .user-rank-row {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
    }

    .rank {
        margin-bottom: .5rem;
        margin-left: 1rem;
    }

    .profile-tabs {
        margin-top: 8rem;
    }

    .photo-container, .comment-container, .post-container {
        margin-top: 1rem;
    }

    .comment-container {
        max-width: 720px;
    }

    .photo-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
    }

    .profile-content, .post-content, .comment-content {
        width: 100%;
    }

    .no-display {
        font-size: 20px;
        margin-top: 1rem;
    }

    .user-p-flex {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    @media only screen and (max-width: 440px) {
        .profile-top {
            margin: 1rem 0;
        }

        .user-p-flex {
            flex-direction: column;
        }

        .about {
            max-width: 300px;
        }
    }
</style>
