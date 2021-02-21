<template>
  <div v-if="loadingSearchResults">
    <Loader />
  </div>
  <div v-else>
    <div class="header">
      <h1>Search Results</h1>
    </div>

    <div>
      <form @submit.prevent="createNewSearch()">
        <input
          class="search-input"
          type="text"
          v-model="searchInputValue"
          placeholder="Search Again"
        />
      </form>
    </div>

    <div
      class="search-control-container"
      style="
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
      "
    >
      <div @click.prevent="decrementPage()" class="search-page-btn">
        &#8592; Previous
      </div>
      <div class="total-count">
        Showing <b>10</b> Results of <b>{{ totalItems }}</b>
      </div>
      <div @click.prevent="incrementPage()" class="search-page-btn">
        Next &#8594;
      </div>
    </div>

    <div
      class="search-result-container"
      style="
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
      "
    >
      <div
        v-for="item in searchResults"
        :key="item.id"
        class="search-result-item"
      >
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
    incrementPage() {
      if (this.page === this.totalItems / 10) {
        //   Hard-coded 10 because for now I am only allowing 10 items per page.
        return;
      }
      this.$store.commit("setPage", this.page + 1);
      this.search();
    },
    decrementPage() {
      if (this.page === 1) {
        return;
      }
      this.$store.commit("setPage", this.page - 1);
      this.search();
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
</style>