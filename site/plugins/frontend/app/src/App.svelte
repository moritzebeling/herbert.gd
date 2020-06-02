<script>

	import { writable } from 'svelte/store';
	let data = {};

	function requestUrl(){
		let location = window.location.pathname;
		if( location === '/' ){
			location = 'start';
		}
		console.log( location );
		return location + '.json';
	}

	fetch( requestUrl(), {
		method: "GET"
	})
	.then(response => response.json())
	.then(response => {

		console.log( response.data );
		data = response.data;

	})
	.catch(error => {
		console.log(error);
	});

	import List from './components/List.svelte';

</script>

{#if 'posts' in data}
	<List {...data} />
{/if}

<style>
</style>
