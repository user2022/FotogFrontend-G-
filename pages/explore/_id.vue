<template>
    <main>
        <template v-if="photo.image == null || photo.image === '' || photo.image === undefined ">
            <h1>This photo doesn't exist </h1>
        </template>
        <template v-else>
            <div class="img-contain">
                <img :src="photo.image" :alt="photo.title" v-show="showImg" @load="loadedImg">
                <div class="show-img" v-if="!showImg">
                    <loader/>
                </div>
                <div class="user-option-row" v-if="$auth.loggedIn"> <!-- Check if logged in to display like and report button -->
                    <i class="fas fa-thumbs-up icon-o"
                       v-b-tooltip.bottom="'Like Post'"
                       :class="{'liked': photo.likes.find(u => u === $auth.user._id)}"
                       @click="likePhoto"
                    ></i>
                    <i class="fas fa-flag icon-o"
                       v-b-tooltip.bottom="'Report Post'"
                    ></i>
                </div>
            </div>
            <div class="img-info-cont">
                <div class="main">

                    <div class="main-top">
                        <NuxtLink :to="`/profile/${photo.user.username}`"><img class="avatar-medium" :src="photo.user.profileImg" :alt="photo.user.username"></NuxtLink>
                        <div class="title-user">
                            <h1>{{photo.title}}</h1>
                            <p class="user-txt">By <NuxtLink :to="`/profile/${photo.user.username}`"><span class="username">{{photo.user.username}}</span></NuxtLink>, <span class="date">{{$moment(photo.created_at).fromNow()}}</span></p>
                            <div class="rank" :style="`background-color: ${photo.user.role.bgCol}; color: ${photo.user.role.textCol}`">{{photo.user.role.roleName}}</div>
                        </div>
                    </div>

                    <!-- Displaying some statistics about the submitted photo -->
                    <div class="icons-stats">
                        <div class="icon-item">
                            <i class="fas fa-thumbs-up"></i>
                            <p class="icon-txt"><span>{{photo.likes.length}}</span> Likes</p>
                        </div>
                        <div class="icon-item">
                            <i class="fas fa-comment-alt-dots"></i>
                            <p class="icon-txt"><span>{{photo.comments.length}}</span> Comments</p>
                        </div>
                        <div class="icon-item">
                            <i class="fas fa-eye"></i>
                            <p class="icon-txt"><span>{{photo.views}}</span> Views</p>
                        </div>
                    </div>

                    <!-- Looping through keywords for all of the tags to be displayed -->
                    <div class="tags">
                        <i class="fas fa-tags"></i>
                        <div class="tag" v-for="tag in photo.keywords" :key="tag">
                            <span class="tag-txt">{{tag}}</span>
                        </div>
                    </div>

                    <!-- Displaying information about the user who submitted the photo -->
                    <div class="about">
                        <div class="about-header">
                            <i class="fad fa-star-exclamation"></i>
                            <h2>About Poster</h2>
                        </div>
                        <div class="about-main">
                            <p>{{photo.user.firstName + ' ' + photo.user.lastName}}, Germany</p>
                            <p class="bio">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat.
                            </p>
                        </div>
                    </div>
                </div>
                <!-- End of first container -->

                <!-- Images that share the same keywords -->
                <div class="other-images">
                    <div class="others-like">
                        <h2 class="others-header">You might also like...</h2>
                        <div class="img-flex"> <!-- 7 -->
                            <img src="https://i.imgur.com/LqbqR0G.jpg" alt="">
                            <img src="https://i.imgur.com/w3k6mKi.jpg" alt="">
                            <img src="https://i.imgur.com/dSuIG1Q.jpg" alt="">
                            <img src="https://i.imgur.com/MuD48f7.jpg" alt="">
                            <img src="https://i.imgur.com/jh6wrKf.jpg" alt="">
                            <img src="https://i.imgur.com/6ZAGF4Q.jpg" alt="">
                            <img src="https://i.imgur.com/EGhgbrX.jpg" alt="">
                        </div>
                    </div>
                </div>
                <!-- End of second container -->

            </div>

            <!-- Comments // Iterating through comments that share an ID with the picture and displaying them -->
            <div class="comments-cont">
                <h2>Comments</h2>
                <div>
                    <!-- Create comment section -->
                    <template v-if="$auth.loggedIn">
                        <div class="add-comment-row">
                            <div class="cmt-row">
                                <textarea
                                    class="my-textarea"
                                    rows="3"
                                    placeholder="Add a comment"
                                    v-model="comment"
                                    @input="delayTouch($v.comment)"
                                    :class="{'form-danger': $v.comment.$invalid && $v.comment.$dirty, 'form-success': !$v.comment.$invalid}"
                                />
                                <button class="my-btn my-btn-primary my-btn-h-fill" @click="addComment"><i class="fas fa-share"></i></button>
                            </div>
                            <div class="form-error">
                                <p v-if="!$v.comment.minLength && $v.comment.$dirty" class="error-text">The comment needs to be at least 2 characters long</p>
                                <p v-if="!$v.comment.maxLength && $v.comment.$dirty" class="error-text">
                                    The comment can't be over 150 characters long!
                                </p>
                            </div>
                        </div>
                        <p class="error-text">{{errTxt}}</p>
                    </template>
                    <!-- Comment List Section -->
                    <template v-if="photo.comments.length > 0">
                        <my-paginate :data="photo.comments" :data-length="photo.comments.length" :per-page="10">
                            <template slot-scope="{item}">
                                <div class="comment-row">
                                    <NuxtLink :to="`/profile/${item.user.username}`">
                                        <img class="avatar-small avatar-shadow" :src="item.user.profileImg" :alt="item.user.username">
                                    </NuxtLink>
                                    <div class="comment-msg">
                                        <p class="comment-username">
                                            <NuxtLink :to="`/profile/${item.user.username}`">{{item.user.username}}</NuxtLink>
                                            <span class="date date-small">{{$moment(item.created_at).calendar()}}</span>
                                        </p>
                                        <p>
                                            {{item.message}}
                                        </p>
                                    </div>
                                </div>
                            </template>
                        </my-paginate>
                    </template>
                    <template v-else>
                        <p class="err-comment">There are currently no comments to display <i class="far fa-frown"></i></p>
                    </template>
                </div>

            </div>
        </template>
    </main>
