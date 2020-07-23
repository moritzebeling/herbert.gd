<script>

	import { onDestroy } from 'svelte';
	import { loadData } from './data/fetch.js';
	import Posts from './components/Posts.svelte';

	/* store */
	let dataStore = loadData();
	let data = {};
	let unsubscribeDataStore = dataStore.subscribe(update => {
		data = update;
		console.log( data );
	});
	onDestroy(() => {
		unsubscribeDataStore = null;
	});

</script>

App
{#if data.data}
	Posts
	<Posts posts={data.data.posts} />
{/if}

<style>
</style>
