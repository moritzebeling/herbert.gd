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

	<Header {site} />

  <nav>
    <Link to="/">Home</Link>
    <Link to="channel">Channel</Link>
  </nav>

  <main>
    <Route path="/" component="{Channel}" />
    <Route path=":channel" component="{Channel}" />
    <Route path=":channel/:post" component="{Post}" />
    <Route path="info" component="{Info}" />
  </main>

	<Footer />

</Router>
