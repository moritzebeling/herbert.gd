<script>

	import Count from './Count.svelte';

	export let count = 0;

	export let element = 'li';
	export let href = '';

	if( href !== '' ){
		element = 'a';
	}

</script>

{#if element === 'a' }
	<a href="{href}">
		<slot></slot>
		<Count {count} />
	</li>
{:else}
	<li class="keyword">
		<slot></slot>
		<Count {count} />
	</li>
{/if}
