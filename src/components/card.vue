<template>
  <div class="card">
    <img :src="item.avatar_url" alt="Avatar" style="width: 100%" />
    <div class="container">
      <h4>
        <b>{{ item.login }}</b>
      </h4>
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
          displayString += ` & ${this.stars.length} Stars`;
        }
      }
    },
  },
};
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 250px;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.container {
  padding: 2px 16px;
}
</style>