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

	<?php // js('assets/js/stickyBits.min.js') ?>
	<script>
		// stickybits('.sticky', { useStickyClasses: true });
	</script>

	<script src="https://unpkg.com/isotope-layout@3/dist/isotope.pkgd.min.js"></script>
	<script>
		/*
		setTimeout(function(){
			var elem = document.querySelector('.grid');
			var iso = new Isotope( elem, {
			  // options packery
			  itemSelector: 'li',
			  layoutMode: 'masonry',
				percentPosition: true,
			});
		}, 3000);
		*/
	</script>

	<?php if( $page->IntendedTemplate()->name() === 'post' ){
		snippet('post/footerScripts');
	} ?>

	<script>
		// replace slashes
		let replaceSlashes = document.querySelectorAll('.title,.subtitle,.date,.replaceSpecialChars');
		for (let element of replaceSlashes) {
			let html = element.innerHTML;
			html = html.replace(/(\/)(?!([^<]+)?>)/g,"<i class=\"special slash\"><i>/</i></i>");
			html = html.replace(/-(?!([^<]+)?>)/g,"<i class=\"special minus\"><i>-</i></i>");
			html = html.replace(/–(?!([^<]+)?>)/g,"<i class=\"special dash\"><i>–</i></i>");
			html = html.replace(/_(?!([^<]+)?>)/g,"<i class=\"special lodash\"><i>_</i></i>");
			html = html.replace(/\|(?!([^<]+)?>)/g,"<i class=\"special pipe\"><i>|</i></i>");
			element.innerHTML = html;
		}
	</script>

</body>
</html>
