<template>
  <div class="token-info-container">
    <p>
      <b>Personal Access Tokens</b> will allow you to request more information
      from the Github Search API by increasing Rate Limits.
    </p>
    <p>
      You can read more about Rate Limits
      <a
        target="_blank"
        href="https://docs.github.com/en/rest/overview/resources-in-the-rest-api"
      >
        here</a
      >.
    </p>
    <p>
      You can obtain your access token here:
      <a
        target="_blank"
        href="https://docs.github.com/en/rest/overview/resources-in-the-rest-api#authentication"
        >here</a
      >.
    </p>
    <p>
      <b
        >NOTE: You should treat your access token like a password. Do not share
        this token.</b
      >
    </p>
  </div>
</template>

<script lang="ts">
export default {};
</script>

<style>
.token-info-container {
  border-style: inset;
}
</style>