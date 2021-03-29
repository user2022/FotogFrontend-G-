<template>
    <div>
        <div class="img-cont">
            <!-- Passing through the photo's ID to the url so the _id.vue page knows which photo to look for -->
            <NuxtLink :to="`/explore/${photo.id}`" class="img-link"><img class="img" :src="photo.compressed_img" :alt="photo.title"></NuxtLink>
            <div class="hover-show">
                <div class="hover-info">
                    <div class="title-date">
                        <p class="info-title">{{photo.title}}</p>
                        <p style="color: #eeeeee; font-size: 11px"><span class="date date-small">{{ $moment(photo.created_at).fromNow() }}</span></p>
                    </div>
                    <div>
                        <p class="icon-detail"><i class="fal fa-thumbs-up"></i> <span>{{photo.likes.length}}</span> <i class="fal fa-eye"></i> <span>{{photo.views}}</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "profile-photo",
    props: ['photo']
}
</script>

<style scoped>
.img-cont {
    position: relative;
    max-height: 340px;
    min-height: 300px;
    min-width: 225px;
    max-width: 450px;
    height: 300px;
    width: auto;


    cursor: pointer;
    margin: 3px;
}

.img {
    max-height: 340px;
    min-height: 300px;
    min-width: 225px;
    max-width: 450px;
    height: 300px;
    width: auto;

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

.hover-info {
    padding: 8px 12px;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
}

.icon-detail {
    color: #e3e3e3;
    text-align: right;
}

.icon-detail span {
    font-size: 14px;
}

.icon-detail i {
    margin-right: .3rem;
    margin-left: .3rem;
    font-size: 14px;
}

.title-date {
    padding-top: 20px;
}

.info-title {
    color: white;
    font-weight: 700;
    text-shadow: 0px 0px 3px rgba(43,43,43,0.88);
    letter-spacing: 1px;
    overflow: hidden;

}

a {
    color: unset;
}

.img-cont:hover .hover-show {
    opacity: 1;
}

.icon-detail {
    white-space: nowrap;
}

/* 1440px width */

@media only screen and (max-width: 1440px) {
    .img-cont {
        position: relative;
        max-height: 251px;
        min-height: 251px;
        min-width: 135px;
        max-width: 445px;
        height: 251px;
        width: auto;


        cursor: pointer;
        margin: 3px;
    }

    .img {
        max-height: 251px;
        min-height: 251px;
        min-width: 135px;
        max-width: 445px;
        height: 251px;
        width: auto;

    }
}
</style>
