<?php snippet('header') ?>

<main>

	<header>
		<div class="title">
			<h1><?= $page->title()->html() ?></h1>
		</div>
	</header>

	<section class="content">
		<?= $page->body()->kirbytext(); ?>
	</section>

</main>

<?php snippet('footer');
