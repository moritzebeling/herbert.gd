<?php snippet('header') ?>

<main>

  <header class="post-header">

    <h1><?= $page->title()->html() ?></h1>
    <?php if( $page->subtitle()->isNotEmpty() ): ?>
      <h2><?= $page->subtitle() ?></h2>
    <?php endif; ?>

    <?php snippet('post/semester') ?>

    <?php snippet('post/location') ?>

  </header>

  <?php snippet('post/gallery') ?>

  <section class="content">

    <?php snippet('post/content') ?>

    <?php if( $page->link()->isNotEmpty() ): ?>
      <div class="link">
        Website: <a target="_blank"><?= parse_url( $page->link(), PHP_URL_HOST ) ?></h2>
      </div>
    <?php endif; ?>

  </section>

  <section class="meta">

    <?php snippet('post/persons') ?>

    <?php snippet('post/keywords') ?>

  </section>

</main>

<?php snippet('footer') ?>
