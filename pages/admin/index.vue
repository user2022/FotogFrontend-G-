<template>
    <main>
        <div class="a-header">
            <h1>Dashboard</h1>
        </div>
    </main>
</template>

<script>
import UserChart from "../../components/admin/userChart";
export default {
    name: "Dashboard",
    components: {UserChart},
    layout: 'admin'
}
</script>

<style scoped>

</style>
