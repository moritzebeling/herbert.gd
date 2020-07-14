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
        {#if site.data}
          {#each site.data.channels as channel}

            <li>
              <Link to="{channel.href}">
                {channel.title}<span class="count">15</span>
              </Link>
            </li>

          {/each}

          <li>
            <Link to="{site.data.info.href}">
              {site.data.info.title}
            </Link>
          </li>

        {/if}
      </ol>
    </nav>

  </div>
</header>
