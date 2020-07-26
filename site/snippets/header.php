<!doctype html>
<html>
<head>

	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width,initial-scale=1.0">

	<title><?= $page->title() ?> • <?= $site->title() ?></title>

	<link rel="canonical" href="<?= $page->url() ?>" />

	<?= css('assets/css/global.css') ?>

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
<!-- If you want to contribute to this website, go to <?= option('repo') ?> -->
<body class="<?= $page->intendedTemplate() ?>">

	<header>
		<div class="container">

			<a id="logo" href="<?= $site->url() ?>"><?= svg('assets/image/herbert-logo.svg') ?></a>

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
