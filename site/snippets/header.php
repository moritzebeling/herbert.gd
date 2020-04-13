<!doctype html>
<html>
<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">

  <title><?= $page->title() ?> • <?= $site->title() ?></title>

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

  <header class="site-header">

    <a id="logo" href="<?= $site->url() ?>"><?= $site->title() ?></a>

    <ol class="channels">
      <?php foreach( $kirby->collection('channels') as $channel ): ?>
        <li><a href="<?= $channel->url() ?>"><?= $channel->title() ?></a></li>
      <?php endforeach; ?>
    </ol>

  </header>
