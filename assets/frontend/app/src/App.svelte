<script>

	import { writable } from 'svelte/store';
	let data = {};

	function requestUrl(){
		let location = window.location.pathname;
		if( location === '/' ){
			location = 'start';
		}
		let endpoint = location + '.json';
		if( window.location.search !== '' ){
			endpoint += window.location.search;
		}
		console.log( 'API endpoint: '+endpoint );
		return endpoint;
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
