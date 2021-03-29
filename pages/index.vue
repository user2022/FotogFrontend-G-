<template>
    <main class="main-home">
        <div class="home"></div>
        <div class="slider-contain">
            <img :src="require(`~/assets/images/${photos[index]}.jpg`)" alt="home">
            <div class="on-top-image">
                <div class="logo-cont">
                    <h1 class="main-logo logo-gradient">fotog.</h1>
                    <h1 class="main-logo" style="z-index: 3">fotog.</h1>
                    <p class="logo-lead">Share. &nbsp; Explore.&nbsp; Discuss.</p>
                </div>
            </div>
            <div class="on-top-image-buttons">
                <div class="home-btn-row">
                    <NuxtLink to="/explore"><button class="my-btn my-btn-primary my-btn-large">Explore</button></NuxtLink>
                    <NuxtLink to="/forums"><button class="my-btn my-btn-primary my-btn-large">Discuss</button></NuxtLink>
                </div>
            </div>
        </div>

        <div class="content-container">
            <div class="home-info-row">
                <div class="info-item">
                    <h2><i class="fad fa-share-square"></i> Share</h2>
                    <p>
                        Share your photos with other people from all around the world with only a few clicks!
                        Have an amazing photo you took whilst exploring the world? Sharing it on Fotog will
                        allow others to see it, comment on it and perhaps even like it!
                    </p>
                </div>
                <div class="info-item">
                    <h2><i class="fad fa-globe-europe"></i> Explore</h2>
                    <p>
                        Explore vast photo collections and see the beauty the world has to offer. From mountains to wild life
                        you can find anything that captivates your imagination and inspires you to maybe even go on your
                        own adventure.
                    </p>
                </div>
                <div class="info-item">
                    <h2><i class="fad fa-comments"></i> Discuss</h2>
                    <p>
                        Engage in discussion with other people from all around the world about things that interest you!
                        Use our forum to start a discussion about anything photography related or delve into the comment
                        sections of photos that interest you.
                    </p>
                </div>
            </div>
        </div>
        <home-footer/>
    </main>
</template>

<script>
import HomeFooter from "../components/home-footer";
export default {
    name: 'Home',
    components: {HomeFooter},
    data() {
        return {
            photos: ['1', '2', '3', '4'],
            index: 2,
        }
    },
    methods: {

    },
    layout: 'home'
}
</script>

<style>
    html {
        font-family: 'Raleway', sans-serif;
    }

    .home {
        height: 60px;
    }

    .slider-contain {
        position: relative;

    }

    .slider-contain img {
        width: 100vw;
        height: auto;

    }

    .on-top-image {
        position: absolute;
        top: 35%;
        left: 47%;
        width: 260px;
    }

    .main-logo {
        font-family: "Raleway", sans-serif;
        font-size: 100px;
        font-weight: 700;
        color: white;
        position: absolute;
    }

    .logo-gradient {
        background: -webkit-linear-gradient(left, #14984c, #5d0e62, #cd0b0b, yellow);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        top: 6px;
        left: 6px;
    }

    .logo-cont {
        transform: translate(-50%, -50%);
        position: relative;
        width: 260px;
        height: 122px;
    }

    .logo-lead {
        position: absolute;
        color: #f5f5f5;
        font-size: 20px;
        font-weight: 700;
        bottom: -35px;
        left: 22px;
        text-align: center;
        text-shadow: 0px 0px 4px #3c3c3c;
    }

    .content-container {
        margin-left: 300px;
        margin-right: 300px;
        margin-top: 2rem;
    }

    .home-info-row {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-between;
    }

    .info-item {
        text-align: center;
        margin-left: 2rem;
        margin-right: 2rem;
    }

    .info-item h2 {
        font-size: 30px;
        font-weight: normal;
        margin-bottom: 1.4rem;
    }

    .info-item p {
        font-size: 17px;
        color: #6d6d6d;
    }

    h2 i {
        color: #1B3151;
        margin-right: .4rem;
        font-size: 34px;
    }

    .on-top-image-buttons {
        position: absolute;
        top: 75%;
        left: 50%;
    }

    .home-btn-row {
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: row;
    }

    .home-btn-row .my-btn {
        width: 142px;
        margin-right: 5.6rem;
        -webkit-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.65);
        box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.65);
        background: rgb(32,62,105);
        background: linear-gradient(355deg, rgba(32,62,105,1) 0%, rgba(56,91,142,1) 100%);
    }

    .home-btn-row .my-btn:hover {
        background: rgb(27,56,97);
        background: linear-gradient(355deg, rgba(27,56,97,1) 0%, rgba(43,77,124,1) 100%);
    }

    @media only screen and (max-width: 1440px) {

        .content-container {
            margin-left: 170px;
            margin-right: 170px;
            margin-top: 1.4rem;
        }
    }

    @media only screen and (max-width: 440px) {
        .content-container {
            margin-left: 40px;
            margin-right: 40px;
            margin-top: 1rem;
        }

        .slider-contain img {
            width: auto;
            height: 400px;

        }

        .main-home {
            width: 100%;
            overflow-x: hidden;
        }

        .home {
            height: 30px;
        }

        .main-logo {
            font-size: 80px;
        }

        .home-info-row {
            flex-direction: column;
        }

        .info-item {
            margin-bottom: 1rem;
        }

        .on-top-image-buttons {
            position: absolute;
            top: 75%;
            left: 56%;
        }

        .home-btn-row .my-btn {
            width: 90px;
            margin-right: 3rem;
        }

        .my-btn-large {
            font-size: 17px;
            min-height: 40px;
            max-height: 40px
        }

        .on-top-image {
            position: absolute;
            top: 35%;
            left: 53%;
            width: 260px;
        }

        .logo-lead {
            left: 0;
        }
    }

</style>
