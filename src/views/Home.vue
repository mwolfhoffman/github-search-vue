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
      <div class="error-message-box" v-if="tokenErrorMessage">
        {{ tokenErrorMessage }}
      </div>
    </div>

    <div class="token-success-box" v-else>
      <p>
        Nice Work! You Access Token Was Successfully Added. Start Searching!
      </p>
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

<script lang="ts">
import TokenInfo from "../components/token-info.vue";
export default {
  components: {
    TokenInfo,
  },
  methods: {
    async setAccessToken():Promise<void> {
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
    async initiateSearch():Promise<void> {
      if (!this.searchTerm) {
        return;
      }
      this.$router.push({
        name: "Search-Results",
        params: {
          searchTerm: this.searchTerm,
        },
      });
    },
  },
  data() {
    return {
      tokenSuccessful: false as boolean,
      tokenErrorMessage: "" as string,
      loading: false as boolean,
      accessToken: "" as string,
      showTokenInfo: false as boolean,
      searchTerm: "" as string,
    };
  },
};
</script>

<style>
.home-search-input-container {
  margin-top: 25px;
}
</style>