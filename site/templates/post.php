<?php snippet('header') ?>

<main>

  <?php snippet('post/gallery') ?>

  <section class="content">

    <header class="post-header">
      <h1><?= $page->title()->html() ?></h1>
      <?php if( $page->subtitle()->isNotEmpty() ): ?>
        <h2><?= $page->subtitle() ?></h2>
      <?php endif; ?>
    </header>

    <div class="text">
      <?php snippet('post/content') ?>
    </div>

  </section>
  <section class="meta">

    <?php snippet('post/date') ?>

    <?php snippet('post/categories') ?>

    <?php snippet('post/keywords') ?>

    <?php snippet('post/attributes') ?>

  </section>

</main>

<?php snippet('footer') ?>
