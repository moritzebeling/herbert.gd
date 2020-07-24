<script>

	import { onMount } from 'svelte';
	import Image from './Image.svelte';

	export let item = {};
	export let show = true;

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
