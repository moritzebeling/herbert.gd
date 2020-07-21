<script>

    import Person from './../components/Person.svelte';
    import Text from './../components/Text.svelte';

    export let info;

</script>

<header class="content">

    {#if info.description}
        <Text large={true}>{@html info.description}</Text>
    {/if}

    <!-- links -->

    <ul class="keywords">
        <li>Keywords</li>
    </ul>

</header>

{#if 'team' in info}
    <section class="team">
        <ul>
            {#each info.team as person}
                <Person {person} />
            {/each}
        </ul>
    </section>
{/if}

<style>
    header,
    section {
        margin: 1rem;
    }
    .team ul {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }
</style>
