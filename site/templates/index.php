<?php snippet('header') ?>

<main>

  <?php snippet('channel/header',[
    'channel' => $site
  ]); ?>

  <?php snippet('posts/list'); ?>

</main>

<?php snippet('footer') ?>
