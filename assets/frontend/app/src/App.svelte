<script>

	import { onDestroy } from 'svelte';
	import { loadData } from './data/fetch.js';
	import Posts from './components/Posts.svelte';

	/* store */
	let dataStore = loadData();
	let data = {};
	let unsubscribeDataStore = dataStore.subscribe(update => {
		if( update.data ){
			data = update.data;
			console.log( data );
		}
	});
	onDestroy(() => {
		unsubscribeDataStore = null;
	});

</script>

{#if data.posts}
	<Posts posts={data.posts} />
{/if}

<style>
</style>
