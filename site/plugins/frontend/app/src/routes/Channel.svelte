<script>

    import Posts from './../components/Posts.svelte';
    import Links from './../components/Links.svelte';
    import Text from './../components/Text.svelte';

    export let channels;
    export let slug;
    export let channel = [];

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

<Posts {posts} layout={channel.layout} />

<style>

    header {
        margin: 1rem;
    }

    header {
        border-bottom: 1.5px solid #000;
        padding-bottom: 4rem;
    }

</style>
