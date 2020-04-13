<?php snippet('header') ?>

<main>

  <?php snippet('channel/header',[
    'channel' => $site
  ]); ?>

  <?php snippet('channel/posts'); ?>

</main>

<?php snippet('footer') ?>
