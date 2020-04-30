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

    <?php if( $page->body()->isNotEmpty() ): ?>
      <?= $page->body()->kirbytext(); ?>
    <?php endif ?>

  </section>

  <section class="meta">

    <div>
      <div><?= ucwords( $page->parent()->dateFormat() ); ?></div>
      <div>
        <?php snippet('post/date') ?>
      </div>
    </div>

    <?php if( $page->categories()->isNotEmpty() ): ?>
      <div>
        <div>Categories</div>
        <div>
          <ul class="categories">
            <?php foreach( $page->categories()->split() as $category ): ?>
              <li><?= Keyword::link( $category ); ?></li>
            <?php endforeach; ?>
          </ul>
        </div>
      </div>
    <?php endif; ?>

    <?php snippet('post/attributes') ?>

    <?php if( $page->keywords()->isNotEmpty() ): ?>
      <div>
        <div>Keywords</div>
        <div>
          <ul class="keywords">
            <?php foreach( $page->keywords()->split() as $keyword ): ?>
              <li><?= Keyword::link( $keyword ); ?></li>
            <?php endforeach; ?>
          </ul>
        </div>
      </div>
    <?php endif; ?>

  </section>

</main>

<?php snippet('footer') ?>
