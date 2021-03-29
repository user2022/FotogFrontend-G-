
export const state = () => ({
    users: [],
    roles: [],
    posts: []
});

export const getters = {
    allUsers(state) {
        return state.users;
    },
    allRoles(state) {
        return state.roles;
    },
    allPosts(state) {
        return state.posts;
    }
}

export const actions = {
    // GET :: Gets all users
    async getUsers({commit}, {error}) {
        try {
            let response = await this.$axios.$get('/api/admin/users');
            commit('SET_USERS', response.users);
        } catch(err) {
            error({statusCode: err.statusCode, message: 'Problems with our server'});
        }
    },
    // GET :: Get all roles
    async getRoles({commit}, {error}) {
        try {
            let response = await this.$axios.$get('/api/role');
            commit('SET_ROLES', response.roles);
        } catch(err) {
            error({statusCode: err.statusCode, message: 'Problems with our server'});
        }
    },
    // UPDATE :: update a users role
    async updateUserRole({commit}, {user, data}) {
        try {
            let role = {role: data._id};
            await this.$axios.$put(`/api/admin/role/user/${user._id}`, role);
            commit('UPDATE_USER_ROLE', {user: user, data: data})
        } catch(err) {
            console.log(err.message);
        }
    },
    // POST :: Create a new role
    async createRole({commit}, {data}) {
        try {
            await this.$axios.$post('/api/role', data);
            commit('SET_ROLE', data);
        } catch(err) {
            console.log(err.message);
        }
    },
    // PUT :: Update an existing role
    async updateRole({commit}, {data, id}) {
        try {
            await this.$axios.$put(`/api/role/${id}`, data);
            commit('UPDATE_ROLE', {data: data, id: id});
        } catch(err) {
            console.log(err.message);
        }
    },
    // GET :: Get all forum posts
    async getPosts({commit}, {error}) {
        try {
            let response = await this.$axios.$get('/api/admin/forumPosts');
            commit('SET_POSTS', response.posts);
        } catch(err) {
            error({statusCode: err.statusCode, message: 'Problems with our server'});
        }
    },
}

export const mutations = {
    SET_USERS(state, data) {
        state.users = data;
    },
    SET_ROLES(state, data) {
        state.roles = data;
    },
    UPDATE_USER_ROLE(state, {user, data}) {
        let fUser = state.users.find(User => User._id === user._id);
        fUser.role = data;
    },
    SET_ROLE(state, data) {
        state.roles.push(data);
    },
    UPDATE_ROLE(state, {data, id}) {
        let fRole = state.roles.find(Role => Role._id === id);
        fRole.roleName = data.roleName;
        fRole.power = data.power;
        fRole.bgCol = data.bgCol;
        fRole.textCol = data.textCol;
    },
    SET_POSTS(state, data) {
        state.posts = data;
    }
}
