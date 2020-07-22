<script>

	import Item from './GridItem.svelte';
	export let posts = [];

</script>

<ol>
	{#each posts as post}
		<Item item={post} />
	{/each}
</ol>

<style>

	ol {
		column-count: 3;
		column-gap: 2rem;
		column-rule-color: currentColor;
		column-rule-style: solid;
		column-rule-width: 2px;
	}

</style>
