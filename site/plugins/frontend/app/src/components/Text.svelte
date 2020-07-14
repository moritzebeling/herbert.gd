<script>
    export let large = false;
</script>

<div class="text" class:large>
    <slot><p></p></slot>
</div>

<style>
    .text.large {
        font-size: 2rem;
    }
</style>
