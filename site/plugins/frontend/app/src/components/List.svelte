<script>

	// import Item from './Item.svelte';
	import Headline from './Headline.svelte';
	export let posts = [];

</script>

<ol>
	{#each posts as post}
		<li class="item text-large">
			<a href="{post.href}">

				<div class="w3">
					<h2>{post.title}</h2>
				</div>

				<div class="w1 last">
					{post.year}
				</div>

				<div class="w4">
					{#if post.subtitle}
						<h3>{post.subtitle}</h3>
					{/if}
				</div>

			</a>
		</li>
	{/each}
</ol>

<style type="text/scss">

	.item {
		border-top: 1.5px solid currentColor;
		padding: 0.75rem 0;
	}

	.item > a {
		display: flex;
		flex-wrap: wrap;
		.w4 {
			flex: 1 0 100%;
		}
		.w3 {
			flex: 1 0 75%;
		}
		.w1 {
			flex: 1 0 25%;
		}
		.last {
			text-align: right;
		}
	}

	.categories {
		display: flex;
		flex-wrap: wrap;
	}

</style>
