<template>
  <div class="card">
    <img :src="item.avatar_url" alt="Avatar" style="width: 100%" />
    <div class="container">
      <a target="_blank" :href="item.html_url">
        <h4>
          <b>{{ item.login }}</b>
        </h4>
      </a>
      <p>{{ followerAndStarCount }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  computed: {
    followerAndStarCount() {
      let displayString = "";
      if (this.item.followers && this.item.followers.message) {
        //   Github is returning a 'message' property on the followers response if Rate limits are exceeded.
        //   This prevents us from getting followers/stars length. We will return a user friendly message.
        return "Sorry, due to rate limiting, we cannot display user's data right now.";
      } else {
        //    Otherwise, let's return a string with the most accurate represenation we can without making more API calls and hitting the rate limit again.
        if (this.item.followers && this.item.followers.length === 30) {
          displayString += "30 + Followers";
        } else {
          displayString += `${this.item.followers.length} Followers`;
        }
        if (this.item.stars && this.item.stars.length === 30) {
          displayString += ` & 30 + Stars`;
        } else {
          displayString += ` & ${this.item.stars.length} Stars`;
        }
      }
    },
  },
};
</script>

<style>

</style>