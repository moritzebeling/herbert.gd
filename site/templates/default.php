<?php snippet('header') ?>

<main class="grid">

  <div class="col-12">
    <?php snippet('post/gallery') ?>
  </div>

  <section class="meta col-6">

    <h1><?= $page->title()->html() ?></h1>
    <?php if( $page->subtitle()->isNotEmpty() ): ?>
      <h2><?= $page->subtitle() ?></h2>
    <?php endif; ?>
    
  </section>

  <section class="content col-6">

    <?php snippet('post/content') ?>

    <?php if( $page->link()->isNotEmpty() ): ?>
      <div class="link">
        Website: <a target="_blank"><?= parse_url( $page->link(), PHP_URL_HOST ) ?></h2>
      </div>
    <?php endif; ?>

    <?php snippet('post/semester') ?>

    <?php snippet('post/location') ?>

    <?php snippet('post/persons') ?>

    <?php snippet('post/keywords') ?>

  </section>



</main>

<?php snippet('footer') ?>
