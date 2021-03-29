export const state = () => ({
    categories: [], // A list of forum categories (e.g General, off-topic etc.)
    threads: [], // List of threads that have been created be users
    thread: {}, // A specific thread
    topicDetails: {}, // The details of the current topic
});

export const getters = {
    allCategories(state) {
        return state.categories;
    },
    getThreads(state) {
        return state.threads;
    },
    getThread(state) {
        return state.thread;
    },
    getTopicDetails(state) {
        return state.topicDetails;
    }

}

export const actions = {
    // GET REQUEST :: Gets the forum navigation (categories with list of topics) to display
    async getNav({commit}, {error}) {
        try {
            let response = await this.$axios.$get('/api/category');
            commit('SET_NAV', response.categories);
        } catch(err) {
            console.log(err);
        }
    },
    // GET REQUEST :: Gets a list of threads from all categories/topics and sorts them by most recent
    async getNewThreads({commit}) {
        try {
            let response = await this.$axios.$get('/api/topic');
            commit('SET_THREADS', response.topic);
        } catch(err) {
            console.log(err);
        }
    },
    // GET REQUEST :: Gets a list of threads that are related to a specific topic
    async getTopic({commit}, {id}) {
        try {
            let response = await this.$axios.$get(`/api/topic/${id}`);
            commit('SET_THREADS', response.topic.threads);
            commit('SET_TOPIC_DETAILS', response.topic);

        } catch(err) {
            console.log(err);
        }
    },
    // POST REQUEST :: Create a thread
    async createThread({commit}, {data}) {
        try {
            await this.$axios.$post(`/api/thread`, data);
            commit('SET_THREAD', data);
        } catch(err) {

        }
    },
    // GET REQUEST :: Gets one specific thread to display
    async getThread({commit}, {id, error}) {
        try {
            let response = await this.$axios.$get(`/api/thread/${id}`);
            commit('SET_THREAD', response.thread);
        } catch(err) {
            console.log(err);
        }
    },
    // POST REQUEST :: Creates a post and assigns it to a thread
    async createPost({commit}, {data, user}) {
        try {
            await this.$axios.$post('/api/post', data);
            commit('SET_POST', {data: data, user: user});
        } catch(err) {
            console.log(err);
        }
    }
}

export const mutations = {
    SET_NAV(state, data) {
        state.categories = data;
    },
    SET_THREADS(state, data) {
        state.threads = data;
    },
    SET_THREAD(state, data) {
        state.thread = data;
    },
    SET_TOPIC_DETAILS(state, data) {
        delete data.threads;
        state.topicDetails = data;
    },
    SET_POST(state, {data, user}) {
        delete user.password; // Removing password and email from user object
        delete user.email;
        data.user = user;
        state.thread.posts.push(data);
    },
}
