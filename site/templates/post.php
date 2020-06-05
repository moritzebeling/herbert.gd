<?php snippet('header') ?>

<main>

  <header class="post-header">
    <h1 class="title"><?= $page->title()->html() ?></h1>
    <?php if( $page->subtitle()->isNotEmpty() ): ?>
      <h2 class="subtitle"><?= $page->subtitle() ?></h2>
    <?php endif; ?>
  </header>

  <?php snippet('post/gallery') ?>

  <?php if( $page->body()->isNotEmpty() ): ?>
    <section class="content">
      <?= $page->body()->kirbytext(); ?>
    </section>
  <?php endif ?>

  <?php snippet('post/meta') ?>

</main>

<?php snippet('footer');
