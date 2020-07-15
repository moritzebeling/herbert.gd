<script>
  import { Router, Link, Route } from "svelte-routing";
  import { onDestroy } from 'svelte';

  import Channel from "./routes/Channel.svelte";
  import Info from "./routes/Info.svelte";
  import Post from "./routes/Post.svelte";

  export let url = "";

  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";

  import { loadData } from './data/fetch.js';

  /* site */
  let siteStore = loadData('index.json');

  let site;
  let unsubscribeSiteStore = siteStore.subscribe(data => {
    site = data;
  });

  /* posts */
  let postsStore = loadData('posts.json');

  let posts;
  let unsubscribePostsStore = postsStore.subscribe(data => {
    posts = data;
  });

  onDestroy(() => {
    unsubscribeSiteStore = null;
    unsubscribePostsStore = null;
  });

</script>

<Router url="{url}">

  {#if site.data}
	  <Header site={site.data} />

    <main>

      <Route site={site.data} path="/" component="{Channel}" />

      <Route info={site.data.info} path="info" component="{Info}" />

      <Route path=":channel" let:params>
        <Channel posts={posts.data} channels={site.data.channels} slug="{params.channel}" />
      </Route>

      <Route path=":channel/:post" let:params>
        <Post slug={`${params.channel}/${params.post}`} />
      </Route>

    </main>
  {/if}

	<Footer />

</Router>
