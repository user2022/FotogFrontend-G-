<template>
    <div style="margin: auto; width: 100%">
        <div class="lds-dual-ring"></div>
    </div>
</template>

<script>
export default {
name: "loader"
}
</script>

<style scoped>
.lds-dual-ring {
    display: inline-block;
    height: 80px;
    width: 100%;

}

.lds-dual-ring:after {
    content: " ";
    display: block;
    width: 40px;
    height: 40px;
    margin: 3.5rem auto auto auto;
    border-radius: 50%;
    border: 5px solid #2d7eb6;
    border-color: #2d7eb6 transparent #2d7eb6 transparent;
    animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

</style>
