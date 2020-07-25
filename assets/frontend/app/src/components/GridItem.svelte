<script>

	import { afterUpdate } from 'svelte';
	import Image from './Image.svelte';

	export let item = {};
	export let filter = false;

	let show = true;
	afterUpdate(() => {
		if( filter === false ){
			show = true;
		} else {
			show = item.categories.includes( filter );
		}
	});

	let orientation = '';
	if('image' in item){
		if('ratio' in item.image){
			orientation = item.image.ratio < 1 ? 'landscape' : 'portrait';
		}
	}

</script>

<li class="item {orientation}" class:hide={!show}>
	<a href="{item.href}">

		{#if 'image' in item}
			<figure class="video">
				<Image {...item.image}/>
			</figure>
		{/if}

		<h3>{item.title}</h3>

	</a>
</li>
