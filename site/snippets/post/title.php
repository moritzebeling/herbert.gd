<div class="title">
    <h1><?= $page->title()->html() ?></h1>
    <?php if ($page->subtitle()->isNotEmpty()) : ?>
        <h2><?= $page->subtitle() ?></h2>
    <?php endif ?>
</div>