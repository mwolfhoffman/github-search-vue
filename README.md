# Github Searcher

This is my first Vue 3 project. I built it using the Vue-CLI and creating a 2.x project and then migrating to 3.x because I was curious about the migration steps. John Papa has a great guide on how to do this: <a href="https://johnpapa.net/vue2-to-vue3/" target="_blank">here</a>.

Currently, this is a pretty simple app in terms of TypeScript. I am going to add to this over time to learn a little more about Vue 3 (such as exchanging vuex with the composition API and trying out more Vue 3 features).

<br/>

## View Hosted Application:

Try this application out, it is hosted on Netlify at: <a target="_blank" href="https://dazzling-blackwell-ec1277.netlify.app">https://dazzling-blackwell-ec1277.netlify.app </a>


<br />

## To Run

```
yarn install

yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

<br />


## Note on Rate Limiting and Authentication: 

The Github Search API limits unauthenticated requests to 60 requests per hour. Each user requires 3 requests (1 to get the user's data, and 2 more to get their star and follower count). Thus, the rate limits is reached very quickly. 

Consider entering a Personal Access Token with Repo and Users permissions to get more requests and a friendlier user experience. 