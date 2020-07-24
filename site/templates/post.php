<?php snippet('header') ?>

<main>

	<header>
		<?php snippet('post/title'); ?>
	</header>

	<?php snippet('post/gallery') ?>

	<section class="content">
		<div class="flex rulers">
			<div class="info col-6">

				<?php snippet('post/title'); ?>

				<?php snippet('post/meta') ?>

			</div>
			<div class="about col-6">

				<?= $page->body()->kirbytext(); ?>

			</div>
		</div>
	</section>

</main>

<?php snippet('footer');
