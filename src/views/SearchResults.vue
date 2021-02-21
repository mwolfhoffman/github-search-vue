<template>
  <div v-if="loadingSearchResults">
    <Loader />
  </div>
  <div v-else class="home">
    <div class="header">
      <h1>Search Results</h1>
    </div>

    <div>
      <input type="text" />
    </div>

    <div class="search-result-container">foo</div>
  </div>
</template>


<script>
import { mapState, mapActions } from "vuex";
import Loader from "../components/loader";

export default {
  components: {
    Loader,
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
    };
  },
  methods: {
    ...mapActions(["searchUsers"]),
    search() {
      debugger;
    },
  },
  mounted() {
    this.currentSearchTerm = this.$route.params.searchTerm;
    this.searchUsers({ searchTerm: this.currentSearchTerm });
  },
};
</script>

<style>
</style>