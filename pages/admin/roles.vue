<template>
    <main>
        <div class="a-header">
            <h1>Roles</h1>
        </div>
        <div class="blob-container">
            <div class="a-blob-flex">
                <!-- LEFT PANEL , LIST AND CREATE -->
                <div class="left-panel">
                    <!-- LIST OF ROLES -->
                    <div class="a-blob">
                        <template v-if="roles">
                            <p class="a-blob-header">List of all roles</p>
                            <div class="role-flex" v-for="role in roles">
                                <div class="large-rank" :style="`backgroundColor:${role.bgCol};color:${role.textCol};`">{{role.roleName}}</div>
                                <button class="my-btn my-btn-secondary" @click="selectRole(role)">Select</button>
                            </div>
                        </template>
                    </div>
                    <!-- CREATE NEW ROLE -->
                    <div class="a-blob">
                        <p class="a-blob-header">Create a new role</p>
                        <p class="info-txt">Preview</p>
                        <div class="rank" :style="`backgroundColor:${newRole.bgCol};color:${newRole.textCol}`">{{newRole.roleName}}</div>
                        <div class="input-container">
                            <p class="info-txt">Enter a name</p>
                            <input type="text" class="my-input" v-model="newRole.roleName">
                        </div>

                        <div class="input-contain">
                            <p class="info-txt">
                                Enter a power level
                                <i class="fas fa-info-circle" v-b-tooltip.bottom="'0 = banned, 1 = member, 5+ = moderator, 10+ = admin'"></i>
                            </p>
                            <input type="number" class="my-input my-input-select" v-model="newRole.power">
                        </div>
                        <div class="input-container">
                            <p class="info-txt">Background Colour, use the colour picker tool below to assist you if needed.</p>
                            <input type="text" class="my-input" v-model="newRole.bgCol">
                        </div>
                        <div class="input-container">
                            <p class="info-txt">Text Colour</p>
                            <input type="text" class="my-input" v-model="newRole.textCol">
                        </div>
                        <hr>
                        <button class="my-btn my-btn-success" @click="createRole">Create</button>
                        <p class="error-text">{{nErrTxt}}</p>
                    </div>
                    <!-- Colour panel -->
                    <div class="a-blob a-blob-col">
                        <p class="a-blob-header">Colour selector tool</p>
                        <h2 class="col-header">{{colors.hex}}</h2>
                        <Sketch v-model="colors"/>
                        <p class="info-txt mt-1">Copy the hexcode into the input fields to use the selected colour</p>
                    </div>
                </div>
                <!-- RIGHT PANEL , SELECT & UPDATE -->
                <div class="right-panel">
                    <!-- SELECTED ROLE -->
                    <div class="a-blob">
                        <template v-if="selRole">
                            <div class="a-role-info">
                                <p class="a-blob-header">Selected Role</p>
                                <div class="rank" :style="`backgroundColor:${selRole.bgCol};color:${selRole.textCol};`">{{selRole.roleName}}</div>
                                <p class="power-display"><span class="power">Power</span> {{selRole.power}}</p>
                                <div class="flex-row">
                                    <div class="col-preview" :style="`backgroundColor:${selRole.bgCol};`"></div>
                                    <p>Background Colour</p>
                                </div>
                                <div class="flex-row">
                                    <div class="col-preview" :style="`color:${selRole.textCol};`"></div>
                                    <p>Text Colour</p>
                                </div>
                                <hr>
                                <button class="my-btn my-btn-secondary" @click="update = true">Update</button>
                            </div>
                        </template>
                        <template v-else>
                            <div class="a-skeleton">
                                <p>No role currently selected</p>
                            </div>
                        </template>
                    </div>
                    <!-- UPDATE ROLE -->
                    <div class="a-blob" v-if="update">
                        <p class="a-blob-header">Update Role</p>
                        <div class="input-container">
                            <p class="info-txt">Role Name</p>
                            <input type="text" class="my-input" v-model="updatedRole.roleName">
                        </div>
                        <div class="input-container">
                            <p class="info-txt">Power level (10 and higher is for admins, 1 is for members (default power), 0 is for banned</p>
                            <input type="number" class="my-input my-input-select" v-model="updatedRole.power">
                        </div>
                        <div class="input-container">
                            <p class="info-txt">Background Colour, use the colour picker tool below to assist you if needed.</p>
                            <input type="text" class="my-input" v-model="updatedRole.bgCol">
                        </div>
                        <div class="input-container">
                            <p class="info-txt">Text Colour</p>
                            <input type="text" class="my-input" v-model="updatedRole.textCol">
                        </div>
                        <hr>
                        <div class="a-btn-row">
                            <button class="my-btn my-btn-success" @click="updateRole">Update</button>
                            <button class="my-btn my-btn-danger" @click="cancelUpdate">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { Sketch } from 'vue-color';

export default {
    name: "admin-roles",
    layout: 'admin',
    components: {Sketch},
    data() {
        return {
            selRole: null,

            update: false,

            colors: {hex: '#FFFFFF'},

            updatedRole: {
                roleName: '',
                power: 0,
                bgCol: '',
                textCol: ''
            },

            nErrTxt: '',
            newRole: {
                roleName: 'Preview',
                power: 1,
                bgCol: '#2d7eb6',
                textCol: 'white'
            }
        }
    },
    methods: {
        async createRole() {
            try {
                await this.$store.dispatch('admin/createRole', {data: this.newRole});
            } catch(err) {
                this.nErrTxt = 'Problem with creating role'
            }
        },
        async updateRole() {
            try {
                await this.$store.dispatch('admin/updateRole', {data: this.updatedRole, id: this.selRole._id});
            } catch(err) {
                this.nErrTxt = 'Problem with updating role';
            }
        },
        selectRole(role) {
            this.selRole = role;
            this.updatedRole.roleName = role.roleName;
            this.updatedRole.power = role.power;
            this.updatedRole.bgCol = role.bgCol;
            this.updatedRole.textCol = role.textCol;
            this.update = false;
        },
        cancelUpdate() {
            this.update = false;
            this.roleName = '';
            this.power = 0;
            this.bgCol = '';
            this.textCol = '';
        },
    },
    computed: {
        roles() {
            return this.$store.getters['admin/allRoles'];
        }
    },
    async asyncData({store, error}) {
        await store.dispatch('admin/getRoles', {error: error});
    }
}
</script>

<style scoped>
    .large-rank {
        margin-bottom: .7rem;
    }

    .role-flex {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .col-preview {
        width: 20px;
        height: 20px;
        border-radius: 3px;
        margin-right: .5rem;
        -webkit-box-shadow: 0px 0px 2px 0px rgba(53,53,53,0.6);
        box-shadow: 0px 0px 2px 0px rgba(53,53,53,0.6);
    }
    .flex-row {
        margin-bottom: .5rem;
    }

    .power {
        font-weight: bold;
        font-size: 14px;
        margin-right: .3rem;
    }

    .power-display {
        margin-bottom: .4rem;
    }

    .rank {
        margin-bottom: .6rem;
        margin-left: 0;
    }
    .a-blob-col .info-txt, h2 {
        text-align: center;
    }

    .a-role-info .my-btn {
        margin-top: 1rem;
    }
    .info-txt {
        font-style: normal;
        margin-bottom: .2rem;
    }

    .my-input {
        font-weight: normal;
    }

    .input-container {
        margin-bottom: .7rem;
    }

    .info-txt span {
        color: #454545;
    }

    .col-header {
        margin-bottom: .7rem;
        font-weight: normal;
    }

    .vc-sketch {
        margin: auto;
    }
</style>
