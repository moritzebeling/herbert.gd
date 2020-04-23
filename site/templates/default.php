<?php snippet('header') ?>

<main>

  <header class="post-header">
    <h1><?= $page->title()->html() ?></h1>
  </header>

  <section class="content">

    <?php if( $page->body()->isNotEmpty() ): ?>
      <?= $page->body()->kirbytext(); ?>
    <?php endif ?>

  </section>

</main>

<?php snippet('footer') ?>
