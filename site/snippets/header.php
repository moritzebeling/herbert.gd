<!doctype html>
<html>
<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">

  <title><?= $page->title() ?> • <?= $site->title() ?></title>

  <link rel="canonical" href="<?= $page->url() ?>" />

  <?= css([
    'assets/css/reset.css',
    'assets/css/swiper.css',
    'assets/css/global.css',
    '@auto'
  ]) ?>

  <?= js([
    'assets/js/morutilities.js',
    'assets/js/default.js'
  ]) ?>

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
<!-- This website was made by Moritz Ebeling https://moritzebeling.com -->
<!-- If you want to contribute to this website, go to https://github.com/moritzebeling/herbert.gd -->
<body class="<?= $page->intendedTemplate() ?>">

  <header class="site-header">
    <div class="container">

      <a id="logo" href="<?= $site->url() ?>"><?= svg('assets/image/herbert-logo.svg') ?></a>

      <nav>
        <ol class="channels">
          <?php foreach( $kirby->collection('channels') as $channel ):

            $words = explode(" ", $channel->title()->value());
            $acronym = "";
            foreach ($words as $w) {
              $acronym .= $w[0];
            }

            $class = '';
            if( $page->is( $channel) ){
              $class = 'active';
            } else if ( $parent = $page->parent() ){
              if( $parent->is( $channel) ){
                $class = 'active';
              }
            }

            ?>
            <li>
              <a class="<?= $class ?>" title="<?= $channel->title()->value() ?>" href="<?= $channel->url() ?>">
                <span class="full"><?= $channel->title()->value() ?></span>
                <abbr title="<?= $channel->title()->value() ?>"><?= $acronym ?></span>
              </a>
            </li>
          <?php endforeach; ?>
        </ol>
      </nav>

    </div>
  </header>
