import * as constants from '../config/constants';
import { createStore } from 'vuex'
import asyncForEach from '../assets/js/async-for-each';
import SearchResult from '@/classes/search-result.class';
import SearchResultItem from '@/classes/search-result-item.class';

export default createStore({
  state: {
    loadingSearchResults: false,
    searchResults: [],
    totalItems: 0,
    page: 1,
    accessToken: "",
    resultsPerPage: 10
  },
  mutations: {
    setResultsPerPage(state, results) {
      state.resultsPerPage = results;
    },
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
    setAccessToken(state, token) {
      state.accessToken = token;
    }
  },
  actions: {

    async addAccessToken({ commit }, payload) {
      //   Before we save the access token, let's test that it's a valid one.
      let response = await fetch("https://api.github.com/notifications", { headers: { "Authorization": `token ${payload}` } });
      if (response.status === 401) {
        //  Token is not valid.
        throw new Error("Sorry, this is not a valid personal access token. Please try again.")
      } else {
        let data = await response.json()
        commit('setAccessToken', payload);
      }
    },

    async searchUsers({ commit, state }, payload) {
      let httpOptions = {};
      commit('setLoadingSearchResults', true);
      try {
        if (state.accessToken) {
          httpOptions = {
            headers: {
              "Authorization": `token ${state.accessToken}`
            }
          }
        }
        const response = await fetch(`${constants.githubBaseUrl}/users?q=${payload.searchTerm}&page=${state.page}&per_page=${state.resultsPerPage}`, httpOptions)
        const json: SearchResult = await response.json();

        await asyncForEach(json.items, async (item: SearchResultItem) => {
          let followersRes = await fetch(item.followers_url, httpOptions);
          item.followers = await followersRes.json();
          let starsRes = await fetch(`${item.url}/starred`, httpOptions);
          item.stars = await starsRes.json();
        });
        commit('setTotalItems', json.total_count);
        commit('setSearchResults', json.items);
        commit('setLoadingSearchResults', false);
      } catch (error) {
        //  TODO: Create better error handling. (Modal, Toast, Alert, some indicator that something went wrong for the user.)
        console.error(error);
        commit('setLoadingSearchResults', false);
      }
    }
  }
})
