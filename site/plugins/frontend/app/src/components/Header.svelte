<script>

  import { Link } from "svelte-routing";
  import Navigation from "./Navigation.svelte";
  import Logo from "./Logo.svelte";

  export let site;
  let navigationItems = site.channels;
  navigationItems.push(site.info);

</script>

<header>
  <div class="container">

    <div class="logo">
      <Link to="/"><Logo /></Link>
    </div>

    <nav>
      <Navigation items={navigationItems} />
    </nav>

  </div>
</header>

<style type="text/scss">

  header {
    padding: 1rem;
    padding-bottom: 0;
  }

  .container {
    border-bottom: 1.5px solid currentColor;
    padding-bottom: 1rem;
    display: flex;
  }

  nav {
    flex: 1 0 auto;
    order: 1;
  }

  .logo {
    flex: 0 0 auto;
    order: 2;
  }
  .logo :global(img){
    height: 2em;
    width: auto;
  }

</style>
