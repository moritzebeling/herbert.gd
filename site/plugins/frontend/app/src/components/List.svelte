<script>

	import Item from './Item.svelte';
	export let posts = [];

</script>

{#if posts.length > 0}
	<ol class="list">
		{#each posts as post}
			<li><Item post={post} /></li>
		{/each}
	</ol>
{/if}
