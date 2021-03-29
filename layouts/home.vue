<template>
    <div>
        <nav-main/>
        <div >
            <Nuxt/>
        </div>
    </div>
</template>

<script>
import ImageSlider from "../components/main/image-slider";
import NavMain from "../components/nav/nav-main";
export default {
name: "home-layout",
    components: {NavMain, ImageSlider}
}
</script>

<style scoped>

</style>
