<template>
    <div>
        <div class="nav-container">
            <div class="nav-bg"></div>
            <div class="nav-items">
                <div class="title-sec">
                    <NuxtLink to="/"><i class="fal fa-times"></i></NuxtLink>
                    <p class="logo-text">fotog.</p>
                </div>
                <div class="avatar-sec">
                    <img :src="$auth.user.profileImg" :alt="$auth.user.username" class="avatar-large">
                    <p>{{$auth.user.firstName}} {{$auth.user.lastName}}</p>
                </div>
                <NuxtLink to="/admin">
                    <div class="item-sec">
                        <p><i class="fas fa-home"></i> Dashboard</p>
                    </div>
                </NuxtLink>
                <NuxtLink to="/admin/users">
                    <div class="item-sec">
                        <p><i class="fas fa-users"></i> Users</p>
                    </div>
                </NuxtLink>
                <NuxtLink to="/admin/roles">
                    <div class="item-sec">
                        <p><i class="fas fa-badge-check"></i> Roles</p>
                    </div>
                </NuxtLink>
                <NuxtLink to="/admin/reports">
                    <div class="item-sec">
                        <p><i class="fas fa-flag-alt"></i> Reports</p>
                    </div>
                </NuxtLink>
                <NuxtLink to="/admin/photos">
                    <div class="item-sec">
                        <p><i class="fas fa-image"></i> Photos</p>
                    </div>
                </NuxtLink>
                <NuxtLink to="/admin/forums">
                    <div class="item-sec">
                        <p><i class="fas fa-comments-alt"></i> Forum</p>
                    </div>
                </NuxtLink>
                <div class="footer-sec">
                    <p>Admin Panel</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "admin-nav",
    layout: 'admin'
}
</script>

<style scoped>
    p {
        color: white;
    }

    .nav-container {
        height: 100vh;
        width: 280px;
        padding: 10px;
        background-image: url("~assets/images/adminbg1.jpg");
        position: fixed;
    }

    .nav-items {
        z-index: 3;
    }

    .logo-text {
        margin: 0 5px;
        color: white;
        font-family: "Raleway", sans-serif;
        font-size: 26px;
        font-weight: 400;
    }

    .title-sec {
        padding: 16px 16px;
        display: flex;
        flex-direction: row;
        align-items: center;

        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        margin-bottom: 1rem;
    }

    .logo-text {
        text-align: center;
    }

    .title-sec i {
        font-size: 24px;
        color: white;
        margin-right: 1.8rem;
    }

    .avatar-sec {
        padding: 0 20px 20px 20px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        margin-bottom: 1rem;
    }

    .avatar-sec img {
        margin: auto;
        display: block;
    }

    .avatar-sec p {
        text-align: center;
        letter-spacing: 1px;
        color: #dedede;
        margin-top: .5rem;
    }

    .item-sec p {
        color: #efefef;
    }

    .item-sec p i {
        margin-right: .9rem;
    }

    .item-sec {
        padding: 12px 16px;
        color: #efefef;
        font-weight: normal;
        letter-spacing: 2px;
        text-transform: uppercase;
        cursor: pointer;
        margin-bottom: .5rem;
    }


    .item-sec:hover {
        background-color: #2d7eb6;
        border-radius: 3px;
    }

    a.nuxt-link-exact-active .item-sec {
        background-color: #2d7eb6;
        border-radius: 3px;
    }

    .footer-sec {
        border-top: 1px solid rgba(255, 255, 255, 0.2);
        margin-top: 1rem;
        padding-top: .4rem;
    }

    .footer-sec p {
        text-align: center;
        font-size: 10px;
        font-style: italic;
        color: #b1b1b1;
    }
</style>
