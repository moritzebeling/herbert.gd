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
				<?php foreach( $team as $member ): ?>
					<li class="col-6">

						<figure>
							<?php if( $image = $member->image()->toFile() ): ?>
								<?= $image->tag(); ?>
								<figcaption><span>&copy; <?= $image->credits(); ?></span></figcaption>
							<?php endif; ?>
						</figure>

						<h3 class="name"><?= $member->name()->html(); ?></h3>

						<div class="about"><?= $member->text()->kirbytext(); ?></div>

						<?php if( $member->link()->isNotEmpty() ): ?>
							<div class="link"><?= $member->link()->toAnchor(); ?></div>
						<?php endif; ?>

					</li>
				<?php endforeach; ?>
			</ul>
		</section>
	<?php endif; ?>

</main>

<?php snippet('footer');
