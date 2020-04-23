<?php snippet('header') ?>

<main>

  <?php snippet('post/gallery') ?>

  <header class="post-header">
    <h1><?= $page->title()->html() ?></h1>
    <?php if( $page->subtitle()->isNotEmpty() ): ?>
      <h2><?= $page->subtitle() ?></h2>
    <?php endif; ?>
  </header>

  <section class="content">

    <?php if( $page->body()->isNotEmpty() ): ?>
      <?= $page->body()->kirbytext(); ?>
    <?php endif ?>

  </section>

  <section class="meta">
    
    <div>
      <?php snippet('post/date') ?>
    </div>

    <div>
      <div>Categories</div>
      <div>
        <?php snippet('post/categories') ?>
      </div>
    </div>

    <?php snippet('post/attributes') ?>

    <div>
      <div>Keywords</div>
      <div>
        <?php snippet('post/keywords') ?>
      </div>
    </div>

  </section>

</main>

<?php snippet('footer') ?>
