<template>
    <main>
        <div class="a-header">
            <h1>Users</h1>
        </div>
        <div class="blob-container">
            <div class="a-blob-flex">
                <div class="left-panel">
                    <div class="a-blob">
                        <p class="a-blob-header">List of users</p>
                        <table class="a-table">
                            <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Registered</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="user in users">
                                <td>{{ user.username }}</td>
                                <td>{{user.email}}</td>
                                <td>{{ user.role.roleName }}</td>
                                <td>{{ $moment(user.created_at).format('DD/MM/Y') }}</td>
                                <td><button class="my-btn my-btn-secondary" @click="selectUser(user)">Select</button></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="right-panel">
                    <div class="a-blob">
                        <template v-if="selectedUser">
                            <div class="a-selected-info">
                                <p class="a-blob-header">Selected User</p>
                                <div class="a-sel-img">
                                    <img :src="selectedUser.profileImg" :alt="selectedUser.username" class="avatar-large">
                                </div>
                                <div class="a-select-row">
                                    <div class="rank"
                                         :style="`backgroundColor: ${selectedUser.role.bgCol}; color: ${selectedUser.role.textCol}`">{{selectedUser.role.roleName}}
                                    </div>
                                </div>
                                <div class="a-select-row">
                                    <p>{{selectedUser.username}}</p>
                                </div>
                                <div class="a-select-row">
                                    <p>{{selectedUser.email}}</p>
                                </div>
                                <div class="a-select-row">
                                    <p>{{selectedUser.firstName}} {{selectedUser.lastName}}</p>
                                </div>
                                <hr>
                                <div class="a-btn-row">
                                    <button class="my-btn my-btn-secondary" @click="update = true">Update</button>
                                    <button class="my-btn my-btn-danger">Ban</button>
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            <div class="a-skeleton">
                                <p>No user currently selected</p>
                            </div>
                        </template>
                    </div>
                    <template v-if="update">
                        <div class="a-blob a-blob-mt">
                            <p class="a-blob-header">Update User's role</p>
                            <p>Current Role</p>
                            <div class="rank"
                                 :style="`backgroundColor: ${selectedUser.role.bgCol}; color: ${selectedUser.role.textCol}`">{{selectedUser.role.roleName}}
                            </div>

                            <div class="input-container">
                                <select name="roles" id="roles" class="my-select" v-model="selectedRole">
                                    <option :value="null" disabled>Select a role</option>
                                    <option v-for="role in roles" :value="role">{{role.roleName}}</option>
                                </select>
                            </div>
                            <hr>
                            <div class="a-btn-row">
                                <button class="my-btn my-btn-success" @click="updateUserRole">Update</button>
                                <button class="my-btn my-btn-danger" @click="cancelUpdate">Cancel</button>
                            </div>

                        </div>
                    </template>
                </div>

            </div>
        </div>
    </main>
</template>

<script>
export default {
    name: "adminUsers",
    layout: 'admin',
    data() {
        return {
            selectedUser: null,

            update: false,

            selectedRole: null
        }
    },
    methods: {
        selectUser(user) {
            this.selectedUser = user;
            this.update = false;
            this.selectedRole = null;
        },
        async updateUserRole() {
            try {
                if (this.$auth.user.role.power <= 9 || this.$auth.loggedIn === false) return console.log('error');

                await this.$store.dispatch('admin/updateUserRole', {user: this.selectedUser, data: this.selectedRole});
            } catch(err) {
                console.log(err.message);
            }
        },
        cancelUpdate() {
            this.update = false;
            this.selectedRole = null;
        }
    },
    computed: {
        users() {
            return this.$store.getters['admin/allUsers'];
        },
        roles() {
            return this.$store.getters['admin/allRoles'];
        }
    },
    async asyncData({store, error}) {
        await store.dispatch('admin/getUsers', {error: error});
        await store.dispatch('admin/getRoles', {error: error});
    }
}
</script>

<style scoped>
    .blob-flex {
        display: flex;
        flex-direction: row;
    }

    .input-container {
        margin-top: .7rem;
    }
</style>
