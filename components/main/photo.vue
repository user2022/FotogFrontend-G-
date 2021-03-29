<template>
    <div>
        <div class="img-cont">
            <!-- Passing through the photo's ID to the url so the _id.vue page knows which photo to look for -->
            <NuxtLink :to="`/explore/${photo.id}`"><img class="img" :src="photo.compressed_img" :alt="photo.title"></NuxtLink>
            <div class="hover-show">
                <div class="hover-inner">
                    <NuxtLink :to="`/profile/${photo.user.username}`"><img class="avatar-x-small avatar-shadow" :src="photo.user.profileImg"/></NuxtLink>
                    <div class="hover-info">
                        <p class="info-title">{{photo.title}}</p>
                        <p class="info-username">By <NuxtLink :to="`/profile/${photo.user.username}`"><span class="userHov">{{photo.user.username}}</span></NuxtLink>,
                            <span class="date date-small">{{ $moment(photo.created_at).fromNow() }}</span></p>
                    </div>
                </div>
            </div>

            <div class="hover-show-top">
                <div class="icons-top">
                    <p><i class="fal fa-thumbs-up"></i> {{photo.likes.length}}</p>
                    <p><i class="fal fa-eye"></i> {{photo.views}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "photo-image",
        props: ['photo'],
    }
</script>

<style scoped>
    a {
        color: unset;
    }

    .img-cont {
        position: relative;
        max-height: 295px;
        min-height: 255px;
        min-width: 195px;
        max-width: 410px;
        height: 255px;
        width: auto;


        cursor: pointer;
        margin: 3px;
    }

    .img {
        max-height: 295px;
        min-height: 255px;
        max-width: 410px;
        min-width: 195px;
        height: 255px;
        width: auto;

    }

    .hover-show-top {
        position: absolute;
        top: 0;
        right: 0;
    }

    .icons-top {
        margin-top: .3rem;
        margin-right: .3rem;
        display: flex;
        flex-direction: row;

        opacity: 0;
        transition: .2s;
    }

    .img:hover .icons-top {
        opacity: 1;
    }

    .icons-top p {
        text-shadow: 1px 1px 2px #171717;
        color: #e7e7e7;
        margin-right: .4rem;
        font-size: 12px;
    }

    .icons-top p i {
        margin-right: .1rem;
     }

    .hover-show {
        position: absolute;
        bottom: 0;
        left: 0;
        opacity: 0;

        transition: .2s;
        background: rgb(17,33,60);
        background: linear-gradient(180deg, rgba(17,33,60,0) 0%, rgba(13,35,64,1) 100%);
        width: 100%;

    }

    .hover-inner {
        display: flex;
        flex-direction: row;
        margin: 0 .6rem .9rem .9rem;
        padding-top: 15px;
    }

    .info-title {
        color: white;
        font-weight: 700;
        text-shadow: 0px 0px 3px rgba(43,43,43,0.88);
        letter-spacing: 1px;
    }

    .info-username {
        color: #dddddd;
        text-shadow: 0px 0px 3px rgba(43,43,43,0.88);
        font-size: 11px;
    }

    .userHov {
        transition: .2s;
    }

    .userHov:hover {
        color: white;
    }

    a {
        color: unset;
    }

    .img:hover .hover-show {
        opacity: 1;
    }

    .hover-info {

    }

    /* 1440px width */

    @media only screen and (max-width: 1440px) {
        .img-cont {
            position: relative;
            max-height: 226px;
            min-height: 226px;
            min-width: 100px;
            max-width: 410px;
            height: 226px;
            width: auto;


            cursor: pointer;
            margin: 3px;
        }

        .img {
            max-height: 226px;
            min-height: 226px;
            max-width: 410px;
            min-width: 100px;
            height: 226px;
            width: auto;

        }
    }

    @media only screen and (max-width: 440px) {
        .img-cont {
            width: auto;
            min-height: 180px;
            min-width: 80px;
            height: 180px;
        }

        .img {
            width: auto;
            min-height: 180px;
            min-width: 80px;
            height: 180px;
        }
    }

</style>
