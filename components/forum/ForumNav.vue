<template>
    <main>
        <div class="flex-col" v-for="item in nav">
            <h2>{{ item.name }}</h2>
            <div class="line"></div>
            <div class="topic-list" v-for="topic in item.topics">
                <NuxtLink :to="{query: {topic: topic.id}}">
                    <p class="topic-list-p" :class="{'topic-list-active': $route.query.topic === topic.id}" @click="emitValue(topic.id)">{{topic.name}}</p>
                </NuxtLink>
            </div>
        </div>
    </main>
</template>

<script>
    export default {
        name: "ForumNav",
        props: ['nav'],
        methods: {
            emitValue(id) {
                this.$emit('topic-change', id);
            }
        }
    }
</script>

<style scoped>
  /* forum-lists.css */
</style>
