<script>

    import Person from './../components/Person.svelte';
    import Text from './../components/Text.svelte';

    export let info;

</script>

<section class="content">

    {#if info.description}
        <Text large={true}>{@html info.description}</Text>
    {/if}

    <!-- links -->

    <ul class="keywords">
        <li>Keywords</li>
    </ul>

</section>

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
    .team ul {
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding: 0.5rem;
    }
</style>
