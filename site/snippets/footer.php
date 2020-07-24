	<footer>
		<div class="">

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

	<script>
		let hasScrolled = false;
		onScroll(( scrollPos )=>{
			if( hasScrolled === false && scrollPos > 100 ){
				document.body.classList.add('has-scrolled');
				hasScrolled = true;
			} else if( hasScrolled === true && scrollPos < 100 ){
				document.body.classList.remove('has-scrolled');
				hasScrolled = false;
			}
		});
	</script>

	<?php if( $page->IntendedTemplate()->name() === 'post' ){
		snippet('post/footerScripts');
	} ?>

	<?= js('assets/js/lazysizes.min.js') ?>

</body>
</html>
