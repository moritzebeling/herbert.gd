<?php snippet('header') ?>

<main>

    <section class="info">
      <?= $domain->description()->kirbytext() ?>

      <ul class="links websites">
        <?php foreach( $domain->links()->yaml() as $item ): ?>
          <li><a href="<?= $item['link']; ?>" target="_blank"><?= $item['title']; ?></a></li>
        <?php endforeach; ?>
      </ul>

    </section>

    <?php snippet('domains/feed') ?>

</main>

<?php snippet('footer') ?>
