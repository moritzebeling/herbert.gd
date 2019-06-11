<?php snippet('header') ?>

<main>

    <section class="info">
      <?= $page->domain()->description()->kirbytext() ?>

      <ul class="links websites">
        <?php foreach( $page->domain()->links()->yaml() as $item ): ?>
          <li><a href="<?= $item['link']; ?>" target="_blank"><?= $item['title']; ?></a></li>
        <?php endforeach; ?>
      </ul>

    </section>

    <?php snippet('domains/feed', [ 'collection' => $site->feed( $page->domain() ) ]) ?>

</main>

<?php snippet('footer') ?>
