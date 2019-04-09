<!doctype html>
<html lang="<?= $kirby->language() ?>">
<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">

  <title><?= $domain->title() ?> | <?= $page->title() ?></title>

  <?= css('assets/css/reset.css') ?>
  <?= css('assets/css/default.css') ?>
  <?= css('assets/css/'.$domain->id().'.css') ?>

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
<body>

  <header>
    <?php snippet('domain-navigation'); ?>
    <h1><?= $domain->title() ?></h1>
  </header>