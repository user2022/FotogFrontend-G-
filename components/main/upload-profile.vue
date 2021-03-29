<template>
    <div class="position" @click.self="closeComponent"> <!-- .self checks if the @click is on the actual element and won't activate on clicking child elements -->
        <div class="img-prev-cont">
            <div class="img-prev-wrap">
                <div class="x-btn">
                    <button class="my-btn my-btn-primary my-btn-circle" @click="closeComponent"><i class="far fa-times"></i></button>
                </div>
                <div class="img-preview" >
                    <!-- cropper component -->
                    <cropper
                            :src="filePrev"
                            :stencil-props="{
		                            handlers: {},
		                            movable: false,
		                            scalable: false,
		                            aspectRatio: 1,
	                            }"
                            :resize-image="{adjustStencil: false}"
                            ref="cropper"
                            image-restriction="stencil"
                            :stencil-size="{width: 300, height: 300}"
                            stencil-component="circle-stencil"
                            @change="onChange"
                            classname="test"
                    />
                    <div class="position-btn">
                        <button class="my-btn my-btn-primary avatar-shadow" @click="zoomIn"><i class="far fa-search-plus"></i></button>
                        <button class="my-btn my-btn-primary avatar-shadow" @click="zoomOut"><i class="far fa-search-minus"></i></button>
                    </div>
                </div>
                <!-- Avatar previews to be shown in each size -->
                <div class="preview-row">
                    <div class="preview-circle">
                        <img :src="image" class="avatar-small avatar-shadow">
                    </div>
                    <div class="preview-circle">
                        <img :src="image" class="avatar-x-medium avatar-shadow">
                    </div>
                    <div class="preview-circle">
                        <img :src="image" class="avatar-x-large avatar-shadow">
                    </div>
                    <div class="preview-circle">
                        <img :src="image" class="avatar-huge avatar-shadow">
                    </div>
                </div>
            </div>
            <button class="my-btn my-btn-primary my-btn-fill margin" @click="submitPhoto">{{btnText}}</button>
        </div>
    </div>
</template>

<script>
    // Image cropper so the profile image is saved in the right size and also allows the user to modify before uploading
    import { Cropper, CircleStencil } from 'vue-advanced-cropper'
    import 'vue-advanced-cropper/dist/style.css';
    // https://norserium.github.io/vue-advanced-cropper/guides/ // Documentation

    export default {
        name: "upload-profile",
        comments: {Cropper, CircleStencil},
        data() {
            return {
                image: '', // Image url once it's been edited, this is for the previews
                btnText: 'Submit',

                coordinates: { // Updates the coordinates of where the image has been moved
                    width: 0,
                    height: 0,
                    left: 0,
                    top: 0,
                }
            }
        },
        methods: {
            // When the image has been modified, the coordinates + image url will be updated to display the new one
            onChange({ coordinates, canvas, }) {
                this.coordinates = coordinates; // Getting the new coordinates
                this.image = canvas.toDataURL(); // Setting the URL to this.image so it can be previewed
            },
            // Zoom in by .5
            zoomIn() {
                this.$refs.cropper.zoom(1.5);
            },
            // Zoom out by .5
            zoomOut() {
                this.$refs.cropper.zoom(0.5);
            },
            // Closes this component
            closeComponent() {
                this.$store.dispatch('account/toggleShowUpload', false);
            },
            // Uploading the new profile image
            submitPhoto() {
                if (this.$auth.loggedIn) { // Check if user's logged in
                    const { canvas } = this.$refs.cropper.getResult(); // Gets the new image
                    if (canvas) { // If it exists
                        let data = new FormData(); // Creating a new FormData object as they can hold images
                        canvas.toBlob(async (blob) => {
                            try {
                                // Appending the new image + a file name that will contain username + the date to keep it unique to the FormData object
                                data.append('profileImg', blob, this.$auth.user.username + Date.now().toString());
                                console.log(blob);
                                this.btnText = 'Uploading...'; // Setting button text to show it is uploading
                                // Using put as I am updating an existing value, passing through the formData object that contains updated image as parameter
                                let response = await this.$axios.$put(`/api/user/${this.$auth.user._id}`, data);
                                if (response.success === true) {
                                    this.btnText = 'Setting new profile picture...';
                                    // Fetches the user's data from the API so it can update the profile image without the user having to refresh
                                    await this.$auth.fetchUser();
                                    this.btnText = 'Complete'; // Showing the process is now complete
                                    // this.$store.dispatch('account/toggleShowUpload', false);
                                } else {
                                    console.log('Error');
                                    this.btnText = 'Upload failed';
                                }
                            } catch(err) {
                                console.log(err);
                            }
                        }, 'image/jpeg'); // Making the type to jpeg since it has less size than png
                    }
                } else { // User not logged in
                    console.log('Error');
                }
            }
        },
        computed: {
            // Getting the image URL which is the image the user is trying to upload
            filePrev() {
                return this.$store.getters['account/getFilePrev'];
            }
        }
    }
</script>

<style scoped>
    .position {
        position: fixed;
        width: 100vw;
        height: 100vh;
        z-index: 1000;
        background-color: rgba(0, 0, 0, 0.73);
    }

    /* Cropper */
    .img-preview {
        max-height: 500px;
        max-width: 500px;
        width: 530px;
        height: 320px;
        position: relative;
    }

    .position-btn {
        position: absolute;
        top: 20px;
        left: 15px;
        display: flex;
        flex-direction: column;
    }

    .position-btn .my-btn {
        margin-bottom: .6rem;
    }

    .img-prev-cont {
        width: 540px;
        height: 602px;
        padding: 20px;
        border-radius: 10px;
        background-color: #dddddd;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -301px; /* Negative half of height. */
        margin-left: -350px;
    }

    .margin {
        margin-top: 1.2rem;
    }

    .preview-row {
        margin-top: 1rem;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .preview-circle {
        margin-right: 1.6rem;
    }

    .img-prev-wrap {
        position: relative;
    }

    .x-btn {
        position: absolute;
        top: -30px;
        right: -44px;
    }
</style>
