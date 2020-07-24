<script>

	import { onMount } from 'svelte';

	export let alt = 'Herbert.gd';

	export let placeholder = '';
	export let src = '';
	export let srcset = '';

	export let ratio = 1;
	export let width = '100%';
	let height = '10vw';

	let element;

	onMount(() => {
		width = element.offsetWidth;
		height = Math.floor( width * ratio );
	});

</script>

<div bind:this={element}></div>

<img alt="{alt}" width="{width}" height="{height}" class="lazyload" src="{placeholder}" data-src="{src}" data-srcset="{srcset}" />