</template>

<script>
    import {required, minLength, maxLength} from 'vuelidate/lib/validators'
    const touchMap = new WeakMap() // for delayTouch method
    import myPaginate from "../../components/my-paginate";

    export default {
        name: "temp",
        components: {myPaginate},
        data() {
            return {
                comment: '',

                err: false,
                errTxt: '',

                showImg: false,
            }
        },
        methods: {
            // Adding a comment to the photo
            async addComment() {
                try {
                    if (this.$auth.loggedIn) {
                        if (!this.$v.$anyError && this.$v.$anyDirty) {

                            let data = {
                                message: this.comment,
                                user: this.$auth.user._id,
                                photo: this.photo._id
                            }

                            await this.$store.dispatch('photos/createComment', {data: data});

                            this.comment = ''; // Setting comment back to empty string
                            await this.$v.comment.$reset;

                        } else {
                            this.errTxt = 'Fix the problems with your comment before trying to submit it';
                        }
                    } else {
                        this.errTxt = 'You must be logged in to submit a comment';
                    }
                } catch(err) {
                    console.log(err);
                    this.errTxt = 'There was a problem submitting this comment';
                }
            },
            async likePhoto() {
                try {
                    if (this.$auth.loggedIn) {
                        let data = {
                            photo: this.photo._id,
                            user: this.$auth.user._id
                        }
                        await this.$store.dispatch('photos/likePhoto', {data: data});
                    } else {
                        console.log('ERROR: Not logged in');
                    }
                } catch(err) {
                    console.log(err);
                }
            },
            delayTouch($v) {
                $v.$reset()
                if (touchMap.has($v)) {
                    clearTimeout(touchMap.get($v))
                }
                touchMap.set($v, setTimeout($v.$touch, 200))
            },
            loadedImg() {
                this.showImg = true;
            }
        },
        computed: {
            photo() {
                return this.$store.getters['photos/onePhoto'];
            }
        },
        async asyncData({store, route, error}) {
            await store.dispatch('photos/getOne', {id: route.params.id, error: error});
        },
        validations: {
            comment: {
                required,
                minLength: minLength(2),
                maxLength: maxLength(150)
            }
        }
    }
</script>

