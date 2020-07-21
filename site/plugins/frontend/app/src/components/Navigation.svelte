<script>

    import { Link } from "svelte-routing";

    export let items = [];

</script>


<ol>
    {#each items as item}
        <li>
            <Link to="{item.href}">
                {item.title}
                {#if item.count}
                    <span class="count">15</span>
                {/if}
            </Link>
        </li>
    {/each}
</ol>

<style>

</style>
