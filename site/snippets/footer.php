	<footer>
		<div class="flex spaced">

			<ul class="col-6 credits">
				<?php if( $page->intendedTemplate()->name() === 'info' ){
					snippet('info/credits');
				} ?>
			</ul>

			<div class="col-6 buw-logo-container">
				<?php if( $info = page('info') ): ?>
					<a class="link buw-logo" title="Imprint" href="<?= $info->imprint()->value() ?>" rel="noopener" target="_blank">
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

</body>
</html>
