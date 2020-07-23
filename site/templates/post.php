<?php snippet('header') ?>

<main>

	<header>
		<div class="title">
			<h1><?= $page->title()->html() ?></h1>
			<?php if( $page->subtitle()->isNotEmpty() ): ?>
				<h2><?= $page->subtitle() ?></h2>
			<?php endif; ?>
		</div>
	</header>

	<?php snippet('post/gallery') ?>

	<section class="content">
		<div class="flex rulers">
			<div class="info col-6">

				<div class="title">
					<h1><?= $page->title()->html() ?></h1>
					<?php if( $page->subtitle()->isNotEmpty() ): ?>
						<h2><?= $page->subtitle() ?></h2>
					<?php endif; ?>
				</div>

				<?php snippet('post/meta') ?>

			</div>
			<div class="about col-6">

				<?= $page->body()->kirbytext(); ?>

			</div>
		</div>
	</section>

</main>

<?php snippet('footer');
