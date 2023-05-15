<?php snippet('header') ?>

<main>

	<div class="main">

		<header>

			<div class="about">
				<?php if ($page->body()->isNotEmpty()) : ?>
					<?= $page->body()->kirbytext() ?>
				<?php endif ?>
			</div>

			<?php snippet('fields/links', [
				'links' => $site->links()
			]) ?>

		</header>

		<aside>
			<?php snippet('info/keywords') ?>
		</aside>

		<section class="team">
			<?php foreach ($page->team()->toStructure() as $person) : ?>
				<div>

					<?php snippet('info/person', [
						'person' => $person
					]) ?>

				</div>
			<?php endforeach ?>
		</section>

	</div>



</main>

<?php snippet('footer');
