<template>
    <div class="footer">
        <div class="f-row">
            <div class="f-first">
                <p class="logo-text">fotog.</p>
                <div class="socials">
                    <i class="fab fa-facebook-square"></i>
                    <i class="fab fa-twitter"></i>
                </div>
            </div>
           <div class="list-row">
               <div class="f-list">
                   <div class="f-header">
                       Community
                   </div>
                   <div class="f-items">
                       <p>Forums</p>
                       <p>Upload</p>
                       <p>Explore</p>
                   </div>
               </div>
               <div class="f-list">
                   <div class="f-header">
                       Share
                   </div>
                   <div class="f-items">
                       <p>Upload</p>
                   </div>
               </div>
               <div class="f-list">
                   <div class="f-header">
                       Help
                   </div>
                   <div class="f-items">
                       <p>Contact Us</p>
                       <p>Terms of Service</p>
                   </div>
               </div>
           </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "homefooter"
}
</script>

<style scoped>
    .footer {
        background-color: #1B3151;
        padding: 80px 160px;
        margin-top: 120px;
    }

    .logo-text {
        font-family: "Raleway", sans-serif;
        font-size: 40px;
        font-weight: 700;
        color: #cad1e7;
    }

    .f-row {
        display: flex;
        flex-direction: row;
    }

    .socials {
        margin-top: 1.9rem;
    }

    .socials i {
        color: white;
        font-size: 20px;
        margin-right: .9rem;
        cursor: pointer;
    }

    .f-list {
        margin-left: 10rem;
    }

    .list-row {
        display: flex;
        flex-direction: row;
        margin-left: 10rem;
        width: 100%;
    }

    .f-header {
        font-size: 20px;
        font-weight: bolder;
        color: #2D7EB6;
        margin-bottom: .7rem;
    }

    .f-items p {
        color: #cad1e7;
        font-size: 12px;
        cursor: pointer;
    }

    @media only screen and (max-width: 440px) {
        .footer {
            padding: 10px 50px;
            margin-top: 70px;
        }

        .f-list {
            margin-left: 0;
            margin-right: 2rem;
        }

        .list-row {
            margin-left: 0;
        }

        .f-row {
            flex-direction: column-reverse;
        }

        .f-header {
            font-size: 16px;
        }
    }


</style>
