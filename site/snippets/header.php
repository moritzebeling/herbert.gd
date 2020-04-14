<!doctype html>
<html>
<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">

  <title><?= $page->title() ?> • <?= $site->title() ?></title>

  <link rel="canonical" href="<?= $page->url() ?>" />

  <?= css([
    'assets/css/reset.css',
    'assets/css/reflex.css',
    'assets/css/swiper.min.css',
    'assets/css/global.css',
    '@auto'
  ]) ?>

  <?= js('assets/js/default.js') ?>

  <?php
  /*
  insert here:
    - js libraries async
    - favicon
  */
  ?>

  <meta name="description" content="<?php e( $page->description()->isNotEmpty(), $page->description()->html(), $site->description()->html() ) ?>">
  <meta name="keywords" content="<?= implode(', ', array_merge( $page->keywords()->split(), $site->keywords()->split() )) ?>">

  <?php
  $parent = $page->isHomePage() ? $site : $page;
  if( $image = $parent->content()->image()->toFile() ): ?>
    <meta property="og:image" content="<?= $image->thumb()->url(['width' => 1000]) ?>" />
  <?php elseif( $image = $parent->image() ): ?>
    <meta property="og:image" content="<?= $image->thumb()->url(['width' => 1000]) ?>" />
  <?php endif ?>

</head>
<body class="<?= $page->intendedTemplate() ?>">

  <header class="site-header grid">
    <div class="col-12">

      <a id="logo" href="<?= $site->url() ?>"><?= svg('assets/image/herbert.svg') ?></a>

      <ol class="channels">
        <?php foreach( $kirby->collection('channels') as $channel ): ?>
          <li><a href="<?= $channel->url() ?>"><?= $channel->title() ?></a></li>
        <?php endforeach; ?>
      </ol>

    </div>
  </header>
