<script>

    import Links from './../components/Links.svelte';
    import List from './../components/List.svelte';
    import Text from './../components/Text.svelte';

    export let channels;
    export let slug;

    $: channel = channels.find( c => c.href === slug );

    export let posts;

    console.log( posts );

</script>

<header>

    {#if channel.description}
        <Text>{@html channel.description}</Text>
    {/if}

    {#if channel.links}
        <Links links={channel.links} />
    {/if}

</header>

<section class="posts">
    <List {posts} />
</section>

<style>

    header,
    section {
        margin: 1rem;
    }

    header {
        border-bottom: 1px solid #000;
        padding-bottom: 4rem;
    }

</style>
