<?php

$metaParent = $page;

if( $page->isHome() ){
	$metaParent = $site;
}

if( $metaParent->subtitle()->isNotEmpty() ){
	$desc = $metaParent->subtitle()->value();
} elseif ( $metaParent->description()->isNotEmpty() ){
	$desc = $metaParent->description()->value();
} else {
	$desc = $site->description()->value();
}

$keywords = array_merge( $page->keywords()->split(), $site->keywords()->split() );

if( $image = $metaParent->image() ){
} elseif( $image = $parent->image() ) {
}

?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width,initial-scale=1.0">

	<?= css('assets/css/global.css') ?>

	<?php if( $page->isHomePage() ): ?>
		<title><?= $site->title() ?></title>
	<?php else: ?>
		<title><?= $page->title() ?> • <?= $site->title() ?></title>
	<?php endif; ?>

	<link rel="canonical" href="<?= $page->url() ?>" />
	<meta name="description" content="<?= $desc ?>">
	<meta name="keywords" content="<?= implode( ', ', $keywords ) ?>">
	<meta name="Generator" content="Moritz Ebeling (https://moritzebeling.com)">
	<?php if( $info = page('info') ): ?>
		<link rel="author" href="<?= $info->url() ?>">
	<?php endif; ?>

	<?php if( option('analytics') ){
		snippet('header/analytics-1');
	} ?>

	<meta property="og:site_name" content="<?= $site->title() ?>">
	<meta property="og:type" content="website">
	<meta property="og:title" content="<?= $metaParent->title() ?>">
	<meta property="og:url" content="<?= $metaParent->url() ?>">
	<meta property="og:locale" content="de_DE">
	<meta property="og:description" content="<?= $desc ?>">
	<meta property="og:image" content="<?= $image->resize( 1000 )->url() ?>" />

	<?php snippet('header/favicon') ?>
	<?php snippet('header/jsonld') ?>

</head>
<!-- Website by Moritz Ebeling https://moritzebeling.com -->
<!-- If you want to contribute to this website, go to <?= option('repo') ?> -->
<body class="<?= $page->intendedTemplate() ?>">

	<?php if( option('analytics') ){
		snippet('header/analytics-2');
	} ?>

	<header>
		<div class="container">

			<div id="logo">
				<a href="<?= $site->url() ?>" title="<?= $site->title() ?>">
					<?= svg('assets/image/herbert-logo.svg') ?>
				</a>
			</div>

			<nav>
				<ol class="channels">
					<?php foreach( $kirby->collection('channels')->add( page('info') ) as $channel ):

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
								<?= $channel->title()->value() ?><?php if( $channel->intendedTemplate()->name() === 'channel' ): ?><span class="count"><?= $channel->posts()->count() ?></span><?php endif; ?>
							</a>
						</li>
					<?php endforeach; ?>
				</ol>
			</nav>

		</div>
	</header>
