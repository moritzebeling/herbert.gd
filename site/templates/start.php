<?php snippet('header') ?>

<main>

  <?php snippet('channel/header',[
    'channel' => $site
  ]); ?>

  <?php snippet('posts/cards'); ?>

</main>

<?php snippet('footer') ?>
