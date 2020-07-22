<script>

	// import Item from './Item.svelte';
	import Headline from './Headline.svelte';
	export let posts = [];

</script>

<ol>
	{#each posts as post}
		<li class="item text-large">
			<a href="{post.href}">

				<div class="l">

					<Headline>
						<h2>{post.title}</h2>
						{#if post.subtitle}
							<h3>{post.subtitle}</h3>
						{/if}
					</Headline>

				</div>

				<div class="m">
					<ul>
						{#each post.categories as category}
							<li>{category}</li>
						{/each}
					</ul>
				</div>

				<div class="s last">
					{post.year}
				</div>

			</a>
		</li>
	{/each}
</ol>

<style type="text/scss">

	.item {
		border-top: 2px solid #000;
		padding: 0.75rem 0;
	}

	.item > a {
		display: flex;
		.l {
			flex: 1 0 60%
		}
		.m {
			flex: 1 0 25%;
		}
		.s {
			flex: 1 0 15%;
		}
		.last {
			text-align: right;
		}
	}

</style>
