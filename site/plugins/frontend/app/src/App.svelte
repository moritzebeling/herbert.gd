<script>
  import { Router, Link, Route } from "svelte-routing";

  import Home from "./routes/Home.svelte";
  import Channel from "./routes/Channel.svelte";
  import Info from "./routes/Info.svelte";

  import Header from "./components/Header.svelte";

  export let url = "";
</script>

<Router url="{url}">
  <nav>
    <Link to="/">Home</Link>
    <Link to="channel">Channel</Link>
    
	<Header />
  </nav>
  <div>
    <Route path="/" component="{Home}" />
    <Route path="channel" component="{Channel}" />
    <Route path="info" component="{Info}" />
  </div>
</Router>