<script>

	import ListItem from './ListItem.svelte';
	import GridItem from './GridItem.svelte';

	let layouts = {
		list: ListItem,
		grid: GridItem,
	};
	export let layout = 'list';
	let layoutComponent = layouts[layout];

	export let posts = [];

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
		filter = filter === set ? false : set;
	}

</script>

<section class="posts">
	{#if posts.length > 0}

		{posts.length} Posts found

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

		<div class="container {layout}">
			{#each posts as item}
				<svelte:component this={layoutComponent} {item}/>
			{/each}
		</div>

	{:else}
		No posts found
	{/if}
</section>
