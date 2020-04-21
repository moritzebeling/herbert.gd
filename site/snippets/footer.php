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

		const swiperOptions = {
			speed: 700,
			spaceBetween: 200,
			loop: true,
			lazy: true,
			grabCursor: true,
			initialSlide: 0,
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
		};

		const gContainer = document.querySelector('.gallery');
		let gSwiper, figures;

		if( gContainer && gContainer.classList.contains('multiple') ){

			figures = gContainer.getElementsByTagName('FIGURE');
			startSwiper();

			gContainer.querySelector( '.swiper-button-index' ).addEventListener( 'click', ()=>{
				if( gContainer.classList.contains('index') ){
					startSwiper();
				} else {
					showIndex();
				}
			}, false );

		}

		function startSwiper( i = 0 ){
			console.log('show slider', i);

			gContainer.classList.remove('index');
			gContainer.classList.add('swiper-container');

			for (var figure of figures) {
				figure.removeEventListener( 'click', clickOnIndex );
			}

			swiperOptions.initialSlide = i;
			gSwiper = new Swiper( gContainer, swiperOptions );
		}

		function showIndex(){
			console.log('show index');

			gSwiper.destroy();
			gSwiper = undefined;

			gContainer.classList.remove('swiper-container');
			gContainer.classList.add('index');

			for (var figure of figures) {
				figure.addEventListener( 'click', clickOnIndex, false );
			}

		}

		function whatN(element, type){
	    let i = 0;
      while( element = element.previousElementSibling ){
        i++;
      }
	    return i;
		}

		function clickOnIndex( event ){

			let slide = event.target.closest('.swiper-slide');
			let i = whatN( slide );

			startSwiper( i );

		}

	</script>

</body>
</html>
