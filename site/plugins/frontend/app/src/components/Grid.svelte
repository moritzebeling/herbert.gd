<script>

	import Item from './Item.svelte';
	export let posts = [];

</script>

<ol>
	{#each posts as post}
		<li class="item text-large">
			<a href="{post.href}">

				{#if 'image' in post}
					<figure class="video">
						{@html post.image.image}
						{#if 'video' in post.image}
							{@html post.image.video}
						{/if}
					</figure>
				{/if}

				<h2>{post.title}</h2>
				{#if post.subtitle}
					<h3>{post.subtitle}</h3>
				{/if}

				<ul>
					{#each post.categories as category}
						<li>{category}</li>
					{/each}
				</ul>

			</a>
		</li>
	{/each}
</ol>

<style>

	ol {
		display: grid;
		gap: 1rem;
		grid-template-columns: 1fr 1fr 1fr;
	}

</style>
