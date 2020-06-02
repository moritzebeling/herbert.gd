<script>

	import { writable } from 'svelte/store';
	let posts = [];

	const requestUrl = window.location.href + '.json';
	console.log( requestUrl );

	fetch( requestUrl, {
		method: "GET"
	})
	.then(response => response.json())
	.then(response => {

		console.log( response.data );
		if('posts' in response.data ){
			posts = response.data.posts;
			console.log( posts );
		}

	})
	.catch(error => {
		console.log(error);
	});

	import List from './components/List.svelte';

</script>

<List posts={posts} />

<style>
</style>
