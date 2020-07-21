<script>

    import Links from './../components/Links.svelte';
    import List from './../components/List.svelte';
    import Text from './../components/Text.svelte';

    export let posts;

</script>

<section class="posts">
    <List {posts} />
</section>
