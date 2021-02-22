<template>
  <div class="home">
    <div class="header">
      <h1>Welcome to The Github Searcher</h1>
    </div>

    <div class="access-token-container" v-if="!tokenSuccessful">
      <h3>Have a Github Personal Access Token?</h3>
      <a v-if="!showTokenInfo" @click="showTokenInfo = true">What's this?</a>
      <a v-else @click="showTokenInfo = false">Hide</a>
      <div v-if="showTokenInfo">
        <TokenInfo />
      </div>
      <form @submit.prevent="setAccessToken()">
        <input
          type="password"
          v-model="accessToken"
          placeholder="Enter Token Here (Optional)"
        />
        <button type="submit">Save</button>
      </form>
      <div class="error-message-box" v-if="tokenErrorMessage">{{
        tokenErrorMessage
      }}</div>
    </div>

    <div class="token-success-box" v-else>
      <p>Nice Work! You Access Token Was Successfully Added. Start Searching!</p>
    </div>

    <div class="home-search-input-container">
      <form @submit.prevent="initiateSearch()">
        <input
          class="search-input"
          v-model="searchTerm"
          placeholder="Search User Here!"
        />
      </form>
    </div>
  </div>
</template>

<script>
import TokenInfo from "../components/token-info";

export default {
  components: {
    TokenInfo,
  },
  methods: {
    async setAccessToken() {
      try {
        this.tokenErrorMessage = "";
        await this.$store.dispatch("addAccessToken", this.accessToken);
        this.tokenSuccessful = true;
        this.accessToken = "";
      } catch (err) {
        this.tokenErrorMessage = err.message;
        this.accessToken = "";
      }
    },
    async initiateSearch() {
      if (!this.searchTerm) {
        return;
      }
      this.$router.push(`search-results/${this.searchTerm}`);
    },
  },
  data() {
    return {
      tokenSuccessful: false,
      tokenErrorMessage: "",
      loading: false,
      accessToken: "",
      showTokenInfo: false,
      searchTerm: "",
    };
  },
};
</script>

<style>
.home-search-input-container {
  margin-top: 25px;
}
</style>
