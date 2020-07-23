<script>

	export let post = {};
	export let show = true;

	let orientation = '';
	if('image' in post){
		if('orientation' in post.image){
			orientation = post.image.orientation;
		}
	}

</script>

<li class="{orientation}" class:hide={!show}>
	<a href="{post.href}">

		{#if 'image' in post}
			{#if post.image.type === 'video'}
				<figure class="video">
					{@html post.image.html}
				</figure>
			{:else}
				<figure class="{post.image.orientation}">
					<div class="image">
					{@html post.image.html}
					</div>
				</figure>
			{/if}
		{/if}

		<div class="info">

			<div class="title">
				<h3 class="headline">{post.title}</h3>
				{#if post.subtitle}
					<h4 class="subline">{post.subtitle}</h4>
				{/if}
			</div>

			<div class="meta">

				<div class="categories">
					<ul>
						{#each post.categories as category}
							<li>{category}</li>
						{/each}
					</ul>
				</div>

				<div class="date">
					{post.date}
				</div>

			</div>

		</div>

	</a>
</li>

<style>

	

</style>
