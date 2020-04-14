	<footer class="site-footer grid">

		<div class="col-6">

			&copy; <?= date('Y') ?>

			<a href="<?= $site->url() ?>"><?= $site->title() ?></a>

		</div>
		<div class="col-6">

			<?php if( $site->imprint()->isNotEmpty() ): ?>
				<a target="_blank" href="<?= $site->imprint() ?>">Imprint</a>
			<?php endif; ?>

			<?php snippet('fields/links',[
				'links' => $site->links()
			]); ?>

		</div>

	</footer>

</body>
</html>
