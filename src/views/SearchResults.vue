<template>
  <div v-if="loadingSearchResults">
    <Loader />
  </div>
  <div v-else class="home">
    <div class="header">
      <h1>Search Results</h1>
    </div>

    <div>
      <form @submit.prevent="createNewSearch()">
        <input type="text" v-model="searchInputValue" />
      </form>
    </div>

    <div class="total-count">{{ totalItems }} Results</div>

    <div class="search-result-container">
      <div v-for="item in searchResults" :key="item.id">
        <Card :item="item" />
      </div>
    </div>
  </div>
</template>


<script>
import { mapState, mapActions } from "vuex";
import Loader from "../components/loader";
import Card from "../components/card";

export default {
  components: {
    Loader,
    Card,
  },
  computed: {
    ...mapState([
      "loadingSearchResults",
      "totalItems",
      "page",
      "searchResults",
    ]),
  },
  data() {
    return {
      currentSearchTerm: "",
      searchInputValue: "",
    };
  },
  methods: {
    ...mapActions(["searchUsers"]),
    createNewSearch() {
      debugger;
      this.$router.push(this.searchInputValue);
    },
    search() {
      this.currentSearchTerm = this.$route.params.searchTerm;
      this.searchUsers({ searchTerm: this.currentSearchTerm });
    },
  },
  mounted() {
    this.search();
  },
  watch: {
    $route() {
      this.search();
    },
  },
};
</script>

<style>
.search-results-container {
  display: flex !important;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
</style>