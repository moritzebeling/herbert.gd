
	<footer class="site-footer">

		<a href="<?= $site->url() ?>">&copy; <?= date('Y') ?></a>

		<?php if( $site->imprint()->isNotEmpty() ): ?>
			<a target="_blank" href="<?= $site->imprint() ?>">Imprint</a>
		<?php endif; ?>

		<?php snippet('fields/links',[
			'links' => $site->links()
		]); ?>

	</footer>

</body>
</html>
