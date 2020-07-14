<script>

    import Person from './../components/Person.svelte';
    import Text from './../components/Text.svelte';

    export let site;

</script>

<section class="content">

    {#if site.info.description}
        <Text large={true}>{@html site.info.description}</Text>
    {/if}

    <!-- links -->

    <ul class="keywords">
        <li>Keywords</li>
    </ul>

</section>

{#if 'team' in site.info}
    <section class="team">
        <ul>
            {#each site.info.team as person}
                <Person {person} />
            {/each}
        </ul>
    </section>
{/if}

<style>
    .team ul {
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding: 0.5rem;
    }
</style>
