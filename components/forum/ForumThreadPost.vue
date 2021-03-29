<template>
    <main>
        <div class="post-box">
            <div class="message" v-html="thread.message"></div>
        </div>
    </main>
</template>

<script>
export default {
    name: "ForumThreadPost",
    props: ['thread']
}
</script>

<style scoped>
main {
    margin-left: 1rem;
    width: 100%;
}

.poster-cont {
    margin-left: .3rem;
}

.post-box {
    padding-top: .5rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    width: 100%;
}

.user-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.user-time {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.avatar-x-small {
    margin-right: .3rem;
    width: 40px;
    height: 40px;
}

.username {
    margin-right: .2rem;
}

.username {
    font-weight: 600;
}


.rank-row {
    margin-left: .3rem;
    align-self: flex-start;
}

.message {
    font-size: 14px;
    margin-top: 1.2rem;
    padding: 0 .3rem;
}

.smaller {
    margin-top: .2rem;
}
</style>
