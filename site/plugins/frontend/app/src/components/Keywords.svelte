<script>

	export let keywords = [];

</script>

<ul class="keywords">
	{#each keywords as keyword}

		<li>
			<button>{keyword}</button>
		</li>

	{/each}
</ul>
