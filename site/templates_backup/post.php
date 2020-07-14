<?php snippet('header') ?>

<main>

  <header class="post-header">
    <h1 class="title"><?= $page->title()->html() ?></h1>
    <?php if( $page->subtitle()->isNotEmpty() ): ?>
      <h2 class="subtitle"><?= $page->subtitle() ?></h2>
    <?php endif; ?>
  </header>

  <?php snippet('post/gallery') ?>

  <section class="content">
    <div class="title">

      <h1 class="title"><?= $page->title()->html() ?></h1>
      <?php if( $page->subtitle()->isNotEmpty() ): ?>
        <h2 class="subtitle"><?= $page->subtitle() ?></h2>
      <?php endif; ?>

      <?php snippet('post/meta') ?>

    </div>
    <div class="body">

      <?= $page->body()->kirbytext(); ?>
      
    </div>
  </section>

</main>

<?php snippet('footer');
