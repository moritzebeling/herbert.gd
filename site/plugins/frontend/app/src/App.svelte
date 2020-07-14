<script>
  import { Router, Link, Route } from "svelte-routing";

  import Home from "./routes/Home.svelte";
  import Channel from "./routes/Channel.svelte";
  import Info from "./routes/Info.svelte";

  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";

  export let url = "";


  import { onDestroy } from 'svelte';
  import { initialValue, makeSiteStore } from './stores/site.js';

  let store = makeSiteStore();
	let site = initialValue();
  let unsubscribe;

  onDestroy(() => {
    if(unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }
  });

  function updateSite(data) {
    site = data;
  }

  if(!unsubscribe) {
    unsubscribe = store.subscribe(updateSite);
  }

</script>

<Router url="{url}">

  {#if site.data}
    {#each site.data.channels as channel}
      {channel.title}
    {/each}
  {/if}

	<Header />

  <nav>
    <Link to="/">Home</Link>
    <Link to="channel">Channel</Link>
  </nav>

  <main>
    <Route path="/" component="{Home}" />
    <Route path="channel" component="{Channel}" />
    <Route path="info" component="{Info}" />
  </main>

	<Footer />

</Router>
