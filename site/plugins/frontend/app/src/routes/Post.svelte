<script>

    import Headline from './../components/Headline.svelte';
    import Text from './../components/Text.svelte';
    import Keywords from './../components/Keywords.svelte';

    import { loadData } from '../data/fetch.js';
    import { onDestroy } from 'svelte';

    export let slug;

    /* posts */
    let postStore = loadData(`${slug}.json`);

    let post;
    let unsubscribePostStore = postStore.subscribe(data => {
        post = data;
        console.log( data );
    });

    onDestroy(() => {
        unsubscribePostStore = null;
    });

</script>

{#if post.data}

    <header>
        <Headline>
            <h1>{post.data.title}</h1>
            {#if 'subtitle' in post.data}
                <h2>{post.data.subtitle}</h2>
            {/if}
        </Headline>
    </header>

    Gallery

    <section class="content">
        <div class="left">

            <Headline>
                <h1>{post.data.title}</h1>
                {#if 'subtitle' in post.data}
                    <h2>{post.data.subtitle}</h2>
                {/if}
            </Headline>

            {#if 'keywords' in post.data}
                <Keywords keywords={post.data.keywords}/>
            {/if}

        </div>
        <div class="right">
            <Text>{@html post.data.content}</Text>
        </div>
    </section>

{/if}
