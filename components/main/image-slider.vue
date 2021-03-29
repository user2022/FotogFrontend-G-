<template>
    <div>
        <div class="slider-contain">
            <img :src="require(`~/assets/images/${photos[index]}.jpg`)" alt="home">
            <div>
                <div class="on-top-image">

                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: "image-slider",
    data() {
        return {
            photos: ['1', '2', '3', '4'],
            index: 2,
        }
    },
}
</script>

<style scoped>

</style>
