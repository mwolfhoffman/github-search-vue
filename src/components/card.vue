<template>
  <div class="card">
    <img :src="item.avatar_url" alt="Avatar" style="width: 100%" />
    <div class="container">
      <a target="_blank" :href="item.html_url">
        <h4>
          <b>{{ item.login }}</b>
        </h4>
      </a>
      <p v-if="item.followers && item.followers.message">
        Sorry, due to rate limiting, we cannot display user's data right now.
      </p>
      <p>
        <span v-if="item.followers && !item.followers.message">
          <b>{{
            item.followers.length === 30 ? "30 +" : item.followers.length
          }}</b> Followers</span
        >
        <span v-if="item.stars && !item.stars.message">
          and <b>{{
            item.stars.length === 30 ? "30 + " : item.stars.length
          }}</b> Stars</span
        >
      </p>
    </div>
  </div>
</template>

<script>
export default  {
  props: ["item"],
};
</script>

<style>
</style>