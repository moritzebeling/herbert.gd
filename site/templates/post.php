<?php snippet('header') ?>

<main>

	<?php snippet('post/image') ?>

	<section class="content">
		<div class="info">

			<?php snippet('post/title'); ?>

			<?php snippet('post/meta') ?>

		</div>
		<div class="about">

			<?= $page->body()->kirbytext(); ?>

		</div>
	</section>

	<?php snippet('post/images') ?>

</main>

<?php snippet('footer');
