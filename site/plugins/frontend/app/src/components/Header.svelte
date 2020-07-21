<script>
  import { Router, Link, Route } from "svelte-routing";

  export let site;

</script>

<header class="site-header">
  <div class="container">

    <Link to="/">
      <img src="{site.logo}" alt="Herbert.gd Logo" />
    </Link>

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

  header {
    padding: 1rem;
    padding-bottom: 0;
  }

  .container {
    border-bottom: 1px solid #000;
  }

</style>
