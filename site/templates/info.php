<?php snippet('header') ?>

<main>

	<header>

		<div class="about">
			<?php if( $page->body()->isNotEmpty() ): ?>
				<?= $page->body()->kirbytext(); ?>
			<?php endif ?>
		</div>

		<?php snippet('fields/links',[
			'links' => $site->links()
		]); ?>

		<?php snippet('info/keywords'); ?>

	</header>

	<?php $team = $page->team()->toStructure();
	if( $team->count() > 0 ): ?>
		<section class="team">
			<ul class="flex rulers">
				<?php foreach( $team as $person ): ?>
					<li class="col-6">

						<?php snippet('info/person',[
							'person' => $person
						]); ?>

					</li>
				<?php endforeach; ?>
			</ul>
		</section>
	<?php endif; ?>

</main>

<?php snippet('footer');
