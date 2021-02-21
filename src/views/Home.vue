<template>
  <div class="home">
    <div class="header">
      <h1>Github Search</h1>
    </div>

    <div class="home-body">
      <form @submit.prevent="initiateSearch()">
        <input
        class="search-input"
          v-model="searchTerm"
          placeholder="Type a User!"
        />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async initiateSearch() {
      this.$router.push(`search-results/${this.searchTerm}`);
    },
  },
  data() {
    return {
      searchTerm: "",
    };
  },
};
</script>

<style>

</style>
