<?php snippet('header') ?>

<main>

	<?php snippet('post/gallery') ?>

	<section class="title">

		<h1><?= $page->title()->html() ?></h1>
		<?php if ($page->subtitle()->isNotEmpty()) : ?>
			<h2><?= $page->subtitle() ?></h2>
		<?php endif ?>

	</section>

	<section class="content">
		<div class="about">

			<?= $page->body()->kirbytext() ?>

		</div>
		<div class="info">

			<?php snippet('post/meta') ?>

		</div>
	</section>

	<?php snippet('post/images') ?>

</main>

<?php snippet('footer');
