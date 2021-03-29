<template>
    <div>
        <div class="comment">
            <p>{{comment.message}}</p>
            <hr>
            <p class="posted">
                <span class="date date-small">posted in</span>
                <NuxtLink class="my-url" :to="`/explore/${comment.photo.id}`">{{comment.photo.title}}</NuxtLink>
                <span class="date date-small"> {{$moment(comment.created_at).calendar()}}</span>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "comment-view",
    props: ['comment']
}
</script>

<style scoped>
    .comment {
        background-color: #e2e2ee;
        padding: 8px 14px;
        margin-bottom: 1rem;
    }

    .help {

    }

    .posted {
        font-size: 12px;
    }

    .date-small {
        font-size: 11px;
    }

    hr {
        margin: 7px 0;
    }
</style>
