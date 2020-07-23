<script>

	export let item = {};
	export let show = true;

	let orientation = '';
	if('image' in item){
		if('orientation' in item.image){
			orientation = item.image.orientation;
		}
	}

</script>

<li class="item {orientation}" class:hide={!show}>
	<a href="{item.href}">

		{#if 'image' in item}
			<figure class="video">
				{@html item.image.image}
			</figure>
		{/if}

		<h3>{item.title}</h3>

	</a>
</li>
