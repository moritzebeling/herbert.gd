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

	let filter = '';

	let categories = {};
	for( let post of posts ){
		for( let cat of post.categories ){
			if(!(cat in categories)){
				categories[cat]	= 0;
			}
			categories[cat]++;
		}
	}

</script>

{#if posts.length > 0}

	<div class="result-options">

		<ul class="keywords filters">
			<li class="keyword" on:click={()=> filter = '' }>
				<button>All<Count count={posts.length} /></button>
			</li>
			{#each Object.keys(categories) as category}
				<li class="keyword" on:click={()=> filter = category } >
					<button>{category}<Count count={categories[category]} /></button>
				</li>
			{/each}
		</ul>

	</div>

	<ol class="{layout}">
		{#each posts as post}
			<Item post={post} show={filter === '' || post.categories.includes(filter)} />
		{/each}
	</ol>

{/if}
