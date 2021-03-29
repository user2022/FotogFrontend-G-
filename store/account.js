export const state = () => ({
    showUploadProfile: false,
    filePrev: '',
    profile: {}
});

export const getters = {
    getShowUpload(state) {
        return state.showUploadProfile;
    },
    getFilePrev(state) {
        return state.filePrev;
    },
    getProfile(state) {
        return state.profile;
    }
}

export const actions = {
    toggleShowUpload({commit}, bol) {
        commit('SET_TOGGLE', bol);
    },
    setFilePrev({commit}, value) {
        commit('SET_FILE', value);
    },
    async getProfile({commit}, {username, error}) {
        try {
            let response = await this.$axios.$get(`/api/profile/${username}`);
            commit('SET_PROFILE', response.user);
        } catch(err) {
            return error({statusCode: err.response.status, message: err.response.statusText});
        }
    },
    async updateProfileImage({commit}, value) {
        try {

        } catch(err) {

        }
    }
}

export const mutations = {
    SET_TOGGLE(state, bol) {
        state.showUploadProfile = bol;
    },
    SET_FILE(state, value) {
        state.filePrev = value;
    },
    SET_PROFILE(state, value) {
        state.profile = value;
    }
}
