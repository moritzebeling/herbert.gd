<script>

	import Item from './Item.svelte';
	export let posts = [];

	export let layout = 'list';
	let layoutOptions = {
		list: 'List',
		cards: 'Cards',
		preview: 'Preview'
	};

	let filter = '';
	export let categories = [];

</script>

{#if posts.length > 0}

	<!--
	<nav class="results-options">

		<div class="left">
			<label for="results-layout">Layout</label>
			<select name="results-layout" bind:value={layout}>
				{#each Object.keys(layoutOptions) as option }
					<option value="{option}">{layoutOptions[option]}</option>
				{/each}
			</select>
		</div>

		<div class="right">
			<label for="results-filter">Category</label>
			<select name="results-filter" bind:value={filter}>
				<option value="">All</option>
				{#each categories as category}
					<option value="{category}">{category}</option>
				{/each}
			</select>
		</div>

	</nav>
	-->

	<ol class="cards">
		{#each posts as post}
			{#if filter === '' || post.categories.includes(filter) }
				<Item post={post} />
			{/if}
		{/each}
	</ol>
{/if}
