<!doctype html>
<html lang="<?= $kirby->language() ?>">
<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">

  <title><?= $domain->title() ?> | <?= $page->title() ?></title>

  <script src="https://cdn.jsdelivr.net/npm/progressively/dist/progressively.min.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/progressively/dist/progressively.min.css">

  <?= css('assets/css/default.css') ?>
  <?= css('assets/css/'.$domain->id().'.css') ?>

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
