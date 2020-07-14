<script>

    import Headline from './Headline.svelte';
    import Text from './Text.svelte';
    import Figure from './Figure.svelte';
    export let person;

</script>

<li class="person">

    {#if 'image' in person}
        <Figure figure={person.image} />
    {/if}

    <Headline><h3>{@html person.name}</h3></Headline>

    <Text>{@html person.description}</Text>

    <!-- links -->

</li>

<style>

    .person {
        padding: 0.5rem;
    }

</style>