<style scoped>
    .show-img {
        height: 768px;
        width: 500px;
        margin: auto;
    }

    a {
        color: unset;
    }

    h1 {
        font-size: 36px;
    }

    .img-contain img {
        max-height: 768px;

        width: auto;
        height: auto;

        margin: auto;

        min-height: 120px;
        min-width: 120px;
    }

    .img-contain {
        max-height: 768px;
        max-width: 1366px;

        width: 100%;
        height: 100%;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        margin: auto;

    }

    .title-user h1 {
        font-size: 28px;
        font-weight: bolder;
    }

    .img-info-cont {
        display: flex;
        flex-direction: row;
        margin-top: .6rem;
        margin-left: 3rem;
        margin-right: 3rem;

    }

    .main {
        width: auto;
        margin-right: 4.6rem;

    }

    .user-txt {
        font-size: 16px;
        margin-left: .3rem;
    }

    .main-top {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .avatar-medium {
        margin-right: .8rem;
    }

    .username {
        font-weight: bold;
    }

    .about-header {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .about-header i {
        font-size: 22px;
        color: #47494E;
    }

    .about-header h2 {
        margin-left: .5rem;
        margin-top: 0;
        font-weight: 400;
    }

    .about-main {
        margin-top: .5rem;
    }

    .bio {
        font-size: 12px;
        margin-top: .3rem;
    }

    .about {
        max-width: 500px;
        min-width: 480px;
        margin-top: 1.5rem;
        margin-left: .6rem;
    }

    .tags {
        display: flex;
        flex-direction: row;
        margin: 1rem 0 1rem .6rem;
        flex-wrap: wrap;
        align-items: center;
    }

    .tags i {
        margin-right: .4rem;
        color: #47494E;
    }

    .icons-stats {
        display: flex;
        flex-direction: row;
        margin-left: .6rem;
        margin-top: .8rem;
    }

    .icon-item {
        display: flex;
        flex-direction: row;
        margin-right: .9rem;
        align-items: center;
    }

    .icon-item i {
        color: #47494E;
        margin-right: .3rem;
        font-size: 13px;
    }

    .icon-item p {
        font-size: 13px;
    }

    /* Others section  */
    .other-images {

    }

    .others-header {
        font-size: 18px;
        font-weight: normal;
    }

    .img-flex {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: .6rem;
        flex-wrap: wrap;
    }

    .img-flex img {
        max-width: 205px;
        max-height: 120px;
        margin-right: .4rem;
        margin-top: .4rem;
    }

    .my-url {
        margin-top: .5rem;
    }

    .my-url i {
        font-size: 12px;
    }

    /* User option sec */
    .user-option-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 1rem;
        align-self: flex-end;
        margin-top: .6rem;

        margin-right: 10rem;
    }

    .icon-o {
        margin-right: 1.2rem;
        font-size: 20px;
        color: #3b3b3b;
        cursor: pointer;
    }





    /* Comment sec */
    .comments-cont {
        width: 720px;

        margin-left: 3rem;
        margin-top: 2.3rem;
    }

    .comment-row {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        margin-top: .7rem;
    }

    .comment-msg {
        position: relative;
        background-color: #e2e2ee;
        padding: 7px 12px;
        margin-left: .8rem;
        width: 100%;
    }

    .comment-msg::after {
        content: "";
        position: absolute;
        top: 17px;


        border-width: 8px;
        border-style: solid;
        border-color: transparent #e2e2ee transparent transparent;
        left: -15px;
    }

    .comment-username {
        font-weight: bold;
        margin-bottom: .3rem;
    }

    .err-comment {
        margin-top: .3rem;

    }

    .err-comment i {
        font-size: 18px;
        margin-left: .2rem;
    }

    .add-comment-row {
        margin-top: .8rem;
        margin-bottom: .3rem;
    }

    .cmt-row {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .liked {
        color: #085f9d;
    }

    .my-btn {
    }

    .my-btn-h-fill {
        padding: 0 9px;
        width: auto;
        max-height: unset;
        display: block;
        height: 73px;
        border-radius: 0 8px 8px 0;
        margin-left: .4rem;
    }



    @media only screen and (max-width: 1440px) {
        .img-contain {
            max-height: 574px;
            max-width: 1010px;
        }

      .about {
        max-width: 390px;
        min-width: 370px;
      }

      .img-flex img {
        max-width: 182px;
        max-height: 111px;
        margin-right: .3rem;
        margin-top: .3rem;
      }

      .img-flex img:nth-child(3n+0) {
        display: none;
      }

      .comments-cont {
        width: 605px;

        margin-left: 2rem;
        margin-top: 2rem;
      }
    }

    @media only screen and (max-width: 440px) {
        .img-contain img {
            width: 100%;
        }

        .user-option-row {
            margin-right: 1rem;
        }

        .img-info-cont {
            flex-direction: column;
            margin-left: 0;
            margin-right: 0;
        }

        .comments-cont {
            margin-left: 0;
            width: 100%;
        }

        .my-textarea {
            width: 300px;
        }

        .about {
            max-width: 330px;
            min-width: 300px;
        }

    }

</style>
