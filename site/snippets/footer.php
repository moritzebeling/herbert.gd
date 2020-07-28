	<footer>
		<div>

			<ul class="credits">
				<?php if( $page->intendedTemplate()->name() === 'info' ){
					snippet('info/credits');
				} ?>
			</ul>

			<div class="buw-logo-container">
				<?php if( $info = page('info') ): ?>
					<a class="buw-logo" title="Imprint" href="<?= $info->imprint()->value() ?>" rel="noopener" target="_blank">
						<?= svg('assets/image/bauhaus-university-logo.svg') ?>
					</a>
				<?php endif; ?>
			</div>

		</div>
	</footer>

	<?php if( $page->IntendedTemplate()->name() === 'post' ){
		// snippet('post/footerScripts');
	} ?>

	<?= css('@auto') ?>

	<?= js('assets/js/herbert.js', true) ?>
	<?= js('assets/js/lazysizes.min.js', true) ?>

	<!--
	<script src="https://unpkg.com/packery@2/dist/packery.pkgd.min.js"></script>
	<script>
		var pckry = new Packery( '.grid', {
			itemSelector: '.item',
			gutter: 16,
			percentPosition: true
		});
	</script> --

</body>
</html>
