<script>

	import Item from './Item.svelte';
	import Count from './Count.svelte';
	export let posts = [];

	export let layout = 'list';
	let layoutOptions = {
		list: 'List',
		cards: 'Cards',
		preview: 'Preview'
	};

	let filter = false;

	let categories = {};
	for( let post of posts ){
		for( let cat of post.categories ){
			if(!(cat in categories)){
				categories[cat]	= 0;
			}
			categories[cat]++;
		}
	}

	function setFilter( set ){
		if( filter === set ){
			filter = false;
		} else {
			filter = set;
		}
	}

</script>

{#if posts.length > 0}

	<div class="result-options">

		<ul class="keywords filters">
			<!--
			<li class="keyword" on:click={()=> filter = '' }>
				<button>All<Count count={posts.length} /></button>
			</li>
			-->
			{#each Object.keys(categories) as category}
				<li class="keyword" on:click={()=> setFilter(category) } class:active={ filter === category } >
					<button>{category}<Count count={categories[category]} /></button>
				</li>
			{/each}
		</ul>

	</div>

	<ol class="{layout}">
		{#each posts as post}
			<Item post={post} show={filter === false || post.categories.includes(filter)} />
		{/each}
	</ol>

{/if}
