	<footer class="site-footer">

		&copy; <?= date('Y') ?>

		<a href="<?= $site->url() ?>"><?= $site->title() ?></a>

		<?php if( $site->imprint()->isNotEmpty() ): ?>
			<a target="_blank" href="<?= $site->imprint() ?>">Imprint</a>
		<?php endif; ?>

		<?php snippet('fields/links',[
			'links' => $site->links()
		]); ?>

	</footer>

	<?= js('assets/js/swiper.min.js') ?>

	<script>

		const swiper = new Swiper('.gallery', {
			speed: 700,
			spaceBetween: 200,
			loop: true,
			lazy: true,
			grabCursor: true,
			navigation: {
		    nextEl: '.swiper-button-next',
		    prevEl: '.swiper-button-prev',
		  },
			pagination: {
        el: '.swiper-pagination',
				type: 'fraction',
      },
			keyboard: {
		    enabled: true,
		    onlyInViewport: true,
		  },
		});

	</script>

</body>
</html>
