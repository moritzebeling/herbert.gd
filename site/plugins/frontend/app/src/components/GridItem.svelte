<script>

	import { onMount } from 'svelte';

	import Headline from './Headline.svelte';

	export let item;
	let element;
	let width;
	let height;
	let rows;

	onMount(() => {
		width = element.offsetWidth;
		height = width * item.image.ratio;
		rows = Math.ceil( height / 50 );
		// element.style.gridRowEnd = `span ${rows}`;
    });

</script>

<li bind:this={element}>
	<a href="{item.href}" >

		{#if 'image' in item}
			<figure class="video">
				{@html item.image.image}
			</figure>
		{/if}

		<Headline><h2>{item.title}</h2></Headline>

	</a>
</li>

<style>

	li {
		break-inside: avoid;
		padding-bottom: 2rem;
	}

	li :global(.headline) {
		margin-top: 0.25rem;
	}

</style>
