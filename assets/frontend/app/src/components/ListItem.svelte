<script>

	import { onMount } from 'svelte';

	export let item = {};
	export let show = true;

	let element;

	let orientation = '';
	if('image' in item){
		if('orientation' in item.image){
			orientation = item.image.orientation;
		}
	}

	let height = 10;
	onMount(() => {
		if(!('image' in item)) return;

		let width = element.offsetWidth;
		height = width * item.ratio;

	});

</script>

<li bind:this={element} class="{orientation}" class:hide={!show}>
	<a href="{item.href}">

		{#if 'image' in item}
			<figure class="video">
				{@html item.image.image}
			</figure>
		{/if}

		<h2>{item.title}</h2>

	</a>
</li>
