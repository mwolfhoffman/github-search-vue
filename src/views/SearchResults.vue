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
        <a class="nav-btn">&#8249;</a>
      </div>
      <div class="total-count">
        Showing <b>{{ totalItems >= 10 ? "10" : totalItems }}</b> Results of
        <b>{{ totalItems }}</b>
      </div>
      <div @click.prevent="incrementPage()" class="search-page-btn">
        <a class="nav-btn">&#8250;</a>
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
.nav-btn:hover {
  background-color: #ddd;
  color: black;
}

.nav-btn {
  text-decoration: none;
  display: inline-block;
  padding: 8px 16px;
  background-color: #4c82af;
  color: white;
  border-radius: 50%;
}
</style>