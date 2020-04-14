<?php snippet('header') ?>

<main>

  <?php snippet('post/gallery') ?>

  <section class="content">

    <div>
      <h1><?= $page->title()->html() ?></h1>
      <?php if( $page->subtitle()->isNotEmpty() ): ?>
        <h2><?= $page->subtitle() ?></h2>
      <?php endif; ?>
    </div>

    <div>
      <?php snippet('post/content') ?>
      <?php if( $page->link()->isNotEmpty() ): ?>
        <div class="link">
          Website: <a target="_blank"><?= parse_url( $page->link(), PHP_URL_HOST ) ?></h2>
        </div>
      <?php endif; ?>
    </div>

    <div>
      <?php snippet('post/semester') ?>
    </div>

    <div>
      <?php snippet('post/location') ?>
    </div>

    <div>
      <?php snippet('post/persons') ?>
    </div>

    <div>
      <?php snippet('post/keywords') ?>
    </div>

  </section>

</main>

<?php snippet('footer') ?>
