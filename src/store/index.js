import Vue from 'vue'
import Vuex from 'vuex'
import * as constants from '../config/constants';

Vue.use(Vuex)

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export default new Vuex.Store({
  state: {
    loadingSearchResults: false,
    searchResults: [],
    totalItems: 0,
    page: 1
  },
  mutations: {
    setSearchResults(state, searchResults) {
      state.searchResults = searchResults;
    },
    setLoadingSearchResults(state, loadingSearchResults) {
      state.loadingSearchResults = loadingSearchResults;
    },
    setTotalItems(state, totalItems) {
      state.totalItems = totalItems;
    },
    setPage(state, page) {
      state.page = page;
    },
  },
  actions: {
    async searchUsers({ commit, state }, payload) {
      commit('setLoadingSearchResults', true);
      try {
        const perPage = 10; // Hard-coded for now.
        const response = await fetch(`${constants.githubBaseUrl}/users?q=${payload.searchTerm}&page=${state.page}&per_page=${perPage}`)
        const json = await response.json();

        await asyncForEach(json.items, async (item) => {
          let followersRes = await fetch(item.followers_url);
          item.followers = await followersRes.json();

          if (item.followers && !item.followers.message) {
            //  Github is returning a "message" property if the API rate limit is exceeded. 
            // If item.followers_url returns a message property, there is no use in requesting the stars query since it won't succeed.
            let starsRes = await fetch(`${item.url}/starred`);
            item.stars = await starsRes.json();
          }
        })
        commit('setTotalItems', response.total_count);
        commit('setSearchResults', json);
        commit('setLoadingSearchResults', false);
      } catch (error) {
        //  TODO: Create some error handling.
        console.error(error);
        commit('setLoadingSearchResults', false);
      }
    }
  },

})
