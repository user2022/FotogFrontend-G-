<template>
    <div>
        <div v-for="item in filter">
            <slot :item="item"></slot> <!-- Here I will pass through the component I wanted iterated -->
        </div> <!-- slot allows me to place html inside of the component when I use it in the parent, to use the item value inside my slot I set :item to item -->

        <div class="buttons" v-if="dataLength > perPage" ref="nav"> <!-- Only display the navigation if there is more data than the per page amount -->
            <button class="pag-button" :disabled="curPage === 1" @click="navigate(-curPage+1)">1</button>
            <button class="pag-button">...</button>

            <button class="pag-button" v-if="curPage >= 3" @click="navigate(-2)">{{curPage-2}}</button>
            <button class="pag-button" v-if="curPage >= 2" @click="navigate(-1)">{{curPage-1}}</button>
            <button class="pag-button cur-page" @click="navigate(0)">{{curPage}}</button>
            <button class="pag-button" v-if="checker(1)" @click="navigate(1)">{{curPage+1}}</button>
            <button class="pag-button" v-if="checker(2)" @click="navigate(2)">{{curPage+2}}</button>

            <button class="pag-button">...</button>
            <button :disabled="curPage === pageNum" class="pag-button" @click="navigate(pageNum)">{{pageNum}}</button>

            <!--
             <i class="fas fa-chevron-double-right"></i>
             <i class="fas fa-chevron-double-left"></i>
             -->

        </div>
    </div>
</template>

<script>
import CommentView from "./main/comment-view";
export default {
    name: "paginate",
    components: {CommentView},
    props: {
        dataLength: {required: true},
        perPage: {required: true, type: Number},
        data: {required: true}
    },
    data() {
        return {
            curPage: 1
        }
    },
    computed: {
        pageNum() {
            return Math.ceil(this.dataLength / this.perPage);
        },
        filter() { // Slices the array by getting the current page (arrays start at 0 so taking away 1) and *'ing it by per page
            // if curPage = 0, 0 * perPage = 0, 0 + 7 = 7 so it will slice starting from 0 to 7
            return this.data.slice((this.curPage-1) * this.perPage, (this.curPage-1) * this.perPage + this.perPage);
        }
    },
    methods: {
        // Navigate pages
        navigate(num) {
            this.curPage = this.curPage + num;

            if (this.curPage > this.pageNum) this.curPage = this.pageNum;

            if (this.$route.query.d) {
                this.$router.push(`${this.$route.path}?d=${this.$route.query.d}&page=${this.curPage}`);
            } else {
                this.$router.push(`${this.$route.path}?page=${this.curPage}`)
            }



        },
        // Checker for whether to display pagination buttons or not
        checker(val) { // If the val is within 1 or 2 numbers of the pageNum return false
            if (this.curPage +val > this.pageNum) {
                return false;
            } else if (this.curPage +val <= this.pageNum) {
                return true;
            }
        },
    }
}
</script>

<style scoped>
    .buttons {
        display: flex;
        flex-direction: row;
        margin-top: .9rem;
    }

    .pag-button {
        background-color: #203e69;
        color: #cad1e7;

        padding: 0 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 30px;
        max-height: 30px;
        cursor: pointer;
        font-size: 13px;
        font-family: "Roboto", sans-serif;
        font-weight: 600;
        white-space: nowrap;
        outline:none;

        border-left: 1px solid #30496e;
    }

    .pag-button:first-child {
        border-radius: 5px 0 0 5px;
    }

    .pag-button:last-child {
        border-radius: 0 5px 5px 0;
    }

    .pag-button:hover {
        background-color: #1c457e;
    }

    .pag-button:focus {
        outline: 0;
    }

    .pag-button:disabled {
        background-color: #4b6186;
        cursor: default;
    }

    .cur-page {
        background-color: #2D7EB6;
    }

    .cur-page:hover {
        background-color: #2D7EB6;
    }


</style>

