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

    <Headline><h2>{@html person.name}</h2></Headline>

    <Text>{@html person.description}</Text>

    <!-- links -->

</li>

<style>

</style>
