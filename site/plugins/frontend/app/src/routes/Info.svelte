<script>
    import { onMount } from 'svelte';
    import { onDestroy } from 'svelte';

    import Person from './../components/Person.svelte';
    import Text from './../components/Text.svelte';
    import Link from './../components/Link.svelte';

    export let info;

	onMount(() => {
		document.body.classList.add('info');
    });
	onDestroy(() => {
		document.body.classList.remove('info');
	});

</script>

<header>

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

<section class="credits">
    <ul>
        {#each info.credits as credit}
            <li>

                {#if 'headline' in credit}
                    <h3>{credit.headline}</h3>
                {/if}

                {#if 'url' in credit}
                    <Link url={credit.url}>{credit.text}</Link>
                {:else}
                    <h4>{credit.text}</h4>
                {/if}

            </li>
        {/each}
        <li>
            <Link url={info.collaboration}>Help improve this website on GitHub</Link>
        </li>
        <li>
            <Link url={info.imprint}>Imprint</Link>
        </li>
    </ul>
</section>

<style>
    header,
    section {
        margin: 1rem;
        margin-bottom: 8rem;
    }
    section {
        border-top: 1.5px solid #000;
        padding-top: 1rem;
    }
    .team ul {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }
    .credits li {
        margin-bottom: 0.5em;
    }
</style>
