<?php snippet('header') ?>

<main>

  <?php snippet('channel/header'); ?>

  <?= $posts->count() ?> Posts found

  <?php
  $layout = isset($layout) ? $layout : 'list';
  snippet('posts/'.$layout); ?>

</main>

<?php snippet('footer') ?>
