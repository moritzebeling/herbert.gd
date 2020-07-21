<script>
  import { Router, Link, Route } from "svelte-routing";
  import Logo from './Logo.svelte';

  export let site;

</script>

<header class="site-header">
  <div class="container">

    <Link to="/"><Logo /></Link>

    <nav>
      <ol class="channels">
        {#each site.channels as channel}

          <li>
            <Link to="{channel.href}">
              {channel.title}<span class="count">15</span>
            </Link>
          </li>

        {/each}
        {#if site.info }

          <li>
            <Link to="{site.info.href}">
              {site.info.title}
            </Link>
          </li>

        {/if}
      </ol>
    </nav>

  </div>
</header>

<style type="text/scss">

  @import '../scss/mixins';

  nav {
    color: $color;
  }

</style>
