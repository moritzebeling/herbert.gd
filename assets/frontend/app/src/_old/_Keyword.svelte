<script>

	import Count from './Count.svelte';

	export let count = 0;

	export let element = 'li';
	export let href = '';

	if( href !== '' ){
		element = 'a';
	}

</script>

<li class="keyword">
	{#if element === 'a' }
		<a href="{href}">
			<slot></slot>
			<Count {count} />
		</a>
	{:else}
		<slot></slot>
		<Count {count} />
	{/if}
</li>
