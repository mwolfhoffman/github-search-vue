<template>
  <div class="home">
    <div class="header">
      <h1>Github Search</h1>
    </div>

    <div class="home-body">
      <form @submit.prevent="initiateSearch()">
        <input
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
input {
  width: 50%;
  background-color: lightblue;
  color: grey;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

div {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
</style>
