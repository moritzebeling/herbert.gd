<script>

	import GridItem from './GridItem.svelte';
	import ListItem from './ListItem.svelte';

	let layouts = {
		grid: GridItem,
		list: ListItem,
	};
	export let layout = 'grid';

	export let posts = [];

	let categories = {};
	for( let post of posts ){
		if(!('categories' in post)){
			continue;
		}
		for( let category of post.categories ){
			if(!(category in categories)){
				categories[category] = 0;
			}
			categories[category]++;
		}
	}

	let filter = false;
	function setFilter( set ){
		filter = filter === set ? false : set;
	}

</script>

<section class="posts">
	{#if posts.length > 0}

		<div class="result-options">

			<ul class="keywords filters">
				{#each Object.entries(categories) as [category, count]}
					<li on:click={()=> setFilter(category) }>
						<button class:active={ filter === category } title="Filter by {category}">{category}<span class="count">{count}</span></button>
					</li>
				{/each}
			</ul>

			<!-- <div class="layout">
				{#each Object.keys( layouts ) as lc}
					<button on:click={() => layout = lc}>{lc}</button>
				{/each}
			</div> -->

		</div>

		<ol class="container {layout}">
			{#each posts as item}
				<svelte:component this={layouts[layout]} {item} {filter}/>
			{/each}
		</ol>

	{:else}
		<h3 class="error">No posts found</h3>
	{/if}
</section>
