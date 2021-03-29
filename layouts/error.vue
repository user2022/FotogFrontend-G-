<template>
    <div>
        <div v-if="error.statusCode === 404"> <!-- Page not found -->
            <div class="err-page-cont">
                <h2>Error {{error.statusCode}}</h2>
                <i class="fas fa-question err-icon"></i>
                <p>{{ error.message }}</p>
            </div>
        </div>
        <div v-else-if="error.statusCode === 500"> <!-- Server error -->
            <div class="err-page-cont">
                <h2>Error {{error.statusCode}}</h2>
                <i class="fal fa-user-robot err-icon"></i>
                <p>{{error.message}}</p>
            </div>
        </div>
        <div v-else-if="error.statusCode === 403"> <!-- Not authorized -->
            <div class="err-page-cont">
                <h2>Error {{error.statusCode}}</h2>
                <i class="far fa-lock-alt err-icon"></i>
                <p>{{error.message}}</p>
            </div>
        </div>
        <div v-else>
            <div class="err-page-cont">
                <h2>Error {{error.statusCode}}</h2>
                <i class="fal fa-user-robot err-icon"></i>
                <p>{{error.message}}</p>
            </div>
        </div>
        <button class="my-btn my-btn-secondary back-btn my-btn-large" @click="$router.go(-1)">Go Back</button>
    </div>
</template>

<script>
    export default {
        name: "Error",
        props: ['error']
    }
</script>

<style scoped>
    .err-icon {
        font-size: 280px;
        color: #3b3b3b;
        font-weight: 100;
        margin-top: 2rem;
        margin-bottom: 2rem;
    }

    .err-page-cont {
        margin-top: 2.5rem;
        text-align: center;
    }

    .err-page-cont h2 {
        font-size: 36px;
        margin-bottom: .5rem;
        font-weight: normal;
    }

    .error-img {
        max-width: 250px;
        height: auto;
    }

    .my-btn {
        margin: auto;
        margin-top: 4rem;
    }

    .my-btn i {
        margin-right: 1rem;
    }
</style>
