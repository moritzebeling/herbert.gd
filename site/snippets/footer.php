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
		snippet('post/footerScripts');
	} ?>

	<?= css('@auto') ?>

	<?= js('assets/js/herbert.js') ?>
	<?= js('assets/js/lazysizes.min.js') ?>

</body>
</html>
