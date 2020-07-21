<script>

	import Link from './Link.svelte';
	export let links = [];

</script>

{#if links.length > 0}
	<ul>
		{#each links as link}
			<li>
				<Link url={link.url}>{link.text}</Link>
			</li>
		{/each}
	</ul>
{/if}
