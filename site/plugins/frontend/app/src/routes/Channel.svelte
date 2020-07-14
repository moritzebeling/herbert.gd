<script>

    import List from './../components/List.svelte';
    import Text from './../components/Text.svelte';

    export let channels;
    export let slug;

    $: channel = channels.find( c => c.href === slug );

    export let posts;

    console.log( posts );

</script>

<section class="content">

    {#if channel.description}
        <Text large={true}>{@html channel.description}</Text>
    {/if}

    <!-- links -->

</section>

<section class="posts">
    <List {posts} />
</section>
