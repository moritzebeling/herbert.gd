<!doctype html>
<html lang="<?= $kirby->language() ?>">
<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">

  <title><?= $page->domain()->title() ?> | <?= $page->title() ?></title>

  <?= css('assets/css/default.css') ?>
  <?= css('assets/css/'.$page->domain()->id().'.css') ?>

  <?= js('assets/js/default.js') ?>

  <?php
  /*
  insert here:
    - meta description
    - meta keywords
    - canonical url
    - js libraries async
    - favicon
    - open graph meta info
  */
  ?>

</head>
<body class="<?= $page->intendedTemplate() ?>">

  <header>
    <?php snippet('domain-navigation'); ?>
  </header>
