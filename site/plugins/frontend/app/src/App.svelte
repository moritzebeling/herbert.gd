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
  let siteStore = loadData('index.json');

  let site;
  let unsubscribe = siteStore.subscribe(data => {
    site = data;
  });

  onDestroy(() => {
    unsubscribe = null;
  });

</script>

<Router url="{url}">


  {#if site.data}
	  <Header site={site.data} />
    <main>
      <Route site={site.data} path="/" component="{Channel}" />
      <Route site={site.data} path=":channel" component="{Channel}" />
      <Route site={site.data} path=":channel/:post" component="{Post}" />
      <Route site={site.data} path="info" component="{Info}" />
    </main>
  {/if}

	<Footer />

</Router>
