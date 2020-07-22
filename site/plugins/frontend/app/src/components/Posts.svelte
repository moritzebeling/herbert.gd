<script>

	import List from './List.svelte';
	import Grid from './Grid.svelte';

	import Count from './Count.svelte';
	export let posts = [];

	let layouts = {
		list: List,
		grid: Grid,
	};
	export let layout = 'list';
	let layoutComponent = layouts[layout];

	let categories = {};
	for( let post of posts ){
		for( let cat of post.categories ){
			if(!(cat in categories)){
				categories[cat]	= 0;
			}
			categories[cat]++;
		}
	}

	let filter = false;
	function setFilter( set ){
		if( filter === set ){
			filter = false;
		} else {
			filter = set;
		}
	}

</script>

<section class="posts">
	{#if posts.length > 0}

		<div class="result-options">

			<ul class="keywords filters">
				{#each Object.keys(categories) as category}
					<li class="keyword" on:click={()=> setFilter(category) } class:active={ filter === category } >
						<button title="Filter by {category}">{category}<Count count={categories[category]} /></button>
					</li>
				{/each}
			</ul>

			<select class="display" bind:value={layoutComponent}>
				{#each Object.keys( layouts ) as lc}
					<option value={layouts[lc]}>{lc}</option>
				{/each}
			</select>

		</div>

		<div class="post-wrapper">
			<svelte:component this={layoutComponent} {posts}/>
		</div>

	{/if}
</section>

<style>

section {
	margin: 1rem;
}

.result-options {
	margin-bottom: 1rem;
}

.filters,
.display {
	display: none;
}

</style>
