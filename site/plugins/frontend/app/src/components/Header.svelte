<script>

  import { Link } from "svelte-routing";
  import Navigation from "./Navigation.svelte";

  export let site;
  let navigationItems = site.channels;
  navigationItems.push(site.info);

</script>

<header class="site-header">
  <div class="container">

    <Link to="/">
      <img src="{site.logo}" alt="Herbert.gd Logo" />
    </Link>

    <Navigation items={navigationItems} />

  </div>
</header>

<style type="text/scss">

  header {
    padding: 1rem;
    padding-bottom: 0;
  }

  .container {
    border-bottom: 1px solid #000;
    padding-bottom: 1rem;
  }

</style>
