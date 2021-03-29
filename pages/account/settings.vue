<template>
    <main>
        <div class="f-header">
            <p class="forum-header">Account Settings</p>
            <p class="lead">Make changes to your account</p>
        </div>
        <hr>
        <h2>Account</h2>
        <section class="sec-con">
            <div class="avatar-cont">
                <img class="avatar-huge avatar-shadow hover" :src="$auth.user.profileImg" :alt="$auth.user.username"/>

                <div class="upload-btn">
                    <label for="fileBtn">
                        <input id="fileBtn" type="file" accept="image/*" @change="onFileSelected">
                        <span class="my-btn my-btn-primary">Upload New Profile Picture</span>
                    </label>
                </div>
            </div>

            <hr>

            <div class="account-details-cont">
                <div class="input-container">
                    <div class="label-row">
                        <p class="label">Username</p>
<!--                        <p class="label label-right">Are you sure?</p>-->
                    </div>
                    <div class="input-row">
                        <input type="text" class="my-input i-white i-normal" :placeholder="$auth.user.username">
                        <button class="my-btn my-btn-primary">Update</button>
<!--                        <div class="inner-btn-row">-->
<!--                            <button class="my-btn my-btn-success">Yes</button>-->
<!--                            <button class="my-btn my-btn-danger">No</button>-->
<!--                        </div>-->
                    </div>
                </div>
            </div>
        </section>

        <h2>Security</h2>
        <section class="sec-con">
            <div class="input-container">
                <div class="label-row">
                    <p class="label">Email</p>
                    <!--                        <p class="label label-right">Are you sure?</p>-->
                </div>
                <div class="input-row">
                    <input type="text" class="my-input i-white i-normal" :placeholder="$auth.user.email">
                    <button class="my-btn my-btn-primary">Update</button>
                    <!--                        <div class="inner-btn-row">-->
                    <!--                            <button class="my-btn my-btn-success">Yes</button>-->
                    <!--                            <button class="my-btn my-btn-danger">No</button>-->
                    <!--                        </div>-->
                </div>
            </div>
            <hr>
            <!-- Change password section -->
            <div class="input-container">
                <p class="label">Password</p>
                <input type="password" class="my-input i-white i-normal" placeholder="Enter Current password">
            </div>
            <div class="input-container" style="margin-top: 2rem">
                <input type="password" class="my-input i-white i-normal" placeholder="Enter New Password">
            </div>
            <div class="input-container" style="margin-top: -.5rem">
                <div class="input-row">
                    <input type="password" class="my-input i-white i-normal" placeholder="Confirm New Password">
                    <button class="my-btn my-btn-primary">Update</button>
                    <!--
                     <div class="inner-btn-row">
                        <button class="my-btn my-btn-success">Yes</button>
                        <button class="my-btn my-btn-danger">No</button>
                    </div>
                     -->
                </div>
            </div>
        </section>

        <h2>General</h2>
        <section class="sec-con">
            <div class="input-container">
                <p class="label">Location</p>
                <div class="input-row">
                    <input type="text" class="my-input i-white i-normal">
                    <button class="my-btn my-btn-primary">Update</button>
                </div>
            </div>
            <div class="input-container">
                <p class="label">Biography</p>
                <div class="input-row">
                    <textarea class="my-textarea" rows="4"></textarea>
                    <button class="my-btn my-btn-primary">Update</button>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
    import UploadProfile from "../../components/main/upload-profile";
    export default {
        name: "user-settings",
        components: {UploadProfile},
        data() {
            return {
                filePrev: '',
                selectedFile: null,
                fileName: '',

                showEditor: false

            }
        },
        methods: {
            onFileSelected(e) {
                this.selectedFile = e.target.files[0];
                console.log(this.selectedFile);
                this.fileName = e.target.files[0].name;
                this.filePrev = URL.createObjectURL(this.selectedFile); // Get URL to display as preview

                this.$store.dispatch('account/setFilePrev', this.filePrev);
                this.$store.dispatch('account/toggleShowUpload', true);

                // Image validation, checking for below 4MBs in size and if the file is an image
                if (this.selectedFile.size > 4 * 1024 *1024) {
                    this.error = true;
                    this.sizeError = true;
                } else if (!this.selectedFile.name.match(/.(jpg|jpeg|png|gif)$/i)) {
                    this.typeError = true;
                    this.error = true;
                } else {
                    this.error = false;
                    this.typeError = false;
                    this.sizeError = false;
                }
            },

        },

    }
</script>

<style scoped>
    /* */

    h2 {
        font-size: 24px;
        margin-bottom: .4rem;
    }

    .avatar-cont {
        display: flex;
        flex-direction: column;

    }

    .avatar-x-large {
        margin-right: 2rem;

    }

    #fileBtn {
        display: none;
    }

    .img {
        width: 90px;
        height: 90px;
        border-radius: 50%;
    }

    .upload-btn {
      margin-top: .8rem;
    }

    input {
      width: 45%;
    }

    textarea {
        width: 45%;
    }

    .input-row {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        justify-content: space-between;

    }

    .inner-btn-row {
        display: flex;
        flex-direction: row;
    }

    .inner-btn-row .my-btn {

    }

    .label-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .label-right {
        margin-right: 1.2rem;
    }




</style>
