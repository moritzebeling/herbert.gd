<script>

	import GridItem from './GridItem.svelte';
	// import ListItem from './ListItem.svelte';

	let layouts = {
		grid: GridItem,
		// list: ListItem,
	};
	export let layout = 'grid';
	let layoutComponent = layouts[layout];

	export let posts = [];

	let categories = {};
	for( let post of posts ){
		if(!('categories' in post)){
			continue;
		}
		for( let cat of post.categories ){
			if(!(cat in categories)){
				categories[cat]	= 0;
			}
			categories[cat]++;
		}
	}

	let filter = false;
	function setFilter( set ){
		filter = filter === set ? false : set;
	}

</script>

<section class="posts">
	{#if posts.length > 0}

		<!-- <div class="result-options">

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

		</div> -->

		<ol class="container {layout}">
			{#each posts as item}
				<svelte:component this={layoutComponent} {item}/>
			{/each}
		</ol>

	{:else}
		<h3 class="error">No posts found</h3>
	{/if}
</section>
