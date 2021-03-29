<template>
    <main>
        <h1 class="page-header">Upload Photo</h1>
        <hr>
        <div class="upload-form">
            <div class="input-container">
                <label for="fileBtn" class="fileBtn">
                    <input id="fileBtn" type="file" accept="image/*" @change="onFileSelected" />
                    <div class="file-inner-flex">
                        <i class="fad fa-upload file-inner-icon"></i> <br>
                        <span class="file-inner-txt">Drop your image here, or click to browse</span>
                        <p class="img-prev-name" v-if="selectedFile">{{selectedFile.name}}</p>
                        <p v-if="sizeError" class="error-text">File size too big</p>
                        <p v-if="typeError" class="error-text">Invalid file type, only images are accepted</p>
                    </div>
                </label>
            </div>
            <img :src="filePrev" class="img-prev" ref="image">
            <img :src="filePrev2">

            <div class="input-container">
                <input type="text" v-model="title" placeholder="Enter a title..." class="my-input my-input-large i-background i-normal">
            </div>

            <div class="input-container">
                <p class="info-txt">Add tags related to your photo to make it more searchable! (10 tags maximum)</p>
                <vue-tags-input
                        placeholder="Add Tags"
                        :max-tags="10"
                        :add-on-key="[13, ',', ';']"
                        v-model="tag"
                        :tags="tags"
                        @tags-changed="newTags => formatTags(newTags)"
                />
            </div>

            <button class="my-btn my-btn-primary my-btn-fill my-btn-large" @click="addPhoto">
                <span v-if="!uploading">Upload</span>
                <span v-else>Uploading...</span>
            </button>

        </div>
    </main>
</template>

<script>
    import VueTagsInput from '@johmun/vue-tags-input';
    import imageCompression from 'browser-image-compression'; // for compressing images to smaller file sizes

    export default {
        name: "upload",
        middleware: 'auth',
        comments: {
          VueTagsInput
        },
        data() {
            return {
                error: false,
                sizeError: false,
                typeError: false,

                tag: '',
                tags: [],
                keywords: [],

                title: '',

                selectedFile: null,

                fileName: '',
                filePrev: null,

                filePrev2: '',

                uploading: false,
            }
        },
        methods: {
            onFileSelected(e) {
                this.selectedFile = e.target.files[0];
                console.log(this.selectedFile);
                this.fileName = e.target.files[0].name;
                this.filePrev = URL.createObjectURL(this.selectedFile); // Get URL to display as preview

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
            async addPhoto() {
                try {
                    if (this.$auth.loggedIn) {

                        const options = { // Options for image compressor
                            maxSizeMB: 1,
                            maxWidthOrHeight: 500
                        }

                        this.uploading = true;

                        let image = await imageCompression(this.selectedFile, options); // Compressing the game

                        let data = new FormData();
                        data.append('title', this.title);
                        data.append('user', this.$auth.user._id);
                        data.append('keywords', this.keywords);
                        // First parameter is name of property, second is the file, third is the name it will be saved as
                        data.append('image', this.selectedFile, this.selectedFile.name); // Saving non-compressed image
                        data.append('compressed_img', image, 'compressed_' + image.name) // Saving compressed image

                        let response = await this.$axios.$post('/api/photo', data);

                        await this.$router.push(`/explore/${response.url_id}`);
                    }
                } catch(err) {
                    console.log(err.message);
                }
            },
            formatTags(tags) {
                this.keywords = tags.map(interest => interest.text);
            },


            // onFileDrop(e) {
            //     e.stopPropagation();
            //     this.selectedFile = e.dataTransfer.files[0];
            //     let dt = new DataTransfer();
            //     dt.items.add(e.dataTransfer.files[0])
            // }
        },
    }
</script>

<style scoped>
    h3 {
        font-size: 26px;
        margin: 0 .2rem .2rem 0;
    }

    #fileBtn {
        display: none;
    }

    .img-prev {
        width: auto;
        height: auto;
        max-width: 300px;
        max-height: 300px;
    }

    .img-upload-flex {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .info-txt {
        margin: 0 0 .2rem .5rem;
    }




</style>
