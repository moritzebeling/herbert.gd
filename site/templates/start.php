<?php snippet('header') ?>

<main>

  <?php snippet('channel/header',[
    'channel' => $site
  ]); ?>

  <?php snippet('posts/posts'); ?>

</main>

<?php snippet('footer');
