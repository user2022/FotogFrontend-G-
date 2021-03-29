
export const state = () => ({
  hideNav: false,
})

export const getters = {
  getNav(state) {
    return state.hideNav;
  },

}

export const actions = {
  hideSideNav({commit}, bol) {
    commit('SET_NAV', bol);
  },

}

export const mutations = {
  SET_NAV(state, bol) {
    state.hideNav = bol;
  },

}
