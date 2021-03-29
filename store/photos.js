
// Holds data
export const state = () => ({
    photos: [],
    photo: {},

    error: false
})

// Get state property values
export const getters = {
    allPhotos(state) {
        return state.photos;
    },
    onePhoto(state) {
        return state.photo;
    }
}

// Actions are where the main code is executed, this is also where you commit mutations
export const actions = {
    // GET REQUEST :: Gets a list of all photos
    async getPhotos({commit}, error) {
        try {
            let response = await this.$axios.$get('/api/photo');
            commit('SET_PHOTOS', response.photos); // Committing the mutation
        } catch(err) {
            console.log(err);
            // error is a built in function from nuxt that will redirect the user to the error page (in layouts directory) with the error code and message
            error({statusCode: err.statusCode, message: 'Problems with our server'});
        }
    },
    // GET REQUEST :: Gets one specific photo
    async getOne({commit}, {id, error}) {
        try {
            let response = await this.$axios.$get(`/api/photo/${id}`);
            commit('SET_ONE', response.photo);
        } catch(err) {
            console.log(err);
            error({statusCode: err.response.statusCode, message: err.response.statusText});
        }
    },
    // POST REQUEST :: Creates a photo post
    async createPhoto({commit}, {data}) {
        try {
            await this.$axios.$post('/api/photo', data);
            commit('CREATE_PHOTO', data);
        } catch(err) {
            console.log(err);
            commit('SET_ERR', true);
        }
    },
    // POST REQUEST :: Creates a comment and assigns it to a photo post
    async createComment({commit}, {data}) {
        try {
            await this.$axios.$post('/api/comment', data);
            commit('CREATE_COMMENT', {comment: data, user: this.$auth.user});
        } catch(err) {
            console.log(err);
            commit('SET_ERR', true);
        }
    },
    // POST REQUEST :: Likes or unlikes a photo post
    async likePhoto({commit}, {data}) {
        try {
            commit('LIKE_PHOTO', data.user);
            await this.$axios.$post(`/api/like/${data.photo}`, {user: data.user});
        } catch(err) {
            console.log(err);
        }
    },
    // DELETE REQUEST :: delete a photo
    async deletePhoto({commit}, {id}) {
        try {
            await this.$axios.$delete(`/api/photo/${id}`);
            commit('DELETE_PHOTO', id);
        } catch(err) {
            console.log(err);
        }
    }
}

export const mutations = {
    SET_PHOTOS(state, photos) {
        state.photos = photos;
    },
    SET_ONE(state, photo) {
        state.photo = photo;
    },
    CREATE_PHOTO(state, photo) {
        state.photos.push(photo);
    },
    CREATE_COMMENT(state, {comment, user}) {
        delete user.password; // Removing password and email from user object
        delete user.email;
        comment.user = user; // Appending user object to the comment
        state.photo.comments.unshift(comment); // Adding the comment to the current list of comments in the photo
    },
    LIKE_PHOTO(state, user) {
        if (state.photo.likes.includes(user)) {
            state.photo.likes.splice(state.photo.likes.indexOf(user), 1); // If user has already liked photo, remove
        } else {
            state.photo.likes.push(user); // If the user hasn't liked the photo, add them to the liked list
        }
    },
    DELETE_PHOTO(state, id) {
        let photo = state.photo.includes(id); // Find the photo that has the id
        state.photo.splice(state.photo.indexOf(photo), 1); // Delete the photo
    },
    SET_ERR(state, val) {
        state.error = val;
    }
}
